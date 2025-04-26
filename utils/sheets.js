import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const SHEET_ID = process.env.GOOGLE_SHEET_ID || '1vcgwnI4Kvx9niapiHDNPNQL5PUWFTAJtjNMYEg_xUNs';
const CREDENTIALS_PATH = join(__dirname, '..', 'credentials', 'service-account.json');

// Function to format date in IST
function getISTDateTime() {
    const date = new Date();
    const istTime = new Date(date.getTime() + (5.5 * 60 * 60 * 1000)); // Convert to IST (UTC+5:30)
    
    // Format the date
    const day = istTime.getDate().toString().padStart(2, '0');
    const month = (istTime.getMonth() + 1).toString().padStart(2, '0');
    const year = istTime.getFullYear();
    const hours = istTime.getHours().toString().padStart(2, '0');
    const minutes = istTime.getMinutes().toString().padStart(2, '0');
    const seconds = istTime.getSeconds().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} IST`;
}

// Function to format phone number for Google Sheets
function formatPhoneForSheets(phone) {
    if (!phone) return "";
    // Remove all non-numeric characters and ensure it starts with a single quote
    const numericOnly = phone.replace(/[^\d]/g, '');
    return `'${numericOnly}`; // Add single quote prefix to force text format
}

export async function appendFormData(formData) {
    try {
        console.log("Form data received:", JSON.stringify(formData, null, 2));
        
        // Read credentials file
        let credentials;
        try {
            const credentialsFile = readFileSync(CREDENTIALS_PATH, 'utf-8');
            credentials = JSON.parse(credentialsFile);
            console.log("Successfully loaded credentials");
        } catch (error) {
            console.error("Error loading credentials file:", error);
            throw new Error("Failed to load credentials file. Make sure it exists at: " + CREDENTIALS_PATH);
        }

        // Create JWT client
        const jwt = new JWT({
            email: credentials.client_email,
            key: credentials.private_key,
            scopes: [
                'https://www.googleapis.com/auth/spreadsheets',
                'https://www.googleapis.com/auth/drive.file',
            ],
        });

        // Create new document instance
        const doc = new GoogleSpreadsheet(SHEET_ID, jwt);
        
        // Load the document properties and sheets
        await doc.loadInfo();
        console.log("Successfully loaded spreadsheet:", doc.title);
        console.log("Available sheets:", doc.sheetsByIndex.map(sheet => sheet.title).join(", "));
        
        // Get the first sheet
        const sheet = doc.sheetsByIndex[0];
        console.log("Using sheet:", sheet.title, "with index 0");

        // Load sheet header row
        await sheet.loadHeaderRow();
        const headers = sheet.headerValues;
        console.log("Sheet headers:", headers);

        // Format the services array into a string
        let servicesString = "";
        if (formData.services) {
            if (Array.isArray(formData.services)) {
                servicesString = formData.services.join(", ");
            } else {
                servicesString = formData.services.toString();
            }
        }
        
        console.log("Formatted services:", servicesString);

        // Get the country code value from either country or country-code field
        const countryCode = formData['country-code'] || formData.country || "";

        // Create the row data as an object
        const rowData = {
            'Time stamp': getISTDateTime(),
            'Name': formData.name || "",
            'Organisation': formData.organization || "",
            'Email': formData.email || "",
            'Contact': formatPhoneForSheets(formData.contact),
            'Website': formData.website || "",
            'Services': servicesString,
            'Budget': formData.budget || "",
            'Country Code': countryCode // Add the country code to the sheet
        };
        
        console.log("Adding row with data:", rowData);

        // Add the row
        try {
            const result = await sheet.addRow(rowData);
            console.log("Successfully added row to sheet.");
            return true;
        } catch (error) {
            console.error("Error adding row:", error);
            // Try direct API approach if the normal method fails
            try {
                console.log("Trying alternate append method with direct API call...");
                
                // Get access token from JWT
                const token = await jwt.getAccessToken();
                const accessToken = token.token;
                
                // Direct API call to append values
                const response = await axios({
                    method: 'POST',
                    url: `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Sheet1!A:I:append`, // Updated to include Country Code
                    params: {
                        valueInputOption: 'USER_ENTERED',
                        insertDataOption: 'INSERT_ROWS'
                    },
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    data: {
                        values: [
                            [
                                getISTDateTime(),
                                formData.name || "",
                                formData.organization || "",
                                formData.email || "",
                                formatPhoneForSheets(formData.contact),
                                formData.website || "",
                                servicesString,
                                formData.budget || "",
                                countryCode // Add country code to the API values
                            ]
                        ]
                    }
                });
                
                console.log("Successfully added row using alternate method", response.data);
                return true;
            } catch (altError) {
                console.error("Alternate append method also failed:", altError);
                throw error; // Throw the original error
            }
        }
    } catch (error) {
        console.error('Error appending form data:', error);
        if (error.response) {
            console.error('Response error data:', error.response.data);
            console.error('Response error status:', error.response.status);
        }
        throw error;
    }
} 