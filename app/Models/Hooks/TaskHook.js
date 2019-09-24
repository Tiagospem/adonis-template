'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')

const TaskHook = exports = module.exports = {}

TaskHook.sendNewTaskEmail = async (task) => {
  // if not has an user and not have previous user_id
  if (!task.user_id && !task.dirty.user_id) return

  if (task) {
    const { email, username } = await task.user().fetch()
    const { title } = task
    const file = await task.file().fetch()
    Kue.dispatch(Job.key, { email, username, title, file }, { attemps: 3 })
  }
}
