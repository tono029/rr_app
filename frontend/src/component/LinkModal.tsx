import { Modal, Box, Button, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

type Props = {
  sub: SubType
  open: (string | boolean)[]
  setOpen: SetStateType<(string | boolean)[]>
  handleUpdateSub: (data: FormDataType, id: string) => void
}

export const LinkModal = (props: Props) => {
  const modalStyle = {
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

  const {register, handleSubmit, reset} = useForm({
    mode: "onSubmit",
    defaultValues: {link: ""},
  })

  const onSubmit = (data: { link: string; }) => {
    console.log("data", data)

    if (data.link === "") {
      props.setOpen([false, ""])
    } else {
      // rails側に送信
      props.handleUpdateSub(data, String(props.sub.id))
      reset()
      props.setOpen([false, ""])
    }
  }

  // link追加用のModal
  return (
    <Modal
      // openがtrueかつ、idが一致するモーダルを開く。
      open={props.open.includes(true) && Number(props.open[1]) === props.sub.id}
      onClose={() => props.setOpen([false, ""])}
    >
      <Box className="link-modal" sx={modalStyle}>
        <p>「{props.sub.subName}」にリンク先を追加</p>

        <form className="modal-form">
          <TextField
            fullWidth
            autoFocus
            label="リンク"
            size="small"
            autoComplete="off"
            {...register("link")}
          />
          
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            type="submit"
          >
            追加
          </Button>
        </form>
      </Box>
    </Modal>
  )
}