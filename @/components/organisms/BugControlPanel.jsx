import React from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';

const BugControlPanel = ({
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    activeView,
    setActiveView,
    onCreateBugClick
}) => {
    return (
        &lt;motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="brutal-border bg-secondary p-4 shadow-brutal"
        &gt;
            &lt;div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0"&gt;
                {/* Search */}
                &lt;div className="flex-1 max-w-md relative"&gt;
                    &lt;Input
                        type="text"
                        placeholder="SEARCH_BUGS..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pr-10"
                    /&gt;
                    &lt;div className="absolute right-3 top-3"&gt;
                        &lt;span className="text-terminal animate-cursor-blink"&gt;█&lt;/span&gt;
                    &lt;/div&gt;
                &lt;/div&gt;

                {/* Filters */}
                &lt;div className="flex items-center space-x-2"&gt;
                    {['all', 'todo', 'in-progress', 'resolved'].map(status => (
                        &lt;Button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`brutal-border px-3 py-2 font-mono text-xs uppercase transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1 ${
                                statusFilter === status
                                    ? 'bg-terminal text-primary'
                                    : 'bg-primary text-ghost hover:bg-steel'
                            }`}
                        &gt;
                            {status.replace('-', '_')}
                        &lt;/Button&gt;
                    ))}
                &lt;/div&gt;

                {/* Actions */}
                &lt;div className="flex items-center space-x-2"&gt;
                    &lt;Button
                        onClick={() => setActiveView(activeView === 'board' ? 'list' : 'board')}
                        className="brutal-border bg-primary text-ghost p-2 hover:bg-steel transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                    &gt;
                        &lt;ApperIcon name={activeView === 'board' ? 'List' : 'LayoutGrid'} className="w-4 h-4" /&gt;
                    &lt;/Button&gt;
                    &lt;Button
                        onClick={onCreateBugClick}
                        className="brutal-border bg-terminal text-primary px-4 py-2 font-mono uppercase text-sm font-bold shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    &gt;
                        + LOG_BUG
                    &lt;/Button&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/motion.div&gt;
    );
};

export default BugControlPanel;