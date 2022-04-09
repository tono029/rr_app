import './App.scss';
import Chart from './component/Chart';
import React from 'react';
import Subs from './component/Subs';
import Header from './component/Header';
import SubForm from './component/SubForm';
import axios from "axios"
import {createTheme, ThemeProvider} from "@mui/material"

export default function App() {
  const client = axios.create({
    // APIのURL
    baseURL: "http://localhost:3001/"
  })

  const [user, setUser] = React.useState("user")

  const [subs, setSubs] = React.useState([])

  async function getSubs() {
    const res = await client.get("subs")
    const subsArray = []

    res.data.forEach(sub => {
      subsArray.push({
        ...sub,
        // 必要なプロパティがあれば追加

      })
    })

    setSubs(subsArray)
  }

  React.useEffect(() => {
    getSubs()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log("subs", subs)

  const theme = createTheme({
    palette: {
      primary: {
        main: "#008080",
      },
    },

    typography: {
      fontFamily: [
        "sans-serif"
      ].join(","),
      fontSize: 12,
    },



  })

  return (
    <ThemeProvider theme={theme}>
      <Header user={user} />
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

        <Chart 
          subs={subs}
        />
      </div>
    </ThemeProvider>
  );
}

