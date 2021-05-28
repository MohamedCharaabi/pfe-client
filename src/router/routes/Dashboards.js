import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  // { 
  //   path: '/home',
  //   component: lazy(() => import('../../views/landing/pages/index'))
  // },
  {
    path: '/dashboard/analytics',
    component: lazy(() => import('../../views/dashboard/analytics'))
  },
  {
    path: '/dashboard/analy',
    component: lazy(() => import('../../views/dashboard/analytics')),
    meta: {
      action: 'read',
      resource: 'auth'
    }
  },
  {
    path: '/dashboard/ecommerce',
    component: lazy(() => import('../../views/dashboard/ecommerce')),
    exact: true
  }
]

export default DashboardRoutes