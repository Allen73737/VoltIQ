import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 130, damping: 24, mass: 0.18 })

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[90] h-[3px] origin-left bg-[linear-gradient(90deg,#38bdf8,#a5f3fc,#22d3ee)] shadow-[0_0_22px_rgba(56,189,248,.8)]"
      style={{ scaleX }}
    />
  )
}
