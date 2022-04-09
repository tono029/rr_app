import React from "react";
import Button from "@mui/material/Button"
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Box, TextField} from '@mui/material';
import Paper from '@mui/material/Paper';
import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkIcon from '@mui/icons-material/Link';
import IconButton from '@mui/material/IconButton';
import { useForm } from "react-hook-form";

export default function Subs(props) {
  const [open, setOpen] = React.useState([false, ""])

  async function deleteSub(id) {
    await props.client.delete(`subs/${id}`)
    props.getSubs()
  }

  async function updateSub(data, id) {
    await props.client.patch(`subs/${id}`, data)
    props.getSubs()
  }

  // フォーム送信時の処理
  const onSubmit = (data) => {
    console.log("data", data)

    // rails側に送信
    updateSub(data, open[1])
    props.getSubs()
    reset()
    setOpen([false, ""])
  }

  const {register, handleSubmit, reset} = useForm({
    mode: onSubmit,
    defaultValues: {link: ""},

  })

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'white',
    border: "none",
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0,0,0,0.3)",
    p: 4,
    padding: "0px 30px 20px 30px",
  }
  

  const subsIndex = props.subs.map(sub => {
    return (
      <TableRow key={sub.id}>
        {/* クリックで編集できるように */}
        <TableCell>{sub.sub_name}</TableCell>

        <TableCell>{sub.fee.toLocaleString()}<span>円</span></TableCell>

        <TableCell>{sub.period === 1 ? "/月" : "/年"}</TableCell>

        {
          sub.link !== "" ?
          <TableCell>
            <IconButton 
              className="link-btn"
              onClick={() => window.open(sub.link)}  
            >
              <LinkIcon />
            </IconButton>
          </TableCell>
        :
          <TableCell>
            <IconButton 
              className="link-btn"
              onClick={() => setOpen([true, sub.id])}
            >
              <AddLinkIcon />
            </IconButton>
          </TableCell>
        }

        <TableCell>
          <Button
            className="delete-btn"
            onClick={() => deleteSub(sub.id)}
            variant="contained"
            size="small"
          >
            ×
          </Button>
        </TableCell>

        <Modal
          // openがtrueかつ、idが一致するモーダルを開く。
          open={open[0] && open[1] === sub.id}
          onClose={() => setOpen([false, ""])}
        >
          <Box sx={modalStyle}>
            <p>リンク先を追加</p>
            <div className="modal-form">
              <TextField
                label="リンク"
                size="small"
                {...register("link")}
              />
              
              <Button
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                追加
              </Button>
            </div>
          </Box>
        </Modal>
      </TableRow>
    )
  })

  return (
    <TableContainer className="subs-table" component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>サービス名</TableCell>
            <TableCell>料金</TableCell>
            <TableCell>期間</TableCell>
            <TableCell>リンク</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {subsIndex}
        </TableBody>
        
      </Table>
    </TableContainer>
  )
}