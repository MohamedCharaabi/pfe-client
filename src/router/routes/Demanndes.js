import { lazy } from 'react'

const DemmandesRoutes = [
  {
    path: '/demmandes/reactstrap',
    component: lazy(() => import('../../views/demmandes/reactstrap'))
  },
  {
    path: '/demmandes/details/:id',
    component: lazy(() => import('../../views/demmandes/reactstrap/RequestDetails'))
  },
  {
    path: '/datatables/basic',
    component: lazy(() => import('../../views/tables/data-tables/basic'))
  },
  {
    path: '/requests',
    component: lazy(() => import('../../views/demmandes/reactstrap/FiltredRequests')),
    meta: {
      action: 'read',
      resource: 'auth'
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
