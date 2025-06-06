import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ModalContainer = ({ show, onClose, children, title, className, headerChildren }) => {
    return (
        &lt;AnimatePresence&gt;
            {show &amp;&amp; (
                &lt;&gt;
                    &lt;motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/75 z-40"
                        onClick={onClose}
                    /&gt;
                    &lt;motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    &gt;
                        &lt;div className={`brutal-border bg-secondary shadow-brutal max-w-2xl w-full max-h-[90vh] overflow-y-auto ${className || ''}`}&gt;
                            &lt;div className="p-4 border-b-2 border-steel flex items-center justify-between"&gt;
                                &lt;h3 className="font-bold text-ghost uppercase font-mono"&gt;
                                    {title}
                                &lt;/h3&gt;
                                {headerChildren}
                            &lt;/div&gt;
                            {children}
                        &lt;/div&gt;
                    &lt;/motion.div&gt;
                &lt;/&gt;
            )}
        &lt;/AnimatePresence&gt;
    );
};

export default ModalContainer;