/**
 * Hemanathan University - Core Web Application Logic
 * Founded & Owned by Hemanathan
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTicker();
  initModals();
  initLightbox();
});

// NAVIGATION & MOBILE MENU
function initNavigation() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        if (navMenu.classList.contains('open')) {
          icon.className = 'fas fa-times';
        } else {
          icon.className = 'fas fa-bars';
        }
      }
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  }

  // Active page highlight
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Sticky Navbar shadow on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });
}

// TOP ANNOUNCEMENT TICKER
function initTicker() {
  const tickerWrap = document.getElementById('announcementTicker');
  if (!tickerWrap || !window.HUData) return;

  const announcements = HUData.getAnnouncements();
  if (announcements.length > 0) {
    const top = announcements[0];
    tickerWrap.innerHTML = `
      <span><strong>${top.category}:</strong> ${top.title}</span>
      <a href="${top.link || 'admissions.html'}" style="margin-left: 0.5rem;">Read More &rarr;</a>
    `;
  }
}

// MEMBER PROFILE MODAL (FOR BOARD & FACULTY)
function initModals() {
  const modalOverlay = document.getElementById('memberModalOverlay');
  const closeBtn = document.getElementById('modalCloseBtn');
  const backBtn = document.getElementById('modalBackBtn');

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeMemberModal();
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeMemberModal);
  if (backBtn) backBtn.addEventListener('click', closeMemberModal);

  // Escape key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMemberModal();
      closeLightbox();
    }
  });
}

function openMemberModal(id, type = 'board') {
  const modalOverlay = document.getElementById('memberModalOverlay');
  if (!modalOverlay || !window.HUData) return;

  let member = null;
  if (type === 'board') {
    const board = HUData.getBoardMembers();
    member = board.find(m => m.id === id);
  } else {
    const faculty = HUData.getFaculty('all', '');
    member = faculty.find(f => f.id === id);
  }

  if (!member) return;

  // Fill in modal details
  const photo = document.getElementById('modalMemberPhoto');
  const name = document.getElementById('modalMemberName');
  const role = document.getElementById('modalMemberRole');
  const dept = document.getElementById('modalMemberDept');
  const qual = document.getElementById('modalMemberQual');
  const exp = document.getElementById('modalMemberExp');
  const spec = document.getElementById('modalMemberSpec');
  const email = document.getElementById('modalMemberEmail');
  const bio = document.getElementById('modalMemberBio');
  const research = document.getElementById('modalMemberResearch');
  const pubs = document.getElementById('modalMemberPubs');
  const ach = document.getElementById('modalMemberAch');
  const backLabel = document.getElementById('modalBackBtnText');

  if (photo) photo.src = member.photo || 'assets/images/university_crest.jpg';
  if (name) name.textContent = member.name;
  if (role) role.textContent = member.position || member.designation || 'Faculty Member';
  if (dept) dept.textContent = member.department;
  if (qual) qual.textContent = member.qualification || 'Doctoral Degree';
  if (exp) exp.textContent = member.experience || '10+ Years';
  if (spec) spec.textContent = member.specialization || member.researchInterests || 'Academic Leadership & Research';
  if (email) {
    email.textContent = member.email || 'info@hemanathan.edu.in';
    email.href = `mailto:${member.email || 'info@hemanathan.edu.in'}`;
  }
  if (bio) bio.textContent = member.fullBio || member.bio || 'Distinguished academic leader committed to student success.';
  if (research) research.textContent = member.researchInterests || 'Higher education pedagogy, computational models and strategic governance.';
  if (pubs) pubs.textContent = member.publications || 'Multiple publications in peer-reviewed academic journals and conference proceedings.';
  if (ach) ach.textContent = member.achievements || 'Conferred with university academic citations and national leadership honors.';

  if (backLabel) {
    backLabel.textContent = type === 'board' ? 'Back to Board Members' : 'Back to Faculty';
  }

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMemberModal() {
  const modalOverlay = document.getElementById('memberModalOverlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// LIGHTBOX
function initLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('lightboxCloseBtn');

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
}

function openLightbox(imgSrc, caption = 'Hemanathan University Campus Gallery') {
  const lightbox = document.getElementById('lightboxModal');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');

  if (!lightbox) return;

  if (img) img.src = imgSrc;
  if (cap) cap.textContent = caption;

  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  if (lightbox) {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

// BOARD MEMBERS RENDERER
function renderBoardMembers(containerId = 'boardGrid', options = {}) {
  const container = document.getElementById(containerId);
  if (!container || !window.HUData) return;

  let members = HUData.getBoardMembers();
  if (options.featuredOnly) {
    members = members.filter(m => m.featured);
  }
  if (options.limit && options.limit > 0) {
    members = members.slice(0, options.limit);
  }

  container.innerHTML = members.map(m => `
    <div class="member-card">
      <div class="member-card-header">
        <div class="member-photo-frame">
          <img src="${m.photo || 'assets/images/university_crest.jpg'}" alt="${m.name}" class="member-photo" onerror="this.src='assets/images/university_crest.jpg'">
        </div>
      </div>
      <div class="member-card-body">
        <h3 class="member-name">${m.name}</h3>
        <div class="member-role">${m.position}</div>
        <span class="member-dept-badge">${m.department}</span>
        <div class="member-qual"><i class="fas fa-graduation-cap" style="color: var(--gold-600); margin-right: 0.35rem;"></i>${m.qualification}</div>
        <p class="member-bio">${m.bio}</p>
        <div class="member-card-footer">
          <a href="mailto:${m.email}" class="member-email" title="${m.email}">
            <i class="fas fa-envelope"></i> ${m.email}
          </a>
          <button type="button" class="btn btn-sm btn-outline-gold" onclick="openMemberModal('${m.id}', 'board')">
            View Full Profile &rarr;
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// FACULTY MEMBERS RENDERER
function renderFacultyMembers(containerId = 'facultyGrid', options = {}) {
  const container = document.getElementById(containerId);
  if (!container || !window.HUData) return;

  const dept = options.dept || 'all';
  const query = options.query || '';
  let faculty = HUData.getFaculty(dept, query);

  if (options.featuredOnly) {
    faculty = faculty.filter(f => f.featured);
  }
  if (options.limit && options.limit > 0) {
    faculty = faculty.slice(0, options.limit);
  }

  if (faculty.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--white); border-radius: var(--radius-lg); border: 1px dashed var(--slate-300);">
        <i class="fas fa-user-slash" style="font-size: 3rem; color: var(--slate-400); margin-bottom: 1rem;"></i>
        <h3 style="color: var(--primary-900); margin-bottom: 0.5rem;">No Faculty Members Found</h3>
        <p style="color: var(--slate-500);">Try clearing the department filter or search keyword.</p>
        <button class="btn btn-primary btn-sm" onclick="resetFacultyFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = faculty.map(f => `
    <div class="member-card">
      <div class="member-card-header">
        <div class="member-photo-frame">
          <img src="${f.photo || 'assets/images/university_crest.jpg'}" alt="${f.name}" class="member-photo" onerror="this.src='assets/images/university_crest.jpg'">
        </div>
      </div>
      <div class="member-card-body">
        <h3 class="member-name">${f.name}</h3>
        <div class="member-role">${f.designation}</div>
        <span class="member-dept-badge">${f.department}</span>
        <div class="member-qual"><i class="fas fa-graduation-cap" style="color: var(--gold-600); margin-right: 0.35rem;"></i>${f.qualification}</div>
        <div class="member-specialization">
          <strong>Specialization:</strong> ${f.specialization}
        </div>
        <div style="font-size: 0.82rem; color: var(--slate-500); margin-bottom: 1rem;">
          <i class="fas fa-briefcase" style="color: var(--primary-600); margin-right: 0.35rem;"></i> Experience: <strong>${f.experience}</strong>
        </div>
        <p class="member-bio">${f.bio}</p>
        <div class="member-card-footer">
          <a href="mailto:${f.email}" class="member-email" title="${f.email}">
            <i class="fas fa-envelope"></i> ${f.email}
          </a>
          <button type="button" class="btn btn-sm btn-outline-gold" onclick="openMemberModal('${f.id}', 'faculty')">
            View Profile &rarr;
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// DEPARTMENTS RENDERER
function renderDepartments(containerId = 'departmentsGrid', limit = 0) {
  const container = document.getElementById(containerId);
  if (!container || !window.HUData) return;

  let depts = HUData.getDepartments();
  if (limit > 0) depts = depts.slice(0, limit);

  container.innerHTML = depts.map(d => `
    <div class="dept-card">
      <div class="dept-image-box">
        <img src="${d.image}" alt="${d.name}" class="dept-image" onerror="this.src='assets/images/campus_hero.jpg'">
        <span class="dept-badge"><i class="fas fa-users" style="margin-right: 0.35rem;"></i>${d.facultyCount} Faculty</span>
      </div>
      <div class="dept-content">
        <h3 class="dept-name">${d.name}</h3>
        <div class="dept-hod">
          <i class="fas fa-user-tie"></i> HOD: ${d.hod}
        </div>
        <p class="dept-desc">${d.description}</p>
        <div class="dept-programs-list">
          <div class="dept-programs-label">Programs Offered:</div>
          <div class="dept-programs-tags">
            ${d.programs.map(p => `<span class="program-mini-tag">${p}</span>`).join('')}
          </div>
        </div>
        <div class="dept-footer">
          <span class="dept-stat"><i class="fas fa-user-graduate" style="color: var(--gold-600); margin-right: 0.3rem;"></i>${d.studentCount}+ Students</span>
          <a href="faculty.html?dept=${encodeURIComponent(d.slug)}" class="btn btn-sm btn-outline-navy">
            View Faculty &rarr;
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

// ACADEMIC PROGRAMS RENDERER
function renderPrograms(containerId = 'programsGrid', level = 'all') {
  const container = document.getElementById(containerId);
  if (!container || !window.HUData) return;

  const programs = HUData.getPrograms(level);

  container.innerHTML = programs.map(p => `
    <div class="program-card">
      <span class="program-badge">${p.level}</span>
      <h3 class="program-title">${p.name}</h3>
      <div class="program-dept"><i class="fas fa-university" style="margin-right: 0.35rem;"></i>${p.department}</div>
      <div class="program-details-strip">
        <div class="program-detail-item">
          <strong>Duration</strong>
          ${p.duration}
        </div>
        <div class="program-detail-item">
          <strong>Tuition Fee</strong>
          ${p.tuition}
        </div>
      </div>
      <div style="font-size: 0.84rem; margin-bottom: 1rem; color: var(--slate-700); background: var(--slate-50); padding: 0.75rem; border-radius: var(--radius-sm); border-left: 3px solid var(--gold-500);">
        <strong>Eligibility:</strong> ${p.eligibility}
      </div>
      <p class="program-overview">${p.overview}</p>
      <div class="program-careers">
        <div class="careers-label">Career Opportunities:</div>
        <div class="careers-tags">
          ${p.careers.map(c => `<span class="career-tag">${c}</span>`).join('')}
        </div>
      </div>
      <div style="margin-top: auto; padding-top: 1.25rem; border-top: 1px solid var(--slate-100); display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 0.82rem; color: var(--slate-500);">Intake: <strong>${p.seats} Seats</strong></span>
        <a href="admissions.html?course=${encodeURIComponent(p.name)}" class="btn btn-sm btn-gold">
          Apply Now &rarr;
        </a>
      </div>
    </div>
  `).join('');
}

// EVENTS RENDERER
function renderEvents(containerId = 'eventsGrid', category = 'all', limit = 0) {
  const container = document.getElementById(containerId);
  if (!container || !window.HUData) return;

  let events = HUData.getEvents(category);
  if (limit > 0) events = events.slice(0, limit);

  container.innerHTML = events.map(e => {
    const d = new Date(e.date);
    const day = d.getDate() || '15';
    const month = d.toLocaleString('default', { month: 'short' }) || 'OCT';

    return `
      <div class="event-card">
        <div class="event-img-wrap">
          <img src="${e.image}" alt="${e.title}" class="event-img" onerror="this.src='assets/images/campus_auditorium.jpg'">
          <div class="event-date-badge">
            <div class="event-date-day">${day}</div>
            <div class="event-date-month">${month}</div>
          </div>
        </div>
        <div class="event-content">
          <span class="event-category-badge">${e.category}</span>
          <h3 class="event-title">${e.title}</h3>
          <div class="event-meta-info">
            <span><i class="fas fa-clock" style="color: var(--gold-600);"></i> ${e.time}</span>
            <span><i class="fas fa-map-marker-alt" style="color: var(--primary-600);"></i> ${e.venue}</span>
            <span><i class="fas fa-microphone" style="color: var(--slate-400);"></i> ${e.speaker}</span>
          </div>
          <p class="event-desc">${e.description}</p>
          <div style="margin-top: auto; border-top: 1px solid var(--slate-100); padding-top: 1rem; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--success);"><i class="fas fa-check-circle"></i> Registrations Open</span>
            <button class="btn btn-sm btn-outline-navy" onclick="showEventRegisterModal('${e.title}')">
              View Details &rarr;
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// GALLERY RENDERER
function renderGallery(containerId = 'galleryGrid', category = 'all') {
  const container = document.getElementById(containerId);
  if (!container || !window.HUData) return;

  const items = HUData.getGallery(category);

  container.innerHTML = items.map(g => `
    <div class="gallery-item" onclick="openLightbox('${g.image}', '${g.title}', '${g.caption}')">
      <img src="${g.image}" alt="${g.title}" class="gallery-thumb" onerror="this.src='assets/images/campus_hero.jpg'">
      <div class="gallery-overlay">
        <span class="gallery-tag">${g.category}</span>
        <h4 class="gallery-title">${g.title}</h4>
      </div>
    </div>
  `).join('');
}

// CAMPUS FACILITIES RENDERER
function renderFacilities(containerId = 'facilitiesGrid', limit = 0) {
  const container = document.getElementById(containerId);
  if (!container || !window.HUData) return;

  let facilities = HUData.getCampusFacilities();
  if (limit > 0) facilities = facilities.slice(0, limit);

  container.innerHTML = facilities.map(f => `
    <div class="facility-card">
      <div class="facility-img-box">
        <img src="${f.image}" alt="${f.title}" class="facility-img" onerror="this.src='assets/images/campus_hero.jpg'">
        <span class="facility-tag-pill">${f.tag}</span>
      </div>
      <div class="facility-body">
        <h3 class="facility-title"><i class="fas fa-${f.icon}" style="color: var(--gold-600); margin-right: 0.5rem;"></i>${f.title}</h3>
        <p class="facility-desc">${f.description}</p>
      </div>
    </div>
  `).join('');
}

// ADMISSIONS APPLICATION FORM SUBMISSION HANDLER
function handleApplicationSubmit(e) {
  e.preventDefault();
  const form = e.target;

  const name = form.studentName?.value.trim();
  const dob = form.dob?.value;
  const gender = form.gender?.value;
  const email = form.email?.value.trim();
  const phone = form.phone?.value.trim();
  const course = form.course?.value;
  const prevQual = form.prevQual?.value.trim();
  const percentage = form.percentage?.value.trim();
  const address = form.address?.value.trim();

  if (!name || !email || !phone || !course || !prevQual) {
    alert('Please fill out all mandatory fields before submitting your application.');
    return;
  }

  const appData = {
    name,
    dob,
    gender,
    email,
    phone,
    course,
    prevQual,
    percentage,
    address,
    status: 'Received • Under Review'
  };

  const saved = HUData.saveApplication(appData);

  // Show submission confirmation modal
  showSubmissionReceipt(saved);
  form.reset();
}

function showSubmissionReceipt(app) {
  const receiptHtml = `
    <div class="member-modal-overlay active" id="receiptModal" style="z-index: 3000;">
      <div class="member-modal-card" style="max-width: 600px; text-align: center; padding: 3rem 2rem;">
        <div style="width: 80px; height: 80px; border-radius: 50%; background: #d1fae5; color: #059669; font-size: 2.5rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem auto; border: 3px solid #10b981;">
          <i class="fas fa-check"></i>
        </div>
        <h2 style="font-family: var(--font-serif); color: var(--primary-900); font-size: 1.85rem; margin-bottom: 0.5rem;">Application Submitted Successfully!</h2>
        <p style="color: var(--slate-600); margin-bottom: 1.5rem;">Thank you for applying to <strong>Hemanathan University</strong>. Your application has been logged into the admissions registry.</p>
        
        <div style="background: var(--slate-50); border: 1.5px dashed var(--gold-500); border-radius: var(--radius-md); padding: 1.25rem; text-align: left; margin-bottom: 2rem;">
          <div style="margin-bottom: 0.5rem; font-size: 0.9rem;"><strong>Application Number:</strong> <span style="color: var(--primary-700); font-weight: 800;">${app.id}</span></div>
          <div style="margin-bottom: 0.5rem; font-size: 0.9rem;"><strong>Applicant Name:</strong> ${app.name}</div>
          <div style="margin-bottom: 0.5rem; font-size: 0.9rem;"><strong>Program Selected:</strong> ${app.course}</div>
          <div style="margin-bottom: 0.5rem; font-size: 0.9rem;"><strong>Submission Date:</strong> ${new Date(app.submittedAt).toLocaleDateString()}</div>
          <div style="font-size: 0.9rem;"><strong>Status:</strong> <span style="background: #e0f2fe; color: #0369a1; padding: 0.15rem 0.6rem; border-radius: 4px; font-weight: 700;">${app.status}</span></div>
        </div>

        <p style="font-size: 0.85rem; color: var(--slate-500); margin-bottom: 2rem;">An official confirmation has been queued for <strong>${app.email}</strong>. Our admissions counselor will contact you via phone within 2 business days.</p>

        <button class="btn btn-gold btn-lg" onclick="document.getElementById('receiptModal').remove(); document.body.style.overflow='auto';">
          Download Acknowledgment & Close
        </button>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', receiptHtml);
  document.body.style.overflow = 'hidden';
}

function showEventRegisterModal(title) {
  alert(`Thank you for your interest in "${title}". The registration link has been verified. You can also contact events@hemanathan.edu.in for group participant passes.`);
}

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: ${type === 'success' ? '#065f46' : '#991b1b'};
    color: #ffffff;
    padding: 1rem 1.75rem;
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    font-weight: 600;
    z-index: 9999;
    animation: fadeIn 0.3s ease;
    border-left: 4px solid #d4af37;
  `;
  toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}" style="margin-right: 0.5rem; color: #f59e0b;"></i> ${message}`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// Make functions globally available
window.renderBoardMembers = renderBoardMembers;
window.renderFacultyMembers = renderFacultyMembers;
window.renderDepartments = renderDepartments;
window.renderPrograms = renderPrograms;
window.renderEvents = renderEvents;
window.renderGallery = renderGallery;
window.renderFacilities = renderFacilities;
window.openMemberModal = openMemberModal;
window.closeMemberModal = closeMemberModal;
window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;
window.handleApplicationSubmit = handleApplicationSubmit;
window.showToast = showToast;
