window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    const heroLogo = document.getElementById('heroLogo');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
        header.classList.add('scrolled');
        heroLogo.classList.add('fade-out');
    } else {
        header.classList.remove('scrolled');
        heroLogo.classList.remove('fade-out');
    }
});

// --- Scroll Reveal ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

(function () {
    var hamburger = document.getElementById('navHamburger');
    var navLinks = document.getElementById('navLinks');
    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', function () {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
        });
    });
})();
function scrollToContact() {
    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
}

/* ========== TEAM SPOTLIGHT CAROUSEL ========== */
(function () {
    var carousel = document.getElementById("teamCarousel");
    var prevBtn = document.querySelector(".team-arrow-prev");
    var nextBtn = document.querySelector(".team-arrow-next");
    if (!carousel) return;

    var cards = carousel.querySelectorAll(".team-card");
    var total = cards.length;
    var spotlightIndex = Math.floor(total / 2);

    function updateSpotlight() {
        cards.forEach(function (card, i) {
            card.classList.toggle("spotlight", i === spotlightIndex);
        });
        var spotlightCard = cards[spotlightIndex];
        if (spotlightCard && window.matchMedia("(max-width: 480px)").matches) {
            spotlightCard.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
        }
    }

    cards.forEach(function (card, i) {
        card.addEventListener("click", function () {
            spotlightIndex = i;
            updateSpotlight();
        });
    });
    if (prevBtn) {
        prevBtn.addEventListener("click", function () {
            spotlightIndex = (spotlightIndex - 1 + total) % total;
            updateSpotlight();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            spotlightIndex = (spotlightIndex + 1) % total;
            updateSpotlight();
        });
    }
    updateSpotlight();
})();






// Add this to main.js to make the 'About Us' section animate
document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".reveal-card", {
        scrollTrigger: {
            trigger: "#Aboutus",
            start: "top 80%",
        },
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out"
    });

    gsap.to(["#about-sub", "#about-title", "#about-line"], {
        scrollTrigger: {
            trigger: "#Aboutus",
            start: "top 80%",
        },
        opacity: 1,
        duration: 1,
        stagger: 0.1
    });
});



// Add this to your main.js or index.html



// Replace your existing initTechScene function with this:





function servicesApp() {
    return {
        showAll: false,
        services: [
            {
                title: 'Software & <span class="text-[var(--accent-sky)]">Technology Solutions</span>',
                icon: 'fas fa-code',
                color: 'var(--accent-sky)',
                image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
                features: ['Modular ERP systems', 'Inventory & warehouse', 'POS systems', 'QR/barcode ecosystems', 'Cloud infrastructure/DevOps'],
                description: 'Custom ERP, CRM, and business process automation solutions tailored for modern enterprises.',
                url: 'services/software-solutions.html'
            },
            {
                title: 'E-Commerce & <span class="text-[var(--primary-blue)]">Web Development</span>',
                icon: 'fas fa-store',
                color: 'var(--primary-blue)',
                image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800',
                features: ['Multi-vendor platforms', 'B2B/B2C web portals', 'Dedicated e-commerce apps'],
                description: 'Scalable corporate websites and feature-rich e-commerce stores using modern frameworks.',
                url: 'services/ecommerce-web.html'
            },
            {
                title: 'Marketing & <span class="text-[var(--accent-sky)]">Growth</span>',
                icon: 'fas fa-chart-line',
                color: 'var(--accent-sky)',
                image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
                features: ['Email marketing automation', 'Lead generation', 'Influencer marketing', 'WhatsApp API integration'],
                description: 'Advanced SEO, Social Media Strategy, and data-driven Paid Advertising campaigns.',
                url: 'services/marketing-growth.html'
            },
            {
                title: 'Creative & <span class="text-[var(--primary-blue)]">Branding</span>',
                icon: 'fas fa-paint-brush',
                color: 'var(--primary-blue)',
                image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800',
                features: ['3D modeling', 'Video production', 'Professional photography', 'Social media creative designs'],
                description: 'High-end UI/UX design and compelling brand identity development for market leadership.',
                url: 'services/creative-branding.html'
            },
            {
                title: 'Advanced AI <span class="text-[var(--accent-sky)]">Services</span>',
                icon: 'fas fa-robot',
                color: 'var(--accent-sky)',
                image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
                features: ['SaaS product development', 'AI-powered chatbots', 'AI-driven content creation'],
                description: 'Cutting-edge SaaS development and AI-powered automation to future-proof your business.',
                url: 'services/advanced-ai.html'
            }
        ],

        get visibleServices() {
            return this.showAll ? this.services : this.services.slice(0, 3);
        },

        loadMore() {
            this.showAll = true;
            // Smooth scroll to newly visible services
            setTimeout(() => {
                const newServices = document.querySelectorAll('.service-card');
                if (newServices.length > 3) {
                    newServices[3].scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        },

        showLess() {
            this.showAll = false;
            // Scroll back to services section
            document.getElementById('Services').scrollIntoView({ behavior: 'smooth' });
        },

        init() {
            // Add animation delay classes
            this.services.forEach((_, index) => {
                if (index >= 3) {
                    // These will appear when load more is clicked
                }
            });
        }
    }
}

// Add this CSS for animation delays (add to your style.css)
const style = document.createElement('style');
style.textContent = `
    .animation-delay-200 {
        animation-delay: 200ms;
    }
    .animation-delay-400 {
        animation-delay: 400ms;
    }
`;
document.head.appendChild(style);

// --- Team Spotlight Carousel Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.team-card');
    const nextBtn = document.getElementById('teamNext');
    const prevBtn = document.getElementById('teamPrev');
    let currentIndex = 3; // Center: Muhammad Waris Karim

    function updateCarousel(index) {
        cards.forEach((card, i) => {
            // Remove highlighting
            card.classList.remove('spotlight');

            // On mobile, cards might be hidden, so we show the spotlighted one
            if (i === index) {
                card.classList.add('spotlight');
                card.classList.remove('hidden');
                // Scroll into view on mobile
                if (window.innerWidth < 1024) {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            } else {
                // Restore responsive hide classes for non-spotlight if needed
                // But generally, the layout handles this.
            }
        });
    }

    // Add click event to each card for direct selection
    cards.forEach((card, i) => {
        card.addEventListener('click', () => {
            currentIndex = i;
            updateCarousel(i);
        });
    });

    if (nextBtn && prevBtn) {
        nextBtn.onclick = () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateCarousel(currentIndex);
        };
        prevBtn.onclick = () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateCarousel(currentIndex);
        };
    }
});

