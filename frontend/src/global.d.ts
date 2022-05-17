declare type AuthContextType = {
  loading: boolean
  setLoading: SetStateType<boolean>
  isSignedIn: boolean
  setIsSignedIn: SetStateType<boolean>
  currentUser: CurrentUserType | undefined
  setCurrentUser: SetStateType<CurrentUserType | undefined>
}

declare type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>

declare type GeneralControlType = {
  mainSlide: MainSlideType;
  setMainSlide: SetStateType<MainSlideType>;
  flash: string;
  setFlash: SetStateType<string>;
  subs: SubType[];
  setSubs: SetStateType<SubType[]>
  setUser: SetStateType<string>
  handleGetSubs: () => void
}

declare type MainSlideType = {
  dire: "right" | "left" | "down" | "up"
  in: boolean
  appear?: boolean
}

declare type SubType = {
  createdAt?: string
  fee: number
  id: number
  link: string
  period: number
  subName: string
  division: string | null
  uid?: string
  updatedAt?: string
}

declare type SubsType = SubType[]

declare type CurrentUserType = {
  allowPasswordChange: boolean
  createdAt: string
  email: string
  id: number
  image: null
  name: null
  nickname: null
  provider: string
  uid: string
  updatedAt: string
}

declare type FormDataType = {
  fee?: string
  link?: string
  period?: string
  subName?: string
  uid?: string
  division?: string | null
}

declare module "*.png" {
  const value: any;
  export default value;
}