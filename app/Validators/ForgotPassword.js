'use strict'
const Antl = use('Antl')
class ForgotPassword {
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
      redirect_url: 'required|url'
    }
  }
}

module.exports = ForgotPassword
