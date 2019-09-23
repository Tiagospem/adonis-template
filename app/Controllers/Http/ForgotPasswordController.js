'use strict'

const moment = require('moment')
const crypto = require('crypto')
const User = use('App/Models/User')
const Mail = use('Mail')

class ForgotPasswordController {
  async store ({ request, response }) {
    try {
      const email = request.input('email')
      const user = await User.findByOrFail('email', email)
      user.token = crypto.randomBytes(10).toString('hex')
      user.token_created_at = new Date()
      await user.save()

      await Mail.send(
        'emails.forgot_password',
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`
        },
        message => {
          message
            .to(user.email)
            .from('no-reply@bomleilao.com', 'Bomleilão - Recuperação de senha')
            .subject('Recuperação de senha')
        }
      )
    } catch (e) {
      return response.status(e.status)
        .send({
          error: {
            message: 'The email does not exists'
          }
        })
    }
  }

  async update ({ request, response }) {
    try {
      const { token, newPassword } = request.all()
      const user = await User.findByOrFail('token', token)

      const tokenExpired = moment()
        .subtract('2', 'days')
        .isAfter(user.token_created_at)

      if (tokenExpired) {
        return response
          .status(401)
          .send({
            error: {
              message: 'The token was expired'
            }
          })
      }

      user.token = null
      user.token_created_at = null
      user.password = newPassword

      await user.save()
    } catch (e) {
      return response.status(e.status)
        .send({
          error: {
            message: 'Error when attempt to reset your password'
          }
        })
    }
  }
}

module.exports = ForgotPasswordController
