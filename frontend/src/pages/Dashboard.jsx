import { useEffect, useState } from 'react'

import {
  Users,
  Wifi,
  Ban,
  Wallet,
} from 'lucide-react'

import api from '../services/api'

export default function Dashboard() {

  /*
  |--------------------------------------------------------------------------
  | STATES
  |--------------------------------------------------------------------------
  */

  const [loading, setLoading] = useState(true)

  const [stats, setStats] = useState({

    totalCustomer: 0,

    activeCustomer: 0,

    suspendCustomer: 0,

    totalIncome: 0,

  })

  /*
  |--------------------------------------------------------------------------
  | GET DASHBOARD
  |--------------------------------------------------------------------------
  */

  const getDashboard = async () => {

    try {

      setLoading(true)

      const response = await api.get('/dashboard')

      setStats(response.data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  /*
  |--------------------------------------------------------------------------
  | LOAD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    getDashboard()

  }, [])

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {

    return (

      <div className="flex justify-center items-center h-[70vh]">

        <h1 className="text-3xl font-bold">
          Loading Dashboard...
        </h1>

      </div>

    )

  }

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-5xl font-bold text-slate-900">

          Dashboard

        </h1>

        <p className="text-gray-500 mt-2">

          Selamat datang di sistem RT/RW Net

        </p>

      </div>

      {/* STATISTICS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* TOTAL CUSTOMER */}

        <div className="bg-white rounded-3xl shadow p-6">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-gray-500">

                Total Customer

              </h2>

              <p className="text-5xl font-bold mt-3">

                {stats.totalCustomer}

              </p>

            </div>

            <Users
              size={55}
              className="text-blue-500"
            />

          </div>

        </div>

        {/* ACTIVE */}

        <div className="bg-white rounded-3xl shadow p-6">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-gray-500">

                Active

              </h2>

              <p className="text-5xl font-bold mt-3 text-green-500">

                {stats.activeCustomer}

              </p>

            </div>

            <Wifi
              size={55}
              className="text-green-500"
            />

          </div>

        </div>

        {/* SUSPEND */}

        <div className="bg-white rounded-3xl shadow p-6">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-gray-500">

                Suspend

              </h2>

              <p className="text-5xl font-bold mt-3 text-red-500">

                {stats.suspendCustomer}

              </p>

            </div>

            <Ban
              size={55}
              className="text-red-500"
            />

          </div>

        </div>

        {/* INCOME */}

        <div className="bg-white rounded-3xl shadow p-6">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-gray-500">

                Income

              </h2>

              <p className="text-3xl font-bold mt-3 text-blue-500">

                Rp {stats.totalIncome?.toLocaleString()}

              </p>

            </div>

            <Wallet
              size={55}
              className="text-blue-500"
            />

          </div>

        </div>

      </div>

      {/* INFO GRID */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* SYSTEM STATUS */}

        <div className="bg-white rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            System Status

          </h2>

          <div className="space-y-5">

            <div className="flex justify-between items-center">

              <span>Backend API</span>

              <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">

                ONLINE

              </span>

            </div>

            <div className="flex justify-between items-center">

              <span>Database</span>

              <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">

                CONNECTED

              </span>

            </div>

            <div className="flex justify-between items-center">

              <span>Billing System</span>

              <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm">

                ACTIVE

              </span>

            </div>

          </div>

        </div>

        {/* CUSTOMER SUMMARY */}

        <div className="bg-white rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            Customer Summary

          </h2>

          <div className="space-y-5">

            <div className="flex justify-between">

              <span>Total Customer</span>

              <span className="font-bold">

                {stats.totalCustomer}

              </span>

            </div>

            <div className="flex justify-between">

              <span>Active</span>

              <span className="font-bold text-green-500">

                {stats.activeCustomer}

              </span>

            </div>

            <div className="flex justify-between">

              <span>Suspend</span>

              <span className="font-bold text-red-500">

                {stats.suspendCustomer}

              </span>

            </div>

          </div>

        </div>

        {/* FINANCE */}

        <div className="bg-white rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            Finance

          </h2>

          <div className="space-y-5">

            <div className="flex justify-between">

              <span>Monthly Income</span>

              <span className="font-bold text-blue-500">

                Rp {stats.totalIncome?.toLocaleString()}

              </span>

            </div>

            <div className="flex justify-between">

              <span>Status</span>

              <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">

                STABLE

              </span>

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}