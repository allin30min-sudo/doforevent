/**
 * AI Smart Virtual Assistant (Neural-Sync)
 * Handles UI, Knowledge Base integration, and AI logic.
 */

class AIAssistant {
    constructor() {
        this.kb = [];
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    async init() {
        try {
            // Attempt to load knowledge base
            const response = await fetch('/knowledge_base.json');
            if (response.ok) {
                this.kb = await response.json();
            }
        } catch (error) {
            console.warn("AI Assistant: Knowledge base not loaded (this is normal for local file testing). UI will still show.");
            this.kb = []; // Fallback to empty context
        } finally {
            this.injectHTML();
            this.attachEvents();
        }
    }

    injectHTML() {
        const widgetHTML = `
            <div id="ai-chat-widget">
                <div class="ai-greeting-bubbles" id="ai-greetings">
                    <div class="greeting-bubble">Hi there! 👋</div>
                    <div class="greeting-bubble main">How can I help you today?</div>
                </div>
                <button class="ai-chat-toggle" id="ai-toggle">
                    <svg viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/>
                        <circle cx="9" cy="11.5" r="1.5"/>
                        <circle cx="15" cy="11.5" r="1.5"/>
                        <path d="M8 15.5s1.5 2 4 2 4-2 4-2" stroke="white" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
                <div class="ai-chat-window" id="ai-window">
                    <div class="ai-chat-header">
                        <div class="title-area">
                            <div class="bot-avatar">🤖</div>
                            <div>
                                <h3>DoFor AI Assistant</h3>
                                <span>Always Online | Multilingual</span>
                            </div>
                        </div>
                        <button id="ai-close" style="background:none; border:none; color:white; cursor:pointer; font-size:20px;">×</button>
                    </div>
                    <div class="ai-chat-messages" id="ai-messages">
                        <div class="message bot">Namaste! Kaise help kar sakta hoon aapki? I can help you with bookings, services, and city details in Hindi, English, or Hinglish.</div>
                    </div>
                    <div class="typing" id="ai-typing" style="padding: 0 20px;">AI is thinking...</div>
                    <div class="ai-chat-input-area">
                        <button class="voice-btn" id="ai-voice">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                                <line x1="12" y1="19" x2="12" y2="23"></line>
                                <line x1="8" y1="23" x2="16" y2="23"></line>
                            </svg>
                        </button>
                        <input type="text" id="ai-input" placeholder="Ask anything...">
                        <button class="send-btn" id="ai-send">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', widgetHTML);
    }

    attachEvents() {
        const toggle = document.getElementById('ai-toggle');
        const close = document.getElementById('ai-close');
        const win = document.getElementById('ai-window');
        const send = document.getElementById('ai-send');
        const input = document.getElementById('ai-input');
        const voice = document.getElementById('ai-voice');

        toggle.onclick = () => {
            this.isOpen = !this.isOpen;
            win.classList.toggle('active', this.isOpen);

            // Hide greeting bubbles once interacted
            const greetings = document.getElementById('ai-greetings');
            if (greetings) greetings.style.display = 'none';
        };

        close.onclick = () => {
            this.isOpen = false;
            win.classList.remove('active');
        };

        send.onclick = () => this.handleSendMessage();
        input.onkeypress = (e) => { if (e.key === 'Enter') this.handleSendMessage(); };

        if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.lang = 'en-IN'; // Works well for Hinglish/Indian English
            recognition.onresult = (event) => {
                const text = event.results[0][0].transcript;
                input.value = text;
                this.handleSendMessage();
            };
            voice.onclick = () => recognition.start();
        } else {
            voice.style.display = 'none';
        }
    }

    async handleSendMessage() {
        const input = document.getElementById('ai-input');
        const text = input.value.trim();
        if (!text) return;

        this.addMessage(text, 'user');
        input.value = '';

        this.showTyping(true);

        // --- AI LOGIC START ---
        // Here we simulate the AI response using the knowledge base.
        // In a real implementation, you'd send this to a Gemini API proxy.
        const response = await this.getAIResponse(text);
        // --- AI LOGIC END ---

        this.showTyping(false);
        this.addMessage(response, 'bot');
    }

    addMessage(text, side) {
        const container = document.getElementById('ai-messages');
        const div = document.createElement('div');
        div.className = `message ${side}`;

        // Convert [text](url) to clickable links
        let formattedText = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:inherit; text-decoration:underline; font-weight:bold;">$1</a>');

        // Convert line breaks to <br>
        formattedText = formattedText.replace(/\n/g, '<br>');

        div.innerHTML = formattedText;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    showTyping(show) {
        document.getElementById('ai-typing').style.display = show ? 'block' : 'none';
    }

    generateWhatsAppQuote(serviceName, packageName) {
        const message = `Hello! I'm interested in booking *${serviceName}* - *${packageName}* package. Please share the detailed quote and availability.`;
        return `https://wa.me/919650125822?text=${encodeURIComponent(message)}`;
    }

    showPackagesForService(serviceName, serviceUrl) {
        // Package data mapped from website
        const packageData = {
            'destination-wedding.html': {
                serviceName: 'Destination Wedding',
                packages: [
                    {
                        emoji: '🏝️',
                        name: 'Beach Bliss',
                        tagline: 'Coastal wedding paradise',
                        features: ['Goa/Kerala Beaches', 'Beach Venue Setup', '50-75 Guests', '2 Night Stay', 'Basic Decor', 'Local Cuisine']
                    },
                    {
                        emoji: '⛰️',
                        name: 'Mountain Magic',
                        tagline: 'Hill station celebration',
                        features: ['Udaipur/Jaipur/Shimla', 'Palace/Resort Venue', '100-150 Guests', '3 Night Stay', 'Premium Decor', 'Multi-Cuisine', 'Entertainment'],
                        popular: true
                    },
                    {
                        emoji: '✈️',
                        name: 'International Escape',
                        tagline: 'Global destination wedding',
                        features: ['Thailand/Bali/Dubai', 'Luxury Resorts', '50-200 Guests', '5 Night Stay', 'Luxury Decor', 'International Cuisine', 'Full Visa Support']
                    }
                ]
            },
            'luxury-wedding.html': {
                serviceName: 'Luxury Wedding',
                packages: [
                    {
                        emoji: '💎',
                        name: 'Royal Elegance',
                        tagline: 'Premium luxury experience',
                        features: ['5-Star Venue', '200-300 Guests', 'Premium Decor', 'Gourmet Catering', 'Live Entertainment']
                    },
                    {
                        emoji: '👑',
                        name: 'Imperial Grandeur',
                        tagline: 'Ultimate luxury celebration',
                        features: ['Palace/Heritage Venue', '300-500 Guests', 'Luxury Decor', 'International Cuisine', 'Celebrity Performances'],
                        popular: true
                    }
                ]
            },
            'product-launch.html': {
                serviceName: 'Product Launch',
                packages: [
                    {
                        emoji: '🚀',
                        name: 'Startup Launch',
                        tagline: 'Perfect for new products',
                        features: ['50-100 Attendees', 'Venue Setup', 'AV Equipment', 'Basic Branding', 'Refreshments']
                    },
                    {
                        emoji: '🎯',
                        name: 'Premium Launch',
                        tagline: 'High-impact unveiling',
                        features: ['100-300 Attendees', 'Premium Venue', 'Full AV Setup', 'Brand Activation', 'Media Coverage', 'Entertainment'],
                        popular: true
                    }
                ]
            },
            'diwali-celebrations.html': {
                serviceName: 'Diwali Celebration',
                packages: [
                    {
                        emoji: '🪔',
                        name: 'Traditional Diwali',
                        tagline: 'Classic celebration',
                        features: ['Traditional Decor', 'Diyas & Lights', '50-100 Guests', 'Indian Cuisine', 'Cultural Performances']
                    },
                    {
                        emoji: '✨',
                        name: 'Grand Diwali Gala',
                        tagline: 'Premium celebration',
                        features: ['Luxury Decor', 'Premium Lighting', '100-200 Guests', 'Gourmet Cuisine', 'Live Music', 'Fireworks'],
                        popular: true
                    }
                ]
            }
        };

        const data = packageData[serviceUrl];
        if (!data) {
            return `I found the service page, but package details aren't loaded yet. You can view all options here: [${serviceName}](${serviceUrl})`;
        }

        let resp = `Perfect! Here are the **${data.serviceName}** packages:\n\n`;

        data.packages.forEach(pkg => {
            resp += `${pkg.emoji} **${pkg.name}**${pkg.popular ? ' ⭐ POPULAR' : ''}\n`;
            resp += `_${pkg.tagline}_\n\n`;
            resp += `**Includes:**\n`;
            pkg.features.forEach(f => resp += `• ${f}\n`);

            const quoteLink = this.generateWhatsAppQuote(data.serviceName, pkg.name);
            resp += `\n📱 [Get Quote on WhatsApp](${quoteLink})\n\n`;
            resp += `---\n\n`;
        });

        resp += `Need help choosing? Just ask me about any package!`;
        return resp;
    }

    async getAIResponse(userText) {
        let query = userText.toLowerCase().trim();
        const isEnglish = /^[a-zA-Z0-9\s?!.,]*$/.test(userText);

        // --- Typo Corrections ---
        if (query.includes('weeding') || query.includes('weding')) query = query.replace(/weeding|weding/g, 'wedding');
        if (query.includes('birtday') || query.includes('bday')) query = query.replace(/birtday|bday/g, 'birthday');

        // --- 1. GREETINGS & SMALL TALK ---
        const quickResponses = {
            'hello': "Hello! I'm your personal DoFor booking assistant. Looking to plan a Wedding, Corporate Event, or Celebration?",
            'hi': "Hi there! How can I help you today? I can assist with bookings and event planning.",
            'namaste': "Namaste! Main aapki booking me help karne ke liye hoon. Kaunsa event plan karna hai?",
            'suno': "Ji boliye, main sun raha hoon. Aap kya book karna chahte hain?",
            'kaise ho': "Main bilkul ready hoon aapki madad karne ke liye! Event ki booking chahiye?"
        };
        if (quickResponses[query]) return quickResponses[query];

        // --- 2. DETECT "TELL ME MORE" OR "WHAT IS" QUERIES ---
        const infoKeywords = ['tell me more', 'what is', 'what are', 'offering', 'provide', 'kya hai', 'batao', 'detail', 'information'];
        const isInfoQuery = infoKeywords.some(kw => query.includes(kw));

        if (isInfoQuery) {
            // Extract the subject (e.g., "Corporate Events" from "tell me more about Corporate Events")
            let subject = query.replace(/tell me more about|what is|what are|offering in|provide in|kya hai|batao|detail|information/g, '').trim();

            // Search KB for this subject
            const matches = this.kb.filter(item =>
                subject.split(/\s+/).some(word =>
                    word.length > 3 && (
                        item.title.toLowerCase().includes(word) ||
                        item.url.toLowerCase().includes(word)
                    )
                )
            ).slice(0, 3);

            if (matches.length > 0) {
                let resp = isEnglish ? `Here's detailed information about **${subject}**:\n\n` : `Ji, **${subject}** ke baare me details:\n\n`;

                matches.forEach(match => {
                    const title = match.title.split('|')[0].trim();
                    resp += `✨ **${title}**\n\n`;

                    // Show headings as key topics
                    if (match.headings && match.headings.length > 0) {
                        resp += `**What We Offer:**\n`;
                        match.headings.slice(0, 5).forEach(h => {
                            if (!h.includes('?') && !h.includes('Ready') && !h.includes('Explore')) {
                                resp += `• ${h}\n`;
                            }
                        });
                        resp += `\n`;
                    }

                    // Show content snippet
                    if (match.content) {
                        const cleanContent = match.content.replace(/\s+/g, ' ').trim();
                        resp += `${cleanContent.substring(0, 250)}...\n\n`;
                    }

                    resp += `---\n\n`;
                });

                resp += isEnglish
                    ? "📱 **To book:** Type the service name to see packages!\n💬 **Questions?** Ask me anything specific!"
                    : "📱 **Book karne ke liye:** Service ka naam likhiye packages dekhne ke liye!\n💬 **Sawal?** Kuch bhi puchiye!";
                return resp;
            }
        }

        // --- 3. SMART BOOKING DETECTION ---
        const bookingKeywords = ['book', 'booking', 'karwani', 'karna chahta', 'karna hai', 'plan', 'organize', 'hire', 'quote', 'price', 'package'];
        const isBookingIntent = bookingKeywords.some(kw => query.includes(kw));

        // Define main categories with sub-service mappings
        const mainCategories = {
            'wedding': {
                name: 'Wedding',
                nameHindi: 'Shaadi',
                keywords: ['wedding', 'shadi', 'shaadi', 'marriage', 'vivah'],
                subServices: [
                    { emoji: '💐', name: 'Wedding Decor', url: 'wedding-decor.html' },
                    { emoji: '🏖️', name: 'Destination Wedding', url: 'destination-wedding.html' },
                    { emoji: '👑', name: 'Luxury Wedding', url: 'luxury-wedding.html' },
                    { emoji: '📋', name: 'Wedding Planning', url: 'wedding-planning.html' },
                    { emoji: '📸', name: 'Pre Wedding', url: 'pre-wedding.html' },
                    { emoji: '🕉️', name: 'Traditional Wedding', url: 'traditional-wedding.html' }
                ]
            },
            'corporate': {
                name: 'Corporate Events',
                nameHindi: 'Corporate Events',
                keywords: ['corporate', 'office', 'company', 'business', 'conference', 'seminar', 'launch', 'dealer'],
                subServices: [
                    { emoji: '🤝', name: 'Dealers Meet', url: 'dealers-meet.html' },
                    { emoji: '🚀', name: 'Product Launch', url: 'product-launch.html' },
                    { emoji: '🎯', name: 'Conferences', url: 'conferences.html' },
                    { emoji: '👨‍👩‍👧', name: 'Family Day', url: 'family-day.html' },
                    { emoji: '🎊', name: 'Annual Day', url: 'annual-day.html' }
                ]
            },
            'celebration': {
                name: 'Celebrations',
                nameHindi: 'Celebrations',
                keywords: ['celebration', 'party', 'birthday', 'anniversary', 'festival', 'diwali', 'holi', 'christmas'],
                subServices: [
                    { emoji: '🪔', name: 'Diwali Celebration', url: 'diwali-celebrations.html' },
                    { emoji: '🎨', name: 'Holi Celebration', url: 'holi-celebration.html' },
                    { emoji: '🎄', name: 'Christmas Celebration', url: 'christmas-celebration.html' },
                    { emoji: '🎉', name: 'Theme Party', url: 'theme-party.html' },
                    { emoji: '🎂', name: 'New Year Celebration', url: 'new-year-celebration.html' }
                ]
            },
            'entertainment': {
                name: 'Entertainment',
                nameHindi: 'Entertainment',
                keywords: ['entertainment', 'concert', 'show', 'artist', 'fashion', 'carnival', 'award'],
                subServices: [
                    { emoji: '🎤', name: 'Live Concerts', url: 'live-concerts.html' },
                    { emoji: '👗', name: 'Fashion Show', url: 'fashion-show.html' },
                    { emoji: '🏆', name: 'Award Nights', url: 'award-nights.html' },
                    { emoji: '🎪', name: 'Carnival Events', url: 'carnival-events.html' }
                ]
            }
        };

        // --- 4. CHECK IF USER IS ASKING ABOUT A SPECIFIC SUB-SERVICE ---
        // Skip if query is too general (contains "service" or "event")
        const isGeneralQuery = query.includes(' service') || query.includes(' services') || query.includes(' event') || query.includes(' events');

        if (!isGeneralQuery) {
            for (const [catId, catData] of Object.entries(mainCategories)) {
                for (const subService of catData.subServices) {
                    const serviceName = subService.name.toLowerCase();
                    const serviceWords = serviceName.split(' ').filter(w => w.length > 3);

                    // Check if ALL significant words from service name are in query
                    const matchCount = serviceWords.filter(word => query.includes(word)).length;

                    // Only match if at least 2 words match (for multi-word services) or exact match for single-word
                    if ((serviceWords.length >= 2 && matchCount >= 2) ||
                        (serviceWords.length === 1 && matchCount === 1 && query.includes(serviceName))) {
                        return this.showPackagesForService(subService.name, subService.url);
                    }
                }
            }
        }

        // --- 5. DETECT CATEGORY MENTION (Show Sub-Services with KB descriptions) ---
        for (const [catId, catData] of Object.entries(mainCategories)) {
            const categoryNameMatch = query === catData.name.toLowerCase() ||
                query === catId ||
                (query.includes(catId) && query.split(/\s+/).length <= 3);

            if (categoryNameMatch || (isBookingIntent && catData.keywords.some(kw => query.includes(kw)))) {
                let resp = isEnglish
                    ? `Great! Here are all our **${catData.name}** services with details:\n\n`
                    : `Bahut badhiya! Ye hamare **${catData.nameHindi}** services hain details ke saath:\n\n`;

                catData.subServices.forEach(sub => {
                    const kbMatch = this.kb.find(item => item.url.includes(sub.url));

                    resp += `${sub.emoji} **${sub.name}**\n`;

                    // Show detailed description from KB
                    if (kbMatch) {
                        if (kbMatch.content) {
                            const cleanContent = kbMatch.content.replace(/\s+/g, ' ').trim();
                            resp += `${cleanContent.substring(0, 120)}...\n\n`;
                        }

                        // Show key features from headings
                        if (kbMatch.headings && kbMatch.headings.length > 2) {
                            const relevantHeadings = kbMatch.headings
                                .filter(h => !h.includes('?') && !h.includes('Ready') && !h.includes('Explore') && !h.includes('Related'))
                                .slice(0, 3);

                            if (relevantHeadings.length > 0) {
                                resp += `**Key Features:** ${relevantHeadings.join(' • ')}\n\n`;
                            }
                        }
                    } else {
                        resp += `Premium event planning and execution services.\n\n`;
                    }

                    resp += `---\n\n`;
                });

                resp += isEnglish
                    ? `📱 **To see packages and book:** Just type the service name (e.g., "Destination Wedding" or "Product Launch")\n\n💬 **Need help?** Ask me anything about these services!`
                    : `📱 **Packages aur booking ke liye:** Bas service ka naam likhiye (jaise "Destination Wedding" ya "Product Launch")\n\n💬 **Madad chahiye?** Mujhse kuch bhi puchiye!`;

                return resp;
            }
        }

        // --- 6. BOOKING WITHOUT CATEGORY ---
        if (isBookingIntent) {
            return isEnglish
                ? "I'd love to help you book! Which type of event are you planning?\n\n🏢 Corporate Events\n💒 Weddings\n🎉 Celebrations\n🎭 Entertainment\n\nJust tell me the category name!"
                : "Main aapki booking me help karunga! Aap kaunsa event plan kar rahe hain?\n\n🏢 Corporate Events\n💒 Weddings\n🎉 Celebrations\n🎭 Entertainment\n\nBas category ka naam batayiye!";
        }

        // --- 7. SMART SEARCH WITH DETAILED INFO ---
        const words = query.split(/\s+/).filter(w => w.length > 2);
        let bestMatches = this.kb.map(item => {
            let score = 0;
            const textToSearch = `${item.title} ${item.headings.join(' ')} ${item.content}`.toLowerCase();

            words.forEach(word => {
                if (textToSearch.includes(word)) score += 10;
                if (item.title.toLowerCase().includes(word)) score += 20;
                if (item.headings.some(h => h.toLowerCase().includes(word))) score += 15;
            });

            return { ...item, score };
        }).filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 2);

        if (bestMatches.length > 0) {
            let resp = isEnglish
                ? "Here's what I found:\n\n"
                : "Ji, ye mili information:\n\n";

            bestMatches.forEach(match => {
                const title = match.title.split('|')[0].trim();

                let keyInfo = '';
                if (match.content) {
                    const cleanContent = match.content.replace(/\s+/g, ' ').trim();
                    keyInfo = cleanContent.substring(0, 150) + '...';
                }

                const mainHeadings = match.headings.slice(0, 3).join(', ');

                resp += `✨ **${title}**\n\n`;
                if (keyInfo) resp += `${keyInfo}\n\n`;
                if (mainHeadings) resp += `📋 Topics: ${mainHeadings}\n\n`;
                resp += `🔗 [View Complete Details](/${match.url})\n\n`;
                resp += `---\n\n`;
            });

            resp += isEnglish
                ? "Want to see packages? Just say the service name (e.g., 'Destination Wedding')!"
                : "Packages dekhne hain? Bas service ka naam boliye (jaise 'Destination Wedding')!";

            return resp;
        }

        // --- 8. CONTACT & FALLBACK ---
        if (query.includes('contact') || query.includes('phone') || query.includes('whatsapp')) {
            const whatsappMsg = encodeURIComponent("Hello! I'd like to know more about DoFor Event services.");
            return `You can reach us anytime:\n📞 **Call/WhatsApp:** [+91 9650125822](https://wa.me/919650125822?text=${whatsappMsg})\n✉️ **Email:** info@doforevent.com\n\nWe're available 24/7!`;
        }

        return isEnglish
            ? "I'm not sure I understood. Are you looking to book a Wedding, Corporate Event, or Party? Or would you like to speak with our team?"
            : "Main samajh nahi paya. Kya aap Wedding, Corporate Event ya Party book karna chahte hain? Ya team se baat karna chahenge?";
    }
}

// Global initialization
if (typeof document !== 'undefined') {
    window.addEventListener('load', () => {
        window.aiAssistant = new AIAssistant();
    });
}
