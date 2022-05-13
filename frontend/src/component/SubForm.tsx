import React, { useContext, useRef } from "react";
import {Grid, TextField, MenuItem, Select, FormControl, InputLabel} from '@mui/material';
import {LoadingButton} from "@mui/lab"
import {useForm} from "react-hook-form"
import TotalFee from "./TotalFee";
import { GeneralControl } from "../App";
import { createSub } from "../api/sub";
import Cookies from "js-cookie";
import { FormDataType } from "../api/sub";

export default function SubForm(props: { subs: any[]; }) {
  const {subs, setSubs, setFlash} = useContext(GeneralControl)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  async function handleCreateSub(data: FormDataType) {
    setIsSubmitting(true)
    const res = await createSub(data)

    const sortById: [] = res.data.data.sort((sub: { id: number; }, n_sub: { id: number; }) => {
      return sub.id > n_sub.id ? 1 : -1
    })
    
    if (res.status === 200) {
      setSubs(sortById)
      setFlash("登録しました。")
      setIsSubmitting(false)
    } else {
      setIsSubmitting(false)
      setFlash(res.data.message)
    }
  }

  // フォーム送信時の処理
  const onSubmit = (data: any) => {
    console.log("formData", data)

    // rails側に送信
    handleCreateSub(data)
    reset()
  }

  const {register, handleSubmit, reset, formState: {errors},} = useForm({
    mode: "onSubmit",
  })

  const fee = useRef(null)
  const period = useRef(null)
  const link = useRef(null)

  // function handleEnter(value: React.MutableRefObject<null>, e: React.KeyboardEvent<HTMLDivElement>) {
  //   if (e.key === "Enter") {
  //     value.current.focus()
  //   }
  // }

  return (
    <div className="container create-form">
      {subs.length === 0 && 
        <p className="first-text">以下のフォームに利用しているサブスクサービスの情報を入力してください。</p>
      }

      <div className="form-body">
        <div className="form-body-left">
          <TotalFee subs={props.subs} />
        </div>

        <div className="form-body-right">
          <form>
            <Grid container spacing={{md: 2, xs: 1}}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  autoComplete="off"
                  label="サービス名"
                  size="small"
                  {...register("subName", {
                    required: {value: true, message: "必須項目です"},
                    maxLength: {value: 40, message: "40字以内でお願いします。"},
                  })}
                />
  
                <div className="error-mess">
                  {errors.subName && errors.subName.type === "required" && <span>・{errors.subName.message}</span>}
                  {errors.subName && errors.subName.type === "maxLength" && <span>・{errors.subName.message}</span>}
                </div>
  
              </Grid>
              
              <Grid item xs={6} sm={8}>
                <TextField
                  fullWidth
                  required
                  autoComplete="off"
                  label="料金"
                  type="number"
                  size="small"
                  inputRef={fee}
                  {...register("fee", {
                    required: {value: true, message: "必須項目です"},
                  })}
                />
  
                <div className="error-mess">
                  {errors.fee && errors.fee.type === "required" && <span>・{errors.fee.message}</span>}
                </div>
              </Grid>
        
              <Grid item xs={6} sm={4} className="period-select">
                <FormControl size="small" fullWidth>
                  <InputLabel>期間</InputLabel>
                  <Select
                    label="期間"
                    defaultValue={1}
                    inputRef={period}
                    {...register("period")}
                  >
                    <MenuItem value={1}>/月</MenuItem>
                    <MenuItem value={2}>/年</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
  
              <Grid item xs={6} sm={8} md={12}>
                <TextField
                  fullWidth
                  autoComplete="off"
                  label="リンク（任意）"
                  type="url" 
                  size="small"
                  inputRef={link}
                  {...register("link")}
                />
              </Grid>
              
              {/* 新しくサービスを登録する際には
              現在のゆーざーのIDを情報に含める。 */}
              <input 
                type="hidden" 
                value={Cookies.get("_uid")}
                {...register("uid")}
              />
        
              <Grid item xs={6} sm={4} md={12}>
                <LoadingButton
                  fullWidth
                  loading={isSubmitting}
                  type="button"
                  variant="contained"
                  onClick={handleSubmit(onSubmit)}  
                >
                  登録
                </LoadingButton>
              </Grid>
        
            </Grid>
          </form>

          
        </div>
      </div>
    </div>
  )
}