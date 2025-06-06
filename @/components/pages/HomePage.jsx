import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AppHeader from '@/components/organisms/AppHeader';
import AppFooter from '@/components/organisms/AppFooter';
import BugTracker from '@/components/organisms/BugTracker';

const HomePage = () => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    &lt;motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-primary"
    &gt;
      &lt;AppHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} /&gt;

      {/* ASCII Divider */}
      &lt;div className="ascii-divider py-1"&gt;&lt;/div&gt;

      {/* Main Content */}
      &lt;main className="container mx-auto p-4"&gt;
        &lt;BugTracker /&gt;
      &lt;/main&gt;

      &lt;AppFooter /&gt;
    &lt;/motion.div&gt;
  );
};

export default HomePage;