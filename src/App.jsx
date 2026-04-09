import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaRegCopy, FaEnvelopeOpenText, FaMapMarkerAlt, FaClock, FaHeart, FaVideo, FaInstagram, FaChevronLeft, FaChevronRight, FaTimes, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// --- IMPORT ASET LOKAL (Pastikan file-file ini ada di folder src/assets/) ---
import bgBunga from './assets/bg-bunga.jpg'; 
import bgMempelai from './assets/bg-bunga-1.jpg'; // Gambar khusus untuk section cover/mempelai
import coverImg from './assets/cover-1.jpg';
import slide1Img from './assets/slide-1.jpg';
import slide2Img from './assets/slide-2.jpg';
import slide3Img from './assets/slide-3.jpg';
import slide4Img from './assets/slide-4.jpg';

// BARU: FOTO MEMPELAI LOKAL
import bridge1 from './assets/bridge-2.jpg'; // Wanita
import bridge2 from './assets/bridge-1.jpg'; // Pria
import bridge3 from './assets/bridge-3.jpg'; // Slide Tambahan
import story1 from './assets/story-1.jpg';
import story2 from './assets/story-2.jpg';
import story3 from './assets/story-3.jpg';
import bgMusic from './assets/lagu.mp3';

// SWIPER
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// IMPORT GALERI (11 Gambar)
import img1 from './assets/image-1.jpg';
import img2 from './assets/image-2.jpg';
import img3 from './assets/image-3.jpg';
import img4 from './assets/image-4.jpg';
import img5 from './assets/image-5.jpg';
import img6 from './assets/image-6.jpg';
import img7 from './assets/image-7.jpg';
import img8 from './assets/image-8.jpg';
import img9 from './assets/image-9.jpg';
import img10 from './assets/image-10.jpg';
import img11 from './assets/image-11.jpg';

// LOGO BANK LOKAL (Pastikan file-file ini ada di assets)
import logoBca from './assets/bca-logo.png';
import logoSeabank from './assets/seabank-logo.png';

const galleryImages = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

// --- KOMPONEN ANIMASI ---
const FadeIn = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8, delay, ease: "easeOut" }}>
    {children}
  </motion.div>
);

