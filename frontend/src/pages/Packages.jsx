import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Packages() {

  const [packages, setPackages] = useState([])

  const loadPackages = async () => {

    try {

      const res =
        await api.get('/packages')

      setPackages(res.data)

    } catch (error) {

      console.error(error)
    }
  }

  useEffect(() => {

    loadPackages()

  }, [])

  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-3xl md:text-5xl font-bold">

          Packages

        </h1>

        <p className="text-gray-500 mt-2">

          Master Paket Internet

        </p>

      </div>

      <div className="bg-white rounded-3xl shadow p-5 md:p-8">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Paket
                </th>

                <th className="text-left py-3">
                  Speed
                </th>

                <th className="text-left py-3">
                  Harga
                </th>

                <th className="text-left py-3">
                  Description
                </th>

              </tr>

            </thead>

            <tbody>

              {packages.map((item) => (

                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="py-3">
                    {item.name}
                  </td>

                  <td className="py-3">
                    {item.speed}
                  </td>

                  <td className="py-3">

                    Rp
                    {' '}
                    {Number(item.price)
                      .toLocaleString('id-ID')}

                  </td>

                  <td className="py-3">
                    {item.description}
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