// DOM Elements
const sidebarLinks = document.querySelectorAll('.sidebar-menu a[data-section]');
const sections = document.querySelectorAll('.admin-section');
const menuToggle = document.getElementById('menuToggle');
const saveAllBtn = document.getElementById('saveAllBtn');
const previewBtn = document.getElementById('previewBtn');
const logoutBtn = document.getElementById('logoutBtn');
const saveSectionBtns = document.querySelectorAll('.save-section-btn');
const modal = document.getElementById('itemModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalSaveBtn = document.getElementById('modalSaveBtn');
const modalCancelBtn = document.getElementById('modalCancelBtn');
const closeModal = document.querySelector('.close-modal');

// Buttons for adding items
const addEducationBtn = document.getElementById('addEducationBtn');
const addProjectBtn = document.getElementById('addProjectBtn');
const addCertificationBtn = document.getElementById('addCertificationBtn');
const addWorkshopBtn = document.getElementById('addWorkshopBtn');
const addExtracurricularBtn = document.getElementById('addExtracurricularBtn');
const addTechnicalSkillBtn = document.getElementById('addTechnicalSkillBtn');
const addSoftSkillBtn = document.getElementById('addSoftSkillBtn');
const addLanguageBtn = document.getElementById('addLanguageBtn');
const addHobbyBtn = document.getElementById('addHobbyBtn');

// Input fields for adding skills, languages, and hobbies
const newTechnicalSkillInput = document.getElementById('newTechnicalSkill');
const newSoftSkillInput = document.getElementById('newSoftSkill');
const newLanguageInput = document.getElementById('newLanguage');
const newHobbyInput = document.getElementById('newHobby');

// Portfolio data
let portfolioData = {
    personalInfo: {
        name: "G. Soundiralakshmi",
        title: "Information Technology Student",
        summary: "As a passionate learner in the field of IT, I'm always curious to explore new technologies and improve my skills. I enjoy working on creative interfaces and real-time applications. I look forward to opportunities where I can apply my knowledge, grow professionally, and make a valuable impact in a team or organization.",
        details: "Currently pursuing my B-Tech in Information Technology at Dr. MGR Educational and Research Institute, I have developed a strong foundation in programming, web development, and data science.",
        profileImage: "https://z-cdn-media.chatglm.cn/files/f3188da8-9be4-42c0-81c6-d8bbc0a8148e_G.Soundiralakshmi.jpg?auth_key=1789497993-a3cbf374b08c4589bdd8dce9616e44c1-0-100c392e8206f91b4b8c14fde1edaf7a",
        email: "slsoundira21@gmai.com",
        phone: "+91-7904322845",
        location: "Thiruvallur",
        linkedin: "linkedin.com/in/soundiralakshmi"
    },
    education: [
        {
            degree: "B-Tech (Information Technology)",
            institution: "Dr. MGR EDUCATIONAL AND RESEARCH INSTITUTE",
            location: "Maduravoyal, Chennai",
            period: "2022 - 2026",
            result: "CGPA - 7.52%"
        },
        {
            degree: "Intermediate (12th Grade)",
            institution: "Christ King Matriculation Higher Secondary School",
            location: "Thiruvallur",
            period: "2021 - 2022",
            result: "Percentage: 64.67%"
        },
        {
            degree: "Secondary School (10th Grade)",
            institution: "Christ King Matriculation Higher Secondary School",
            location: "Thiruvallur",
            period: "2019 - 2020",
            result: "Percentage: 70.4%"
        }
    ],
    skills: {
        technical: ["Python", "UI using Figma", "Java", "C, C++", "HTML, CSS", "Flutter using Dart Language", "Data Science using R"],
        soft: ["Public Relations", "Teamwork", "Time Management", "Leadership", "Effective Communication", "Creative Thinking"]
    },
    languages: ["Tamil", "English"],
    projects: [
        {
            title: "Expenses Tracker using Flutter",
            description: "Mini project",
            technologies: ["Flutter", "Dart"]
        },
        {
            title: "Harbour Management System Using Python",
            description: "Mini project",
            technologies: ["Python"]
        }
    ],
    certifications: [
        {
            name: "Google Cloud Computing Foundations",
            issuer: "NPTEL"
        },
        {
            name: "Introduction to Modern AI",
            issuer: "Cisco"
        },
        {
            name: "AWS - Data Science",
            issuer: "Conducted for 60 hours"
        },
        {
            name: "Android App Development",
            issuer: "Corizo"
        },
        {
            name: "Typewriting English",
            issuer: "Junior & Senior"
        },
        {
            name: "AWS- Technical Skill",
            issuer: "Data Science using R - Enlight Wisdom"
        }
    ],
    workshops: [
        {
            name: "A Day with MERN, Figma, Augmented Reality & Virtual Reality",
            issuer: "SIMATS Engineering"
        },
        {
            name: "A 5-day PDP on 360° Development through Motivation, Research & Innovation",
            issuer: "SRM University"
        }
    ],
    extracurricular: [
        "SDG Goal Club Member",
        "Grow Green Club Member"
    ],
    hobbies: ["Listening music"]
};

// Current item being edited
let currentEditItem = null;
let currentEditSection = null;
let currentEditIndex = null;

// Initialize the admin panel
function initAdmin() {
    // Fetch portfolio data from the server
    fetchPortfolioData();
    
    // Setup event listeners
    setupEventListeners();
    
    // Render initial data
    renderDashboard();
    renderPersonalInfo();
    renderEducation();
    renderSkills();
    renderProjects();
    renderCertifications();
    renderWorkshops();
    renderExtracurricular();
    renderLanguages();
    renderHobbies();
}

// Fetch portfolio data from the server
async function fetchPortfolioData() {
    try {
        const response = await fetch('/api/portfolio');
        const data = await response.json();
        portfolioData = data;
    } catch (error) {
        console.error('Error fetching portfolio data:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Sidebar navigation
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            showSection(sectionId);
            
            // Update active link
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });
    
    // Save all changes
    saveAllBtn.addEventListener('click', saveAllChanges);
    
    // Preview portfolio
    previewBtn.addEventListener('click', () => {
        window.open('/', '_blank');
    });
    
    // Logout
    logoutBtn.addEventListener('click', logout);
    
    // Save section buttons
    saveSectionBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = btn.getAttribute('data-section');
            saveSection(section);
        });
    });
    
    // Add item buttons
    addEducationBtn.addEventListener('click', () => openModal('education'));
    addProjectBtn.addEventListener('click', () => openModal('projects'));
    addCertificationBtn.addEventListener('click', () => openModal('certifications'));
    addWorkshopBtn.addEventListener('click', () => openModal('workshops'));
    addExtracurricularBtn.addEventListener('click', () => openModal('extracurricular'));
    
    // Add skill buttons
    addTechnicalSkillBtn.addEventListener('click', addTechnicalSkill);
    addSoftSkillBtn.addEventListener('click', addSoftSkill);
    addLanguageBtn.addEventListener('click', addLanguage);
    addHobbyBtn.addEventListener('click', addHobby);
    
    // Modal buttons
    modalSaveBtn.addEventListener('click', saveModalItem);
    modalCancelBtn.addEventListener('click', closeModalWindow);
    closeModal.addEventListener('click', closeModalWindow);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalWindow();
        }
    });
}

