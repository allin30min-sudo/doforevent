// Service Search - Smart keyword matching

const SERVICES_DATABASE = [
    // Corporate Events
    { name: 'Corporate Events', category: 'Corporate', url: 'services/corporate-events.html', keywords: ['corporate', 'business', 'company', 'office'] },
    { name: 'Dealers Meet', category: 'Corporate', url: 'services/corporate/dealers-meet.html', keywords: ['dealer', 'meet', 'business', 'corporate'] },
    { name: 'Product Launch', category: 'Corporate', url: 'services/corporate/product-launch.html', keywords: ['product', 'launch', 'unveiling', 'corporate'] },
    { name: 'Family Day', category: 'Corporate', url: 'services/corporate/family-day.html', keywords: ['family', 'day', 'corporate', 'fun'] },
    { name: 'Team Building', category: 'Corporate', url: 'services/corporate/team-building.html', keywords: ['team', 'building', 'corporate', 'activity'] },
    { name: 'Annual Day', category: 'Corporate', url: 'services/corporate/annual-day.html', keywords: ['annual', 'day', 'corporate', 'celebration'] },
    { name: 'Brand Promotion', category: 'Corporate', url: 'services/corporate/brand-promotion.html', keywords: ['brand', 'promotion', 'marketing', 'corporate'] },
    { name: 'Road Show', category: 'Corporate', url: 'services/corporate/road-show.html', keywords: ['road', 'show', 'promotion', 'marketing'] },
    { name: 'College Events', category: 'Corporate', url: 'services/corporate/college-events.html', keywords: ['college', 'campus', 'fest', 'event'] },
    { name: 'Sports Events', category: 'Corporate', url: 'services/corporate/sports-events.html', keywords: ['sports', 'tournament', 'game', 'competition'] },
    { name: 'Exhibitions', category: 'Corporate', url: 'services/corporate/exhibitions.html', keywords: ['exhibition', 'expo', 'display', 'show'] },
    { name: 'Conferences', category: 'Corporate', url: 'services/corporate/conferences.html', keywords: ['conference', 'seminar', 'summit', 'meeting'] },
    { name: 'Brand Activation', category: 'Corporate', url: 'services/corporate/brand-activation.html', keywords: ['brand', 'activation', 'marketing', 'experiential'] },

    // Weddings
    { name: 'Wedding Services', category: 'Wedding', url: 'services/weddings.html', keywords: ['wedding', 'marriage', 'shaadi', 'ceremony'] },
    { name: 'Wedding Decor', category: 'Wedding', url: 'services/weddings/wedding-decor.html', keywords: ['wedding', 'decor', 'decoration', 'setup'] },
    { name: 'Destination Wedding', category: 'Wedding', url: 'services/weddings/destination-wedding.html', keywords: ['destination', 'wedding', 'travel', 'location'] },
    { name: 'Luxury Wedding', category: 'Wedding', url: 'services/weddings/luxury-wedding.html', keywords: ['luxury', 'wedding', 'royal', 'premium'] },
    { name: 'Wedding Planning', category: 'Wedding', url: 'services/weddings/wedding-planning.html', keywords: ['wedding', 'planning', 'planner', 'coordination'] },
    { name: 'Pre-Wedding', category: 'Wedding', url: 'services/weddings/pre-wedding.html', keywords: ['pre', 'wedding', 'ceremony', 'ritual'] },
    { name: 'Traditional Wedding', category: 'Wedding', url: 'services/weddings/traditional-wedding.html', keywords: ['traditional', 'wedding', 'cultural', 'ritual'] },

    // Celebrations
    { name: 'Celebrations & Festivals', category: 'Celebration', url: 'services/celebrations.html', keywords: ['celebration', 'festival', 'party', 'event'] },
    { name: 'Holi Celebration', category: 'Celebration', url: 'services/celebrations/holi-celebration.html', keywords: ['holi', 'color', 'festival', 'celebration'] },
    { name: 'Diwali Celebrations', category: 'Celebration', url: 'services/celebrations/diwali-celebrations.html', keywords: ['diwali', 'deepavali', 'festival', 'lights'] },
    { name: 'Christmas Celebration', category: 'Celebration', url: 'services/celebrations/christmas-celebration.html', keywords: ['christmas', 'xmas', 'festival', 'celebration'] },
    { name: 'Independence Day', category: 'Celebration', url: 'services/celebrations/independence-day.html', keywords: ['independence', 'republic', 'day', 'patriotic'] },
    { name: 'New Year Celebration', category: 'Celebration', url: 'services/celebrations/new-year-celebration.html', keywords: ['new', 'year', 'party', 'countdown'] },

    // Entertainment
    { name: 'Entertainment & Shows', category: 'Entertainment', url: 'services/entertainment.html', keywords: ['entertainment', 'show', 'performance', 'event'] },
    { name: 'Fashion Show', category: 'Entertainment', url: 'services/entertainment/fashion-show.html', keywords: ['fashion', 'show', 'runway', 'model'] },
    { name: 'Live Concerts', category: 'Entertainment', url: 'services/entertainment/live-concerts.html', keywords: ['concert', 'music', 'live', 'performance'] },
    { name: 'Award Nights', category: 'Entertainment', url: 'services/entertainment/award-nights.html', keywords: ['award', 'night', 'ceremony', 'gala'] },
    { name: 'Carnival Events', category: 'Entertainment', url: 'services/entertainment/carnival-events.html', keywords: ['carnival', 'fair', 'fun', 'rides'] },
    { name: 'Theme Party', category: 'Entertainment', url: 'services/entertainment/theme-party.html', keywords: ['theme', 'party', 'celebration', 'event'] },
    { name: 'Games & Activities', category: 'Entertainment', url: 'services/entertainment/games-activities.html', keywords: ['games', 'activities', 'fun', 'interactive'] },
    { name: 'Social Events', category: 'Entertainment', url: 'services/entertainment/social-events.html', keywords: ['social', 'event', 'gathering', 'community'] }
];

// Search services by keyword
function searchServices(query) {
    if (!query || query.length < 2) return [];

    const lowerQuery = query.toLowerCase();

    return SERVICES_DATABASE.filter(service => {
        // Match in name
        if (service.name.toLowerCase().includes(lowerQuery)) return true;

        // Match in keywords
        return service.keywords.some(keyword => keyword.includes(lowerQuery));
    }).slice(0, 8); // Limit to 8 suggestions
}

// Get service URL with city parameter
function getServiceURL(serviceUrl, city) {
    if (city) {
        return `${serviceUrl}?city=${encodeURIComponent(city)}`;
    }
    return serviceUrl;
}
