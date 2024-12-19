import express from 'express'
import puppies from './routes/puppies.ts'
// Import your router here

const server = express()

// Server configuration
// make sure you have this line to set up the JSON middleware
server.use(express.json())
server.use('/api/v1/puppies', puppies)

// Your routes/router(s) should go here

export default server
