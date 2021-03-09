export default class Auth {
  constructor() {
    console.log('Initializing Auth')
    this.user = JSON.parse(localStorage.getItem('auth-u'))
  }

  isLoggedIn() {
    return !!this.user
  }

  login() {}

  loginAsOffline(name = 'Offline Company') {
    console.log('Logging in as offline user')
    this.user = {
      isOffline: true,
      name,
    }
    localStorage.setItem('auth-u', JSON.stringify(this.user))
  }
}
