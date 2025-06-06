import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import bugService from '@/services/api/bugService';
import commentService from '@/services/api/commentService';

import BugControlPanel from '@/components/organisms/BugControlPanel';
import BugStats from '@/components/organisms/BugStats';
import BugKanbanBoard from '@/components/organisms/BugKanbanBoard';
import BugListView from '@/components/organisms/BugListView';
import BugFormModal from '@/components/organisms/BugFormModal';
import BugDetailModal from '@/components/organisms/BugDetailModal';
import BugLoadingState from '@/components/organisms/BugLoadingState';
import BugErrorState from '@/components/organisms/BugErrorState';
import BugEmptyState from '@/components/organisms/BugEmptyState';

const BugTracker = () => {
    // Core state
    const [bugs, setBugs] = useState([]);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // UI state
    const [activeView, setActiveView] = useState('board');
    const [selectedBug, setSelectedBug] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [draggedBug, setDraggedBug] = useState(null);

    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        severity: 'medium',
        status: 'todo',
        reporter: 'Dev Team',
        assignee: 'Unassigned',
        tags: []
    });
    const [formErrors, setFormErrors] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    // Load data
    useEffect(() => {
        loadBugs();
        loadComments();
    }, []);

    const loadBugs = async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await bugService.getAll();
            setBugs(result);
        } catch (err) {
            setError(err.message || 'Failed to load bugs');
            toast.error('SYSTEM_ERROR: Failed to load bug data');
        } finally {
            setLoading(false);
        }
    };

    const loadComments = async () => {
        try {
            const result = await commentService.getAll();
            setComments(result);
        } catch (err) {
            console.error('Failed to load comments:', err);
        }
    };

    // Filter bugs
    const filteredBugs = bugs.filter(bug => {
        const matchesSearch = bug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             bug.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             bug.id.toString().includes(searchQuery);
        const matchesStatus = statusFilter === 'all' || bug.status === statusFilter;
        return matchesSearch &amp;&amp; matchesStatus;
    });

    // Group bugs by status for kanban
    const bugsByStatus = {
        todo: filteredBugs.filter(bug => bug.status === 'todo'),
        'in-progress': filteredBugs.filter(bug => bug.status === 'in-progress'),
        resolved: filteredBugs.filter(bug => bug.status === 'resolved')
    };

    // Form validation
    const validateForm = () => {
        const errors = {};
        if (!formData.title.trim()) errors.title = 'TITLE_REQUIRED';
        if (!formData.description.trim()) errors.description = 'DESCRIPTION_REQUIRED';
        if (formData.title.length > 100) errors.title = 'TITLE_TOO_LONG';
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // CRUD operations
    const handleCreateUpdateBug = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            if (isEditing) {
                const updatedBug = await bugService.update(formData.id, {
                    ...formData,
                    tags: formData.tags.filter(tag => tag.trim())
                });
                setBugs(prev => prev.map(bug => bug.id === updatedBug.id ? updatedBug : bug));
                toast.success('BUG_UPDATED: Target parameters modified');
            } else {
                const newBug = await bugService.create({
                    ...formData,
                    tags: formData.tags.filter(tag => tag.trim())
                });
                setBugs(prev => [newBug, ...prev]);
                toast.success('BUG_LOGGED: New threat identified and catalogued');
            }
            setShowCreateModal(false);
            resetForm();
            setSelectedBug(null);
        } catch (err) {
            toast.error(`SYSTEM_ERROR: Failed to ${isEditing ? 'update' : 'log'} bug`);
        }
    };

    const handleDeleteBug = async () => {
        if (!formData.id) return;
        try {
            await bugService.delete(formData.id);
            setBugs(prev => prev.filter(bug => bug.id !== formData.id));
            setSelectedBug(null);
            setShowCreateModal(false);
            resetForm();
            toast.success('BUG_TERMINATED: Target eliminated from system');
        } catch (err) {
            toast.error('SYSTEM_ERROR: Failed to delete bug');
        }
    };

    const handleStatusChange = async (bugId, newStatus) => {
        try {
            const updatedBug = await bugService.update(bugId, { status: newStatus });
            setBugs(prev => prev.map(bug => bug.id === bugId ? updatedBug : bug));
            if (selectedBug &amp;&amp; selectedBug.id === bugId) {
                setSelectedBug(updatedBug);
            }
            toast.success('BUG_UPDATED: Target status modified');
        } catch (err) {
            toast.error('SYSTEM_ERROR: Failed to update bug status');
        }
    };

    // Drag and drop
    const handleDragStart = (bug) => {
        setDraggedBug(bug);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e, newStatus) => {
        e.preventDefault();
        if (draggedBug &amp;&amp; draggedBug.status !== newStatus) {
            handleStatusChange(draggedBug.id, newStatus);
        }
        setDraggedBug(null);
    };

    // Form helpers
    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            severity: 'medium',
            status: 'todo',
            reporter: 'Dev Team',
            assignee: 'Unassigned',
            tags: []
        });
        setFormErrors({});
        setIsEditing(false);
    };

    const handleEditBug = (bug) => {
        setFormData(bug);
        setIsEditing(true);
        setSelectedBug(bug);
        setShowCreateModal(true);
    };

    // Severity colors utility
    const getSeverityBg = (severity) => {
        switch (severity) {
            case 'critical': return 'bg-critical';
            case 'high': return 'bg-amber';
            case 'medium': return 'bg-terminal';
            case 'low': return 'bg-steel';
            default: return 'bg-ghost';
        }
    };

    if (loading) {
        return &lt;BugLoadingState /&gt;;
    }

    if (error) {
        return &lt;BugErrorState error={error} onRetry={loadBugs} /&gt;;
    }

    return (
        &lt;div className="space-y-6"&gt;
            {/* Control Panel */}
            &lt;BugControlPanel
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                activeView={activeView}
                setActiveView={setActiveView}
                onCreateBugClick={() => {
                    resetForm();
                    setShowCreateModal(true);
                }}
            /&gt;

            {/* Stats */}
            &lt;BugStats bugs={bugs} /&gt;

            {/* Main Content */}
            &lt;AnimatePresence mode="wait"&gt;
                {activeView === 'board' ? (
                    &lt;BugKanbanBoard
                        bugsByStatus={bugsByStatus}
                        handleDragOver={handleDragOver}
                        handleDrop={handleDrop}
                        handleDragStart={handleDragStart}
                        onBugSelect={setSelectedBug}
                        getSeverityBg={getSeverityBg}
                    /&gt;
                ) : (
                    &lt;BugListView
                        filteredBugs={filteredBugs}
                        onBugSelect={setSelectedBug}
                        onEditBugClick={handleEditBug}
                        getSeverityBg={getSeverityBg}
                    /&gt;
                )}
            &lt;/AnimatePresence&gt;

            {/* Empty state */}
            {!loading &amp;&amp; filteredBugs.length === 0 &amp;&amp; (
                &lt;BugEmptyState
                    searchQuery={searchQuery}
                    statusFilter={statusFilter}
                    onCreateBugClick={() => {
                        resetForm();
                        setShowCreateModal(true);
                    }}
                /&gt;
            )}

            {/* Create/Edit Modal */}
            &lt;BugFormModal
                showModal={showCreateModal}
                onClose={() => {
                    setShowCreateModal(false);
                    resetForm();
                }}
                formData={formData}
                setFormData={setFormData}
                formErrors={formErrors}
                isEditing={isEditing}
                onSubmit={handleCreateUpdateBug}
                onDelete={handleDeleteBug}
            /&gt;

            {/* Bug Detail Modal */}
            &lt;BugDetailModal
                selectedBug={selectedBug}
                comments={comments}
                onClose={() => setSelectedBug(null)}
                onEditBugClick={handleEditBug}
                onStatusChange={handleStatusChange}
                getSeverityBg={getSeverityBg}
            /&gt;
        &lt;/div&gt;
    );
};

export default BugTracker;