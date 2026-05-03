import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import AnimatedBackground from './components/AnimatedBackground'
import './App.css'

/* ───────── Animation variants ───────── */
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}
const slideL = {
  hidden: { opacity: 0, x: -80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}
const slideR = {
  hidden: { opacity: 0, x: 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
}
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85, rotateX: 8 },
  visible: { opacity: 1, scale: 1, rotateX: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
}
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }

/* ───────── Animated wrapper ───────── */
function Anim({ children, v = fadeUp, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} variants={v} initial="hidden"
      animate={inView ? 'visible' : 'hidden'} className={className}
      style={{ perspective: 800 }}>
      {children}
    </motion.div>
  )
}

/* ───────── Parallax Section ───────── */
function ParallaxSection({ children, speed = 0.15, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [80 * speed, -80 * speed])
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}

/* ───────── Parallax Phone Frame ───────── */
function Phone({ src, alt, index = 0 }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Each phone moves at a slightly different speed for depth
  const yOffset = 30 + (index % 3) * 20
  const y = useTransform(scrollYProgress, [0, 1], [yOffset, -yOffset])
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [3, 0, -3])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.92, 1, 1, 0.95])

  return (
    <motion.div
      ref={ref}
      className="phone-frame"
      style={{ y, rotateY, scale, perspective: 1000 }}
    >
      <div className="phone-frame__notch" />
      <div className="phone-frame__screen">
        <img src={src} alt={alt} className="phone-frame__img" loading="lazy" />
      </div>
    </motion.div>
  )
}

/* ───────── Section Data ───────── */
const SECTIONS = [
  {
    id: 'home', num: '01', cat: 'Main App', icon: '🏠', title: 'Home Dashboard',
    desc: 'See your daily readiness score, track protein & calorie intake with circular progress rings, monitor sleep, count steps, and keep your exercise goals and gym streaks in check — all from one dashboard.',
    images: Array.from({ length: 11 }, (_, i) => `/images/Home/${i + 1}.jpeg`),
  },
  {
    id: 'food', num: '02', cat: 'Main App', icon: '🍴', title: 'Food Search',
    desc: 'Search any food by name, log meals using grams or serving count, build multi-item meals, and view detailed nutrient breakdowns — including protein, calories, vitamins, and minerals from an extensive database.',
    images: [0, 1, 2, 3, 5, 6].map(i => `/images/Food Search/${i}.jpeg`),
  },
  {
    id: 'activity', num: '03', cat: 'Main App', icon: '📋', title: 'Activity Log',
    desc: 'Browse your complete food and workout history organized by date. Filter by month, tap any entry to expand details, and review what you ate and how you trained on any given day.',
    images: Array.from({ length: 6 }, (_, i) => `/images/Activity log/${i + 1}.jpeg`),
  },
  {
    id: 'workout', num: '04', cat: 'Main App', icon: '💪', title: 'Workout Tracker',
    desc: 'Organize exercises by Push, Pull, and Leg splits. Log sets, reps, and weights for movements like Chest Press and Pec Fly. Review previous sessions and progressively overload your training.',
    images: Array.from({ length: 3 }, (_, i) => `/images/Workout/${i + 1}.jpeg`),
  },
  {
    id: 'progress', num: '05', cat: 'Main App', icon: '📊', title: 'Progress',
    desc: 'View your overall fitness score combining training volume, protein intake, sleep quality, and consistency. Track workout streaks, protein goals, and visualize your transformation over time.',
    images: Array.from({ length: 6 }, (_, i) => `/images/Progress/${i + 1}.jpeg`),
  },
  {
    id: 'calis-home', num: '06', cat: 'Calisthenics', icon: '🤸', title: 'Calisthenics Home',
    desc: 'Access your calisthenics training hub — browse skill progressions, view current programs, and get personalized bodyweight exercise recommendations based on your current level.',
    images: Array.from({ length: 3 }, (_, i) => `/images/Calis Home/${i + 1}.jpeg`),
  },
  {
    id: 'calis-log', num: '07', cat: 'Calisthenics', icon: '📝', title: 'Training Log',
    desc: 'Review your calisthenics training history with session details, volume tracking, and personal records. Monitor your bodyweight training progress across different movement patterns.',
    images: Array.from({ length: 2 }, (_, i) => `/images/Calis training log/${i + 1}.jpeg`),
  },
  {
    id: 'calis-workout', num: '08', cat: 'Calisthenics', icon: '🏋️', title: 'Calisthenics Workout',
    desc: 'Follow structured bodyweight routines with exercises organized by muscle group. Track your sets and reps, switch between progressions, and scale difficulty as you get stronger.',
    images: Array.from({ length: 4 }, (_, i) => `/images/Calis Training/${i + 1}.jpeg`),
  },
  {
    id: 'stopwatch', num: '09', cat: 'Utilities', icon: '⏱️', title: 'Stopwatch',
    desc: 'Time your sets and rest periods with a high-precision stopwatch. Record lap times, view split breakdowns, and keep your training tempo consistent during intense sessions.',
    images: Array.from({ length: 3 }, (_, i) => `/images/stopwatch/${i + 1}.jpeg`),
  },
  {
    id: 'timer', num: '10', cat: 'Utilities', icon: '⏳', title: 'Timer',
    desc: 'Set custom countdown timers for rest intervals, HIIT rounds, or Tabata sets. The timer runs in the background and alerts you when it is time to move on to the next exercise.',
    images: ['/images/timer/1.jpeg'],
  },
  {
    id: 'alarm', num: '11', cat: 'Utilities', icon: '🔔', title: 'Alarm',
    desc: 'Schedule recurring alarms for gym sessions, meal times, supplement reminders, and sleep schedules. Stay consistent with smart notifications that keep your routine on track.',
    images: Array.from({ length: 4 }, (_, i) => `/images/alarm/${i + 1}.jpeg`),
  },
  {
    id: 'settings', num: '12', cat: 'Profile', icon: '⚙️', title: 'Settings',
    desc: 'Configure your daily calorie and protein targets, set body metrics, manage notification preferences, and adjust app behavior to perfectly match your fitness goals and lifestyle.',
    images: Array.from({ length: 2 }, (_, i) => `/images/setting/${i + 1}.jpeg`),
  },
  {
    id: 'profile', num: '13', cat: 'Profile', icon: '👤', title: 'Profile',
    desc: 'View and update your personal information, body measurements, and fitness stats. Your profile stores all your preferences and serves as the foundation for personalized tracking.',
    images: Array.from({ length: 2 }, (_, i) => `/images/profile/${i + 1}.jpeg`),
  },
]

