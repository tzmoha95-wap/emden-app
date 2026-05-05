const form = document.querySelector('.contact-form');
const resultMessage = document.querySelector('.result-message');

if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = form.querySelector('input[name="name"]').value.trim();
    const code = form.querySelector('textarea[name="code"]').value.trim();

    if (!name || !code) {
      showMessage('الرجاء إدخال الاسم والكود معاً.', 'error');
      return;
    }

    try {
      const response = await fetch('/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, code }),
      });

      const result = await response.json();

      if (response.ok) {
        showMessage(result.message, 'success');
        form.reset();
      } else {
        showMessage(result.error || 'حدث خطأ أثناء الحفظ.', 'error');
      }
    } catch (error) {
      showMessage('فشل الاتصال بالخادم. تأكد من تشغيل server.js.', 'error');
    }
  });
}

function showMessage(message, type) {
  resultMessage.textContent = message;
  resultMessage.className = `result-message ${type}`;
  resultMessage.style.display = 'block';

  // إخفاء الرسالة بعد 5 ثوانٍ
  setTimeout(() => {
    resultMessage.style.display = 'none';
  }, 5000);
}
