import client from "./client";
import Cookies from "js-cookie";

export const getSubs = () => {
  return client.get("/subs", {
    params: {
      currentUid: Cookies.get("_uid")
    }
  })
}

export const updateSub = (data, id) => {
  return client.patch(
    `/subs/${id}`,
    data,
    {params: {currentUid: Cookies.get("_uid")}},
  )
}

export const deleteSub = (id) => {
  return client.delete(
    `/subs/${id}`
  )
}

export const createSub = (data) => {
  return client.post(
    "subs", 
    data,
    {params: {currentUid: Cookies.get("_uid")}}
  )
}