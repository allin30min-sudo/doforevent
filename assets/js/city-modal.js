// City Selection Modal - Mandatory city selection

class CityModal {
    constructor() {
        this.modal = null;
        this.searchInput = null;
        this.suggestionsContainer = null;
        this.selectedCityData = null;
    }

    // Create modal HTML
    createModal() {
        const modalHTML = `
            <div id="cityModal" class="city-modal" style="display: none;">
                <div class="city-modal-overlay"></div>
                <div class="city-modal-content">
                    <h2>Select or Choose Your City to Explore Services</h2>
                    <p style="margin-bottom: var(--spacing-lg); color: var(--color-dark-3);">Choose your city to see personalized event services</p>
                    
                    <div class="city-search-container">
                        <input type="text" id="modalCitySearch" class="city-search-input" placeholder="🔍 Search City..." autocomplete="off">
                        <div id="modalCitySuggestions" class="city-suggestions"></div>
                    </div>

                    <div class="popular-cities-grid" id="modalPopularCities"></div>

                    <button id="confirmCityBtn" class="btn btn-primary btn-lg" style="width: 100%; margin-top: var(--spacing-xl);" disabled>
                        Confirm & Continue
                    </button>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('cityModal');
        this.searchInput = document.getElementById('modalCitySearch');
        this.suggestionsContainer = document.getElementById('modalCitySuggestions');

        this.addStyles();
        this.attachEventListeners();
        this.loadPopularCities();
    }

    // Add modal styles
    addStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .city-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
            }

            .city-modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
            }

            .city-modal-content {
                position: relative;
                max-width: 600px;
                margin: 50px auto;
                background: white;
                padding: var(--spacing-2xl);
                border-radius: var(--radius-lg);
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                max-height: 90vh;
                overflow-y: auto;
            }

            .city-modal-content h2 {
                margin-bottom: var(--spacing-md);
                color: var(--color-primary);
            }

            .city-search-container {
                position: relative;
                margin-bottom: var(--spacing-xl);
            }

            .city-search-input {
                width: 100%;
                padding: var(--spacing-md);
                border: 2px solid var(--color-light-3);
                border-radius: var(--radius-md);
                font-size: var(--text-base);
                transition: all 0.3s ease;
            }

            .city-search-input:focus {
                outline: none;
                border-color: var(--color-primary);
                box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.1);
            }

            .city-suggestions {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid var(--color-light-3);
                border-radius: var(--radius-md);
                margin-top: 5px;
                max-height: 300px;
                overflow-y: auto;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                z-index: 100;
                display: none;
            }

            .city-suggestions.active {
                display: block;
            }

            .city-suggestion-item {
                padding: var(--spacing-md);
                cursor: pointer;
                transition: background 0.2s ease;
                display: flex;
                align-items: center;
                gap: var(--spacing-sm);
            }

            .city-suggestion-item:hover {
                background: var(--color-light-2);
            }

            .city-suggestion-item.selected {
                background: var(--color-primary);
                color: white;
            }

            .city-emoji {
                font-size: 1.5rem;
            }

            .popular-cities-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
                gap: var(--spacing-md);
                margin-bottom: var(--spacing-xl);
            }

            .city-card-mini {
                padding: var(--spacing-md);
                border: 2px solid var(--color-light-3);
                border-radius: var(--radius-md);
                text-align: center;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .city-card-mini:hover {
                border-color: var(--color-primary);
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }

            .city-card-mini.selected {
                border-color: var(--color-primary);
                background: var(--color-primary);
                color: white;
            }

            .city-card-mini .city-emoji {
                font-size: 2rem;
                margin-bottom: var(--spacing-sm);
            }

            .city-card-mini .city-name {
                font-size: var(--text-sm);
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);
    }

    // Load popular cities
    loadPopularCities() {
        const container = document.getElementById('modalPopularCities');
        const popularCities = getPopularCities();

        container.innerHTML = popularCities.map(city => `
            <div class="city-card-mini" data-city="${city.name}" data-emoji="${city.emoji}">
                <div class="city-emoji">${city.emoji}</div>
                <div class="city-name">${city.name}</div>
            </div>
        `).join('');
    }

    // Attach event listeners
    attachEventListeners() {
        // Search input
        this.searchInput.addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // City card clicks
        document.addEventListener('click', (e) => {
            const cityCard = e.target.closest('.city-card-mini');
            if (cityCard) {
                this.selectCity(cityCard.dataset.city, cityCard.dataset.emoji);
            }
        });

        // Confirm button
        document.getElementById('confirmCityBtn').addEventListener('click', () => {
            this.confirmSelection();
        });

        // Close suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.city-search-container')) {
                this.suggestionsContainer.classList.remove('active');
            }
        });
    }

    // Handle search
    handleSearch(query) {
        if (!query || query.length < 2) {
            this.suggestionsContainer.classList.remove('active');
            return;
        }

        const results = searchCities(query);

        if (results.length === 0) {
            this.suggestionsContainer.classList.remove('active');
            return;
        }

        this.suggestionsContainer.innerHTML = results.map(city => `
            <div class="city-suggestion-item" data-city="${city.name}" data-emoji="${city.emoji}">
                <span class="city-emoji">${city.emoji}</span>
                <span>${city.name}</span>
            </div>
        `).join('');

        this.suggestionsContainer.classList.add('active');

        // Add click listeners to suggestions
        this.suggestionsContainer.querySelectorAll('.city-suggestion-item').forEach(item => {
            item.addEventListener('click', () => {
                this.selectCity(item.dataset.city, item.dataset.emoji);
                this.suggestionsContainer.classList.remove('active');
                this.searchInput.value = item.dataset.city;
            });
        });
    }

    // Select city
    selectCity(cityName, emoji) {
        this.selectedCityData = { name: cityName, emoji: emoji };

        // Remove previous selections
        document.querySelectorAll('.city-card-mini.selected').forEach(card => {
            card.classList.remove('selected');
        });

        // Mark selected
        const card = document.querySelector(`.city-card-mini[data-city="${cityName}"]`);
        if (card) {
            card.classList.add('selected');
        }

        // Enable confirm button
        document.getElementById('confirmCityBtn').disabled = false;
    }

    // Confirm selection
    confirmSelection() {
        if (!this.selectedCityData) return;

        cityService.setSelectedCity(this.selectedCityData.name, this.selectedCityData.emoji);
        this.hide();

        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('citySelected', {
            detail: { city: this.selectedCityData.name, emoji: this.selectedCityData.emoji }
        }));

        // Check if there's a pending service URL to navigate to
        const pendingServiceUrl = sessionStorage.getItem('pendingServiceUrl');
        if (pendingServiceUrl) {
            sessionStorage.removeItem('pendingServiceUrl');
            // Navigate to the service with selected city
            const city = this.selectedCityData.name;
            window.location.href = pendingServiceUrl.includes('?')
                ? `${pendingServiceUrl}&city=${encodeURIComponent(city)}`
                : `${pendingServiceUrl}?city=${encodeURIComponent(city)}`;
        } else {
            // Reload page to apply city
            window.location.reload();
        }
    }

    // Show modal
    show() {
        if (!this.modal) {
            this.createModal();
        }
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Hide modal
    hide() {
        if (this.modal) {
            this.modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    }

    // Check and show if needed
    checkAndShow() {
        if (!cityService.hasSelectedCity()) {
            this.show();
        }
    }
}

// Create global instance
const cityModal = new CityModal();

// Global function to open city modal
function openCityModal() {
    cityModal.show();
}

// Auto-check on page load
document.addEventListener('DOMContentLoaded', () => {
    cityModal.checkAndShow();
});
