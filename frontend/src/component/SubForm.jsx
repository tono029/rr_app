import React from "react";
import {Grid, TextField, Box, Button, MenuItem, Select,} from '@mui/material';
import {useForm} from "react-hook-form"
import TotalFee from "./TotalFee";

export default function SubForm(props) {
  async function createSub(data) {
    await props.client.post("subs", data)
  }

  // フォーム送信時の処理
  const onSubmit = (data) => {
    console.log(data)

    // rails側に送信
    createSub(data)
    props.getSubs()
    reset()
  }

  const {register, handleSubmit, reset, formState: {errors},} = useForm({
    mode: onSubmit,
    defaultValues: {sub_name: "", fee: "", link: ""},

  })

  return (
    <div className="container">
      <div className="form-body">
        <div className="form-body-left">
          <TotalFee subs={props.subs} />
        </div>

        <div className="form-body-right">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                fullWidth
                label="サービス名"
                variant="outlined" 
                size="small"
                {...register("sub_name", {
                  required: true,
                  message: "必須です。",
                })}
              />

              {errors.sub_name && <span>必須項目です</span>}
            </Grid>
            
            <Grid item xs={9}>
              <TextField
                fullWidth
                label="料金"
                variant="outlined" 
                size="small"
                {...register("fee", {
                  required: true,
                  pattern: {value: "[0-9]*", message: "数値を入力してください"},
                })}
              />

              {errors.fee && errors.fee.type === "required" && <span>必須項目です</span>}
              {errors.fee && errors.fee.type === "pattern" && <span>数値を入力してください</span>}
            </Grid>
      
            <Grid item xs={3} className="period-select">
              <Select
                fullWidth
                label="期間"
                size="small"
                defaultValue="1"
                {...register("period")}
              >
                <MenuItem value={1}>/月</MenuItem>
                <MenuItem value={2}>/年</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={9}>
              <TextField
                fullWidth
                label="リンク先（任意）"
                variant="outlined" 
                size="small"
                {...register("link")}
              />
            </Grid>
      
            <Grid item xs={3}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmit(onSubmit)}  
              >
                登録
              </Button>
            </Grid>
      
          </Grid>
        </div>
      </div>
    </div>
  )
}