import { useEffect, useState } from 'react'

import Swal from 'sweetalert2'

import {
  Save,
  Server,
  Globe,
  Mail,
  Shield,
} from 'lucide-react'

import api from '../services/api'

export default function Settings() {

  /*
  |--------------------------------------------------------------------------
  | STATES
  |--------------------------------------------------------------------------
  */

  const [loading, setLoading] =
    useState(true)

  const [settings, setSettings] =
    useState({

      id: null,

      ispName: '',

      mikrotikHost: '',

      mikrotikUser: '',

      mikrotikPass: '',

      whatsappGateway: '',

      smtpHost: '',

      smtpUser: '',

      smtpPass: '',

      logo: '',

    })

  /*
  |--------------------------------------------------------------------------
  | GET SETTINGS
  |--------------------------------------------------------------------------
  */

  const getSettings = async () => {

    try {

      const response =
        await api.get('/settings')

      setSettings(response.data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  useEffect(() => {

    getSettings()

  }, [])

  /*
  |--------------------------------------------------------------------------
  | HANDLE CHANGE
  |--------------------------------------------------------------------------
  */

  const handleChange = (e) => {

    setSettings({

      ...settings,

      [e.target.name]:
        e.target.value,

    })

  }

  /*
  |--------------------------------------------------------------------------
  | SAVE SETTINGS
  |--------------------------------------------------------------------------
  */

  const saveSettings = async () => {

    try {

      await api.put(

        `/settings/${settings.id}`,

        settings

      )

      Swal.fire({

        icon: 'success',

        title: 'Success',

        text: 'Settings updated',

      })

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

          Loading Settings...

        </h1>

      </div>

    )

  }

  return (

    <div className="space-y-8">

      {/* HEADER */}

      <div>

        <h1 className="text-5xl font-bold">

          Settings

        </h1>

        <p className="text-slate-500 mt-2">

          Konfigurasi sistem RT/RW Net

        </p>

      </div>

      {/* ISP */}

      <div className="bg-white rounded-3xl shadow p-8">

        <div className="flex items-center gap-4 mb-8">

          <Globe
            size={40}
            className="text-blue-500"
          />

          <div>

            <h2 className="text-3xl font-bold">

              ISP Configuration

            </h2>

            <p className="text-slate-500">

              Informasi ISP

            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            name="ispName"
            placeholder="ISP Name"
            value={settings.ispName || ''}
            onChange={handleChange}
            className="border px-5 py-4 rounded-2xl"
          />

          <input
            type="text"
            name="logo"
            placeholder="Logo URL"
            value={settings.logo || ''}
            onChange={handleChange}
            className="border px-5 py-4 rounded-2xl"
          />

        </div>

      </div>

      {/* MIKROTIK */}

      <div className="bg-white rounded-3xl shadow p-8">

        <div className="flex items-center gap-4 mb-8">

          <Server
            size={40}
            className="text-green-500"
          />

          <div>

            <h2 className="text-3xl font-bold">

              MikroTik API

            </h2>

            <p className="text-slate-500">

              Router configuration

            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-5">

          <input
            type="text"
            name="mikrotikHost"
            placeholder="Host"
            value={settings.mikrotikHost || ''}
            onChange={handleChange}
            className="border px-5 py-4 rounded-2xl"
          />

          <input
            type="text"
            name="mikrotikUser"
            placeholder="Username"
            value={settings.mikrotikUser || ''}
            onChange={handleChange}
            className="border px-5 py-4 rounded-2xl"
          />

          <input
            type="password"
            name="mikrotikPass"
            placeholder="Password"
            value={settings.mikrotikPass || ''}
            onChange={handleChange}
            className="border px-5 py-4 rounded-2xl"
          />

        </div>

      </div>

      {/* WHATSAPP */}

      <div className="bg-white rounded-3xl shadow p-8">

        <div className="flex items-center gap-4 mb-8">

          <Shield
            size={40}
            className="text-green-500"
          />

          <div>

            <h2 className="text-3xl font-bold">

              WhatsApp Gateway

            </h2>

            <p className="text-slate-500">

              Notification system

            </p>

          </div>

        </div>

        <input
          type="text"
          name="whatsappGateway"
          placeholder="Gateway URL"
          value={settings.whatsappGateway || ''}
          onChange={handleChange}
          className="border px-5 py-4 rounded-2xl w-full"
        />

      </div>

      {/* SMTP */}

      <div className="bg-white rounded-3xl shadow p-8">

        <div className="flex items-center gap-4 mb-8">

          <Mail
            size={40}
            className="text-red-500"
          />

          <div>

            <h2 className="text-3xl font-bold">

              SMTP Email

            </h2>

            <p className="text-slate-500">

              Email configuration

            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-5">

          <input
            type="text"
            name="smtpHost"
            placeholder="SMTP Host"
            value={settings.smtpHost || ''}
            onChange={handleChange}
            className="border px-5 py-4 rounded-2xl"
          />

          <input
            type="text"
            name="smtpUser"
            placeholder="SMTP User"
            value={settings.smtpUser || ''}
            onChange={handleChange}
            className="border px-5 py-4 rounded-2xl"
          />

          <input
            type="password"
            name="smtpPass"
            placeholder="SMTP Password"
            value={settings.smtpPass || ''}
            onChange={handleChange}
            className="border px-5 py-4 rounded-2xl"
          />

        </div>

      </div>

      {/* SAVE */}

      <div className="flex justify-end">

        <button
          onClick={saveSettings}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3"
        >

          <Save size={22} />

          Save Settings

        </button>

      </div>

    </div>

  )

}