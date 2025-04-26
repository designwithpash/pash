// Country data with codes and flags
const countries = [
  { name: "Afghanistan", code: "AF", dial_code: "+93", flag: "🇦🇫" },
  { name: "Albania", code: "AL", dial_code: "+355", flag: "🇦🇱" },
  { name: "Algeria", code: "DZ", dial_code: "+213", flag: "🇩🇿" },
  { name: "American Samoa", code: "AS", dial_code: "+1684", flag: "🇦🇸" },
  { name: "Andorra", code: "AD", dial_code: "+376", flag: "🇦🇩" },
  { name: "Angola", code: "AO", dial_code: "+244", flag: "🇦🇴" },
  { name: "United Kingdom", code: "GB", dial_code: "+44", flag: "🇬🇧" },
  { name: "United States", code: "US", dial_code: "+1", flag: "🇺🇸" },
  { name: "India", code: "IN", dial_code: "+91", flag: "🇮🇳" },
  { name: "Canada", code: "CA", dial_code: "+1", flag: "🇨🇦" },
  { name: "Australia", code: "AU", dial_code: "+61", flag: "🇦🇺" },
  { name: "Germany", code: "DE", dial_code: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dial_code: "+33", flag: "🇫🇷" },
  { name: "Japan", code: "JP", dial_code: "+81", flag: "🇯🇵" },
  { name: "China", code: "CN", dial_code: "+86", flag: "🇨🇳" },
  { name: "Russia", code: "RU", dial_code: "+7", flag: "🇷🇺" },
  { name: "Brazil", code: "BR", dial_code: "+55", flag: "🇧🇷" },
  { name: "South Africa", code: "ZA", dial_code: "+27", flag: "🇿🇦" },
  { name: "Mexico", code: "MX", dial_code: "+52", flag: "🇲🇽" },
  { name: "Italy", code: "IT", dial_code: "+39", flag: "🇮🇹" },
  { name: "Spain", code: "ES", dial_code: "+34", flag: "🇪🇸" },
  { name: "South Korea", code: "KR", dial_code: "+82", flag: "🇰🇷" },
  { name: "Indonesia", code: "ID", dial_code: "+62", flag: "🇮🇩" },
  { name: "Singapore", code: "SG", dial_code: "+65", flag: "🇸🇬" },
  { name: "New Zealand", code: "NZ", dial_code: "+64", flag: "🇳🇿" }
  // Add more countries as needed
];

// Set up the country selector functionality
document.addEventListener('DOMContentLoaded', function() {
  const selectedFlag = document.getElementById('selected-flag');
  const countryDropdown = document.getElementById('country-dropdown');
  const countryList = document.getElementById('country-list');
  const countrySearch = document.getElementById('country-search');
  const countryCodeInput = document.getElementById('country-code');
  const contactInput = document.getElementById('contact');
  
  // Populate country list
  function populateCountryList(countryArray) {
    countryList.innerHTML = '';
    countryArray.forEach(country => {
      const countryItem = document.createElement('div');
      countryItem.className = 'country-item';
      countryItem.dataset.dialCode = country.dial_code;
      countryItem.dataset.code = country.code;
      
      countryItem.innerHTML = `
        <div class="flag-icon">${country.flag}</div>
        <div class="country-name">${country.name}</div>
        <div class="country-code">${country.dial_code}</div>
      `;
      
      countryItem.addEventListener('click', function() {
        selectCountry(country);
        countryDropdown.classList.remove('open');
      });
      
      countryList.appendChild(countryItem);
    });
  }
  
  // Initialize with all countries
  populateCountryList(countries);
  
  // Set default country (United States)
  const defaultCountry = countries.find(c => c.code === 'US');
  selectCountry(defaultCountry);
  
  // Open/close dropdown
  selectedFlag.addEventListener('click', function() {
    countryDropdown.classList.toggle('open');
    if (countryDropdown.classList.contains('open')) {
      countrySearch.focus();
    }
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (!selectedFlag.contains(e.target) && !countryDropdown.contains(e.target)) {
      countryDropdown.classList.remove('open');
    }
  });
  
  // Filter countries on search
  countrySearch.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    if (query) {
      const filtered = countries.filter(country => 
        country.name.toLowerCase().includes(query) || 
        country.dial_code.includes(query)
      );
      populateCountryList(filtered);
    } else {
      populateCountryList(countries);
    }
  });
  
  // Select a country
  function selectCountry(country) {
    // Update only the flag icon, not the dropdown icon
    const flagIcon = selectedFlag.querySelector('.flag-icon');
    if (flagIcon) {
      flagIcon.textContent = country.flag;
    }
    
    // Set the country code in the hidden input
    countryCodeInput.value = country.dial_code;
    
    // Update contact input with country code if it's empty
    if (!contactInput.value) {
      contactInput.value = country.dial_code + ' ';
      // Place cursor at the end
      setTimeout(() => {
        contactInput.selectionStart = contactInput.selectionEnd = contactInput.value.length;
        contactInput.focus();
      }, 0);
    } else if (!contactInput.value.startsWith('+')) {
      // If there's a value but no country code, add it
      const originalValue = contactInput.value;
      contactInput.value = country.dial_code + ' ' + originalValue;
    } else {
      // Replace existing country code
      const phoneNumber = contactInput.value.replace(/^\+\d+\s?/, '');
      contactInput.value = country.dial_code + ' ' + phoneNumber;
    }
  }
}); 