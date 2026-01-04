/**
 * AI Smart Virtual Assistant (Neural-Sync)
 * Handles UI, Knowledge Base integration, and AI logic.
 */

class AIAssistant {
    constructor() {
        this.kb = [];
        this.isOpen = false;
        this.messages = [];

        // Booking State Management
        this.bookingState = {
            active: false,
            step: 0,
            data: {
                category: null,
                service: null,
                date: null,
                guests: null,
                city: null,
                budget: null,
                requirements: null,
                name: null,
                phone: null,
                email: null
            }
        };

        // Keywords will be loaded from external ai-keywords.js file
        // This keeps the code clean and makes keyword management easier
        this.keywords = null;

        this.init();
    }

    async init() {
        // Load keywords first
        await this.loadKeywordsFromFile();

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

    async loadKeywordsFromFile() {
        try {
            // Load external keyword dictionary file
            const response = await fetch('/assets/js/ai-keywords.js');
            if (response.ok) {
                const scriptText = await response.text();
                // Execute the script to get AI_KEYWORDS
                const scriptElement = document.createElement('script');
                scriptElement.textContent = scriptText;
                document.head.appendChild(scriptElement);

                // AI_KEYWORDS is now available globally
                if (typeof AI_KEYWORDS !== 'undefined') {
                    this.keywords = AI_KEYWORDS;
                    console.log('✅ Keywords loaded from ai-keywords.js');
                    return;
                }
            }
        } catch (error) {
            console.warn('⚠️ Could not load ai-keywords.js, using fallback keywords');
        }

        // Fallback keywords if external file fails
        this.setFallbackKeywords();
    }

    setFallbackKeywords() {
        // Minimal fallback keywords if external file doesn't load
        this.keywords = {
            info: ['janna', 'dekhna', 'batao', 'show', 'tell', 'kya kya', 'hai'],
            booking: ['book', 'booking', 'karwani', 'plan', 'organize', 'quote'],
            services: ['service', 'event', 'package', 'offer', 'providing', 'what kind', 'kya service'],
            wedding: ['wedding', 'shadi', 'shaadi', 'marriage', 'vivah'],
            corporate: ['corporate', 'office', 'company', 'business', 'conference'],
            celebration: ['celebration', 'party', 'birthday', 'festival', 'diwali'],
            entertainment: ['entertainment', 'concert', 'show', 'artist'],
            greetings: ['hello', 'hi', 'namaste', 'namaskar'],
            help: ['help', 'madad', 'assist'],
            contact: ['contact', 'phone', 'email', 'whatsapp'],
            yes: ['yes', 'haan', 'ok', 'sure'],
            no: ['no', 'nahi', 'na'],
            edit: ['edit', 'change', 'badlo'],
            skip: ['skip', 'chhodo', 'none']
        };
        console.log('⚠️ Using fallback keywords');
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
                    <div id="ai-quick-replies-container" style="padding: 10px 15px; max-height: 150px; overflow-y: auto; display: none;"></div>
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

            // Hide toggle button when chat opens
            if (this.isOpen) {
                toggle.style.display = 'none';
            }

            // Hide greeting bubbles once interacted
            const greetings = document.getElementById('ai-greetings');
            if (greetings) greetings.style.display = 'none';
        };

        close.onclick = () => {
            this.isOpen = false;
            win.classList.remove('active');

            // Show toggle button when chat closes
            toggle.style.display = 'flex';
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
        const response = await this.getAIResponse(text);
        // --- AI LOGIC END ---

        this.showTyping(false);

        // Check if response includes quick replies
        if (typeof response === 'object' && response.text) {
            // Remove any existing quick reply buttons first
            const container = document.getElementById('ai-messages');
            const existingButtons = container.querySelector('.quick-replies');
            if (existingButtons) existingButtons.remove();

            // Add the message
            this.addMessage(response.text, 'bot');

            // Check for WhatsApp button (final quote)
            if (response.whatsappButton) {
                // Hide quick replies container for final summary
                const quickRepliesContainer = document.getElementById('ai-quick-replies-container');
                if (quickRepliesContainer) quickRepliesContainer.style.display = 'none';

                this.addWhatsAppButton(response.whatsappButton.link, response.whatsappButton.text);
                // Add edit options as small buttons
                if (response.editOptions) {
                    this.addQuickReplyButtons(response.editOptions);
                }
            } else if (response.quickReplies) {
                // Regular quick replies
                this.addQuickReplyButtons(response.quickReplies);
            }
        } else {
            this.addMessage(response, 'bot');
        }
    }

    addWhatsAppButton(link, text) {
        const container = document.getElementById('ai-messages');

        const buttonDiv = document.createElement('div');
        buttonDiv.className = 'whatsapp-button-container';
        buttonDiv.style.cssText = 'padding: 15px 20px; display: flex; justify-content: center;';

        const button = document.createElement('a');
        button.href = link;
        button.target = '_blank';
        button.textContent = text;
        button.style.cssText = `
            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 30px;
            font-size: 16px;
            font-weight: 600;
            display: inline-block;
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
            transition: all 0.3s ease;
            text-align: center;
            min-width: 280px;
        `;

        button.onmouseover = () => {
            button.style.transform = 'translateY(-3px) scale(1.02)';
            button.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.5)';
        };

        button.onmouseout = () => {
            button.style.transform = 'translateY(0) scale(1)';
            button.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.4)';
        };

