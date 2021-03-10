import { openDB } from 'idb'
import { DoublyLinkedList } from './DoublyLinkedList'

const dbname = 'StoryMapDB'
const version = 1

export default class Database {
  constructor() {
    console.log('Initializing Database')

    openDB(dbname, version, {
      upgrade(db) {
        db.createObjectStore('Team', { keyPath: 'id' })
        db.createObjectStore('Developer', { keyPath: 'id' })
        db.createObjectStore('ProjectBoard', { keyPath: 'id' })
        db.createObjectStore('RootStory', { keyPath: 'id' })
        db.createObjectStore('ActivityStory', { keyPath: 'id' })
        db.createObjectStore('Story', { keyPath: 'id' })
      },
    })
  }

  async addFakeData() {
    const db = await openDB(dbname)

    async function _add(tableName, dataList) {
      let tx = db.transaction(tableName, 'readwrite')
      let store = tx.objectStore(tableName)
      dataList.forEach(async (data) => await store.put(data))
      await tx.done
    }

    await _add('Developer', [
      {
        id: 'dev1',
        name: 'Harry Potter',
      },
      {
        id: 'dev2',
        name: 'Ron Weasley',
      },
      {
        id: 'dev3',
        name: 'Tom Riddle',
      },
    ])

    await _add('Team', [
      {
        id: 'team1',
        name: 'Frontend Team',
        memberIds: ['dev1', 'dev2', 'dev3'],
        projectId: 'proj1',
      },
    ])

    await _add('ProjectBoard', [
      {
        id: 'proj1',
        name: 'Remote Deposit Capture',
        userRoles: ['Bank Customer', 'Portal Admin'],
        rootStoryIds: ['rs1', 'rs2'],
      },
    ])

    await _add('RootStory', [
      {
        id: 'rs1',
        title: 'Register in bank portal',
        userRole: 'Bank Customer',
        activityStoryIds: ['as1', 'as2', 'as3'],
      },
      {
        id: 'rs2',
        title: 'Perform admin functions',
        userRole: 'Portal Admin',
        activityStoryIds: ['as4', 'as5', 'as6'],
      },
    ])

    await _add('ActivityStory', [
      {
        id: 'as1',
        title: 'Create account',
        storyIds: ['s1', 's2', 's3'],
      },
      {
        id: 'as2',
        title: 'Complete profile',
      },
      {
        id: 'as3',
        title: 'Receive verification',
      },
      {
        id: 'as4',
        title: 'Sign into portal',
        storyIds: ['s4'],
      },
      {
        id: 'as5',
        title: 'Update bank info',
      },
      {
        id: 'as6',
        title: 'Sign out',
      },
    ])

    await _add('Story', [
      {
        id: 's1',
        title: 'Register with bank given ID and password',
        release: 1,
      },
      {
        id: 's2',
        title: 'Receive error for invalid customer ID',
        release: 1,
      },
      {
        id: 's3',
        title: 'Forbidden to use password <6 characters',
        release: 1,
      },
      {
        id: 's4',
        title: 'I hope i can complete this project',
        release: 1,
      },
    ])
  }

  async getById(tableName, id) {
    const db = await openDB(dbname, version)
    return db.get(tableName, id)
  }

  async getAll(tableName) {
    const db = await openDB(dbname, version)
    const rootStories = await db.getAll(tableName)
    return rootStories
  }

  async getAllAsLinkedList(tableName) {
    return DoublyLinkedList.fromArray(await this.getAll(tableName))
  }
}
