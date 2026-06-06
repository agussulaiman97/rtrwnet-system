import { useEffect, useState } from 'react'

import {
  Cpu,
  MemoryStick,
  Wifi,
  Activity,
  Download,
  Upload,
  Server,
} from 'lucide-react'

import api from '../services/api'

export default function Monitoring() {

  /*
  |--------------------------------------------------------------------------
  | STATES
  |--------------------------------------------------------------------------
  */

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  /*
  |--------------------------------------------------------------------------
  | GET MONITORING
  |--------------------------------------------------------------------------
  */
const [monitoring, setMonitoring] = useState({
  routerName: '-',
  routerStatus: 'OFFLINE',
  cpuUsage: 0,
  ramUsage: 0,
  onlineUsers: 0,
  offlineUsers: 0,
  downloadTraffic: '0 Mbps',
  uploadTraffic: '0 Mbps',
  uptime: '-',
  lastUpdate: null
})

  const getMonitoring = async () => {

  try {

    const res =
      await api.get('/monitoring')

    setMonitoring(res.data)

    setError('')

  } catch (err) {

    console.log('Monitoring Error:', err)

    setError('Router Offline')

    setMonitoring(prev => ({
      ...prev,
      routerStatus: 'OFFLINE'
    }))

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

    getMonitoring()

    const interval = setInterval(() => {

      getMonitoring()

    }, 5000)

    return () => clearInterval(interval)

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

          Loading Monitoring...

        </h1>

      </div>

    )

  }

  return (

    <div className="space-y-6 md:space-y-8 p-4 md:p-0">

      {/* HEADER */}

      <div>

        <h1 className="text-3xl md:text-5xl font-bold">

          Monitoring Realtime

        </h1>
        {
  error && (

    <div className="mt-3 bg-red-100 text-red-600 px-4 py-2 rounded-lg">

      {error}

    </div>

  )
}
        <p className="text-slate-500 mt-2">

          Monitoring router dan jaringan realtime

        </p>

      </div>

      {/* STATUS */}

      <div className="bg-white rounded-3xl shadow p-8">

        <div className="flex flex-col md:flex-row justify-between gap-5">

          <div>

            <h2 className="text-2xl md:text-3xl font-bold">

              {monitoring.routerName}

            </h2>

            <p className="text-slate-500 mt-2">

              Last update:

              {' '}

              {monitoring.lastUpdate
  ? new Date(
      monitoring.lastUpdate
    ).toLocaleTimeString()
  : '-'
}

            </p>

          </div>

          <div>

            <span
  className={`px-5 py-3 rounded-full text-sm font-bold text-white ${
    monitoring.routerStatus === 'ONLINE'
      ? 'bg-green-500'
      : 'bg-red-500'
  }`}
>
  {monitoring.routerStatus}
</span>

          </div>

        </div>

      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        {/* CPU */}

        <div className="bg-white rounded-3xl shadow p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">
                CPU Usage
              </p>

              <h2 className="text-3xl md:text-5xl font-bold mt-3">

                {monitoring.cpuUsage}%

              </h2>

            </div>

            <Cpu
              size={55}
              className="text-blue-500"
            />

          </div>

        </div>

        {/* RAM */}

        <div className="bg-white rounded-3xl shadow p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">
                RAM Usage
              </p>

              <h2 className="text-3xl md:text-5xl font-bold mt-3">

                {monitoring.ramUsage}%

              </h2>

            </div>

            <MemoryStick
              size={55}
              className="text-green-500"
            />

          </div>

        </div>

        {/* ONLINE */}

        <div className="bg-white rounded-3xl shadow p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">
                Online Users
              </p>

              <h2 className="text-3xl md:text-5xl font-bold mt-3">

                {monitoring.onlineUsers}

              </h2>

            </div>

            <Wifi
              size={55}
              className="text-green-500"
            />

          </div>

        </div>

        {/* OFFLINE */}

        <div className="bg-white rounded-3xl shadow p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">
                Offline Users
              </p>

              <h2 className="text-3xl md:text-5xl font-bold mt-3 text-red-500">

                {monitoring.offlineUsers}

              </h2>

            </div>

            <Activity
              size={55}
              className="text-red-500"
            />

          </div>

        </div>

      </div>

      {/* TRAFFIC */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* DOWNLOAD */}

        <div className="bg-white rounded-3xl shadow p-8">

          <div className="flex items-center gap-4 mb-5">

            <Download
              size={40}
              className="text-blue-500"
            />

            <div>

              <h2 className="text-2xl font-bold">

                Download Traffic

              </h2>

              <p className="text-slate-500">

                Realtime bandwidth

              </p>

            </div>

          </div>

          <h1 className="text-3xl md:text-6xl font-bold text-blue-500">

            {monitoring.downloadTraffic}

          </h1>

        </div>

        {/* UPLOAD */}

        <div className="bg-white rounded-3xl shadow p-8">

          <div className="flex items-center gap-4 mb-5">

            <Upload
              size={40}
              className="text-green-500"
            />

            <div>

              <h2 className="text-2xl font-bold">

                Upload Traffic

              </h2>

              <p className="text-slate-500">

                Realtime bandwidth

              </p>

            </div>

          </div>

          <h1 className="text-3xl md:text-6xl font-bold text-green-500">

            {monitoring.uploadTraffic}

          </h1>

        </div>

      </div>

      {/* ROUTER INFO */}

      <div className="bg-white rounded-3xl shadow p-8">

        <div className="flex items-center gap-4 mb-8">

          <Server
            size={40}
            className="text-blue-500"
          />

          <div>

            <h2 className="text-2xl md:text-3xl font-bold">

              Router Information

            </h2>

            <p className="text-slate-500">

              Status perangkat jaringan

            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <div className="flex justify-between border-b pb-4">

            <span>Router Name</span>

            <span className="font-bold">

              {monitoring.routerName}

            </span>

          </div>

          <div className="flex justify-between border-b pb-4">

            <span>Status</span>

            <span className="text-green-500 font-bold">

              {monitoring.routerStatus}

            </span>

          </div>

          <div className="flex justify-between border-b pb-4">

            <span>Uptime</span>

            <span className="font-bold">

              {monitoring.uptime}

            </span>

          </div>

          <div className="flex justify-between border-b pb-4">

            <span>Online Users</span>

            <span className="font-bold">

              {monitoring.onlineUsers}

            </span>

          </div>

        </div>

      </div>

    </div>

  )

}