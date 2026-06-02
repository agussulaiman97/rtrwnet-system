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

      <div className="lg:hidden bg-[#020b46] text-white p-4 flex items-center justify-between">

        <h1 className="text-xl font-bold">
          RT/RW Net
        </h1>

        <button
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

      </div>

      {mobileMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenu(false)}
        />
      )}

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

        <h1 className="text-5xl font-bold leading-tight mb-10">
          RT/RW
          <br />
          Net
        </h1>

        <nav className="space-y-3">

          {menus.map((menu) => (

            <Link
              key={menu.path}
              to={menu.path}
              onClick={() => setMobileMenu(false)}
              className={`
                flex
                items-center
                gap-4
                px-5
                py-4
                rounded-2xl
                text-lg
                transition

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
}