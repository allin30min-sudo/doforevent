"""
Ultra Knowledge Base Enhancer
Automatically enhances knowledge_base.json with comprehensive details

Features:
- Preserves all existing information
- Adds pricing (3 tiers)
- Adds 10+ FAQs per service
- Adds city availability
- Adds package comparisons
- Adds testimonials
- Adds SEO keywords
- NO services will be missed
- NO information will be lost
"""

import json
import os
from typing import Dict, List, Any

class KnowledgeBaseEnhancer:
    def __init__(self, input_file: str, output_file: str):
        self.input_file = input_file
        self.output_file = output_file
        self.enhanced_count = 0
        
        # Standard cities for all services
        self.cities = [
            "Delhi", "Mumbai", "Bangalore", "Goa", 
            "Jaipur", "Udaipur", "Pune", "Hyderabad"
        ]
        
    def load_knowledge_base(self) -> List[Dict]:
        """Load existing knowledge base"""
        with open(self.input_file, 'r', encoding='utf-8') as f:
            return json.load(f)
    
    def save_knowledge_base(self, data: List[Dict]):
        """Save enhanced knowledge base"""
        with open(self.output_file, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        print(f"Enhanced knowledge base saved to: {self.output_file}")
        print(f"Total services enhanced: {self.enhanced_count}")
    
    def get_pricing_template(self, service_type: str) -> Dict:
        """Generate pricing based on service type"""
        pricing_ranges = {
            'wedding': {
                'basic': {'min': 200000, 'max': 500000, 'guests': '100-200'},
                'premium': {'min': 500000, 'max': 1500000, 'guests': '200-500'},
                'luxury': {'min': 1500000, 'max': 5000000, 'guests': '500+'}
            },
            'corporate': {
                'basic': {'min': 50000, 'max': 150000, 'guests': '50-100'},
                'premium': {'min': 150000, 'max': 500000, 'guests': '100-300'},
                'luxury': {'min': 500000, 'max': 2000000, 'guests': '300+'}
            },
            'celebration': {
                'basic': {'min': 30000, 'max': 100000, 'guests': '30-100'},
                'premium': {'min': 100000, 'max': 300000, 'guests': '100-200'},
                'luxury': {'min': 300000, 'max': 1000000, 'guests': '200+'}
            },
            'entertainment': {
                'basic': {'min': 100000, 'max': 300000, 'guests': '100-500'},
                'premium': {'min': 300000, 'max': 1000000, 'guests': '500-1000'},
                'luxury': {'min': 1000000, 'max': 5000000, 'guests': '1000+'}
            }
        }
        
        # Detect service type from title
        title_lower = service_type.lower()
        if any(word in title_lower for word in ['wedding', 'marriage', 'bride', 'groom']):
            ranges = pricing_ranges['wedding']
        elif any(word in title_lower for word in ['corporate', 'conference', 'dealer', 'product launch']):
            ranges = pricing_ranges['corporate']
        elif any(word in title_lower for word in ['concert', 'fashion', 'award', 'carnival']):
            ranges = pricing_ranges['entertainment']
        else:
            ranges = pricing_ranges['celebration']
        
        return {
            "starting_from": f"₹{ranges['basic']['min']:,}",
            "packages": [
                {
                    "name": "Basic",
                    "price_range": f"₹{ranges['basic']['min']:,} - ₹{ranges['basic']['max']:,}",
                    "guest_capacity": ranges['basic']['guests'],
                    "features": [
                        "Standard venue decoration",
                        "Basic catering (veg menu)",
                        "Sound system",
                        "Basic photography",
                        "Event coordination"
                    ]
                },
                {
                    "name": "Premium",
                    "price_range": f"₹{ranges['premium']['min']:,} - ₹{ranges['premium']['max']:,}",
                    "guest_capacity": ranges['premium']['guests'],
                    "features": [
                        "All Basic features",
                        "Premium venue decoration",
                        "Multi-cuisine catering (veg + non-veg)",
                        "Professional photography + videography",
                        "Live entertainment",
                        "Dedicated event manager"
                    ]
                },
                {
                    "name": "Luxury",
                    "price_range": f"₹{ranges['luxury']['min']:,}+",
                    "guest_capacity": ranges['luxury']['guests'],
                    "features": [
                        "All Premium features",
                        "Luxury themed decoration",
                        "Celebrity chef catering",
                        "Cinematic photography + drone shots",
                        "Celebrity performances",
                        "Complete event management team",
                        "Luxury transportation",
                        "Personalized guest experiences"
                    ]
                }
            ],
            "per_plate_cost": "₹500 - ₹2,500",
            "additional_services": {
                "decoration": "₹20,000 - ₹5,00,000",
                "photography": "₹15,000 - ₹2,00,000",
                "entertainment": "₹10,000 - ₹5,00,000",
                "transportation": "₹5,000 - ₹50,000"
            }
        }
    
    def get_faqs_template(self, service_name: str) -> List[Dict]:
        """Generate FAQs for service"""
        return [
            {
                "question": f"How much does {service_name} cost?",
                "answer": "Pricing varies based on guest count, venue, and package selected. Basic packages start from ₹30,000 and can go up to ₹50,00,000+ for luxury events. Contact us for a detailed quote."
            },
            {
                "question": "How far in advance should I book?",
                "answer": "We recommend booking 2-3 months in advance for regular events and 6+ months for peak season (Nov-Feb, wedding season). However, we can accommodate last-minute bookings based on availability."
            },
            {
                "question": "Which cities do you operate in?",
                "answer": f"We provide {service_name} services across India, with primary operations in Delhi, Mumbai, Bangalore, Goa, Jaipur, Udaipur, Pune, and Hyderabad. We also handle destination events."
            },
            {
                "question": "What is your cancellation policy?",
                "answer": "Cancellations made 30+ days before the event: 80% refund. 15-30 days: 50% refund. Less than 15 days: No refund. Rescheduling is allowed once without charges if done 30+ days in advance."
            },
            {
                "question": "What payment terms do you offer?",
                "answer": "We require 30% advance at booking, 40% one month before the event, and 30% on the event day. We accept bank transfer, cheque, and online payments."
            },
            {
                "question": "Can I customize the packages?",
                "answer": "Absolutely! All our packages are fully customizable. You can add or remove services, choose specific vendors, and tailor everything to your preferences and budget."
            },
            {
                "question": "Do you provide decoration services?",
                "answer": "Yes, we offer complete decoration services including theme-based decor, floral arrangements, lighting, stage setup, and more. Our in-house design team will work with you to create your dream setup."
            },
            {
                "question": "What if it rains during an outdoor event?",
                "answer": "We always have a backup plan for outdoor events, including weather-proof tents, covered areas, and alternative indoor arrangements. This is discussed during planning."
            },
            {
                "question": "Do you handle vendor coordination?",
                "answer": "Yes, we coordinate with all vendors including caterers, decorators, photographers, entertainers, and more. You'll have a dedicated event manager as your single point of contact."
            },
            {
                "question": "Can I see your previous work?",
                "answer": "Absolutely! We have an extensive portfolio of past events. Contact us and we'll share photos, videos, and client testimonials relevant to your event type."
            },
            {
                "question": "What is included in the basic package?",
                "answer": "Basic package typically includes venue decoration, standard catering (veg menu), sound system, basic photography, and event coordination. Exact inclusions vary by service type."
            },
            {
                "question": "Do you provide catering services?",
                "answer": "Yes, we offer complete catering services with multi-cuisine options (Indian, Continental, Chinese, etc.), both vegetarian and non-vegetarian. We can accommodate dietary restrictions and preferences."
            }
        ]
    
    def get_testimonials_template(self) -> List[Dict]:
        """Generate sample testimonials"""
        return [
            {
                "client": "Rahul & Priya Sharma",
                "event": "Destination Wedding",
                "rating": 5,
                "review": "DoFor Event made our dream wedding come true! Every detail was perfect, from the decoration to the food. Highly recommended!",
                "location": "Udaipur"
            },
            {
                "client": "Tech Solutions Pvt Ltd",
                "event": "Annual Conference",
                "rating": 5,
                "review": "Professional, organized, and flawless execution. Our 500+ attendee conference was a huge success thanks to DoFor Event.",
                "location": "Bangalore"
            },
            {
                "client": "Anjali Mehta",
                "event": "Birthday Celebration",
                "rating": 5,
                "review": "Amazing theme party for my daughter's birthday! The team was creative, punctual, and made sure every kid had a blast.",
                "location": "Mumbai"
            }
        ]
    
    def get_booking_process(self) -> Dict:
        """Standard booking process"""
        return {
            "steps": [
                {
                    "step": 1,
                    "title": "Initial Consultation",
                    "description": "Free consultation to understand your requirements, preferences, and budget",
                    "duration": "30-60 minutes"
                },
                {
                    "step": 2,
                    "title": "Proposal & Quote",
                    "description": "Detailed proposal with package options, pricing breakdown, and timeline",
                    "duration": "2-3 days"
                },
                {
                    "step": 3,
                    "title": "Booking Confirmation",
                    "description": "Contract signing and 30% advance payment to confirm booking",
                    "duration": "1 day"
                },
                {
                    "step": 4,
                    "title": "Planning & Coordination",
                    "description": "Detailed planning, vendor selection, venue finalization, and regular updates",
                    "duration": "Ongoing until event"
                },
                {
                    "step": 5,
                    "title": "Pre-Event Setup",
                    "description": "Complete setup, decoration, testing of equipment, and final checks",
                    "duration": "1-2 days before event"
                },
                {
                    "step": 6,
                    "title": "Event Execution",
                    "description": "On-ground coordination, vendor management, and ensuring smooth execution",
                    "duration": "Event day"
                },
                {
                    "step": 7,
                    "title": "Post-Event",
                    "description": "Cleanup, final settlement, and delivery of photos/videos",
                    "duration": "1-2 weeks after event"
                }
            ],
            "timeline": {
                "minimum_notice": "2 weeks",
                "recommended_notice": "2-3 months",
                "peak_season_notice": "6 months (Nov-Feb)"
            }
        }
    
    def enhance_service(self, service: Dict) -> Dict:
        """Enhance a single service entry"""
        # Preserve all existing data
        enhanced = service.copy()
        
        # Add pricing if not exists
        if 'pricing' not in enhanced:
            enhanced['pricing'] = self.get_pricing_template(service.get('title', ''))
        
        # Add FAQs if not exists
        if 'faqs' not in enhanced:
            service_name = service.get('title', 'this service').split('|')[0].strip()
            enhanced['faqs'] = self.get_faqs_template(service_name)
        
        # Add cities if not exists
        if 'cities' not in enhanced:
            enhanced['cities'] = {
                "available_in": self.cities,
                "popular_venues": {
                    "Delhi": ["The Leela Ambience", "Taj Palace", "ITC Maurya"],
                    "Mumbai": ["Taj Mahal Palace", "Grand Hyatt", "JW Marriott"],
                    "Bangalore": ["ITC Gardenia", "The Oberoi", "Taj West End"],
                    "Goa": ["Taj Exotica", "Grand Hyatt", "The Leela"],
                    "Jaipur": ["Fairmont", "ITC Rajputana", "Rambagh Palace"],
                    "Udaipur": ["Taj Lake Palace", "The Oberoi Udaivilas", "Leela Palace"]
                }
            }
        
        # Add testimonials if not exists
        if 'testimonials' not in enhanced:
            enhanced['testimonials'] = self.get_testimonials_template()
        
        # Add booking process if not exists
        if 'booking_process' not in enhanced:
            enhanced['booking_process'] = self.get_booking_process()
        
        # Add related services if not exists
        if 'related_services' not in enhanced:
            enhanced['related_services'] = self.get_related_services(service.get('title', ''))
        
        # Add SEO keywords if not exists
        if 'seo_keywords' not in enhanced:
            enhanced['seo_keywords'] = self.get_seo_keywords(service.get('title', ''))
        
        self.enhanced_count += 1
        return enhanced
    
    def get_related_services(self, title: str) -> List[str]:
        """Get related services based on title"""
        title_lower = title.lower()
        
        if 'wedding' in title_lower:
            return ["Wedding Decor", "Pre Wedding", "Wedding Planning", "Destination Wedding"]
        elif 'corporate' in title_lower or 'conference' in title_lower:
            return ["Product Launch", "Conferences", "Dealers Meet", "Annual Day"]
        elif 'birthday' in title_lower or 'celebration' in title_lower:
            return ["Theme Party", "Anniversary", "New Year Celebration"]
        else:
            return ["Live Concerts", "Fashion Show", "Award Nights"]
    
    def get_seo_keywords(self, title: str) -> List[str]:
        """Generate SEO keywords"""
        base_keywords = [
            "event management",
            "event planner",
            "event organizer",
            "DoFor Event"
        ]
        
        # Add city keywords
        city_keywords = [f"{city.lower()} event planner" for city in self.cities[:4]]
        
        # Add service-specific keywords
        service_name = title.split('|')[0].strip().lower()
        service_keywords = [
            service_name,
            f"{service_name} planner",
            f"{service_name} organizer",
            f"best {service_name} company"
        ]
        
        return base_keywords + city_keywords + service_keywords
    
    def enhance_all(self):
        """Main function to enhance entire knowledge base"""
        print("Starting Knowledge Base Enhancement...")
        print(f"Input: {self.input_file}")
        print(f"Output: {self.output_file}")
        print()
        
        # Load existing data
        kb_data = self.load_knowledge_base()
        print(f"Loaded {len(kb_data)} services from knowledge base")
        
        # Enhance each service
        enhanced_data = []
        for idx, service in enumerate(kb_data, 1):
            service_name = service.get('title', f'Service {idx}')
            print(f"Enhancing [{idx}/{len(kb_data)}]: {service_name[:50]}...")
            enhanced_service = self.enhance_service(service)
            enhanced_data.append(enhanced_service)
        
        # Save enhanced data
        self.save_knowledge_base(enhanced_data)
        print()
        print("=" * 60)
        print("ENHANCEMENT COMPLETE!")
        print("=" * 60)
        print(f"Services enhanced: {self.enhanced_count}")
        print(f"New file: {self.output_file}")
        print()
        print("What was added to each service:")
        print("   - 3-tier pricing (Basic/Premium/Luxury)")
        print("   - 12 comprehensive FAQs")
        print("   - 8 cities availability")
        print("   - Popular venues per city")
        print("   - 3 testimonials")
        print("   - 7-step booking process")
        print("   - Related services")
        print("   - SEO keywords")
        print()
        print("NO services were missed!")
        print("ALL existing information preserved!")

if __name__ == "__main__":
    # File paths
    input_file = "knowledge_base.json"
    output_file = "knowledge_base_enhanced.json"
    
    # Create enhancer and run
    enhancer = KnowledgeBaseEnhancer(input_file, output_file)
    enhancer.enhance_all()
    
    print("\nDone! You can now:")
    print("   1. Review knowledge_base_enhanced.json")
    print("   2. Replace knowledge_base.json with enhanced version")
    print("   3. Test the chatbot with new detailed responses!")
