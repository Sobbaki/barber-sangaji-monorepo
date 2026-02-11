import { createFileRoute, Link } from '@tanstack/react-router'
import { ServiceData } from '../components/card-service'
import AppointmentService from '../components/appointment-service'
import { useI18n } from '../lib/i18n'

type AppointmentSearch = {
  service?: number
}

export const Route = createFileRoute('/appointment')({
  validateSearch: (search: Record<string, unknown>): AppointmentSearch => {
    if (search.service)
      return {
        service: Number(search?.service),
      }
    return {}
  },
  component: Appointment,
})

// Data layanan menggunakan key i18n untuk lokalisasi teks
export const serviceData: ServiceData[] = [
  {
    image: '/img/carousel-2.jpg',
    alt: 'Haircut Image',
    duration: '45m',
    description: 'service.haircut.desc',
    title: 'service.haircut.title',
    price: 15,
  },
  {
    image: '/img/beardtrim.jpg',
    alt: 'Beard Trim Image',
    duration: '15m',
    title: 'service.beard.title',
    description: 'service.beard.desc',
    price: 5,
  },
  {
    image: '/img/fullnih.png',
    alt: 'Hair Dyeing Image',
    duration: '3h',
    title: 'service.dye.title',
    description: 'service.dye.desc',
    price: 90,
  },
  {
    image: '/img/mustache.jpg',
    alt: 'Mustache Image',
    duration: '15m',
    title: 'service.mustache.title',
    description: 'service.mustache.desc',
    price: 5,
  },
]

export function Appointment() {
  const { service } = Route.useSearch()
  const { t } = useI18n()

  // Jika ada ID service di URL, tampilkan form appointment khusus
  if (service && service > 0 && service <= 5)
    return <AppointmentService service={service} />

  return (
    <div className='container-xxl py-5'>
      <div className='container'>
        {/* Header Section */}
        <div
          className='text-center mx-auto mb-5 wow fadeInUp'
          data-wow-delay='0.1s'
          style={{ maxWidth: '600px' }}
        >
          <p className='d-inline-block bg-secondary text-primary py-1 px-4'>
            {t('nav.appointment')}
          </p>
          <h1 className='text-uppercase'>{t('service.heading')}</h1>
        </div>

        {/* Grid Section 
          'justify-content-center' memastikan baris terakhir yang berisi 
          jumlah item ganjil (seperti kartu ke-4) tetap berada di posisi tengah.
        */}
        <div className='row g-4 justify-content-center'>
          {serviceData.map(
            ({ image, price, duration, title, alt, description }, index) => (
              <div
                className='col-lg-4 col-md-6 wow fadeInUp'
                data-wow-delay='0.1s'
                key={index}
              >
                <div className='appointment-item position-relative overflow-hidden bg-secondary h-100 d-flex flex-column'>
                  
                  {/* Image Container dengan Aspect Ratio tetap (4:3) */}
                  <div
                    className='w-100 position-relative'
                    style={{ aspectRatio: '4 / 3', overflow: 'hidden' }}
                  >
                    <img
                      src={image}
                      alt={alt}
                      className='w-100 h-100'
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                        display: 'block',
                      }}
                    />
                    {/* Badge Kiri (Label) */}
                    <span
                      className='badge rounded-pill position-absolute z-1'
                      style={{
                        left: 10,
                        top: 10,
                        backgroundColor: 'var(--primary)',
                      }}
                    >
                      Primary
                    </span>
                    {/* Badge Kanan (Harga) */}
                    <span
                      className='badge rounded-pill position-absolute z-1'
                      style={{
                        right: 10,
                        top: 10,
                        backgroundColor: 'var(--light-subtle)',
                      }}
                    >
                      {price} K
                    </span>
                  </div>

                  {/* Content Section */}
                  <div className='p-4 flex-grow-1 d-flex flex-column justify-content-between'>
                    <div>
                      <h3 className='text-uppercase mb-3'>{t(title)}</h3>
                      <p className='mb-1'>
                        <strong>{t('general.duration')}:</strong> {duration}
                      </p>
                      <p className='text-muted small'>{t(description)}</p>
                      <span className='text-uppercase text-primary d-block fw-bold'>
                        {t('general.from')} {price}K
                      </span>
                    </div>
                    
                    {/* Tombol Booking */}
                    <Link
                      to='/appointment'
                      search={{ service: index + 1 }}
                    >
                      <button type='button' className='btn btn-primary w-100 mt-3'>
                        {t('general.book_now')}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}