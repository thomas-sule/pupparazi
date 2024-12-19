import express from 'express'
import { deletePuppy, getAllPuppies, getPuppyById, createPuppy } from '../../store'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const json = await getAllPuppies()
    res.json(json)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('not working')
    } else {
      console.log('Not working 2')
    }
    res.sendStatus(500)
  }
})


router.get('/:id', async (req, res) => {
  try {
    const id = +req.params.id
    const data = await getPuppyById(id)
    if (data === undefined) {
      res.sendStatus(404)
      return
    }
    res.json(data)
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error.message)
    } else {
      console.log("puppy didn't work")
    }
    res.sendStatus(500)
  }
})
router.delete('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    if (id === undefined) {
      res.sendStatus(404)
      return
    }
    await deletePuppy(id)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
  }
})
router.post('/', async (req, res) => {
  try {
    // some code that calls addPuppy function. 
    const id = await createPuppy(req.body)
    console.log(req.body)
    // respond with your new puppy id
   res.json({id})
  } catch (error) {
    // If things go wrong in the try block, the catch block should log an error and respond with a server error status code. 
    // For example: 
    console.error(error)
    res.sendStatus(500) 
  } 

})

export default router
