import { getChatStream } from './utils/ai'

// 串接chatgpt stream模式
export default defineEventHandler(async (event) => {
  let { messages } = await readBody(event)
  messages = messages.clientMsgs.concat(messages.serverMsgs)

  const stream = await getChatStream({ messages })
  return sendStream(event, stream)
})
