import { lazy } from 'react'

const DepartmentRoutes = [
  {
    path: '/divisions',
    component: lazy(() => import('../../views/div/reactstrap')),
    meta: {
      action: 'read',
      resource: 'user'
    }
  },
  {
    path: '/addDivision',
    component: lazy(() => import('../../views/div/reactstrap/AddDivision')),
    meta: {
      action: 'read',
      resource: 'user'
    }
  },
  {
    path: '/div/ajoutdirector',
    component: lazy(() => import('../../views/div/reactstrap/AjoutDirector')),
    meta: {
      action: 'read',
      resource: 'user'
    }
  },
  {
    path: '/editDivision/:div',
    component: lazy(() => import('../../views/div/reactstrap/EditDivision')),
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
