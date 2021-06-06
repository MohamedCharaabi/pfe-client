import { Server, TrendingUp, Circle } from 'react-feather'

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
    icon: <TrendingUp size={20} />,
    children: [
      {
        id: 'dtBasic',
        title: 'Divisions',
        icon: <Circle size={12} />,
        navLink: '/divisions'
      },
      {
        id: 'dtAdvance',
        title: 'Ajoput Division',
        icon: <Circle size={12} />,
        navLink: '/addDivision'
      },
      {
        id: 'dtAdvance',
        title: 'Ajout Directeur',
        icon: <Circle size={12} />,
        navLink: '/addDivision'
      }
    ]
  }
]
