import { createFileRoute } from '@tanstack/react-router'
import TestimonialCarousel from '../components/testimonial-carousel'
import { useI18n } from '../lib/i18n'

export const Route = createFileRoute('/service')({
  component: Service,
})

export function Service() {
  const { t } = useI18n()

  return (
    <>
      <div
        className='container-fluid page-header py-5 mb-5 wow fadeIn'
        data-wow-delay='0.1s'
      >
        <div className='container text-center py-5'>
          <h1 className='display-3 text-white text-uppercase mb-3 animated slideInDown'>
            {t('service.title')}
          </h1>
          <nav aria-label='breadcrumb animated slideInDown'>
            <ol className='breadcrumb justify-content-center text-uppercase mb-0'>
              <li className='breadcrumb-item'>
                <a className='text-white' href='#'>
                  {t('breadcrumb.home')}
                </a>
              </li>
              <li className='breadcrumb-item'>
                <a className='text-white' href='#'>
                  {t('breadcrumb.pages')}
                </a>
              </li>
              <li
                className='breadcrumb-item text-primary active'
                aria-current='page'
              >
                {t('service.title')}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Service Start */}
      <div className='container-xxl py-5'>
        <div className='container'>
          <div
            className='text-center mx-auto mb-5 wow fadeInUp'
            data-wow-delay='0.1s'
            style={{ maxWidth: '600px' }}
          >
            <p className='d-inline-block bg-secondary text-primary py-1 px-4'>
              {t('service.subtitle')}
            </p>
            <h1 className='text-uppercase'>{t('service.heading')}</h1>
          </div>

          {/* justify-content-center ditambahkan di sini agar item ganjil tetap di tengah */}
          <div className='row g-4 justify-content-center'>
            
            {/* Service 1: Haircut */}
            <div
              className='col-lg-4 col-md-6 wow fadeInUp'
              data-wow-delay='0.1s'
            >
              <div className='service-item position-relative overflow-hidden bg-secondary d-flex h-100 p-5 ps-0'>
                <div
                  className='bg-dark d-flex flex-shrink-0 align-items-center justify-content-center'
                  style={{ width: '60px', height: '60px' }}
                >
                  <img
                    className='img-fluid'
                    src='/img/haircut.png'
                    alt='Haircut Image'
                  />
                </div>
                <div className='ps-4'>
                  <h3 className='text-uppercase mb-3'>{t('service.haircut.title')}</h3>
                  <p>{t('service.haircut.desc')}</p>
                  <span className='text-uppercase text-primary'>{t('service.haircut.price')}</span>
                </div>
                <a className='btn btn-square' href='appointment?service=1'>
                  <i className='fa fa-plus text-primary'></i>
                </a>
              </div>
            </div>

            {/* Service 2: Beard Trim */}
            <div
              className='col-lg-4 col-md-6 wow fadeInUp'
              data-wow-delay='0.3s'
            >
              <div className='service-item position-relative overflow-hidden bg-secondary d-flex h-100 p-5 ps-0'>
                <div
                  className='bg-dark d-flex flex-shrink-0 align-items-center justify-content-center'
                  style={{ width: '60px', height: '60px' }}
                >
                  <img
                    className='img-fluid'
                    src='/img/beard-trim.png'
                    alt='Beard Trim Image'
                  />
                </div>
                <div className='ps-4'>
                  <h3 className='text-uppercase mb-3'>{t('service.beard.title')}</h3>
                  <p>{t('service.beard.desc')}</p>
                  <span className='text-uppercase text-primary'>{t('service.beard.price')}</span>
                </div>
                <a className='btn btn-square' href='appointment?service=2'>
                  <i className='fa fa-plus text-primary'></i>
                </a>
              </div>
            </div>

            {/* Service 3: Hair Dyeing */}
            <div
              className='col-lg-4 col-md-6 wow fadeInUp'
              data-wow-delay='0.5s'
            >
              <div className='service-item position-relative overflow-hidden bg-secondary d-flex h-100 p-5 ps-0'>
                <div
                  className='bg-dark d-flex flex-shrink-0 align-items-center justify-content-center'
                  style={{ width: '60px', height: '60px' }}
                >
                  <img className='img-fluid' src='/img/hair-dyeing.png' alt='Hair Dyeing Image' />
                </div>
                <div className='ps-4'>
                  <h3 className='text-uppercase mb-3'>{t('service.dye.title')}</h3>
                  <p>{t('service.dye.desc')}</p>
                  <span className='text-uppercase text-primary'>{t('service.dye.price')}</span>
                </div>
                <a className='btn btn-square' href='appointment?service=3'>
                  <i className='fa fa-plus text-primary'></i>
                </a>
              </div>
            </div>

            {/* Service 4: Mustache - Otomatis Center */}
            <div
              className='col-lg-4 col-md-6 wow fadeInUp'
              data-wow-delay='0.1s'
            >
              <div className='service-item position-relative overflow-hidden bg-secondary d-flex h-100 p-5 ps-0'>
                <div
                  className='bg-dark d-flex flex-shrink-0 align-items-center justify-content-center'
                  style={{ width: '60px', height: '60px' }}
                >
                  <img
                    className='img-fluid'
                    src='/img/mustache.png'
                    alt='Mustache Image'
                  />
                </div>
                <div className='ps-4'>
                  <h3 className='text-uppercase mb-3'>{t('service.mustache.title')}</h3>
                  <p>{t('service.mustache.desc')}</p>
                  <span className='text-uppercase text-primary'>{t('service.mustache.price')}</span>
                </div>
                <a className='btn btn-square' href='appointment?service=4'>
                  <i className='fa fa-plus text-primary'></i>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Service End */}

      <div className='container-xxl py-5'>
        <div className='container'>
          <div
            className='text-center mx-auto mb-5 wow fadeInUp'
            data-wow-delay='0.1s'
            style={{ maxWidth: '600px' }}
          >
            <p className='d-inline-block bg-secondary text-primary py-1 px-4'>
              {t('testimonial.subtitle')}
            </p>
            <h1 className='text-uppercase'>{t('testimonial.heading')}</h1>
          </div>
          <TestimonialCarousel />
        </div>
      </div>
    </>
  )
}