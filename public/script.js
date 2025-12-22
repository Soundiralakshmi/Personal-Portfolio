// DOM Elements
const preloader = document.querySelector('.preloader');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Preloader
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('fade-out');
    }, 500);
});

// Mobile Menu Toggle
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').substring(1) === current) {
            item.classList.add('active');
        }
    });
});

// Contact form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = contactForm.querySelector('input[type="text"]').value;
    const email = contactForm.querySelector('input[type="email"]').value;
    const message = contactForm.querySelector('textarea').value;
    
    // Simple validation
    if (name === '' || email === '' || message === '') {
        showFormMessage('Please fill in all fields', 'error');
        return;
    }
    
    // In a real application, you would send this data to a server
    // For this demo, we'll just show a success message
    showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 100) {
        header.style.padding = '10px 0';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.padding = '15px 0';
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    }
});

// Fetch portfolio data from API
async function fetchPortfolioData() {
    try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        
        // Update DOM with fetched data
        updatePortfolioData(data);
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
    }
}

// Update portfolio data in the DOM
function updatePortfolioData(data) {
    // Personal Info
    document.getElementById('heroName').textContent = data.personalInfo.name;
    document.getElementById('heroTitle').textContent = data.personalInfo.title;
    document.getElementById('heroSummary').textContent = data.personalInfo.summary;
    document.getElementById('profileImage').src = data.personalInfo.profileImage;
    document.getElementById('linkedinLink').href = `https://${data.personalInfo.linkedin}`;
    document.getElementById('aboutSummary').textContent = data.personalInfo.summary;
    document.getElementById('aboutDetails').textContent = data.personalInfo.details;
    document.getElementById('contactLocation').textContent = data.personalInfo.location;
    document.getElementById('contactLocation2').textContent = data.personalInfo.location;
    document.getElementById('contactPhone').textContent = data.personalInfo.phone;
    document.getElementById('contactPhone2').textContent = data.personalInfo.phone;
    document.getElementById('contactEmail').textContent = data.personalInfo.email;
    document.getElementById('contactEmail2').textContent = data.personalInfo.email;
    document.getElementById('contactLinkedin').textContent = data.personalInfo.linkedin;
    document.getElementById('footerLinkedin').href = `https://${data.personalInfo.linkedin}`;
    
    // Languages
    const languageTags = document.getElementById('languageTags');
    languageTags.innerHTML = '';
    data.languages.forEach(language => {
        const span = document.createElement('span');
        span.textContent = language;
        languageTags.appendChild(span);
    });
    
    // Education
    const educationTimeline = document.getElementById('educationTimeline');
    educationTimeline.innerHTML = '';
    data.education.forEach(edu => {
        const div = document.createElement('div');
        div.className = 'timeline-item';
        div.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h3>${edu.degree}</h3>
                <h4>${edu.institution}</h4>
                <p>${edu.location}</p>
                <div class="timeline-date">${edu.period}</div>
                <div class="timeline-result">${edu.result}</div>
            </div>
        `;
        educationTimeline.appendChild(div);
    });
    
    // Technical Skills
    const technicalSkills = document.getElementById('technicalSkills');
    technicalSkills.innerHTML = '';
    data.skills.technical.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'skill-item';
        div.innerHTML = `<i class="fas fa-code"></i><span>${skill}</span>`;
        technicalSkills.appendChild(div);
    });
    
    // Soft Skills
    const softSkills = document.getElementById('softSkills');
    softSkills.innerHTML = '';
    data.skills.soft.forEach(skill => {
        const div = document.createElement('div');
        div.className = 'skill-list-item';
        div.innerHTML = `<i class="fas fa-check-circle"></i><span>${skill}</span>`;
        softSkills.appendChild(div);
    });
    
    // Projects
    const projectsGrid = document.getElementById('projectsGrid');
    projectsGrid.innerHTML = '';
    data.projects.forEach(project => {
        const div = document.createElement('div');
        div.className = 'project-card';
        div.innerHTML = `
            <div class="project-image">
                <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="${project.title}">
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
            </div>
        `;
        projectsGrid.appendChild(div);
    });
    
    // Certifications
    const certificationsList = document.getElementById('certificationsList');
    certificationsList.innerHTML = '';
    data.certifications.forEach(cert => {
        const div = document.createElement('div');
        div.className = 'cert-item';
        div.innerHTML = `
            <h4>${cert.name}</h4>
            <p>${cert.issuer}</p>
        `;
        certificationsList.appendChild(div);
    });
    
    // Workshops
    const workshopsList = document.getElementById('workshopsList');
    workshopsList.innerHTML = '';
    data.workshops.forEach(workshop => {
        const div = document.createElement('div');
        div.className = 'cert-item';
        div.innerHTML = `
            <h4>${workshop.name}</h4>
            <p>${workshop.issuer}</p>
        `;
        workshopsList.appendChild(div);
    });
    
    // Extracurricular
    const extracurricularList = document.getElementById('extracurricularList');
    extracurricularList.innerHTML = '';
    data.extracurricular.forEach(activity => {
        const div = document.createElement('div');
        div.className = 'cert-item';
        div.innerHTML = `<h4>${activity}</h4>`;
        extracurricularList.appendChild(div);
    });
}

// Initialize portfolio data on page load
document.addEventListener('DOMContentLoaded', fetchPortfolioData);