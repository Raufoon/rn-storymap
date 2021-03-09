import App from './app'
import indexPageHtml from './index.html'
import storyMapPageHtml from './app/storymap.html'
import './style.css'

window.addEventListener('load', function () {
  console.log('Initializting App')
  const app = new App()
  window.app = app

  if (app.auth.isLoggedIn()) {
    document.body.innerHTML = storyMapPageHtml
  } else {
    document.body.innerHTML = indexPageHtml
  }
})
