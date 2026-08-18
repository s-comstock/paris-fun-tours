// Copyright Year Auto-Update
const currentYear = new Date().getFullYear();
document.querySelectorAll('[data="year"]').forEach(el => {
  el.textContent = currentYear;
});
