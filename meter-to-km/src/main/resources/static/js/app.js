document.addEventListener('DOMContentLoaded', () => {
  const metersInput = document.getElementById('metersInput');
  const convertBtn = document.getElementById('convertBtn');
  const resultDiv = document.getElementById('result');
  const outMeters = document.getElementById('outMeters');
  const outKm = document.getElementById('outKm');

  function showError(msg) {
    outMeters.textContent = '—';
    outKm.textContent = msg;
    resultDiv.classList.remove('hidden');
  }

  async function convert(meters) {
    try {
      if (isNaN(meters) || meters < 0) {
        showError('Please enter a valid non-negative number.');
        return;
      }

      const resp = await fetch(`/api/convert?meters=${encodeURIComponent(meters)}`);
      if (!resp.ok) {
        showError('Server error. Try again.');
        return;
      }
      const data = await resp.json();
      outMeters.textContent = Number(data.meters).toLocaleString(undefined, {maximumFractionDigits:6});
      outKm.textContent = Number(data.kilometers).toLocaleString(undefined, {maximumFractionDigits:6});
      resultDiv.classList.remove('hidden');
    } catch (e) {
      showError('Network error.');
      console.error(e);
    }
  }

  convertBtn.addEventListener('click', () => {
    convert(metersInput.value);
  });

  metersInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') convertBtn.click();
  });

  metersInput.value = 1500;
});
