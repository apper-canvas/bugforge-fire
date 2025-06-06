import React from 'react';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';

const FormField = ({
    label,
    name,
    type = 'text',
    value,
    onChange,
    placeholder,
    error,
    options, // For select
    rows, // For textarea
    className // To pass additional styles to the wrapper div
}) => {
    return (
        &lt;div className={className}&gt;
            &lt;label htmlFor={name} className="block text-xs font-mono uppercase text-steel mb-2"&gt;
                {label}
            &lt;/label&gt;
            {type === 'select' ? (
                &lt;Select id={name} name={name} value={value} onChange={onChange}&gt;
                    {options.map(option => (
                        &lt;option key={option.value} value={option.value}&gt;
                            {option.label}
                        &lt;/option&gt;
                    ))}
                &lt;/Select&gt;
            ) : (
                &lt;Input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    rows={rows}
                    error={error}
                /&gt;
            )}
            {error &amp;&amp; (
                &lt;p className="text-critical text-xs font-mono mt-1"&gt;{error}&lt;/p&gt;
            )}
        &lt;/div&gt;
    );
};

export default FormField;