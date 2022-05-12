import client from "./client";
import Cookies from "js-cookie";

export declare type FormDataType = {
  fee?: string
  link: string
  period?: string
  subName?: string
  uid?: string
}

export const getSubs = () => {
  return client.get("/subs", {
    params: {
      currentUid: Cookies.get("_uid")
    }
  })
}

export const updateSub = (data: FormDataType, id: string) => {
  return client.patch(
    `/subs/${id}`,
    data,
    {params: {currentUid: Cookies.get("_uid")}},
  )
}

export const deleteSub = (id: string) => {
  return client.delete(
    `/subs/${id}`
  )
}

export const createSub = (data: FormDataType) => {
  return client.post(
    "subs", 
    data,
    {params: {currentUid: Cookies.get("_uid")}}
  )
}