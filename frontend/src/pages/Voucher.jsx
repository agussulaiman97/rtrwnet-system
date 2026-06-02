import { useEffect, useState } from 'react'

import Swal from 'sweetalert2'

import {
  Ticket,
  Plus,
  Trash2,
  Clock,
  Wallet,
} from 'lucide-react'

import api from '../services/api'

export default function Voucher() {

  /*
  |--------------------------------------------------------------------------
  | STATES
  |--------------------------------------------------------------------------
  */

  const [vouchers, setVouchers] = useState([])

  const [loading, setLoading] = useState(true)

  const [showModal, setShowModal] =
    useState(false)

  const [form, setForm] = useState({

    packageName: '',

    duration: '',

    price: '',

  })

  /*
  |--------------------------------------------------------------------------
  | GET VOUCHERS
  |--------------------------------------------------------------------------
  */

  const getVouchers = async () => {

    try {

      const response =
        await api.get('/vouchers')

      setVouchers(response.data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {

    getVouchers()

  }, [])

  /*
  |--------------------------------------------------------------------------
  | CREATE VOUCHER
  |--------------------------------------------------------------------------
  */

  const createVoucher = async () => {

    try {

      await api.post('/vouchers', form)

      Swal.fire({

        icon: 'success',

        title: 'Success',

        text: 'Voucher created',

      })

      setShowModal(false)

      getVouchers()

    } catch (error) {

      console.log(error)

    }

  }

  /*
  |--------------------------------------------------------------------------
  | DELETE
  |--------------------------------------------------------------------------
  */

  const deleteVoucher = async (id) => {

    const result = await Swal.fire({

      title: 'Delete Voucher?',

      icon: 'warning',

      showCancelButton: true,

    })

    if (!result.isConfirmed) return

    try {

      await api.delete(`/vouchers/${id}`)

      Swal.fire({

        icon: 'success',

        title: 'Deleted',

      })

      getVouchers()

    } catch (error) {

      console.log(error)

    }

  }

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {

    return (

      <div className="flex justify-center items-center h-[70vh]">

        <h1 className="text-3xl font-bold">

          Loading Voucher...

        </h1>

      </div>

    )

  }

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-5xl font-bold">

          Voucher Hotspot

        </h1>

        <p className="text-slate-500 mt-2">

          Generate voucher hotspot realtime

        </p>

      </div>

      {/* TOPBAR */}

      <div className="flex justify-end">

        <button
          onClick={() =>
            setShowModal(true)
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl flex items-center gap-2"
        >

          <Plus size={20} />

          Generate Voucher

        </button>

      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {vouchers.map((voucher) => (

          <div
            key={voucher.id}
            className="bg-white rounded-3xl shadow p-8"
          >

            {/* TOP */}

            <div className="flex justify-between items-start mb-6">

              <div>

                <h2 className="text-3xl font-bold">

                  {voucher.code}

                </h2>

                <p className="text-slate-500 mt-2">

                  {voucher.packageName}

                </p>

              </div>

              <Ticket
                size={45}
                className="text-blue-500"
              />

            </div>

            {/* INFO */}

            <div className="space-y-4 mb-8">

              <div className="flex justify-between">

                <span>Duration</span>

                <span className="font-bold">

                  {voucher.duration}

                </span>

              </div>

              <div className="flex justify-between">

                <span>Price</span>

                <span className="font-bold text-blue-500">

                  Rp {voucher.price?.toLocaleString()}

                </span>

              </div>

              <div className="flex justify-between">

                <span>Status</span>

                <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm">

                  {voucher.status}

                </span>

              </div>

            </div>

            {/* ACTION */}

            <button
              onClick={() =>
                deleteVoucher(voucher.id)
              }
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
            >

              <Trash2 size={20} />

              Delete

            </button>

          </div>

        ))}

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-5">

          <div className="bg-white rounded-3xl w-full max-w-2xl p-8">

            <h2 className="text-4xl font-bold mb-8">

              Generate Voucher

            </h2>

            <div className="space-y-5">

              <input
                type="text"
                placeholder="Package Name"
                value={form.packageName}
                onChange={(e) =>
                  setForm({

                    ...form,

                    packageName:
                      e.target.value,

                  })
                }
                className="border w-full px-5 py-4 rounded-2xl"
              />

              <input
                type="text"
                placeholder="Duration"
                value={form.duration}
                onChange={(e) =>
                  setForm({

                    ...form,

                    duration:
                      e.target.value,

                  })
                }
                className="border w-full px-5 py-4 rounded-2xl"
              />

              <input
                type="number"
                placeholder="Price"
                value={form.price}
                onChange={(e) =>
                  setForm({

                    ...form,

                    price:
                      e.target.value,

                  })
                }
                className="border w-full px-5 py-4 rounded-2xl"
              />

            </div>

            <div className="flex justify-end gap-3 mt-8">

              <button
                onClick={() =>
                  setShowModal(false)
                }
                className="bg-slate-300 px-6 py-3 rounded-2xl"
              >

                Cancel

              </button>

              <button
                onClick={createVoucher}
                className="bg-blue-600 text-white px-6 py-3 rounded-2xl"
              >

                Generate

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}