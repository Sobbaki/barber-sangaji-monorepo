import { useCallback, useEffect, useState } from 'react'
import { useAppointment } from '../lib/appointment-provider'
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet'
import { TabPage } from './appointment-service'
import { type LatLngTuple } from 'leaflet'
import L from 'leaflet'
import { useI18n } from '../lib/i18n'

const MarkerIcon = new L.Icon({
  iconUrl: '/img/kurir.png',
  iconSize: [55, 55],
})

function MapEvents({
  onMapClick,
}: {
  onMapClick: (e: L.LeafletMouseEvent) => void
}) {
  useMapEvents({
    click: onMapClick,
  })
  return null
}

export default function ChooseLocation({
  setActiveTab,
}: {
  setActiveTab: React.Dispatch<React.SetStateAction<TabPage>>
}) {
  const { t } = useI18n()
  const fixedPoint: LatLngTuple = [-7.777338, 110.367739]
  const [route, setRoute] = useState<LatLngTuple[]>([])

  const { distance, coordinate, handleSetCoordinate, handleSetDistance } =
    useAppointment()

  const fetchRoute = useCallback(async () => {
    const response = await fetch(
      `https://router.project-osrm.org/route/v1/driving/${fixedPoint[1]},${fixedPoint[0]};${coordinate[1]},${coordinate[0]}?overview=full&geometries=geojson`
    )
    const data = await response.json()

    if (data.routes && data.routes.length > 0) {
      const coordinates = data.routes[0].geometry.coordinates.map(
        (coord: number[]) => [coord[1], coord[0]] as LatLngTuple
      )
      setRoute(coordinates)
      handleSetDistance(parseFloat((data.routes[0].distance / 1000).toFixed(1)))
    }
  }, [coordinate])

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = position.coords
        handleSetCoordinate([coords.latitude, coords.longitude])
      },
      () => {
        alert('Permission denied. Cannot proceed.')
      }
    )
  }

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    handleSetCoordinate([e.latlng.lat, e.latlng.lng])
  }

  const handleMarkerDragEnd = (e: L.LeafletEvent) => {
    const marker = e.target
    const position = marker.getLatLng()
    handleSetCoordinate([position.lat, position.lng])
  }

  useEffect(() => {
    fetchRoute()
  }, [fetchRoute])

  useEffect(() => {
    handleLocation()
  }, [])

  return (
    <>
      {location ? (
        <>
          <MapContainer
            center={coordinate}
            style={{ width: '100%', height: '400px' }}
            zoom={13}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={fixedPoint} icon={MarkerIcon}>
              <Popup>{t('location.office')}</Popup>
            </Marker>
            <Marker
              position={coordinate}
              draggable={true}
              eventHandlers={{
                dragend: handleMarkerDragEnd,
              }}
              icon={MarkerIcon}
            >
              <Popup>{t('location.your')}</Popup>
              <Polyline positions={route} color='blue' />
              <MapEvents onMapClick={handleMapClick} />
            </Marker>
          </MapContainer>
          <h5 className='mt-3'>{t('location.distance')}</h5>
          <p className='text-white'>{distance} Kilometer</p>
          <div className='w-100 d-flex justify-content-end'>
            <button
              className='btn btn-primary mt-4'
              onClick={() => {
                setActiveTab('Choose Datetime')
              }}
            >
              {t('general.continue')}
            </button>
          </div>
        </>
      ) : (
        <>
          <div
            className='bg-light-subtle w-100 d-flex align-items-center justify-content-center'
            style={{ height: '300px' }}
          >
            {t('location.not_found')}
          </div>
          <h5 className='mt-3'>{t('location.walkthrough')}</h5>
          <ol>
            <li>
              In Chrome, click the menu button and then 'Settings' (or just
              visit 'chrome://settings/').
            </li>
            <li>
              In Settings, start typing 'clear browsing data' into the search
              bar and select 'Clear browsing data' under 'Privacy and Security'
              when it appears.
            </li>
            <li>
              In the 'Clear Browsing Data' pop-up, click on the 'Advanced' tab.
            </li>
            <li>
              Set time range to 'Last hour' (or longer depending on when you
              think Chrome began to block geolocation).
            </li>
            <li>
              Check the 'Hosted app data' checkbox (it should be at the bottom
              of the list), and deselect all of the other checkboxes.
            </li>
            <li>Click 'Clear Data'.</li>
            <li>
              Go back to the page which is trying to request geolocation. The
              geolocation permission dialogue should appear next time you
              attempt to trigger it.
            </li>
          </ol>
          <button className='btn btn-primary mt-3' onClick={handleLocation}>
            {t('location.allow')}
          </button>
        </>
      )}
    </>
  )
}