// Show a specific section
function showSection(sectionId) {
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Render dashboard
function renderDashboard() {
    // Update counts
    document.getElementById('educationCount').textContent = `${portfolioData.education.length} items`;
    document.getElementById('projectsCount').textContent = `${portfolioData.projects.length} items`;
    document.getElementById('certificationsCount').textContent = `${portfolioData.certifications.length} items`;
    
    // Update activity log
    const activityList = document.getElementById('activityList');
    activityList.innerHTML = '';
    
    // Add sample activities
    const activities = [
        { icon: 'fa-edit', text: 'Updated personal information', time: 'Just now' },
        { icon: 'fa-plus', text: 'Added new project', time: '10 minutes ago' },
        { icon: 'fa-certificate', text: 'Added new certification', time: '1 hour ago' }
    ];
    
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <i class="fas ${activity.icon}"></i>
            <div class="activity-content">
                <p>${activity.text}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;
        activityList.appendChild(activityItem);
    });
}

// Render personal info
function renderPersonalInfo() {
    document.getElementById('name').value = portfolioData.personalInfo.name;
    document.getElementById('title').value = portfolioData.personalInfo.title;
    document.getElementById('summary').value = portfolioData.personalInfo.summary;
    document.getElementById('details').value = portfolioData.personalInfo.details;
    document.getElementById('profileImage').value = portfolioData.personalInfo.profileImage;
    document.getElementById('email').value = portfolioData.personalInfo.email;
    document.getElementById('phone').value = portfolioData.personalInfo.phone;
    document.getElementById('location').value = portfolioData.personalInfo.location;
    document.getElementById('linkedin').value = portfolioData.personalInfo.linkedin;
}

