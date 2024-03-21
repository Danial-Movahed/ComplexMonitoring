import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class LoginController {
    async index(ctx: HttpContext) {
        return ctx.view.render('login')
    }
    async post(ctx: HttpContext) {
      const { username, password } = ctx.request.only(['username', 'password'])
      const user = await User.verifyCredentials(username, password)
      await ctx.auth.use("web").login(user)
      return ctx.response.redirect('/dashboard')
    }
}