        buttonDiv.appendChild(button);
        container.appendChild(buttonDiv);
        container.scrollTop = container.scrollHeight;
    }

    addMessage(text, side, quickReplies = null) {
        const container = document.getElementById('ai-messages');
        const div = document.createElement('div');
        div.className = `message ${side}`;

        // Convert [text](url) to clickable links
        let formattedText = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:inherit; text-decoration:underline; font-weight:bold;">$1</a>');

        // Convert line breaks to <br>
        formattedText = formattedText.replace(/\n/g, '<br>');

        div.innerHTML = formattedText;
        container.appendChild(div);

        // Add quick reply buttons if provided
        if (quickReplies && quickReplies.length > 0) {
            this.addQuickReplyButtons(quickReplies);
        }

        container.scrollTop = container.scrollHeight;
    }

    addQuickReplyButtons(options) {
        const container = document.getElementById('ai-quick-replies-container');
        if (!container) return;

        // Clear existing buttons
        container.innerHTML = '';

        // Show container
        container.style.display = 'block';

        const buttonsWrapper = document.createElement('div');
        buttonsWrapper.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px;';

        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.style.cssText = `
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 25px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 600;
                transition: all 0.3s ease;
                box-shadow: 0 3px 10px rgba(102, 126, 234, 0.3);
                white-space: nowrap;
            `;

            button.onmouseover = () => {
                button.style.transform = 'translateY(-2px)';
                button.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.4)';
            };

            button.onmouseout = () => {
                button.style.transform = 'translateY(0)';
                button.style.boxShadow = '0 3px 10px rgba(102, 126, 234, 0.3)';
            };

            button.onclick = () => {
                // Simulate user clicking the option
                document.getElementById('ai-input').value = option;
                this.handleSendMessage();
                // Hide buttons after selection
                container.style.display = 'none';
            };

            buttonsWrapper.appendChild(button);
        });

        container.appendChild(buttonsWrapper);
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

    // ========== BOOKING FLOW SYSTEM ==========

    startBooking(category) {
        this.bookingState.active = true;
        this.bookingState.step = 1;
        this.bookingState.data.category = category;
        return this.getBookingQuestion(1);
    }

    getBookingQuestion(step) {
        const { data } = this.bookingState;

        switch (step) {
            case 1: // Service Selection
                return this.getServiceOptions(data.category);
            case 2: // Event Date
                return `📅 **When is your ${data.service}?**\n\nPlease provide the event date (e.g., "15 March 2026" or "15/03/2026")`;
            case 3: // Guest Count
                return {
                    text: `👥 **How many guests are you expecting?**\n\nSelect an option or type a custom number:`,
                    quickReplies: ['50', '100', '150', '200', '300', '500+']
                };
            case 4: // City/Location
                return {
                    text: `📍 **Which city would you prefer?**\n\nWe operate across India. Select a city:`,
                    quickReplies: ['Delhi', 'Mumbai', 'Bangalore', 'Goa', 'Jaipur', 'Udaipur', 'Pune', 'Hyderabad']
                };
            case 5: // Budget
                return {
                    text: `💰 **What's your budget range?** (Optional)\n\nSelect your budget range:`,
                    quickReplies: ['Under 5 lakhs', '5-10 lakhs', '10-20 lakhs', '20+ lakhs', 'Flexible']
                };
            case 6: // Special Requirements
                return {
                    text: `📝 **Any special requirements or preferences?** (Optional)\n\nYou can type your requirements or skip this step:`,
                    quickReplies: ['None', 'Skip']
                };
            case 7: // Name
                return `👤 **What's your name?**\n\nPlease provide your full name.`;
            case 8: // Phone
                return `📱 **What's your contact number?**\n\nPlease provide your phone number (e.g., 9876543210)`;
            case 9: // Email
                return `📧 **What's your email address?**\n\nPlease provide your email for booking confirmation.`;
            default:
                return "Something went wrong. Let's start over!";
        }
    }

    getServiceOptions(category) {
        const services = {
            'Wedding': [
                { emoji: '💐', name: 'Wedding Decor' },
                { emoji: '🏖️', name: 'Destination Wedding' },
                { emoji: '👑', name: 'Luxury Wedding' },
                { emoji: '📋', name: 'Wedding Planning' },
                { emoji: '📸', name: 'Pre Wedding' },
                { emoji: '🕉️', name: 'Traditional Wedding' }
            ],
            'Corporate': [
                { emoji: '🤝', name: 'Dealers Meet' },
                { emoji: '🚀', name: 'Product Launch' },
                { emoji: '🎯', name: 'Conferences' },
                { emoji: '👨‍👩‍👧', name: 'Family Day' },
                { emoji: '🎊', name: 'Annual Day' }
            ],
            'Celebration': [
                { emoji: '🪔', name: 'Diwali Celebration' },
                { emoji: '🎨', name: 'Holi Celebration' },
                { emoji: '🎄', name: 'Christmas Celebration' },
                { emoji: '🎉', name: 'Theme Party' },
                { emoji: '🎂', name: 'New Year Celebration' }
            ],
            'Entertainment': [
                { emoji: '🎤', name: 'Live Concerts' },
                { emoji: '👗', name: 'Fashion Show' },
                { emoji: '🏆', name: 'Award Nights' },
                { emoji: '🎪', name: 'Carnival Events' }
            ]
        };

        const categoryServices = services[category] || [];
        let text = `Perfect! Let's plan your **${category}** event. 🎉\n\n**Which service would you like?**\n\n`;

        categoryServices.forEach(s => {
            text += `${s.emoji} ${s.name}\n`;
        });

        text += `\nSelect a service from the buttons below:`;

        // Extract service names for quick replies
        const quickReplies = categoryServices.map(s => s.name);

        return { text, quickReplies };
    }

    async processBookingStep(userInput) {
        const { step, data } = this.bookingState;
        const input = userInput.trim();

        switch (step) {
            case 1: // Service Selection
                data.service = input;
                this.bookingState.step = 2;
                return this.getBookingQuestion(2);

            case 2: // Date
                if (this.validateDate(input)) {
                    data.date = input;
                    this.bookingState.step = 3;
                    return this.getBookingQuestion(3);
                }
                return "Please provide a valid date (e.g., '15 March 2026' or '15/03/2026')";

            case 3: // Guests
                const guests = parseInt(input);
                if (guests && guests > 0) {
                    data.guests = guests;
                    this.bookingState.step = 4;
                    return this.getBookingQuestion(4);
                }
                return "Please enter a valid number of guests (e.g., 150)";

            case 4: // City
                data.city = input;
                this.bookingState.step = 5;
                return this.getBookingQuestion(5);

            case 5: // Budget
                data.budget = input.toLowerCase() === 'flexible' || input.toLowerCase() === 'skip' ? 'Flexible' : input;
                this.bookingState.step = 6;
                return this.getBookingQuestion(6);

            case 6: // Requirements
                data.requirements = input.toLowerCase() === 'none' || input.toLowerCase() === 'skip' ? 'None' : input;
                this.bookingState.step = 7;
                return this.getBookingQuestion(7);

            case 7: // Name
                if (input.length >= 2) {
                    data.name = input;
                    this.bookingState.step = 8;
                    return this.getBookingQuestion(8);
                }
                return "Please provide your full name.";

            case 8: // Phone
                if (this.validatePhone(input)) {
                    data.phone = input;
                    this.bookingState.step = 9;
                    return this.getBookingQuestion(9);
                }
                return "Please provide a valid 10-digit phone number.";

            case 9: // Email
                if (this.validateEmail(input)) {
                    data.email = input;
                    return this.generateFinalQuote();
                }
                return "Please provide a valid email address.";

            default:
                return "Something went wrong. Let's start over!";
        }
    }

    validateDate(input) {
        // Simple validation - accepts various date formats
        return input.length >= 5 && (input.includes('/') || input.includes('-') || /\d/.test(input));
    }

    validatePhone(input) {
        const cleaned = input.replace(/\D/g, '');
        return cleaned.length === 10;
    }

    validateEmail(input) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    }

    generateFinalQuote() {
        const { data } = this.bookingState;

        const message = `🎉 *Event Booking Request - DoFor Event*

📋 *Event Details:*
• Category: ${data.category}
• Service: ${data.service}
• Date: ${data.date}
• Expected Guests: ${data.guests}
• Location: ${data.city}

💰 *Budget Range:* ${data.budget}

📝 *Special Requirements:*
${data.requirements}

👤 *Contact Information:*
• Name: ${data.name}
• Phone: ${data.phone}
• Email: ${data.email}

I would like to receive a detailed quote for this event. Please share package options, pricing, and availability.

Thank you!`;

        const whatsappLink = `https://wa.me/919650125822?text=${encodeURIComponent(message)}`;

        // Store data before reset for edit functionality
        const bookingData = { ...data };

        // Reset booking state
        this.resetBooking();

        // Return object with special whatsapp button flag
        return {
            text: `✅ **Perfect! Your booking request is ready!**\n\n📋 **Summary:**\n• Event: ${bookingData.category} - ${bookingData.service}\n• Date: ${bookingData.date}\n• Guests: ${bookingData.guests}\n• City: ${bookingData.city}\n• Budget: ${bookingData.budget}\n• Requirements: ${bookingData.requirements}\n\n🎯 **Next Step:**\nClick the green WhatsApp button below to send your booking request. Our team will respond within 2 hours!`,
            whatsappButton: {
                link: whatsappLink,
                text: '📱 Send Booking Request on WhatsApp'
            },
            editOptions: ['Edit Date', 'Edit Guests', 'Edit City', 'Start New Booking']
        };
    }

    resetBooking() {
        this.bookingState = {
            active: false,
            step: 0,
            data: {
                category: null,
                service: null,
                date: null,
                guests: null,
                city: null,
                budget: null,
                requirements: null,
                name: null,
                phone: null,
                email: null
            }
        };
    }

    async getAIResponse(userText) {
        let query = userText.toLowerCase().trim();
        const isEnglish = /^[a-zA-Z0-9\s?!.,]*$/.test(userText);

        // --- Typo Corrections ---
        if (query.includes('weeding') || query.includes('weding')) query = query.replace(/weeding|weding/g, 'wedding');
        if (query.includes('birtday') || query.includes('bday')) query = query.replace(/birtday|bday/g, 'birthday');

        // ========== EDIT FUNCTIONALITY ==========
        // Handle edit button clicks from final summary
        if (query.includes('edit date')) {
            this.bookingState.active = true;
            this.bookingState.step = 2; // Go back to date step
            return this.getBookingQuestion(2);
        }
        if (query.includes('edit guests') || query.includes('edit guest')) {
            this.bookingState.active = true;
            this.bookingState.step = 3; // Go back to guests step
            return this.getBookingQuestion(3);
        }
        if (query.includes('edit city') || query.includes('edit location')) {
            this.bookingState.active = true;
            this.bookingState.step = 4; // Go back to city step
            return this.getBookingQuestion(4);
        }
        if (query.includes('start new booking') || query.includes('new booking')) {
            this.resetBooking();
            return {
                text: isEnglish
                    ? "Let's start fresh! Which type of event are you planning?\n\n🏢 **Corporate Events**\n💒 **Weddings**\n🎉 **Celebrations**\n🎭 **Entertainment**\n\nSelect a category:"
                    : "Chalo naye se shuru karte hain! Kaunsa event plan kar rahe hain?\n\n🏢 **Corporate Events**\n💒 **Weddings**\n🎉 **Celebrations**\n🎭 **Entertainment**\n\nCategory select karein:",
                quickReplies: ['Wedding', 'Corporate', 'Celebration', 'Entertainment']
            };
        }

        // ========== BOOKING FLOW PRIORITY ==========
        // If booking is active, process the current step
        if (this.bookingState.active) {
            return await this.processBookingStep(userText);
        }

        // ========== INFORMATION REQUEST PRIORITY ==========
        // Detect if user is asking for information (higher priority than booking)
        const isInfoRequest = this.keywords.info.some(kw => query.includes(kw));
        const isServiceQuery = this.keywords.services.some(kw => query.includes(kw));

        // Check if it's a question (not a booking request)
        const isQuestion = query.includes('?') ||
            query.includes('kya') ||
            query.includes('what') ||
            query.includes('how') ||
            query.includes('kitna') ||
            query.includes('Price') ||
            query.includes('price') ||
            query.includes('kon kon ') ||
            query.includes('service') ||
            query.includes('?') ||
            query.includes('kaun') ||
            query.includes('which') ||
            isInfoRequest;

        // If it's clearly an information request, search knowledge base first
        if (isQuestion || isInfoRequest || isServiceQuery) {
            // Try to find answer in knowledge base
            const kbAnswer = this.searchKnowledgeBase(query);
            if (kbAnswer) {
                return kbAnswer;
            }
        }

        // Detect booking intent (only if NOT asking questions)
        const isBookingIntent = !isQuestion && this.keywords.booking.some(kw => query.includes(kw));

        if (isBookingIntent) {
            // Detect category using keyword dictionary
            const categories = {
                'wedding': this.keywords.wedding,
                'corporate': this.keywords.corporate,
                'celebration': this.keywords.celebration,
                'entertainment': this.keywords.entertainment
            };

            for (const [category, keywords] of Object.entries(categories)) {
                if (keywords.some(kw => query.includes(kw))) {
                    const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
                    return this.startBooking(categoryName);
                }
            }

            // No specific category mentioned - ask user to choose
            return {
                text: isEnglish
                    ? "I'd love to help you book! Which type of event are you planning?\n\n🏢 **Corporate Events**\n💒 **Weddings**\n🎉 **Celebrations**\n🎭 **Entertainment**\n\nSelect a category from the buttons below:"
                    : "Main aapki booking me help karunga! Aap kaunsa event plan kar rahe hain?\n\n🏢 **Corporate Events**\n💒 **Weddings**\n🎉 **Celebrations**\n🎭 **Entertainment**\n\nNeeche se category select karein:",
                quickReplies: ['Wedding', 'Corporate', 'Celebration', 'Entertainment']
            };
        }

        // Check if user is just mentioning a category (to start booking OR get info)
        const categoryMentions = {
            'Wedding': this.keywords.wedding,
            'Corporate': this.keywords.corporate,
            'Celebration': this.keywords.celebration,
            'Entertainment': this.keywords.entertainment
        };

        // Use already declared isInfoRequest from above
        for (const [category, keywords] of Object.entries(categoryMentions)) {
            const categoryMatch = keywords.some(kw => query.includes(kw));

            if (categoryMatch) {
                // If it's an info request or general mention, show services
                if (isInfoRequest || query.includes('event') || query.includes('hai')) {
                    return this.showCategoryServices(category);
                }
                // Otherwise start booking
                return this.startBooking(category);
            }
        }

        // Use already declared isServiceQuery from above
        // If user asks about packages/services in general
        if (isInfoRequest || isServiceQuery) {
            return {
                text: isEnglish
                    ? "I can show you our services! Which category interests you?\n\n🏢 **Corporate Events**\n💒 **Weddings**\n🎉 **Celebrations**\n🎭 **Entertainment**\n\nSelect a category to see all services and packages:"
                    : "Main aapko services dikha sakta hoon! Kaunsi category chahiye?\n\n🏢 **Corporate Events**\n💒 **Weddings**\n🎉 **Celebrations**\n🎭 **Entertainment**\n\nCategory select karein:",
                quickReplies: ['Wedding', 'Corporate', 'Celebration', 'Entertainment']
            };
        }

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

        // --- 3. SMART SEARCH WITH DETAILED INFO ---
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
                resp += `---\n\n`;
            });

            resp += isEnglish
                ? "💬 Want to book? Just say 'book [service name]'!"
                : "💬 Book karna hai? Bas 'book [service name]' kahiye!";

            return resp;
        }

        // --- 4. CONTACT & FALLBACK ---
        if (query.includes('contact') || query.includes('phone') || query.includes('email') || query.includes('sampark')) {
            return isEnglish
                ? "📞 **Contact Us:**\n\n• Phone: +91 96501 25822\n• Email: info@doforevent.com\n• WhatsApp: [Chat Now](https://wa.me/919650125822)\n\nWe're available 24/7 to help you!"
                : "📞 **Sampark Karein:**\n\n• Phone: +91 96501 25822\n• Email: info@doforevent.com\n• WhatsApp: [Abhi Chat Karein](https://wa.me/919650125822)\n\nHum 24/7 available hain!";
        }

        // Final fallback
        return isEnglish
            ? "I'm here to help you plan amazing events! You can:\n\n• Ask about our services\n• Get booking information\n• Learn about packages\n• Contact our team\n\nWhat would you like to know?"
            : "Main aapki event planning me madad karne ke liye hoon! Aap:\n\n• Services ke baare me puch sakte hain\n• Booking information le sakte hain\n• Packages dekh sakte hain\n• Team se contact kar sakte hain\n\nKya jaanna chahenge?";
    }
}

// Initialize the AI Assistant when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.aiAssistant = new AIAssistant();
});
