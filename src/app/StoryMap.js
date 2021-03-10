import { DoublyLinkedList } from './DoublyLinkedList'

export default class StoryMap {
  constructor(project, allRootStories, allActivityStories, allStories) {
    this.project = project
    this.rootStoryLL = DoublyLinkedList.fromArray(allRootStories)

    // Create the LL-grid with root and activity stories
    this.rootStoryLL.forEachNode((rootStory) => {
      const { activityStoryIds } = rootStory
      const activityStoryLL = new DoublyLinkedList()

      activityStoryIds.forEach((asId) => {
        activityStoryLL.insert(allActivityStories[asId])
      })

      rootStory.activityStoryLL = activityStoryLL
    })

    // Create LL for each activity story under each root story
    this.rootStoryLL.forEachNode((rootStory) => {
      const { activityStoryLL } = rootStory

      activityStoryLL.forEachNode((activityStory) => {
        const { storyIds } = activityStory

        const storyLL = new DoublyLinkedList()

        storyIds?.forEach(async (stId) => {
          const story = allStories[stId]
          storyLL.insert(story)
        })

        activityStory.storyLL = storyLL
      })
    })

    console.log(this.rootStoryLL)
  }
}
