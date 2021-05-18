import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const OthersRoutes = [
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
    }

]

export default OthersRoutes
