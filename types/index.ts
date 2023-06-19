export {}

declare global {
  // 使用者資訊
  interface UserInfo {
    uuid: string
    nickName: string
    email: string
    imgUrl: string
    role: string
  }

  // AI聊天訊息
  interface Message {
    role: 'assistant' | 'user' | 'system'
    content: string
  }

  type DefaultMsgs = Message[]

  interface AllMessages {
    clientMsgs: Message[]
    serverMsgs: Message[]
  }
}
