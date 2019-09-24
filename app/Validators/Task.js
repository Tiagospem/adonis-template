'use strict'

const Antl = use('Antl')
class Task {
  get messages () {
    // file at resources/locales/*/
    return Antl.list('validation')
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      due_date: 'date'
    }
  }
}

module.exports = Task
