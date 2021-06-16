import { File, Mail } from 'react-feather'

export default [
  {
    id: 'alertsMails',
    title: 'Reclamations',
    icon: <Mail size={20} />,
    action: 'read',
    resource: 'user',
    navLink: '/alertMails'
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
