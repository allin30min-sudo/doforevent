// City Database with Emojis
const INDIAN_CITIES = [
    { name: 'Delhi', emoji: '🏛️', popular: true },
    { name: 'Mumbai', emoji: '🌉', popular: true },
    { name: 'Bengaluru', emoji: '🌆', popular: true },
    { name: 'Chennai', emoji: '🛕', popular: true },
    { name: 'Hyderabad', emoji: '🕌', popular: true },
    { name: 'Kolkata', emoji: '🎭', popular: true },
    { name: 'Jaipur', emoji: '🏰', popular: true },
    { name: 'Agra', emoji: '🕌', popular: true },
    { name: 'Pune', emoji: '🎓', popular: true },
    { name: 'Ahmedabad', emoji: '🏛️', popular: true },

    // Additional Cities
    { name: 'Surat', emoji: '💎', popular: false },
    { name: 'Lucknow', emoji: '🕌', popular: false },
    { name: 'Kanpur', emoji: '🏭', popular: false },
    { name: 'Nagpur', emoji: '🍊', popular: false },
    { name: 'Indore', emoji: '🏛️', popular: false },
    { name: 'Thane', emoji: '🌆', popular: false },
    { name: 'Bhopal', emoji: '🏞️', popular: false },
    { name: 'Visakhapatnam', emoji: '🏖️', popular: false },
    { name: 'Pimpri-Chinchwad', emoji: '🏭', popular: false },
    { name: 'Patna', emoji: '🏛️', popular: false },
    { name: 'Vadodara', emoji: '🏰', popular: false },
    { name: 'Ghaziabad', emoji: '🏙️', popular: false },
    { name: 'Ludhiana', emoji: '🧵', popular: false },
    { name: 'Nashik', emoji: '🍇', popular: false },
    { name: 'Faridabad', emoji: '🏙️', popular: false },
    { name: 'Meerut', emoji: '🏛️', popular: false },
    { name: 'Rajkot', emoji: '🏛️', popular: false },
    { name: 'Varanasi', emoji: '🕉️', popular: false },
    { name: 'Srinagar', emoji: '🏔️', popular: false },
    { name: 'Amritsar', emoji: '🕌', popular: false },
    { name: 'Chandigarh', emoji: '🌳', popular: false },
    { name: 'Jodhpur', emoji: '🏰', popular: false },
    { name: 'Udaipur', emoji: '🏰', popular: false },
    { name: 'Guwahati', emoji: '🏞️', popular: false },
    { name: 'Bhubaneswar', emoji: '🛕', popular: false },
    { name: 'Dehradun', emoji: '🏔️', popular: false },
    { name: 'Shimla', emoji: '⛰️', popular: false },
    { name: 'Mysore', emoji: '🏰', popular: false },
    { name: 'Kochi', emoji: '🌴', popular: false },
    { name: 'Coimbatore', emoji: '🏭', popular: false },
    { name: 'Madurai', emoji: '🛕', popular: false },
    { name: 'Trivandrum', emoji: '🌴', popular: false },
    { name: 'Goa', emoji: '🏖️', popular: false },
    { name: 'Ranchi', emoji: '🏞️', popular: false },
    { name: 'Raipur', emoji: '🏛️', popular: false },
    { name: 'Jammu', emoji: '🏔️', popular: false },
    { name: 'Jabalpur', emoji: '🏞️', popular: false },
    { name: 'Gwalior', emoji: '🏰', popular: false },
    { name: 'Vijayawada', emoji: '🏛️', popular: false },
    { name: 'Noida', emoji: '🏙️', popular: false },
    { name: 'Gurugram', emoji: '🏢', popular: false }
];

// Get popular cities
function getPopularCities() {
    return INDIAN_CITIES.filter(city => city.popular);
}

// Get all cities
function getAllCities() {
    return INDIAN_CITIES;
}

// Search cities by name
function searchCities(query) {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return INDIAN_CITIES.filter(city =>
        city.name.toLowerCase().includes(lowerQuery)
    ).slice(0, 10); // Limit to 10 suggestions
}

// Get city by name
function getCityByName(name) {
    return INDIAN_CITIES.find(city =>
        city.name.toLowerCase() === name.toLowerCase()
    );
}
