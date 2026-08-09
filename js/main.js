// Main JavaScript for Portal RT 03 Public Interface

document.addEventListener("DOMContentLoaded", () => {
  renderPortalContent();
  setupNavbar();
});

function renderPortalContent() {
  const data = getCMSData();

  // 1. Render Pengurus
  const pengurusContainer = document.getElementById("pengurus-container");
  if (pengurusContainer) {
    pengurusContainer.innerHTML = data.pengurus
      .map((p) => {
        const avatarHTML = p.avatar
          ? `<img src="${p.avatar}" alt="${p.name}" class="pengurus-avatar">`
          : `<div class="pengurus-avatar-placeholder">${p.name.charAt(0)}</div>`;
        return `
        <div class="pengurus-card glass-card">
          ${avatarHTML}
          <h3>${p.name}</h3>
          <p>${p.role}</p>
          <div class="pengurus-contact">
            <i data-feather="phone"></i> ${p.phone}
          </div>
        </div>
      `;
      })
      .join("");
  }

  // 2. Render Pengumuman
  const annContainer = document.getElementById("announcement-container");
  if (annContainer) {
    annContainer.innerHTML = data.announcements
      .map((ann) => {
        let badgeClass = "badge-blue";
        if (ann.badge === "Penting") badgeClass = "badge-red";
        if (ann.badge === "Rutin") badgeClass = "badge-gold";

        return `
        <div class="announcement-card glass-card">
          <div>
            <div class="announcement-header">
              <span class="badge ${badgeClass}">${ann.badge}</span>
              <span style="font-size:0.85rem; color:var(--text-muted);"><i data-feather="calendar" style="width:14px;"></i> ${ann.date}</span>
            </div>
            <h3>${ann.title}</h3>
            <p>${ann.content}</p>
          </div>
          <div class="announcement-footer">
            <i data-feather="info" style="width:14px; color:var(--primary);"></i> Kategori: ${ann.category}
          </div>
        </div>
      `;
      })
      .join("");
  }

  // 3. Render Events/Kegiatan
  const eventsContainer = document.getElementById("events-container");
  if (eventsContainer) {
    eventsContainer.innerHTML = data.events
      .map((ev) => {
        const isSpesial17 = ev.id === "event-17agustus";
        const badgeClass = isSpesial17 ? "badge-red" : "badge-gold";

        return `
        <div class="event-card glass-card">
          <div class="event-img">
            <img src="${ev.image}" alt="${ev.title}">
            <div class="event-badge-tag">
              <span class="badge ${badgeClass}">${ev.badge}</span>
            </div>
          </div>
          <div class="event-body">
            <div class="date"><i data-feather="calendar" style="width:14px;"></i> ${ev.date}</div>
            <h3>${ev.title}</h3>
            <p>${ev.description}</p>
            <button onclick="openEventModal('${ev.id}')" class="${isSpesial17 ? 'btn-primary' : 'btn-secondary'}" style="width: 100%; justify-content: center;">
              <i data-feather="eye"></i> Lihat Detail Acara
            </button>
          </div>
        </div>
      `;
      })
      .join("");
  }

  // 4. Render Gallery
  const galleryContainer = document.getElementById("gallery-container");
  if (galleryContainer) {
    const allImages = [
      "img/gallery/8.jpg",
      "img/gallery/7.jpg",
      "img/gallery/11.jpg",
      "img/gallery/10.jpg",
      "img/gallery/9.jpg",
      "img/gallery/DSC_0251.JPG",
      "img/gallery/DSC_0192.JPG"
    ];
    galleryContainer.innerHTML = allImages
      .map(
        (imgSrc) => `
      <div class="gallery-item glass-card">
        <img src="${imgSrc}" alt="Dokumentasi RT 03" onclick="openImagePreview('${imgSrc}')">
      </div>
    `
      )
      .join("");
  }

  if (window.feather) {
    feather.replace();
  }
}

// Modal Detail Event
function openEventModal(eventId) {
  const data = getCMSData();
  const ev = data.events.find((e) => e.id === eventId);
  if (!ev) return;

  const modal = document.getElementById("event-modal");
  const container = document.getElementById("modal-body-container");

  let compHTML = "";
  if (ev.details && ev.details.competitions && ev.details.competitions.length > 0) {
    compHTML = `
      <h3 style="margin-top:1.5rem; color:var(--accent-gold);"><i data-feather="award"></i> Daftar Perlombaan & Kegiatan</h3>
      <div class="comp-list-grid">
        ${ev.details.competitions
          .map(
            (c) => `
          <div class="comp-box">
            <h4>${c.category}</h4>
            <ul>
              ${c.items.map((i) => `<li>${i}</li>`).join("")}
            </ul>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  let panitiaHTML = "";
  if (ev.details && ev.details.panitia && ev.details.panitia.length > 0) {
    panitiaHTML = `
      <h3 style="margin-top:1.5rem; color:var(--text-main);"><i data-feather="users"></i> Susunan Panitia & Penanggung Jawab</h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px,1fr)); gap:0.8rem; margin-top:0.8rem;">
        ${ev.details.panitia
          .map(
            (p) => `
          <div style="background:rgba(255,255,255,0.05); padding:0.8rem; border-radius:6px;">
            <div style="font-size:0.8rem; color:var(--text-muted);">${p.role}</div>
            <div style="font-weight:600; font-size:0.95rem; color:#fff;">${p.name}</div>
          </div>
        `
          )
          .join("")}
      </div>
    `;
  }

  let galleryHTML = "";
  if (ev.details && ev.details.gallery && ev.details.gallery.length > 0) {
    galleryHTML = `
      <h3 style="margin-top:1.5rem; color:var(--text-main);"><i data-feather="image"></i> Galeri Dokumentasi</h3>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(120px, 1fr)); gap:0.5rem; margin-top:0.8rem;">
        ${ev.details.gallery
          .map(
            (g) => `
          <img src="${g}" style="width:100%; height:80px; object-fit:cover; border-radius:6px;" />
        `
          )
          .join("")}
      </div>
    `;
  }

  container.innerHTML = `
    <span class="badge badge-red" style="margin-bottom:0.8rem;">${ev.badge}</span>
    <h2>${ev.title}</h2>
    <p style="color:var(--accent-gold); font-size:1.1rem; margin-bottom:1rem;">Tema: "${ev.details.theme || ev.description}"</p>
    
    <div class="modal-meta">
      <span><i data-feather="calendar" style="width:14px;"></i> ${ev.date}</span>
      <span><i data-feather="clock" style="width:14px;"></i> ${ev.details.time || '-'}</span>
      <span><i data-feather="map-pin" style="width:14px;"></i> ${ev.details.location || '-'}</span>
    </div>

    <p style="color:var(--text-muted); line-height:1.6;">${ev.description}</p>

    ${compHTML}
    ${panitiaHTML}
    ${galleryHTML}
  `;

  modal.classList.add("active");
  if (window.feather) feather.replace();
}

function closeEventModal() {
  const modal = document.getElementById("event-modal");
  modal.classList.remove("active");
}

function openImagePreview(src) {
  openEventModal("event-17agustus");
}

// Mobile Navbar Toggle
function setupNavbar() {
  const hamburger = document.querySelector("#hamburger-menu");
  const navNav = document.querySelector(".navbar-nav");

  if (hamburger && navNav) {
    hamburger.onclick = (e) => {
      e.preventDefault();
      navNav.classList.toggle("active");
    };

    document.addEventListener("click", (e) => {
      if (!hamburger.contains(e.target) && !navNav.contains(e.target)) {
        navNav.classList.remove("active");
      }
    });
  }
}
