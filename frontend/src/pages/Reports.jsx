import { useEffect, useState } from 'react'

import {
  Wallet,
  Receipt,
  AlertTriangle,
} from 'lucide-react'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

import api from '../services/api'

export default function Reports() {

  /*
  |--------------------------------------------------------------------------
  | STATES
  |--------------------------------------------------------------------------
  */

  const [loading, setLoading] =
    useState(true)

  const [report, setReport] =
    useState(null)

  /*
  |--------------------------------------------------------------------------
  | GET REPORT
  |--------------------------------------------------------------------------
  */

  const getReport = async () => {

    try {

      const response =
        await api.get('/reports')

      setReport(response.data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {

    getReport()

  }, [])

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading || !report) {

    return (

      <div className="flex justify-center items-center h-[70vh]">

        <h1 className="text-3xl font-bold">

          Loading Reports...

        </h1>

      </div>

    )

  }

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-5xl font-bold">

          Finance Reports

        </h1>

        <p className="text-slate-500 mt-2">

          Laporan keuangan realtime

        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* INCOME */}

        <div className="bg-white rounded-3xl shadow p-8">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">

                Total Income

              </p>

              <h2 className="text-4xl font-bold mt-3 text-green-500">

                Rp {report.totalIncome?.toLocaleString()}

              </h2>

            </div>

            <Wallet
              size={55}
              className="text-green-500"
            />

          </div>

        </div>

        {/* UNPAID */}

        <div className="bg-white rounded-3xl shadow p-8">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">

                Unpaid

              </p>

              <h2 className="text-4xl font-bold mt-3 text-red-500">

                Rp {report.totalUnpaid?.toLocaleString()}

              </h2>

            </div>

            <AlertTriangle
              size={55}
              className="text-red-500"
            />

          </div>

        </div>

        {/* TRANSACTION */}

        <div className="bg-white rounded-3xl shadow p-8">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">

                Transactions

              </p>

              <h2 className="text-4xl font-bold mt-3 text-blue-500">

                {report.totalTransactions}

              </h2>

            </div>

            <Receipt
              size={55}
              className="text-blue-500"
            />

          </div>

        </div>

      </div>

      {/* CHART */}

      <div className="bg-white rounded-3xl shadow p-8">

        <div className="mb-8">

          <h2 className="text-3xl font-bold">

            Monthly Income

          </h2>

          <p className="text-slate-500 mt-2">

            Statistik income bulanan

          </p>

        </div>

        <div className="h-[400px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart data={report.chart}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="income"
                stroke="#2563eb"
                strokeWidth={4}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  )

}