import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Select from '@/components/atoms/Select';
import ModalContainer from '@/components/molecules/ModalContainer';

const BugDetailModal = ({ selectedBug, comments, onClose, onEditBugClick, onStatusChange, getSeverityBg }) => {
    if (!selectedBug) return null;

    return (
        &lt;ModalContainer
            show={!!selectedBug}
            onClose={onClose}
            title={`BUG_ANALYSIS_#${selectedBug.id}`}
            className="max-w-4xl"
            headerChildren={
                &lt;div className="flex items-center space-x-2"&gt;
                    &lt;Button
                        onClick={() => onEditBugClick(selectedBug)}
                        className="brutal-border bg-primary text-ghost p-2 hover:bg-steel transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                    &gt;
                        &lt;ApperIcon name="Edit" className="w-4 h-4" /&gt;
                    &lt;/Button&gt;
                    &lt;Button
                        onClick={onClose}
                        className="brutal-border bg-primary text-ghost p-2 hover:bg-steel transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                    &gt;
                        &lt;ApperIcon name="X" className="w-4 h-4" /&gt;
                    &lt;/Button&gt;
                &lt;/div&gt;
            }
        &gt;
            &lt;div className="p-6 space-y-6"&gt;
                {/* Bug Info */}
                &lt;div className="grid grid-cols-1 md:grid-cols-2 gap-6"&gt;
                    &lt;div&gt;
                        &lt;h4 className="font-bold text-ghost text-lg mb-2"&gt;{selectedBug.title}&lt;/h4&gt;
                        &lt;p className="text-steel mb-4"&gt;{selectedBug.description}&lt;/p&gt;

                        &lt;div className="space-y-2 text-sm font-mono"&gt;
                            &lt;div className="flex items-center space-x-2"&gt;
                                &lt;span className="text-steel"&gt;SEVERITY:&lt;/span&gt;
                                &lt;div className={`px-2 py-1 text-xs font-mono uppercase ${getSeverityBg(selectedBug.severity)} text-primary`}&gt;
                                    {selectedBug.severity}
                                &lt;/div&gt;
                            &lt;/div&gt;

                            &lt;div className="flex items-center space-x-2"&gt;
                                &lt;span className="text-steel"&gt;STATUS:&lt;/span&gt;
                                &lt;Select
                                    value={selectedBug.status}
                                    onChange={(e) => onStatusChange(selectedBug.id, e.target.value)}
                                    className="px-2 py-1 text-ghost font-mono text-xs"
                                &gt;
                                    &lt;option value="todo"&gt;TODO&lt;/option&gt;
                                    &lt;option value="in-progress"&gt;IN_PROGRESS&lt;/option&gt;
                                    &lt;option value="resolved"&gt;RESOLVED&lt;/option&gt;
                                &lt;/Select&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;

                    &lt;div className="space-y-4"&gt;
                        &lt;div className="brutal-border bg-primary p-4"&gt;
                            &lt;h5 className="font-mono text-xs uppercase text-steel mb-2"&gt;METADATA&lt;/h5&gt;
                            &lt;div className="space-y-1 text-sm font-mono"&gt;
                                &lt;div&gt;REPORTER: &lt;span className="text-terminal"&gt;{selectedBug.reporter}&lt;/span&gt;&lt;/div&gt;
                                &lt;div&gt;ASSIGNEE: &lt;span className="text-terminal"&gt;{selectedBug.assignee}&lt;/span&gt;&lt;/div&gt;
                                &lt;div&gt;CREATED: &lt;span className="text-terminal"&gt;{format(new Date(selectedBug.createdAt), 'MM/dd/yyyy HH:mm')}&lt;/span&gt;&lt;/div&gt;
                                &lt;div&gt;UPDATED: &lt;span className="text-terminal"&gt;{format(new Date(selectedBug.updatedAt), 'MM/dd/yyyy HH:mm')}&lt;/span&gt;&lt;/div&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;

                        {selectedBug.tags &amp;&amp; selectedBug.tags.length > 0 &amp;&amp; (
                            &lt;div&gt;
                                &lt;h5 className="font-mono text-xs uppercase text-steel mb-2"&gt;TAGS&lt;/h5&gt;
                                &lt;div className="flex flex-wrap gap-2"&gt;
                                    {selectedBug.tags.map((tag, index) => (
                                        &lt;div
                                            key={index}
                                            className="brutal-border bg-primary px-2 py-1 text-xs font-mono text-ghost"
                                        &gt;
                                            {tag}
                                        &lt;/div&gt;
                                    ))}
                                &lt;/div&gt;
                            &lt;/div&gt;
                        )}
                    &lt;/div&gt;
                &lt;/div&gt;

                {/* Comments Section */}
                &lt;div className="border-t-2 border-steel pt-6"&gt;
                    &lt;h5 className="font-mono text-sm uppercase text-steel mb-4"&gt;ACTIVITY_LOG&lt;/h5&gt;
                    &lt;div className="space-y-3"&gt;
                        {comments
                            .filter(comment => comment.bugId === selectedBug.id)
                            .map((comment, index) => (
                                &lt;motion.div
                                    key={comment.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="brutal-border bg-primary p-3"
                                &gt;
                                    &lt;div className="flex items-center justify-between mb-2"&gt;
                                        &lt;span className="font-mono text-xs text-terminal"&gt;{comment.author}&lt;/span&gt;
                                        &lt;span className="font-mono text-xs text-steel"&gt;
                                            {format(new Date(comment.createdAt), 'MM/dd HH:mm')}
                                        &lt;/span&gt;
                                    &lt;/div&gt;
                                    &lt;p className="text-ghost text-sm"&gt;{comment.content}&lt;/p&gt;
                                &lt;/motion.div&gt;
                            ))}

                        {comments.filter(comment => comment.bugId === selectedBug.id).length === 0 &amp;&amp; (
                            &lt;div className="text-center py-8"&gt;
                                &lt;ApperIcon name="MessageSquare" className="w-8 h-8 text-steel mx-auto mb-2" /&gt;
                                &lt;p className="text-steel font-mono text-sm"&gt;NO_ACTIVITY_LOGGED&lt;/p&gt;
                            &lt;/div&gt;
                        )}
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/ModalContainer&gt;
    );
};

export default BugDetailModal;