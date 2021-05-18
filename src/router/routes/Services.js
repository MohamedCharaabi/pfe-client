import { lazy } from 'react'

const DepartmentRoutes = [
  {
    path: '/services',
    component: lazy(() => import('../../views/ser/reactstrap'))
  },
  {
    path: '/addService',
    component: lazy(() => import('../../views/ser/reactstrap/AddService'))
  },
  {
    path: '/editService/:ser',
    component: lazy(() => import('../../views/ser/reactstrap/EditService'))
  },
  {
    path: '/datatables/basic',
    component: lazy(() => import('../../views/tables/data-tables/basic'))
  },
  {
    path: '/datatables/advance',
    component: lazy(() => import('../../views/tables/data-tables/advance'))
  },
  {
    path: '/control',
    component: lazy(() => import('../../views/extensions/access-control')),
    meta: {
      action: 'read',
      resource: 'auth'
    }
  }
]

export default DepartmentRoutes
