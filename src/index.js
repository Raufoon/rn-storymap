import App from './app'
import StoryCard from './app/StoryCard'
import indexPageHtml from './index.html'
import './style.css'

window.customElements.define('story-card', StoryCard)

window.addEventListener('load', function () {
  console.log('Initializting App')
  const app = new App()
  window.app = app

  if (!app.auth.isLoggedIn()) {
    document.body.innerHTML = indexPageHtml
  }
})
