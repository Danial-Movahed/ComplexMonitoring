import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async index(ctx: HttpContext) {
    if (!(await ctx.auth.check())) return ctx.response.redirect('/login')
    return ctx.view.render('dashboard')
  }
}
