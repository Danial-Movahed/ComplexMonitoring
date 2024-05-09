/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import env from './env.js'

// router.get('/', '#controllers/main_controller.index')
router.get('/', ({ view }) => {
  return view.render('dashboard', {
    Computers: env.get('COMPUTERS')?.split(', '),
  })
})
router.get('/tables', ({ view }) => {
  return view.render('tables', {
    Computers: env.get('COMPUTERS')?.split(', '),
  })
})
router.get('/billing', ({ view }) => {
  return view.render('billing')
})
router.get('/virtual-reality', ({ view }) => {
  return view.render('virtual-reality')
})
router.get('/rtl', ({ view }) => {
  return view.render('rtl')
})
router.get('/sign-in', '#controllers/signin_controller.index')
router.get('/sign-up', '#controllers/signup_controller.index')
router.post('/sign-in', '#controllers/login_controller.post')
router.post('/sign-up', '#controllers/signup_controller.post')
router.get('/sign-out', async ({ auth, response }) => {
    await auth.use('web').logout()
    return response.redirect('/')
  }).use(middleware.auth())


router.get('/google/redirect', ({ ally }) => {
  return ally.use('google').redirect()
})


router.get('/google/callback', async ({ ally }) => {
  const google = ally.use('google')

  /**
   * User has denied access by canceling
   * the login flow
   */
  if (google.accessDenied()) {
    return 'You have cancelled the login process'
  }

  /**
   * OAuth state verification failed. This happens when the
   * CSRF cookie gets expired.
   */
  if (google.stateMisMatch()) {
    return 'We are unable to verify the request. Please try again'
  }

  /**
   * GitHub responded with some error
   */
  if (google.hasError()) {
    return google.getError()
  }

  /**
   * Access user info
   */
  const user = await google.user()
  return user
})
