import { getChatStream } from './utils/ai'

export default defineEventHandler(async (event) => {
  let { messages } = await readBody(event)
  messages = messages.clientMsgs.concat(messages.serverMsgs)

  const stream = await getChatStream({ messages })
  return sendStream(event, stream)
})
