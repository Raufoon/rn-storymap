import { openDB } from 'idb'

export default class Database {
  constructor() {
    console.log('Initializing Database')

    openDB('StoryMapDB', 1, {
      upgrade(db) {
        db.createObjectStore('Team', { keyPath: 'id' })
        db.createObjectStore('Developer', { keyPath: 'id' })
        db.createObjectStore('ProjectBoard', { keyPath: 'id' })
        db.createObjectStore('Release', { keyPath: 'id' })
        db.createObjectStore('UserRole', { keyPath: 'id' })
        db.createObjectStore('RootStory', { keyPath: 'id' })
        db.createObjectStore('ActivityStory', { keyPath: 'id' })
        db.createObjectStore('Story', { keyPath: 'id' })
      },
    })
  }
}
