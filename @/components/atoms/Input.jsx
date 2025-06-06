import React from 'react';

const Input = ({ type = 'text', value, onChange, placeholder, className, onKeyDown, rows, error, ...props }) => {
    const commonClasses = `w-full bg-primary brutal-border p-3 text-ghost font-mono placeholder-steel focus:outline-none focus:bg-steel transition-colors`;
    const errorClass = error ? 'border-critical' : '';

    if (type === 'textarea') {
        return (
            &lt;textarea
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                className={`${commonClasses} resize-none ${errorClass} ${className || ''}`}
                {...props}
            /&gt;
        );
    }

    return (
        &lt;input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            onKeyDown={onKeyDown}
            className={`${commonClasses} ${errorClass} ${className || ''}`}
            {...props}
        /&gt;
    );
};

export default Input;