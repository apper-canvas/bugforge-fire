import activityData from '../mockData/activities.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let activities = [...activityData]

const activityService = {
  async getAll() {
    await delay(200)
    return [...activities]
  },

  async getByBugId(bugId) {
    await delay(150)
    return activities.filter(a => a.bugId === bugId).map(a => ({ ...a }))
  },

  async create(activityData) {
    await delay(250)
    const newActivity = {
      id: Date.now(),
      ...activityData,
      timestamp: new Date().toISOString()
    }
    activities.push(newActivity)
    return { ...newActivity }
  }
}

export default activityService