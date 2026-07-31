document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('registerForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const name = (formData.get('name') || '').trim() || 'Ad qeyd olunmayıb';
  const phone = (formData.get('phone') || '').trim();
  const note = (formData.get('note') || '').trim();

  if (phone.length < 7) {
    status.textContent = 'Zəhmət olmasa düzgün WhatsApp nömrəsi daxil edin.';
    status.className = 'contact__status error';
    return;
  }

  status.textContent = 'Göndərilir...';
  status.className = 'contact__status';

  try {
    await db.collection('registrations').add({
      name,
      phone,
      note,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    status.textContent = 'Təşəkkürlər! Ən qısa zamanda WhatsApp üzərindən sizinlə əlaqə saxlayacağıq.';
    status.className = 'contact__status success';
    form.reset();
  } catch (err) {
    console.error(err);
    status.textContent = 'Xəta baş verdi, yenidən cəhd edin.';
    status.className = 'contact__status error';
  }
});
