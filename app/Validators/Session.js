'use strict'

const Antl = use('Antl')
class Session {
  get messages () {
    // file at resources/locales/*/
    return Antl.list('validation')
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      email: 'required|email',
      password: 'required'
    }
  }
}

module.exports = Session
