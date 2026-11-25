
// NAVIGATION

const navItems = document.querySelectorAll('.nav-item');

function showPage(page) {

  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  document.getElementById(page).classList.add('active');

  navItems.forEach(item => {
    item.classList.toggle(
      'active',
      item.dataset.page === page
    );
  });

  const titles = {
    dashboard: 'Dashboard',
    schedule: 'Class Schedule',
    grades: 'My Grades',
    announcements: 'Announcements',
    profile: 'My Profile'
  };

  document.getElementById('topTitle').textContent = titles[page];

  document.getElementById('sidebar').classList.remove('open');

  window.scrollTo(0, 0);
}

// SIDEBAR CLICK EVENTS

navItems.forEach(item => {
  item.addEventListener('click', () => {
    showPage(item.dataset.page);
  });
});

// MOBILE MENU

document.getElementById('menuBtn').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// DATE

document.getElementById('today').textContent =
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

// PROFILE INFORMATION

const fields = [
  'nameInput',
  'emailInput',
  'phoneInput'
];

// UPDATE PROFILE DISPLAY

function updateProfile() {

  const name =
    document.getElementById('nameInput').value.trim() || 'Student';

  const initials = name
    .split(' ')
    .map(x => x[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  document.getElementById('welcomeName').textContent =
    name.split(' ')[0];

  document.getElementById('topName').textContent = name;

  document.getElementById('profileDisplayName').textContent = name;

  document.getElementById('topAvatar').textContent = initials;

  document.getElementById('profileAvatar').textContent = initials;
}

// LOAD SAVED PROFILE

function loadProfile() {

  fields.forEach(id => {

    const saved = localStorage.getItem(id);

    if (saved !== null) {
      document.getElementById(id).value = saved;
    }

  });

  updateProfile();
}

// SAVE PROFILE

document.getElementById('saveProfile').addEventListener('click', () => {

  const name = document.getElementById('nameInput').value.trim();

  const email = document.getElementById('emailInput').value.trim();

  const message = document.getElementById('saveMessage');

  if (!name || !email || !email.includes('@')) {

    message.style.color = 'red';

    message.textContent =
      'Please enter a valid name and email address.';

    return;
  }

  fields.forEach(id => {

    localStorage.setItem(
      id,
      document.getElementById(id).value
    );

  });

  updateProfile();

  message.style.color = 'green';

  message.textContent =
    '✓ Profile updated successfully!';

});

// INITIALIZE WEBSITE

loadProfile();
