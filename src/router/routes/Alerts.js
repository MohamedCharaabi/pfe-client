import { lazy } from 'react'

const AlertRoutes = [
  {
    path: '/alertMails',
    exact: true,
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/alert/todo'))
  }

]

export default AlertRoutes
