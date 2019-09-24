'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

const TaskHook = exports = module.exports = {}

TaskHook.sendNewTaskEmail = async (task) => {
  // if not has an user and not have previous user_id
  if (!task.user_id && !task.dirty.user_id) return

  if (task) {
    const { email, username } = await task.user().fetch()
    const { title } = task
    const file = await task.file().fetch()

    await Mail.send(
      ['emails.new_task'],
      { username, title, hasAttachment: !!file },
      (message) => {
        message
          .to(email)
          .from('no-reply@bomleilao.com', 'Bomleilao | Notificação')
          .subject('Nova tarefa para você')
        if (file) {
          message.attach(Helpers.tmpPath(`uploads/${file.file}`), {
            filename: file.name
          })
        }
      }
    )
  }
}
