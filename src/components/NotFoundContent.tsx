import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export const NotFoundContent = () => {
  return (
    <div className='text-center'>
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        className='text-9xl font-bold text-[#6d93d9] mb-4'
      >
        404
      </motion.h1>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className='text-2xl mb-6'
      >
        Oops! The page you're looking for doesn't exist.
      </motion.p>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <Link
          to='/'
          className='inline-block bg-[#6d93d9] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-[#5a7bb5] transition-colors'
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  )
}