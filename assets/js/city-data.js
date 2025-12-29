// Pan-India City & State Database with Emojis
const INDIAN_CITIES = [
    // Top Tier / Popular
    { name: 'Delhi', state: 'Delhi NCR', emoji: '🏛️', popular: true },
    { name: 'Mumbai', state: 'Maharashtra', emoji: '🌉', popular: true },
    { name: 'Bengaluru', state: 'Karnataka', emoji: '🌆', popular: true },
    { name: 'Chennai', state: 'Tamil Nadu', emoji: '🛕', popular: true },
    { name: 'Hyderabad', state: 'Telangana', emoji: '🕌', popular: true },
    { name: 'Kolkata', state: 'West Bengal', emoji: '🎭', popular: true },
    { name: 'Jaipur', state: 'Rajasthan', emoji: '🏰', popular: true },
    { name: 'Pune', state: 'Maharashtra', emoji: '🎓', popular: true },
    { name: 'Ahmedabad', state: 'Gujarat', emoji: '🏛️', popular: true },
    { name: 'Lucknow', state: 'Uttar Pradesh', emoji: '🕌', popular: true },
    { name: 'Chandigarh', state: 'Punjab/Haryana', emoji: '🌳', popular: true },
    { name: 'Goa', state: 'Goa', emoji: '🏖️', popular: true },

    // Delhi NCR
    { name: 'Noida', state: 'Uttar Pradesh', emoji: '🏙️', popular: false },
    { name: 'Gurugram', state: 'Haryana', emoji: '🏢', popular: false },
    { name: 'Ghaziabad', state: 'Uttar Pradesh', emoji: '🏙️', popular: false },
    { name: 'Faridabad', state: 'Haryana', emoji: '🏙️', popular: false },
    { name: 'Greater Noida', state: 'Uttar Pradesh', emoji: '🏢', popular: false },

    // Maharashtra
    { name: 'Nagpur', state: 'Maharashtra', emoji: '🍊', popular: false },
    { name: 'Thane', state: 'Maharashtra', emoji: '🌆', popular: false },
    { name: 'Nashik', state: 'Maharashtra', emoji: '🍇', popular: false },
    { name: 'Aurangabad', state: 'Maharashtra', emoji: '🏰', popular: false },
    { name: 'Navi Mumbai', state: 'Maharashtra', emoji: '🏘️', popular: false },
    { name: 'Solapur', state: 'Maharashtra', emoji: '🧵', popular: false },

    // North India
    { name: 'Agra', state: 'Uttar Pradesh', emoji: '🕌', popular: false },
    { name: 'Varanasi', state: 'Uttar Pradesh', emoji: '🕉️', popular: false },
    { name: 'Kanpur', state: 'Uttar Pradesh', emoji: '🏭', popular: false },
    { name: 'Meerut', state: 'Uttar Pradesh', emoji: '🏛️', popular: false },
    { name: 'Prayagraj', state: 'Uttar Pradesh', emoji: '🌊', popular: false },
    { name: 'Amritsar', state: 'Punjab', emoji: '🕌', popular: false },
    { name: 'Ludhiana', state: 'Punjab', emoji: '🧵', popular: false },
    { name: 'Jalandhar', state: 'Punjab', emoji: '🏟️', popular: false },
    { name: 'Ludhiana', state: 'Punjab', emoji: '🧶', popular: false },
    { name: 'Patiala', state: 'Punjab', emoji: '🏛️', popular: false },
    { name: 'Dehradun', state: 'Uttarakhand', emoji: '🏔️', popular: false },
    { name: 'Haridwar', state: 'Uttarakhand', emoji: '🕉️', popular: false },
    { name: 'Shimla', state: 'Himachal Pradesh', emoji: '⛰️', popular: false },
    { name: 'Srinagar', state: 'Jammu & Kashmir', emoji: '🏔️', popular: false },
    { name: 'Jammu', state: 'Jammu & Kashmir', emoji: '🏔️', popular: false },

    // South India
    { name: 'Mysore', state: 'Karnataka', emoji: '🏰', popular: false },
    { name: 'Mangaluru', state: 'Karnataka', emoji: '🏖️', popular: false },
    { name: 'Coimbatore', state: 'Tamil Nadu', emoji: '🏭', popular: false },
    { name: 'Madurai', state: 'Tamil Nadu', emoji: '🛕', popular: false },
    { name: 'Kochi', state: 'Kerala', emoji: '🌴', popular: false },
    { name: 'Trivandrum', state: 'Kerala', emoji: '🌴', popular: false },
    { name: 'Visakhapatnam', state: 'Andhra Pradesh', emoji: '🏖️', popular: false },
    { name: 'Vijayawada', state: 'Andhra Pradesh', emoji: '🏛️', popular: false },
    { name: 'Tirupati', state: 'Andhra Pradesh', emoji: '🛕', popular: false },

    // West India
    { name: 'Surat', state: 'Gujarat', emoji: '💎', popular: false },
    { name: 'Vadodara', state: 'Gujarat', emoji: '🏰', popular: false },
    { name: 'Rajkot', state: 'Gujarat', emoji: '🏛️', popular: false },
    { name: 'Udaipur', state: 'Rajasthan', emoji: '🏰', popular: false },
    { name: 'Jodhpur', state: 'Rajasthan', emoji: '🏰', popular: false },
    { name: 'Kota', state: 'Rajasthan', emoji: '🎓', popular: false },

    // Central India
    { name: 'Indore', state: 'Madhya Pradesh', emoji: '🏛️', popular: false },
    { name: 'Bhopal', state: 'Madhya Pradesh', emoji: '🏞️', popular: false },
    { name: 'Gwalior', state: 'Madhya Pradesh', emoji: '🏰', popular: false },
    { name: 'Jabalpur', state: 'Madhya Pradesh', emoji: '🏞️', popular: false },
    { name: 'Raipur', state: 'Chhattisgarh', emoji: '🏛️', popular: false },
    { name: 'Bhilai', state: 'Chhattisgarh', emoji: '🏭', popular: false },

    // East & North East
    { name: 'Patna', state: 'Bihar', emoji: '🏛️', popular: false },
    { name: 'Gaya', state: 'Bihar', emoji: '🕉️', popular: false },
    { name: 'Bhubaneswar', state: 'Odisha', emoji: '🛕', popular: false },
    { name: 'Cuttack', state: 'Odisha', emoji: '🏛️', popular: false },
    { name: 'Guwahati', state: 'Assam', emoji: '🏞️', popular: false },
    { name: 'Ranchi', state: 'Jharkhand', emoji: '🏞️', popular: false },
    { name: 'Jamshedpur', state: 'Jharkhand', emoji: '🏭', popular: false },
    { name: 'Shillong', state: 'Meghalaya', emoji: '🏔️', popular: false },
    { name: 'Imphal', state: 'Manipur', emoji: '🏯', popular: false }
];

// Get popular cities
function getPopularCities() {
    return INDIAN_CITIES.filter(city => city.popular);
}

// Get all cities
function getAllCities() {
    return INDIAN_CITIES;
}

// Search cities by name or state
function searchCities(query) {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return INDIAN_CITIES.filter(city =>
        city.name.toLowerCase().includes(lowerQuery) ||
        city.state.toLowerCase().includes(lowerQuery)
    ).slice(0, 15); // Increased limit to 15 for better state-based discovery
}

// Get city by name
function getCityByName(name) {
    return INDIAN_CITIES.find(city =>
        city.name.toLowerCase() === name.toLowerCase()
    );
}
