import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(true)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-primary"
    >
      {/* Header */}
      <header className="brutal-border border-b bg-secondary p-4">
        <div className="container mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-primary brutal-border p-2 shadow-brutal">
              <ApperIcon name="Bug" className="w-6 h-6 text-terminal terminal-glow" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-ghost uppercase tracking-wider">
                BUGFORGE
              </h1>
              <p className="text-xs text-steel uppercase">
                DIGITAL_BUG_ANNIHILATION_v2.0
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="flex items-center space-x-2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <button
              onClick={toggleDarkMode}
              className="brutal-border bg-primary p-2 text-ghost hover:bg-steel transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
            >
              <ApperIcon name={darkMode ? "Sun" : "Moon"} className="w-4 h-4" />
            </button>
            <div className="text-xs text-steel font-mono">
              STATUS: <span className="text-terminal terminal-glow">ONLINE</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* ASCII Divider */}
      <div className="ascii-divider py-1"></div>

      {/* Main Content */}
      <main className="container mx-auto p-4">
        <MainFeature />
      </main>

      {/* Footer */}
      <footer className="mt-8 border-t-2 border-steel bg-secondary p-4">
        <div className="container mx-auto text-center">
          <div className="ascii-divider py-2"></div>
          <p className="text-xs text-steel font-mono uppercase">
            SYSTEM_OPERATIONAL :: BUGS_TERMINATED :: EFFICIENCY_MAXIMIZED
          </p>
        </div>
      </footer>
    </motion.div>
  )
}

export default Home