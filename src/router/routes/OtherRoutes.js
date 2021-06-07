import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const OthersRoutes = [
    {
        path: '/profile',
        component: lazy(() => import('../../views/account-settings'))
    },
    {
        path: '/alerts',
        component: lazy(() => import('../../views/alert'))
    },
    {
        path: '/alert/:id',
        component: lazy(() => import('../../views/alert/alertMessage'))
    },
    {
        path: '/addRequest',
        component: lazy(() => import('../../views/pages/others/AddRequest')),
        layout: 'BlankLayout'
        // meta: {
        //   authRoute: true
        // }
    },
    {
        path: '/pages/login-v1',
        component: lazy(() => import('../../views/pages/authentication/LoginV1')),
        layout: 'BlankLayout'
    },
    {
        path: '/alertForm',
        component: lazy(() => import('../../views/apps/alertForm')),
        meta: {
            action: 'read',
            resource: 'auth'
        }
    }

]

export default OthersRoutes
