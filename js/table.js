const API_URL = "https://jsonplaceholder.typicode.com"; 

const EMAIL_ICON = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>`;

const PHONE_ICON = `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></svg>`;


const AVATAR_COLORS = ["avatar--green", "avatar--blue",  "avatar--pink",  "avatar--green" ,"avatar--orange", "avatar--purple" ];

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

const selectAll   = document.querySelector('thead .row-check');
const tbody       = document.getElementById('usersBody');
const countNumber = document.querySelector('.count-number');
const countLabel  = document.querySelector('.count-label');
const searchInput = document.getElementById('table-search');

let allUsers = [];
let visibleUsers = [];
const selectedIds = new Set(); 

function renderTable(users) {
  visibleUsers = users;

  if (users.length === 0) {
    tbody.innerHTML = `<tr class="empty-row"><td colspan="4">No users found</td></tr>`;
  } else {
    tbody.innerHTML = users
      .map((user, i) => {
        const color = AVATAR_COLORS[i % AVATAR_COLORS.length];
        const checked = selectedIds.has(user.id) ? "checked" : "";
        return `
        <tr>
          <td><input type="checkbox" class="row-check" data-id="${user.id}" ${checked}></td>
          <td>
            <div class="name-cell">
              <span class="avatar ${color}">${getInitials(user.name)}</span>
              <span>${escapeHTML(user.name)}</span>
            </div>
          </td>
          <td>
            <div class="icon-cell">${EMAIL_ICON}<span>${escapeHTML(user.email)}</span></div>
          </td>
          <td>
            <div class="icon-cell">${PHONE_ICON}<span>${escapeHTML(user.phone)}</span></div>
          </td>
        </tr>`;
      })
      .join("");
  }
  updateSelection();
}

function updateSelection() {
  const selectedVisible = visibleUsers.filter(u => selectedIds.has(u.id)).length;
  const searching = searchInput.value.trim() !== "";

  selectAll.checked = visibleUsers.length > 0 && selectedVisible === visibleUsers.length;
  selectAll.indeterminate = selectedVisible > 0 && selectedVisible < visibleUsers.length;

  if (selectedIds.size > 0) {
    countNumber.textContent = selectedIds.size;
    countLabel.textContent = "selected";
  } else {
    countNumber.textContent = visibleUsers.length;
    countLabel.textContent = searching ? "results" : "total interns";
  }
  countNumber.classList.toggle("is-selected", selectedIds.size > 0);
}

// One row checkbox (delegation: works for rows created later)
tbody.addEventListener("change", (e) => {
  if (!e.target.classList.contains("row-check")) return;
  const id = Number(e.target.dataset.id);
  e.target.checked ? selectedIds.add(id) : selectedIds.delete(id);
  updateSelection();
});

// Header checkbox only affects the rows currently visible
selectAll.addEventListener("change", () => {
  visibleUsers.forEach(u =>
    selectAll.checked ? selectedIds.add(u.id) : selectedIds.delete(u.id)
  );
  renderTable(visibleUsers);
});

// Search filters the data, then redraws
searchInput.addEventListener("input", () => {
  const q = searchInput.value.trim().toLowerCase();
  renderTable(
    allUsers.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.phone.toLowerCase().includes(q)
    )
  );
});


document.querySelectorAll('a[href="#search"]').forEach(a =>
  a.addEventListener("click", (e) => {
    e.preventDefault();
    searchInput.focus();
  })
);

async function loadUsers() {
  const status = document.getElementById("status");
  status.textContent = "Loading…";

  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) throw new Error(`Server responded with ${response.status}`);

    allUsers = await response.json();
    status.textContent = "";
    renderTable(allUsers);
  } catch (error) {
    console.error(error);
    status.textContent = "Sorry, we couldn't load the users. Please try again.";
  }
}

updateSelection(); 
loadUsers();