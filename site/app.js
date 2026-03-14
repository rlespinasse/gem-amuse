function trackEvent(path) {
  if (window.goatcounter && window.goatcounter.count) {
    window.goatcounter.count({ path: path, event: true });
  }
}

function openModal(id) {
  document.getElementById(id).classList.add('active');
  if (id === 'modal-legal') {
    trackEvent('/le-petit-coloriste/modal-legal');
  }
}

function closeModal(id) {
  document.getElementById(id).classList.remove('active');
}

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }

  var link = e.target.closest('a.cta-btn');
  if (link) {
    trackEvent('/le-petit-coloriste/gem-click');
  }
});

/* Expose globally for inline onclick handlers */
window.openModal = openModal;
window.closeModal = closeModal;