// Render education
function renderEducation() {
    const educationList = document.getElementById('educationList');
    educationList.innerHTML = '';
    
    portfolioData.education.forEach((edu, index) => {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        listItem.innerHTML = `
            <div class="list-item-content">
                <h4>${edu.degree}</h4>
                <p>${edu.institution}, ${edu.location}</p>
            </div>
            <div class="list-item-actions">
                <button class="edit-btn" data-section="education" data-index="${index}">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" data-section="education" data-index="${index}">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        educationList.appendChild(listItem);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('#educationList .edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            openModal('education', index);
        });
    });
    
    document.querySelectorAll('#educationList .delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            deleteItem('education', index);
        });
    });
}

// Render skills
function renderSkills() {
    // Technical skills
    const technicalSkillsEditor = document.getElementById('technicalSkillsEditor');
    technicalSkillsEditor.innerHTML = '';
    
    portfolioData.skills.technical.forEach((skill, index) => {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.innerHTML = `
            <span>${skill}</span>
            <i class="fas fa-times" data-section="technical" data-index="${index}"></i>
        `;
        technicalSkillsEditor.appendChild(skillTag);
    });
    
    // Soft skills
    const softSkillsEditor = document.getElementById('softSkillsEditor');
    softSkillsEditor.innerHTML = '';
    
    portfolioData.skills.soft.forEach((skill, index) => {
        const skillTag = document.createElement('div');
        skillTag.className = 'skill-tag';
        skillTag.innerHTML = `
            <span>${skill}</span>
            <i class="fas fa-times" data-section="soft" data-index="${index}"></i>
        `;
        softSkillsEditor.appendChild(skillTag);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('#technicalSkillsEditor i').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            portfolioData.skills.technical.splice(index, 1);
            renderSkills();
        });
    });
    
    document.querySelectorAll('#softSkillsEditor i').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            portfolioData.skills.soft.splice(index, 1);
            renderSkills();
        });
    });
}

// Render projects
function renderProjects() {
    const projectsList = document.getElementById('projectsList');
    projectsList.innerHTML = '';
    
    portfolioData.projects.forEach((project, index) => {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        listItem.innerHTML = `
            <div class="list-item-content">
                <h4>${project.title}</h4>
                <p>${project.description}</p>
            </div>
            <div class="list-item-actions">
                <button class="edit-btn" data-section="projects" data-index="${index}">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" data-section="projects" data-index="${index}">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        projectsList.appendChild(listItem);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('#projectsList .edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            openModal('projects', index);
        });
    });
    
    document.querySelectorAll('#projectsList .delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            deleteItem('projects', index);
        });
    });
}

