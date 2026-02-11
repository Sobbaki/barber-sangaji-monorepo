import {
  Barber as BarberType,
  useAppointment,
} from '../lib/appointment-provider'
import { TabPage } from './appointment-service'
import { useI18n } from '../lib/i18n'

export default function ChooseBarber({
  setActiveTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<TabPage>>
}) {
  const { handleSelectedBarber } = useAppointment()

  const barberData: BarberType[] = [
    {
      image: '/img/team-1.jpg',
      alt: 'Team 1 Image',
      name: 'Mr.z',
      description: 'appointment.barber.mrz.desc',
    },
    {
      image: '/img/team-2.jpg',
      alt: 'Team 2 Image',
      name: 'Arif',
      description: 'appointment.barber.arif.desc',
    },
    {
      image: '/img/team-3.jpg',
      alt: 'Team 3 Image',
      name: 'Karol',
      description: 'appointment.barber.karol.desc',
    },

  ]

  return (
    <>
      {barberData.map((data, index) => (
        <Barber
          data={data}
          key={index}
          setActiveTab={setActiveTab}
          handleSelectedBarber={handleSelectedBarber}
        />
      ))}
    </>
  )
}

export function Barber({
  data,
  setActiveTab,
  handleSelectedBarber,
}: {
  data: BarberType
  setActiveTab: React.Dispatch<React.SetStateAction<TabPage>>
  handleSelectedBarber: (barber: BarberType) => void
}) {
  const { t } = useI18n()

  return (
    <div className='bg-light-subtle p-4 d-flex justify-content-between gap-5 align-items-center mt-3 appointment-barber-card'>
      <div className='d-flex gap-3 align-items-center'>
        <img
          src={data.image}
          alt={data.alt}
          style={{
            width: '5rem',
            height: '5rem',
            borderRadius: '50%',
            objectFit: 'cover',
            aspectRatio: '1/1',
          }}
        />
        <div>
          <h5>{data.name}</h5>
          <p className='text-white mb-0' style={{ fontSize: '0.9rem' }}>
            {t(data.description)}
          </p>
        </div>
      </div>
      <button
        className='btn btn-primary'
        onClick={() => {
          handleSelectedBarber(data)
          setActiveTab('Choose Location')
        }}
      >
        {t('appointment.choose')}
      </button>
    </div>
  )
}
