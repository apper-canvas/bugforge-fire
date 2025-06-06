import commentData from '../mockData/comments.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let comments = [...commentData]

const commentService = {
  async getAll() {
    await delay(250)
    return [...comments]
  },

  async getByBugId(bugId) {
    await delay(200)
    return comments.filter(c => c.bugId === bugId).map(c => ({ ...c }))
  },

  async create(commentData) {
    await delay(300)
    const newComment = {
      id: Date.now(),
      ...commentData,
      createdAt: new Date().toISOString()
    }
    comments.push(newComment)
    return { ...newComment }
  },

  async delete(id) {
    await delay(200)
    const index = comments.findIndex(c => c.id === id)
    if (index === -1) throw new Error(`Comment with id ${id} not found`)
    
    comments.splice(index, 1)
    return true
  }
}

export default commentService