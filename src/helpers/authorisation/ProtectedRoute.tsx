import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import UserService from '../UserService'

export const isRoleAllowed = (userRoles, rolesAllowedForTheRoute) => {
  return rolesAllowedForTheRoute.some((allowed) => userRoles.includes(allowed))
}

const ProtectedRoute = (props) => {
  const userRoles = UserService.getRoles()
  const { component: Component, rolesAllowedForTheRoute } = props

  return (
    <Route
      render={(props) => {
        return userRoles &&
          isRoleAllowed(userRoles, rolesAllowedForTheRoute) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/403',
            }}
          />
        )
      }}
    />
  )
}

export default ProtectedRoute
