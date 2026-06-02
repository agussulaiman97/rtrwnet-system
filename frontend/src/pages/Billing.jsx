import { useEffect, useState } from 'react'

import Swal from 'sweetalert2'

import api from '../services/api'

export default function Billing() {

  const [billings, setBillings] = useState([])

  /*
  |--------------------------------------------------------------------------
  | GET BILLINGS
  |--------------------------------------------------------------------------
  */

  const getBillings = async () => {

    try {

      const response = await api.get('/billings')

      setBillings(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  /*
  |--------------------------------------------------------------------------
  | GENERATE INVOICE
  |--------------------------------------------------------------------------
  */

  const generateInvoice = async () => {

    try {

      await api.post('/billings/generate')

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Invoice generated',
      })

      getBillings()

    } catch (error) {

      console.log(error)

    }

  }

  /*
  |--------------------------------------------------------------------------
  | PAY
  |--------------------------------------------------------------------------
  */

  const payBilling = async (id) => {

    try {

      await api.put(`/billings/pay/${id}`)

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Payment success',
      })

      getBillings()

    } catch (error) {

      console.log(error)

    }

  }

  /*
  |--------------------------------------------------------------------------
  | SUSPEND
  |--------------------------------------------------------------------------
  */

  const suspendCustomer = async (customerId) => {

    try {

      await api.put(`/billings/suspend/${customerId}`)

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Customer suspended',
      })

      getBillings()

    } catch (error) {

      console.log(error)

    }

  }

  /*
  |--------------------------------------------------------------------------
  | LOAD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    getBillings()

  }, [])

  /*
  |--------------------------------------------------------------------------
  | STATS
  |--------------------------------------------------------------------------
  */

  const totalInvoice = billings.length

  const paid = billings.filter(
    (item) => item.status === 'PAID'
  ).length

  const unpaid = billings.filter(
    (item) => item.status === 'UNPAID'
  ).length

  const overdue = billings.filter(
    (item) => item.status === 'OVERDUE'
  ).length

  return (

    <div className="p-4 md:p-8">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-3xl md:text-5xl font-bold">
          Billing System
        </h1>

        <p className="text-slate-500 mt-2">
          Kelola tagihan pelanggan
        </p>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

        <div className="bg-white p-6 rounded-3xl shadow">

          <p>Total Invoice</p>

          <h2 className="text-3xl md:text-5xl font-bold mt-3">

            {totalInvoice}

          </h2>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <p>Paid</p>

          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-green-500">

            {paid}

          </h2>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <p>Unpaid</p>

          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-orange-500">

            {unpaid}

          </h2>

        </div>

        <div className="bg-white p-6 rounded-3xl shadow">

          <p>Overdue</p>

          <h2 className="text-3xl md:text-5xl font-bold mt-3 text-red-500">

            {overdue}

          </h2>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-white rounded-3xl shadow p-8">

        <div className="flex justify-end mb-8">

          <button
            onClick={generateInvoice}
            className="
w-full
md:w-auto
bg-blue-600
hover:bg-blue-700
text-white
px-6
py-4
rounded-2xl
"
          >

            Generate Invoice

          </button>

        </div>

        <div className="overflow-auto">

          <table className="w-full min-w-[800px]">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">
                  Customer
                </th>

                <th className="text-left py-4">
                  Amount
                </th>

                <th className="text-left py-4">
                  Due Date
                </th>

                <th className="text-left py-4">
                  Status
                </th>

                <th className="text-left py-4">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {billings.map((item) => (

                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="py-5">

                    {item.customer?.name}

                  </td>

                  <td className="py-5">

                    Rp {item.amount?.toLocaleString()}

                  </td>

                  <td className="py-5">

                    {new Date(
                      item.dueDate
                    ).toLocaleDateString()}

                  </td>

                  <td className="py-5">

                    <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm">

                      {item.status}

                    </span>

                  </td>

                  <td className="py-5">

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          payBilling(item.id)
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded-xl"
                      >

                        Pay

                      </button>

                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-xl"
                      >

                        Invoice

                      </button>

                      <button
                        onClick={() =>
                          suspendCustomer(
                            item.customerId
                          )
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-xl"
                      >

                        Suspend

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )

}