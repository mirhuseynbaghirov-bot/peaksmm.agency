const loginScreen = document.getElementById('loginScreen');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const tableBody = document.getElementById('tableBody');
const emptyState = document.getElementById('emptyState');
const countLabel = document.getElementById('countLabel');

let currentData = [];
let unsubscribe = null;

// İstifadəçinin giriş vəziyyətini avtomatik izləyir
auth.onAuthStateChanged((user) => {
  if (user) {
    showDashboard();
  } else {
    showLogin();
  }
});

function showDashboard() {
  loginScreen.classList.add('hidden');
  dashboard.classList.remove('hidden');
  listenRegistrations();
}

function showLogin() {
  dashboard.classList.add('hidden');
  loginScreen.classList.remove('hidden');
  if (unsubscribe) { unsubscribe(); unsubscribe = null; }
}

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('emailInput').value.trim();
  const password = document.getElementById('passwordInput').value;
  loginError.textContent = '';

  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    loginError.textContent = 'E-poçt və ya şifrə yanlışdır';
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  auth.signOut();
});

document.getElementById('refreshBtn').addEventListener('click', () => {
  listenRegistrations();
});

document.getElementById('exportBtn').addEventListener('click', () => {
  if (!currentData.length) return;
  const header = ['Tarix', 'Ad', 'WhatsApp', 'Qeyd'];
  const rows = currentData.map((r) => [
    r.createdAt ? r.createdAt.toDate().toLocaleString('az-AZ') : '',
    r.name,
    r.phone,
    (r.note || '').replace(/\n/g, ' '),
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'peak-smm-qeydiyyatlar.csv';
  a.click();
  URL.revokeObjectURL(url);
});

// Firestore-a real-vaxt qulaq asır: yeni qeydiyyat gələn kimi cədvəl özü yenilənir
function listenRegistrations() {
  if (unsubscribe) unsubscribe();
  unsubscribe = db.collection('registrations')
    .orderBy('createdAt', 'desc')
    .onSnapshot(
      (snapshot) => {
        currentData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        renderTable();
      },
      (err) => {
        console.error(err);
        loginError.textContent = '';
      }
    );
}

function renderTable() {
  countLabel.textContent = `${currentData.length} nəfər`;
  tableBody.innerHTML = '';

  if (!currentData.length) {
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  currentData.forEach((r) => {
    const tr = document.createElement('tr');
    const dateStr = r.createdAt ? r.createdAt.toDate().toLocaleString('az-AZ') : '—';
    tr.innerHTML = `
      <td>${dateStr}</td>
      <td>${escapeHtml(r.name)}</td>
      <td>${escapeHtml(r.phone)}</td>
      <td class="note-cell">${escapeHtml(r.note || '—')}</td>
      <td><button class="row-delete" data-id="${r.id}">Sil</button></td>
    `;
    tableBody.appendChild(tr);
  });

  document.querySelectorAll('.row-delete').forEach((btn) => {
    btn.addEventListener('click', async () => {
      if (!confirm('Bu qeydiyyatı silmək istədiyinizə əminsiniz?')) return;
      await db.collection('registrations').doc(btn.dataset.id).delete();
    });
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
