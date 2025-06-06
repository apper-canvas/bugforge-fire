import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BugCard from '@/components/molecules/BugCard';

const BugKanbanBoard = ({ bugsByStatus, handleDragOver, handleDrop, handleDragStart, onBugSelect, getSeverityBg }) => {
    return (
        &lt;motion.div
            key="board"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        &gt;
            {Object.entries(bugsByStatus).map(([status, statusBugs]) => (
                &lt;div
                    key={status}
                    className="brutal-border bg-secondary shadow-brutal"
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, status)}
                &gt;
                    &lt;div className="p-4 border-b-2 border-steel"&gt;
                        &lt;h3 className="font-bold text-ghost uppercase font-mono"&gt;
                            {status.replace('-', '_')} ({statusBugs.length})
                        &lt;/h3&gt;
                    &lt;/div&gt;
                    &lt;div className="p-4 space-y-3 min-h-[400px]"&gt;
                        &lt;AnimatePresence&gt;
                            {statusBugs.map((bug, index) => (
                                &lt;BugCard
                                    key={bug.id}
                                    bug={bug}
                                    onClick={onBugSelect}
                                    onDragStart={handleDragStart}
                                    getSeverityBg={getSeverityBg}
                                    index={index}
                                /&gt;
                            ))}
                        &lt;/AnimatePresence&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            ))}
        &lt;/motion.div&gt;
    );
};

export default BugKanbanBoard;