/**
 * Section Templates for DoFor Event
 * These functions return HTML strings based on the configuration data.
 */

const Templates = {
    // Global Components
    navbar: (data, global) => `
        <div class="container">
            <a href="index.html" class="navbar-logo">${global.logoText}</a>
            <div class="navbar-menu" id="navbarMenu">
                ${global.navbar.links.map(link => `
                    <a href="${link.href}" class="navbar-link ${link.active ? 'active' : ''}">${link.label}</a>
                `).join('')}
                <a href="${global.navbar.cta.href}" class="btn btn-primary">${global.navbar.cta.label}</a>
            </div>
            <button class="navbar-toggle" id="navbarToggle">
                <span></span><span></span><span></span>
            </button>
        </div>
    `,

    footer: (global) => `
        <div class="container">
            <div class="footer-grid">
                <div>
                    <h3 class="footer-title">${global.siteName}</h3>
                    <p>${global.seo.defaultDescription}</p>
                    <div class="social-links">
                        ${Templates.socialLink('facebook', global.social.facebook)}
                        ${Templates.socialLink('instagram', global.social.instagram)}
                        ${Templates.socialLink('twitter', global.social.twitter)}
                    </div>
                </div>
                <div>
                    <h3 class="footer-title">Quick Links</h3>
                    ${global.navbar.links.map(link => `<a href="${link.href}" class="footer-link">${link.label}</a>`).join('')}
                </div>
                <div>
                    <h3 class="footer-title">Contact Info</h3>
                    <p><strong>Address:</strong><br>${global.contact.address}</p>
                    <p><strong>Phone:</strong><br><a href="tel:${global.contact.phone}" class="footer-link">${global.contact.phone}</a></p>
                    <p><strong>Email:</strong><br><a href="mailto:${global.contact.email}" class="footer-link">${global.contact.email}</a></p>
                </div>
            </div>
            <div class="footer-bottom">
                <p>Copyright © 2025 ${global.siteName}. All rights reserved.</p>
            </div>
        </div>
    `,

    socialLink: (platform, url) => url ? `
        <a href="${url}" class="social-link" aria-label="${platform}" target="_blank" rel="noopener">
            ${platform === 'facebook' ? '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>' : ''}
            ${platform === 'instagram' ? '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5a4.25 4.25 0 004.25 4.25h8.5a4.25 4.25 0 004.25-4.25v-8.5a4.25 4.25 0 00-4.25-4.25h-8.5zM17.5 6.5a1 1 0 110 2 1 1 0 010-2zM12 7.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 1.5a3 3 0 100 6 3 3 0 000-6z" /></svg>' : ''}
            ${platform === 'twitter' ? '<svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>' : ''}
        </a>
    ` : '',

    // Page Sections
    hero: (data) => `
        <section class="hero">
            <div class="hero-content">
                <h1>${data.title}</h1>
                <p>${data.subtitle}</p>
                <div class="hero-buttons">
                    ${data.buttons.map(btn => `
                        <a href="${btn.href}" class="btn btn-${btn.type || 'primary'} btn-lg">
                            ${btn.icon === 'whatsapp' ? '<svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>' : ''}
                            ${btn.label}
                        </a>
                    `).join('')}
                </div>
            </div>
        </section>
    `,

    grid: (data) => `
        <section class="section">
            <div class="container">
                <div class="text-center mb-2xl scroll-animate">
                    <h2>${data.heading}</h2>
                    <p>${data.subheading}</p>
                </div>
                <div class="grid grid-${data.columns}">
                    ${data.items.map(item => `
                        <div class="card scroll-animate">
                            <div class="card-icon">${item.icon}</div>
                            <h3 class="card-title">${item.title}</h3>
                            <p class="card-text">${item.text}</p>
                            <a href="${item.link}" class="btn btn-outline">Learn More</a>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `,

    "about-stat": (data) => `
        <section class="section" style="background: var(--color-light-2);">
            <div class="container">
                <div class="grid grid-2" style="align-items: center; gap: var(--spacing-3xl);">
                    <div class="scroll-animate">
                        <h2><strong>${data.title}</strong></h2>
                        ${data.paragraphs.map(p => `<p>${Templates.parseMarkdown(p)}</p>`).join('')}
                        <a href="${data.cta.href}" class="btn btn-primary btn-lg mt-lg">${data.cta.label}</a>
                    </div>
                    <div class="scroll-animate">
                        <div class="stats-grid">
                            ${data.stats.map(stat => `
                                <div class="stat-item">
                                    <span class="stat-number" data-count="${stat.number}">${stat.number}</span>
                                    <span class="stat-label">${stat.label}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `,

    cta: (data) => `
        <section class="section" style="background: var(--gradient-hero); color: var(--color-white);">
            <div class="container text-center">
                <div class="scroll-animate">
                    <h2 style="color: var(--color-white); margin-bottom: var(--spacing-lg);">${data.title}</h2>
                    <p style="font-size: var(--text-xl); color: rgba(255,255,255,0.9); margin-bottom: var(--spacing-2xl); max-width: 700px; margin-left: auto; margin-right: auto;">
                        ${data.subtitle}
                    </p>
                    <div style="display: flex; gap: var(--spacing-lg); justify-content: center; flex-wrap: wrap;">
                        ${data.buttons.map(btn => `
                            <a href="${btn.href}" class="btn btn-lg" 
                               style="${btn.style ? `background: ${btn.style.bg}; color: var(--color-${btn.style.color});` : ''} ${btn.type === 'whatsapp' ? 'background: #25D366; color: white;' : ''}">
                                ${btn.label}
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>
    `,

    parseMarkdown: (text) => {
        // Simple regex to handle **bold** from config
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }
};

window.Templates = Templates;
