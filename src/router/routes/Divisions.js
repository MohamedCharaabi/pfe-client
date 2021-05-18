import { lazy } from 'react'

const DepartmentRoutes = [
  {
    path: '/divisions',
    component: lazy(() => import('../../views/div/reactstrap'))
  },
  {
    path: '/addDivision',
    component: lazy(() => import('../../views/div/reactstrap/AddDivision'))
  },
  {
    path: '/editDivision/:div',
    component: lazy(() => import('../../views/div/reactstrap/EditDivision'))
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

export default DepartmentRoutes
