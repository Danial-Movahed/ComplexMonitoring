import type { HttpContext } from '@adonisjs/core/http'

export default class MainController {
    async index(ctx: HttpContext) {
        if (!ctx.auth.isAuthenticated)
            return ctx.response.redirect('/login')

        return ctx.response.redirect('/dashboard')
    }
}
