import { Type, Grid, Circle, AlertCircle } from 'react-feather'

export default [
  // {
  //   id: 'alertctstrap',
  //   title: 'Alerts',
  //   icon: <AlertCircle size={20} />,
  //   navLink: '/alerts'
  // },
  // {
  //   id: 'themesReactstrap',
  //   title: 'Themes',
  //   icon: <Type size={20} />,
  //   navLink: '/themes/reactstrap'
  // }
  {
    id: 'dataTathemesReactstrapble',
    title: 'Themes',
    icon: <Grid size={20} />,
    children: [
      {
        id: 'themes',
        title: 'Themes',
        icon: <Type size={12} />,
        navLink: '/themes/reactstrap',
        action: 'read',
        resource: 'user'
      },
      {
        id: 'proposition',
        title: 'Proposition',
        icon: <Circle size={12} />,
        navLink: '/themes/propositions',
        action: 'read',
        resource: 'user'
      }
    ]
  }
]
