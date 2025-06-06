import React from 'react';
import { motion } from 'framer-motion';
import StatCard from '@/components/molecules/StatCard';

const BugStats = ({ bugs }) => {
    const stats = [
        { label: 'TOTAL', count: bugs.length, color: 'text-ghost' },
        { label: 'ACTIVE', count: bugs.filter(b => b.status !== 'resolved').length, color: 'text-amber' },
        { label: 'CRITICAL', count: bugs.filter(b => b.severity === 'critical').length, color: 'text-critical' },
        { label: 'RESOLVED', count: bugs.filter(b => b.status === 'resolved').length, color: 'text-terminal' }
    ];

    return (
        &lt;motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
        &gt;
            {stats.map((stat) => (
                &lt;StatCard key={stat.label} label={stat.label} count={stat.count} color={stat.color} /&gt;
            ))}
        &lt;/motion.div&gt;
    );
};

export default BugStats;