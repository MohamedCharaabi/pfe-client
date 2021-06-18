// ** Routes Imports
import AppRoutes from './Apps'
import FormRoutes from './Forms'
import PagesRoutes from './Pages'
import TablesRoutes from './Tables'
import ChartMapsRoutes from './ChartsMaps'
import DashboardRoutes from './Dashboards'
import UiElementRoutes from './UiElements'
import ExtensionsRoutes from './Extensions'
import PageLayoutsRoutes from './PageLayouts'
import DemmandesLayoutsRoutes from './Demanndes'
import ThemesLayoutsRoutes from './Themes'
import DepartmentsLayoutsRoutes from './Departments'
import DirectionsLayoutsRoutes from './Directions'
import DivisionsLayoutsRoutes from './Divisions'
import ServicesLayoutsRoutes from './Services'
import OthersRoutes from './OtherRoutes'
import AlertEmails from './Alerts'


// ** Document title
const TemplateTitle = 'Pfe CIMS'

// ** Default Route
const DefaultRoute = '/demmandes/reactstrap'

// ** Merge Routes
const Routes = [
  ...DashboardRoutes,
  ...AlertEmails,
  ...AppRoutes,
  ...OthersRoutes,
  ...DemmandesLayoutsRoutes,
  ...ThemesLayoutsRoutes,
  ...DepartmentsLayoutsRoutes,
  ...DirectionsLayoutsRoutes,
  ...DivisionsLayoutsRoutes,
  ...ServicesLayoutsRoutes,
  ...PagesRoutes,
  ...UiElementRoutes,
  ...ExtensionsRoutes,
  ...PageLayoutsRoutes,
  ...FormRoutes,
  ...TablesRoutes,
  ...ChartMapsRoutes

]

const Others = OthersRoutes


export { DefaultRoute, TemplateTitle, Routes, Others }
