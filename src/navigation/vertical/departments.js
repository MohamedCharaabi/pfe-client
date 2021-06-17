import { Server, Layout, Circle } from 'react-feather'

export default [
  // {
  //   id: 'department',
  //   title: 'Departments',
  //   icon: <Server size={20} />,
  //   navLink: '/departments/reactstrap'
  // }
  {
    id: 'Departments',
    title: 'Departments',
    icon: <Layout size={20} />,
    children: [
      {
        id: 'departments',
        title: 'Departmnets',
        icon: <Circle size={12} />,
        navLink: '/departments',
        action: 'read',
        resource: 'user'
      },
      {
        id: 'dtAdvance',
        title: 'Ajout Department',
        icon: <Circle size={12} />,
        navLink: '/addDepartment',
        action: 'read',
        resource: 'user'
      },
      {
        id: 'dtAdvance',
        title: 'Ajout Modirateur',
        icon: <Circle size={12} />,
        navLink: '/ajoutDirector',
        action: 'read',
        resource: 'user'
      }
    ]
  }
]
