import './App.scss';
import Chart from './component/Chart';
import React from 'react';
import Subs from './component/Subs';
import Header from './component/Header';
import SubForm from './component/SubForm';
import Flash from './component/Flash';
import UserSetting from './component/UserSetting';
import axios from "axios"
import applyCaseMiddleware from 'axios-case-converter'
import {createTheme, ThemeProvider, Slide, Box} from "@mui/material"

import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "./api/auth";
import {getSubs} from "./api/sub"

import { SignIn } from './component/SignIn';
import { SignUp } from './component/SignUp';

export const AuthContext = createContext();
export const GeneralControl = createContext();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [user, setUser] = React.useState("")
  const [subs, setSubs] = React.useState([])
  const [flash, setFlash] = React.useState("")
  const [chartAni, setChartAni] = React.useState(true)
  const [mainSlide, setMainSlide] = React.useState({dire: "right", in: true, appear: false})

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
      console.log("currentUserError", error)
    }

    setLoading(false)
  }

  const options = {
    ignoreHeaders: true,
  } 

  const client = applyCaseMiddleware(
    axios.create({
      baseURL: 'https://subsc-manager-api.herokuapp.com/',
      // withCredentials: true,
    }),
    options
  );


  async function handleGetSubs() {
    const res = await getSubs()

    const sortById = res.data.sort((sub, next_sub) => {
      return sub.id > next_sub.id ? 1 : -1
    })

    setSubs(sortById)
  }

  useEffect(() => {
    handleGetCurrentUser();
  }, [setCurrentUser]);


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
    handleGetSubs()

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
        }}
      >
        <BrowserRouter>
          <GeneralControl.Provider
            value={{
              setSubs,
              setUser,
              subs, 
              handleGetSubs,
              mainSlide,
              setMainSlide,
              flash,
              setFlash,
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
                    <Slide 
                      direction={mainSlide.dire} 
                      in={mainSlide.in}
                      appear={mainSlide.appear}
                      mountOnEnter 
                      unmountOnExit 
                    >
                      <Box>
                        <div className='main-top'>
                          <SubForm 
                            client={client} 
                            subs={subs} 
                            setSubs={setSubs} 
                          />
        
                          <Subs 
                            client={client} 
                            subs={subs} 
                            setSubs={setSubs} 
                          />
                        </div>
      
                        <Chart 
                          subs={subs}
                          chartAni={chartAni}
                          setChartAni={setChartAni}
                        />
                      </Box>
                    </Slide>

                    {/* ユーザー設定用のコンポーネント */}
                    <Slide direction="left" in={!mainSlide.in} mountOnEnter unmountOnExit>
                      <Box>
                        <UserSetting
                          currentUser={currentUser}
                          user={user}
                        />
                      </Box>
                    </Slide>
                  </Route>
                </Private>
                
              </Switch>
            </div>
          </GeneralControl.Provider>
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

