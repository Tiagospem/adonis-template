'use strict'

// const Database = use('Database')

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const { permissions, roles, ...data } = request.only([
      'username',
      'email',
      'password',
      'permissions',
      'roles'
    ])

    const addresses = request.input('addresses')

    // const trx = await Database.beginTransaction()

    const user = await User.create(data)

    if (roles) {
      await user.roles().sync(roles)
    }

    if (permissions) {
      await user.permissions().sync(permissions)
    }

    await user.addresses().createMany(addresses)

    await user.loadMany(['roles', 'permissions'])

    // await trx.commit()

    return user
  }

  async update ({ request, params }) {
    const { permissions, roles, ...data } = request.only([
      'username',
      'email',
      'password',
      'permissions',
      'roles'
    ])
    const user = await User.findOrFail(params.id)

    user.merge(data)

    await user.save()

    if (roles) {
      // limpa tudo e adiciona as novas roles
      await user.roles().sync(roles)
    }

    if (permissions) {
      await user.permissions().sync(permissions)
    }

    await user.loadMany(['roles', 'permissions'])

    return user
  }
}

module.exports = UserController
