import { useAuthApi, type Permission } from './useAuthApi'

/**
 * Permission checker composable
 * Provides utilities to check user permissions
 */
export const usePermissions = () => {
  const { getCurrentUser } = useAuthApi()

  /**
   * Get current user's permissions
   */
  const getUserPermissions = (): Permission | null => {
    const user = getCurrentUser()
    if (!user) return null

    // Super admin has all permissions
    if (user.role === 'superadmin' || user.role === 'admin') {
      return {
        countries: true,
        visaProducts: true,
        nationalities: true,
        embassies: true,
        coupons: true,
        additionalInfo: true,
        customers: true,
        applications: true,
        finances: true,
      }
    }

    // Fallback: If user has no role and no permissions object, grant all permissions
    // (for backwards compatibility with old login sessions)
    if (!user.role && !user.permissions) {
      console.warn('User has no role or permissions set. Granting all permissions for backwards compatibility.')
      return {
        countries: true,
        visaProducts: true,
        nationalities: true,
        embassies: true,
        coupons: true,
        additionalInfo: true,
        customers: true,
        applications: true,
        finances: true,
      }
    }

    return user.permissions || null
  }

  /**
   * Check if user has permission for a specific section
   */
  const hasPermission = (section: keyof Permission): boolean => {
    const permissions = getUserPermissions()

    if (!permissions) return false
    return permissions[section] === true
  }

  /**
   * Check if user has any of the given permissions
   */
  const hasAnyPermission = (sections: (keyof Permission)[]): boolean => {
    return sections.some(section => hasPermission(section))
  }

  /**
   * Check if user has all of the given permissions
   */
  const hasAllPermissions = (sections: (keyof Permission)[]): boolean => {
    return sections.every(section => hasPermission(section))
  }

  /**
   * Check if user is super admin
   */
  const isSuperAdmin = (): boolean => {
    const user = getCurrentUser()
    if (!user) return false

    // Check if user has explicit role
    if (user.role === 'superadmin' || user.role === 'admin') {
      return true
    }

    // Fallback: If user has no role and no permissions object, assume super admin
    // (for backwards compatibility with old login sessions)
    if (!user.role && !user.permissions) {
      console.warn('User has no role or permissions set. Assuming super admin for backwards compatibility.')
      return true
    }

    return false
  }

  return {
    getUserPermissions,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    isSuperAdmin,
  }
}

