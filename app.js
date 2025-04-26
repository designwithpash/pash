import express from "express";
import bodyParser from "body-parser";
import livereload from "livereload";
import connectLiveReload from "connect-livereload";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import SwipeListener from 'swipe-listener';
import { appendFormData } from './utils/sheets.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;
const isDevelopment = process.env.NODE_ENV !== 'production';

// Set the views directory
app.set('views', join(__dirname, 'views'));
app.set("view engine", "ejs");

// Setup LiveReload only in development
if (isDevelopment) {
    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch(join(__dirname, "public"));
    app.use(connectLiveReload());
}

// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('error', { 
        message: 'Something broke!',
        error: isDevelopment ? err : {}
    });
});

// Routes
app.get("/", (req, res, next) => {
    try {
        var currentYear = new Date().getFullYear();
        res.render("index", {
            call: "https://calendly.com/designwithpash/30min?month=2025-03",
            date: currentYear
        });
    } catch (error) {
        next(error);
    }
});

app.get("/contact", (req, res, next) => {
    try {
        var currentYear = new Date().getFullYear();
        res.render("contact", {
            date: currentYear
        });
    } catch (error) {
        next(error);
    }
});

app.post("/contact", async (req, res, next) => {
    try {
        await appendFormData(req.body);
        res.json({ success: true });
    } catch (error) {
        console.error('Error handling form submission:', error);
        res.status(500).json({ 
            success: false, 
            error: isDevelopment ? error.message : 'Failed to save form data'
        });
    }
});

// Handle 404
app.use((req, res) => {
    res.status(404).render('error', { 
        message: 'Page not found',
        error: {}
    });
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
});