const FloralCornerTop = () => null;
const FloralCornerBottom = () => null;

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [guestName, setGuestName] = useState('Tamu Undangan');
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedRek, setCopiedRek] = useState('');
  const audioRef = useRef(null);

  // State untuk Slideshow & Lightbox
  const [quoteSlideIndex, setQuoteSlideIndex] = useState(0);
  const [saveDateSlideIndex, setSaveDateSlideIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null); // null = tertutup

  const [rsvpForm, setRsvpForm] = useState({ name: '', message: '', attendance: 'hadir' });
  const [messages, setMessages] = useState([]);

  const loveStory = [
    {
      date: "TAHUN 2020",
      desc: "Segalanya dimulai dari sebuah ketidaksengajaan yang indah. Di tahun 2020, semesta mempertemukan kami untuk pertama kalinya. Berawal dari bertukar pesan singkat, siapa sangka percakapan itu menjadi awal dari babak baru kehidupan kami.",
      img: story1 // Foto diperbarui
    },
    {
      date: "17 JULI 2025",
      desc: "Setelah melewati berbagai musim bersama, kami menyadari bahwa satu sama lain adalah pelabuhan terakhir. Pada tanggal 17 Juli, di hadapan keluarga besar, kami mengikat janji untuk melangkah ke arah yang lebih serius.",
      img: story2 // Foto diperbarui
    },
    {
      date: "04 MEI 2026",
      desc: "Kini, perjalanan panjang itu bermuara pada satu titik. Kami memutuskan untuk menyatukan dua hati dalam ikatan suci pernikahan. Memulai petualangan baru sebagai teman hidup selamanya.",
      img: story3 // Foto diperbarui
    }
  ];

  // Mengambil data RSVP dari Google Sheets saat web dimuat
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("https://script.google.com/macros/s/AKfycbxC6u87mRMXcdywvOJBYM_5Yxpxe3h8sIdiYs2n__rl5CkOWF0vKGUGbkmFxBrERuBPLw/exec", { // <-- GANTI DENGAN URL ASLI ANDA
          method: "GET",
          redirect: "follow" // INI KUNCI PENTING UNTUK GOOGLE SHEETS
        });
        
        const data = await response.json();
        
        // Pastikan data yang diterima benar-benar format Array dari Excel
        if (Array.isArray(data)) {
          setMessages(data);
        }
      } catch (error) {
        console.error("Gagal mengambil data dari Google Sheets:", error);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) {
      const name = to.replace(/\+/g, ' ');
      setGuestName(name);
      setRsvpForm(prev => ({ ...prev, name: name }));
    }
  }, []);

  useEffect(() => {
    const targetDate = new Date("2026-05-04T10:00:00+07:00").getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) { clearInterval(interval); return; }
      setTimeLeft({
        d: Math.floor(distance / (1000 * 60 * 60 * 24)),
        h: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        m: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        s: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Interval Slideshows
  useEffect(() => {
    const quoteInterval = setInterval(() => setQuoteSlideIndex(prev => (prev === 0 ? 1 : 0)), 3500);
    const saveDateInterval = setInterval(() => setSaveDateSlideIndex(prev => (prev === 0 ? 1 : 0)), 4000);
    return () => { clearInterval(quoteInterval); clearInterval(saveDateInterval); };
  }, []);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) { audioRef.current.play().catch(err => console.log(err)); setIsPlaying(true); }
  };

  const toggleAudio = () => {
    if (isPlaying) audioRef.current.pause(); else audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const copyRekening = (rek) => {
    navigator.clipboard.writeText(rek); setCopiedRek(rek); setTimeout(() => setCopiedRek(''), 2000);
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault(); 
    if (!rsvpForm.message.trim()) return;

    // Simpan pesan baru untuk ditampilkan di layar (Optimistic UI)
    const newMsg = { 
      name: rsvpForm.name || guestName, 
      message: rsvpForm.message, 
      attendance: rsvpForm.attendance 
    };
    
    setMessages([newMsg, ...messages]);
    
    // Reset form agar kosong kembali
    setRsvpForm({ ...rsvpForm, message: '' });

    // Kirim data ke Google Sheets di latar belakang
    try {
      await fetch("https://script.google.com/macros/s/AKfycbx7Uy5MDE7XlrwvbETKXo9-qAmD9oQdVthbNjrcMj7Xbx7U79BdCikuuuQ1vlZfY87wGA/exec", {
        method: "POST",
        // Menggunakan text/plain mem-bypass proteksi CORS bawaan browser yang ketat
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(newMsg)
      });
      console.log("Data berhasil dikirim ke Google Sheets!");
    } catch (error) {
      console.error("Gagal mengirim data RSVP:", error);
    }
  };

  // THEME COLORS
  const colorBg = "bg-[#f4f7f5]"; 
  const colorText = "text-[#4a5e4d]"; 
  const colorAccent = "bg-[#8a9f8d]"; 

  return (
    <div 
      className={`min-h-screen ${colorText} overflow-x-hidden relative`} 
      style={{ 
        fontFamily: "'Montserrat', sans-serif",
        backgroundImage: `url(${bgBunga})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <audio ref={audioRef} src={bgMusic} loop />

      {/* --- COVER OVERLAY (Dengan Animasi Gate Opening & Background Biru) --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 1 }} 
            exit={{ y: '-100%', opacity: 0 }} 
            transition={{ duration: 0.8, ease: "easeInOut" }} 
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center text-center p-6 bg-[#f4f8fa] overflow-hidden"
            style={{ 
              backgroundImage: `url(${bgMempelai})`, 
              backgroundSize: 'cover', 
              backgroundPosition: 'left top' 
            }}
          >
            {/* ANIMASI PINTU TERBUKA (GATE OPENING) */}
            <motion.div initial={{ x: 0 }} animate={{ x: '-100%' }} transition={{ duration: 1.2, ease: [0.75, 0, 0.25, 1], delay: 0.2 }} className="absolute top-0 left-0 w-1/2 h-full bg-white z-[60] flex justify-end items-center border-r border-gray-100 shadow-[5px_0_15px_rgba(0,0,0,0.05)]"></motion.div>
            <motion.div initial={{ x: 0 }} animate={{ x: '100%' }} transition={{ duration: 1.2, ease: [0.75, 0, 0.25, 1], delay: 0.2 }} className="absolute top-0 right-0 w-1/2 h-full bg-white z-[60] flex justify-start items-center border-l border-gray-100 shadow-[-5px_0_15px_rgba(0,0,0,0.05)]"></motion.div>

            {/* Overlay Gradient Tipis */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/50 to-white/80 z-0"></div>

            {/* KONTEN COVER (Menganimasi Fade-In & Slide-Up setelah pintu terbuka) */}
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 1, delay: 0.8, ease: "easeOut" }} className="relative z-10 flex flex-col items-center w-full">
              <h4 className="text-sm tracking-widest mb-4 text-[#2c3e50]" style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.5rem' }}>The Wedding Of</h4>
              <div className="w-48 h-64 mb-6 rounded-t-full rounded-b-full overflow-hidden border-[6px] border-white shadow-xl relative"><img src={coverImg} alt="Cover" className="w-full h-full object-cover" /></div>
              <h1 className="text-4xl mb-6 font-bold text-[#2c3e50]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>SALMA <span className="text-2xl font-light mx-2">&</span> AKMAL</h1>
              <div className="mb-10 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-sm border border-white/50 w-[80%] max-w-[300px]">
                <p className="text-xs mb-1 opacity-80 text-[#34495e]">Kepada Yth. Bapak/Ibu/Saudara/i</p>
                <p className="text-xl font-bold text-[#2c3e50] capitalize">{guestName}</p>
              </div>
              <button onClick={handleOpenInvitation} className="px-8 py-3 bg-[#50728c] text-white rounded-full hover:bg-[#34495e] transition-all flex items-center gap-2 shadow-lg text-sm font-bold tracking-widest uppercase border border-white/30"><FaEnvelopeOpenText /> Buka Undangan</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <button onClick={toggleAudio} className="fixed bottom-6 right-6 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-xl flex items-center justify-center text-[#546c57] z-[990]">
          {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} className="ml-1" />}
        </button>
      )}

      {isOpen && (
        <main className="max-w-md mx-auto bg-white/40 backdrop-blur-sm min-h-screen relative overflow-hidden pb-10 shadow-[0_0_40px_rgba(0,0,0,0.1)]">
          
          {/* HEADER SECTION */}
          <section className={`pt-20 pb-10 px-8 text-center relative`}>
            <FadeIn><h4 className="text-3xl mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>The Wedding Of</h4><h1 className="text-5xl mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>SALMA <br/> <span className="text-3xl">&</span> <br/> AKMAL(Yutin)</h1><p className="text-sm tracking-widest mt-6">Senin, 04 Mei 2026</p></FadeIn>
          </section>

          {/* QUOTE SECTION (Clean Card + Slideshow) */}
          <section className="py-16 px-6 relative z-10 text-center">
             <FadeIn>
               <div className="bg-[#fdfdfc] rounded-[40px] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#d8e2da] max-w-[360px] mx-auto relative overflow-hidden">
                 <div className="w-full h-[420px] rounded-[30px] overflow-hidden mb-8 relative shadow-sm border border-gray-100">
                   <img src={slide1Img} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${quoteSlideIndex === 0 ? 'opacity-100' : 'opacity-0'}`} alt="Couple Slide 1" />
                   <img src={slide2Img} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${quoteSlideIndex === 1 ? 'opacity-100' : 'opacity-0'}`} alt="Couple Slide 2" />
                 </div>
                 <h2 className="text-6xl mb-6 font-bold text-[#4a5e4d]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>S <span className="text-4xl text-[#8a9f8d] mx-2">&</span> A</h2>
                 <p className="text-sm leading-relaxed mb-8 italic text-[#4a5e4d] px-2 font-medium">"Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri..."</p>
                 <p className="text-sm font-bold tracking-widest text-[#6c8270] mb-4">Q.S Ar-Rum : 21</p>
               </div>
             </FadeIn>
          </section>

          {/* KEDUA MEMPELAI (Background Khusus) */}
          <section className="py-20 px-8 text-center relative overflow-hidden" style={{ backgroundImage: `url(${bgMempelai})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0"></div>
            <div className="relative z-10">
                <FloralCornerTop />
                <FadeIn><h2 className="text-5xl mb-6" style={{ fontFamily: "'Great Vibes', cursive", color: '#3d4d3f' }}>Kedua Mempelai</h2><p className="text-xs mb-10 leading-relaxed font-medium bg-white/60 p-4 rounded-xl max-w-[340px] mx-auto">Assalamu'alaikum Warahmatullahi Wabarakatuh<br/><br/>Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Ya Allah semoga ridho-Mu tercurah mengiringi pernikahan kami.</p></FadeIn>
                
                {/* BARU: Mempelai Wanita (Foto Lokal) */}
                <FadeIn delay={0.2}>
                  <div className="mb-16 relative z-10 bg-white/95 p-6 rounded-[50px] shadow-sm border border-white">
                    <div className="w-40 h-40 rounded-full mb-4 border-2 border-[#8a9f8d]/20 overflow-hidden shadow-xl mx-auto relative z-10">
                      <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{ delay: 4000, disableOnInteraction: false }}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        loop={true}
                        className="w-full h-full rounded-full"
                      >
                        {[bridge1, bridge3].map((img, index) => (
                          <SwiperSlide key={index}>
                            <img src={img} alt="Profil Wanita" className="w-full h-full object-cover rounded-full" />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <h3 className="text-4xl mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>Salma</h3>
                    <p className="font-bold text-lg mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#3d4d3f' }}>Salmaselviana</p>
                    <p className="text-xs mb-5 opacity-80 leading-relaxed text-[#4a5e4d]">Putri Keenam dari <br/> Bapak Ijrom & Ibu Fatimah</p>
                    <a href="https://www.instagram.com/salmaselviana12?igsh=MTh3NW9icXIybmlmeA==" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-[11px] font-bold text-[#6c8270] border border-[#6c8270] hover:bg-[#6c8270] hover:text-white transition-colors tracking-widest"><FaInstagram className="text-sm" /> @salmaselviana12</a>
                  </div>
                </FadeIn>
                
                <FadeIn delay={0.3}><div className="text-5xl mb-16 text-[#4a5e4d]" style={{ fontFamily: "'Great Vibes', cursive" }}>&</div></FadeIn>
                
                {/* BARU: Mempelai Pria (Foto Lokal) */}
                <FadeIn delay={0.4}>
                  <div className="relative z-10 bg-white/95 p-6 rounded-[50px] shadow-sm border border-white">
                    <div className="w-40 h-40 rounded-full mb-4 border-2 border-[#8a9f8d]/20 overflow-hidden shadow-xl mx-auto relative z-10">
                      <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{ delay: 6000, disableOnInteraction: false }}
                        pagination={{ clickable: true, dynamicBullets: true }}
                        loop={true}
                        className="w-full h-full rounded-full"
                      >
                        {[bridge2, bridge3].map((img, index) => (
                          <SwiperSlide key={index}>
                            <img src={img} alt="Profil Pria" className="w-full h-full object-cover rounded-full" />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>
                    <h3 className="text-4xl mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>Akmal</h3>
                    <p className="font-bold text-lg mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#3d4d3f' }}>Akmal Ginanjar (Yutin)</p>
                    <p className="text-xs mb-5 opacity-80 leading-relaxed text-[#4a5e4d]">Putra Pertama dari <br/> Bapak Anang & Ibu Isum</p>
                    <a href="https://www.instagram.com/yutinbram?igsh=MXN5Z3JmejhmZTg1dw==" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full text-[11px] font-bold text-[#6c8270] border border-[#6c8270] hover:bg-[#6c8270] hover:text-white transition-colors tracking-widest"><FaInstagram className="text-sm" /> @yutinbram</a>
                  </div>
                </FadeIn>
                <FloralCornerBottom />
            </div>
          </section>

          {/* LOVE STORY SECTION */}
          <section className="py-20 bg-[#95a898] relative">
            <div className="container mx-auto px-6 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-6xl text-white mb-2" style={{ fontFamily: "'Great Vibes', cursive" }}>Love Story</h2>
              </div>

              <div className="max-w-2xl mx-auto relative">
                {/* Garis Vertikal Timeline */}
                <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-0.5 bg-white/40 md:-translate-x-1/2"></div>

                {loveStory.map((story, index) => (
                  <div key={index} className={`relative pl-14 md:pl-0 mb-12 flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    
                {/* Ikon Hati Dinamis (Menempel di garis, menghadap kartu) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: index * 0.3 }}
                  viewport={{ once: true }}
                  className={`absolute top-6 w-10 h-10 bg-[#fdfaf6] rounded-full border-4 border-[#95a898] flex items-center justify-center text-[#95a898] z-10 shadow-md ${
                    index % 2 === 0 
                      ? 'left-[19px] md:left-1/2 md:-translate-x-1/2' // Posisi default (tengah garis)
                      : 'left-[19px] md:left-[calc(50%-2.5rem)]' // Dipindah ke kiri garis untuk kartu sebelah kanan
                  }`}
                >
                  <FaHeart className="text-sm" />
                </motion.div>

                {/* Kartu Cerita (Animasi Pudar + Hamparan Warna 800ms) */}
                <motion.div 
                  initial={{ opacity: 0, y: 40, backgroundColor: "#7c8f7f" }}
                  whileInView={{ opacity: 1, y: 0, backgroundColor: "#fdfaf6" }}
                  transition={{ duration: 0.8, delay: (index * 0.3) + 0.2 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className={`w-full md:w-[45%] rounded-xl p-4 shadow-lg overflow-hidden ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
                >
                  <img src={story.img} alt={`Love Story ${index}`} className="w-full h-48 object-cover rounded-lg mb-4" />
                  <h4 className="text-lg font-bold text-[#6c8270] mb-3 tracking-widest" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{story.date}</h4>
                  <p className="text-sm text-[#4a5e4d] leading-relaxed" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    {story.desc}
                  </p>
                </motion.div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SAVE THE DATE & EVENTS */}
          <section className="py-16 px-6 text-center relative z-10 border-t border-[#eef2ef]">
             <FadeIn>
                <div className="p-1 border border-[#8a9f8d] rounded-[24px] mb-8 mx-auto max-w-[340px] shadow-lg bg-white/20 backdrop-blur-sm">
                  <div className="w-full h-56 rounded-[20px] overflow-hidden relative border border-white">
                    <img src={slide3Img} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${saveDateSlideIndex === 0 ? 'opacity-100' : 'opacity-0'}`} alt="Prewed Slide 1" />
                    <img src={slide4Img} className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${saveDateSlideIndex === 1 ? 'opacity-100' : 'opacity-0'}`} alt="Prewed Slide 2" />
                  </div>
                </div>
                <h2 className="text-5xl mb-8 text-[#4a5e4d] font-bold" style={{ fontFamily: "'Great Vibes', cursive" }}>Save The Date</h2>
                <div className="flex justify-center gap-3 mb-12">
                  {[ { l: 'Hari', v: timeLeft.d }, { l: 'Jam', v: timeLeft.h }, { l: 'Menit', v: timeLeft.m }, { l: 'Detik', v: timeLeft.s } ].map((i, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center w-[70px] h-[75px] rounded-xl border border-[#8a9f8d] bg-white/30 backdrop-blur-sm shadow-sm">
                      <span className="text-2xl font-serif text-[#4a5e4d]">{i.v}</span><span className="text-[10px] uppercase mt-1 text-[#6c8270] tracking-widest">{i.l}</span>
                    </div>
                  ))}
                </div>
             </FadeIn>
             <div className="space-y-12 relative z-10">
               <FadeIn delay={0.2}><div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-[150px] shadow-xl max-w-[320px] mx-auto"><div className="border border-[#8a9f8d] rounded-[140px] px-6 py-14 bg-[#fdfdfc] relative overflow-hidden flex flex-col items-center"><h3 className="text-xl tracking-[0.2em] uppercase font-bold text-[#4a5e4d] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Akad Nikah</h3><div className="w-32 h-[1px] bg-[#4a5e4d] mb-6 opacity-40"></div><h4 className="text-5xl text-[#4a5e4d] mb-1" style={{ fontFamily: "'Great Vibes', cursive" }}>Senin</h4><h2 className="text-7xl font-bold text-[#3d4d3f] mb-2 leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>04</h2><p className="tracking-[0.15em] uppercase text-sm font-bold text-[#4a5e4d] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Mei 2026</p><p className="text-xs font-bold mb-6 flex items-center justify-center gap-2 text-[#546c57] bg-[#f4f7f5] px-5 py-2 rounded-full border border-[#e8ece9]"><FaClock className="text-[#8a9f8d]"/> 10.00 - 11.00 WIB</p><p className="text-lg font-bold text-[#4a5e4d] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Lokasi Acara</p><p className="text-[11px] text-[#546c57] mb-4 leading-relaxed font-medium">2XX9+FGC Jambenenggang<br/>Kabupaten Sukabumi, Jawa Barat</p><div className="w-full h-40 mb-6 rounded-[20px] overflow-hidden border border-[#8a9f8d] shadow-inner relative z-20"><iframe src="https://maps.google.com/maps?q=2XX9%2BFGC%20Jambenenggang,%20Kabupaten%20Sukabumi,%20Jawa%20Barat&t=&z=16&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div><button onClick={() => window.open("https://www.google.com/maps/search/?api=1&query=2XX9%2BFGC+Jambenenggang,+Kabupaten+Sukabumi,+Jawa+Barat", "_blank")} className="px-8 py-2.5 bg-[#6c8270] text-white rounded-full text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#4a5e4d] transition-colors font-semibold tracking-widest border border-white/50 relative z-20"><FaMapMarkerAlt/> Buka di Peta</button></div></div></FadeIn>
               <FadeIn delay={0.4}><div className="bg-white/90 backdrop-blur-sm p-1.5 rounded-[150px] shadow-xl max-w-[320px] mx-auto"><div className="border border-[#8a9f8d] rounded-[140px] px-6 py-14 bg-[#fdfdfc] relative overflow-hidden flex flex-col items-center"><h3 className="text-xl tracking-[0.2em] uppercase font-bold text-[#4a5e4d] mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Resepsi</h3><div className="w-32 h-[1px] bg-[#4a5e4d] mb-6 opacity-40"></div><h4 className="text-5xl text-[#4a5e4d] mb-1" style={{ fontFamily: "'Great Vibes', cursive" }}>Senin</h4><h2 className="text-7xl font-bold text-[#3d4d3f] mb-2 leading-none" style={{ fontFamily: "'Cormorant Garamond', serif" }}>04</h2><p className="tracking-[0.15em] uppercase text-sm font-bold text-[#4a5e4d] mb-8" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Mei 2026</p><p className="text-xs font-bold mb-6 flex items-center justify-center gap-2 text-[#546c57] bg-[#f4f7f5] px-5 py-2 rounded-full border border-[#e8ece9]"><FaClock className="text-[#8a9f8d]"/> 11.00 WIB - Selesai</p><p className="text-lg font-bold text-[#4a5e4d] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Lokasi Acara</p><p className="text-[11px] text-[#546c57] mb-4 leading-relaxed font-medium">2XX9+FGC Jambenenggang<br/>Kabupaten Sukabumi, Jawa Barat</p><div className="w-full h-40 mb-6 rounded-[20px] overflow-hidden border border-[#8a9f8d] shadow-inner relative z-20"><iframe src="https://maps.google.com/maps?q=2XX9%2BFGC%20Jambenenggang,%20Kabupaten%20Sukabumi,%20Jawa%20Barat&t=&z=16&ie=UTF8&iwloc=&output=embed" width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe></div><button onClick={() => window.open("https://www.google.com/maps/search/?api=1&query=2XX9%2BFGC+Jambenenggang,+Kabupaten+Sukabumi,+Jawa+Barat", "_blank")} className="px-8 py-2.5 bg-[#6c8270] text-white rounded-full text-xs flex items-center justify-center gap-2 shadow-md hover:bg-[#4a5e4d] transition-colors font-semibold tracking-widest border border-white/50 relative z-20"><FaMapMarkerAlt/> Buka di Peta</button></div></div></FadeIn>
             </div>
          </section>

          {/* GALERI MASONRY + LIGHTBOX */}
          <section className="py-16 px-6 relative z-10 text-center bg-white/60 backdrop-blur-md border-y border-white mt-12">
            <FadeIn><h2 className="text-5xl mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>Our Moments</h2><p className="text-xs tracking-widest text-[#6c8270] uppercase mb-10 font-bold">Galeri Bahagia</p></FadeIn>
            <div className="columns-2 gap-3 space-y-3 relative z-10">{galleryImages.map((img, idx) => (<FadeIn delay={0.1 * (idx % 3)} key={idx}><div className="break-inside-avoid rounded-xl overflow-hidden shadow-sm border-2 border-white cursor-pointer relative group" onClick={() => setLightboxIndex(idx)}><img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500" /><div className="absolute inset-0 bg-black/0 group-hover:bg-[#546c57]/30 transition-colors duration-300 flex items-center justify-center"><span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-3xl">+</span></div></div></FadeIn>))}</div>
          </section>

          {/* WEDDING GIFT (ATM Card Style) */}
          <section className="py-16 px-6 text-center relative z-10">
             <FadeIn><h2 className="text-5xl mb-4" style={{ fontFamily: "'Great Vibes', cursive" }}>Wedding Gift</h2><p className="text-xs mb-8 bg-white/70 p-4 rounded-xl shadow-sm text-[#4a5e4d] font-medium leading-relaxed">Doa Restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika memberi adalah ungkapan tanda kasih, Anda dapat memberi melalui di bawah ini.</p></FadeIn>
             <div className="space-y-6">
               {[
                 { id: 'BCA', logo: logoBca, rek: '3771 7529 83', name: 'AKMAL GINANJAR AGUSTIAN' },
                 { id: 'SeaBank', logo: logoSeabank, rek: '9015 5929 7044', name: 'SALMA SELVIANA' }
               ].map((bank, idx) => (
                 <FadeIn delay={0.2 * idx} key={bank.id}>
                   <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[#768a78] to-[#4a5e4d] shadow-xl border border-[#8a9f8d] overflow-hidden text-left">
                      <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div><div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-xl pointer-events-none"></div>
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        {/* Logo Bank Lokal - Dioptimalkan */}
                        <div className="bg-white px-2 py-1.5 rounded-md h-[42px] w-[80px] flex items-center justify-center shadow-md relative z-20"><img src={bank.logo} alt={bank.id} className="w-full h-full object-contain scale-110" /></div>
                        {/* Ikon Chip Kuningan ATM */}
                        <div className="w-14 h-10 bg-gradient-to-br from-yellow-200 to-yellow-500 rounded-md flex items-center justify-center opacity-90 shadow-sm overflow-hidden border border-yellow-600/50"><div className="w-full h-[1px] bg-yellow-600/40 absolute top-1/2"></div><div className="w-[1px] h-full bg-yellow-600/40 absolute left-1/3"></div><div className="w-[1px] h-full bg-yellow-600/40 absolute right-1/3"></div></div>
                      </div>
                      <div className="relative z-10 mb-4"><p className="text-white/80 text-[10px] uppercase tracking-widest mb-1">No Rekening</p><p className="text-white text-xl font-bold tracking-[0.15em] mb-4 font-mono shadow-black/20 text-shadow-sm">{bank.rek}</p></div>
                      <div className="flex flex-wrap justify-between items-end gap-3 relative z-10">
                        <div className="flex-1 min-w-[150px]">
                          <p className="text-white/80 text-[10px] uppercase tracking-widest mb-1">Atas Nama</p>
                          <p className="text-white text-sm font-semibold tracking-wider leading-tight uppercase">{bank.name}</p>
                        </div>
                        <button 
                          onClick={() => copyRekening(bank.rek)} 
                          className="flex items-center gap-2 px-4 py-2 bg-white text-[#4a5e4d] rounded-xl text-xs shadow-lg hover:bg-[#eef2ef] font-bold transition-all whitespace-nowrap"
                        >
                          <FaRegCopy className="text-lg" /> {copiedRek === bank.rek ? 'Tersalin' : 'Salin'}
                        </button>
                      </div>                   </div>
                 </FadeIn>
               ))}
             </div>
          </section>

          {/* WISHES / RSVP (Revealing Overlay & Delayed Animation) */}
          <section className="py-16 px-6 text-center relative z-10 overflow-hidden">
             <div className="absolute inset-0 bg-white/70 backdrop-blur-sm z-0 pointer-events-none"></div>
             <FadeIn delay={1.2}>
               <div className="relative z-10">
                   <h2 className="text-6xl mb-2" style={{ fontFamily: "'Great Vibes', cursive", color: '#3d4d3f' }}>Wishes</h2><p className="text-sm mb-10 text-[#4a5e4d] font-medium max-w-[320px] mx-auto leading-relaxed">Berikan doa dan ucapan terbaik untuk kami.</p>
                   <form onSubmit={handleRsvpSubmit} className="mb-10 max-w-[340px] mx-auto">
                     <input type="text" value={rsvpForm.name} onChange={e => setRsvpForm({...rsvpForm, name: e.target.value})} placeholder="Nama" className="w-full mb-3 px-4 py-3 rounded-xl bg-white/95 border border-white focus:outline-none focus:ring-2 focus:ring-[#8a9f8d] shadow-sm text-[#4a5e4d] placeholder:text-[#8a9f8d] font-medium" required />
                     <textarea value={rsvpForm.message} onChange={e => setRsvpForm({...rsvpForm, message: e.target.value})} placeholder="Ucapan" className="w-full mb-6 px-4 py-3 rounded-xl bg-white/95 border border-white focus:outline-none focus:ring-2 focus:ring-[#8a9f8d] shadow-sm h-28 resize-none text-[#4a5e4d] placeholder:text-[#8a9f8d] font-medium" required></textarea>
                     <div className="flex items-center gap-4 mb-6"><hr className="flex-1 border-[#4a5e4d]/20" /><span className="text-sm font-bold text-[#3d4d3f]" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Konfirmasi Kehadiran</span><hr className="flex-1 border-[#4a5e4d]/20" /></div>
                     <div className="flex gap-3 mb-8">
                        <button type="button" onClick={() => setRsvpForm({...rsvpForm, attendance: 'hadir'})} className={`flex-1 py-2.5 rounded-full border flex items-center justify-center gap-2 text-sm font-bold transition-all ${rsvpForm.attendance === 'hadir' ? 'bg-[#eef2ef] border-[#6c8270] text-[#3d4d3f] shadow-sm' : 'bg-white/60 border-[#6c8270]/40 text-[#4a5e4d]/70'}`}><FaCheckCircle className={rsvpForm.attendance === 'hadir' ? 'text-[#3d4d3f]' : ''} /> Hadir</button>
                        <button type="button" onClick={() => setRsvpForm({...rsvpForm, attendance: 'tidak'})} className={`flex-1 py-2.5 rounded-full border flex items-center justify-center gap-2 text-sm font-bold transition-all ${rsvpForm.attendance === 'tidak' ? 'bg-[#eef2ef] border-[#6c8270] text-[#3d4d3f] shadow-sm' : 'bg-white/60 border-[#6c8270]/40 text-[#4a5e4d]/70'}`}><FaTimesCircle className={rsvpForm.attendance === 'tidak' ? 'text-[#3d4d3f]' : ''} /> Tidak Hadir</button>
                     </div>
                     <button type="submit" className={`w-full py-3 bg-[#8a9f8d] hover:bg-[#6c8270] text-white rounded-full text-sm font-bold tracking-widest shadow-md transition-colors border border-white/50`}>Kirim</button>
                   </form>
                   <div className="space-y-4 text-left max-w-[340px] mx-auto max-h-[350px] overflow-y-auto pr-2 relative z-10">
                     {messages.map((msg, i) => (
                       <div key={i} className="bg-white/95 p-5 rounded-xl shadow-sm border border-white/50 relative overflow-hidden"><h5 className="font-bold text-[17px] text-[#6c8270] mb-1" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{msg.name}</h5><p className="text-[13px] text-[#4a5e4d] leading-relaxed font-medium">{msg.message}</p><span className={`absolute top-4 right-4 text-xl ${msg.attendance === 'hadir' ? 'text-green-600' : 'text-red-600'}`}>{msg.attendance === 'hadir' ? <FaCheckCircle/> : <FaTimesCircle/>}</span></div>
                     ))}
                   </div>
               </div>
             </FadeIn>
          </section>

          {/* CLOSING */}
          <section className="py-16 px-8 text-center relative z-10 border-t border-[#eef2ef]">
             <FadeIn><div className="bg-white/90 p-8 rounded-[50px] shadow-sm border border-white"><h2 className="text-5xl mb-6" style={{ fontFamily: "'Great Vibes', cursive" }}>Terima Kasih</h2><p className="text-xs leading-relaxed mb-6 opacity-80">Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.</p><p className="text-sm font-bold mb-2 text-[#4a5e4d]">Kami Yang Berbahagia</p><h3 className="text-2xl" style={{ fontFamily: "'Cormorant Garamond', serif" }}>SALMA & AKMAL(Yutin)</h3></div></FadeIn>
          </section>

        </main>
      )}

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center backdrop-blur-md" onClick={() => setLightboxIndex(null)}>
            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-50 text-white/80"><span className="font-mono text-lg tracking-widest">{lightboxIndex + 1} / {galleryImages.length}</span><button onClick={() => setLightboxIndex(null)} className="p-2 hover:text-white transition-colors bg-white/10 rounded-full"><FaTimes size={24} /></button></div>
            <button onClick={(e) => { e.stopPropagation(); setLightboxIndex(prev => prev === 0 ? galleryImages.length - 1 : prev - 1); }} className="absolute left-2 md:left-6 p-3 bg-black/50 rounded-full text-white/70 hover:text-white hover:bg-black/80 transition-all z-50"><FaChevronLeft size={24} /></button>
            <div className="w-full max-w-4xl h-[80vh] px-12 flex items-center justify-center relative"><motion.img key={lightboxIndex} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }} src={galleryImages[lightboxIndex]} className="max-h-full max-w-full object-contain rounded-md shadow-2xl" alt="Lightbox View" onClick={(e) => e.stopPropagation()} /></div>
            <button onClick={(e) => { e.stopPropagation(); setLightboxIndex(prev => prev === galleryImages.length - 1 ? 0 : prev + 1); }} className="absolute right-2 md:right-6 p-3 bg-black/50 rounded-full text-white/70 hover:text-white hover:bg-black/80 transition-all z-50"><FaChevronRight size={24} /></button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;