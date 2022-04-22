import './App.scss';
import "./scss/spacer.scss"
import Chart from './component/Chart';
import React from 'react';
import Subs from './component/Subs';
import Header from './component/Header';
import SubForm from './component/SubForm';
import Flash from './component/Flash';
import axios from "axios"
import client from './api/client';
import Cookies from "js-cookie";
import {createTheme, ThemeProvider} from "@mui/material"

import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "./api/auth";

import { SignIn } from './component/SignIn';
import { SignUp } from './component/SignUp';

export const AuthContext = createContext();
export const SubsControl = createContext();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [user, setUser] = React.useState("")
  const [subs, setSubs] = React.useState([])
  const [flash, setFlash] = React.useState("")
  const [chartAni, setChartAni] = React.useState(true)

  async function handleGetCurrentUser() {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data);
        setUser(res.data.data.uid.split("@")[0])
        console.log("currentUserData", res?.data);
      } else {
        console.log("no current user")
      }
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  const client = axios.create({
    // APIのURL
    baseURL: "https://agile-ravine-63015.herokuapp.com/"
  })


  async function getSubs() {
    // cookiesのuidを情報として渡す。
    const res = await client.get("subs", {
      params: {
        currentUid: Cookies.get("_uid")
      }
    })

    setSubs(res.data)
  }

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  useEffect(() => {
    getSubs()
  }, [])

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

  const Private = ({ children }) => {
    if (!loading) {
      if (isSignedIn) {
        return children;
      } else {
        return <Redirect to="signin" />;
      }
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "./spacer.js"

    document.body.appendChild(script)
  }, [])

  return (
    <ThemeProvider theme={theme}>

      <AuthContext.Provider
        value={{
          loading,
          setLoading,
          isSignedIn,
          setIsSignedIn,
          currentUser,
          setCurrentUser,
          flash,
          setFlash,
        }}
      >
        <BrowserRouter>
          <SubsControl.Provider
            value={{
              setSubs,
              setUser,
              getSubs,
            }}
          >
            <Header 
              user={user} 
              currentUser={currentUser}
            />

            <div className='wave'>
              <canvas id="waveCanvas"></canvas>
            </div>

            <Flash 
              flash={flash} 
              setFlash={setFlash}
              chartAni={chartAni}
              setChartAni={setChartAni} 
            />

            <div className='main'>
    
              <Switch>
                <Route exact path="/signup">
                  <SignUp />
                </Route>
    
                <Route exact path="/signin">
                  <SignIn />
                </Route>
    
                <Private>
                  <Route exact path="/">
                    <div className='main-top'>
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
                    </div>
  
                    <Chart 
                      subs={subs}
                      chartAni={chartAni}
                    />
                  </Route>
                </Private>
                
              </Switch>
            </div>
          </SubsControl.Provider>
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

