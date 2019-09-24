'use strict'

const Antl = use('Antl')

class User {
  get messages () {
    // file at resources/locales/*/
    return Antl.list('validation')
  }

  get validateAll () {
    return true
  }

  get rules () {
    return {
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      password: 'required|confirmed'
    }
  }
}

module.exports = User
