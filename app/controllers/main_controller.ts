import type { HttpContext } from '@adonisjs/core/http'

export default class MainController {
  async index(ctx: HttpContext) {
    return ctx.view.render('dashboard')
  }
}
