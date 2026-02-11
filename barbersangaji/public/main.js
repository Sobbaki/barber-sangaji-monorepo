;(function ($) {
  'use strict'
})(jQuery)

$(document).ready(function () {
  // Cek apakah WOW ada sebelum init agar tidak error di console
  if (typeof WOW !== 'undefined') {
    new WOW().init()
  }

  // --- BAGIAN INI WAJIB DIMATIKAN/DIHAPUS ---
  // Kode inilah yang menyebabkan navbar berkedip/crash karena bentrok dengan React
  /*
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $('.sticky-top').addClass('shadow-sm').css('top', '0px')
    } else {
      $('.sticky-top').removeClass('shadow-sm').css('top', '-100px')
    }
  })
  */
  // ------------------------------------------
})

// Logika animasi tombol (Aman, tidak perlu diubah)
document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', () => {
    button.classList.add('clicked')
    setTimeout(() => {
      button.classList.remove('clicked')
    }, 300)
  })
})

// Logika Video (Aman, tidak perlu diubah)
function playVideo(imgElement) {
  const videoElement = imgElement.nextElementSibling
  imgElement.style.display = 'none'
  videoElement.style.display = 'block'
  videoElement.play()
}