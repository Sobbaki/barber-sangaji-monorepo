import { useI18n } from '../lib/i18n'

export default function Footer() {
  const { t } = useI18n()
  
  return (
    <div
      className='container-fluid bg-secondary text-light footer mt-5 pt-5 wow fadeIn'
      data-wow-delay='0.1s'
    >
      <div className='container py-5'>
        <div className='row g-5'>
          {/* Kolom Kontak */}
          <div className='col-lg-4 col-md-6'>
            <h4 className='text-uppercase mb-4'>{t('footer.getInTouch')}</h4>
            <div className='d-flex align-items-center mb-2'>
              <div className='btn-square bg-dark flex-shrink-0 me-3'>
                <span className='fa fa-map-marker-alt text-primary'></span>
              </div>
              <span>{t('hero.subtitle1')}</span>
            </div>
            <div className='d-flex align-items-center mb-2'>
              <div className='btn-square bg-dark flex-shrink-0 me-3'>
                <span className='fa fa-phone-alt text-primary'></span>
              </div>
              <span>+62 812-3437-9369</span>
            </div>
            <div className='d-flex align-items-center'>
              <div className='btn-square bg-dark flex-shrink-0 me-3'>
                <span className='fa fa-envelope-open text-primary'></span>
              </div>
              <span>barbersangaji@gmail.com</span>
            </div>
          </div>

          {/* Kolom Link Cepat */}
          <div className='col-lg-4 col-md-6'>
            <h4 className='text-uppercase mb-4'>{t('footer.quickLinks')}</h4>
            <a className='btn btn-link' href='/about'>
              {t('footer.aboutUs')}
            </a>
            <a className='btn btn-link' href='/contact'>
              {t('footer.contact')}
            </a>
            <a className='btn btn-link' href='/service'>
              {t('footer.ourServices')}
            </a>
            <a className='btn btn-link' href='#'>
              {t('footer.terms')}
            </a>
            <a className='btn btn-link' href='#'>
              {t('footer.support')}
            </a>
          </div>

          {/* Kolom Newsletter & Sosmed */}
          <div className='col-lg-4 col-md-6'>
            <h4 className='text-uppercase mb-4'>{t('footer.newsletter')}</h4>
            <div className='position-relative mb-4'>
              <input
                className='form-control border-0 w-100 py-3 ps-4 pe-5'
                type='text'
                placeholder={t('footer.placeholder.email')}
              />
              <button
                type='button'
                className='btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2'
              >
                {t('footer.signup')}
              </button>
            </div>
            <div className='d-flex pt-1 m-n1'>
              <a
                className='btn btn-lg-square btn-dark text-primary m-1'
                href='#'
              >
                {/* Logo X (Twitter) Terbaru */}
                <i className='fab fa-x-twitter'></i>
              </a>
              <a
                className='btn btn-lg-square btn-dark text-primary m-1'
                href='#'
              >
                <i className='fab fa-facebook-f'></i>
              </a>
              <a
                className='btn btn-lg-square btn-dark text-primary m-1'
                href='#'
              >
                <i className='fab fa-youtube'></i>
              </a>
              <a
                className='btn btn-lg-square btn-dark text-primary m-1'
                href='https://www.instagram.com/barber.sangaji?igsh=MWljNWczdGtvNXp2eA=='
              >
                <i className='fab fa-instagram'></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bagian Copyright */}
      <div className='container'>
        <div className='copyright'>
          <div className='row'>
            <div className='col-md-6 text-center text-md-start mb-3 mb-md-0'>
              &copy;{' '}
              <a className='border-bottom' href='/'>
                {t('brand.name')}
              </a>
              , {t('footer.rights')}
            </div>
            <div className='col-md-6 text-center text-md-end'>
              Developed by{' '}
              <a className='border-bottom' href='/'>
                Siaktive
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}