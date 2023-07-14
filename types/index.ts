export {}

declare global {
  interface ApiResponse {
    [key: string]: any
  }

  // 作家資訊
  interface Writer {
    NickName: string
    WriterId: number
    JobTitle: string
    Bio: string
    ImgUrl: string
    IsFollowing: boolean
  }

  // 作者個人頁面

  // 作者個人文章
  interface WriterWork {
    Id: number
    ImgUrl: string
    Title: string
    Summary: string
    InitDate: string
    Collect: false
    Like: false
  }

  // 作者個人資訊
  interface WriterInfo {
    Id: number
    Bio: string
    ArticlesNum: string
    FanNum: number
    Follow: boolean
    FollowNum: number
    ImgUrl: string
    JobTitle: string
    NickName: string
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
    Id: number
    ImgUrl: string
    Pay: boolean
    Title: string
    Content: string
    Initdate: string
    Tags: string[]
    Category: string
    Summary: string
    IsRead: boolean
  }

  // 文章內作者資訊
  interface DetailWriter {
    Id: number
    Bio: string
    ImgUrl: string
    NickName: string
    Follow: boolean
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
    ArticleImgUrl: string
    Id: number
    Initdate: string
    Title: string
    UserCollect: boolean
    UserLike: boolean
    WriterNickName: string
    Category: string
    Summary: string
  }

  // 文章留言
  interface Comment {
    Comment: string
    UserId: number
    CommentId: number
    ImgUrl: string
    LatestDate: string
    NickName: string
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
    Uid: number | null
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

  interface CustomerData {
    nickName: string
    email: string
    phone: string
    planId: number
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
