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

  draw() {
    const body = document.body

    const header = document.createElement('header')
    header.id = 'sm_header'

    const boardTitle = document.createElement('h2')
    boardTitle.id = 'sm_title'
    boardTitle.innerHTML = this.project.name

    const board = document.createElement('main')
    board.id = 'sm_board'

    header.appendChild(boardTitle)
    body.appendChild(header)
    body.appendChild(board)

    this.rootStoryLL.forEachNode((rootStory) => {
      const activityBoard = this.createActivityBoard(rootStory)
      board.appendChild(activityBoard)

      const rootStoryCard = this.createRootStoryCard(rootStory)
      activityBoard.appendChild(rootStoryCard)

      rootStory.activityStoryLL.forEachNode((activityStory) => {
        activityBoard.appendChild(this.createActivityStoryCard(activityStory))
      })
    })
  }

  createActivityBoard(rootStory) {
    const activityPanel = document.createElement('div')
    activityPanel.className = 'activityBoard'
    activityPanel.style.gridTemplateColumns = `repeat(${rootStory.activityStoryLL.count}, auto)`
    return activityPanel
  }

  createRootStoryCard(story) {
    const storyCard = document.createElement('story-card')
    storyCard.setAttribute('type', 'root')
    storyCard.setAttribute('content', story.title)
    storyCard.style.gridRow = 2
    storyCard.style.gridColumn = 1
    return storyCard
  }

  createActivityStoryCard(story) {
    const storyCard = document.createElement('story-card')
    storyCard.setAttribute('type', 'activity')
    storyCard.setAttribute('content', story.title)
    storyCard.style.gridRow = 3
    return storyCard
  }
}