// Render certifications
function renderCertifications() {
    const certificationsList = document.getElementById('certificationsList');
    certificationsList.innerHTML = '';
    
    portfolioData.certifications.forEach((cert, index) => {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        listItem.innerHTML = `
            <div class="list-item-content">
                <h4>${cert.name}</h4>
                <p>${cert.issuer}</p>
            </div>
            <div class="list-item-actions">
                <button class="edit-btn" data-section="certifications" data-index="${index}">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" data-section="certifications" data-index="${index}">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        certificationsList.appendChild(listItem);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('#certificationsList .edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            openModal('certifications', index);
        });
    });
    
    document.querySelectorAll('#certificationsList .delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            deleteItem('certifications', index);
        });
    });
}

// Render workshops
function renderWorkshops() {
    const workshopsList = document.getElementById('workshopsList');
    workshopsList.innerHTML = '';
    
    portfolioData.workshops.forEach((workshop, index) => {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        listItem.innerHTML = `
            <div class="list-item-content">
                <h4>${workshop.name}</h4>
                <p>${workshop.issuer}</p>
            </div>
            <div class="list-item-actions">
                <button class="edit-btn" data-section="workshops" data-index="${index}">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" data-section="workshops" data-index="${index}">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        workshopsList.appendChild(listItem);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('#workshopsList .edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            openModal('workshops', index);
        });
    });
    
    document.querySelectorAll('#workshopsList .delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            deleteItem('workshops', index);
        });
    });
}

