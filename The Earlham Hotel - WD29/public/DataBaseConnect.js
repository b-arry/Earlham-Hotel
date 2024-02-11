// JavaScript source code
const { Client } = require("pg")
const dotenv = require("dotenv")
dotenv.config()

const connectDb = async () => {
    try {
        const client = new Client({
            user: 'postgres',
            host: 'localhost',
            database: 'EarlhamHotel',
            password: '1234',
            port: '5432'
        })

        await client.connect()
        const res = await client.query('SELECT * FROM room limit 10')
        console.log(res)
        await client.end()
    } catch (error) {
        console.log(error)
    }
}

connectDb()