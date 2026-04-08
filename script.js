const EQUIP_DATA = [
    { name: 'Fermentation Tank', spec: '200 L – 50,000 L', desc: 'SS 304 stainless steel tanks for red wine, white wine, and fruit wine. Advanced temperature control systems optimise fermentation. Easy to sanitise, built for longevity.', src: '/images/equip-0.jpg' },
    { name: 'Pneumatic Press', spec: '1,000 – 5,000 kg/hr', desc: 'Large-scale grape pneumatic press for high-volume processing. Minimises oxidation and seed tannin extraction for the cleanest, freshest juice possible.', src: '/images/equip-1.jpg' },
    { name: 'Basket Press', spec: '20 – 500 kg per batch', desc: 'Gentle grape and fruit juice extraction for boutique operations. Preserves delicate flavour characteristics while delivering high yields with minimal oxidation.', src: '/images/equip-2.jpg' },
    { name: 'Grape Stemmer + Mono Pump', spec: '500 – 2,000 kg/hr', desc: 'Efficient grape stemming with integrated mono pump for gentle fruit transfer. Reduces manual handling and preserves the integrity of the grape at scale.', src: '/images/equip-3.jpg' },
    { name: 'Dual Temperature Chiller', spec: 'Hot & Cold Climate', desc: 'Engineered to work in both extreme hot and cold climates. Capacity designed based on number of connected fermentation tanks — fully scalable cooling.', src: '/images/equip-4.jpg' },
    { name: 'Plate & Frame Filter', spec: '20×20 to 40×40 sizes', desc: 'High-performance filtration ensuring clarity and purity in the final product. Multiple size options accommodate varying production volumes with consistent results.', src: '/images/equip-5.jpg' },
    { name: 'Cartridge Filter (Trolley)', spec: 'Series-mounted system', desc: 'Mobile trolley-mounted cartridge filter system. Series configuration delivers superior filtration clarity at the final stage before bottling.', src: '/images/equip-6.jpg' },
    { name: 'Plate Filter', spec: 'Multi-stage filtration', desc: 'Precision plate filtration for intermediate and finishing stages. Removes impurities while retaining the desired flavours, aromas, and wine character.', src: '/images/equip-7.jpg' },
    { name: 'Bottling Machine', spec: '4-head still wine', desc: 'Four-head still wine bottling machine designed for precision and speed. Accommodates various bottle sizes and ensures a perfect airtight seal every time.', src: '/images/equip-8.jpg' },
    { name: 'Screw Capping Machine', spec: 'Single head, semi-auto', desc: 'Reliable single-head semi-automatic screw capping for consistent cap application. Ideal for boutique and mid-scale production runs.', src: '/images/equip-9.jpg' },
    { name: 'Automatic Labelling', spec: 'High-speed precision', desc: 'Automated label application for consistent brand presentation. Compatible with multiple bottle formats and label types for retail-ready finishing.', src: '/images/equip-10.jpg' },
    { name: 'Fruit Milling Machine', spec: 'Multi-fruit compatible', desc: 'Industrial fruit milling for efficient pre-fermentation processing. Compatible with a wide range of fruits to support diverse beverage applications.', src: '/images/equip-11.jpg' },
    { name: 'Fruit De-Stoner', spec: 'High-volume processing', desc: 'Automated stone and seed removal for stone fruits. Ensures clean pulp yield and protects downstream equipment from damage during high-volume production.', src: '/images/equip-12.jpg' },
    { name: 'Chemical Mixing Machine', spec: 'Precision formulation', desc: 'Accurate chemical and additive mixing for SO₂ dosing, fining agents, and nutrient additions. Ensures consistent, repeatable results batch after batch.', src: '/images/equip-13.jpg' },
    { name: 'Centrifugal Pump (VFD)', spec: 'Variable frequency drive', desc: 'Centrifugal pumps with optional VFD fitting for precise flow control and energy efficiency. Suitable for must, wine, and all process fluid transfers.', src: '/images/equip-14.jpg' },
    { name: 'Winery Laboratory', spec: 'Full analytical setup', desc: 'Complete winery laboratory setup for pH, SO₂, alcohol and acid testing. Enables in-house quality control at every stage from must to finished wine.', src: '/images/equip-15.jpg' }
];

