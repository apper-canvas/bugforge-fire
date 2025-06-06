import bugData from '../mockData/bugs.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let bugs = [...bugData]

const bugService = {
  async getAll() {
    await delay(300)
    return [...bugs]
  },

  async getById(id) {
    await delay(200)
    const bug = bugs.find(b => b.id === id)
    if (!bug) throw new Error(`Bug with id ${id} not found`)
    return { ...bug }
  },

  async create(bugData) {
    await delay(400)
    const newBug = {
      id: Date.now(),
      ...bugData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    bugs.unshift(newBug)
    return { ...newBug }
  },

  async update(id, updates) {
    await delay(300)
    const index = bugs.findIndex(b => b.id === id)
    if (index === -1) throw new Error(`Bug with id ${id} not found`)
    
    bugs[index] = {
      ...bugs[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    return { ...bugs[index] }
  },

  async delete(id) {
    await delay(250)
    const index = bugs.findIndex(b => b.id === id)
    if (index === -1) throw new Error(`Bug with id ${id} not found`)
    
    bugs.splice(index, 1)
    return true
  }
}

export default bugService