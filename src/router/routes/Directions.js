import { lazy } from 'react'

const DepartmentRoutes = [
  {
    path: '/directions',
    component: lazy(() => import('../../views/dir/reactstrap')),
    meta: {
      action: 'read',
      resource: 'user'
    }
  },
  {

    path: '/addDirection',
    component: lazy(() => import('../../views/dir/reactstrap/AddDirection')),
    meta: {
      action: 'read',
      resource: 'user'
    }
  },
  {
    path: '/dir/ajoutdirector',
    component: lazy(() => import('../../views/dir/reactstrap/AjoutDirector')),
    meta: {
      action: 'read',
      resource: 'user'
    }
  },
  {
    path: '/editDirection/:dir',
    component: lazy(() => import('../../views/dir/reactstrap/EditDirection')),
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
