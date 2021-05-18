import { Server, Grid, Circle } from 'react-feather'

export default [
  // {
  //   id: 'division',
  //   title: 'Divisions',
  //   icon: <Server size={20} />,
  //   navLink: '/divisions/reactstrap'
  // }
  {
    id: 'divisions',
    title: 'Divisions',
    icon: <Grid size={20} />,
    children: [
      {
        id: 'dtBasic',
        title: 'Divisions',
        icon: <Circle size={12} />,
        navLink: '/divisions'
      },
      {
        id: 'dtAdvance',
        title: 'Add Division',
        icon: <Circle size={12} />,
        navLink: '/addDivision'
      }
    ]
  }
]
