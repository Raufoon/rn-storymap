export default class StoryCard extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute('type')
    const content = this.getAttribute('content')

    this.innerHTML = `
    <div class="storyCard ${type}">
      <p>${content}</p>
    </div>
    `
  }

  get content() {
    return this.hasAttribute('content')
  }

  set content(value) {
    this.setAttribute('content', value)
  }

  get type() {
    return this.hasAttribute('type')
  }

  set type(value) {
    this.setAttribute('type', value)
  }
}
