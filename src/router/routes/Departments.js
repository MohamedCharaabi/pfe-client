import { lazy } from 'react'

const DepartmentRoutes = [
  {
    path: '/departments',
    component: lazy(() => import('../../views/deps/reactstrap')),
    meta: {
      action: 'read',
      resource: 'user'
    }
  },
  {
    path: '/addDepartment',
    component: lazy(() => import('../../views/deps/reactstrap/AddDepartment')),
    meta: {
      action: 'read',
      resource: 'user'
    }
  },
  {
    path: '/editDepartment/:dep',
    component: lazy(() => import('../../views/deps/reactstrap/EditDepartment')),
    meta: {
      action: 'read',
      resource: 'user'
    }
  },
  {
    path: '/ajoutDirector',
    component: lazy(() => import('../../views/deps/reactstrap/AjoutDirector')),
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

export default DepartmentRoutes
