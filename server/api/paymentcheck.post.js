export default defineEventHandler(async (event) => {
  console.log(event)
  const body = await readBody(event)

  // return {
  //   ok: true,
  //   data: {
  //     status: body.Status
  //   }
  // }

  if (body.Status === 'SUCCESS') {
    return sendRedirect(event, 'https://island-of-healing.vercel.app/neworder?status=success', 302)
  }
})
