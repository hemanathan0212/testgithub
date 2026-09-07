/**
 * Hemanathan University - Admin Panel Management Logic
 * Administrator: Hemanathan (Founder, Owner & Admin)
 */

document.addEventListener('DOMContentLoaded', () => {
  initAdminDashboard();
});

let currentEditingType = null;
let currentEditingId = null;

function initAdminDashboard() {
  refreshAdminStats();
  initAdminTabs();
  renderAdminBoardTable();
  renderAdminFacultyTable();
  renderAdminEventsTable();
  renderAdminAnnouncementsTable();
  renderAdminApplicationsTable();
}

// REFRESH STAT COUNTERS
function refreshAdminStats() {
  if (!window.HUData) return;

  const board = HUData.getBoardMembers();
  const faculty = HUData.getFaculty('all', '');
  const depts = HUData.getDepartments();
  const events = HUData.getEvents('all');
  const apps = HUData.getApplications();

  const statBoard = document.getElementById('statTotalBoard');
  const statFaculty = document.getElementById('statTotalFaculty');
  const statDepts = document.getElementById('statTotalDepts');
  const statStudents = document.getElementById('statTotalStudents');
  const statEvents = document.getElementById('statTotalEvents');
  const statApps = document.getElementById('statTotalApps');

  if (statBoard) statBoard.textContent = board.length;
  if (statFaculty) statFaculty.textContent = faculty.length;
  if (statDepts) statDepts.textContent = depts.length;
  if (statStudents) statStudents.textContent = "16,500+";
  if (statEvents) statEvents.textContent = events.length;
  if (statApps) statApps.textContent = apps.length;
}

// TAB SWITCHING
function initAdminTabs() {
  const tabBtns = document.querySelectorAll('.admin-nav-btn[data-tab]');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');
      document.querySelectorAll('.admin-tab-pane').forEach(pane => {
        pane.style.display = 'none';
      });

      const activePane = document.getElementById(targetTab);
      if (activePane) activePane.style.display = 'block';
    });
  });
}

