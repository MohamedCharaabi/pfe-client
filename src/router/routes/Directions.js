import { lazy } from 'react'

const DepartmentRoutes = [
  {
    path: '/directions',
    component: lazy(() => import('../../views/dir/reactstrap'))
  },
  {

    path: '/addDirection',
    component: lazy(() => import('../../views/dir/reactstrap/AddDirection'))
  },
  {
    path: '/dir/ajoutdirector',
    component: lazy(() => import('../../views/dir/reactstrap/AjoutDirector'))
  },
  {
    path: '/editDirection/:dir',
    component: lazy(() => import('../../views/dir/reactstrap/EditDirection'))
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
