import './App.scss';
import BarChart from './component/BarChart';
import React, { createContext, useEffect, useState } from 'react';
import Subs from './component/Subs';
import Header from './component/Header';
import SubForm from './component/SubForm';
import Flash from './component/Flash';
import UserSetting from './component/UserSetting';
import {createTheme, ThemeProvider, Slide, Box} from "@mui/material"

import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "./api/auth";
import {getSubs} from "./api/sub"

import { SignIn } from './component/SignIn';
import { SignUp } from './component/SignUp';

type AuthContextType = {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: any[]
  setCurrentUser: React.Dispatch<React.SetStateAction<[]>>
}

type GeneralControlType = {
  mainSlide: MainSlideType
  setMainSlide: React.Dispatch<React.SetStateAction<MainSlideType>>
  flash: string
  setFlash: React.Dispatch<React.SetStateAction<string>>
  subs: any[]
  setSubs: React.Dispatch<React.SetStateAction<[]>>
  setUser: React.Dispatch<React.SetStateAction<string>>
  handleGetSubs: () => void
}

type MainSlideType = {
  dire: "right" | "left" | "down" | "up"
  in: boolean
  appear?: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const GeneralControl = createContext<GeneralControlType | undefined>(undefined);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [user, setUser] = React.useState("")
  const [subs, setSubs] = React.useState([])
  const [flash, setFlash] = React.useState("")
  const [chartAni, setChartAni] = React.useState(true)
  const [mainSlide, setMainSlide] = React.useState<MainSlideType>({dire: "right", in: true, appear: false})

  async function handleGetCurrentUser() {
    try {
      const res = await getCurrentUser()

      if (res?.data.isLogin === true) {
        setIsSignedIn(true)
        setCurrentUser(res?.data.data);
        setUser(res.data.data.uid.split("@")[0])
        console.log("currentUser", res?.data.data);
      } else {
        console.log("no current user")
      }
    } catch (error) {
      console.log("currentUserError", error)
    }

    setLoading(false)
  }

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
            />

            <div className='wave'>
              <canvas id="waveCanvas"></canvas>
            </div>

            <Flash 
              flash={flash} 
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
                            subs={subs} 
                            setSubs={setSubs} 
                          />
        
                          <Subs 
                            subs={subs} 
                            setSubs={setSubs} 
                          />
                        </div>
      
                        <BarChart 
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

