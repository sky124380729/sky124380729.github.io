export class Custom {
  constructor() {
    console.log('')
  }
  on(eventName, cb) {
    window.addEventListener(eventName, function (e) {
      cb(e.detail)
    })
  }
  emit(eventName, data) {
    const event = new CustomEvent(eventName, {
      detail: data
    })
    window.dispatchEvent(event)
  }
}
