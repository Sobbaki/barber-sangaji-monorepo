import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../lib/i18n'

export const Route = createFileRoute('/open')({
  component: Open,
})

export function Open() {
  const { t } = useI18n()

  return (
    <>
      <div
        className='container-fluid page-header py-5 mb-5 wow fadeIn'
        data-wow-delay='0.1s'
      >
        <div className='container text-center py-5'>
          <h1 className='display-3 text-white text-uppercase mb-3 animated slideInDown'>
            {t('open.title')}
          </h1>
          <nav aria-label='breadcrumb animated slideInDown'>
            <ol className='breadcrumb justify-content-center text-uppercase mb-0'>
              <li className='breadcrumb-item'>
                <a className='text-white' href='/'>
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
                {t('open.title')}
              </li>
            </ol>
          </nav>
        </div>
      </div>

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
    </>
  )
}
