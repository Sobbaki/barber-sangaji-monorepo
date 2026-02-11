import { useEffect, useRef } from 'react'

export default function Spinner() {
  const spinnerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setTimeout(() => {
      spinnerRef.current?.classList.remove('show')
    }, 1000)
  }, [])

  return (
    <div
      id='spinner'
      className='show bg-dark position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center'
      ref={spinnerRef}
    >
      <div
        className='spinner-grow text-primary'
        style={{ width: '3rem', height: '3rem' }}
        role='status'
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )
}
