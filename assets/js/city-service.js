// City Service - Manages city selection and persistence

class CityService {
    constructor() {
        this.STORAGE_KEY = 'selectedCity';
        this.EMOJI_KEY = 'selectedCityEmoji';
    }

    // Get selected city from localStorage
    getSelectedCity() {
        return localStorage.getItem(this.STORAGE_KEY);
    }

    // Get selected city emoji
    getSelectedCityEmoji() {
        return localStorage.getItem(this.EMOJI_KEY);
    }

    // Set selected city
    setSelectedCity(cityName, emoji) {
        localStorage.setItem(this.STORAGE_KEY, cityName);
        localStorage.setItem(this.EMOJI_KEY, emoji);
    }

    // Clear selected city
    clearSelectedCity() {
        localStorage.removeItem(this.STORAGE_KEY);
        localStorage.removeItem(this.EMOJI_KEY);
    }

    // Check if city is selected
    hasSelectedCity() {
        return !!this.getSelectedCity();
    }

    // Get city from URL parameter
    getCityFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('city');
    }

    // Set city in URL
    setCityInURL(cityName) {
        const url = new URL(window.location.href);
        url.searchParams.set('city', cityName);
        window.history.replaceState({}, '', url);
    }

    // Initialize city (from URL or localStorage)
    initializeCity() {
        const urlCity = this.getCityFromURL();
        const storedCity = this.getSelectedCity();

        if (urlCity) {
            // URL has priority
            const cityData = getCityByName(urlCity);
            if (cityData) {
                this.setSelectedCity(cityData.name, cityData.emoji);
                return cityData.name;
            }
        }

        if (storedCity) {
            // Use stored city
            this.setCityInURL(storedCity);
            return storedCity;
        }

        return null;
    }

    // Inject city name into page elements
    injectCityIntoPage() {
        const city = this.getSelectedCity();
        if (!city) return;

        // Inject into elements with data-city attribute
        document.querySelectorAll('[data-city]').forEach(element => {
            const template = element.getAttribute('data-city-template') || element.textContent;
            element.textContent = template.replace('{city}', city);
        });

        // Inject into elements with data-city-append
        document.querySelectorAll('[data-city-append]').forEach(element => {
            const original = element.getAttribute('data-city-original') || element.textContent;
            element.textContent = `${original} — ${city}`;
            element.setAttribute('data-city-original', original);
        });

        // Inject into placeholders
        document.querySelectorAll('.city-name').forEach(element => {
            element.textContent = city;
        });
    }
}

// Create global instance
const cityService = new CityService();
