import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const BugCard = ({ bug, onClick, onDragStart, getSeverityBg, index }) => {
    return (
        &lt;motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.05 }}
            draggable
            onDragStart={() => onDragStart(bug)}
            onClick={() => onClick(bug)}
            className="brutal-border bg-primary p-3 cursor-pointer hover:bg-steel transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
        &gt;
            &lt;div className="flex items-start justify-between mb-2"&gt;
                &lt;span className="text-xs text-steel font-mono"&gt;#{bug.id}&lt;/span&gt;
                &lt;div className={`px-2 py-1 text-xs font-mono uppercase ${getSeverityBg(bug.severity)} text-primary`}&gt;
                    {bug.severity}
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;h4 className="font-bold text-ghost mb-1 text-sm"&gt;{bug.title}&lt;/h4&gt;
            &lt;p className="text-xs text-steel truncate"&gt;{bug.description}&lt;/p&gt;
            &lt;div className="flex items-center justify-between mt-2"&gt;
                &lt;span className="text-xs text-steel font-mono"&gt;{bug.assignee}&lt;/span&gt;
                &lt;span className="text-xs text-steel font-mono"&gt;
                    {format(new Date(bug.createdAt), 'MM/dd')}
                &lt;/span&gt;
            &lt;/div&gt;
        &lt;/motion.div&gt;
    );
};

export default BugCard;