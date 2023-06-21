export {}

declare global {
  interface ApiResponse {
    [key: string]: any
  }

  // 文章
  interface Article {
    id: string
    role: string
    coverUrl: string
    articleTitle: string
    articleSummary: string
    articleDate: string
  }

  // 文章摘要
  interface ArticleSummary {
    id: string
    title: string
    publishDate: string
    collectNum: number
    commentNum: number
  }

  // 作家資訊
  interface Writer {
    name: string
    id: string
    bio: string
    imgUrl: string
  }

  // 個人訊息
  interface Message {
    email: string
    imgUrl: string
    name: string
    canMessage: string
    date: string
    id: number
  }

  // 歷史訂單
  interface PastOrder {
    orderDate: string
    orderId: string
    orderPlan: string
    price: number
    payment: string
  }

  // 使用者資訊
  interface UserInfo {
    Uid: string
    NickName: string
    Email: string
    ImgUrl: string
    Role: string
    Birthday: string
    MyPlan: string
    JobTitle?: string
    Bio?: string
  }

  // 作家統計資訊
  interface WriterStats {
    totalFollowers: number
    totalArticles: number
    totalCollection: number
    totalLikes: number
    totalComments: number
    totalInteractions: number
    totalClicks: number
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
