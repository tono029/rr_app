import React, { useContext } from "react";
import Cookies from "js-cookie"
import Button from "@mui/material/Button"
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Box, TextField} from '@mui/material';
import Paper from '@mui/material/Paper';
import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkIcon from '@mui/icons-material/Link';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { useForm } from "react-hook-form";
import EditModal from "./EditModal";
import { GeneralControl } from "../App";

export default function Subs(props) {
  const {setSubs, getSubs, setFlash} = useContext(GeneralControl)
  const [open, setOpen] = React.useState([false, ""])
  const [editOpen, setEditOpen] = React.useState([false, ""])

  async function deleteSub(id) {
    const res = await props.client.delete(`subs/${id}`)
    getSubs()
    setFlash(res.data.flash)
  }

  async function updateSub(data, id) {
    const res =  await props.client.patch(
      `subs/${id}`,
      data,
      {params: {currentUid: Cookies.get("_uid")}},
      {withCredentials: true}
    )

    const sortById = res.data.sort((sub, n_sub) => {
      return sub.id > n_sub.id ? 1: -1
    })

    setSubs(sortById)
    setFlash("変更を適用しました。")
  }

  function handleDelete(id) {
    // 削除確認があってもいいかも

    deleteSub(id)
  }

  // フォーム送信時の処理
  const onSubmit = (data) => {
    console.log("data", data)

    if (data.link === "") {
      setOpen([false, ""])
    } else {
      // rails側に送信
      updateSub(data, open[1])
      reset()
      setOpen([false, ""])
    }
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
    width: 400,
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
        {/* 本番環境ではaxiosの影響でパラメータ名がキャメルケースになる。 */}
        <TableCell colSpan={1}>{sub.subName}</TableCell>

        <TableCell colSpan={1}>{sub.fee.toLocaleString()}<span>円</span></TableCell>

        <TableCell>{sub.period === 1 ? "/月" : "/年"}</TableCell>

        {/* リンク */}
        {
          sub.link !== "" ?
          <TableCell padding="none">
            <IconButton 
              className="link-btn"
              onClick={() => window.open(sub.link)}  
            >
              <LinkIcon />
            </IconButton>
          </TableCell>
        :
          <TableCell padding="none">
            <IconButton 
              className="link-btn"
              onClick={() => setOpen([true, sub.id])}
            >
              <AddLinkIcon />
            </IconButton>
          </TableCell>
        }

        {/* editボタン */}
        <TableCell padding="none">
          <IconButton
            className="edit-btn"
            onClick={() => setEditOpen([true, sub.id])}
          >
            <EditIcon />
          </IconButton>
        </TableCell>

        {/* deleteボタン */}
        {/* hover時にのみ表示 */}
        <TableCell padding="none">
          <IconButton
            className="delete-btn"
            onClick={() => handleDelete(sub.id)}
            size="small"
          >
            <ClearIcon />
          </IconButton>
        </TableCell>
        
        {/* link追加用のModal */}
        <Modal
          // openがtrueかつ、idが一致するモーダルを開く。
          open={open[0] && open[1] === sub.id}
          onClose={() => setOpen([false, ""])}
        >
          <Box className="link-modal" sx={modalStyle}>
            <p>「{sub.subName}」にリンク先を追加</p>
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

        <EditModal 
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          client={props.client}
          sub={sub}
          getSubs={props.getSubs}
          updateSub={updateSub}
        />
      </TableRow>
    )
  })

  return (
    <TableContainer className="subs-table table-container" component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell colSpan={1}>サービス名</TableCell>
            <TableCell colSpan={1}>料金</TableCell>
            <TableCell padding="none">期間</TableCell>
            <TableCell padding="none">リンク</TableCell>
            <TableCell padding="none"></TableCell>
            <TableCell padding="none"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {subsIndex}
        </TableBody>
        
      </Table>
    </TableContainer>
  )
}