import { Server, Globe, Circle } from 'react-feather'

export default [
  // {
  //   id: 'service',
  //   title: 'Services',
  //   icon: <Server size={20} />,
  //   navLink: '/services/reactstrap'
  // }
  {
    id: 'services',
    title: 'Services',
    icon: <Globe size={20} />,
    children: [
      {
        id: 'dtBasic',
        title: 'Services',
        icon: <Circle size={12} />,
        navLink: '/services'
      },
      {
        id: 'dtAdvance',
        title: 'Ajout Services',
        icon: <Circle size={12} />,
        navLink: '/addService'
      },

      {
        id: 'dtAdvance',
        title: 'Ajout Directeur',
        icon: <Circle size={12} />,
        navLink: '/addService'
      }
    ]
  }
]
