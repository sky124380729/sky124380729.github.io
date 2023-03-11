class Command {
  constructor(instance) {
    if (!instance) {
      throw new Error('command instance must note be null!')
    }
    this.program = instance
    const cmd = this.program.command(this.command)
    cmd.description(this.description)
    if (this.options?.length > 0) {
      this.options.forEach((option) => {
        cmd.option(...option)
      })
    }
    cmd.hook('preAction', () => {
      this.preAction()
    })
    cmd.hook('postAction', () => {
      this.postAction()
    })
    cmd.action((...params) => {
      this.action(...params)
    })
  }

  // REVIEW: 这里是让子类必须实现它的意思，子类继承之后不实现command的方法将会报错
  get command() {
    throw new Error('command must be implemented')
  }

  get description() {
    throw new Error('description must be implemented')
  }

  get options() {
    return []
  }

  get action() {
    throw new Error('action must be implemented')
  }

  preAction() {
    // empty
  }

  postAction() {
    // empty
  }
}

module.exports = Command