const CONFIG = {
    emailDestination: 'dewisedrinksolutions@gmail.com',
    formspreeId: 'xykbvwol' // User can update this with their Formspree ID
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("Dewise script.js loaded");
    // --- Initialize Lucide Icons ---
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    // --- Navbar Scroll Handling ---
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            mobileMenu.classList.toggle('open');
            const spans = hamburger.querySelectorAll('span');
            if (mobileMenu.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // --- Interaction Observer for Revelations ---
    const revealOptions = { threshold: 0.1 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, revealOptions);

    document.querySelectorAll('.reveal, .service-item, .why-item, .test-card').forEach(el => {
        revealObserver.observe(el);
    });

    // --- Dynamic Equipment Grid ---
    const equipGrid = document.querySelector('.equip-grid');
    if (equipGrid) {
        // Clear existing placeholders if any
        equipGrid.innerHTML = '';

        EQUIP_DATA.forEach((data, index) => {
            const card = document.createElement('div');
            card.className = 'equip-card';
            card.setAttribute('data-index', index);
            card.innerHTML = `
                <div class="equip-img-wrap">
                    <img src="${data.src}" alt="${data.name}">
                </div>
                <div class="equip-card-body">
                    <div class="equip-spec">${data.spec}</div>
                    <h3 class="equip-name">${data.name}</h3>
                    <p class="equip-desc">${data.desc.substring(0, 100)}${data.desc.length > 100 ? '...' : ''}</p>
                </div>
            `;
            equipGrid.appendChild(card);
            revealObserver.observe(card);

            // Add click listener for modal
            card.addEventListener('click', () => {
                openEquipModal(index);
            });
        });
    }

    // --- Equipment Modal Logic ---
    const modalOverlay = document.querySelector('.equip-modal-overlay');

    function openEquipModal(index) {
        if (!modalOverlay) return;
        const data = EQUIP_DATA[index];
        if (!data) return;

        const modalImg = modalOverlay.querySelector('.equip-modal-img img');
        const modalName = modalOverlay.querySelector('.equip-modal-name');
        const modalSpec = modalOverlay.querySelector('.equip-modal-spec');
        const modalDesc = modalOverlay.querySelector('.equip-modal-desc');

        modalImg.src = data.src;
        modalName.textContent = data.name;
        modalSpec.textContent = data.spec;
        modalDesc.textContent = data.desc;
        modalOverlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    if (modalOverlay) {
        const closeBtn = modalOverlay.querySelector('.equip-modal-close');
        const closeModal = () => {
            modalOverlay.classList.remove('open');
            document.body.style.overflow = 'auto';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // --- Stats Counter ---
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        const stats = statsSection.querySelectorAll('.stat-n span');
        let started = false;

        const startCounter = () => {
            stats.forEach(stat => {
                const target = +stat.getAttribute('data-target');
                const count = +stat.innerText;
                const speed = 2000 / target;

                const updateCount = () => {
                    const current = +stat.innerText;
                    if (current < target) {
                        stat.innerText = Math.ceil(current + target / 100);
                        setTimeout(updateCount, 20);
                    } else {
                        stat.innerText = target;
                    }
                };
                updateCount();
            });
        };

        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !started) {
                startCounter();
                started = true;
            }
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // UI Feedback: Loading
            formStatus.textContent = "Sending inquiry...";
            formStatus.className = "form-status loading";
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            // Note: In a real static site, we'd use Formspree or similar.
            // For now, we'll simulate the call and explain how to finalize.
            const endpoint = `https://formspree.io/f/${CONFIG.formspreeId || 'placeholder'}`;

            try {
                // If the user hasn't set up Formspree, we fallback to a mailto for now or just log it
                if (CONFIG.formspreeId === 'YOUR_FORMSPREE_ID') {
                    console.log("Form data would be sent to:", CONFIG.emailDestination);
                    console.log("Formspree ID is not configured. Redirecting to mailto...");

                    const name = formData.get('name');
                    const email = formData.get('email');
                    const industry = formData.get('industry');
                    const message = formData.get('message');

                    const mailtoUrl = `mailto:${CONFIG.emailDestination}?subject=Inquiry from ${name}&body=Industry: ${industry}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
                    window.location.href = mailtoUrl;

                    formStatus.textContent = "Redirecting to your email client...";
                    formStatus.className = "form-status success";
                } else {
                    const response = await fetch(endpoint, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });

                    if (response.ok) {
                        formStatus.textContent = "Thank you! Your message has been sent successfully.";
                        formStatus.className = "form-status success";
                        contactForm.reset();
                    } else {
                        throw new Error("Submission failed");
                    }
                }
            } catch (error) {
                formStatus.textContent = "Oops! There was a problem sending your message. Please try again or contact us via email directly.";
                formStatus.className = "form-status error";
            } finally {
                submitBtn.disabled = false;
            }
        });
    }
});