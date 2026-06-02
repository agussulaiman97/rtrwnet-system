import { useEffect, useState } from 'react'

import api from '../services/api'

import Swal from 'sweetalert2'

import {
  Plus,
  Pencil,
  Trash2,
  X,
  Users,
  Wifi,
  Ban,
  Wallet,
} from 'lucide-react'

export default function Customers() {

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [customers, setCustomers] = useState([])

  const [loading, setLoading] = useState(false)

  const [search, setSearch] = useState('')

  /*
  |--------------------------------------------------------------------------
  | MODAL
  |--------------------------------------------------------------------------
  */

  const [showModal, setShowModal] = useState(false)

  const [editingId, setEditingId] = useState(null)

  /*
  |--------------------------------------------------------------------------
  | FORM
  |--------------------------------------------------------------------------
  */

  const [form, setForm] = useState({

    name: '',
    phone: '',
    address: '',
    package: '',
    bill: '',

  })

  /*
  |--------------------------------------------------------------------------
  | GET CUSTOMERS
  |--------------------------------------------------------------------------
  */

  const getCustomers = async () => {

    try {

      setLoading(true)

      const response = await api.get('/customers')

      setCustomers(response.data || [])

    } catch (error) {

      console.log(error)

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Gagal mengambil data customer',
      })

    } finally {

      setLoading(false)

    }

  }

  /*
  |--------------------------------------------------------------------------
  | CREATE CUSTOMER
  |--------------------------------------------------------------------------
  */

  const createCustomer = async () => {

    try {

      if (
        !form.name ||
        !form.phone ||
        !form.package ||
        !form.bill
      ) {

        Swal.fire({
          icon: 'warning',
          title: 'Oops',
          text: 'Lengkapi form',
        })

        return

      }

      await api.post('/customers', {

        ...form,

        bill: Number(form.bill),

      })

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Customer berhasil ditambahkan',
      })

      closeModal()

      getCustomers()

    } catch (error) {

      console.log(error)

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Gagal tambah customer',
      })

    }

  }

  /*
  |--------------------------------------------------------------------------
  | UPDATE CUSTOMER
  |--------------------------------------------------------------------------
  */

  const updateCustomer = async () => {

    try {

      await api.put(`/customers/${editingId}`, {

        ...form,

        bill: Number(form.bill),

      })

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Customer berhasil diupdate',
      })

      closeModal()

      getCustomers()

    } catch (error) {

      console.log(error)

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Gagal update customer',
      })

    }

  }

  /*
  |--------------------------------------------------------------------------
  | DELETE CUSTOMER
  |--------------------------------------------------------------------------
  */

  const deleteCustomer = async (id) => {

    const result = await Swal.fire({

      title: 'Hapus customer?',

      text: 'Data tidak bisa dikembalikan',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonColor: '#ef4444',

      confirmButtonText: 'Ya Hapus',

      cancelButtonText: 'Batal',

    })

    if (!result.isConfirmed) return

    try {

      await api.delete(`/customers/${id}`)

      Swal.fire({
        icon: 'success',
        title: 'Berhasil',
        text: 'Customer berhasil dihapus',
      })

      getCustomers()

    } catch (error) {

      console.log(error)

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Gagal hapus customer',
      })

    }

  }

  /*
  |--------------------------------------------------------------------------
  | OPEN CREATE MODAL
  |--------------------------------------------------------------------------
  */

  const openCreateModal = () => {

    setEditingId(null)

    setForm({

      name: '',
      phone: '',
      address: '',
      package: '',
      bill: '',

    })

    setShowModal(true)

  }

  /*
  |--------------------------------------------------------------------------
  | OPEN EDIT MODAL
  |--------------------------------------------------------------------------
  */

  const openEditModal = (customer) => {

    setEditingId(customer.id)

    setForm({

      name: customer.name || '',
      phone: customer.phone || '',
      address: customer.address || '',
      package: customer.package || '',
      bill: customer.bill || '',

    })

    setShowModal(true)

  }

  /*
  |--------------------------------------------------------------------------
  | CLOSE MODAL
  |--------------------------------------------------------------------------
  */

  const closeModal = () => {

    setShowModal(false)

    setEditingId(null)

  }

  /*
  |--------------------------------------------------------------------------
  | FILTER SEARCH
  |--------------------------------------------------------------------------
  */

  const filteredCustomers = (customers || []).filter(
    (item) =>

      item.name
        ?.toLowerCase()
        .includes(search.toLowerCase())

  )

  /*
  |--------------------------------------------------------------------------
  | STATISTICS
  |--------------------------------------------------------------------------
  */

  const totalCustomers = customers.length

  const activeCustomers = customers.filter(
    (item) => item.status === 'ACTIVE'
  ).length

  const suspendCustomers = customers.filter(
    (item) => item.status !== 'ACTIVE'
  ).length

  const totalIncome = customers.reduce(
    (total, item) => total + Number(item.bill || 0),
    0
  )

  /*
  |--------------------------------------------------------------------------
  | FIRST RENDER
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    getCustomers()

  }, [])

  return (

    <div className="p-4 md:p-8">

      {/* HEADER */}

      <div className="mb-10">

        <h1 className="text-3xl md:text-5xl font-bold text-slate-900">

          Customer Management

        </h1>

        <p className="text-slate-500 mt-2">

          Kelola pelanggan RT/RW Net

        </p>

      </div>

      {/* STATISTICS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">

        {/* TOTAL */}

        <div className="bg-white rounded-3xl shadow p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">
                Total Customer
              </p>

              <h2 className="text-3xl md:text-5xl font-bold mt-3">

                {totalCustomers}

              </h2>

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

              <p className="text-slate-500">
                Active
              </p>

              <h2 className="text-3xl md:text-5xl font-bold mt-3 text-green-500">

                {activeCustomers}

              </h2>

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

              <p className="text-slate-500">
                Suspend
              </p>

              <h2 className="text-3xl md:text-5xl font-bold mt-3 text-red-500">

                {suspendCustomers}

              </h2>

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

              <p className="text-slate-500">
                Income
              </p>

              <h2 className="text-3xl font-bold mt-3 text-blue-500">

                Rp {totalIncome.toLocaleString()}

              </h2>

            </div>

            <Wallet
              size={55}
              className="text-blue-500"
            />

          </div>

        </div>

      </div>

      {/* TABLE CARD */}

      <div className="bg-white rounded-3xl shadow p-5 md:p-8">

        {/* TOP */}

        <div className="flex flex-col md:flex-row gap-5 justify-between mb-10">

          <input
            type="text"
            placeholder="Cari pelanggan..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-2xl px-5 py-4 w-full md:w-[400px]"
          />

          <button
            onClick={openCreateModal}
            className="
