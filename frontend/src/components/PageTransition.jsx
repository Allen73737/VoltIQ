import { motion } from 'framer-motion'

export default function PageTransition({ children, className = '' }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, scale: 0.985, filter: 'blur(14px)' }}
      transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.main>
  )
}
