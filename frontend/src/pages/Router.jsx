import { useEffect, useState } from 'react'

import Swal from 'sweetalert2'

import {
  Server,
  Cpu,
  MemoryStick,
  RotateCcw,
  Wifi,
  WifiOff,
} from 'lucide-react'

import api from '../services/api'

export default function Router() {

  /*
  |--------------------------------------------------------------------------
  | STATES
  |--------------------------------------------------------------------------
  */

  const [routers, setRouters] = useState([])

  const [loading, setLoading] = useState(true)

  /*
  |--------------------------------------------------------------------------
  | GET ROUTERS
  |--------------------------------------------------------------------------
  */

  const getRouters = async () => {

    try {

      const response =
        await api.get('/routers')

      setRouters(response.data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  /*
  |--------------------------------------------------------------------------
  | AUTO REFRESH
  |--------------------------------------------------------------------------
  */

  useEffect(() => {

    getRouters()

    const interval = setInterval(() => {

      getRouters()

    }, 5000)

    return () => clearInterval(interval)

  }, [])

  /*
  |--------------------------------------------------------------------------
  | REBOOT
  |--------------------------------------------------------------------------
  */

  const rebootRouter = async (id) => {

    const result = await Swal.fire({

      title: 'Reboot Router?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Reboot',

    })

    if (!result.isConfirmed) return

    try {

      await api.post(`/routers/reboot/${id}`)

      Swal.fire({

        icon: 'success',

        title: 'Success',

        text: 'Router reboot success',

      })

    } catch (error) {

      console.log(error)

    }

  }

  /*
  |--------------------------------------------------------------------------
  | HOTSPOT
  |--------------------------------------------------------------------------
  */

  const toggleHotspot = async (router) => {

    try {

      if (router.hotspot) {

        await api.post(
          `/routers/hotspot/disable/${router.id}`
        )

        Swal.fire({

          icon: 'success',

          title: 'Hotspot Disabled',

        })

      } else {

        await api.post(
          `/routers/hotspot/enable/${router.id}`
        )

        Swal.fire({

          icon: 'success',

          title: 'Hotspot Enabled',

        })

      }

      getRouters()

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

          Loading Routers...

        </h1>

      </div>

    )

  }

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-5xl font-bold">

          Router Management

        </h1>

        <p className="text-slate-500 mt-2">

          Monitoring dan management router

        </p>

      </div>

      {/* ROUTER LIST */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {routers.map((router) => (

          <div
            key={router.id}
            className="bg-white rounded-3xl shadow p-8"
          >

            {/* TOP */}

            <div className="flex justify-between items-start mb-8">

              <div>

                <h2 className="text-3xl font-bold">

                  {router.name}

                </h2>

                <p className="text-slate-500 mt-2">

                  {router.ip}

                </p>

              </div>

              <span className="bg-green-500 text-white px-5 py-3 rounded-full text-sm font-bold">

                {router.status}

              </span>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-2 gap-5 mb-8">

              {/* CPU */}

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-3">

                  <Cpu
                    size={25}
                    className="text-blue-500"
                  />

                  <span className="font-semibold">

                    CPU

                  </span>

                </div>

                <h2 className="text-4xl font-bold">

                  {router.cpu}%

                </h2>

              </div>

              {/* RAM */}

              <div className="bg-slate-100 rounded-2xl p-5">

                <div className="flex items-center gap-3 mb-3">

                  <MemoryStick
                    size={25}
                    className="text-green-500"
                  />

                  <span className="font-semibold">

                    RAM

                  </span>

                </div>

                <h2 className="text-4xl font-bold">

                  {router.ram}%

                </h2>

              </div>

            </div>

            {/* INFO */}

            <div className="space-y-4 mb-8">

              <div className="flex justify-between border-b pb-3">

                <span>Uptime</span>

                <span className="font-bold">

                  {router.uptime}

                </span>

              </div>

              <div className="flex justify-between border-b pb-3">

                <span>Hotspot</span>

                <span
                  className={`font-bold ${
                    router.hotspot
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}
                >

                  {router.hotspot
                    ? 'ENABLED'
                    : 'DISABLED'}

                </span>

              </div>

            </div>

            {/* ACTION */}

            <div className="flex flex-wrap gap-3">

              {/* REBOOT */}

              <button
                onClick={() =>
                  rebootRouter(router.id)
                }
                className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-2xl flex items-center gap-2"
              >

                <RotateCcw size={20} />

                Reboot

              </button>

              {/* HOTSPOT */}

              <button
                onClick={() =>
                  toggleHotspot(router)
                }
                className={`px-5 py-3 rounded-2xl text-white flex items-center gap-2 ${
                  router.hotspot
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >

                {router.hotspot ? (

                  <>
                    <WifiOff size={20} />
                    Disable Hotspot
                  </>

                ) : (

                  <>
                    <Wifi size={20} />
                    Enable Hotspot
                  </>

                )}

              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  )

}