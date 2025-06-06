import React from 'react';
import { motion } from 'framer-motion';

const BugLoadingState = () => {
    return (
        &lt;div className="space-y-6"&gt;
            {[...Array(3)].map((_, i) => (
                &lt;motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="brutal-border bg-secondary p-6 shadow-brutal"
                &gt;
                    &lt;div className="animate-pulse space-y-4"&gt;
                        &lt;div className="h-4 bg-steel rounded w-3/4"&gt;&lt;/div&gt;
                        &lt;div className="h-4 bg-steel rounded w-1/2"&gt;&lt;/div&gt;
                        &lt;div className="h-20 bg-steel rounded w-full"&gt;&lt;/div&gt;
                    &lt;/div&gt;
                &lt;/motion.div&gt;
            ))}
        &lt;/div&gt;
    );
};

export default BugLoadingState;