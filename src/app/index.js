import Auth from './Auth'
import Database from './Database'
import { DoublyLinkedList } from './DoublyLinkedList'
import StoryMap from './StoryMap'

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

  async initStoryMap(projectId = 'proj1') {
    const project = await this.db.get('ProjectBoard', projectId)

    const allRootStories = await this.db.getAllByIds(
      'RootStory',
      project.rootStoryIds
    )

    const allActivityStoryIds = [].concat(
      ...allRootStories.map((story) => story.activityStoryIds)
    )

    const allActivityStories =
      (await this.db.getAllAsMap('ActivityStory', allActivityStoryIds)) || []

    const allStoryIds = [].concat(
      ...Object.values(allActivityStories).map((story) => story.storyIds || [])
    )

    const allStories = await this.db.getAllAsMap('Story', allStoryIds)

    this.storyMap = new StoryMap(allRootStories, allActivityStories, allStories)
  }
}
