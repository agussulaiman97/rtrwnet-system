import {
  LayoutDashboard,
  Users,
  Activity,
  Router,
  Receipt,
  Ticket,
  FileBarChart,
  Settings
} from 'lucide-react'

import { Link, useLocation } from 'react-router-dom'

export default function Sidebar() {

  const location = useLocation()

  const menus = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard size={22} />
    },
    {
      name: 'Customers',
      path: '/customers',
      icon: <Users size={22} />
    },
    {
      name: 'Monitoring',
      path: '/monitoring',
      icon: <Activity size={22} />
    },
    {
      name: 'Router',
      path: '/router',
      icon: <Router size={22} />
    },
    {
      name: 'Billing',
      path: '/billing',
      icon: <Receipt size={22} />
    },
    {
      name: 'Voucher',
      path: '/voucher',
      icon: <Ticket size={22} />
    },
    {
      name: 'Reports',
      path: '/reports',
      icon: <FileBarChart size={22} />
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings size={22} />
    }
  ]

  return (

    <aside
      className="
        hidden
        lg:flex
        fixed
        left-0
        top-0
        w-72
        h-screen
        bg-[#020b3f]
        text-white
        flex-col
        z-50
      "
    >

      <div className="p-8 border-b border-blue-900">

        <h1 className="text-5xl font-bold leading-tight">
          RT/RW
          <br />
          Net
        </h1>

      </div>

      <nav className="flex-1 overflow-y-auto p-5 space-y-2">

        {menus.map((menu, index) => (

          <Link
            key={index}
            to={menu.path}
            className={`
              flex items-center gap-4
              px-5 py-4
              rounded-2xl
              transition-all
              duration-200
              text-lg
              font-medium

              ${
                location.pathname === menu.path
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-200 hover:bg-blue-900'
              }
            `}
          >

            {menu.icon}

            <span>{menu.name}</span>

          </Link>

        ))}

      </nav>

      <div className="p-5 border-t border-blue-900 text-center text-sm text-gray-400">

        RTRWNET v1.0

      </div>

    </aside>

  )

}