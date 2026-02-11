import { createFileRoute } from '@tanstack/react-router'
import Carousel from '../components/carousel'
import TestimonialCarousel from '../components/testimonial-carousel'
import { useI18n } from '../lib/i18n'

export const Route = createFileRoute('/')({
  component: Index,
})

export function Index() {
  const { t } = useI18n()

  return (
    <>
      <Carousel />

      {/* About Start */}
      <div className='container-xxl py-5'>
        <div className='container'>
          <div className='row g-5'>
            <div className='col-lg-6 wow fadeIn' data-wow-delay='0.1s'>
              <div className='d-flex flex-column position-relative'>
                <img
                  className='img-fluid w-75 align-self-end'
                  src='/img/team-1.jpg'
                  alt='About Image'
                  style={{ minHeight: '300px', objectFit: 'cover', backgroundColor: '#343a40' }}
                />
                <div
                  className='w-50 bg-secondary p-5'
                  style={{ marginTop: '-25%', zIndex: 1, position: 'relative' }}
                >
                  <h1 className='text-uppercase text-primary mb-3'>{t('about.experience.years')}</h1>
                  <h2 className='text-uppercase mb-0'>{t('about.experience.title')}</h2>
                </div>
              </div>
            </div>
            <div className='col-lg-6 wow fadeIn' data-wow-delay='0.5s'>
              <p className='d-inline-block bg-secondary text-primary py-1 px-4'>
                {t('about.us')}
              </p>
              <h1 className='text-uppercase mb-4'>
                {t('about.heading')}
              </h1>
              <p>
                {t('about.desc1')}
              </p>
              <p className='mb-4'>
                {' '}
                {t('about.desc2')}
              </p>
              <div className='row g-4'>
                <div className='col-md-6'>
                  <h3 className='text-uppercase mb-3'>{t('about.since.title')}</h3>
                  <p className='mb-0'>
                    {t('about.since.desc')}
                  </p>
                </div>
                <div className='col-md-6'>
                  <h3 className='text-uppercase mb-3'>{t('about.clients.title')}</h3>
                  <p className='mb-0'>
                    {t('about.clients.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

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

          {/* PERUBAHAN DI SINI: tambahkan 'justify-content-center' */}
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
                  <p>
                    {t('service.haircut.desc')}
                  </p>
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
                  <p>
                    {t('service.beard.desc')}
                  </p>
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
              data-wow-delay='0.1s'
            >
              <div className='service-item position-relative overflow-hidden bg-secondary d-flex h-100 p-5 ps-0'>
                <div
                  className='bg-dark d-flex flex-shrink-0 align-items-center justify-content-center'
                  style={{ width: '60px', height: '60px' }}
                >
                  <img
                    className='img-fluid'
                    src='/img/hair-dyeing.png'
                    alt='Hair Dyeing Image'
                  />
                </div>
                <div className='ps-4'>
                  <h3 className='text-uppercase mb-3'>{t('service.dye.title')}</h3>
                  <p>
                    {t('service.dye.desc')}
                  </p>
                  <span className='text-uppercase text-primary'>{t('service.dye.price')}</span>
                </div>
                <a className='btn btn-square' href='appointment?service=3'>
                  <i className='fa fa-plus text-primary'></i>
                </a>
              </div>
            </div>

            {/* Service 4: Mustache */}
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
                    src='/img/mustache.png'
                    alt='Mustache Image'
                  />
                </div>
                <div className='ps-4'>
                  <h3 className='text-uppercase mb-3'>{t('service.mustache.title')}</h3>
                  <p>
                    {t('service.mustache.desc')}
                  </p>
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

      {/* Price Start */}
      <div className='container-xxl py-5'>
        <div className='container'>
          <div className='row g-0'>
            <div className='col-lg-6 wow fadeIn' data-wow-delay='0.1s'>
              <div className='bg-secondary h-100 d-flex flex-column justify-content-center p-5'>
                <p className='d-inline-flex bg-dark text-primary py-1 px-4 me-auto'>
                  {t('pricing.subtitle')}
                </p>
                <h1 className='text-uppercase mb-4'>
                  {t('pricing.heading')}
                </h1>
                <div>
                  <div className='d-flex justify-content-between border-bottom py-2'>
                    <h6 className='text-uppercase mb-0'>{t('service.haircut.title')}</h6>
                    <span className='text-uppercase text-primary'>15K</span>
                  </div>
                  <div className='d-flex justify-content-between border-bottom py-2'>
                    <h6 className='text-uppercase mb-0'>{t('service.beard.title')}</h6>
                    <span className='text-uppercase text-primary'>5K</span>
                  </div>
                  <div className='d-flex justify-content-between border-bottom py-2'>
                    <h6 className='text-uppercase mb-0'>{t('service.dye.title')}</h6>
                    <span className='text-uppercase text-primary'>
                      90K - 150K
                    </span>
                  </div>
                  <div className='d-flex justify-content-between border-bottom py-2'>
                    <h6 className='text-uppercase mb-0'>{t('service.mustache.title')}</h6>
                    <span className='text-uppercase text-primary'>5K</span>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-6 wow fadeIn' data-wow-delay='0.5s'>
              <div className='h-100'>
                <img
                  className='img-fluid h-100'
                  src='/img/price.jpg'
                  alt='Price Image'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Price End */}

      {/* Team Start */}
      <div className='container-xxl py-5'>
        <div className='container'>
          <div
            className='text-center mx-auto mb-5 wow fadeInUp'
            data-wow-delay='0.1s'
            style={{ maxWidth: '600px' }}
          >
            <p className='d-inline-block bg-secondary text-primary py-1 px-4'>
              {t('about.our.barber')}
            </p>
            <h1 className='text-uppercase'>{t('about.meet.barber')}</h1>
          </div>

          {/* PERUBAHAN ADA DI SINI: tambahkan 'justify-content-center' */}
          <div className='row g-4 justify-content-center'>

            {/* Item 1 */}
            <div
              className='col-lg-3 col-md-6 wow fadeInUp'
              data-wow-delay='0.1s'
            >
              <div className='team-item'>
                <div className='team-img position-relative overflow-hidden'>
                  <img
                    className='img-fluid'
                    src='/img/team-1.jpg'
                    alt='Team 1 Image'
                  />
                  <div className='team-social'>
                    <a className='btn btn-square' href=''>
                      <i className='fab fa-facebook-f'></i>
                    </a>
                    <a className='btn btn-square' href=''>
                      <i className='fab fa-twitter'></i>
                    </a>
                    <a className='btn btn-square' href=''>
                      <i className='fab fa-instagram'></i>
                    </a>
                  </div>
                </div>
                <div className='bg-secondary text-center p-4'>
                  <h5 className='text-uppercase'>CRAWL</h5>
                  <span className='text-primary'>capster</span>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div
              className='col-lg-3 col-md-6 wow fadeInUp'
              data-wow-delay='0.3s'
            >
              <div className='team-item'>
                <div className='team-img position-relative overflow-hidden'>
                  <img
                    className='img-fluid'
                    src='/img/team-2.jpg'
                    alt='Team 2 Image'
                  />
                  <div className='team-social'>
                    <a className='btn btn-square' href=''>
                      <i className='fab fa-facebook-f'></i>
                    </a>
                    <a className='btn btn-square' href=''>
                      <i className='fab fa-twitter'></i>
                    </a>
                    <a className='btn btn-square' href=''>
                      <i className='fab fa-instagram'></i>
                    </a>
                  </div>
                </div>
                <div className='bg-secondary text-center p-4'>
                  <h5 className='text-uppercase'>BADRUT</h5>
                  <span className='text-primary'>capster</span>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div
              className='col-lg-3 col-md-6 wow fadeInUp'
              data-wow-delay='0.5s'
            >
              <div className='team-item'>
                <div className='team-img position-relative overflow-hidden'>
                  <img
                    className='img-fluid'
                    src='/img/team-3.jpg'
                    alt='Team 3 Image'
                  />
                  <div className='team-social'>
                    <a className='btn btn-square' href=''>
                      <i className='fab fa-facebook-f'></i>
                    </a>
                    <a className='btn btn-square' href=''>
                      <i className='fab fa-twitter'></i>
                    </a>
                    <a className='btn btn-square' href='https://www.instagram.com/barber.sangaji?igsh=MXhoYW1mNTkwMnJmdA=='>
                      <i className='fab fa-instagram'></i>
                    </a>
                  </div>
                </div>
                <div className='bg-secondary text-center p-4'>
                  <h5 className='text-uppercase'>AGUS</h5>
                  <span className='text-primary'>capster</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* Team End */}

      {/* Working Hours Start */}
      <div className='container-xxl py-5'>
        <div className='container'>
          <div className='row g-0'>
            <div className='col-lg-6 wow fadeIn' data-wow-delay='0.1s'>
              <div className='h-100'>
                <img
                  className='img-fluid h-100'
                  src='/img/open.jpg'
                  alt='Open Image'
                />
              </div>
            </div>
            <div className='col-lg-6 wow fadeIn' data-wow-delay='0.5s'>
              <div className='bg-secondary h-100 d-flex flex-column justify-content-center p-5'>
                <p className='d-inline-flex bg-dark text-primary py-1 px-4 me-auto'>
                  {t('open.subtitle')}
                </p>
                <h1 className='text-uppercase mb-4'>
                  {t('open.heading')}
                </h1>
                <div>
                  <div className='d-flex justify-content-between border-bottom py-2'>
                    <h6 className='text-uppercase mb-0'>{t('open.day.monday')}</h6>
                    <span className='text-uppercase'>04 PM - 10 PM</span>
                  </div>
                  <div className='d-flex justify-content-between border-bottom py-2'>
                    <h6 className='text-uppercase mb-0'>{t('open.day.tuesday')}</h6>
                    <span className='text-uppercase'>04 PM - 10 PM</span>
                  </div>
                  <div className='d-flex justify-content-between border-bottom py-2'>
                    <h6 className='text-uppercase mb-0'>{t('open.day.wednesday')}</h6>
                    <span className='text-uppercase'>04 PM - 10 PM</span>
                  </div>
                  <div className='d-flex justify-content-between border-bottom py-2'>
                    <h6 className='text-uppercase mb-0'>{t('open.day.thursday')}</h6>
                    <span className='text-uppercase'>04 PM - 10 PM</span>
                  </div>
                  <div className='d-flex justify-content-between border-bottom py-2'>
                    <h6 className='text-uppercase mb-0'>{t('open.day.friday')}</h6>
                    <span className='text-uppercase'>02 PM - 10 PM</span>
                  </div>
                  <div className='d-flex justify-content-between border-bottom py-2'>
                    <h6 className='text-uppercase mb-0'>{t('open.day.saturday')}</h6>
                    <span className='text-uppercase'>10 AM - 10 PM</span>
                  </div>
                  <div className='d-flex justify-content-between border-bottom py-2'>
                    <h6 className='text-uppercase mb-0'>{t('open.day.sunday')}</h6>
                    <span className='text-uppercase'>10 AM - 10 PM</span>
                  </div>
                  <div className='d-flex justify-content-between py-2'>
                    <h6 className='text-uppercase mb-0'>
                      {t('open.note.closed')}
                    </h6>
                    <span className='text-uppercase text-primary'>
                      {t('open.time.closed')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Working Hours End */}

      {/* Testimonial Start */}
      <TestimonialCarousel />
      {/* Testimonial End */}
    </>
  )
}
