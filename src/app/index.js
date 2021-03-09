import Auth from './Auth'
import Database from './Database'

export default class App {
  constructor() {
    this.auth = new Auth()
    this.db = new Database()
  }

  useOffline() {
    this.auth.loginAsOffline()
  }
}
