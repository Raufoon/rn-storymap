import Auth from './Auth'
import Database from './Database'
import { DoublyLinkedList } from './DoublyLinkedList'

export default class App {
  constructor() {
    this.auth = new Auth()
    this.db = new Database()
    this.db.addFakeData()

    if (this.auth.isLoggedIn()) {
      this.initStoryMap()
    }
  }

  useOffline() {
    this.auth.loginAsOffline()
    this.initStoryMap()
  }

  async initStoryMap() {
    const rootStoryLL = await this.db.getAllAsLinkedList('RootStory')

    rootStoryLL.forEach(async (rootStory) => {
      const { activityStoryIds } = rootStory
      const activityStoryLL = new DoublyLinkedList()

      activityStoryIds.forEach(async (asId) => {
        const activityStory = await this.db.getById('ActivityStory', asId)
        activityStoryLL.insert(activityStory)
      })

      rootStory.activityStoryLL = activityStoryLL
    })

    console.log(rootStoryLL)
  }
}
