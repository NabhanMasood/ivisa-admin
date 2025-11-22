import { useAuthApi } from '~/composables/useAuthApi'
import { usePermissions } from '~/composables/usePermissions'

/**
 * Global authentication and authorization middleware
 * Runs on every route change to check auth and permissions
 */
export default defineNuxtRouteMiddleware((to, from) => {
  // Skip auth check for public pages
  const publicPages = ['/', '/login', '/forgot-password']
  const isPublicPage = publicPages.includes(to.path)

  const { isAuthenticated, getCurrentUser } = useAuthApi()
  const { hasPermission, isSuperAdmin, getUserPermissions } = usePermissions()

  // Debug logging
  if (to.path.startsWith('/dashboard')) {
    const user = getCurrentUser()

  }

  // If trying to access dashboard without auth, redirect to login
  if (to.path.startsWith('/dashboard') && !isAuthenticated()) {
    return navigateTo('/login')
  }

  // If authenticated and trying to access login, redirect to dashboard
  if (isAuthenticated() && to.path === '/login') {
    return navigateTo('/dashboard')
  }

  // Check permissions for specific dashboard routes
  if (to.path.startsWith('/dashboard') && isAuthenticated()) {
    // Super admins can access everything
    if (isSuperAdmin()) {
      return
    }

    // Permission mapping for routes
    const routePermissions: { [key: string]: keyof import('~/composables/useAuthApi').Permission } = {
      '/dashboard/countries': 'countries',
      '/dashboard/visaproducts': 'visaProducts',
      '/dashboard/nationalities': 'nationalities',
      '/dashboard/embassies': 'embassies',
      '/dashboard/coupons': 'coupons',
      '/dashboard/additional-info': 'additionalInfo',
      '/dashboard/customers': 'customers',
      '/dashboard/applications': 'applications',
      '/dashboard/finances': 'finances',
    }

    // Check if route requires specific permission
    for (const [route, permission] of Object.entries(routePermissions)) {
      if (to.path.startsWith(route)) {
        if (!hasPermission(permission)) {
          // Redirect to dashboard main page with error
          return navigateTo({
            path: '/dashboard',
            query: { error: 'You do not have permission to access this page' }
          })
        }
        break
      }
    }

    // Users section is only accessible by super admins
    if (to.path.startsWith('/dashboard/users')) {
      if (!isSuperAdmin()) {
        return navigateTo({
          path: '/dashboard',
          query: { error: 'Only administrators can manage users' }
        })
      }
    }
  }
})

