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
    const req = ctx.request.all()

    var unixUsernames: { [name: string]: string } = {}
    env.get('COMPUTERS')?.split(', ').forEach(computer => {
      unixUsernames[computer] = req["UnixUsername"+computer]
    });
    var computerPermissions: { [name: string]: number } = {}
    env.get('COMPUTERS')?.split(', ').forEach(computer => {
      computerPermissions[computer] = 0
    });
    const user = new User()
    user.username = req["Email"]
    user.password = req["Password"]
    user.fullName = req["FullName"]
    user.unixUsernames = JSON.stringify(unixUsernames)
    user.permission = JSON.stringify(computerPermissions)
    await user.save()
    await ctx.auth.use('web').login(user)
    return ctx.response.redirect('/')
  }
}
