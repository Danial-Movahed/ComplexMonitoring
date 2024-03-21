import type { HttpContext } from '@adonisjs/core/http'

export default class MainController {
  async index(ctx: HttpContext) {
    if (!(await ctx.auth.check())) return ctx.response.redirect('/login')

    console.log(ctx.auth.user?.username)
    return ctx.response.redirect('/dashboard')
  }
}
