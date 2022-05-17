import {Modal, Box, Button, TextField, Grid, FormControl, InputLabel, Select, MenuItem} from "@mui/material"
import {useForm} from "react-hook-form"

type Props = {
  // eslint-disable-next-line no-empty-pattern
  handleUpdateSub: (data: FormDataType, id: string) => void
  editOpen: (boolean | string)[]
  setEditOpen: SetStateType<(boolean | string)[]>
  sub: SubType
}

export default function EditModal(props: Props) {

  const editModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    border: "none",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
    p: 4,
    padding: "0px 30px 20px 30px",
  }

  const onSubmit = (data: FormDataType) => {
    console.log("data", data)

    // rails側に更新情報を送信
    props.handleUpdateSub(data, String(props.sub.id))
    props.setEditOpen([false, ""])
    reset()
  }

  const {register, handleSubmit, reset, formState: {errors}} = useForm({
    mode: "onSubmit",
  })

  return (
    <Modal
      open={props.editOpen.includes(true) && Number(props.editOpen[1]) === props.sub.id}
      onClose={() => props.setEditOpen([false, ""])}
    >
      <Box className="edit-modal" sx={editModalStyle}>
        <p>登録内容の編集</p>
        <div className="edit-modal-body">

        <Grid container spacing={2}>
            <Grid item xs={6} sm={8}>
              <TextField
                autoComplete="off"
                fullWidth
                required
                label="サービス名"
                size="small"
                defaultValue={props.sub.subName}
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

            <Grid item xs={6} sm={4}>
                <FormControl size="small" fullWidth>
                  <InputLabel>分類</InputLabel>
                  <Select
                    label="分類"
                    defaultValue={props.sub.division}
                    {...register("division")}
                  >
                    <MenuItem value={"no division"}>未分類</MenuItem>
                    <MenuItem value={"hobby"}>娯楽</MenuItem>
                    <MenuItem value={"food"}>食事</MenuItem>
                    <MenuItem value={"music"}>音楽</MenuItem>
                    <MenuItem value={"game"}>ゲーム</MenuItem>
                    <MenuItem value={"other"}>その他</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            
            <Grid item xs={6} sm={8}>
              <TextField
                fullWidth
                autoComplete="off"
                required
                label="料金"
                type="number"
                size="small"
                defaultValue={props.sub.fee}
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
                  defaultValue={props.sub.period}
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
                autoComplete="off"
                label="リンク（任意）"
                type="url" 
                size="small"
                defaultValue={props.sub.link}
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
      </Box>
    </Modal>
  )
}