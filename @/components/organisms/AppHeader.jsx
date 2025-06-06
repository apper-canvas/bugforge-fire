import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const AppHeader = ({ darkMode, toggleDarkMode }) => {
    return (
        &lt;header className="brutal-border border-b bg-secondary p-4"&gt;
            &lt;div className="container mx-auto flex items-center justify-between"&gt;
                &lt;motion.div
                    className="flex items-center space-x-4"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                &gt;
                    &lt;div className="bg-primary brutal-border p-2 shadow-brutal"&gt;
                        &lt;ApperIcon name="Bug" className="w-6 h-6 text-terminal terminal-glow" /&gt;
                    &lt;/div&gt;
                    &lt;div&gt;
                        &lt;h1 className="text-xl font-bold text-ghost uppercase tracking-wider"&gt;
                            BUGFORGE
                        &lt;/h1&gt;
                        &lt;p className="text-xs text-steel uppercase"&gt;
                            DIGITAL_BUG_ANNIHILATION_v2.0
                        &lt;/p&gt;
                    &lt;/div&gt;
                &lt;/motion.div&gt;

                &lt;motion.div
                    className="flex items-center space-x-2"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                &gt;
                    &lt;Button
                        onClick={toggleDarkMode}
                        className="brutal-border bg-primary p-2 text-ghost hover:bg-steel transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                    &gt;
                        &lt;ApperIcon name={darkMode ? "Sun" : "Moon"} className="w-4 h-4" /&gt;
                    &lt;/Button&gt;
                    &lt;div className="text-xs text-steel font-mono"&gt;
                        STATUS: &lt;span className="text-terminal terminal-glow"&gt;ONLINE&lt;/span&gt;
                    &lt;/div&gt;
                &lt;/motion.div&gt;
            &lt;/div&gt;
        &lt;/header&gt;
    );
};

export default AppHeader;