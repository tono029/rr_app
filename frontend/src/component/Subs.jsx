import React from "react";
import axios from "axios"

const client = axios.create({
  // APIのURL
  baseURL: "http://localhost:3001/"
})

export default function Subs() {
  const [subs, setSubs] = React.useState([])

  React.useEffect(() => {
    const subsArray = []

    async function getSubs() {
      const res = await client.get("subs")

      res.data.map(sub => {
        subsArray.push({
          ...sub,
          // 必要なプロパティがあれば追加

        })
      })

      setSubs(subsArray)
    }
    getSubs()
  }, [])

  async function deleteSub(id) {
    await client.delete(`subs/${id}`)
  }

  console.log("subs", subs)
  
  const subsIndex = subs.map(sub => {
    return (
      <div key={sub.id}>
        <p>{sub.sub_name}</p>
        <button onClick={() => deleteSub(sub.id)}>
          delete sub
        </button>
      </div>
      
    )
  })

  return (
    <div>
      {subsIndex}
    </div>
  )
}