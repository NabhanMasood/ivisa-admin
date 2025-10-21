<template>
  <DashboardLayout page-title="Dashboard">
    <div class="space-y-8 sm:space-y-4">
      <!-- Page Title -->
      <div
        class="flex flex-row items-center justify-between w-full flex-wrap gap-2 sm:gap-4"
      >
        <h1
          class="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Dashboard
        </h1>
      </div>

      <!-- Welcome Message -->
      <div
        class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white"
      >
        <h2 class="text-2xl font-bold mb-2">Welcome to iVisa Dashboard</h2>
        <p class="text-blue-100">
          Your complete property management solution with modern components and
          beautiful design.
        </p>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <Users class="h-8 w-8 text-blue-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Total Users</p>
                <p class="text-2xl font-semibold text-gray-900">1,234</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <ShoppingCart class="h-8 w-8 text-green-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Total Sales</p>
                <p class="text-2xl font-semibold text-gray-900">$45,678</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <TrendingUp class="h-8 w-8 text-yellow-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Growth</p>
                <p class="text-2xl font-semibold text-gray-900">+12.5%</p>
              </div>
            </div>
          </div>
        </Card>

        <Card>
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <BarChart3 class="h-8 w-8 text-purple-600" />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-500">Analytics</p>
                <p class="text-2xl font-semibold text-gray-900">89.2%</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <!-- Quick Actions -->
      <Card>
        <div class="p-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Quick Actions</h3>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <NuxtLink to="/dashboard/users" class="group">
              <div
                class="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Users class="h-8 w-8 text-blue-600 mb-2" />
                <h4 class="font-medium text-gray-900">Manage Users</h4>
                <p class="text-sm text-gray-500">
                  View and manage user accounts
                </p>
              </div>
            </NuxtLink>

            <div
              class="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <ShoppingCart class="h-8 w-8 text-green-600 mb-2" />
              <h4 class="font-medium text-gray-900">E-commerce</h4>
              <p class="text-sm text-gray-500">Manage products and orders</p>
            </div>

            <div
              class="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <TrendingUp class="h-8 w-8 text-yellow-600 mb-2" />
              <h4 class="font-medium text-gray-900">Sales Analytics</h4>
              <p class="text-sm text-gray-500">View sales performance</p>
            </div>

            <div
              class="p-4 border rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <BarChart3 class="h-8 w-8 text-purple-600 mb-2" />
              <h4 class="font-medium text-gray-900">Reports</h4>
              <p class="text-sm text-gray-500">Generate detailed reports</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </DashboardLayout>
</template>

<script setup>
import { Users, ShoppingCart, TrendingUp, BarChart3 } from "lucide-vue-next";

// Set page title
useHead({
  title: "Dashboard - iVisa",
});
</script>
