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
    defaultValues: {sub_name: "", fee: ""},

  })

  return (
    <div className="container">
      <div className="form-body">
        <div className="body-left">
          <TotalFee subs={props.subs} />
        </div>

        <div className="body-right">
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
            
            <Grid item xs={8}>
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
      
            <Grid item xs={4} className="period-select">
              <Select
                fullWidth
                size="small"
                defaultValue="1"
                {...register("period")}
  
              >
                <MenuItem value={1}>/月</MenuItem>
                <MenuItem value={2}>/年</MenuItem>
              </Select>
            </Grid>
      
            <Grid item xs={12}>
              <Button 
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