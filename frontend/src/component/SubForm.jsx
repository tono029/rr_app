import React from "react";
import {Grid, TextField, Button, MenuItem, Select, FormControl, InputLabel} from '@mui/material';
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
            <Grid item xs={12} sm={12}>
              <TextField
                autoFocus
                fullWidth
                label="サービス名"
                size="small"
                {...register("sub_name", {
                  required: {value: true, message: "必須項目です"},
                  maxLength: {value: 40, message: "40字以内でお願いします。"},
                })}
              />

              <div className="error-mess">
                {errors.sub_name && errors.sub_name.type === "required" && <span>・{errors.sub_name.message}</span>}
                {errors.sub_name && errors.sub_name.type === "maxLength" && <span>・{errors.sub_name.message}</span>}
              </div>

            </Grid>
            
            <Grid item xs={6} sm={8}>
              <TextField
                fullWidth
                label="料金"
                type="number"
                size="small"
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
                  {...register("period")}
                >
                  <MenuItem value={1}>/月</MenuItem>
                  <MenuItem value={2}>/年</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6} sm={8}>
              <TextField
                fullWidth
                label="リンク（任意）"
                type="url" 
                size="small"
                {...register("link")}
              />
            </Grid>
      
            <Grid item xs={6} sm={4}>
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