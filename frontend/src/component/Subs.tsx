import React, { useContext } from "react";
import {IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkIcon from '@mui/icons-material/Link';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SailingIcon from '@mui/icons-material/Sailing';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { orange, purple, indigo, lightGreen, lightBlue } from "@mui/material/colors";
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

  const division = (div: string | null) => {
    if (div === "no division") {
      return <></>
    } else if (div === "hobby") {
      return <SailingIcon sx={{color: orange[500]}} />
    } else if (div === "food") {
      return <LocalDiningIcon sx={{color: purple[500]}} />
    } else if (div === "music") {
      return <HeadphonesIcon sx={{color: indigo[500]}} />
    } else if (div === "game") {
      return <SportsEsportsIcon sx={{color: lightGreen[500]}} />
    } else {
      return <MoreHorizIcon sx={{color: lightBlue[500]}} />
    }
  }

  const subsIndex = subs.map((sub: SubType) => {
    const period = sub.period === 1 ? "/月" : "/年"

    return (
      <TableRow key={sub.id}>
        <TableCell className="division-icon" colSpan={1}>
          {division(sub.division)}
        </TableCell>

        <TableCell className="name-cell" colSpan={1}>{sub.subName}</TableCell>

        <TableCell className="fee-cell" colSpan={1}>{sub.fee.toLocaleString()}<span>円{period}</span></TableCell>

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
        <TableCell padding="none" align="right">
          <IconButton
            className="delete-btn"
            onClick={() => handleDeleteSub(String(sub.id))}
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
            <TableCell></TableCell>
            <TableCell className="name-cell">サービス名</TableCell>
            <TableCell align="right" className="fee-cell" colSpan={1}>料金</TableCell>
            <TableCell align="right" padding="none">リンク</TableCell>
            <TableCell align="right" padding="none"></TableCell>
            <TableCell align="right" padding="none"></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {subsIndex}
        </TableBody>
        
      </Table>
    </TableContainer>
  )
}