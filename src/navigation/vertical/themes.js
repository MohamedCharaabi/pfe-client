import { Type, Grid, Circle, AlertCircle } from 'react-feather'

export default [
  {
    id: 'alertctstrap',
    title: 'Alerts',
    icon: <AlertCircle size={20} />,
    navLink: '/alerts'
  },
  {
    id: 'themesReactstrap',
    title: 'Themes',
    icon: <Type size={20} />,
    navLink: '/themes/reactstrap'
  }
  // {
  //   id: 'dataTable',
  //   title: 'DataTable',
  //   icon: <Grid size={20} />,
  //   children: [
  //     {
  //       id: 'dtBasic',
  //       title: 'Basic',
  //       icon: <Circle size={12} />,
  //       navLink: '/datatables/basic'
  //     },
  //     {
  //       id: 'dtAdvance',
  //       title: 'Advanced',
  //       icon: <Circle size={12} />,
  //       navLink: '/datatables/advance'
  //     }
  //   ]
  // }
]
