import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../lib/i18n'

export const Route = createFileRoute('/pricing')({
  component: Pricing,
})

export function Pricing() {
  const { t } = useI18n()

  return (
    <>
      <div
        className='container-fluid page-header py-5 mb-5 wow fadeIn'
        data-wow-delay='0.1s'
      >
        <div className='container text-center py-5'>
          <h1 className='display-3 text-white text-uppercase mb-3 animated slideInDown'>
            {t('pricing.title')}
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
                {t('pricing.title')}
              </li>
            </ol>
          </nav>
        </div>
      </div>

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
    </>
  )
}
