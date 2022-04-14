import './App.scss';
import Chart from './component/Chart';
import React from 'react';
import Subs from './component/Subs';
import Header from './component/Header';
import SubForm from './component/SubForm';
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

  async function handleGetCurrentUser() {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data);
        setUser(res.data.data.uid.split("@")[0])
        console.log(res?.data);
      } else {
        console.log("no current user")
      }
    } catch (error) {
      console.log(error)
    }

    setLoading(false)
  }

  // console.log("currentUser", currentUser)
  // console.log("uid", Cookies.get("_uid"))

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);

  const client = axios.create({
    // APIのURL
    baseURL: "http://localhost:3001/"
  })


  async function getSubs() {
    // cookiesのuidを情報として渡す。
    const res = await client.get("subs", {
      params: {
        currentUid: Cookies.get("_uid")
      }
    })
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

  console.log("user", user)

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
            <div className='spacer'></div>
  
            <Switch>
              <Route exact path="/signup">
                <SignUp />
              </Route>
  
              <Route exact path="/signin">
                <SignIn />
              </Route>
  
              <Private>
                <Route exact path="/">
                  <div className='main'>
                    {console.log("subs", subs)}
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
                </Route>
              </Private>
              
            </Switch>
          </SubsControl.Provider>
        </BrowserRouter>
      </AuthContext.Provider>
      
    </ThemeProvider>
  );
}

