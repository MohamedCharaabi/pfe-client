import { Server, Grid, Circle } from 'react-feather'

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
    icon: <Grid size={20} />,
    children: [
      {
        id: 'departments',
        title: 'departmnets',
        icon: <Circle size={12} />,
        navLink: '/departments'
      },
      {
        id: 'dtAdvance',
        title: 'Add Department',
        icon: <Circle size={12} />,
        navLink: '/addDepartment'
      }
    ]
  }
]
