import mysql from 'mysql2/promise'
import config from '../configs/db.js'

let conn

const connectWithRetry = async (retries = 5, delay = 5000) => {
  let attempts = 0

  while (!conn && attempts < retries) {
    try {
      conn = await mysql.createConnection(config)
      console.log('DB connection established')
    } catch (e) {
      attempts++
      console.error(`Error on DB connection attempt ${attempts}`, e.message)

      if (attempts < retries) {
        console.log(`Retrying in ${delay / 1000} seconds...`)
        await new Promise(resolve => setTimeout(resolve, delay)) // Retraso antes de reintentar
      } else {
        console.error('Max retries reached. Exiting...')
      }
    }
  }

  return conn
}

export default await connectWithRetry()
