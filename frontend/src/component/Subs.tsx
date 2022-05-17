import React, { useContext } from "react";
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { LinkModal } from "./LinkModal";
import EditModal from "./EditModal";
import { GeneralControl } from "../App";
import { updateSub, deleteSub } from "../api/sub";

export default function Subs() {
  const {subs, setSubs, handleGetSubs, setFlash} = useContext(GeneralControl)
  const [open, setOpen] = React.useState([false, ""])
  const [editOpen, setEditOpen] = React.useState([false, ""])

  async function handleDeleteSub(id: string) {
    const res = await deleteSub(id)
    handleGetSubs()
    setFlash(res.data.flash)
  }

  async function handleUpdateSub(data: FormDataType, id: string) {
    const res =  await updateSub(data, id)

    const sortById: [] = res.data.sort((sub: { id: number; }, n_sub: { id: number; }) => {
      return sub.id > n_sub.id ? 1: -1
    })

    setSubs(sortById)
    setFlash("変更を適用しました。")
  }

  console.log(subs)

  const subsIndex = subs.map((sub: SubType) => {
    return (
      <TableRow key={sub.id}>
        {/* axiosの影響でパラメータ名がキャメルケースになる。 */}
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
              onClick={() => setOpen([true, String(sub.id)])}
            >
              <AddLinkIcon />
            </IconButton>
          </TableCell>
        }

        {/* editボタン */}
        <TableCell padding="none">
          <IconButton
            className="edit-btn"
            onClick={() => setEditOpen([true, String(sub.id)])}
          >
            <EditIcon />
          </IconButton>
        </TableCell>

        {/* deleteボタン */}
        {/* hover時にのみ表示 */}
        <TableCell padding="none">
          <IconButton
            className="delete-btn"
            onClick={() => handleDeleteSub(String(sub.id))}
            size="small"
          >
            <ClearIcon />
          </IconButton>
        </TableCell>
        
        <LinkModal 
          open={open}
          setOpen={setOpen}
          sub={sub}
          handleUpdateSub={handleUpdateSub}
        />

        <EditModal 
          editOpen={editOpen}
          setEditOpen={setEditOpen}
          sub={sub}
          handleUpdateSub={handleUpdateSub}
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