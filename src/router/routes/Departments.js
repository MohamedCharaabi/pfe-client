import { lazy } from 'react'

const DepartmentRoutes = [
  {
    path: '/departments',
    component: lazy(() => import('../../views/deps/reactstrap'))
  },
  {
    path: '/addDepartment',
    component: lazy(() => import('../../views/deps/reactstrap/AddDepartment'))
  },
  {
    path: '/editDepartment/:dep',
    component: lazy(() => import('../../views/deps/reactstrap/EditDepartment'))
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
