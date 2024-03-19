import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
    async index(ctx: HttpContext) {
        return ctx.view.render('login')
    }
}
