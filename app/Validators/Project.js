'use strict'

const Antl = use('Antl')

class Project {
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
      description: 'required'
    }
  }
}

module.exports = Project
