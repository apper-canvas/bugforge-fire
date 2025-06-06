import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ onClick, children, className, type = 'button', whileHover, whileTap }) => {
    // Determine whether to use motion.button or a regular button based on motion props
    const Component = whileHover || whileTap ? motion.button : 'button';

    const props = {
        onClick,
        className,
        type,
        // Only spread motion props if Component is motion.button
        ...(Component === motion.button &amp;&amp; whileHover &amp;&amp; { whileHover }),
        ...(Component === motion.button &amp;&amp; whileTap &amp;&amp; { whileTap }),
    };

    return (
        &lt;Component {...props}&gt;
            {children}
        &lt;/Component&gt;
    );
};

export default Button;