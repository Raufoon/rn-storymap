import Auth from './Auth'
import Database from './Database'

export default class App {
  constructor() {
    this.auth = new Auth()
    this.db = new Database()
    this.db.addFakeData()
  }

  useOffline() {
    this.auth.loginAsOffline()
  }
}
