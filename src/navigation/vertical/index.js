// ** Navigation sections imports
import apps from './apps'
import pages from './pages'
import forms from './forms'
import tables from './tables'
import demmandes from './demmandes'
import themes from './themes'
import departments from './departments'
import directions from './directions'
import divisions from './divisions'
import services from './services'

import others from './others'
import dashboards from './dashboards'
import uiElements from './ui-elements'
import chartsAndMaps from './charts-maps'
import alertMails from './AlertsMails'
import client from './client'

// ** Merge & Export
//  'OLD EXPORT'  export default [...dashboards, ...apps, ...pages, ...uiElements, ...forms, ...tables, ...chartsAndMaps, ...others]
export default
    [
        // ...dashboards,
        ...alertMails,
        // ...pages,
        // ...apps,
        ...demmandes, ...themes, ...departments, ...directions, ...divisions, ...services, ...client
        // ...uiElements, ...forms, ...tables, ...chartsAndMaps, ...others
    ]
