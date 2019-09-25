'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Project extends Model {
  static boot () {
    super.boot()
    this.addHook('afterCreate', 'ProjectHook.newProjectWs')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  tasks () {
    return this.hasMany('App/Models/Task')
  }
}

module.exports = Project
