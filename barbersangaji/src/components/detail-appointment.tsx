import { useAppointment } from '../lib/appointment-provider'
import { useI18n } from '../lib/i18n'

export default function DetailAppointment() {
    const { service, barber, distance, date, total, transportPrice } = useAppointment()
    const { t } = useI18n()

    return (
        <div className='bg-secondary' style={{ flex: '0 0 30%' }}>
            <h5 className='px-3 py-3 border-bottom'>{t('booking.details')}</h5>

            {/* Service */}
            <div className='mt-4 border-bottom px-3 d-flex gap-2 w-100'>
                <i className='fa fa-solid fa-briefcase' title='Briefcase'></i>
                <div className='flex-grow-1'>
                    <p className='mb-0' style={{ fontSize: '0.8rem' }}>{t('booking.service')}</p>
                    <div className='d-flex justify-content-between w-100'>
                        <p className='text-white'>{service?.title ? t(service.title) : '-'}</p>
                        <p className='text-primary'>{service ? `${service.price}K` : '0K'}</p>
                    </div>
                </div>
            </div>

            {/* Barber */}
            <div className='mt-3 border-bottom px-3 d-flex gap-2 w-100'>
                <i className='fa fa-solid fa-person' title='Person'></i>
                <div className='flex-grow-1'>
                    <p className='mb-0' style={{ fontSize: '0.8rem' }}>{t('booking.barber')}</p>
                    <p className='text-white'>{barber?.name ? barber.name : '-'}</p>
                </div>
            </div>

            {/* Location (Ongkir) */}
            <div className='mt-3 border-bottom px-3 d-flex gap-2 w-100'>
                <i className='fa-solid fa-location-dot' title='Marker Icon'></i>
                <div className='flex-grow-1'>
                    <p className='mb-0' style={{ fontSize: '0.8rem' }}>{t('booking.location')}</p>
                    <div className='d-flex justify-content-between w-100'>
                        <p className='text-white'>{distance !== null ? `${distance} KM` : '-'}</p>
                        {distance !== null && (
                            <p className={transportPrice === 0 ? 'text-success fw-bold' : 'text-primary'}>
                                {transportPrice === 0 ? t('booking.free') : `${transportPrice}K`}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Date */}
            <div className='mt-3 border-bottom px-3 d-flex gap-2 w-100'>
                <i className='fa-solid fa-calendar-days' title='Calendar'></i>
                <div className='flex-grow-1'>
                    <p className='mb-0' style={{ fontSize: '0.8rem' }}>{t('booking.date_time')}</p>
                    <p className='text-white'>{date ? date : '-'}</p>
                </div>
            </div>

            {/* Total Price */}
            <div className='mt-3 border-bottom px-3 d-flex gap-2 w-100'>
                <i className='fa-solid fa-calculator' title='Calculator'></i>
                <div className='flex-grow-1'>
                    <p className='mb-0' style={{ fontSize: '0.8rem' }}>{t('booking.total_price')}</p>
                    <p className='text-white mt-3 mb-5 h4 fw-bold'>{total}K</p>
                </div>
            </div>
        </div>
    )
}
