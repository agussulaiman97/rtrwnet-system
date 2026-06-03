import { useEffect, useState } from 'react'
import api from '../services/api'
import Swal from 'sweetalert2'

export default function Packages() {

  const [packages, setPackages] = useState([])

  const [form, setForm] = useState({
    name: '',
    speed: '',
    price: '',
    description: ''
  })

  const [editId, setEditId] = useState(null)

  const getPackages = async () => {

    try {

      const response =
        await api.get('/packages')

      setPackages(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    getPackages()

  }, [])

  const savePackage = async () => {

    try {

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
        'Success',
        'Package saved',
        'success'
      )

      setForm({
        name: '',
        speed: '',
        price: '',
        description: ''
      })

      setEditId(null)

      getPackages()

    } catch (error) {

      Swal.fire(
        'Error',
        'Failed save package',
        'error'
      )

    }

  }

  const editPackage = (item) => {

    setEditId(item.id)

    setForm(item)

  }

  const deletePackage = async (id) => {

    const confirm =
      await Swal.fire({
        title: 'Delete package?',
        icon: 'warning',
        showCancelButton: true
      })

    if (!confirm.isConfirmed) return

    await api.delete(`/packages/${id}`)

    getPackages()

  }

  return (

    <div>

      <h1 className="text-3xl font-bold mb-6">
        Package Management
      </h1>

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <div className="grid md:grid-cols-4 gap-4">

          <input
            className="border p-3 rounded"
            placeholder="Package Name"
            value={form.name}
            onChange={(e)=>
              setForm({
                ...form,
                name:e.target.value
              })
            }
          />

          <input
            className="border p-3 rounded"
            placeholder="Speed"
            value={form.speed}
            onChange={(e)=>
              setForm({
                ...form,
                speed:e.target.value
              })
            }
          />

          <input
            className="border p-3 rounded"
            placeholder="Price"
            value={form.price}
            onChange={(e)=>
              setForm({
                ...form,
                price:e.target.value
              })
            }
          />

          <input
            className="border p-3 rounded"
            placeholder="Description"
            value={form.description}
            onChange={(e)=>
              setForm({
                ...form,
                description:e.target.value
              })
            }
          />

        </div>

        <button
          onClick={savePackage}
          className="mt-4 bg-blue-600 text-white px-5 py-3 rounded"
        >
          {editId
            ? 'Update Package'
            : 'Add Package'}
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="p-3">Name</th>

              <th>Speed</th>

              <th>Price</th>

              <th>Description</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {packages.map(item => (

              <tr
                key={item.id}
                className="border-b"
              >

                <td className="p-3">
                  {item.name}
                </td>

                <td>
                  {item.speed}
                </td>

                <td>
                  Rp {item.price}
                </td>

                <td>
                  {item.description}
                </td>

                <td>

                  <button
                    onClick={() => editPackage(item)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deletePackage(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}