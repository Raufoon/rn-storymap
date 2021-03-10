export class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
  }

  static createNode(data) {
    return {
      ...data,
      next: null,
      prev: null,
    }
  }

  insert(data, position) {
    const node = DoublyLinkedList.createNode(data)

    if (!this.head) {
      this.head = node
      this.tail = node
      return
    }

    if (!position) {
      this.tail.next = node
      node.prev = this.tail
      this.tail = node
    }
  }

  static fromArray(array) {
    const list = new DoublyLinkedList()
    const nodes = array.map((item) => DoublyLinkedList.createNode(item))

    nodes.forEach((node) => {
      list.insert(node)
    })

    return list
  }

  forEach(task) {
    let curr = this.head
    while (curr) {
      task(curr)
      curr = curr.next
    }
  }
}
