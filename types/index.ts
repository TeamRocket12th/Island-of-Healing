export {}

declare global {
  interface ApiResponse {
    [key: string]: any
  }

  // 熱門作家
  interface TrendingCreater {
    FollowCount: number
    Imgurl: string
    IsFollowed: boolean
    JobTitle: string
    Name: string
    WriterId: number
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

  // 作家個人頁面

  // 作家個人文章
  interface WriterWork {
    Id: number
    ImgUrl: string
    Title: string
    Summary: string
    InitDate: string
    Collect: false
    Like: false
  }

  // 作家個人資訊
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
    ArticleId: number
    ArticleImgUrl: string
    Summary: string
    Initdate: string
    Title: string
    WriterNickName: string
    WriterId: number
    WriterImgUrl: string
    IsCollected: boolean
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

  // 文章頁面作家資訊
  interface DetailWriter {
    Id: number
    Bio: string
    ImgUrl: string
    NickName: string
    Follow: boolean
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
    Category?: string
    Summary?: string
  }

  // 會員設定

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

  interface UserMsg {
    Id: number
    Name: string
    ImgUrl: string
    NotificationContent: string
    IsRead: boolean
    InitDate: string
    NotificationContentId: number
    FollowedWriterNewArticleId: null | number
    FollowedWriterNewArticleTitle: null | string
  }

  // 歷史訂單
  interface PastOrder {
    EndDate: string
    MerchantOrderNo: string
    PaidDate: string
    PaymentMethod: string
    PlanName: string
    PlanPrice: number
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

  interface userProfile {
    Birthday: null | string
    JobTitle: string
    Bio: string
  }

  // 作家後台

  // 作家後台管理文章資訊
  interface ArticleSummary {
    Id: number
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

  // 文章數據
  interface ArticleData {
    Id: number
    Title: string
    Initdate: string
    Likes: number
    Clicks: number
    Comments: number
  }

  // 追蹤人數
  interface FollowerOverview {
    Jan: number
    Feb: number
    Mar: number
    Apr: number
    May: number
    Jun: number
    Jul: number
    Aug: number
    Sep: number
    Oct: number
    Nov: number
    Dec: number
    Total: number
  }

  // 文章數據總覽
  interface WriterOverview {
    TotalArticles: number
    TotalClicks: number
    TotalCollects: number
    TotalComments: number
    TotalLikes: number
    TotalInteractions: number
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
