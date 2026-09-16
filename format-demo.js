// Isolated landing-page demonstration. No document access or file export.
for (const form of document.querySelectorAll('.format-controls')) {
  const preview = document.getElementById(`${form.dataset.format}-preview`);
  if (!preview) continue;
  const inputs = [...form.querySelectorAll('input[type="range"]')];
  function render() {
    for (const input of inputs) {
      const value = Number(input.value);
      const unit = input.dataset.unit;
      preview.style.setProperty(`--demo-${input.name}`, input.name === 'leading' ? String(value / 100) : `${value}${unit}`);
      form.querySelector(`output[for="${input.id}"]`).textContent = `${value}${unit}`;
      input.setAttribute('aria-valuetext', `${value}${unit}`);
    }
  }
  form.addEventListener('input', render);
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', () => {
    // Reset values explicitly before rendering instead of waiting on the default action.
    for (const input of inputs) input.value = input.defaultValue;
    render();
  });
  render();
}
