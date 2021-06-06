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
        navLink: '/departments'
      },
      {
        id: 'dtAdvance',
        title: 'Ajout Department',
        icon: <Circle size={12} />,
        navLink: '/addDepartment'
      },
      {
        id: 'dtAdvance',
        title: 'Ajout Directeur',
        icon: <Circle size={12} />,
        navLink: '/ajoutDirector'
      }
    ]
  }
]
