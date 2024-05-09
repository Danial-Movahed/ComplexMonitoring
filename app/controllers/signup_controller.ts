import User from '#models/user'
import env from '#start/env'
import type { HttpContext } from '@adonisjs/core/http'

export default class SignupController {
  async index(ctx: HttpContext) {
    return ctx.view.render('sign-up',{
      Computers: env.get('COMPUTERS')?.split(', ')
    })
  }
  async post(ctx: HttpContext) {
    const { username, fullname, password } = ctx.request.only(['username', 'fullname', 'password'])

    const user = new User()
    user.username = username
    user.password = password
    user.fullName = fullname
    await user.save()
    return ctx.response.redirect('/login')
  }
}
