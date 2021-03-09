export default class Auth {
  constructor() {
    console.log('Initializing Auth')
    this.user = null
  }

  isLoggedIn() {
    return !!this.user
  }

  login() {}

  loginAsOffline(name = 'Offline Company') {
    this.user = {
      isOffline: true,
      name,
    }
  }
}
