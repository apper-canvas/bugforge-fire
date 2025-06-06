import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const BugErrorState = ({ error, onRetry }) => {
    return (
        &lt;motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="brutal-border bg-secondary p-8 text-center shadow-brutal"
        &gt;
            &lt;ApperIcon name="AlertTriangle" className="w-12 h-12 text-critical mx-auto mb-4" /&gt;
            &lt;h3 className="text-lg font-bold text-critical mb-2 uppercase"&gt;SYSTEM_FAILURE&lt;/h3&gt;
            &lt;p className="text-steel mb-4 font-mono"&gt;{error}&lt;/p&gt;
            &lt;Button
                onClick={onRetry}
                className="brutal-border bg-primary text-ghost px-4 py-2 font-mono uppercase text-sm hover:bg-steel transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            &gt;
                RETRY_CONNECTION
            &lt;/Button&gt;
        &lt;/motion.div&gt;
    );
};

export default BugErrorState;