w-full
md:w-auto
bg-blue-600
hover:bg-blue-700
text-white
rounded-2xl
px-6
py-4
font-semibold
flex
items-center
justify-center
gap-2
transition
"
          >

            <Plus size={20} />

            Tambah Pelanggan

          </button>

        </div>

        {/* TABLE */}

        <div className="overflow-auto">

         <table className="w-full min-w-[700px] md:min-w-[900px]">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">
                  Nama
                </th>

                <th className="text-left py-4">
                  Phone
                </th>

                <th className="text-left py-4">
                  Paket
                </th>

                <th className="text-left py-4">
                  Tagihan
                </th>

                <th className="text-left py-4">
                  Status
                </th>

                <th className="text-left py-4">
                  Aksi
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-10"
                  >

                    Loading...

                  </td>

                </tr>

              ) : filteredCustomers.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="text-center py-10"
                  >

                    Tidak ada customer

                  </td>

                </tr>

              ) : (

                filteredCustomers.map((item) => (

                  <tr
                    key={item.id}
                    className="border-b"
                  >

                    <td className="py-5">
                      {item.name}
                    </td>

                    <td className="py-5">
                      {item.phone}
                    </td>

                    <td className="py-5">
                      {item.package}
                    </td>

                    <td className="py-5">

                      Rp {item.bill?.toLocaleString()}

                    </td>

                    <td className="py-5">

                      <span className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold">

                        {item.status}

                      </span>

                    </td>

                    <td className="py-5">

                      <div className="flex flex-wrap gap-2">

                        <button
                          onClick={() =>
                            openEditModal(item)
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
                        >

                          <Pencil size={18} />

                        </button>

                        <button
                          onClick={() =>
                            deleteCustomer(item.id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                        >

                          <Trash2 size={18} />

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* MODAL */}

      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">

          <div className="bg-white rounded-3xl w-full max-w-2xl p-5 md:p-8">

            {/* HEADER */}

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">

                {editingId
                  ? 'Edit Customer'
                  : 'Tambah Customer'}

              </h2>

              <button
                onClick={closeModal}
              >

                <X size={28} />

              </button>

            </div>

            {/* FORM */}

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                placeholder="Nama"
                value={form.name}
                onChange={(e) =>
                  setForm({
                    ...form,
                    name: e.target.value,
                  })
                }
                className="border rounded-2xl px-5 py-4"
              />

              <input
                type="text"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
                className="border rounded-2xl px-5 py-4"
              />

              <input
                type="text"
                placeholder="Address"
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: e.target.value,
                  })
                }
                className="border rounded-2xl px-5 py-4"
              />

              <input
                type="text"
                placeholder="Package"
                value={form.package}
                onChange={(e) =>
                  setForm({
                    ...form,
                    package: e.target.value,
                  })
                }
                className="border rounded-2xl px-5 py-4"
              />

              <input
                type="number"
                placeholder="Tagihan"
                value={form.bill}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bill: e.target.value,
                  })
                }
                className="border rounded-2xl px-5 py-4 md:col-span-2"
              />

            </div>

            {/* FOOTER */}

            <div className="flex justify-end gap-3 mt-8">

              <button
                onClick={closeModal}
                className="bg-slate-200 hover:bg-slate-300 px-6 py-3 rounded-2xl font-semibold"
              >

                Cancel

              </button>

              <button
                onClick={
                  editingId
                    ? updateCustomer
                    : createCustomer
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-semibold"
              >

                {editingId
                  ? 'Update'
                  : 'Save'}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}
