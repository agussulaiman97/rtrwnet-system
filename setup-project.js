const fs = require('fs')
const path = require('path')

const folders = [

  // BACKEND
  'backend/controllers',
  'backend/routes',
  'backend/middleware',
  'backend/services',
  'backend/database',
  'backend/mikrotik',
  'backend/whatsapp',
  'backend/utils',

  // FRONTEND
  'frontend/src/components',
  'frontend/src/layouts',
  'frontend/src/pages',
  'frontend/src/services',
  'frontend/src/router',
  'frontend/src/hooks',
  'frontend/src/utils',
  'frontend/src/assets',

  // DOCS
  'docs',

  // DEPLOY
  'deploy'

]

folders.forEach(folder => {

  fs.mkdirSync(folder, { recursive: true })

  console.log('CREATE FOLDER:', folder)

})

const files = {

  // =========================
  // BACKEND
  // =========================

  'backend/server.js': `

require('dotenv').config()

const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {

  res.json({
    success: true,
    message: 'RTRWNET API RUNNING'
  })

})

app.listen(3000, () => {

  console.log('Server running on port 3000')

})

`,

  'backend/db.js': `

require('dotenv').config()

const { createClient } = require('@libsql/client')

const db = createClient({

  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,

})

module.exports = db

`,

  'backend/.env': `

PORT=3000

TURSO_DATABASE_URL="libsql://rtrwnet-agussulaiman97.aws-ap-northeast-1.turso.io"

TURSO_AUTH_TOKEN="eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Nzk0MzkyNjMsImlkIjoiMDE5ZTRlZDctZDMwMS03YmFlLTkxYmEtYWY0NDVhZjA5YzRiIiwicmlkIjoiOGFhYzdlZDMtYzhiOC00M2MyLTgyOGEtYzI0MzViNWJlMjdiIn0.mHVStq93KSKzwtEvPDvhxOU5LoZESw3ETdWC28SULfX5pKSHvKGuQcMfVIaUv2LlCAACmHgy5NPPNHqMoDziBg"

JWT_SECRET=SUPERSECRET

`,

  // =========================
  // FRONTEND
  // =========================

  'frontend/src/App.jsx': `

import Dashboard from './pages/Dashboard'

export default function App() {

  return <Dashboard />

}

`,

  'frontend/src/main.jsx': `

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <App />
  </React.StrictMode>

)

`,

  'frontend/src/index.css': `

@tailwind base;
@tailwind components;
@tailwind utilities;

body {

  margin: 0;
  padding: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #e5e7eb;

}

`,

  'frontend/src/services/api.js': `

import axios from 'axios'

const api = axios.create({

  baseURL: 'http://localhost:3000'

})

export default api

`,

  'frontend/src/components/Sidebar.jsx': `

import {

  FaHome,
  FaUsers,
  FaMoneyBill,
  FaWifi,
  FaCog,
  FaFileInvoice,
  FaNetworkWired,
  FaChartBar

} from 'react-icons/fa'

export default function Sidebar() {

  return (

    <div className='w-64 h-screen bg-slate-950 text-white fixed left-0 top-0 p-6'>

      <h1 className='text-4xl font-bold mb-12'>

        RT/RW Net

      </h1>

      <ul className='space-y-6'>

        <li className='flex items-center gap-4 text-2xl'>
          <FaHome /> Dashboard
        </li>

        <li className='flex items-center gap-4 text-2xl'>
          <FaUsers /> Customers
        </li>

        <li className='flex items-center gap-4 text-2xl'>
          <FaNetworkWired /> Monitoring
        </li>

        <li className='flex items-center gap-4 text-2xl'>
          <FaWifi /> Router
        </li>

        <li className='flex items-center gap-4 text-2xl'>
          <FaMoneyBill /> Billing
        </li>

        <li className='flex items-center gap-4 text-2xl'>
          <FaFileInvoice /> Voucher
        </li>

        <li className='flex items-center gap-4 text-2xl'>
          <FaChartBar /> Reports
        </li>

        <li className='flex items-center gap-4 text-2xl'>
          <FaCog /> Settings
        </li>

      </ul>

    </div>

  )

}

`,

  'frontend/src/pages/Dashboard.jsx': `

import Sidebar from '../components/Sidebar'

export default function Dashboard() {

  return (

    <div className='flex'>

      <Sidebar />

      <div className='ml-64 p-10 w-full'>

        <h1 className='text-6xl font-bold mb-10'>

          Dashboard RT/RW Net

        </h1>

        <div className='grid grid-cols-2 gap-8 mb-10'>

          <div className='bg-white rounded-3xl p-10 shadow'>

            <h2 className='text-4xl font-bold mb-6'>

              Total Customers

            </h2>

            <p className='text-6xl'>
              0
            </p>

          </div>

          <div className='bg-white rounded-3xl p-10 shadow'>

            <h2 className='text-4xl font-bold mb-6'>

              Total Income

            </h2>

            <p className='text-6xl'>
              Rp 0
            </p>

          </div>

        </div>

      </div>

    </div>

  )

}

`

}

Object.entries(files).forEach(([filePath, content]) => {

  fs.writeFileSync(filePath, content)

  console.log('CREATE FILE:', filePath)

})

console.log('')
console.log('====================================')
console.log('RTRWNET SYSTEM CREATED SUCCESSFULLY')
console.log('====================================')
