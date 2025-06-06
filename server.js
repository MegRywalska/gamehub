import express from 'express'
import cors from 'cors'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 3000
const SECRET_KEY = 'secret_key'

const adapter = new JSONFile('db.json')
const db = new Low(adapter, {users: []});

app.use(cors({ origin: "http://localhost:63342" }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

async function initDateBase() {
    await db.read()
    db.data ||= { users: [] }
    await db.write()
}

initDateBase()

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body

    await db.read()
    const usernameExists = db.data.users.find(user => user.username === username)
    const emailExists = db.data.users.find(user => user.email === email)
    if (usernameExists) return res.status(400).json({ message: 'User already exists' })
    if (emailExists) return res.status(400).json({ message: 'Email already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
        id: Date.now(),
        username,
        email,
        password: hashedPassword
    }

    db.data.users.push(newUser)
    await db.write()

    res.status(201).json({ message: 'User registered' })
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body

    await db.read()
    const user = db.data.users.find(user => user.email === email)
    if (!user) return res.status(401).json({ message: 'User does not exist' })

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) return res.status(401).json({ message: 'Bad Password' })

    const token = jwt.sign({ username: user.username, email: user.email }, SECRET_KEY, { expiresIn: '1d' })
    res.json({ message: 'User logged in successfully', token })
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'))
})

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registration.html'))
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
