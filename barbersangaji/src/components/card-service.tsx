import { useI18n } from '../lib/i18n'

export type ServiceData = {
  image: string
  alt: string
  title: string
  description?: string
  duration: string
  price: number
}

export default function CardService({
  image,
  alt,
  title,
  duration,
}: ServiceData) {
  const { t } = useI18n()

  return (
    <div className='d-flex mb-3 gap-3'>
      <img
        style={{
          width: '80px',
          height: '80px',
          objectFit: 'cover',
          borderRadius: '8px',
        }}
        src={image}
        alt={alt}
      />
      <div>
        <h5 className='card-title'>
          <span className='badge bg-success me-2 rounded-pill'>
            {t('appointment.your_choice')}
          </span>
          {title}
        </h5>
        <p className='card-text mb-0' style={{ fontSize: '0.9rem' }}>
          {t('general.duration')}: <span className='text-white'>{duration}</span>
        </p>
        <p className='card-text text-muted'>{t('appointment.no_reviews')}</p>
      </div>
    </div>
  )
}
