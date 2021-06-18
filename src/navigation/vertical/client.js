import { File, Home, Type, AlertCircle } from 'react-feather'
export default [

    //client sidebar
    // {
    //     id: 'dashboard',
    //     title: 'Dashboard',
    //     icon: <Home size={12} />,
    //     action: 'read',
    //     resource: 'auth',
    //     navLink: '/dashboard'
    // },
    {
        id: 'perdemandes',
        title: 'Demmandes',
        icon: <File size={12} />,
        action: 'read',
        resource: 'auth',
        navLink: '/requests'
    },
    {
        id: 'themesReactstrap',
        title: 'Themes',
        icon: <Type size={20} />,
        action: 'read',
        resource: 'auth',
        navLink: '/themes/client'
    },
    {
        id: 'alertReactstrap',
        title: 'Reclamation',
        icon: <AlertCircle size={20} />,
        action: 'read',
        resource: 'auth',
        navLink: '/alertForm'
    }
]
