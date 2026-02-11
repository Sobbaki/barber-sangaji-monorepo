import { createFileRoute } from '@tanstack/react-router'
import TestimonialCarousel from '../components/testimonial-carousel'
import { useI18n } from '../lib/i18n'

export const Route = createFileRoute('/testimonial')({
  component: Testimonial,
})

export function Testimonial() {
  const { t } = useI18n()

  return (
    <>
      <div
        className='container-fluid page-header py-5 mb-5 wow fadeIn'
        data-wow-delay='0.1s'
      >
        <div className='container text-center py-5'>
          <h1 className='display-3 text-white text-uppercase mb-3 animated slideInDown'>
            {t('testimonial.title')}
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
                {t('testimonial.title')}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className='container-xxl py-5'>
        <div className='container'>
          <div
            className='text-center mx-auto mb-5'
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
