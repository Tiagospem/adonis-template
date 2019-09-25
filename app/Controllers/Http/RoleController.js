'use strict'

const Role = use('Role')

class RoleController {
  async index () {
    const role = await Role.query()
      .with('permissions')
      .fetch()
    return role
  }

  async show ({ params }) {
    const role = await Role.findOrFail(params.id)
    await role.with('permissions')
    return role
  }

  async store ({ request }) {
    // pega somente permissions e atribui o resto para data
    const { permissions, ...data } = request.only([
      'name',
      'slug',
      'description',
      'permissions'
    ])

    const role = await Role.create(data)

    if (permissions) {
      // registra permissions passando o id em um array
      await role.permissions().attach(permissions)
    }

    await role.load('permissions')

    return role
  }

  async update ({ request, params }) {
    // pega somente permissions e atribui o resto para data
    const { permissions, ...data } = request.only([
      'name',
      'slug',
      'description',
      'permissions'
    ])
    const role = await Role.findOrFail(params.id)
    role.merge(data)
    await role.save()

    if (permissions) {
      // await role.permissions().detach(permissions)
      // await role.permissions().attach(permissions)
      // o sync remove as antigas permissions e salva as novas
      await role.permissions().sync(permissions)
    }

    await role.load('permissions')

    return role
  }

  async destroy ({ params }) {
    const role = await Role.findOrFail(params.id)
    role.delete()
  }
}

module.exports = RoleController
