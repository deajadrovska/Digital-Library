/* =============================================
   FINKI Attendance App — Logo Digital Library
   js/app.js
   ============================================= */

let allLogos = [];
let currentLogo = null;


document.addEventListener('DOMContentLoaded', () => {
  loadLogos();
  setupModal();
});

// ── Load logos.json ──
async function loadLogos() {
  try {
    const res = await fetch('data/logos.json');
    allLogos  = await res.json();
    renderGrid(allLogos);
    renderFilters(allLogos);
  } catch (err) {
    document.getElementById('grid').innerHTML =
        '<p class="loading">⚠️ Run <code>node scan.js</code> first, then refresh.</p>';
  }
}

// ── Render grid ──
function renderGrid(logos) {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  if (!logos.length) {
    grid.innerHTML = '<p class="loading">No logos match this filter.</p>';
    return;
  }

  logos.forEach((logo, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.animationDelay = `${0.05 + i * 0.05}s`;
    card.addEventListener('click', () => openModal(logo));
    card.innerHTML = `
      <div class="logo-stage">
        <img src="images/${logo.filename}" alt="Variant ${logo.num}" loading="lazy" />
      </div>
      <div class="card-info">
        <div class="card-number">VARIANT ${logo.num}</div>
        <div class="card-title">Variant ${logo.num}</div>
        <div class="tags">${logo.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
      </div>`;
    grid.appendChild(card);
  });
}

// ── Render filter buttons from tags ──
function renderFilters(logos) {
  const bar = document.getElementById('filter-bar');

  // Collect unique tags
  const allTags = [...new Set(logos.flatMap(l => l.tags))].sort();

  // "All" button
  bar.innerHTML = `<button class="filter-btn active" onclick="filter('all', this)">All</button>`;

  // One button per tag
  allTags.forEach(tag => {
    const btn = document.createElement('button');
    btn.className = 'filter-btn';
    btn.textContent = tag.charAt(0).toUpperCase() + tag.slice(1);
    btn.addEventListener('click', () => filter(tag, btn));
    bar.appendChild(btn);
  });
}

// ── Filter ──
function filter(tag, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const filtered = tag === 'all' ? allLogos : allLogos.filter(l => l.tags.includes(tag));
  renderGrid(filtered);
}

// ── Modal ──
function setupModal() {
  document.getElementById('modal').addEventListener('click', e => {
    if (e.target === document.getElementById('modal')) closeModal();
  });
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
}

function openModal(logo) {
  document.getElementById('modal-img').src           = `images/${logo.filename}`; 
  const downloadBtn = document.getElementById('download-btn');
  const imagePath = `images/${logo.filename}`;

  // Force-download the currently opened image
  downloadBtn.onclick = () => {
    const a = document.createElement('a');
    a.href = imagePath;
    a.download = logo.filename; // suggested filename
    document.body.appendChild(a);
    a.click();
    a.remove();
  };
  document.getElementById('modal-num').textContent   = `VARIANT ${logo.num}`;
  document.getElementById('modal-title').textContent = `Variant ${logo.num}`;
  document.getElementById('modal-tags').innerHTML    = logo.tags.map(t => `<span class="tag">${t}</span>`).join('');
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}



function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}