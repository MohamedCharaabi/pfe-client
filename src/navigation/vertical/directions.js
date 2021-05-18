import { Server, Grid, Circle } from 'react-feather'

export default [
  // {
  //   id: 'direction',
  //   title: 'Directions',
  //   icon: <Server size={20} />,
  //   navLink: '/directions/reactstrap'
  // }
  {
    id: 'directions',
    title: 'Directions',
    icon: <Grid size={20} />,
    children: [
      {
        id: 'dtBasic',
        title: 'Directions',
        icon: <Circle size={12} />,
        navLink: '/directions/reactstrap'
      },
      {
        id: 'dtAdvance',
        title: 'Add Direction',
        icon: <Circle size={12} />,
        navLink: '/addDirection'
      }
    ]
  }
]