// Render extracurricular
function renderExtracurricular() {
    const extracurricularList = document.getElementById('extracurricularList');
    extracurricularList.innerHTML = '';
    
    portfolioData.extracurricular.forEach((activity, index) => {
        const listItem = document.createElement('div');
        listItem.className = 'list-item';
        listItem.innerHTML = `
            <div class="list-item-content">
                <h4>${activity}</h4>
            </div>
            <div class="list-item-actions">
                <button class="edit-btn" data-section="extracurricular" data-index="${index}">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="delete-btn" data-section="extracurricular" data-index="${index}">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;
        extracurricularList.appendChild(listItem);
    });
    
    // Add event listeners to edit and delete buttons
    document.querySelectorAll('#extracurricularList .edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            openModal('extracurricular', index);
        });
    });
    
    document.querySelectorAll('#extracurricularList .delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.getAttribute('data-index'));
            deleteItem('extracurricular', index);
        });
    });
}

// Render languages
function renderLanguages() {
    const languagesEditor = document.getElementById('languagesEditor');
    languagesEditor.innerHTML = '';
    
    portfolioData.languages.forEach((language, index) => {
        const languageTag = document.createElement('div');
        languageTag.className = 'language-tag';
        languageTag.innerHTML = `
            <span>${language}</span>
            <i class="fas fa-times" data-index="${index}"></i>
        `;
        languagesEditor.appendChild(languageTag);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('#languagesEditor i').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            portfolioData.languages.splice(index, 1);
            renderLanguages();
        });
    });
}

// Render hobbies
function renderHobbies() {
    const hobbiesEditor = document.getElementById('hobbiesEditor');
    hobbiesEditor.innerHTML = '';
    
    portfolioData.hobbies.forEach((hobby, index) => {
        const hobbyTag = document.createElement('div');
        hobbyTag.className = 'hobby-tag';
        hobbyTag.innerHTML = `
            <span>${hobby}</span>
            <i class="fas fa-times" data-index="${index}"></i>
        `;
        hobbiesEditor.appendChild(hobbyTag);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('#hobbiesEditor i').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            portfolioData.hobbies.splice(index, 1);
            renderHobbies();
        });
    });
}

// Add technical skill
function addTechnicalSkill() {
    const skill = newTechnicalSkillInput.value.trim();
    if (skill) {
        portfolioData.skills.technical.push(skill);
        newTechnicalSkillInput.value = '';
        renderSkills();
    }
}

// Add soft skill
function addSoftSkill() {
    const skill = newSoftSkillInput.value.trim();
    if (skill) {
        portfolioData.skills.soft.push(skill);
        newSoftSkillInput.value = '';
        renderSkills();
    }
}

// Add language
function addLanguage() {
    const language = newLanguageInput.value.trim();
    if (language) {
        portfolioData.languages.push(language);
        newLanguageInput.value = '';
        renderLanguages();
    }
}

// Add hobby
function addHobby() {
    const hobby = newHobbyInput.value.trim();
    if (hobby) {
        portfolioData.hobbies.push(hobby);
        newHobbyInput.value = '';
        renderHobbies();
    }
}

// Open modal for adding/editing items
function openModal(section, index = null) {
    currentEditSection = section;
    currentEditIndex = index;
    
    // Set modal title
    if (index !== null) {
        modalTitle.textContent = `Edit ${section.charAt(0).toUpperCase() + section.slice(1)}`;
        currentEditItem = portfolioData[section][index];
    } else {
        modalTitle.textContent = `Add ${section.charAt(0).toUpperCase() + section.slice(1)}`;
        currentEditItem = null;
    }
    
    // Generate modal body based on section
    let modalBodyHTML = '';
    
    switch (section) {
        case 'education':
            modalBodyHTML = `
                <div class="form-group">
                    <label for="eduDegree">Degree</label>
                    <input type="text" id="eduDegree" class="form-control" value="${currentEditItem ? currentEditItem.degree : ''}">
                </div>
                <div class="form-group">
                    <label for="eduInstitution">Institution</label>
                    <input type="text" id="eduInstitution" class="form-control" value="${currentEditItem ? currentEditItem.institution : ''}">
                </div>
                <div class="form-group">
                    <label for="eduLocation">Location</label>
                    <input type="text" id="eduLocation" class="form-control" value="${currentEditItem ? currentEditItem.location : ''}">
                </div>
                <div class="form-group">
                    <label for="eduPeriod">Period</label>
                    <input type="text" id="eduPeriod" class="form-control" value="${currentEditItem ? currentEditItem.period : ''}">
                </div>
                <div class="form-group">
                    <label for="eduResult">Result</label>
                    <input type="text" id="eduResult" class="form-control" value="${currentEditItem ? currentEditItem.result : ''}">
                </div>
            `;
            break;
            
        case 'projects':
            modalBodyHTML = `
                <div class="form-group">
                    <label for="projectTitle">Title</label>
                    <input type="text" id="projectTitle" class="form-control" value="${currentEditItem ? currentEditItem.title : ''}">
                </div>
                <div class="form-group">
                    <label for="projectDescription">Description</label>
                    <textarea id="projectDescription" class="form-control" rows="3">${currentEditItem ? currentEditItem.description : ''}</textarea>
                </div>
                <div class="form-group">
                    <label for="projectTechnologies">Technologies (comma separated)</label>
                    <input type="text" id="projectTechnologies" class="form-control" value="${currentEditItem ? currentEditItem.technologies.join(', ') : ''}">
                </div>
            `;
            break;
            
        case 'certifications':
        case 'workshops':
            modalBodyHTML = `
                <div class="form-group">
                    <label for="certName">Name</label>
                    <input type="text" id="certName" class="form-control" value="${currentEditItem ? currentEditItem.name : ''}">
                </div>
                <div class="form-group">
                    <label for="certIssuer">Issuer</label>
                    <input type="text" id="certIssuer" class="form-control" value="${currentEditItem ? currentEditItem.issuer : ''}">
                </div>
            `;
            break;
            
        case 'extracurricular':
            modalBodyHTML = `
                <div class="form-group">
                    <label for="activityName">Activity</label>
                    <input type="text" id="activityName" class="form-control" value="${currentEditItem ? currentEditItem : ''}">
                </div>
            `;
            break;
    }
    
    modalBody.innerHTML = modalBodyHTML;
    modal.style.display = 'block';
}

// Close modal window
function closeModalWindow() {
    modal.style.display = 'none';
    currentEditItem = null;
    currentEditSection = null;
    currentEditIndex = null;
}

// Save modal item
function saveModalItem() {
    if (!currentEditSection) return;
    
    let newItem = {};
    
    switch (currentEditSection) {
        case 'education':
            newItem = {
                degree: document.getElementById('eduDegree').value,
                institution: document.getElementById('eduInstitution').value,
                location: document.getElementById('eduLocation').value,
                period: document.getElementById('eduPeriod').value,
                result: document.getElementById('eduResult').value
            };
            break;
            
        case 'projects':
            newItem = {
                title: document.getElementById('projectTitle').value,
                description: document.getElementById('projectDescription').value,
                technologies: document.getElementById('projectTechnologies').value.split(',').map(tech => tech.trim())
            };
            break;
            
        case 'certifications':
        case 'workshops':
            newItem = {
                name: document.getElementById('certName').value,
                issuer: document.getElementById('certIssuer').value
            };
            break;
            
        case 'extracurricular':
            newItem = document.getElementById('activityName').value;
            break;
    }
    
    // Add or update item
    if (currentEditIndex !== null) {
        portfolioData[currentEditSection][currentEditIndex] = newItem;
    } else {
        portfolioData[currentEditSection].push(newItem);
    }
    
    // Close modal and re-render section
    closeModalWindow();
    
    switch (currentEditSection) {
        case 'education':
            renderEducation();
            break;
        case 'projects':
            renderProjects();
            break;
        case 'certifications':
            renderCertifications();
            break;
        case 'workshops':
            renderWorkshops();
            break;
        case 'extracurricular':
            renderExtracurricular();
            break;
    }
    
    // Update dashboard
    renderDashboard();
}

// Delete item
function deleteItem(section, index) {
    if (confirm('Are you sure you want to delete this item?')) {
        portfolioData[section].splice(index, 1);
        
        // Re-render section
        switch (section) {
            case 'education':
                renderEducation();
                break;
            case 'projects':
                renderProjects();
                break;
            case 'certifications':
                renderCertifications();
                break;
            case 'workshops':
                renderWorkshops();
                break;
            case 'extracurricular':
                renderExtracurricular();
                break;
        }
        
        // Update dashboard
        renderDashboard();
    }
}

// Save section
function saveSection(section) {
    // Get form data based on section
    switch (section) {
        case 'personal':
            portfolioData.personalInfo = {
                name: document.getElementById('name').value,
                title: document.getElementById('title').value,
                summary: document.getElementById('summary').value,
                details: document.getElementById('details').value,
                profileImage: document.getElementById('profileImage').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                location: document.getElementById('location').value,
                linkedin: document.getElementById('linkedin').value
            };
            break;
            
        case 'skills':
            // Skills are already updated in the data structure
            break;
            
        case 'languages':
            // Languages are already updated in the data structure
            break;
            
        case 'hobbies':
            // Hobbies are already updated in the data structure
            break;
    }
    
    // Save to server
    saveToServer(section);
}

// Save all changes
function saveAllChanges() {
    // Save all sections
    saveSection('personal');
    saveSection('skills');
    saveSection('languages');
    saveSection('hobbies');
    
    // Save all list items (education, projects, etc.)
    saveToServer('all');
    
    // Show success message
    showNotification('All changes saved successfully!', 'success');
}

// Save data to server
async function saveToServer(section) {
    try {
        const response = await fetch('/api/portfolio', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                section: section,
                data: portfolioData
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to save data');
        }
        
        const result = await response.json();
        console.log('Data saved successfully:', result);
        
        // Show success message for individual section saves
        if (section !== 'all') {
            showNotification(`${section.charAt(0).toUpperCase() + section.slice(1)} saved successfully!`, 'success');
        }
    } catch (error) {
        console.error('Error saving data:', error);
        showNotification('Error saving data. Please try again.', 'error');
    }
}

// Show notification
function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow);
            z-index: 3000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            animation: slideIn 0.3s ease, slideOut 0.3s ease 2.7s forwards;
        }
        
        .notification.success {
            background-color: #d4edda;
            color: #155724;
            border-left: 4px solid #28a745;
        }
        
        .notification.error {
            background-color: #f8d7da;
            color: #721c24;
            border-left: 4px solid #dc3545;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            font-size: 1rem;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add notification to DOM
    document.body.appendChild(notification);
    
    // Remove notification after animation
    setTimeout(() => {
        notification.remove();
        style.remove();
    }, 3000);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
        style.remove();
    });
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // In a real application, you would clear the session/token
        window.location.href = '/admin/login.html';
    }
}

// Initialize the admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', initAdmin);