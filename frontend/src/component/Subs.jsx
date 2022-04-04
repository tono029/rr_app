import React from "react";
import axios from "axios"
import {nanoid} from "nanoid"

const client = axios.create({
  baseURL: "http://localhost:3001"
})

export default function Subs() {
  const [subs, setSubs] = React.useState([])

  React.useEffect(() => {
    const subsArray = []

    async function getSubs() {
      const res = await client.get("/subs")

      res.data.map(sub => {
        subsArray.push({
          ...sub,
          id: nanoid()
        })
      })

      setSubs(subsArray)
    }
    getSubs()
  }, [])

  console.log("subs", subs)
  
  const subsIndex = subs.map(sub => {
    return (
      <div key={sub.id}>
        <p>{sub.sub_name}</p>

      </div>
      
    )
  })

  return (
    <div>
      {subsIndex}
    </div>
  )
}