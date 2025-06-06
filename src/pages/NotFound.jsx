import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-primary flex items-center justify-center p-4"
    >
      <div className="text-center brutal-border bg-secondary p-8 shadow-brutal max-w-md w-full">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="mb-6"
        >
          <ApperIcon name="AlertTriangle" className="w-16 h-16 text-critical mx-auto" />
        </motion.div>
        
        <h1 className="text-6xl font-bold text-critical mb-4 font-mono">404</h1>
        <h2 className="text-xl font-bold text-ghost mb-2 uppercase">SYSTEM_ERROR</h2>
        <p className="text-steel mb-6 font-mono text-sm">
          RESOURCE_NOT_FOUND :: TERMINATING_REQUEST
        </p>
        
        <div className="ascii-divider py-2"></div>
        
        <motion.button
          onClick={() => navigate('/')}
          className="brutal-border bg-primary text-ghost px-6 py-3 font-mono uppercase text-sm hover:bg-steel transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          RETURN_TO_BASE
        </motion.button>
      </div>
    </motion.div>
  )
}

export default NotFound