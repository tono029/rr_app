import './App.css';
import {Grid} from "@mui/material"
import Chart from './component/Chart';
import React from 'react';
import Subs from './component/Subs';
import Header from './component/Header';
import SubForm from './component/SubForm';
import axios from "axios"
import TotalFee from "./component/TotalFee"

export default function App() {
  const client = axios.create({
    // APIのURL
    baseURL: "http://localhost:3001/"
  })

  const [subs, setSubs] = React.useState([])

  async function getSubs() {
    const res = await client.get("subs")
    const subsArray = []

    res.data.map(sub => {
      subsArray.push({
        ...sub,
        // 必要なプロパティがあれば追加

      })
    })

    setSubs(subsArray)
  }

  React.useEffect(() => {
    getSubs()
  }, [])

  console.log("subs", subs)

  return (
    <>
      <Header />
      <div className='main'>
        <SubForm 
          client={client} 
          subs={subs} 
          setSubs={setSubs} 
          getSubs={getSubs} 
        />

        <Subs 
          client={client} 
          subs={subs} 
          setSubs={setSubs} 
          getSubs={getSubs} 
        />

        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TotalFee subs={subs} />
          </Grid>

          <Grid item xs={10}>
            <Chart 
              subs={subs}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}

