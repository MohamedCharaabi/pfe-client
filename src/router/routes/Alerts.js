import { lazy } from 'react'

const AlertRoutes = [
  {
    path: '/alertMails',
    exact: true,
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/alert/todo')),
    meta: {
      action: 'read',
      resource: 'user'
    }
  }

]

export default AlertRoutes
