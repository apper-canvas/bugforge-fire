import Home from '../pages/Home'
import NotFound from '../pages/NotFound'

const routes = {
  home: {
    id: 'home',
    label: 'BUG_FORGE',
    icon: 'Bug',
    component: Home,
    path: '/'
  },
  notFound: {
    id: 'notFound',
    label: 'ERROR_404',
    icon: 'AlertTriangle',
    component: NotFound,
    path: '*'
  }
}

export const routeArray = Object.values(routes)
export default routes