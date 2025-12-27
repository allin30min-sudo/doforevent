// WhatsApp Quote Message Generator with Auto Package Detection

function generateWhatsAppQuote(packageCard) {
    const city = (typeof cityService !== 'undefined' && cityService.getSelectedCity()) || 'Your City';

    // Extract service name from page title (h1)
    const serviceNameElement = document.querySelector('h1');
    let serviceName = serviceNameElement ? serviceNameElement.textContent.replace(` — ${city}`, '').trim() : 'Event Service';

    // Extract package name from card
    const packageNameElement = packageCard.querySelector('h3');
    let packageName = packageNameElement ? packageNameElement.textContent.replace(` — ${city}`, '').trim() : 'Package';

    // Extract package services from ul > li
    const servicesList = packageCard.querySelectorAll('ul li');
    const packageServices = Array.from(servicesList).map(li => li.textContent.trim());

    // Build the message
    const message = `Hello Team DoFor Events,

We are planning a *${serviceName} — ${city}* and are interested in availing your *${packageName} — ${city}*.

As per our requirement, the package should include a comprehensive *${packageName} — ${city}* covering the following services:

${packageServices.map(service => `• ${service}`).join('\n')}

We request you to please share a detailed proposal including service inclusions, customization options, commercial pricing, and availability for our preferred date. Additionally, kindly specify the space, power, and setup requirements from your end to ensure smooth execution of the event.

We look forward to your prompt response and a detailed discussion to take this forward.

Warm regards,`;

    return encodeURIComponent(message);
}

function sendWhatsAppQuote(event) {
    event.preventDefault();
    event.stopPropagation();

    // Find the parent card
    const button = event.currentTarget;
    const packageCard = button.closest('.card');

    if (!packageCard) {
        console.error('Package card not found');
        return;
    }

    const message = generateWhatsAppQuote(packageCard);
    const phoneNumber = '919650125822';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// Auto-attach to all "Get Quote" buttons on page load
document.addEventListener('DOMContentLoaded', () => {
    // Find all Get Quote buttons
    const quoteButtons = document.querySelectorAll('a.btn[href*="contact.html"]');

    quoteButtons.forEach(button => {
        const buttonText = button.textContent.trim();
        if (buttonText.includes('Get Quote') || buttonText.includes('Quote')) {
            // Check if this button is inside a package card
            const packageCard = button.closest('.card');
            if (packageCard && packageCard.querySelector('ul li')) {
                // This is a package card with services list
                button.addEventListener('click', sendWhatsAppQuote);
            }
        }
    });
});
