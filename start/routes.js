'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/ws', ({ view }) => {
  return view.render('ws.demo')
})

Route.get('/ws-projects', ({ view }) => {
  return view.render('ws.demo_project')
})

Route.post('users', 'UserController.store').validator('User')
Route.put('users/:id', 'UserController.update')

Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')

Route.group(() => {
  Route.post('files', 'FileController.store')
  Route.get('files/:id', 'FileController.show')
  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .except(['index', 'show'])
    .validator(new Map(
      [
        [
          ['projects.store'],
          ['Project']
        ]
      ]
    )).middleware(['is:(administrator || moderator)'])
  Route.get('projects', 'ProjectController.index')
    .middleware(['auth', 'can:read_projects || read_private_projects'])
  Route.get('projects/:id', 'ProjectController.show')
    .middleware(['auth', 'can:read_projects || read_private_projects'])
  // utilizar o recurso de rotas abaixo somente em casos especificos
  // onde não é possivel criar separadamente (examplo nao é possivel criar
  // task sem um projeto)
  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['projects.tasks.store'],
          ['Project']
        ]
      ]
    ))

  Route.resource('permissions', 'PermissionController').apiOnly()
  Route.resource('roles', 'RoleController').apiOnly()
}).middleware(['auth'])
