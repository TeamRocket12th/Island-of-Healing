import { Configuration, OpenAIApi } from 'openai'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const configuration = new Configuration({
    apiKey: config.apiKey
  })
  const openai = new OpenAIApi(configuration)
  let { messages } = await readBody(event)
  messages = messages.clientMsgs.concat(messages.serverMsgs)

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 400
  })
  const response = completion.data.choices[0].message
  return {
    message: response,
    ok: true
  }
})
