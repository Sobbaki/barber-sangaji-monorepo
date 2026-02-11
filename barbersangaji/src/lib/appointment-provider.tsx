import { createContext, useContext, useMemo, useState } from 'react'
import { ServiceData } from '../components/card-service'
import { Extra } from '../components/choose-extras'
import { type LatLngTuple } from 'leaflet'

export type Barber = {
  image: string
  alt: string
  name: string
  description: string
}

export type CustomerInfo = {
  name?: string
  phone?: string
  email?: string
  allergies?: string
}

type AppointmentContextType = {
  service: ServiceData | null
  extras: Extra[]
  barber: Barber | null
  coordinate: LatLngTuple
  distance: number | null
  date: string | null
  customerInfo: CustomerInfo | null
  total: number
  transportPrice: number
  handleSelectedService: (service: ServiceData) => void
  handleAddExtras: (extras: Extra) => void
  handleRemoveExtras: (data: Extra) => void
  handleSelectedBarber: (barber: Barber) => void
  handleSetCoordinate: (coordinate: LatLngTuple) => void
  handleSetDistance: (location: number) => void
  handleSetDate: (date: string) => void
  handleSetCustomerInfo: (customerInfo: CustomerInfo) => void
  handleBookNow: () => void
}

export const AppointmentContext = createContext<AppointmentContextType | undefined>(
  undefined
)

export const AppointmentProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // --- States ---
  const [service, setService] = useState<ServiceData | null>(null)
  const [extras, setExtras] = useState<Extra[]>([])
  const [barber, setBarber] = useState<Barber | null>(null)
  const [coordinate, setCoordinate] = useState<LatLngTuple>([
    -7.782512147800219, 110.36697137276111,
  ])
  const [distance, setDistance] = useState<number | null>(null)
  const [date, setDate] = useState<string | null>(null)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null)

  // --- LOGIKA HARGA OTOMATIS (Derived State) ---
  const transportPrice = useMemo(() => {
    if (distance === null) return 0

    const baseOngkir = 12 // 12K (Flat 1 - 3 KM)
    const tarifPerKm = 4  // 4K per KM (Kelebihan > 3 KM)

    // UPDATE LOGIKA:
    if (distance < 1) {
      // Jarak di bawah 1 KM (misal 0.9) = GRATIS
      return 0
    } else if (distance <= 3) {
      // Jarak 1.0 KM sampai 3.0 KM = FLAT 12K
      return baseOngkir
    } else {
      // Jarak > 3 KM: 12K + (Sisa KM * 4K)
      const extraDistance = distance - 3
      const rawOngkir = baseOngkir + (extraDistance * tarifPerKm)

      // Pembulatan ke atas (Ceil) agar angka cantik
      return Math.ceil(rawOngkir)
    }
  }, [distance])

  const total = useMemo(() => {
    const servicePrice = service?.price || 0
    const extrasPrice = extras.reduce((acc, curr) => acc + curr.price, 0)

    // Total otomatis selalu update saat distance/service berubah
    return servicePrice + extrasPrice + transportPrice
  }, [service, extras, transportPrice])


  // --- Handlers ---
  const handleSelectedService = (service: ServiceData) => setService(service)

  const handleAddExtras = (data: Extra) => {
    if (!extras.find((item) => item.title === data.title)) {
      setExtras((prev) => [...prev, data])
    }
  }

  const handleRemoveExtras = (data: Extra) => {
    setExtras((prev) => prev.filter((value) => value.title !== data.title))
  }

  const handleSelectedBarber = (barber: Barber) => setBarber(barber)
  const handleSetCoordinate = (coordinate: LatLngTuple) => setCoordinate(coordinate)
  const handleSetDistance = (val: number) => setDistance(val)
  const handleSetDate = (date: string) => setDate(date)
  const handleSetCustomerInfo = (info: CustomerInfo) =>
    setCustomerInfo((prev) => ({ ...prev, ...info }))

  // --- WhatsApp Logic ---
  const handleBookNow = () => {
    if (service && barber && distance !== null && date && customerInfo) {

      const formatIDR = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          minimumFractionDigits: 0,
        }).format(Math.round(price * 1000))
      }

      const message = `Booking Appointment - Barber Sangaji

*Service:*
- ${service.title} (${formatIDR(service.price)})

*Barber:* ${barber.name}
*Duration:* ${service.duration}

*Extras:*
${extras.length > 0 ? extras.map((v) => `- ${v.title} (${formatIDR(v.price)})`).join('\n') : '-'}

*Location:*
https://www.google.com/maps?q=${coordinate[0]},${coordinate[1]}

*Distance:* ${distance.toFixed(1)} Km
*Transport Fee:* ${transportPrice === 0 ? 'FREE' : formatIDR(transportPrice)}

*Date and Time:*
${date}

*Customer Info:*
- Name: ${customerInfo.name}
- Phone: ${customerInfo.phone}
- Email: ${customerInfo.email}
- Allergies: ${customerInfo.allergies || '-'}

------------------------------
*Total Pembayaran:*
*${formatIDR(total)}*
------------------------------`

      window.open(`https://wa.me/6281234379369?text=${encodeURIComponent(message)}`, '_blank')
    } else {
      alert('Mohon lengkapi semua data sebelum melakukan booking.')
    }
  }

  return (
    <AppointmentContext.Provider
      value={{
        service,
        extras,
        barber,
        coordinate,
        distance,
        date,
        customerInfo,
        total,
        transportPrice,
        handleSelectedService,
        handleAddExtras,
        handleRemoveExtras,
        handleSelectedBarber,
        handleSetCoordinate,
        handleSetDistance,
        handleSetDate,
        handleSetCustomerInfo,
        handleBookNow,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export const useAppointment = () => {
  const context = useContext(AppointmentContext)
  if (!context)
    throw new Error('useAppointment must be used within an AppointmentProvider')
  return context
}