// --- Custom Toast Notification System ---
function showToast(message, type = 'success') {
    const toast = document.getElementById('customToast');
    const toastMsg = document.getElementById('toastMessage');
    const toastIcon = document.getElementById('toastIcon');
    const iconInner = toastIcon.querySelector('i');

    toastMsg.textContent = message;

    if (type === 'success') {
        toastIcon.className = "w-10 h-10 rounded-full flex items-center justify-center bg-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]";
        iconInner.className = "fas fa-check text-white";
    } else {
        toastIcon.className = "w-10 h-10 rounded-full flex items-center justify-center bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]";
        iconInner.className = "fas fa-exclamation-triangle text-white";
    }

    gsap.to(toast, {
        opacity: 1,
        y: 20,
        pointerEvents: 'auto',
        duration: 0.5,
        ease: "back.out(1.7)"
    });

    setTimeout(() => {
        gsap.to(toast, {
            opacity: 0,
            y: -20,
            pointerEvents: 'none',
            duration: 0.5,
            ease: "power2.in"
        });
    }, 4000);
}

// --- Contact Form EmailJS Integration ---
(function () {
    // Initialize EmailJS with your Public Key
    emailjs.init("wqokni0-grYTFQFEJ");

    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Change button state to loading
        const btn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<span>Sending... <i class="fas fa-spinner fa-spin ml-2"></i></span>';

        // serviceID - templateID - #formID
        emailjs.sendForm('service_nbxr8nj', 'template_mhg6ws6', this)
            .then(() => {
                // Success
                btn.innerHTML = '<span>Sent Successfully! <i class="fas fa-check ml-2"></i></span>';
                btn.classList.add('bg-green-600');

                // Custom Notification instead of alert
                showToast('Thank you! Your message has been sent successfully.', 'success');

                // Reset form
                contactForm.reset();

                // Reset button after 5 seconds
                setTimeout(() => {
                    btn.disabled = false;
                    btn.innerHTML = originalBtnText;
                    btn.classList.remove('bg-green-600');
                }, 5000);
            }, (err) => {
                // Error
                btn.disabled = false;
                btn.innerHTML = '<span>Error! Try Again <i class="fas fa-exclamation-triangle ml-2"></i></span>';
                btn.classList.add('bg-red-600');

                showToast('Oops! Something went wrong. Please try again.', 'error');

                setTimeout(() => {
                    btn.innerHTML = originalBtnText;
                    btn.classList.remove('bg-red-600');
                }, 5000);
            });
    });
})();

// --- Premium Pre-loader Word-by-Word Animation ---
document.addEventListener('DOMContentLoaded', () => {
    // Split into two lines
    const line1 = ["You", "Think,", "We", "Build."];
    const line2 = ["Welcome", "to", "Orbex", "Tech"];

    const createWordSpans = (wordArr, container) => {
        wordArr.forEach(word => {
            const span = document.createElement('span');
            span.textContent = word;
            span.className = "inline-block opacity-0 translate-y-8"; // Removed blur-sm
            container.appendChild(span);
        });
    };

    const line1Div = document.createElement('div');
    line1Div.className = "mb-4 flex flex-wrap justify-center gap-x-3 sm:gap-x-5";
    const line2Div = document.createElement('div');
    line2Div.className = "flex flex-wrap justify-center gap-x-3 sm:gap-x-5 text-[#22D3EE]"; // Used direct color for consistency

    createWordSpans(line1, line1Div);
    createWordSpans(line2, line2Div);

    loaderText.appendChild(line1Div);
    loaderText.appendChild(line2Div);

    const spans = loaderText.querySelectorAll('span');
    const tl = gsap.timeline();

    tl.to(loaderLine, {
        width: "200px",
        duration: 0.8,
        ease: "power2.inOut"
    })
        .to(spans, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power3.out"
        })
        .to(loaderLine, {
            width: "100%",
            opacity: 0,
            duration: 0.8,
            ease: "power4.in",
            delay: 0.5
        })
        .to(loaderText, {
            y: -40,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in"
        })
        .to(preloader, {
            yPercent: -100,
            duration: 1,
            ease: "expo.inOut",
            onComplete: () => {
                preloader.remove(); // Clean up from DOM

                // Initial GSAP reveal animations with clearProps to avoid CSS conflicts
                gsap.from(".main-header", {
                    y: -100,
                    opacity: 0,
                    duration: 1.2,
                    ease: "power4.out",
                    clearProps: "all" // CRITICAL: This allows CSS .scrolled translateX to work!
                });

                gsap.from(".hero-content > *", {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power4.out",
                    clearProps: "filter" // Clear any lingering filters
                });
            }
        });
});