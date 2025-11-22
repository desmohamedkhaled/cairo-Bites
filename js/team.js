// Team members data
const teamMembers = [
    {
        name: "Mohamed Khaled",
        role: "192300448",
        image: "images/Mohamed.jpg",
        social: {
            facebook: "#",
            instagram: "#",
            twitter: "#"
        }
    },
    {
        name: "Ahmed Saad",
        role: "192300003",
        image: "images/team-member-2.jpg",
        social: {
            facebook: "#",
            instagram: "#",
            twitter: "#"
        }
    },
    {
        name: "Eyad Ahmed",
        role: "192300006",
        image: "images/team-member-3.jpg",
        social: {
            facebook: "#",
            instagram: "#",
            linkedin: "#"
        }
    },
    {
        name: "Waleed khalaf",
        role: "192200272",
        image: "images/team-member-4.jpg",
        social: {
            facebook: "#",
            instagram: "#",
            twitter: "#"
        }
    },
    {
        name: "Shahd Ismail",
        role: "1923000203",
        image: "images/team-member-5.jpg",
        social: {
            facebook: "#",
            instagram: "#",
            linkedin: "#"
        }
    }
];

// Render team members
function renderTeam() {
    const teamGrid = document.querySelector('#teamGrid');
    if (!teamGrid) return;
    
    teamGrid.innerHTML = '';
    
    teamMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team-card';
        
        card.innerHTML = `
            <div class="team-card-content">
                <div class="team-card-image-wrapper">
                    <img src="${member.image}" alt="${member.name}" class="team-card-image" onerror="this.src='https://via.placeholder.com/200?text=${encodeURIComponent(member.name)}'">
                </div>
                <h3>${member.name}</h3>
                <span class="team-card-role-badge">${member.role}</span>
            </div>
        `;
        
        teamGrid.appendChild(card);
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
        
        const navLinks = navMenu.querySelectorAll('.nav-btn');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    renderTeam();
    order.updateCartBadge();
    initMobileMenu();
    initNavbarScroll();
    
    // Newsletter enter key
    const newsletterInput = document.querySelector('#newsletterInput');
    if (newsletterInput) {
        newsletterInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                subscribeNewsletter();
            }
        });
    }
});

