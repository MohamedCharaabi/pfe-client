import { lazy } from 'react'

const DemmandesRoutes = [
  {
    path: '/themes/reactstrap',
    component: lazy(() => import('../../views/themes/reactstrap'))
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
