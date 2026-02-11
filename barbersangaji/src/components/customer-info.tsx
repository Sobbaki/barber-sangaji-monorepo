import { useState, useEffect } from 'react'
import { useAppointment } from '../lib/appointment-provider'
import { useI18n } from '../lib/i18n'

export default function CustomerInfo() {
    const { customerInfo, handleSetCustomerInfo, handleBookNow } = useAppointment()
    const { t } = useI18n()

    const [save, setSave] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState('')

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        if (/^\d*$/.test(value)) {
            handleSetCustomerInfo({ phone: value })
        } else {
            setToastMessage(t('customer.error.phone_number'))
            setShowToast(true)
        }
    }

    const validateForm = () => {
        const { name, email, phone } = customerInfo || {}

        if (!name || !email || !phone) {
            setToastMessage(t('customer.error.required'))
            setShowToast(true)
            return false
        }

        if (phone.length < 10) {
            setToastMessage(t('customer.error.phone_invalid'))
            setShowToast(true)
            return false
        }

        return true
    }

    const handleBooking = () => {
        if (validateForm()) {
            handleBookNow()
        }
    }

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 3000)
            return () => clearTimeout(timer)
        }
    }, [showToast])

    return (
        <>
            <form>
                <div className='row'>
                    <div className='col'>
                        <label htmlFor='name' className='text-white mb-1'>
                            {t('customer.name')} <span className='text-danger'>*</span>
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            placeholder={t('customer.placeholder.name')}
                            onChange={(event) => handleSetCustomerInfo({ name: event.target.value })}
                            value={customerInfo?.name || ''}
                            required
                        />
                    </div>
                    <div className='col'>
                        <label htmlFor='email' className='text-white mb-1'>
                            {t('customer.email')} <span className='text-danger'>*</span>
                        </label>
                        <input
                            type='email'
                            className='form-control'
                            id='email'
                            placeholder={t('customer.placeholder.email')}
                            onChange={(event) => handleSetCustomerInfo({ email: event.target.value })}
                            value={customerInfo?.email || ''}
                            required
                        />
                    </div>
                </div>

                <div className='row mt-3'>
                    <div className='col'>
                        <label htmlFor='phone' className='text-white mb-1'>
                            {t('customer.phone')} <span className='text-danger'>*</span>
                        </label>
                        <input
                            type='tel'
                            className='form-control'
                            id='phone'
                            placeholder={t('customer.placeholder.phone')}
                            onChange={handlePhoneChange}
                            value={customerInfo?.phone || ''}
                            required
                        />
                    </div>
                    <div className='col'>
                        <label htmlFor='allergies' className='text-white mb-1'>
                            {t('customer.allergies')}
                        </label>
                        <input
                            type='text'
                            className='form-control'
                            id='allergies'
                            placeholder={t('customer.placeholder.allergies')}
                            onChange={(event) => handleSetCustomerInfo({ allergies: event.target.value })}
                            value={customerInfo?.allergies || ''}
                        />
                    </div>
                </div>

                <div className='form-group mt-3'>
                    <div className='form-check'>
                        <input
                            className='form-check-input'
                            type='checkbox'
                            id='gridCheck'
                            onChange={(event) => setSave(event.target.checked)}
                            checked={save}
                        />
                        <label className='form-check-label text-white' htmlFor='gridCheck'>
                            {t('customer.save')}
                        </label>
                    </div>
                </div>

                {/* Inline Error Notification */}
                {showToast && (
                    <div className='mt-3 animate-fade-in'>
                        <div
                            className='d-flex align-items-center p-3 rounded-3 border border-danger-subtle'
                            style={{
                                backgroundColor: '#fff5f5',
                                color: '#dc3545',
                                boxShadow: '0 4px 6px -1px rgba(220, 53, 69, 0.1)'
                            }}
                            role='alert'
                        >
                            <div className='d-flex align-items-center flex-grow-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-exclamation-circle-fill flex-shrink-0 me-2" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                </svg>
                                <div>
                                    <div className='fw-bold' style={{ fontSize: '0.9rem' }}>Perhatian</div>
                                    <div style={{ fontSize: '0.85rem' }}>{toastMessage}</div>
                                </div>
                            </div>
                            <button
                                type='button'
                                className='btn-close ms-2'
                                aria-label='Close'
                                onClick={() => setShowToast(false)}
                                style={{ fontSize: '0.8rem' }}
                            ></button>
                        </div>
                    </div>
                )}

                <div className='d-flex justify-content-end'>
                    <button
                        type='button'
                        className='btn btn-primary mt-3'
                        onClick={handleBooking}
                    >
                        {t('customer.book_now')}
                    </button>
                </div>
            </form>
        </>
    )
}
