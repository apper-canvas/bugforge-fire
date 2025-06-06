import React from 'react';
import Button from '@/components/atoms/Button';

const TagList = ({ tags, removeTag }) => {
    return (
        &lt;div className="flex flex-wrap gap-2 mt-2"&gt;
            {tags.map((tag, index) => (
                &lt;div
                    key={index}
                    className="brutal-border bg-primary px-2 py-1 text-xs font-mono text-ghost flex items-center space-x-1"
                &gt;
                    &lt;span&gt;{tag}&lt;/span&gt;
                    &lt;Button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-critical hover:text-amber p-0"
                    &gt;
                        ×
                    &lt;/Button&gt;
                &lt;/div&gt;
            ))}
        &lt;/div&gt;
    );
};

export default TagList;