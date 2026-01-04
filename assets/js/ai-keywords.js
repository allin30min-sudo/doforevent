/**
 * EXPANDED AI Chatbot Keyword Dictionary
 * Event Planning, Tent, Catering, Party Planning Business
 * 
 * Hindi | Hinglish | English - Complete Coverage
 * Optimized for Indian Event Management Context
 * 
 * Format: Each category contains an array of keywords (lowercase)
 * The bot will automatically use these keywords for query detection.
 */

const AI_KEYWORDS = {
    // ========== INFORMATION REQUEST KEYWORDS ==========
    // Used when user wants to know about something
    info: [
        // English - Basic
        'show', 'tell', 'information', 'info', 'details', 'explain',
        'describe', 'elaborate', 'brief', 'summary', 'overview', 'breakdown',

        // English - Specific
        'what is', 'what are', 'who is', 'when is', 'where is', 'how is',
        'how to', 'how does', 'how many', 'how much', 'which',

        // Hindi/Hinglish
        'janna', 'jaanna', 'dekhna', 'batao', 'bataiye', 'dikhao', 'dikhaiye',
        'samjhao', 'samjhiye', 'sunao', 'suno', 'suniye',

        // Question patterns
        'kya kya', 'kon kon', 'kaun kaun', 'chahiye', 'hai', 'hain',
        'kya hai', 'kya hote hain', 'kya milega', 'kya h',

        // More details
        'more', 'further', 'additional', 'extra', 'details', 'clarification',
        'example', 'instances', 'samples'
    ],

    // ========== BOOKING INTENT KEYWORDS ==========
    // Used when user wants to book/plan an event
    booking: [
        // English - Primary
        'book', 'booking', 'plan', 'planning', 'organize', 'organise',
        'arrange', 'arrange karna', 'quote', 'quotation', 'price', 'pricing',
        'cost', 'reserve', 'reservation', 'book karna', 'book karwana',

        // Hindi/Hinglish - Booking
        'karwani', 'karwana', 'karna hai', 'karna chahta', 'karwao',
        'booking karni hai', 'karwani hai', 'mil sakta hai', 'available hai kya',
        'date fix karna', 'fix karna', 'time set karna',

        // Time-related
        'schedule', 'scheduled', 'timing', 'when', 'date', 'time',
        'kab', 'kab ka hai', 'date set karna',

        // Confirmation
        'confirm', 'confirmation', 'finalize', 'finalise', 'lock', 'locked',
        'confirm karna', 'confirm ho gaya', 'pakka karna',

        // Alternative terms
        'setup', 'arrange karna', 'event karna', 'organize karna'
    ],

    // ========== SERVICE/PACKAGE KEYWORDS ==========
    // Used when user asks about services or packages
    services: [
        // Basic service words
        'service', 'services', 'seva', 'sevaye', 'package', 'packages',
        'offer', 'offering', 'provide', 'providing', 'available', 'options',
        'plans', 'plan', 'solutions', 'solution',

        // Types/Varieties
        'what kind', 'what type', 'which service', 'what service',
        'kya service', 'kaun si service', 'kis tarah ki', 'kis prakar ki',
        'do you have', 'hai kya', 'milega kya',

        // General event words
        'event', 'events', 'arrangement', 'arrangements', 'facility', 'facilities',
        'amenities', 'features', 'bhoj', 'khana pina',

        // Specific services
        'catering', 'food', 'decoration', 'sound', 'light', 'lighting',
        'stage', 'setup', 'tent', 'pandal', 'seating', 'tables',
        'chairs', 'management', 'coordination', 'staffing',

        // Add-ons
        'addon', 'add-on', 'extra', 'additional', 'special', 'premium'
    ],

    // ========== CATEGORY: WEDDING ==========
    wedding: [
        // English - Core
        'wedding', 'marriage', 'bride', 'groom', 'shaadi', 'engagement',
        'bridal', 'mehendi', 'bachelorette', 'bachelor', 'reception',

        // Hindi - Core
        'shadi', 'shaadi', 'shaadee', 'vivah', 'byah', 'byaah',
        'vivah samaroh', 'dulhan', 'dulha', 'nikah', 'phere', 'mandap',
        'mangni', 'engagement', 'mehendi ki', 'sangeet ki',

        // Related terms
        'walima', 'baraat', 'baarat', 'tilak', 'sakshara', 'griha pravesh',
        'haldi', 'kalire', 'chura', 'chooda',

        // People
        'parents', 'family', 'relatives', 'mahapanch', 'pandits',
        'astrologer', 'pundit'
    ],

    // ========== CATEGORY: CORPORATE ==========
    corporate: [
        // English - Core
        'corporate', 'office', 'company', 'business', 'professional',
        'conference', 'seminar', 'launch', 'meeting', 'workshop',
        'annual', 'board', 'summit', 'expo', 'trade show',

        // Hindi/Hinglish
        'karyakram', 'company event', 'corporate event', 'vyavsayik',
        'sammelan', 'goshti', 'baithak', 'prasneshan',

        // Specific events
        'awards', 'awards ceremony', 'product launch', 'press conference',
        'dealer meet', 'sales conference', 'incentive event'
    ],

    // ========== CATEGORY: CELEBRATION ==========
    celebration: [
        // English - Core
        'celebration', 'party', 'birthday', 'anniversary', 'festival',
        'occasion', 'event', 'festive', 'jubilee', 'milestone',

        // Festivals - English
        'diwali', 'holi', 'christmas', 'new year', 'navratri', 'eid',
        'durga puja', 'rakshabandhan', 'teej', 'ganesh chaturthi',
        'janmashtami', 'halloween', 'easter', 'thanksgiving',

        // Hindi - Core
        'jashn', 'utsav', 'tyohar', 'janamdin', 'varshikhi',
        'mahotsav', 'sammelan', 'samaroh', 'samarohik',

        // Specific celebrations
        'housewarming', 'griha pravesh', 'mundan', 'anna prashan',
        'upanayana', 'retirement party', 'farewell', 'welcome party',
        'baby shower', 'bridal shower', 'engagement', 'ring ceremony'
    ],

    // ========== CATEGORY: ENTERTAINMENT ==========
    entertainment: [
        // English - Core
        'entertainment', 'concert', 'show', 'artist', 'fashion', 'program',
        'performance', 'carnival', 'award', 'competition', 'music',
        'DJ', 'live band', 'singer', 'dancer', 'choreographer',

        // Hindi
        'manoranjan', 'program', 'sangeet', 'nritya', 'kalakar',
        'pradarshan', 'natya', 'sangeet samaroh',

        // Specific entertainment
        'anchor', 'emcee', 'comedian', 'magician', 'photographer',
        'videographer', 'cinematography', 'decoration', 'themed decoration'
    ],

    // ========== VENUE & LOGISTICS ==========
    venue: [
        // Venue types
        'venue', 'location', 'place', 'hall', 'banquet', 'resort',
        'hotel', 'garden', 'open space', 'indoor', 'outdoor',
        'pandal', 'tent', 'ground', 'garden venue', 'heritage venue',

        // Hindi
        'jagah', 'sthal', 'kshetra', 'bhawan', 'kamra', 'baag',
        'khet', 'mandap', 'chhatri', 'shamiyana', 'pandal',

        // Logistics
        'setup', 'arrange karna', 'location fix', 'site', 'layout',
        'capacity', 'guest count', 'headcount', 'crowd management'
    ],

    // ========== CATERING & FOOD ==========
    catering: [
        // English - Core
        'catering', 'food', 'menu', 'cuisine', 'dishes', 'beverages',
        'drinks', 'snacks', 'refreshments', 'hospitality',
        'vegetarian', 'vegan', 'non-vegetarian', 'veg', 'non-veg',

        // Hindi
        'khana', 'khana pina', 'khaana', 'menu', 'pakaad',
        'shakahari', 'maans', 'shudh shakahari', 'pakwaan',

        // Specific food
        'buffet', 'plated', 'continental', 'indian', 'fusion',
        'traditional', 'regional', 'cake', 'dessert', 'mocktail',
        'cocktail', 'bar service', 'alcohol',

        // Dietary
        'jain', 'halal', 'kosher', 'gluten-free', 'lactose-free',
        'no onion garlic', 'allergies', 'dietary restrictions'
    ],

    // ========== DECORATION & SETUP ==========
    decoration: [
        // English
        'decoration', 'decorations', 'decor', 'theme', 'themed',
        'flowers', 'floral', 'lighting', 'lights', 'backdrop',
        'centerpiece', 'installation', 'props', 'stage design',

        // Hindi
        'sajan saja', 'phool patti', 'rang rang', 'rangin',
        'prakash', 'diye', 'jhoomren', 'chandelier',

        // Specific decor
        'table decoration', 'entrance decor', 'stage setup',
        'mandap decoration', 'flower arrangement', 'bonsai',
        'balloon decor', 'lights installation', 'sound system'
    ],

    // ========== TENT & PANDAL ==========
    tent: [
        // English
        'tent', 'pandal', 'shamiana', 'marquee', 'canopy', 'temporary structure',
        'weather protection', 'shade', 'rain protection',

        // Hindi
        'shamiyana', 'pandal', 'chhatri', 'sambhu', 'chatri',
        'sayan', 'aawas', 'chhp',

        // Specifications
        'size', 'capacity', 'waterproof', 'heater', 'cooler',
        'air conditioning', 'ventilation', 'flooring',
        'colors', 'design', 'durability'
    ],

    // ========== GREETING KEYWORDS ==========
    greetings: [
        // English
        'hello', 'hi', 'hey', 'good morning', 'good evening', 'good afternoon',
        'good night', 'welcome', 'hello ji', 'hi there',

        // Hindi
        'namaste', 'namaskar', 'suno', 'suniye', 'aapko swagat hai',
        'swagatam', 'hmare paas aaye', 'aao aao',

        // Questions
        'kaise ho', 'kaise hain', 'how are you', 'how are you doing',
        'kya haal hai', 'theek ho na', 'sab theek'
    ],

    // ========== HELP KEYWORDS ==========
    help: [
        // English
        'help', 'assist', 'support', 'guide', 'guidance', 'suggestion',
        'advise', 'advice', 'help me', 'assist me', 'guide me',

        // Hindi
        'madad', 'sahayata', 'help karo', 'madad karo',
        'rasta dikhao', 'suggest karo', 'salah dedo'
    ],

    // ========== CONTACT KEYWORDS ==========
    contact: [
        // English
        'contact', 'phone', 'number', 'email', 'whatsapp', 'call',
        'reach', 'reach out', 'message', 'text', 'telegram',
        'facebook', 'instagram', 'contact details', 'phone number',

        // Hindi
        'sampark', 'milna', 'baat karna', 'phone karo', 'call karo',
        'whatsapp karo', 'message karo', 'contact details',
        'number do', 'pata batao'
    ],

    // ========== AFFIRMATIVE (YES) ==========
    yes: [
        // English
        'yes', 'yeah', 'yup', 'sure', 'ok', 'okay', 'correct', 'right',
        'absolutely', 'definitely', 'for sure', 'go ahead', 'fine',
        'alright', 'agreed', 'accepted', 'confirmed',

        // Hindi
        'haan', 'ha', 'bilkul', 'theek hai', 'sahi', 'ji haan',
        'haan bilkul', 'jaroor', 'pakka', 'theek', 'chalo',
        'accept', 'samjha', 'ok', 'thik h'
    ],

    // ========== NEGATIVE (NO) ==========
    no: [
        // English
        'no', 'nope', 'not', 'never', 'cannot', 'cant', 'don\'t', 'doesnt',
        'won\'t', 'wont', 'reject', 'rejected', 'decline', 'declined',
        'not possible', 'not available',

        // Hindi
        'nahi', 'na', 'mat', 'naa', 'nahi hota', 'nahi sakte',
        'nahi milega', 'banda hai', 'ho nahi sakta',
        'dikkat hai', 'problem h', 'nahi kar sakte'
    ],

    // ========== EDIT/CHANGE KEYWORDS ==========
    edit: [
        // English
        'edit', 'change', 'modify', 'update', 'correct', 'fix', 'alter',
        'replace', 'substitute', 'switch', 'cancel', 'revise',
        'adjust', 'tweak', 'change karo',

        // Hindi
        'badlo', 'badalna', 'sudhar', 'sudhar dena', 'badal dena',
        'hata dena', 'remove karo', 'lagao', 'hatao',
        'naya karo', 'new karo', 'alag karo'
    ],

    // ========== SKIP KEYWORDS ==========
    skip: [
        // English
        'skip', 'next', 'pass', 'none', 'nothing', 'no thanks',
        'forget about it', 'forget', 'leave it', 'nevermind',
        'ignore', 'move on', 'later', 'not now',

        // Hindi
        'chhodo', 'rehne do', 'kuch nahi', 'aage badho',
        'baad mein', 'abhi nahi', 'dhik set karo', 'bhul jao'
    ],

    // ========== PRICING/BUDGET KEYWORDS ==========
    pricing: [
        // English
        'price', 'cost', 'rate', 'charges', 'fee', 'fees', 'budget',
        'expenditure', 'expense', 'expensive', 'cheap', 'affordable',
        'cost-effective', 'discount', 'offer', 'deal',
        'per plate', 'per head', 'per person', 'total cost',

        // Hindi
        'kitna', 'kharcha', 'paisa', 'rupees', 'lakh', 'thousand',
        'sasta', 'mehenga', 'muft', 'discount', 'kam rate mein',
        'budget friendly', 'utna kharcha', 'kul kharch',
        'har ek ka', 'sab ka', 'kaul ka', 'mahino ka'
    ],

    // ========== LOCATION KEYWORDS ==========
    location: [
        // English
        'where', 'location', 'venue', 'place', 'city', 'area',
        'address', 'direction', 'nearby', 'accessibility', 'parking',
        'distance', 'from', 'to', 'region',

        // Hindi
        'kaha', 'jagah', 'sthal', 'shahar', 'kshetra', 'pooch',
        'kis kshetra mein', 'kis taraf', 'duri', 'path batao'
    ],

    // ========== TIMING/DURATION ==========
    timing: [
        // English
        'time', 'duration', 'how long', 'how many hours', 'hours',
        'days', 'months', 'when', 'date', 'timing', 'schedule',
        'start time', 'end time', 'morning', 'evening', 'night',
        'afternoon', 'early', 'late', 'before', 'after',

        // Hindi
        'kab', 'kitna waqt', 'kitni der', 'ghante', 'din',
        'mahine', 'samay', 'time', 'subah', 'shaam',
        'raat', 'dopahar', 'pehle', 'baad mein',
        'kab tak', 'tak kab', 'kitnay samay baad'
    ],

    // ========== AVAILABILITY ==========
    availability: [
        // English
        'available', 'availability', 'free', 'open', 'booked',
        'available on', 'can you', 'do you have', 'is it available',
        'slot', 'dates', 'when is it available',

        // Hindi
        'mil sakta hai', 'milega', 'available hai', 'khali hai',
        'band hai', 'book ho gaya', 'ka milega', 'kar sakte ho',
        'available h kya', 'ya din available h'
    ],

    // ========== COMPLAINT/ISSUE ==========
    complaint: [
        // English
        'problem', 'issue', 'complaint', 'concern', 'worried', 'trouble',
        'not happy', 'not satisfied', 'disappointed', 'unhappy',
        'what about', 'what if', 'but', 'however', 'yet',

        // Hindi
        'problem', 'dikkat', 'masla', 'shikayat', 'tension',
        'pareshan', 'sukh nahi', 'dukhi', 'khush nahi',
        'lekin', 'par', 'tension mat lo', 'chinta mat karo'
    ],

    // ========== APPROVAL/PERMISSION ==========
    approval: [
        // English
        'approve', 'approval', 'okay', 'permit', 'permission', 'allow',
        'allowed', 'possible', 'can we', 'can i', 'is it okay',
        'is it alright', 'do we have', 'do you allow',

        // Hindi
        'sah hai', 'theek h', 'chalo', 'mujhe ijazat do',
        'kar sakte ho', 'kar sakta hu', 'samadhan karoge',
        'shuddha ho gaya', 'pass ho gaya', 'approve ho gaya'
    ],

    // ========== QUANTITY/NUMBERS ==========
    quantity: [
        // English
        'how many', 'how much', 'quantity', 'number', 'count',
        'guests', 'people', 'plates', 'servings', 'units',
        'total', 'per person', 'each', 'all',

        // Hindi
        'kitne', 'kitna', 'sankhya', 'ginti', 'log', 'vyakti',
        'plate', 'thali', 'koyi', 'sab', 'har ek',
        'total kitne', 'sab milakar', 'ka kul'
    ],

    // ========== CUSTOMIZATION ==========
    customization: [
        // English
        'custom', 'customize', 'customize karo', 'special', 'special request',
        'specific', 'personalized', 'tailor', 'bespoke', 'unique',
        'your choice', 'your preference', 'your way',

        // Hindi
        'apni pasand se', 'custom karo', 'special chahiye',
        'apni tarah se', 'apne anusar', 'vichar karo',
        'niyukt', 'apna banao', 'special order'
    ],

    // ========== GUARANTEE/WARRANTY ==========
    guarantee: [
        // English
        'guarantee', 'guaranteed', 'assure', 'assurance', 'promise',
        'promise karna', 'sure', 'will', 'definitely', 'certainly',
        'no issues', 'quality', 'best quality',

        // Hindi
        'guarantee h', 'pakka h', 'bilkul h', 'aashwast karo',
        'promise h', 'pakka pakka', 'zaroor hota h',
        'koi problem nahi hoga', 'sab theek rahega'
    ],

    // ========== PAYMENT TERMS ==========
    payment: [
        // English
        'payment', 'advance', 'deposit', 'installment', 'monthly',
        'pay', 'paid', 'invoice', 'bill', 'receipt', 'transaction',
        'bank transfer', 'cash', 'online', 'cheque', 'card',
        'payment plan', 'payment terms',

        // Hindi
        'payment', 'advance dena', 'jama', 'kist', 'paye',
        'bill bhejo', 'receipt do', 'invoice', 'bank transfer',
        'naqad', 'cheque', 'online pay', 'card se pay'
    ],

    // ========== CANCELLATION ==========
    cancellation: [
        // English
        'cancel', 'cancellation', 'refund', 'refund karo', 'money back',
        'withdraw', 'cancel karna', 'opt out', 'cancel booking',

        // Hindi
        'cancel karna', 'cancel ho', 'vapasi', 'paisa vapas',
        'back out', 'accept nahi', 'refuse', 'nahi karna'
    ],

    // ========== DEADLINE ==========
    deadline: [
        // English
        'deadline', 'last date', 'final date', 'due date', 'expire',
        'expires', 'expired', 'before', 'until', 'by when',
        'urgency', 'urgent', 'asap', 'immediately',

        // Hindi
        'last date', 'aakhri tarikh', 'samay limit', 'kab tak',
        'thikana', 'fatafat', 'jaldi', 'tej', 'abhi'
    ],

    // ========== TEAM/STAFF ==========
    team: [
        // English
        'team', 'staff', 'team member', 'coordinator', 'manager',
        'experienced', 'professional', 'expertise', 'skilled',
        'who will', 'who is', 'team size',

        // Hindi
        'team', 'staff', 'sadasya', 'prabandak', 'upsthi',
        'anubhavi', 'mahir', 'kushal', 'kaushal',
        'kaun kaun hoga', 'kitne log'
    ],

    // ========== REFERENCE/PORTFOLIO ==========
    reference: [
        // English
        'reference', 'past events', 'previous events', 'portfolio',
        'experience', 'track record', 'testimonial', 'review',
        'feedback', 'success rate', 'show me',

        // Hindi
        'pichli events', 'pehle kiye events', 'portfolio',
        'abhibhavya', 'track record', 'feedback', 'review',
        'logon ne kya kaha', 'success stories'
    ],

    // ========== INSURANCE/LIABILITY ==========
    insurance: [
        // English
        'insurance', 'coverage', 'liability', 'damage', 'protection',
        'responsible', 'accountable', 'compensation', 'claim',

        // Hindi
        'bima', 'suraksha', 'daaytva', 'jimmedari',
        'nuksan', 'bharpai', 'maaf karna', 'complaint'
    ],

    // ========== WEATHER/CONTINGENCY ==========
    weather: [
        // English
        'weather', 'rain', 'sunny', 'cold', 'hot', 'climate',
        'backup plan', 'plan b', 'contingency', 'indoor backup',
        'what if', 'in case', 'emergency',

        // Hindi
        'mausam', 'barsat', 'barish', 'taap', 'thandi',
        'aapaat', 'anya yojana', 'backup', 'agar barissh ho',
        'agar kuch ho'
    ],

    // ========== MISCELLANEOUS COMMON ==========
    misc: [
        // English - General
        'thanks', 'thank you', 'welcome', 'please', 'pls',
        'excuse me', 'pardon', 'sorry', 'my bad', 'oops',
        'great', 'excellent', 'good', 'nice', 'fantastic',
        'ok', 'alright', 'awesome', 'cool', 'perfect',

        // Hindi - General
        'dhanyavaad', 'shukriya', 'kripaya', 'maafi', 'dhikhhave',
        'galti', 'sorry', 'chalo', 'shuddha h', 'bilkul shuddha',
        'bahut achcha', 'shandar', 'ekdum theek',

        // Common filler words
        'just', 'only', 'like', 'umm', 'uh', 'basically',
        'kind of', 'sort of', 'actually', 'really',
        'might', 'may', 'could', 'should', 'would'
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AI_KEYWORDS;
}