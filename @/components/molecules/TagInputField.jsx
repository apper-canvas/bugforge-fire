import React from 'react';
import Input from '@/components/atoms/Input';
import TagList from '@/components/molecules/TagList';

const TagInputField = ({ label, onKeyDown, tags, removeTag, placeholder }) => {
    return (
        &lt;div&gt;
            &lt;label className="block text-xs font-mono uppercase text-steel mb-2"&gt;
                {label}
            &lt;/label&gt;
            &lt;Input
                type="text"
                onKeyDown={onKeyDown}
                placeholder={placeholder}
            /&gt;
            {tags &amp;&amp; tags.length > 0 &amp;&amp; (
                &lt;TagList tags={tags} removeTag={removeTag} /&gt;
            )}
        &lt;/div&gt;
    );
};

export default TagInputField;