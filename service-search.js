// Service Search - Smart keyword matching

const SERVICES_DATABASE = [
    // Corporate Events
    { name: 'Corporate Events', category: 'Corporate', url: 'corporate-events.html', keywords: ['corporate', 'business', 'company', 'office'] },
    { name: 'Dealers Meet', category: 'Corporate', url: 'dealers-meet.html', keywords: ['dealer', 'meet', 'business', 'corporate'] },
    { name: 'Product Launch', category: 'Corporate', url: 'product-launch.html', keywords: ['product', 'launch', 'unveiling', 'corporate'] },
    { name: 'Family Day', category: 'Corporate', url: 'family-day.html', keywords: ['family', 'day', 'corporate', 'fun'] },
    { name: 'Team Building', category: 'Corporate', url: 'team-building.html', keywords: ['team', 'building', 'corporate', 'activity'] },
    { name: 'Annual Day', category: 'Corporate', url: 'annual-day.html', keywords: ['annual', 'day', 'corporate', 'celebration'] },
    { name: 'Brand Promotion', category: 'Corporate', url: 'brand-promotion.html', keywords: ['brand', 'promotion', 'marketing', 'corporate'] },
    { name: 'Road Show', category: 'Corporate', url: 'road-show.html', keywords: ['road', 'show', 'promotion', 'marketing'] },
    { name: 'College Events', category: 'Corporate', url: 'college-events.html', keywords: ['college', 'campus', 'fest', 'event'] },
    { name: 'Sports Events', category: 'Corporate', url: 'sports-events.html', keywords: ['sports', 'tournament', 'game', 'competition'] },
    { name: 'Exhibitions', category: 'Corporate', url: 'exhibitions.html', keywords: ['exhibition', 'expo', 'display', 'show'] },
    { name: 'Conferences', category: 'Corporate', url: 'conferences.html', keywords: ['conference', 'seminar', 'summit', 'meeting'] },
    { name: 'Brand Activation', category: 'Corporate', url: 'brand-activation.html', keywords: ['brand', 'activation', 'marketing', 'experiential'] },

    // Weddings
    { name: 'Wedding Services', category: 'Wedding', url: 'weddings.html', keywords: ['wedding', 'marriage', 'shaadi', 'ceremony'] },
    { name: 'Wedding Decor', category: 'Wedding', url: 'wedding-decor.html', keywords: ['wedding', 'decor', 'decoration', 'setup'] },
    { name: 'Destination Wedding', category: 'Wedding', url: 'destination-wedding.html', keywords: ['destination', 'wedding', 'travel', 'location'] },
    { name: 'Luxury Wedding', category: 'Wedding', url: 'luxury-wedding.html', keywords: ['luxury', 'wedding', 'royal', 'premium'] },
    { name: 'Wedding Planning', category: 'Wedding', url: 'wedding-planning.html', keywords: ['wedding', 'planning', 'planner', 'coordination'] },
    { name: 'Pre-Wedding', category: 'Wedding', url: 'pre-wedding.html', keywords: ['pre', 'wedding', 'ceremony', 'ritual'] },
    { name: 'Traditional Wedding', category: 'Wedding', url: 'traditional-wedding.html', keywords: ['traditional', 'wedding', 'cultural', 'ritual'] },

    // Celebrations
    { name: 'Celebrations & Festivals', category: 'Celebration', url: 'celebrations.html', keywords: ['celebration', 'festival', 'party', 'event'] },
    { name: 'Holi Celebration', category: 'Celebration', url: 'holi-celebration.html', keywords: ['holi', 'color', 'festival', 'celebration'] },
    { name: 'Diwali Celebrations', category: 'Celebration', url: 'diwali-celebrations.html', keywords: ['diwali', 'deepavali', 'festival', 'lights'] },
    { name: 'Christmas Celebration', category: 'Celebration', url: 'christmas-celebration.html', keywords: ['christmas', 'xmas', 'festival', 'celebration'] },
    { name: 'Independence Day', category: 'Celebration', url: 'independence-day.html', keywords: ['independence', 'republic', 'day', 'patriotic'] },
    { name: 'New Year Celebration', category: 'Celebration', url: 'new-year-celebration.html', keywords: ['new', 'year', 'party', 'countdown'] },

    // Entertainment
    { name: 'Entertainment & Shows', category: 'Entertainment', url: 'entertainment.html', keywords: ['entertainment', 'show', 'performance', 'event'] },
    { name: 'Fashion Show', category: 'Entertainment', url: 'fashion-show.html', keywords: ['fashion', 'show', 'runway', 'model'] },
    { name: 'Live Concerts', category: 'Entertainment', url: 'live-concerts.html', keywords: ['concert', 'music', 'live', 'performance'] },
    { name: 'Award Nights', category: 'Entertainment', url: 'award-nights.html', keywords: ['award', 'night', 'ceremony', 'gala'] },
    { name: 'Carnival Events', category: 'Entertainment', url: 'carnival-events.html', keywords: ['carnival', 'fair', 'fun', 'rides'] },
    { name: 'Theme Party', category: 'Entertainment', url: 'theme-party.html', keywords: ['theme', 'party', 'celebration', 'event'] },
    { name: 'Games & Activities', category: 'Entertainment', url: 'games-activities.html', keywords: ['games', 'activities', 'fun', 'interactive'] },
    { name: 'Social Events', category: 'Entertainment', url: 'social-events.html', keywords: ['social', 'event', 'gathering', 'community'] }
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