const NAV_LINKS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'food', label: 'Food', icon: '🍴' },
  { id: 'workout', label: 'Workout', icon: '💪' },
  { id: 'progress', label: 'Progress', icon: '📊' },
  { id: 'calis-home', label: 'Calis', icon: '🤸' },
  { id: 'stopwatch', label: 'Tools', icon: '⏱️' },
  { id: 'profile', label: 'Profile', icon: '👤' },
]

/* ───────── App ───────── */
function App() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9])

  return (
    <div className="app">
      {/* Animated canvas background */}
      <AnimatedBackground />

      {/* Background orbs */}
      <div className="bg-orbs">
        <div className="bg-orb bg-orb--1" />
        <div className="bg-orb bg-orb--2" />
        <div className="bg-orb bg-orb--3" />
        <div className="bg-orb bg-orb--4" />
      </div>

      {/* Progress bar */}
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />

      {/* Navbar */}
      <nav className="navbar" id="nav">
        <div className="navbar__logo">
          <span className="navbar__logo-icon">S</span>
          <span className="navbar__logo-text">FitTracker</span>
        </div>
        <ul className="navbar__links">
          {NAV_LINKS.map(l => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="navbar__link">
                <span className="navbar__link-icon">{l.icon}</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero — parallax fade out on scroll */}
      <motion.section className="hero" id="hero"
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}>
        <motion.div className="hero__badge"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}>
          <span className="hero__badge-dot" />
          All-in-One Fitness App
        </motion.div>

        <motion.h1 className="hero__title"
          initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>
          Track. Train.{' '}
          <span className="hero__title-accent">Transform.</span>
        </motion.h1>

        <motion.p className="hero__subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}>
          A neumorphic fitness companion that helps you log meals, plan workouts,
          master calisthenics, and track your progress — all in one beautifully
          designed app. Here's a walkthrough of every screen and feature.
        </motion.p>

        <motion.div className="hero__features"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}>
          {[
            { icon: '🍎', text: 'Nutrition Tracking' },
            { icon: '🏋️', text: 'Workout Planner' },
            { icon: '🤸', text: 'Calisthenics' },
            { icon: '📊', text: 'Progress Analytics' },
          ].map((f, i) => (
            <motion.div key={i} className="hero__feature"
              whileHover={{ scale: 0.95, boxShadow: 'inset 3px 3px 6px #b8bec7, inset -3px -3px 6px #ffffff' }}>
              <span className="hero__feature-icon">{f.icon}</span>
              <span className="hero__feature-text">{f.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="hero__scroll"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}>
          Scroll to explore
          <div className="hero__scroll-line" />
        </motion.div>
      </motion.section>

      {/* Sections */}
      {SECTIONS.map((s, idx) => (
        <section key={s.id} id={s.id} className="section">
          <div className="section__card">
            <ParallaxSection speed={0.3}>
              <Anim v={idx % 2 === 0 ? slideL : slideR} className="section__header">
                <div className="section__label-row">
                  <motion.span className="section__number"
                    whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.4 } }}>
                    {s.icon}
                  </motion.span>
                  <span className="section__category">{s.cat}</span>
                </div>
                <h2 className="section__title">{s.title}</h2>
                <p className="section__desc">{s.desc}</p>
              </Anim>
            </ParallaxSection>

            <motion.div className="phone-row"
              variants={stagger} initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}>
              {s.images.map((img, i) => (
                <Anim key={i} v={scaleIn}>
                  <Phone src={img} alt={`${s.title} screen ${i + 1}`} index={i} />
                </Anim>
              ))}
            </motion.div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="footer">
        <Anim v={scaleIn}>
          <div className="footer__card">
            <p className="footer__text">
              Built with <span className="footer__heart">♥</span> using React + Neumorphic Design
            </p>
          </div>
        </Anim>
      </footer>
    </div>
  )
}

export default App
