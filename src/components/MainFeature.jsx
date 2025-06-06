import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import bugService from '../services/api/bugService'
import commentService from '../services/api/commentService'
import { format } from 'date-fns'

const MainFeature = () => {
  // Core state
  const [bugs, setBugs] = useState([])
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  // UI state
  const [activeView, setActiveView] = useState('board') // board, list, detail
  const [selectedBug, setSelectedBug] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [draggedBug, setDraggedBug] = useState(null)

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    severity: 'medium',
    status: 'todo',
    reporter: 'Dev Team',
    assignee: 'Unassigned',
    tags: []
  })
  const [formErrors, setFormErrors] = useState({})
  const [isEditing, setIsEditing] = useState(false)

  // Load data
  useEffect(() => {
    loadBugs()
    loadComments()
  }, [])

  const loadBugs = async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await bugService.getAll()
      setBugs(result)
    } catch (err) {
      setError(err.message || 'Failed to load bugs')
      toast.error('SYSTEM_ERROR: Failed to load bug data')
    } finally {
      setLoading(false)
    }
  }

  const loadComments = async () => {
    try {
      const result = await commentService.getAll()
      setComments(result)
    } catch (err) {
      console.error('Failed to load comments:', err)
    }
  }

  // Filter bugs
  const filteredBugs = bugs.filter(bug => {
    const matchesSearch = bug.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bug.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         bug.id.toString().includes(searchQuery)
    const matchesStatus = statusFilter === 'all' || bug.status === statusFilter
    return matchesSearch && matchesStatus
  })

  // Group bugs by status for kanban
  const bugsByStatus = {
    todo: filteredBugs.filter(bug => bug.status === 'todo'),
    'in-progress': filteredBugs.filter(bug => bug.status === 'in-progress'),
    resolved: filteredBugs.filter(bug => bug.status === 'resolved')
  }

  // Form validation
  const validateForm = () => {
    const errors = {}
    if (!formData.title.trim()) errors.title = 'TITLE_REQUIRED'
    if (!formData.description.trim()) errors.description = 'DESCRIPTION_REQUIRED'
    if (formData.title.length > 100) errors.title = 'TITLE_TOO_LONG'
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // CRUD operations
  const handleCreateBug = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    try {
      const newBug = await bugService.create({
        ...formData,
        tags: formData.tags.filter(tag => tag.trim())
      })
      setBugs(prev => [newBug, ...prev])
      setShowCreateModal(false)
      resetForm()
      toast.success('BUG_LOGGED: New threat identified and catalogued')
    } catch (err) {
      toast.error('SYSTEM_ERROR: Failed to log bug')
    }
  }

  const handleUpdateBug = async (bugId, updates) => {
    try {
      const updatedBug = await bugService.update(bugId, updates)
      setBugs(prev => prev.map(bug => bug.id === bugId ? updatedBug : bug))
      toast.success('BUG_UPDATED: Target parameters modified')
    } catch (err) {
      toast.error('SYSTEM_ERROR: Failed to update bug')
    }
  }

  const handleDeleteBug = async (bugId) => {
    try {
      await bugService.delete(bugId)
      setBugs(prev => prev.filter(bug => bug.id !== bugId))
      setSelectedBug(null)
      toast.success('BUG_TERMINATED: Target eliminated from system')
    } catch (err) {
      toast.error('SYSTEM_ERROR: Failed to delete bug')
    }
  }

  const handleStatusChange = async (bugId, newStatus) => {
    await handleUpdateBug(bugId, { status: newStatus })
  }

  // Drag and drop
  const handleDragStart = (bug) => {
    setDraggedBug(bug)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, newStatus) => {
    e.preventDefault()
    if (draggedBug && draggedBug.status !== newStatus) {
      handleStatusChange(draggedBug.id, newStatus)
    }
    setDraggedBug(null)
  }

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
    })
    setFormErrors({})
    setIsEditing(false)
  }

  const handleEditBug = (bug) => {
    setFormData(bug)
    setIsEditing(true)
    setSelectedBug(bug)
    setShowCreateModal(true)
  }

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      e.preventDefault()
      const newTag = e.target.value.trim()
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }))
      }
      e.target.value = ''
    }
  }

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  // Severity colors
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-critical'
      case 'high': return 'text-amber'
      case 'medium': return 'text-terminal'
      case 'low': return 'text-steel'
      default: return 'text-ghost'
    }
  }

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-critical'
      case 'high': return 'bg-amber'
      case 'medium': return 'bg-terminal'
      case 'low': return 'bg-steel'
      default: return 'bg-ghost'
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="brutal-border bg-secondary p-6 shadow-brutal"
          >
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-steel rounded w-3/4"></div>
              <div className="h-4 bg-steel rounded w-1/2"></div>
              <div className="h-20 bg-steel rounded w-full"></div>
            </div>
          </motion.div>
        ))}
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="brutal-border bg-secondary p-8 text-center shadow-brutal"
      >
        <ApperIcon name="AlertTriangle" className="w-12 h-12 text-critical mx-auto mb-4" />
        <h3 className="text-lg font-bold text-critical mb-2 uppercase">SYSTEM_FAILURE</h3>
        <p className="text-steel mb-4 font-mono">{error}</p>
        <motion.button
          onClick={loadBugs}
          className="brutal-border bg-primary text-ghost px-4 py-2 font-mono uppercase text-sm hover:bg-steel transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          RETRY_CONNECTION
        </motion.button>
      </motion.div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Control Panel */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="brutal-border bg-secondary p-4 shadow-brutal"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="SEARCH_BUGS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-primary brutal-border p-3 text-ghost font-mono placeholder-steel focus:outline-none focus:bg-steel transition-colors"
            />
            <div className="absolute right-3 top-3">
              <span className="text-terminal animate-cursor-blink">█</span>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-2">
            {['all', 'todo', 'in-progress', 'resolved'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`brutal-border px-3 py-2 font-mono text-xs uppercase transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1 ${
                  statusFilter === status 
                    ? 'bg-terminal text-primary' 
                    : 'bg-primary text-ghost hover:bg-steel'
                }`}
              >
                {status.replace('-', '_')}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveView(activeView === 'board' ? 'list' : 'board')}
              className="brutal-border bg-primary text-ghost p-2 hover:bg-steel transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
            >
              <ApperIcon name={activeView === 'board' ? 'List' : 'LayoutGrid'} className="w-4 h-4" />
            </button>
            <motion.button
              onClick={() => setShowCreateModal(true)}
              className="brutal-border bg-terminal text-primary px-4 py-2 font-mono uppercase text-sm font-bold shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              + LOG_BUG
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: 'TOTAL', count: bugs.length, color: 'text-ghost' },
          { label: 'ACTIVE', count: bugs.filter(b => b.status !== 'resolved').length, color: 'text-amber' },
          { label: 'CRITICAL', count: bugs.filter(b => b.severity === 'critical').length, color: 'text-critical' },
          { label: 'RESOLVED', count: bugs.filter(b => b.status === 'resolved').length, color: 'text-terminal' }
        ].map((stat, index) => (
          <div key={stat.label} className="brutal-border bg-secondary p-4 text-center shadow-brutal">
            <div className={`text-2xl font-bold ${stat.color} font-mono`}>{stat.count}</div>
            <div className="text-xs text-steel font-mono uppercase">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {activeView === 'board' ? (
          <motion.div
            key="board"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {Object.entries(bugsByStatus).map(([status, statusBugs]) => (
              <div
                key={status}
                className="brutal-border bg-secondary shadow-brutal"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, status)}
              >
                <div className="p-4 border-b-2 border-steel">
                  <h3 className="font-bold text-ghost uppercase font-mono">
                    {status.replace('-', '_')} ({statusBugs.length})
                  </h3>
                </div>
                <div className="p-4 space-y-3 min-h-[400px]">
                  <AnimatePresence>
                    {statusBugs.map((bug, index) => (
                      <motion.div
                        key={bug.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
                        draggable
                        onDragStart={() => handleDragStart(bug)}
                        onClick={() => setSelectedBug(bug)}
                        className="brutal-border bg-primary p-3 cursor-pointer hover:bg-steel transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-xs text-steel font-mono">#{bug.id}</span>
                          <div className={`px-2 py-1 text-xs font-mono uppercase ${getSeverityBg(bug.severity)} text-primary`}>
                            {bug.severity}
                          </div>
                        </div>
                        <h4 className="font-bold text-ghost mb-1 text-sm">{bug.title}</h4>
                        <p className="text-xs text-steel truncate">{bug.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-steel font-mono">{bug.assignee}</span>
                          <span className="text-xs text-steel font-mono">
                            {format(new Date(bug.createdAt), 'MM/dd')}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="brutal-border bg-secondary shadow-brutal"
          >
            <div className="p-4 border-b-2 border-steel">
              <h3 className="font-bold text-ghost uppercase font-mono">
                BUG_LIST ({filteredBugs.length})
              </h3>
            </div>
            <div className="divide-y-2 divide-steel">
              <AnimatePresence>
                {filteredBugs.map((bug, index) => (
                  <motion.div
                    key={bug.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedBug(bug)}
                    className="p-4 cursor-pointer hover:bg-steel transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-1">
                          <span className="text-xs text-steel font-mono">#{bug.id}</span>
                          <div className={`px-2 py-1 text-xs font-mono uppercase ${getSeverityBg(bug.severity)} text-primary`}>
                            {bug.severity}
                          </div>
                          <div className={`px-2 py-1 text-xs font-mono uppercase brutal-border ${
                            bug.status === 'resolved' ? 'text-terminal' : 
                            bug.status === 'in-progress' ? 'text-amber' : 'text-ghost'
                          }`}>
                            {bug.status.replace('-', '_')}
                          </div>
                        </div>
                        <h4 className="font-bold text-ghost mb-1">{bug.title}</h4>
                        <p className="text-sm text-steel">{bug.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-steel font-mono">
                          <span>REPORTER: {bug.reporter}</span>
                          <span>ASSIGNEE: {bug.assignee}</span>
                          <span>CREATED: {format(new Date(bug.createdAt), 'MM/dd/yyyy')}</span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleEditBug(bug)
                        }}
                        className="brutal-border bg-primary text-ghost p-2 hover:bg-steel transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                      >
                        <ApperIcon name="Edit" className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty state */}
      {!loading && filteredBugs.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="brutal-border bg-secondary p-12 text-center shadow-brutal"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="mb-6"
          >
            <ApperIcon name="Bug" className="w-16 h-16 text-steel mx-auto" />
          </motion.div>
          <h3 className="text-lg font-bold text-ghost mb-2 uppercase font-mono">NO_BUGS_DETECTED</h3>
          <p className="text-steel mb-6 font-mono text-sm">
            {searchQuery || statusFilter !== 'all' 
              ? 'NO_MATCHES_FOUND :: ADJUST_SEARCH_PARAMETERS' 
              : 'SYSTEM_CLEAN :: AWAITING_NEW_TARGETS'
            }
          </p>
          <motion.button
            onClick={() => setShowCreateModal(true)}
            className="brutal-border bg-terminal text-primary px-6 py-3 font-mono uppercase text-sm font-bold shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            LOG_NEW_BUG
          </motion.button>
        </motion.div>
      )}

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 z-40"
              onClick={() => {
                setShowCreateModal(false)
                resetForm()
              }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="brutal-border bg-secondary shadow-brutal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b-2 border-steel">
                  <h3 className="font-bold text-ghost uppercase font-mono">
                    {isEditing ? 'MODIFY_BUG_PARAMETERS' : 'LOG_NEW_BUG'}
                  </h3>
                </div>
                
                <form onSubmit={handleCreateBug} className="p-6 space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-steel mb-2">
                      BUG_TITLE *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className={`w-full bg-primary brutal-border p-3 text-ghost font-mono placeholder-steel focus:outline-none focus:bg-steel transition-colors ${
                        formErrors.title ? 'border-critical' : ''
                      }`}
                      placeholder="ENTER_BUG_DESCRIPTION..."
                    />
                    {formErrors.title && (
                      <p className="text-critical text-xs font-mono mt-1">{formErrors.title}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-steel mb-2">
                      DETAILED_DESCRIPTION *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className={`w-full bg-primary brutal-border p-3 text-ghost font-mono placeholder-steel focus:outline-none focus:bg-steel transition-colors resize-none ${
                        formErrors.description ? 'border-critical' : ''
                      }`}
                      placeholder="PROVIDE_DETAILED_BUG_ANALYSIS..."
                    />
                    {formErrors.description && (
                      <p className="text-critical text-xs font-mono mt-1">{formErrors.description}</p>
                    )}
                  </div>

                  {/* Severity and Status */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-steel mb-2">
                        THREAT_LEVEL
                      </label>
                      <select
                        value={formData.severity}
                        onChange={(e) => setFormData(prev => ({ ...prev, severity: e.target.value }))}
                        className="w-full bg-primary brutal-border p-3 text-ghost font-mono focus:outline-none focus:bg-steel transition-colors"
                      >
                        <option value="low">LOW_PRIORITY</option>
                        <option value="medium">MEDIUM_PRIORITY</option>
                        <option value="high">HIGH_PRIORITY</option>
                        <option value="critical">CRITICAL_THREAT</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-steel mb-2">
                        STATUS
                      </label>
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full bg-primary brutal-border p-3 text-ghost font-mono focus:outline-none focus:bg-steel transition-colors"
                      >
                        <option value="todo">TODO</option>
                        <option value="in-progress">IN_PROGRESS</option>
                        <option value="resolved">RESOLVED</option>
                      </select>
                    </div>
                  </div>

                  {/* Reporter and Assignee */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-steel mb-2">
                        REPORTER
                      </label>
                      <input
                        type="text"
                        value={formData.reporter}
                        onChange={(e) => setFormData(prev => ({ ...prev, reporter: e.target.value }))}
                        className="w-full bg-primary brutal-border p-3 text-ghost font-mono placeholder-steel focus:outline-none focus:bg-steel transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-steel mb-2">
                        ASSIGNEE
                      </label>
                      <input
                        type="text"
                        value={formData.assignee}
                        onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
                        className="w-full bg-primary brutal-border p-3 text-ghost font-mono placeholder-steel focus:outline-none focus:bg-steel transition-colors"
                      />
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-steel mb-2">
                      TAGS
                    </label>
                    <input
                      type="text"
                      onKeyDown={handleTagInput}
                      className="w-full bg-primary brutal-border p-3 text-ghost font-mono placeholder-steel focus:outline-none focus:bg-steel transition-colors"
                      placeholder="TYPE_TAG_AND_PRESS_ENTER..."
                    />
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {formData.tags.map((tag, index) => (
                          <div
                            key={index}
                            className="brutal-border bg-primary px-2 py-1 text-xs font-mono text-ghost flex items-center space-x-1"
                          >
                            <span>{tag}</span>
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="text-critical hover:text-amber"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowCreateModal(false)
                        resetForm()
                      }}
                      className="brutal-border bg-primary text-ghost px-6 py-3 font-mono uppercase text-sm hover:bg-steel transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                    >
                      ABORT
                    </button>
                    
                    <div className="flex space-x-2">
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => {
                            handleDeleteBug(formData.id)
                            setShowCreateModal(false)
                            resetForm()
                          }}
                          className="brutal-border bg-critical text-ghost px-6 py-3 font-mono uppercase text-sm hover:bg-amber transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                        >
                          TERMINATE
                        </button>
                      )}
                      
                      <motion.button
                        type="submit"
                        className="brutal-border bg-terminal text-primary px-6 py-3 font-mono uppercase text-sm font-bold shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isEditing ? 'UPDATE_BUG' : 'LOG_BUG'}
                      </motion.button>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bug Detail Modal */}
      <AnimatePresence>
        {selectedBug && !showCreateModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/75 z-40"
              onClick={() => setSelectedBug(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="brutal-border bg-secondary shadow-brutal max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-4 border-b-2 border-steel flex items-center justify-between">
                  <h3 className="font-bold text-ghost uppercase font-mono">
                    BUG_ANALYSIS_#{selectedBug.id}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleEditBug(selectedBug)}
                      className="brutal-border bg-primary text-ghost p-2 hover:bg-steel transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                    >
                      <ApperIcon name="Edit" className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedBug(null)}
                      className="brutal-border bg-primary text-ghost p-2 hover:bg-steel transition-colors shadow-brutal hover:shadow-brutal-active transform hover:translate-x-1 hover:translate-y-1"
                    >
                      <ApperIcon name="X" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Bug Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-bold text-ghost text-lg mb-2">{selectedBug.title}</h4>
                      <p className="text-steel mb-4">{selectedBug.description}</p>
                      
                      <div className="space-y-2 text-sm font-mono">
                        <div className="flex items-center space-x-2">
                          <span className="text-steel">SEVERITY:</span>
                          <div className={`px-2 py-1 text-xs font-mono uppercase ${getSeverityBg(selectedBug.severity)} text-primary`}>
                            {selectedBug.severity}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-steel">STATUS:</span>
                          <select
                            value={selectedBug.status}
                            onChange={(e) => handleStatusChange(selectedBug.id, e.target.value)}
                            className="bg-primary brutal-border px-2 py-1 text-ghost font-mono text-xs focus:outline-none focus:bg-steel transition-colors"
                          >
                            <option value="todo">TODO</option>
                            <option value="in-progress">IN_PROGRESS</option>
                            <option value="resolved">RESOLVED</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="brutal-border bg-primary p-4">
                        <h5 className="font-mono text-xs uppercase text-steel mb-2">METADATA</h5>
                        <div className="space-y-1 text-sm font-mono">
                          <div>REPORTER: <span className="text-terminal">{selectedBug.reporter}</span></div>
                          <div>ASSIGNEE: <span className="text-terminal">{selectedBug.assignee}</span></div>
                          <div>CREATED: <span className="text-terminal">{format(new Date(selectedBug.createdAt), 'MM/dd/yyyy HH:mm')}</span></div>
                          <div>UPDATED: <span className="text-terminal">{format(new Date(selectedBug.updatedAt), 'MM/dd/yyyy HH:mm')}</span></div>
                        </div>
                      </div>
                      
                      {selectedBug.tags && selectedBug.tags.length > 0 && (
                        <div>
                          <h5 className="font-mono text-xs uppercase text-steel mb-2">TAGS</h5>
                          <div className="flex flex-wrap gap-2">
                            {selectedBug.tags.map((tag, index) => (
                              <div
                                key={index}
                                className="brutal-border bg-primary px-2 py-1 text-xs font-mono text-ghost"
                              >
                                {tag}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Comments Section */}
                  <div className="border-t-2 border-steel pt-6">
                    <h5 className="font-mono text-sm uppercase text-steel mb-4">ACTIVITY_LOG</h5>
                    <div className="space-y-3">
                      {comments
                        .filter(comment => comment.bugId === selectedBug.id)
                        .map((comment, index) => (
                          <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="brutal-border bg-primary p-3"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-mono text-xs text-terminal">{comment.author}</span>
                              <span className="font-mono text-xs text-steel">
                                {format(new Date(comment.createdAt), 'MM/dd HH:mm')}
                              </span>
                            </div>
                            <p className="text-ghost text-sm">{comment.content}</p>
                          </motion.div>
                        ))}
                      
                      {comments.filter(comment => comment.bugId === selectedBug.id).length === 0 && (
                        <div className="text-center py-8">
                          <ApperIcon name="MessageSquare" className="w-8 h-8 text-steel mx-auto mb-2" />
                          <p className="text-steel font-mono text-sm">NO_ACTIVITY_LOGGED</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature