import { createContext, useContext, useState, ReactNode } from 'react'

type Lang = 'id' | 'en'

interface I18nContextType {
  t: (key: string) => string
  lang: Lang
  setLang: (lang: Lang) => void
  isSwitching: boolean
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

const translations: Record<Lang, Record<string, string>> = {
  en: {
    'brand.name': 'Barber Sangaji',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.service': 'Service',
    'nav.pages': 'Pages',
    'nav.appointment': 'Appointment',
    'nav.pricing': 'Pricing',
    'nav.team': 'The Team',
    'nav.open': 'Opening Hours',
    'nav.testimonial': 'Testimonial',
    'nav.content': 'Content',
    'nav.contact': 'Contact',
    'footer.address': 'Address',
    'footer.contact': 'Contact Us',
    'footer.newsletter': 'Newsletter',
    'footer.signup': 'Sign Up',
    'footer.rights': 'All Rights Reserved.',
    'footer.designed': 'Designed By',
    'footer.distributed': 'Distributed By',
    'general.duration': 'Duration',
    'general.book_now': 'Book Now',
    'general.from': 'From',

    // BREADCRUMBS
    'breadcrumb.home': 'Home',
    'breadcrumb.pages': 'Pages',
    'breadcrumb.about': 'About',
    'breadcrumb.service': 'Service',
    'breadcrumb.pricing': 'Pricing Plan',
    'breadcrumb.contact': 'Contact',
    'breadcrumb.team': 'The Team',
    'breadcrumb.testimonial': 'Testimonial',
    'breadcrumb.open': 'Opening Hours',

    // HERO
    'hero.title1': 'You Call Me And I Will Come',
    'hero.subtitle1': 'Yogyakarta City Special Region of Yogyakarta',
    'hero.title2': 'Premium Haircut at Affordable Price',

    // ABOUT
    'about.title': 'About',
    'about.experience.years': '4 Years',
    'about.experience.title': 'Experience',
    'about.us': 'About Us',
    'about.heading': 'More Than Just A Haircut. Learn More About Us!',
    'about.desc1': 'Welcome to Barber Sangaji! We are a barbershop that prioritizes quality and detail in every haircut. With flexible on-call services, we are here to fulfill your grooming needs wherever and whenever. Our team of professional barbers are equipped with adequate skills and experience, so that every cut is not just a style, but also a work of art.',
    'about.desc2': 'At Barber Sangaji, we believe that a neat and well-groomed appearance can boost your confidence. We are committed to providing a satisfying and personalized cutting experience, making every visit memorable. Join us and experience the difference in service and quality of cuts we offer!',
    'about.since.title': 'Since 2018',
    'about.since.desc': '2018 began to hold a clipper and continue to hone skills for a trendy and attractive cut in all circles, until at school time there was unrest in the regulations that required short cuts, and Barber Sangaji appeared to overcome the students who were subjected to hair raids, we overcame with short cuts but still attractive because of the detailed haircuts that we provide to increase self-confidence.',
    'about.clients.title': '101+ clients',
    'about.clients.desc': 'Customers ranging from school children to adults who want to tidy up their hair to look attractive and fresh.',
    'about.our.barber': 'Our Barber',
    'about.meet.barber': 'Meet Our Barber',

    // SERVICE
    'service.title': 'Service',
    'service.subtitle': 'Services',
    'service.heading': 'What We Provide',
    'service.haircut.title': 'Haircut',
    'service.haircut.desc': 'Various haircut models are ready for us to serve wholeheartedly',
    'service.haircut.price': 'From 15K',
    'service.beard.title': 'Beard Trim',
    'service.beard.desc': 'At Barber Sangaji, our Beard Trim service trims and shapes your beard with great precision.',
    'service.beard.price': 'From 5K',
    'service.dye.title': 'Hair Dyeing',
    'service.dye.desc': 'We have two hair colors, highlighting and full coloring.',
    'service.dye.price': 'From 90K',
    'service.mustache.title': 'Mustache',
    'service.mustache.desc': 'Mustache grooming for a cleaner look.',
    'service.mustache.price': 'From 5K',

    // PRICING
    'pricing.title': 'Pricing Plan',
    'pricing.subtitle': 'Price & Plan',
    'pricing.heading': 'Check Out Our Barber Services And Prices',

    // CONTACT
    'contact.title': 'Contact',
    'contact.subtitle': 'Contact Us',
    'contact.heading': 'Have Any Query? Please Contact Us!',
    'contact.form.inactive': 'The contact form is currently inactive.',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.placeholder.message': 'Leave a message here',
    'contact.form.submit': 'Send Message',

    'general.continue': 'Continue',
    'booking.details': 'Booking Details',
    'booking.service': 'Service',
    'booking.barber': 'Barber',
    'booking.location': 'Location',
    'booking.date_time': 'Date & Time',
    'booking.total_price': 'Total Price',
    'booking.free': 'FREE',
    'booking.choose_time': 'Choose Time',
    'booking.morning': 'Morning',
    'booking.afternoon': 'Afternoon',
    'booking.continue': 'Continue',

    // APPOINTMENT
    'appointment.your_choice': 'Your Choice',
    'appointment.no_reviews': 'No reviews yet',
    'appointment.extras_available': 'Extras Available',
    'appointment.extra.oil': 'Oil',
    'appointment.extra.wash': 'Wash Hair',
    'appointment.extra.massage': 'Scalp Massage',
    'appointment.extra.highlight': 'Highlight',
    'appointment.extra.coloring': 'Full Coloring',
    'appointment.tab.extras': 'Choose Extras',
    'appointment.tab.barber': 'Choose Barber',
    'appointment.tab.location': 'Choose Location',
    'appointment.tab.datetime': 'Choose Datetime',
    'appointment.tab.info': 'Customer Info',
    'appointment.choose': 'Choose',
    'appointment.barber.mrz.desc': 'With 8 years of experience, Mr.z specializes in classic and modern cuts. His precision and expertise make every customer satisfied and confident.',
    'appointment.barber.arif.desc': 'Arif focuses on mens hair and beards, giving recommendations according to face shape. His styling skills keep customers looking on point.',
    'appointment.barber.karol.desc': 'Karol proficient in modern coloring and styling techniques. She keeps up with the latest trends and helps customers look bold with stunning results.',

    // LOCATION
    'location.office': 'Barber Sangaji Office',
    'location.your': 'Your Location',
    'location.distance': 'Distance in kilometers',
    'location.not_found': 'Location not found.',
    'location.walkthrough': 'Walkthrough',
    'location.allow': 'Allow location',

    // DATETIME
    'datetime.select_date': 'Select Date',
    'datetime.select_time': 'Select Time',

    // CUSTOMER INFO
    'customer.title': 'Customer Information',
    'customer.name': 'Name',
    'customer.phone': 'Phone Number',
    'customer.email': 'Email',
    'customer.allergies': 'Allergies',
    'customer.save': 'Save your information',
    'customer.book_now': 'Booking Now',
    'customer.placeholder.name': 'Enter your name',
    'customer.placeholder.email': 'Enter your email',
    'customer.placeholder.phone': 'Contoh: 089262570335',
    'customer.placeholder.allergies': 'Your allergies',
    'customer.error.required': 'Please fill in all required fields',
    'customer.error.phone_number': 'Phone number must contain only numbers',
    'customer.error.phone_invalid': 'Phone number must be at least 10 digits',

    // TESTIMONIAL
    'testimonial.title': 'Testimonial',
    'testimonial.subtitle': 'Testimonial',
    'testimonial.heading': 'What Our Clients Say!',
    'testimonial.1.text': 'A neat and shapely cut, like a professional haircut at an affordable price!',
    'testimonial.2.text': 'Good service, good man, and neat haircut. Suitable for haircut subscriptionfdsfsdfsd dsfdsf sdfsdfsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss',
    'testimonial.3.text': 'Recommended. Top service',
    'testimonial.role.student': 'Student',
    'testimonial.role.teacher': 'Teacher',

    // OPENING HOURS
    'open.title': 'Working Hours',
    'open.subtitle': 'Working Hours',
    'open.heading': 'Professional Barbers Are Waiting For You',
    'open.day.monday': 'Monday',
    'open.day.tuesday': 'Tuesday',
    'open.day.wednesday': 'Wednesday',
    'open.day.thursday': 'Thursday',
    'open.day.friday': 'Friday',
    'open.day.saturday': 'Saturday',
    'open.day.sunday': 'Sunday',
    'open.note.closed': "when time doesn't allow for opening",
    'open.time.closed': 'Will Closed',

    // FOOTER
    'footer.getInTouch': 'Get In Touch',
    'footer.quickLinks': 'Quick Links',
    'footer.aboutUs': 'About Us',
    'footer.ourServices': 'Our Services',
    'footer.terms': 'Terms & Condition',
    'footer.support': 'Support',
    'footer.placeholder.email': 'Your email',
  },
  id: {
    'brand.name': 'Barber Sangaji',
    'nav.home': 'Beranda',
    'nav.about': 'Tentang',
    'nav.service': 'Layanan',
    'nav.pages': 'Halaman',
    'nav.appointment': 'Janji Temu',
    'nav.pricing': 'Harga',
    'nav.team': 'Tim Kami',
    'nav.open': 'Jam Buka',
    'nav.testimonial': 'Testimoni',
    'nav.content': 'Konten',
    'nav.contact': 'Kontak',
    'footer.address': 'Alamat',
    'footer.contact': 'Hubungi Kami',
    'footer.newsletter': 'Buletin',
    'footer.signup': 'Daftar',
    'footer.rights': 'Hak Cipta Dilindungi.',
    'footer.designed': 'Didesain Oleh',
    'footer.distributed': 'Didistribusikan Oleh',
    'general.duration': 'Durasi',
    'general.book_now': 'Pesan Sekarang',
    'general.from': 'Mulai',

    // BREADCRUMBS
    'breadcrumb.home': 'Beranda',
    'breadcrumb.pages': 'Halaman',
    'breadcrumb.about': 'Tentang',
    'breadcrumb.service': 'Layanan',
    'breadcrumb.pricing': 'Daftar Harga',
    'breadcrumb.contact': 'Kontak',
    'breadcrumb.team': 'Tim Kami',
    'breadcrumb.testimonial': 'Testimoni',
    'breadcrumb.open': 'Jam Buka',

    // HERO
    'hero.title1': 'Anda Panggil Saya Datang',
    'hero.subtitle1': 'Kota Yogyakarta Daerah Istimewa Yogyakarta',
    'hero.title2': 'Potongan Rambut Premium dengan Harga Terjangkau',

    // ABOUT
    'about.title': 'Tentang',
    'about.experience.years': '4 Tahun',
    'about.experience.title': 'Pengalaman',
    'about.us': 'Tentang Kami',
    'about.heading': 'Lebih Dari Sekadar Potong Rambut. Pelajari Lebih Lanjut Tentang Kami!',
    'about.desc1': 'Selamat datang di Barber Sangaji! Kami adalah barbershop yang mengutamakan kualitas dan detail dalam setiap potongan rambut. Dengan layanan panggilan yang fleksibel, kami hadir untuk memenuhi kebutuhan grooming Anda di mana saja dan kapan saja. Tim barber profesional kami dibekali dengan keterampilan dan pengalaman yang memadai, sehingga setiap potongan bukan hanya sekadar gaya, tetapi juga karya seni.',
    'about.desc2': 'Di Barber Sangaji, kami percaya bahwa penampilan yang rapi dan terawat dapat meningkatkan kepercayaan diri Anda. Kami berkomitmen untuk memberikan pengalaman memotong yang memuaskan dan personal, menjadikan setiap kunjungan berkesan. Bergabunglah dengan kami dan rasakan perbedaan layanan serta kualitas potongan yang kami tawarkan!',
    'about.since.title': 'Sejak 2018',
    'about.since.desc': '2018 mulai memegang clipper dan terus mengasah kemampuan demi potongan yang trendi dan menarik di semua kalangan, hingga pada masa sekolah terjadi keresahan akan peraturan yang mengharuskan potongan pendek, dan Barber Sangaji muncul mengatasi para siswa yang terkena razia rambut, kami atasi dengan potongan pendek namun tetap menarik karena detail potongan rambut yang kami berikan untuk meningkatkan kepercayaan diri.',
    'about.clients.title': '101+ klien',
    'about.clients.desc': 'Pelanggan mulai dari anak sekolah hingga dewasa yang ingin merapikan rambut agar terlihat menarik dan segar.',
    'about.our.barber': 'Barber Kami',
    'about.meet.barber': 'Temui Barber Kami',

    // SERVICE
    'service.title': 'Layanan',
    'service.subtitle': 'Layanan',
    'service.heading': 'Apa Yang Kami Sediakan',
    'service.haircut.title': 'Potong Rambut',
    'service.haircut.desc': 'Berbagai model potongan rambut siap kami layani dengan sepenuh hati',
    'service.haircut.price': 'Mulai 15K',
    'service.beard.title': 'Cukur Jenggot',
    'service.beard.desc': 'Di Barber Sangaji, layanan Cukur Jenggot kami merapikan dan membentuk jenggot Anda dengan presisi tinggi.',
    'service.beard.price': 'Mulai 5K',
    'service.dye.title': 'Pewarnaan Rambut',
    'service.dye.desc': 'Kami memiliki dua jenis pewarnaan rambut, highlighting dan pewarnaan penuh.',
    'service.dye.price': 'Mulai 90K',
    'service.mustache.title': 'Cukur Kumis',
    'service.mustache.desc': 'Perawatan kumis untuk tampilan yang lebih rapi.',
    'service.mustache.price': 'Mulai 5K',

    // PRICING
    'pricing.title': 'Daftar Harga',
    'pricing.subtitle': 'Harga & Paket',
    'pricing.heading': 'Cek Layanan dan Harga Barber Kami',

    // CONTACT
    'contact.title': 'Kontak',
    'contact.subtitle': 'Hubungi Kami',
    'contact.heading': 'Ada Pertanyaan? Silakan Hubungi Kami!',
    'contact.form.inactive': 'Formulir kontak saat ini tidak aktif.',
    'contact.form.name': 'Nama Anda',
    'contact.form.email': 'Email Anda',
    'contact.form.subject': 'Subjek',
    'contact.form.message': 'Pesan',
    'contact.form.placeholder.message': 'Tinggalkan pesan di sini',
    'contact.form.submit': 'Kirim Pesan',

    'general.continue': 'Lanjut',
    'booking.details': 'Detail Pemesanan',
    'booking.service': 'Layanan',
    'booking.barber': 'Barber',
    'booking.location': 'Lokasi',
    'booking.date_time': 'Tanggal & Jam',
    'booking.total_price': 'Total Harga',
    'booking.free': 'GRATIS',
    'booking.choose_time': 'Pilih Waktu',
    'booking.morning': 'Pagi',
    'booking.afternoon': 'Siang',
    'booking.continue': 'Lanjut',

    // APPOINTMENT
    'appointment.your_choice': 'Pilihan Anda',
    'appointment.no_reviews': 'Belum ada ulasan',
    'appointment.extras_available': 'Tambahan Tersedia',
    'appointment.extra.oil': 'Minyak Rambut',
    'appointment.extra.wash': 'Cuci Rambut',
    'appointment.extra.massage': 'Pijat Kepala',
    'appointment.extra.highlight': 'Highlight',
    'appointment.extra.coloring': 'Pewarnaan Penuh',
    'appointment.tab.extras': 'Pilih Tambahan',
    'appointment.tab.barber': 'Pilih Barber',
    'appointment.tab.location': 'Pilih Lokasi',
    'appointment.tab.datetime': 'Pilih Tanggal & Jam',
    'appointment.tab.info': 'Info Pelanggan',
    'appointment.choose': 'Pilih',
    'appointment.barber.mrz.desc': 'Dengan pengalaman 8 tahun, Mr.z memiliki spesialisasi dalam potongan klasik dan modern. Ketepatan dan keahliannya membuat setiap pelanggan puas dan percaya diri.',
    'appointment.barber.arif.desc': 'Arif berfokus pada rambut pria dan jenggot, memberikan rekomendasi sesuai bentuk wajah. Keterampilan styling-nya membuat pelanggan selalu tampil maksimal.',
    'appointment.barber.karol.desc': 'Karol ahli dalam teknik pewarnaan dan styling modern. Ia selalu mengikuti tren terbaru dan membantu pelanggan tampil berani dengan hasil yang memukau.',

    // LOCATION
    'location.office': 'Kantor Barber Sangaji',
    'location.your': 'Lokasi Anda',
    'location.distance': 'Jarak dalam kilometer',
    'location.not_found': 'Lokasi tidak ditemukan.',
    'location.walkthrough': 'Panduan',
    'location.allow': 'Izinkan lokasi',

    // DATETIME
    'datetime.select_date': 'Pilih Tanggal',
    'datetime.select_time': 'Pilih Waktu',

    // CUSTOMER INFO
    'customer.title': 'Informasi Pelanggan',
    'customer.name': 'Nama',
    'customer.phone': 'Nomor Telepon',
    'customer.email': 'Email',
    'customer.allergies': 'Alergi',
    'customer.save': 'Simpan informasi Anda',
    'customer.book_now': 'Pesan Sekarang',
    'customer.placeholder.name': 'Masukkan nama Anda',
    'customer.placeholder.email': 'Masukkan email Anda',
    'customer.placeholder.phone': 'Contoh: 089262570335',
    'customer.placeholder.allergies': 'Alergi Anda',
    'customer.error.required': 'Mohon lengkapi semua kolom yang wajib diisi',
    'customer.error.phone_number': 'Nomor telepon harus berisi angka saja',
    'customer.error.phone_invalid': 'Nomor telepon minimal 10 digit',

    // TESTIMONIAL
    'testimonial.title': 'Testimoni',
    'testimonial.subtitle': 'Testimoni',
    'testimonial.heading': 'Apa Kata Klien Kami!',
    'testimonial.1.text': 'Potongan yang rapi dan berbentuk, seperti potongan rambut profesional dengan harga terjangkau!',
    'testimonial.2.text': 'Pelayanan bagus, orangnya ramah, dan potongannya rapi. Cocok untuk langganan potong rambut',
    'testimonial.3.text': 'Sangat direkomendasikan. Pelayanan terbaik',
    'testimonial.role.student': 'Pelajar',
    'testimonial.role.teacher': 'Guru',

    // OPENING HOURS
    'open.title': 'Jam Buka',
    'open.subtitle': 'Jam Buka',
    'open.heading': 'Barber Profesional Menunggu Anda',
    'open.day.monday': 'Senin',
    'open.day.tuesday': 'Selasa',
    'open.day.wednesday': 'Rabu',
    'open.day.thursday': 'Kamis',
    'open.day.friday': 'Jumat',
    'open.day.saturday': 'Sabtu',
    'open.day.sunday': 'Minggu',
    'open.note.closed': "ketika waktu tidak memungkinkan untuk buka",
    'open.time.closed': 'Akan Tutup',

    // FOOTER
    'footer.getInTouch': 'Hubungi Kami',
    'footer.quickLinks': 'Tautan Cepat',
    'footer.aboutUs': 'Tentang Kami',
    'footer.ourServices': 'Layanan Kami',
    'footer.terms': 'Syarat & Ketentuan',
    'footer.support': 'Dukungan',
    'footer.placeholder.email': 'Email Anda',
  },
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(
    () => (localStorage.getItem('barber-sangaji.lang') as Lang) || 'id'
  )
  const [isSwitching, setIsSwitching] = useState(false)

  const setLang = (newLang: Lang) => {
    setIsSwitching(true)
    setLangState(newLang)
    localStorage.setItem('barber-sangaji.lang', newLang)
    setTimeout(() => setIsSwitching(false), 300)
  }

  const t = (key: string) => {
    return translations[lang][key] || key
  }

  return (
    <I18nContext.Provider value={{ t, lang, setLang, isSwitching }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    return {
      t: (key: string) => key,
      lang: 'id' as Lang,
      setLang: () => { },
      isSwitching: false,
    }
  }
  return context
}
