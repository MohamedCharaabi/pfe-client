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
        navLink: '/divisions',
        action: 'read',
        resource: 'user'
      },
      {
        id: 'dtAdvance',
        title: 'Ajoput Division',
        icon: <Circle size={12} />,
        navLink: '/addDivision',
        action: 'read',
        resource: 'user'
      },
      {
        id: 'dtAdvance',
        title: 'Ajout Directeur',
        icon: <Circle size={12} />,
        navLink: '/div/ajoutdirector',
        action: 'read',
        resource: 'user'
      }
    ]
  }
]
