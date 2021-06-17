import { Server, Send, Circle } from 'react-feather'

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
    icon: <Send size={20} />,
    children: [
      {
        id: 'dtBasic',
        title: 'Directions',
        icon: <Circle size={12} />,
        navLink: '/directions/reactstrap',
        action: 'read',
        resource: 'user'
      },
      {
        id: 'dtAdvance',
        title: 'Ajout Direction',
        icon: <Circle size={12} />,
        navLink: '/addDirection',
        action: 'read',
        resource: 'user'
      },
      {
        id: 'dtAdvance',
        title: 'Ajout Modirateur',
        icon: <Circle size={12} />,
        navLink: '/dir/ajoutdirector',
        action: 'read',
        resource: 'user'
      }
    ]
  }
]
