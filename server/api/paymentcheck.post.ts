export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // return {
  //   ok: true,
  //   data: {
  //     status: body.Status
  //   }
  // }

  // 接收藍新回傳付款狀態
  if (body.Status === 'SUCCESS') {
    return sendRedirect(event, 'https://island-of-healing.vercel.app/neworder?status=success', 302)
  } else {
    return sendRedirect(event, 'https://island-of-healing.vercel.app/neworder?status=fail', 302)
  }
})
