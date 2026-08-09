// Admin CMS Dashboard Logic

document.addEventListener("DOMContentLoaded", () => {
  renderAdminTables();
});

function switchTab(tabId) {
  document.querySelectorAll(".admin-tab-btn").forEach((btn) => btn.classList.remove("active"));
  document.querySelectorAll(".admin-tab-content").forEach((content) => content.classList.remove("active"));

  event.currentTarget.classList.add("active");
  const targetContent = document.getElementById(tabId);
  if (targetContent) {
    targetContent.classList.add("active");
  }
  if (window.feather) feather.replace();
}

function renderAdminTables() {
  const data = getCMSData();

  // 1. Render Announcements Table
  const annBody = document.getElementById("table-announcements-body");
  if (annBody) {
    annBody.innerHTML = data.announcements
      .map(
        (ann) => `
      <tr>
        <td><strong>${ann.title}</strong></td>
        <td>${ann.category}</td>
        <td><span class="badge ${ann.badge === 'Penting' ? 'badge-red' : 'badge-gold'}">${ann.badge}</span></td>
        <td>${ann.date}</td>
        <td>
          <button onclick="handleDeleteAnnouncement('${ann.id}')" class="btn-action-sm btn-delete">
            <i data-feather="trash-2" style="width:14px;"></i> Hapus
          </button>
        </td>
      </tr>
    `
      )
      .join("");
  }

  // 2. Render Events Table
  const evBody = document.getElementById("table-events-body");
  if (evBody) {
    evBody.innerHTML = data.events
      .map(
        (ev) => `
      <tr>
        <td><strong>${ev.title}</strong></td>
        <td>${ev.date}</td>
        <td><span class="badge ${ev.id === 'event-17agustus' ? 'badge-red' : 'badge-gold'}">${ev.badge}</span></td>
        <td>
          ${
            ev.id === "event-17agustus"
              ? `<span style="font-size:0.8rem; color:var(--accent-gold);">System Event</span>`
              : `<button onclick="handleDeleteEvent('${ev.id}')" class="btn-action-sm btn-delete">
                  <i data-feather="trash-2" style="width:14px;"></i> Hapus
                </button>`
          }
        </td>
      </tr>
    `
      )
      .join("");
  }

  // 3. Render Pengurus Table
  const pengBody = document.getElementById("table-pengurus-body");
  if (pengBody) {
    pengBody.innerHTML = data.pengurus
      .map(
        (p) => `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td>${p.role}</td>
        <td>${p.phone}</td>
      </tr>
    `
      )
      .join("");
  }

  if (window.feather) feather.replace();
}

function handleAddAnnouncement(e) {
  e.preventDefault();
  const data = getCMSData();

  const title = document.getElementById("ann-title").value;
  const category = document.getElementById("ann-category").value;
  const badge = document.getElementById("ann-badge").value;
  const content = document.getElementById("ann-content").value;
  const today = new Date().toISOString().split("T")[0];

  const newAnn = {
    id: "ann-" + Date.now(),
    title,
    category,
    badge,
    date: today,
    content
  };

  data.announcements.unshift(newAnn);
  saveCMSData(data);
  document.getElementById("form-announcement").reset();
  renderAdminTables();
  alert("Pengumuman berhasil dipublikasikan ke Portal Warga!");
}

function handleDeleteAnnouncement(id) {
  if (!confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) return;
  const data = getCMSData();
  data.announcements = data.announcements.filter((a) => a.id !== id);
  saveCMSData(data);
  renderAdminTables();
}

function handleAddEvent(e) {
  e.preventDefault();
  const data = getCMSData();

  const title = document.getElementById("ev-title").value;
  const date = document.getElementById("ev-date").value;
  const badge = document.getElementById("ev-badge").value;
  const description = document.getElementById("ev-description").value;

  const newEvent = {
    id: "event-" + Date.now(),
    slug: title.toLowerCase().replace(/[^a-z0-0]/g, "-"),
    title,
    date,
    category: "Kegiatan Warga",
    featured: false,
    badge,
    image: "img/gallery/8.jpg",
    description,
    details: {
      theme: title,
      location: "Lingkungan RT 03",
      time: "Sesuai Jadwal",
      competitions: [],
      panitia: [],
      gallery: ["img/gallery/8.jpg"]
    }
  };

  data.events.push(newEvent);
  saveCMSData(data);
  document.getElementById("form-event").reset();
  renderAdminTables();
  alert("Kegiatan baru berhasil disimpan!");
}

function handleDeleteEvent(id) {
  if (!confirm("Apakah Anda yakin ingin menghapus kegiatan ini?")) return;
  const data = getCMSData();
  data.events = data.events.filter((e) => e.id !== id);
  saveCMSData(data);
  renderAdminTables();
}

function handleResetData() {
  if (confirm("Reset data akan mengembalikan semua pengumuman & kegiatan ke pengaturan awal. Lanjutkan?")) {
    resetCMSData();
    renderAdminTables();
    alert("Data berhasil di-reset ke default!");
  }
}
