import Dashboard from 'views/dashboard/dashboard'
import Home from 'views/home/home'
import Login from 'views/login/login'
import NotFound from 'views/notFound/notFound'
import SignUp from 'views/SignUp/SignUp'
import withAuthentication from '../lib/withAuthentication'

const routes = {
    HOME: {
        path: '/',
        view: Home,
        auth: ['unprotected']
    },
    LOGIN: {
        path: '/login',
        view: Login,
        auth: ['unprotected']
    },
    SIGNUP: {
        path: '/sign-up',
        view: SignUp,
        auth: ['unprotected']
    },
    DASHBOARD: {
        path: '/dashboard',
        view: Dashboard,
        auth: ['protected']
    },
    NOT_FOUND: {
        view: NotFound,
        auth: ['unprotected']
    }
}

const enhancedRoutes = Object.keys(routes).reduce((acc, key) => {
    const current = routes[key]
    current?.auth?.forEach(auth => {
        const view = current.view
        current.view = auth === 'protected' ? withAuthentication(view) : view
    })
    acc[key] = current
    return acc
}, {})

export default enhancedRoutes
