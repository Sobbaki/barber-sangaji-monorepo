import { useI18n } from '../lib/i18n'

export default function Carousel() {
  const { t } = useI18n()

  return (
    <div className='container-fluid p-0 mb-5 wow fadeIn' data-wow-delay='0.1s'>
      <div
        id='header-carousel'
        className='carousel slide'
        data-bs-ride='carousel'
      >
        <div className='carousel-inner'>
          <div className='carousel-item active' style={{ height: '100vh', minHeight: '600px', position: 'relative', backgroundColor: '#191c24' }}>
            <img className='w-100 h-100' src='/img/carousel-1.jpg' alt='Image' style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
            <div className='carousel-caption d-flex align-items-center justify-content-center text-start w-100 h-100' style={{ zIndex: 1 }}>
              <div className='mx-sm-5 px-5' style={{ maxWidth: '900px' }}>
                <h1 className='display-2 text-white text-uppercase mb-4 animated slideInDown'>
                  {t('hero.title1')}
                </h1>
                <h4 className='text-white text-uppercase mb-4 animated slideInDown'>
                  <i className='fa fa-map-marker-alt text-primary me-3'></i>
                  {t('hero.subtitle1')}
                </h4>
                <h4 className='text-white text-uppercase mb-4 animated slideInDown'>
                  <i className='fa fa-phone-alt text-primary me-3'></i>
                  +62 812-3437-9369
                </h4>
              </div>
            </div>
          </div>
          <div className='carousel-item' style={{ height: '100vh', minHeight: '600px', position: 'relative', backgroundColor: '#191c24' }}>
            <img className='w-100 h-100' src='/img/carousel-2.jpg' alt='Image' style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} />
            <div className='carousel-caption d-flex align-items-center justify-content-center text-start w-100 h-100' style={{ zIndex: 1 }}>
              <div className='mx-sm-5 px-5' style={{ maxWidth: '900px' }}>
                <h1 className='display-2 text-white text-uppercase mb-4 animated slideInDown'>
                  {t('hero.title2')}
                </h1>
                <h4 className='text-white text-uppercase mb-4 animated slideInDown'>
                  <i className='fa fa-map-marker-alt text-primary me-3'></i>
                  {t('hero.subtitle1')}
                </h4>
                <h4 className='text-white text-uppercase mb-4 animated slideInDown'>
                  <i className='fa fa-phone-alt text-primary me-3'></i>
                  +62 812-3437-9369
                </h4>
              </div>
            </div>
          </div>
        </div>
        <button
          className='carousel-control-prev'
          type='button'
          data-bs-target='#header-carousel'
          data-bs-slide='prev'
        >
          <span
            className='carousel-control-prev-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Previous</span>
        </button>
        <button
          className='carousel-control-next'
          type='button'
          data-bs-target='#header-carousel'
          data-bs-slide='next'
        >
          <span
            className='carousel-control-next-icon'
            aria-hidden='true'
          ></span>
          <span className='visually-hidden'>Next</span>
        </button>
      </div>
    </div>
  )
}
