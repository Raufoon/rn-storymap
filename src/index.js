import App from './app'
import indexPageHtml from './index.html'
import './style.css'

window.addEventListener('load', function () {
  console.log('Initializting App')
  const app = new App()
  window.app = app

  document.body.innerHTML = indexPageHtml
  document.body.onload = initIndexPage
})

function initIndexPage() {
  console.log('Initializing Index Page')

  const offlineLoginButton = document.getElementById('btn_login_offline')

  offlineLoginButton.addEventListener('click', function () {
    app.useOffline()
  })
}
