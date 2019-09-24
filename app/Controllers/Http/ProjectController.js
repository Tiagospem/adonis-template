'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  /**
   * /projects?page=2&limit=3
   */
  async index ({ request }) {
    const { page = 1, limit = 1 } = request.get()
    const projects = await Project.query()
      .with('user')
      .paginate(page, limit)
    return projects
  }

  async store ({ request, auth }) {
    const data = request.only(['title', 'description'])
    const project = await Project
      .create({ ...data, user_id: auth.user.id })
    return project
  }

  async show ({ params }) {
    const project = await Project.findOrFail(params.id)
    await project.load('user')
    await project.load('tasks')
    return project
  }

  async update ({ params, request, response }) {
    const project = await Project.findOrFail(params.id)
    const data = request.only(['title', 'description'])
    project.merge(data)
    await project.save()
    return project
  }

  async destroy ({ params }) {
    const project = await Project.findOrFail(params.id)
    await project.delete()
  }
}

module.exports = ProjectController
