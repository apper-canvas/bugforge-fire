import React from 'react';

const StatCard = ({ label, count, color }) => {
    return (
        &lt;div className="brutal-border bg-secondary p-4 text-center shadow-brutal"&gt;
            &lt;div className={`text-2xl font-bold ${color} font-mono`}&gt;{count}&lt;/div&gt;
            &lt;div className="text-xs text-steel font-mono uppercase"&gt;{label}&lt;/div&gt;
        &lt;/div&gt;
    );
};

export default StatCard;