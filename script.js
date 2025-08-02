// ------------------- //
//     PRELOADER       //
// ------------------- //
const preloader = document.querySelector('.preloader');
const progressBar = document.querySelector('.progress-bar');
const mainContent = document.querySelector('.main-container');

// Hide main content initially
gsap.set(mainContent, { autoAlpha: 0 });

const preloaderTimeline = gsap.timeline();

function animateHeroSection() {
    // Animate Glow Orbs
    gsap.to(".glow-orb", {
        y: (i, target) => (Math.random() - 0.5) * 100,
        x: (i, target) => (Math.random() - 0.5) * 100,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });

    // Animate Hero Content
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from(".hero-headline", {
            autoAlpha: 0,
            y: 50,
            filter: "blur(10px)",
            duration: 1.5,
            ease: "power2.out"
        }, "-=0.5")
        .from(".hero-subtitle", {
            autoAlpha: 0,
            y: 30,
            filter: "blur(5px)",
            duration: 1,
            ease: "power2.out"
        }, "-=1")
        .from(".hero-cta .cta-button", {
            autoAlpha: 0,
            y: 20,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.8")
        .from(".spline-container", {
            autoAlpha: 0,
            x: 100,
            duration: 2,
            ease: "power2.out"
        }, 0);
}


preloaderTimeline
    .to(progressBar, {
        width: '100%',
        duration: 3,
        ease: 'power2.out'
    })
    .to(preloader, {
        autoAlpha: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => {
            preloader.style.display = 'none';
            // Reveal the main content
            gsap.to(mainContent, {
                autoAlpha: 1,
                duration: 1,
                ease: 'power2.out',
                onComplete: animateHeroSection
            });
        }
    });

function initScrollTriggers() {
    // About Section Animation
    const aboutSection = document.querySelector('.about-section');
    if (aboutSection) {
        gsap.from(aboutSection.querySelector('.about-image-container'), {
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top 80%',
                end: 'bottom top',
                toggleActions: 'play none none none'
            },
            autoAlpha: 0,
            x: -100,
            duration: 1.5,
            ease: 'power3.out'
        });

        gsap.from(aboutSection.querySelectorAll('.about-content > *'), {
            scrollTrigger: {
                trigger: aboutSection,
                start: 'top 70%',
                toggleActions: 'play none none none'
            },
            autoAlpha: 0,
            y: 50,
            filter: "blur(5px)",
            stagger: 0.3,
            duration: 1,
            ease: 'power3.out'
        });

        gsap.from(aboutSection.querySelectorAll('.feature-item'), {
            scrollTrigger: {
                trigger: '.features-grid',
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            autoAlpha: 0,
            scale: 0.8,
            stagger: 0.2,
            duration: 0.8,
            ease: 'back.out(1.7)'
        });
    }

    // Bots Showcase Section Animation
    const showcaseSection = document.querySelector('.showcase-section');
    if (showcaseSection) {
        const showcaseContainer = showcaseSection.querySelector('.showcase-container');
        const scrollDistance = showcaseContainer.scrollWidth - window.innerWidth;

        gsap.to(showcaseContainer, {
            x: -scrollDistance,
            ease: 'none', // Linear movement
            scrollTrigger: {
                trigger: showcaseSection,
                pin: '.showcase-pinner',
                scrub: 1,
                start: 'top top',
                end: () => `+=${scrollDistance}`,
                invalidateOnRefresh: true
            }
        });

        // Staggered card animation within the horizontal scroll
        gsap.from(showcaseSection.querySelectorAll('.showcase-card'), {
            autoAlpha: 0,
            scale: 0.9,
            y: 50,
            stagger: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: showcaseSection,
                start: 'top center',
                end: 'center center',
                toggleActions: 'play none none reverse'
            }
        });
    }

    // Testimonials Section Animation
    const testimonialsSection = document.querySelector('.testimonials-section');
    if (testimonialsSection) {
        gsap.from(testimonialsSection.querySelectorAll('.testimonial-card'), {
            scrollTrigger: {
                trigger: testimonialsSection,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            autoAlpha: 0,
            y: 60,
            filter: "blur(5px)",
            stagger: 0.3,
            duration: 1,
            ease: 'power3.out'
        });
    }

    // Pricing Section Animation
    const pricingSection = document.querySelector('.pricing-section');
    if (pricingSection) {
        gsap.from(pricingSection.querySelectorAll('.pricing-card'), {
            scrollTrigger: {
                trigger: pricingSection,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            autoAlpha: 0,
            y: 60,
            scale: 0.95,
            stagger: 0.2,
            duration: 1,
            ease: 'power3.out'
        });
    }

    // Contact Section Animation
    const contactSection = document.querySelector('.contact-section');
    if(contactSection) {
        gsap.from(contactSection.querySelector('.contact-container'), {
            scrollTrigger: {
                trigger: contactSection,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            autoAlpha: 0,
            x: -100,
            duration: 1.5,
            ease: 'power3.out'
        });
    }

    // Footer Animation
    const footer = document.querySelector('.footer');
    if(footer) {
        gsap.from(footer, {
            scrollTrigger: {
                trigger: footer,
                start: 'top 95%',
                toggleActions: 'play none none none'
            },
            autoAlpha: 0,
            y: 60,
            filter: "blur(10px)",
            duration: 1.5,
            ease: 'power3.out'
        });
    }
}

// In the onComplete of the preloader, we now call a function that does both
function initLocomotiveScroll() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main-container"),
        smooth: true,
        lerp: 0.05
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main-container", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: document.querySelector(".main-container").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}


// In the onComplete of the preloader, we now call a function that does both
function initUIEventListeners() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }
}

// In the onComplete of the preloader, we now call a function that does both
preloaderTimeline.eventCallback('onComplete', () => {
    preloader.style.display = 'none';
    gsap.to(mainContent, {
        autoAlpha: 1,
        duration: 1,
        ease: 'power2.out',
        onComplete: () => {
            initLocomotiveScroll(); // Initialize Locomotive Scroll
            animateHeroSection();
            initScrollTriggers(); // Initialize scroll-based animations
            initUIEventListeners(); // Initialize UI event listeners like hamburger menu
        }
    });
});
