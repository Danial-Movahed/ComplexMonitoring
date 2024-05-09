import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class LoginController {
    async index(ctx: HttpContext) {
        return ctx.view.render('login')
    }
    async post(ctx: HttpContext) {
      const { Email, Password, RememberMe } = ctx.request.only(['Email', 'Password', 'RememberMe'])
      const user = await User.verifyCredentials(Email, Password)
      console.log(RememberMe)
      if (RememberMe == "on")
        await ctx.auth.use("web").login(user, !!ctx.request.input('remember_me'))
      else
        await ctx.auth.use("web").login(user)
      return ctx.response.redirect('/')
    }
}
