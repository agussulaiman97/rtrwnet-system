import { useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'

import {
  FaHome,
  FaUsers,
  FaWifi,
  FaServer,
  FaMoneyBillWave,
  FaTicketAlt,
  FaChartBar,
  FaCog,
  FaBars,
  FaTimes,
} from 'react-icons/fa'

export default function MainLayout() {

  const location = useLocation()

  const [mobileMenu, setMobileMenu] = useState(false)

  const menus = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <FaHome />,
    },
    {
      name: 'Customers',
      path: '/customers',
      icon: <FaUsers />,
    },
    {
      name: 'Monitoring',
      path: '/monitoring',
      icon: <FaWifi />,
    },
    {
      name: 'Router',
      path: '/router',
      icon: <FaServer />,
    },
    {
      name: 'Billing',
      path: '/billing',
      icon: <FaMoneyBillWave />,
    },
    {
      name: 'Voucher',
      path: '/voucher',
      icon: <FaTicketAlt />,
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: <FaChartBar />,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <FaCog />,
    },
  ]

  return (

    <div className="min-h-screen bg-gray-100">

      {/* Mobile Header */}
      <header className="lg:hidden bg-[#020b46] text-white flex items-center justify-between px-4 py-4 shadow-md sticky top-0 z-40">

        <h1 className="text-xl font-bold">
          RT/RW Net
        </h1>

        <button
          onClick={() => setMobileMenu(true)}
          className="text-2xl"
        >
          <FaBars />
        </button>

      </header>

      {/* Overlay Mobile */}
      {mobileMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* Sidebar Desktop + Mobile */}
      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-[280px]
          bg-[#020b46]
          text-white
          p-8
          overflow-y-auto
          z-50
          transform
          transition-transform
          duration-300

          ${mobileMenu ? 'translate-x-0' : '-translate-x-full'}

          lg:translate-x-0
        `}
      >

        <div className="flex items-center justify-between lg:block">

          <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-8 lg:mb-16">
            RT/RW
            <br />
            Net
          </h1>

          <button
            className="lg:hidden text-3xl"
            onClick={() => setMobileMenu(false)}
          >
            <FaTimes />
          </button>

        </div>

        <nav className="space-y-3">

          {menus.map((menu) => (

            <Link
              key={menu.path}
              to={menu.path}
              onClick={() => setMobileMenu(false)}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-lg lg:text-2xl transition
              ${
                location.pathname === menu.path
                  ? 'bg-blue-600'
                  : 'hover:bg-blue-500/30'
              }`}
            >

              {menu.icon}

              {menu.name}

            </Link>

          ))}

        </nav>

      </aside>

      {/* Content */}
      <main
        className="
          lg:ml-[280px]
          p-4
          md:p-6
          lg:p-8
          overflow-x-hidden
        "
      >
        <Outlet />
      </main>

    </div>
  )
}t { Outlet, Link, useLocation } from 'react-router-dom'

import {
  FaHome,
  FaUsers,
  FaWifi,
  FaServer,
  FaMoneyBillWave,
  FaTicketAlt,
  FaChartBar,
  FaCog,
} from 'react-icons/fa'

export default function MainLayout() {

  const location = useLocation()

  const menus = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <FaHome />,
    },
    {
      name: 'Customers',
      path: '/customers',
      icon: <FaUsers />,
    },
    {
      name: 'Monitoring',
      path: '/monitoring',
      icon: <FaWifi />,
    },
    {
      name: 'Router',
      path: '/router',
      icon: <FaServer />,
    },
    {
      name: 'Billing',
      path: '/billing',
      icon: <FaMoneyBillWave />,
    },
    {
      name: 'Voucher',
      path: '/voucher',
      icon: <FaTicketAlt />,
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: <FaChartBar />,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <FaCog />,
    },
  ]

  return (

    <div className="flex min-h-screen bg-gray-100">

      <aside className="w-[280px] bg-[#020b46] text-white fixed left-0 top-0 h-screen p-8 overflow-y-auto">

        <h1 className="text-6xl font-bold leading-tight mb-16">
          RT/RW
          <br />
          Net
        </h1>

        <nav className="space-y-3">

          {menus.map((menu) => (

            <Link
              key={menu.path}
              to={menu.path}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-2xl transition
              ${
                location.pathname === menu.path
                  ? 'bg-blue-600'
                  : 'hover:bg-blue-500/30'
              }
              `}
            >

              {menu.icon}

              {menu.name}

            </Link>

          ))}

        </nav>

      </aside>

      <main className="ml-[280px] w-full p-8 overflow-x-hidden">

        <Outlet />

      </main>

    </div>
  )
}
