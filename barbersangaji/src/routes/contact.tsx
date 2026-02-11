import { createFileRoute } from '@tanstack/react-router'
import { useI18n } from '../lib/i18n'

export const Route = createFileRoute('/contact')({
  component: Contact,
})

export function Contact() {
  const { t } = useI18n()
  
  return (
    <>
      <div
        className='container-fluid page-header py-5 mb-5 wow fadeIn'
        data-wow-delay='0.1s'
      >
        <div className='container text-center py-5'>
          <h1 className='display-3 text-white text-uppercase mb-3 animated slideInDown'>
            {t('contact.title')}
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
                {t('contact.title')}
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className='container-xxl py-5'>
        <div className='container'>
          <div className='row g-0'>
            <div className='col-lg-6 wow fadeIn' data-wow-delay='0.1s'>
              <div className='bg-secondary p-5'>
                <p className='d-inline-block bg-dark text-primary py-1 px-4'>
                  {t('contact.subtitle')}
                </p>
                <h1 className='text-uppercase mb-4'>
                  {t('contact.heading')}
                </h1>
                <p className='mb-4'>{t('contact.form.inactive')}</p>
                <form>
                  <div className='row g-3'>
                    <div className='col-md-6'>
                      <div className='form-floating'>
                        <input
                          type='text'
                          className='form-control bg-transparent'
                          id='name'
                          placeholder={t('contact.form.name')}
                        />
                        <label htmlFor='name'>{t('contact.form.name')}</label>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='form-floating'>
                        <input
                          type='email'
                          className='form-control bg-transparent'
                          id='email'
                          placeholder={t('contact.form.email')}
                        />
                        <label htmlFor='email'>{t('contact.form.email')}</label>
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='form-floating'>
                        <input
                          type='text'
                          className='form-control bg-transparent'
                          id='subject'
                          placeholder={t('contact.form.subject')}
                        />
                        <label htmlFor='subject'>{t('contact.form.subject')}</label>
                      </div>
                    </div>
                    <div className='col-12'>
                      <div className='form-floating'>
                        <textarea
                          className='form-control bg-transparent'
                          placeholder={t('contact.form.placeholder.message')}
                          id='message'
                          style={{ height: '100px' }}
                        ></textarea>
                        <label htmlFor='message'>{t('contact.form.message')}</label>
                      </div>
                    </div>
                    <div className='col-12'>
                      <button
                        className='btn btn-primary w-100 py-3'
                        type='submit'
                      >
                        {t('contact.form.submit')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className='col-lg-6 wow fadeIn' data-wow-delay='0.5s'>
              <div className='h-100' style={{ minHeight: '400px' }}>
                <iframe
                  className='google-map w-100 h-100'
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1976.5600344048933!2d110.36517338836661!3d-7.777091440519798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a58379e52b547%3A0x626c8f31cbb9ed93!2sJl.%20A.M.%20Sangaji%20No.47%2C%20Cokrodiningratan%2C%20Kec.%20Jetis%2C%20Kota%20Yogyakarta%2C%20Daerah%20Istimewa%20Yogyakarta%2055233!5e0!3m2!1sen!2sid!4v1727927807346!5m2!1sen!2sid'
                  frameBorder='0'
                  aria-hidden='false'
                  tabIndex={0}
                  style={{
                    filter: 'grayscale(100%) invert(92%) contrast(83%)',
                    border: '0',
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
