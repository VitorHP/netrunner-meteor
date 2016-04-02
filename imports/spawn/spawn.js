// Write your package code here!

Spawn = {
  register(name, data) {
    if (!this.templates)
      this.templates = {}

    this.templates[name] = data
  },

  create(name, modifiers) {
    if (!this.templates)
      this.templates = {}

    return _.extend(_.deepClone(this.templates[name], 3), modifiers)
  }
}
