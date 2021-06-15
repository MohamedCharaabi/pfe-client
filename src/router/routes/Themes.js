import { lazy } from 'react'

const DemmandesRoutes = [
  // {
  //   path: '/themes/reactstrap',
  //   component: lazy(() => import('../../views/themes/reactstrap'))
  // },
  {
    path: '/themes/reactstrap',
    component: lazy(() => import('../../views/themes/reactstrap')),
    meta: {
      action: 'read',
      resource: 'user'
    }
  },
  {
    path: '/themes/propositions',
    component: lazy(() => import('../../views/themes/reactstrap/Proposition')),
    meta: {
      action: 'read',
      resource: 'user'
    }
  },
  {
    path: '/themes/client',
    component: lazy(() => import('../../views/themes/clientThemes')),
    meta: {
      action: 'read',
      resource: 'auth'
    }
  },
  {
    path: '/editTheme/:id',
    component: lazy(() => import('../../views/themes/reactstrap/EditTheme')),
    meta: {
      action: 'read',
      resource: 'user'
    }
  },
  {
    path: '/datatables/basic',
    component: lazy(() => import('../../views/tables/data-tables/basic'))
  },
  {
    path: '/datatables/advance',
    component: lazy(() => import('../../views/tables/data-tables/advance'))
  }
]

export default DemmandesRoutes
