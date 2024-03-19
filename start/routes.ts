/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', '#controllers/main_controller.index')
router.get('/login', '#controllers/login_controller.index')
router.get('/dashboard', '#controllers/dashboard_controller.index')
