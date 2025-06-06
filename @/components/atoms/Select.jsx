import React from 'react';

const Select = ({ value, onChange, children, className, ...props }) => {
    return (
        &lt;select
            value={value}
            onChange={onChange}
            className={`w-full bg-primary brutal-border p-3 text-ghost font-mono focus:outline-none focus:bg-steel transition-colors ${className || ''}`}
            {...props}
        &gt;
            {children}
        &lt;/select&gt;
    );
};

export default Select;