import * as fs from 'node:fs/promises'
import { Data, Puppy, PuppyData } from './models/Puppy'

export async function getAllPuppies(): Promise<Data | undefined> {
  try {
    const json = await fs.readFile('./storage/data.json', 'utf8')
    const data = JSON.parse(json)
    return data
  } catch (error: unknown) {
    console.error(error)
  }
}
export async function getPuppyById(id: number) {
  const data = await getAllPuppies()
  if (data === undefined) {
    return 'undefiened pups'
  }
  const pup = data.puppies.find((pups: Puppy) => pups.id === id)
  console.log(pup)
  return pup as Puppy
}

export async function deletePuppy(id: number): Promise<void> {
  const dogs = await getAllPuppies()
  if (dogs === undefined) {
    return
  }
  const delDog = dogs.puppies.filter((pup) => pup.id !== id)
  const newData = { puppies: delDog }

  const jsonString = JSON.stringify(newData, null, 2)
  await fs.writeFile('./storage/data.json', jsonString)
  return
}

export async function createPuppy(data: PuppyData): Promise<number> {
  const dogs = await getAllPuppies()
  if (dogs === undefined) {
    throw new Error('unable to add puppy, no data found')
  }
  let highestId = 0
  for (const puppy of dogs.puppies) {
    if (puppy.id > highestId) {
      highestId = puppy.id
    }
  }
  const newId = highestId + 1
  const newPup: Puppy = {
    ...data,
    id: newId,
  }
  dogs.puppies.push(newPup)
  const jsonString = JSON.stringify(dogs, null, 2)
  await fs.writeFile('./storage/data.json', jsonString)
  return newId
}
