import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
} from '@tanstack/react-router'
import Navbar from '../components/navbar'
import Spinner from '../components/spinner'
import NotFound from '../components/not-found'
import Footer from '../components/footer'
import { AppointmentProvider } from '../lib/appointment-provider'
import { I18nProvider } from '../lib/i18n'
import BackToTop from '../components/back-to-top'

// ... kode import lainnya

export const Route = createRootRoute({
  component: () => (
    <I18nProvider>
      <AppointmentProvider>
        <ScrollRestoration getKey={(location) => location.pathname} />
        <Navbar />
        <Spinner />
        {/* HAPUS style={{ paddingTop: '88px' }} di sini. Biarkan kosong atau hapus style-nya */}
        <main> 
          <Outlet />
        </main>
        <Footer />
        <BackToTop />
      </AppointmentProvider>
    </I18nProvider>
  ),
  notFoundComponent: NotFound,
})
