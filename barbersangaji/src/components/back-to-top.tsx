import { useEffect } from 'react'

export default function BackToTop() {
  useEffect(() => {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow')
      } else {
        $('.back-to-top').fadeOut('slow')
      }
    })
    $('.back-to-top').click(function () {
      console.log('back-to-top')
      $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo')
      return false
    })
  }, [])

  return (
    <a
      href='#'
      className='btn btn-primary btn-lg-square back-to-top'
      aria-label='Back To Top Button'
    >
      <i className='bi bi-arrow-up'></i>
    </a>
  )
}
