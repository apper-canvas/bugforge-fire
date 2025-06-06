import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import { format } from 'date-fns';

const BugListItem = ({ bug, onClick, onEditClick, getSeverityBg, index }) => {
    return (
        &lt;motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onClick(bug)}
            className="p-4 cursor-pointer hover:bg-steel transition-colors"
        &gt;
            &lt;div className="flex items-center justify-between"&gt;
                &lt;div className="flex-1"&gt;
                    &lt;div className="flex items-center space-x-3 mb-1"&gt;
                        &lt;span className="text-xs text-steel font-mono"&gt;#{bug.id}&lt;/span&gt;
                        &lt;div className={`px-2 py-1 text-xs font-mono uppercase ${getSeverityBg(bug.severity)} text-primary`}&gt;
                            {bug.severity}
                        &lt;/div&gt;
                        &lt;div className={`px-2 py-1 text-xs font-mono uppercase brutal-border ${
                            bug.status === 'resolved' ? 'text-terminal' :
                            bug.status === 'in-progress' ? 'text-amber' : 'text-ghost'
                        }`}&gt;
                            {bug.status.replace('-', '_')}
                        &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;h4 className="font-bold text-ghost mb-1"&gt;{bug.title}&lt;/h4&gt;
                    &lt;p className="text-sm text-steel"&gt;{bug.description}&lt;/p&gt;
                    &lt;div className="flex items-center space-x-4 mt-2 text-xs text-steel font-mono"&gt;
                        &lt;span&gt;REPORTER: {bug.reporter}&lt;/span&gt;
                        &lt;span&gt;ASSIGNEE: {bug.assignee}&lt;/span&gt;
                        &lt;span&gt;CREATED: {format(new Date(bug.createdAt), 'MM/dd/yyyy')}&lt;/span&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
                &lt;Button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEditClick(bug);
                    }}
                    className="brutal-border bg-primary text-ghost p-2 hover:bg-steel transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                &gt;
                    &lt;ApperIcon name="Edit" className="w-4 h-4" /&gt;
                &lt;/Button&gt;
            &lt;/div&gt;
        &lt;/motion.div&gt;
    );
};

export default BugListItem;