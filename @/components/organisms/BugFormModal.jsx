import React from 'react';
import ModalContainer from '@/components/molecules/ModalContainer';
import FormField from '@/components/molecules/FormField';
import TagInputField from '@/components/molecules/TagInputField';
import Button from '@/components/atoms/Button';

const BugFormModal = ({
    showModal,
    onClose,
    formData,
    setFormData,
    formErrors,
    isEditing,
    onSubmit,
    onDelete
}) => {
    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTagInput = (e) => {
        if (e.key === 'Enter' &amp;&amp; e.target.value.trim()) {
            e.preventDefault();
            const newTag = e.target.value.trim();
            if (!formData.tags.includes(newTag)) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...prev.tags, newTag]
                }));
            }
            e.target.value = '';
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    return (
        &lt;ModalContainer
            show={showModal}
            onClose={onClose}
            title={isEditing ? 'MODIFY_BUG_PARAMETERS' : 'LOG_NEW_BUG'}
        &gt;
            &lt;form onSubmit={onSubmit} className="p-6 space-y-6"&gt;
                &lt;FormField
                    label="BUG_TITLE *"
                    name="title"
                    value={formData.title}
                    onChange={handleFormChange}
                    error={formErrors.title}
                    placeholder="ENTER_BUG_DESCRIPTION..."
                /&gt;

                &lt;FormField
                    label="DETAILED_DESCRIPTION *"
                    name="description"
                    type="textarea"
                    value={formData.description}
                    onChange={handleFormChange}
                    error={formErrors.description}
                    rows={4}
                    placeholder="PROVIDE_DETAILED_BUG_ANALYSIS..."
                /&gt;

                &lt;div className="grid grid-cols-1 md:grid-cols-2 gap-4"&gt;
                    &lt;FormField
                        label="THREAT_LEVEL"
                        name="severity"
                        type="select"
                        value={formData.severity}
                        onChange={handleFormChange}
                        options={[
                            { value: 'low', label: 'LOW_PRIORITY' },
                            { value: 'medium', label: 'MEDIUM_PRIORITY' },
                            { value: 'high', label: 'HIGH_PRIORITY' },
                            { value: 'critical', label: 'CRITICAL_THREAT' }
                        ]}
                    /&gt;

                    &lt;FormField
                        label="STATUS"
                        name="status"
                        type="select"
                        value={formData.status}
                        onChange={handleFormChange}
                        options={[
                            { value: 'todo', label: 'TODO' },
                            { value: 'in-progress', label: 'IN_PROGRESS' },
                            { value: 'resolved', label: 'RESOLVED' }
                        ]}
                    /&gt;
                &lt;/div&gt;

                &lt;div className="grid grid-cols-1 md:grid-cols-2 gap-4"&gt;
                    &lt;FormField
                        label="REPORTER"
                        name="reporter"
                        value={formData.reporter}
                        onChange={handleFormChange}
                    /&gt;

                    &lt;FormField
                        label="ASSIGNEE"
                        name="assignee"
                        value={formData.assignee}
                        onChange={handleFormChange}
                    /&gt;
                &lt;/div&gt;

                &lt;TagInputField
                    label="TAGS"
                    onKeyDown={handleTagInput}
                    tags={formData.tags}
                    removeTag={removeTag}
                    placeholder="TYPE_TAG_AND_PRESS_ENTER..."
                /&gt;

                &lt;div className="flex justify-between pt-4"&gt;
                    &lt;Button
                        type="button"
                        onClick={onClose}
                        className="brutal-border bg-primary text-ghost px-6 py-3 font-mono uppercase text-sm hover:bg-steel transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                    &gt;
                        ABORT
                    &lt;/Button&gt;

                    &lt;div className="flex space-x-2"&gt;
                        {isEditing &amp;&amp; (
                            &lt;Button
                                type="button"
                                onClick={onDelete}
                                className="brutal-border bg-critical text-ghost px-6 py-3 font-mono uppercase text-sm hover:bg-amber transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                            &gt;
                                TERMINATE
                            &lt;/Button&gt;
                        )}

                        &lt;Button
                            type="submit"
                            className="brutal-border bg-terminal text-primary px-6 py-3 font-mono uppercase text-sm font-bold shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        &gt;
                            {isEditing ? 'UPDATE_BUG' : 'LOG_BUG'}
                        &lt;/Button&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/form&gt;
        &lt;/ModalContainer&gt;
    );
};

export default BugFormModal;