const selectAll   = document.querySelector('thead .row-check');
const rows        = document.querySelectorAll('tbody tr:not(.empty-row)');
const emptyRow    = document.querySelector('.empty-row');
const countNumber = document.querySelector('.count-number');
const countLabel  = document.querySelector('.count-label');
const searchInput = document.getElementById('table-search');

const visibleRows = () => [...rows].filter(r => !r.classList.contains('is-hidden'));

function updateSelection() {
  const visible  = visibleRows();
  const selected = visible.filter(r => r.querySelector('.row-check').checked).length;
  const searching = searchInput.value.trim() !== '';

  selectAll.checked = visible.length > 0 && selected === visible.length;
  selectAll.indeterminate = selected > 0 && selected < visible.length;

  if (selected > 0) {
    countNumber.textContent = selected;
    countLabel.textContent = 'selected';
  } else {
    countNumber.textContent = visible.length;
    countLabel.textContent = searching ? 'results' : 'total interns';
  }
  countNumber.classList.toggle('is-selected', selected > 0);
}

// Header checkbox only affects visible rows
selectAll.addEventListener('change', () => {
  visibleRows().forEach(r => (r.querySelector('.row-check').checked = selectAll.checked));
  updateSelection();
});

rows.forEach(r => r.querySelector('.row-check').addEventListener('change', updateSelection));

// Live search across name, email and phone
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  rows.forEach(r => r.classList.toggle('is-hidden', !r.textContent.toLowerCase().includes(q)));
  emptyRow.classList.toggle('is-hidden', visibleRows().length > 0);
  updateSelection();
});

// Sidebar "Search" link focuses the box instead of jumping
document.querySelectorAll('a[href="#search"]').forEach(a =>
  a.addEventListener('click', e => {
    e.preventDefault();
    searchInput.focus();
  })
);

updateSelection();