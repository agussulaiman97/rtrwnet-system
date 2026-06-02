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