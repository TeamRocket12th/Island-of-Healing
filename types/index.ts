export {}

declare global {
  interface ApiResponse {
    [key: string]: any
  }

  // 作家資訊
  interface Writer {
    name: string
    id: string
    jobTitle: string
    bio: string
    imgUrl: string
    isFollowing: boolean
  }

  // 作者個人頁面

  // 作者個人文章
  interface Work {
    id: string
    title: string
    coverUrl: string
    summary: string
    createdDate: string
  }

  // 作者個人資訊
  interface WriterInfo {
    id: string
    name: string
    jobTitle: string
    bio: string
    imgUrl: string
    followerNum: number
    followingNum: number
    work: Work[]
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

  // 文章詳細內容
  interface ArticleDetail {
    id: string
    charge: boolean
    title: string
    coverUrl: string
    content: string
    createdTime: string
    category: string
    tags: string[]
    writerInfo: Writer
  }

  // 文章摘要
  interface ArticleSummary {
    Id: string
    Title: string
    Category: string
    Initdate: string
    Progress: string
    Pay: string
    CollectNum: number
    CommentNum: number
    LikeNum?: number
    ClickNum?: number
  }

  // 文章卡片
  interface ArticleCard {
    id: number
    title: string
    imgUrl: string
    writer: string
    date: string
  }

  // 個人訊息
  interface MyMsg {
    email: string
    imgUrl: string
    name: string
    canMessage: string
    date: string
    id: number
    read: boolean
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
    MyPlan: string
    Birthday?: string
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
