'use strict'

const Ws = use('Ws')

const ProjectHook = exports = module.exports = {}

ProjectHook.method = async (modelInstance) => {
}

ProjectHook.newProjectWs = async project => {
  const topic = Ws.getChannel('wsProject').topic('wsProject')
  if (topic) {
    topic.broadcast('newProject', project)
  }
}
