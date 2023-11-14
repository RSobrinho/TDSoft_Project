import {AuthenticationHandler} from '../authentication/AuthenticationHandler'

const {hasRole, isAuthenticated} = new AuthenticationHandler()

export { hasRole, isAuthenticated }