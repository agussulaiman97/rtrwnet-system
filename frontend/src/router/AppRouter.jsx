import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'

import Dashboard from '../pages/Dashboard'
import Customers from '../pages/Customers'
import Monitoring from '../pages/Monitoring'
import Router from '../pages/Router'
import Billing from '../pages/Billing'
import Voucher from '../pages/Voucher'
import Reports from '../pages/Reports'
import Settings from '../pages/Settings'

export default function AppRouter() {

  return (

    <BrowserRouter
  basename="/billing"
  future={{
    v7_startTransition: true,
    v7_relativeSplatPath: true,
  }}
  >

      <Routes>

        <Route path="/" element={<MainLayout />}>

          <Route index element={<Dashboard />} />

          <Route
            path="customers"
            element={<Customers />}
          />

          <Route
            path="monitoring"
            element={<Monitoring />}
          />

          <Route
            path="router"
            element={<Router />}
          />

          <Route
            path="billing"
            element={<Billing />}
          />

          <Route
            path="voucher"
            element={<Voucher />}
          />

          <Route
            path="reports"
            element={<Reports />}
          />

          <Route
            path="settings"
            element={<Settings />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}