// -------------------------------------------------------------
// 1. BOARD MEMBERS MANAGEMENT
// -------------------------------------------------------------
function renderAdminBoardTable(search = '') {
  const tbody = document.getElementById('adminBoardTableBody');
  if (!tbody || !window.HUData) return;

  let members = HUData.getBoardMembers();
  if (search.trim()) {
    const q = search.toLowerCase();
    members = members.filter(m => m.name.toLowerCase().includes(q) || m.position.toLowerCase().includes(q) || m.department.toLowerCase().includes(q));
  }

  tbody.innerHTML = members.map(m => `
    <tr>
      <td>
        <div class="table-avatar-cell">
          <img src="${m.photo || 'assets/images/university_crest.jpg'}" alt="${m.name}" class="table-avatar" onerror="this.src='assets/images/university_crest.jpg'">
          <div>
            <strong>${m.name}</strong>
            <div style="font-size: 0.78rem; color: var(--slate-500);">${m.qualification || ''}</div>
          </div>
        </div>
      </td>
      <td><span style="font-weight: 700; color: var(--primary-800);">${m.position}</span></td>
      <td>${m.department}</td>
      <td><a href="mailto:${m.email}" style="color: var(--primary-600); font-size: 0.85rem;">${m.email}</a></td>
      <td>
        <div class="table-actions">
          <button class="btn-icon-action btn-view" title="View Profile" onclick="window.openMemberModal('${m.id}', 'board')">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn-icon-action btn-edit" title="Edit Member" onclick="openEditBoardModal('${m.id}')">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-icon-action btn-delete" title="Delete Member" onclick="confirmDeleteBoardMember('${m.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddBoardModal() {
  currentEditingType = 'board';
  currentEditingId = null;
  const modal = document.getElementById('adminMemberModal');
  const title = document.getElementById('adminMemberModalTitle');
  const form = document.getElementById('adminMemberForm');

  if (title) title.textContent = 'Add New Board Member';
  if (form) {
    form.reset();
    document.getElementById('mId').value = '';
    document.getElementById('mSpecializationGroup').style.display = 'none';
  }
  if (modal) modal.classList.add('active');
}

function openEditBoardModal(id) {
  currentEditingType = 'board';
  currentEditingId = id;
  const board = HUData.getBoardMembers();
  const m = board.find(x => x.id === id);
  if (!m) return;

  const modal = document.getElementById('adminMemberModal');
  const title = document.getElementById('adminMemberModalTitle');
  if (title) title.textContent = `Edit Board Member: ${m.name}`;

  document.getElementById('mId').value = m.id;
  document.getElementById('mName').value = m.name;
  document.getElementById('mPosition').value = m.position;
  document.getElementById('mDepartment').value = m.department;
  document.getElementById('mQualification').value = m.qualification || '';
  document.getElementById('mExperience').value = m.experience || '';
  document.getElementById('mEmail').value = m.email || '';
  document.getElementById('mPhoto').value = m.photo || '';
  document.getElementById('mBio').value = m.bio || '';
  document.getElementById('mSpecializationGroup').style.display = 'none';

  if (modal) modal.classList.add('active');
}

function confirmDeleteBoardMember(id) {
  if (confirm("Are you sure you want to delete this Board Member? This will immediately remove them from the public website.")) {
    HUData.deleteBoardMember(id);
    renderAdminBoardTable();
    refreshAdminStats();
    showToast("Board member deleted successfully.");
  }
}

// -------------------------------------------------------------
// 2. FACULTY MEMBERS MANAGEMENT
// -------------------------------------------------------------
function renderAdminFacultyTable(search = '', deptFilter = 'all') {
  const tbody = document.getElementById('adminFacultyTableBody');
  if (!tbody || !window.HUData) return;

  let faculty = HUData.getFaculty(deptFilter, search);

  tbody.innerHTML = faculty.map(f => `
    <tr>
      <td>
        <div class="table-avatar-cell">
          <img src="${f.photo || 'assets/images/university_crest.jpg'}" alt="${f.name}" class="table-avatar" onerror="this.src='assets/images/university_crest.jpg'">
          <div>
            <strong>${f.name}</strong>
            <div style="font-size: 0.78rem; color: var(--slate-500);">${f.qualification}</div>
          </div>
        </div>
      </td>
      <td>${f.designation}</td>
      <td><span class="member-dept-badge">${f.department}</span></td>
      <td style="font-size: 0.85rem;">${f.specialization}</td>
      <td>${f.experience}</td>
      <td>
        <div class="table-actions">
          <button class="btn-icon-action btn-view" title="View Profile" onclick="window.openMemberModal('${f.id}', 'faculty')">
            <i class="fas fa-eye"></i>
          </button>
          <button class="btn-icon-action btn-edit" title="Edit Faculty" onclick="openEditFacultyModal('${f.id}')">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-icon-action btn-delete" title="Delete Faculty" onclick="confirmDeleteFaculty('${f.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddFacultyModal() {
  currentEditingType = 'faculty';
  currentEditingId = null;
  const modal = document.getElementById('adminMemberModal');
  const title = document.getElementById('adminMemberModalTitle');
  const form = document.getElementById('adminMemberForm');

  if (title) title.textContent = 'Add New Faculty Member';
  if (form) {
    form.reset();
    document.getElementById('mId').value = '';
    document.getElementById('mSpecializationGroup').style.display = 'block';
  }
  if (modal) modal.classList.add('active');
}

function openEditFacultyModal(id) {
  currentEditingType = 'faculty';
  currentEditingId = id;
  const faculty = HUData.getFaculty('all', '');
  const f = faculty.find(x => x.id === id);
  if (!f) return;

  const modal = document.getElementById('adminMemberModal');
  const title = document.getElementById('adminMemberModalTitle');
  if (title) title.textContent = `Edit Faculty Member: ${f.name}`;

  document.getElementById('mId').value = f.id;
  document.getElementById('mName').value = f.name;
  document.getElementById('mPosition').value = f.designation;
  document.getElementById('mDepartment').value = f.department;
  document.getElementById('mQualification').value = f.qualification || '';
  document.getElementById('mSpecialization').value = f.specialization || '';
  document.getElementById('mExperience').value = f.experience || '';
  document.getElementById('mEmail').value = f.email || '';
  document.getElementById('mPhoto').value = f.photo || '';
  document.getElementById('mBio').value = f.bio || '';
  document.getElementById('mSpecializationGroup').style.display = 'block';

  if (modal) modal.classList.add('active');
}

function confirmDeleteFaculty(id) {
  if (confirm("Are you sure you want to delete this Faculty member? This will immediately remove them from the faculty directory.")) {
    HUData.deleteFaculty(id);
    renderAdminFacultyTable();
    refreshAdminStats();
    showToast("Faculty member deleted successfully.");
  }
}

// SAVE MEMBER FORM (BOARD OR FACULTY)
function handleAdminMemberFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('mId').value;
  const name = document.getElementById('mName').value.trim();
  const position = document.getElementById('mPosition').value.trim();
  const department = document.getElementById('mDepartment').value.trim();
  const qualification = document.getElementById('mQualification').value.trim();
  const experience = document.getElementById('mExperience').value.trim();
  const specialization = document.getElementById('mSpecialization')?.value.trim();
  const email = document.getElementById('mEmail').value.trim();
  const photo = document.getElementById('mPhoto').value.trim() || 'assets/images/university_crest.jpg';
  const bio = document.getElementById('mBio').value.trim();

  if (!name || !position || !department) {
    alert("Please fill in Name, Position, and Department.");
    return;
  }

  if (currentEditingType === 'board') {
    const memberObj = {
      id: id || 'bm-' + Date.now(),
      name,
      position,
      department,
      qualification,
      experience,
      email,
      photo,
      bio,
      featured: true
    };
    HUData.saveBoardMember(memberObj);
    renderAdminBoardTable();
    showToast("Board member saved successfully!");
  } else {
    const facultyObj = {
      id: id || 'fac-' + Date.now(),
      name,
      designation: position,
      department,
      qualification,
      specialization: specialization || 'Academic Teaching & Research',
      experience,
      email,
      photo,
      bio,
      featured: false
    };
    HUData.saveFaculty(facultyObj);
    renderAdminFacultyTable();
    showToast("Faculty member saved successfully!");
  }

  closeAdminModal('adminMemberModal');
  refreshAdminStats();
}

// -------------------------------------------------------------
// 3. EVENTS MANAGEMENT
// -------------------------------------------------------------
function renderAdminEventsTable() {
  const tbody = document.getElementById('adminEventsTableBody');
  if (!tbody || !window.HUData) return;

  const events = HUData.getEvents('all');

  tbody.innerHTML = events.map(e => `
    <tr>
      <td><strong>${e.title}</strong></td>
      <td><span class="event-category-badge">${e.category}</span></td>
      <td>${e.date}</td>
      <td>${e.venue}</td>
      <td>
        <div class="table-actions">
          <button class="btn-icon-action btn-edit" title="Edit Event" onclick="openEditEventModal('${e.id}')">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-icon-action btn-delete" title="Delete Event" onclick="confirmDeleteEvent('${e.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddEventModal() {
  currentEditingId = null;
  const modal = document.getElementById('adminEventModal');
  const form = document.getElementById('adminEventForm');
  if (form) {
    form.reset();
    document.getElementById('eId').value = '';
  }
  if (modal) modal.classList.add('active');
}

function openEditEventModal(id) {
  currentEditingId = id;
  const events = HUData.getEvents('all');
  const e = events.find(x => x.id === id);
  if (!e) return;

  const modal = document.getElementById('adminEventModal');
  document.getElementById('eId').value = e.id;
  document.getElementById('eTitle').value = e.title;
  document.getElementById('eCategory').value = e.category;
  document.getElementById('eDate').value = e.date;
  document.getElementById('eTime').value = e.time || '';
  document.getElementById('eVenue').value = e.venue || '';
  document.getElementById('eSpeaker').value = e.speaker || '';
  document.getElementById('eDesc').value = e.description || '';

  if (modal) modal.classList.add('active');
}

function handleAdminEventSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('eId').value;
  const title = document.getElementById('eTitle').value.trim();
  const category = document.getElementById('eCategory').value;
  const date = document.getElementById('eDate').value;
  const time = document.getElementById('eTime').value.trim();
  const venue = document.getElementById('eVenue').value.trim();
  const speaker = document.getElementById('eSpeaker').value.trim();
  const desc = document.getElementById('eDesc').value.trim();

  if (!title || !date || !venue) {
    alert("Please fill in Title, Date, and Venue.");
    return;
  }

  const evtObj = {
    id: id || 'evt-' + Date.now(),
    title,
    category,
    date,
    time: time || '10:00 AM - 1:00 PM',
    venue,
    speaker: speaker || 'University Faculty Guild',
    image: 'assets/images/campus_auditorium.jpg',
    description: desc || 'Official university event organized for students, scholars, and faculty members.'
  };

  HUData.saveEvent(evtObj);
  renderAdminEventsTable();
  refreshAdminStats();
  closeAdminModal('adminEventModal');
  showToast("Event saved successfully!");
}

function confirmDeleteEvent(id) {
  if (confirm("Are you sure you want to delete this Event?")) {
    HUData.deleteEvent(id);
    renderAdminEventsTable();
    refreshAdminStats();
    showToast("Event deleted.");
  }
}

// -------------------------------------------------------------
// 4. ANNOUNCEMENTS MANAGEMENT
// -------------------------------------------------------------
function renderAdminAnnouncementsTable() {
  const tbody = document.getElementById('adminAnnouncementsTableBody');
  if (!tbody || !window.HUData) return;

  const ann = HUData.getAnnouncements();

  tbody.innerHTML = ann.map(a => `
    <tr>
      <td><strong>${a.title}</strong></td>
      <td><span style="background: #e0f2fe; color: #0369a1; padding: 0.2rem 0.6rem; border-radius: 4px; font-weight: 700; font-size: 0.78rem;">${a.category}</span></td>
      <td>${a.priority === 'High' ? '<span style="color: #b91c1c; font-weight: 800;">High</span>' : '<span style="color: #047857;">Normal</span>'}</td>
      <td>${a.date}</td>
      <td>
        <div class="table-actions">
          <button class="btn-icon-action btn-edit" title="Edit Announcement" onclick="openEditAnnouncementModal('${a.id}')">
            <i class="fas fa-edit"></i>
          </button>
          <button class="btn-icon-action btn-delete" title="Delete Announcement" onclick="confirmDeleteAnnouncement('${a.id}')">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function openAddAnnouncementModal() {
  const modal = document.getElementById('adminAnnModal');
  const form = document.getElementById('adminAnnForm');
  if (form) {
    form.reset();
    document.getElementById('aId').value = '';
  }
  if (modal) modal.classList.add('active');
}

function openEditAnnouncementModal(id) {
  const ann = HUData.getAnnouncements();
  const a = ann.find(x => x.id === id);
  if (!a) return;

  const modal = document.getElementById('adminAnnModal');
  document.getElementById('aId').value = a.id;
  document.getElementById('aTitle').value = a.title;
  document.getElementById('aCategory').value = a.category;
  document.getElementById('aPriority').value = a.priority;
  document.getElementById('aDate').value = a.date;
  document.getElementById('aSummary').value = a.summary || '';
  document.getElementById('aLink').value = a.link || '';

  if (modal) modal.classList.add('active');
}

function handleAdminAnnSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('aId').value;
  const title = document.getElementById('aTitle').value.trim();
  const category = document.getElementById('aCategory').value;
  const priority = document.getElementById('aPriority').value;
  const date = document.getElementById('aDate').value;
  const summary = document.getElementById('aSummary').value.trim();
  const link = document.getElementById('aLink').value.trim();

  if (!title) {
    alert("Please provide an announcement title.");
    return;
  }

  const annObj = {
    id: id || 'ann-' + Date.now(),
    title,
    category,
    priority,
    date: date || new Date().toISOString().split('T')[0],
    summary: summary || title,
    link: link || 'admissions.html'
  };

  HUData.saveAnnouncement(annObj);
  renderAdminAnnouncementsTable();
  closeAdminModal('adminAnnModal');
  showToast("Announcement saved successfully!");
}

function confirmDeleteAnnouncement(id) {
  if (confirm("Are you sure you want to delete this announcement?")) {
    HUData.deleteAnnouncement(id);
    renderAdminAnnouncementsTable();
    showToast("Announcement deleted.");
  }
}

// -------------------------------------------------------------
// 5. APPLICATIONS REVIEW
// -------------------------------------------------------------
function renderAdminApplicationsTable() {
  const tbody = document.getElementById('adminAppsTableBody');
  if (!tbody || !window.HUData) return;

  const apps = HUData.getApplications();

  if (apps.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--slate-400); padding: 2rem;">No applications received yet. Submit one from admissions.html!</td></tr>`;
    return;
  }

  tbody.innerHTML = apps.map(app => `
    <tr>
      <td><strong>${app.id}</strong></td>
      <td>${app.name}</td>
      <td><strong>${app.course}</strong></td>
      <td>${app.phone} <br><small style="color: var(--slate-500);">${app.email}</small></td>
      <td>${app.percentage ? app.percentage + '%' : 'N/A'}</td>
      <td><span style="background: #d1fae5; color: #047857; padding: 0.2rem 0.6rem; border-radius: 4px; font-weight: 700; font-size: 0.78rem;">${app.status || 'Received'}</span></td>
    </tr>
  `).join('');
}

// RESET TO DEFAULT DATA
function handleResetAllData() {
  if (confirm("WARNING: This will reset all Board Members, Faculty, Events, and Announcements back to default sample state. Any custom additions will be restored. Proceed?")) {
    HUData.resetToDefaults();
    initAdminDashboard();
    showToast("Website data has been restored to default institutional configuration.");
  }
}

function closeAdminModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

// Global exposure
window.openAddBoardModal = openAddBoardModal;
window.openEditBoardModal = openEditBoardModal;
window.confirmDeleteBoardMember = confirmDeleteBoardMember;
window.openAddFacultyModal = openAddFacultyModal;
window.openEditFacultyModal = openEditFacultyModal;
window.confirmDeleteFaculty = confirmDeleteFaculty;
window.openAddEventModal = openAddEventModal;
window.openEditEventModal = openEditEventModal;
window.confirmDeleteEvent = confirmDeleteEvent;
window.openAddAnnouncementModal = openAddAnnouncementModal;
window.openEditAnnouncementModal = openEditAnnouncementModal;
window.confirmDeleteAnnouncement = confirmDeleteAnnouncement;
window.handleAdminMemberFormSubmit = handleAdminMemberFormSubmit;
window.handleAdminEventSubmit = handleAdminEventSubmit;
window.handleAdminAnnSubmit = handleAdminAnnSubmit;
window.handleResetAllData = handleResetAllData;
window.closeAdminModal = closeAdminModal;
window.renderAdminBoardTable = renderAdminBoardTable;
window.renderAdminFacultyTable = renderAdminFacultyTable;
