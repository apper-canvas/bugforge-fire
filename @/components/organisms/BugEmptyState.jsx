import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const BugEmptyState = ({ searchQuery, statusFilter, onCreateBugClick }) => {
    return (
        &lt;motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="brutal-border bg-secondary p-12 text-center shadow-brutal"
        &gt;
            &lt;motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="mb-6"
            &gt;
                &lt;ApperIcon name="Bug" className="w-16 h-16 text-steel mx-auto" /&gt;
            &lt;/motion.div&gt;
            &lt;h3 className="text-lg font-bold text-ghost mb-2 uppercase font-mono"&gt;NO_BUGS_DETECTED&lt;/h3&gt;
            &lt;p className="text-steel mb-6 font-mono text-sm"&gt;
                {searchQuery || statusFilter !== 'all'
                    ? 'NO_MATCHES_FOUND :: ADJUST_SEARCH_PARAMETERS'
                    : 'SYSTEM_CLEAN :: AWAITING_NEW_TARGETS'
                }
            &lt;/p&gt;
            &lt;Button
                onClick={onCreateBugClick}
                className="brutal-border bg-terminal text-primary px-6 py-3 font-mono uppercase text-sm font-bold shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            &gt;
                LOG_NEW_BUG
            &lt;/Button&gt;
        &lt;/motion.div&gt;
    );
};

export default BugEmptyState;