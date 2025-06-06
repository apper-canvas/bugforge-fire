import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BugListItem from '@/components/molecules/BugListItem';

const BugListView = ({ filteredBugs, onBugSelect, onEditBugClick, getSeverityBg }) => {
    return (
        &lt;motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="brutal-border bg-secondary shadow-brutal"
        &gt;
            &lt;div className="p-4 border-b-2 border-steel"&gt;
                &lt;h3 className="font-bold text-ghost uppercase font-mono"&gt;
                    BUG_LIST ({filteredBugs.length})
                &lt;/h3&gt;
            &lt;/div&gt;
            &lt;div className="divide-y-2 divide-steel"&gt;
                &lt;AnimatePresence&gt;
                    {filteredBugs.map((bug, index) => (
                        &lt;BugListItem
                            key={bug.id}
                            bug={bug}
                            onClick={onBugSelect}
                            onEditClick={onEditBugClick}
                            getSeverityBg={getSeverityBg}
                            index={index}
                        /&gt;
                    ))}
                &lt;/AnimatePresence&gt;
            &lt;/div&gt;
        &lt;/motion.div&gt;
    );
};

export default BugListView;