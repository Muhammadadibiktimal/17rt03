// Admin CMS Dashboard & Auth Logic

const ADMIN_PIN = "rt03admin"; // Password default admin

document.addEventListener("DOMContentLoaded", () => {
  checkAuthStatus();
  renderAdminTables();
});

function checkAuthStatus() {
  const isAuth = sessionStorage.getItem("RT03_ADMIN_AUTH");
  const loginModal = document.getElementById("login-modal");
  if (isAuth === "true") {
    if (loginModal) loginModal.style.display = "none";
  } else {
    if (loginModal) loginModal.style.display = "flex";
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const pass = document.getElementById("admin-pass").value;
  const errorMsg = document.getElementById("login-error");

  if (pass === ADMIN_PIN) {
    sessionStorage.setItem("RT03_ADMIN_AUTH", "true");
    document.getElementById("login-modal").style.display = "none";
    if (errorMsg) errorMsg.style.display = "none";
  } else {
    if (errorMsg) errorMsg.style.display = "block";
  }
}

function handleLogout() {
  sessionStorage.removeItem("RT03_ADMIN_AUTH");
  checkAuthStatus();
}

function switchAdminTab(tabId, btnId) {
  document.querySelectorAll(".admin-sidebar .menu-item").forEach((btn) => btn.classList.remove("active"));
  document.querySelectorAll(".admin-tab-content").forEach((content) => {
    content.classList.remove("active");
    content.style.display = "none";
  });

  const activeBtn = document.getElementById(btnId);
  if (activeBtn) {
    activeBtn.classList.add("active");
  }

  const targetContent = document.getElementById(tabId);
  if (targetContent) {
    targetContent.classList.add("active");
    targetContent.style.display = "block";
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
          <button onclick="handleDeleteAnnouncement('${ann.id}')" class="btn-action-sm btn-delete-styled">
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
              ? `<span style="font-size:0.8rem; color:var(--accent-gold); font-weight:600;">System Event</span>`
              : `<button onclick="handleDeleteEvent('${ev.id}')" class="btn-action-sm btn-delete-styled">
                  <i data-feather="trash-2" style="width:14px;"></i> Hapus
                </button>`
          }
        </td>
      </tr>
    `
      )
      .join("");
  }

  // 3. Render Pengurus Table (Dengan Tombol Edit & Hapus Keren)
  const pengBody = document.getElementById("table-pengurus-body");
  if (pengBody) {
    pengBody.innerHTML = data.pengurus
      .map(
        (p, idx) => `
      <tr>
        <td><strong>${p.name}</strong></td>
        <td><span class="badge badge-blue">${p.role}</span></td>
        <td>${p.phone}</td>
        <td>
          <div style="display:flex; gap:0.5rem;">
            <button onclick="openEditPengurusModal(${idx})" class="btn-action-sm btn-edit-styled">
              <i data-feather="edit-2" style="width:14px;"></i> Edit
            </button>
            <button onclick="handleDeletePengurus(${idx})" class="btn-action-sm btn-delete-styled">
              <i data-feather="trash-2" style="width:14px;"></i> Hapus
            </button>
          </div>
        </td>
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
    slug: title.toLowerCase().replace(/[^a-z0-9]/g, "-"),
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

function handleAddPengurus(e) {
  e.preventDefault();
  const data = getCMSData();

  const name = document.getElementById("peng-name").value;
  const role = document.getElementById("peng-role").value;
  const phone = document.getElementById("peng-phone").value;
  const avatar = document.getElementById("peng-avatar") ? document.getElementById("peng-avatar").value : "";

  data.pengurus.push({ name, role, phone, avatar });
  saveCMSData(data);
  document.getElementById("form-pengurus").reset();
  renderAdminTables();
  alert("Pengurus RT berhasil ditambahkan!");
}

function openEditPengurusModal(index) {
  const data = getCMSData();
  const p = data.pengurus[index];
  if (!p) return;

  document.getElementById("edit-peng-index").value = index;
  document.getElementById("edit-peng-name").value = p.name;
  document.getElementById("edit-peng-role").value = p.role;
  document.getElementById("edit-peng-phone").value = p.phone;
  if (document.getElementById("edit-peng-avatar")) {
    document.getElementById("edit-peng-avatar").value = p.avatar || "";
  }

  document.getElementById("edit-pengurus-modal").classList.add("active");
  if (window.feather) feather.replace();
}

function closeEditPengurusModal() {
  document.getElementById("edit-pengurus-modal").classList.remove("active");
}

function handleSaveEditPengurus(e) {
  e.preventDefault();
  const data = getCMSData();
  const index = document.getElementById("edit-peng-index").value;

  if (index !== "" && data.pengurus[index]) {
    data.pengurus[index].name = document.getElementById("edit-peng-name").value;
    data.pengurus[index].role = document.getElementById("edit-peng-role").value;
    data.pengurus[index].phone = document.getElementById("edit-peng-phone").value;
    if (document.getElementById("edit-peng-avatar")) {
      data.pengurus[index].avatar = document.getElementById("edit-peng-avatar").value;
    }

    saveCMSData(data);
    closeEditPengurusModal();
    renderAdminTables();
    alert("Data pengurus RT berhasil diperbarui!");
  }
}

function handleDeletePengurus(index) {
  if (!confirm("Apakah Anda yakin ingin menghapus pengurus ini?")) return;
  const data = getCMSData();
  data.pengurus.splice(index, 1);
  saveCMSData(data);
  renderAdminTables();
}

function handleResetData() {
  if (confirm("Reset data akan mengembalikan semua data ke pengaturan awal. Lanjutkan?")) {
    resetCMSData();
    renderAdminTables();
    alert("Data berhasil di-reset ke default!");
  }
}
