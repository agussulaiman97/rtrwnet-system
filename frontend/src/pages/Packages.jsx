import { useEffect, useState } from 'react'
import api from '../services/api'
import Swal from 'sweetalert2'

import {
  Plus,
  Pencil,
  Trash2,
  X,
  Wifi,
  Wallet,
  Package
} from 'lucide-react'

export default function Packages() {

  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(false)

  const [showModal, setShowModal] = useState(false)

  const [editId, setEditId] = useState(null)

  const [search, setSearch] = useState('')

  const [form, setForm] = useState({
    name: '',
    speed: '',
    price: '',
    description: ''
  })

  const getPackages = async () => {

    try {

      setLoading(true)

      const response =
        await api.get('/packages')

      setPackages(response.data || [])

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {

    getPackages()

  }, [])

  const openCreateModal = () => {

    setEditId(null)

    setForm({
      name: '',
      speed: '',
      price: '',
      description: ''
    })

    setShowModal(true)

  }

  const openEditModal = (item) => {

    setEditId(item.id)

    setForm({
      name: item.name || '',
      speed: item.speed || '',
      price: item.price || '',
      description: item.description || ''
    })

    setShowModal(true)

  }

  const closeModal = () => {

    setShowModal(false)

    setEditId(null)

  }

  const savePackage = async () => {

    try {

      if (
        !form.name ||
        !form.speed ||
        !form.price
      ) {

        Swal.fire(
          'Oops',
          'Lengkapi data paket',
          'warning'
        )

        return

      }

      if (editId) {

        await api.put(
          `/packages/${editId}`,
          form
        )

      } else {

        await api.post(
          '/packages',
          form
        )

      }

      Swal.fire(
        'Berhasil',
        'Paket berhasil disimpan',
        'success'
      )

      closeModal()

      await getPackages()

    } catch (error) {

      console.log(error)

      Swal.fire(
        'Error',
        'Gagal menyimpan paket',
        'error'
      )

    }

  }

  const deletePackage = async (id) => {

    const confirm =
      await Swal.fire({

        title: 'Hapus Paket?',

        text: 'Data tidak dapat dikembalikan',

        icon: 'warning',

        showCancelButton: true,

        confirmButtonText: 'Ya Hapus',

        cancelButtonText: 'Batal'

      })

    if (!confirm.isConfirmed) return

    try {

      await api.delete(`/packages/${id}`)

      Swal.fire(
        'Berhasil',
        'Paket berhasil dihapus',
        'success'
      )

      await getPackages()

    } catch (error) {

      Swal.fire(
        'Error',
        'Gagal menghapus paket',
        'error'
      )

    }

  }

  const filteredPackages =
    (packages || []).filter(item =>
      (item.name || '')
        .toLowerCase()
        .includes(search.toLowerCase())
    )

  const minPrice =
    packages.length > 0
      ? Math.min(...packages.map(x => x.price))
      : 0

  const maxPrice =
    packages.length > 0
      ? Math.max(...packages.map(x => x.price))
      : 0

  return (

    <div className="p-4 md:p-8">

      <div className="mb-10">

        <h1 className="text-3xl md:text-5xl font-bold">

          Package Management

        </h1>

        <p className="text-slate-500 mt-2">

          Kelola Paket Internet RT/RW Net

        </p>

      </div>

      <div className="grid md:grid-cols-3 gap-5 mb-10">

        <div className="bg-white rounded-3xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-slate-500">
                Total Paket
              </p>

              <h2 className="text-4xl font-bold mt-3">
                {packages.length}
              </h2>

            </div>

            <Package
              size={50}
              className="text-blue-500"
            />

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-slate-500">
                Paket Termurah
              </p>

              <h2 className="text-3xl font-bold mt-3 text-green-500">
                Rp {minPrice.toLocaleString()}
              </h2>

            </div>

            <Wifi
              size={50}
              className="text-green-500"
            />

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow p-6">

          <div className="flex justify-between">

            <div>

              <p className="text-slate-500">
                Paket Termahal
              </p>

              <h2 className="text-3xl font-bold mt-3 text-blue-500">
                Rp {maxPrice.toLocaleString()}
              </h2>

            </div>

            <Wallet
              size={50}
              className="text-blue-500"
            />

          </div>

        </div>

      </div>

      <div className="bg-white rounded-3xl shadow p-6">

        <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">

          <input
            type="text"
            placeholder="Cari paket..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="border rounded-2xl px-5 py-4 w-full md:w-[400px]"
          />

          <button
            onClick={openCreateModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl flex items-center gap-2"
          >

            <Plus size={20} />

            Tambah Paket

          </button>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead>

              <tr className="border-b">

                <th className="text-left py-4">
                  Nama
                </th>

                <th className="text-left py-4">
                  Speed
                </th>

                <th className="text-left py-4">
                  Harga
                </th>

                <th className="text-left py-4">
                  Deskripsi
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
                    colSpan="5"
                    className="text-center py-10"
                  >
                    Loading...
                  </td>

                </tr>

              ) : filteredPackages.map(item => (

                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="py-5">
                    {item.name}
                  </td>

                  <td>
                    {item.speed}
                  </td>

                  <td>
                    Rp {Number(item.price).toLocaleString()}
                  </td>

                  <td>
                    {item.description}
                  </td>

                  <td>

                    <div className="flex gap-2">

                      <button
                        onClick={() =>
                          openEditModal(item)
                        }
                        className="bg-amber-500 text-white px-4 py-2 rounded-xl"
                      >

                        <Pencil size={18} />

                      </button>

                      <button
                        onClick={() =>
                          deletePackage(item.id)
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-xl"
                      >

                        <Trash2 size={18} />

                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {showModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">

          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl">

            <div className="flex justify-between items-center mb-8">

              <h2 className="text-3xl font-bold">

                {editId
                  ? 'Edit Paket'
                  : 'Tambah Paket'}

              </h2>

              <button onClick={closeModal}>
                <X size={28} />
              </button>

            </div>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                placeholder="Nama Paket"
                value={form.name}
                onChange={(e)=>
                  setForm({
                    ...form,
                    name:e.target.value
                  })
                }
                className="border rounded-2xl px-5 py-4"
              />

              <input
                placeholder="Speed"
                value={form.speed}
                onChange={(e)=>
                  setForm({
                    ...form,
                    speed:e.target.value
                  })
                }
                className="border rounded-2xl px-5 py-4"
              />

              <input
                placeholder="Harga"
                value={form.price}
                onChange={(e)=>
                  setForm({
                    ...form,
                    price:e.target.value
                  })
                }
                className="border rounded-2xl px-5 py-4"
              />

              <input
                placeholder="Deskripsi"
                value={form.description}
                onChange={(e)=>
                  setForm({
                    ...form,
                    description:e.target.value
                  })
                }
                className="border rounded-2xl px-5 py-4"
              />

            </div>

            <div className="flex justify-end gap-3 mt-8">

              <button
                onClick={closeModal}
                className="bg-slate-300 px-5 py-3 rounded-2xl"
              >
                Cancel
              </button>

              <button
                onClick={savePackage}
                className="bg-blue-600 text-white px-5 py-3 rounded-2xl"
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  )

}