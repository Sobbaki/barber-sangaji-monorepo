import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { API_ENDPOINTS, fetchFromAPI } from '../lib/api-config'

interface ContentItem {
  id: string
  title: string
  description: string
  category: 'video' | 'foto'
  file_name: string
  file_path: string
  thumbnail_name?: string
  thumbnail_path?: string
  created_at: string
}

export const Route = createFileRoute('/content')({
  component: Content,
})

// Content Card Component
function ContentCard({
  item,
  type,
  onPlayVideo,
  defaultThumbnail
}: {
  item: ContentItem
  type: 'video' | 'photo'
  onPlayVideo?: (img: HTMLImageElement) => void
  defaultThumbnail: string
}) {
  return (
    <div className='team-item h-100 d-flex flex-column'>
      {type === 'video' ? (
        <div className='video-container' style={{ flex: '0 0 auto' }}>
          <img
            className='img-fluid w-100'
            src={item.thumbnail_path || defaultThumbnail}
            alt={item.title}
            onClick={(event) => onPlayVideo?.(event.currentTarget)}
            style={{ cursor: 'pointer', objectFit: 'cover', height: '200px' }}
          />
          <video className='img-fluid w-100' controls style={{ display: 'none', height: '200px', objectFit: 'cover' }}>
            <source src={item.file_path} type='video/mp4' />
            Browser Anda tidak mendukung video tag.
          </video>
          <div className='team-social'>
            <a className='btn btn-square' href=''>
              <i className='fab fa-facebook-f'></i>
            </a>
            <a className='btn btn-square' href=''>
              <i className='fab fa-twitter'></i>
            </a>
            <a
              className='btn btn-square'
              href='https://www.instagram.com/barber.sangaji/?igsh=MWljNWczdGtvNXp2eA%3D%3D'
            >
              <i className='fab fa-instagram'></i>
            </a>
          </div>
        </div>
      ) : (
        <div className='team-img position-relative overflow-hidden' style={{ flex: '0 0 auto' }}>
          <img
            className='img-fluid w-100'
            src={item.file_path}
            alt={item.title}
            style={{ objectFit: 'cover', height: '200px' }}
          />
          <div className='team-social'>
            <a className='btn btn-square' href=''>
              <i className='fab fa-facebook-f'></i>
            </a>
            <a className='btn btn-square' href=''>
              <i className='fab fa-twitter'></i>
            </a>
            <a className='btn btn-square' href=''>
              <i className='fab fa-instagram'></i>
            </a>
          </div>
        </div>
      )}

      <div className='bg-secondary text-center p-3' style={{ flex: '1 1 auto' }}>
        <h6 className='text-uppercase mb-2 text-white'>
          {item.title}
        </h6>
        <p className='text-primary small mb-0' style={{
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          lineHeight: '1.5'
        }}>
          {item.description}
        </p>
      </div>
    </div>
  )
}

export function Content() {
  const [videos, setVideos] = useState<ContentItem[]>([])
  const [photos, setPhotos] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchContent() {
      try {
        const data = await fetchFromAPI<ContentItem[]>(API_ENDPOINTS.content)
        if (data) {
          setVideos(data.filter(c => c.category === 'video'))
          setPhotos(data.filter(c => c.category === 'foto'))
        }
      } catch (error) {
        console.error('Failed to fetch content:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchContent()
  }, [])

  function playVideo(imgElement: HTMLImageElement) {
    const videoElement = imgElement.nextElementSibling as HTMLVideoElement
    imgElement.style.display = 'none'
    videoElement.style.display = 'block'
    videoElement.play()
  }

  const defaultThumbnail = '/img/lofo sangaji.png'

  return (
    <>
      <div
        className='container-fluid page-header py-5 mb-5 wow fadeIn'
        data-wow-delay='0.1s'
      >
        <div className='container text-center py-5'>
          <h1 className='display-3 text-white text-uppercase mb-3 animated slideInDown'>
            Content Barber Sangaji
          </h1>
          <nav aria-label='breadcrumb animated slideInDown'>
            <ol className='breadcrumb justify-content-center text-uppercase mb-0'>
              <li className='breadcrumb-item'>
                <a className='text-white' href='/'>
                  Home
                </a>
              </li>
              <li className='breadcrumb-item'>
                <a className='text-white' href='#'>
                  Pages
                </a>
              </li>
              <li
                className='breadcrumb-item text-primary active'
                aria-current='page'
              >
                Content Barber Sangaji
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Video Section */}
      <div className='container-xxl py-5'>
        <div className='container'>
          <div
            className='text-center mx-auto mb-5 wow fadeInUp'
            data-wow-delay='0.1s'
            style={{ maxWidth: '600px' }}
          >
            <h1 className='text-uppercase'>
              video of the result of barber sangaji
            </h1>
          </div>
          <div className='row g-4 justify-content-center'>
            {loading ? (
              <div className='col-12 text-center'>
                <div className='spinner-border text-primary' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
              </div>
            ) : videos.length > 0 ? (
              videos.map((video, index) => (
                <div
                  key={video.id}
                  className='col-lg-3 col-md-4 col-sm-6 wow fadeInUp'
                  data-wow-delay={`${0.1 + (index % 4) * 0.2}s`}
                >
                  <ContentCard
                    item={video}
                    type='video'
                    onPlayVideo={playVideo}
                    defaultThumbnail={defaultThumbnail}
                  />
                </div>
              ))
            ) : (
              <div className='col-12 text-center'>
                <p className='text-muted'>Belum ada video yang ditambahkan.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Photo Section */}
      <div className='container-xxl py-5'>
        <div className='container'>
          <div
            className='text-center mx-auto mb-5 wow fadeInUp'
            data-wow-delay='0.1s'
            style={{ maxWidth: '600px' }}
          >
            <h1 className='text-uppercase'>
              Photo of the result of Barber Sangaji
            </h1>
          </div>
          <div className='row g-4 justify-content-center'>
            {loading ? (
              <div className='col-12 text-center'>
                <div className='spinner-border text-primary' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                </div>
              </div>
            ) : photos.length > 0 ? (
              photos.map((photo, index) => (
                <div
                  key={photo.id}
                  className='col-lg-3 col-md-4 col-sm-6 wow fadeInUp'
                  data-wow-delay={`${0.1 + (index % 4) * 0.2}s`}
                >
                  <ContentCard
                    item={photo}
                    type='photo'
                    defaultThumbnail={defaultThumbnail}
                  />
                </div>
              ))
            ) : (
              <div className='col-12 text-center'>
                <p className='text-muted'>Belum ada foto yang ditambahkan.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
