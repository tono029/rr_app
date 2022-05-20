import React, { useContext } from "react";
import {Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableFooter, TableRow, TablePagination, useTheme} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
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

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };


  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
    </Box>
  );
}


export default function Subs() {
  const {subs, setSubs, handleGetSubs, setFlash} = useContext(GeneralControl)
  const [open, setOpen] = React.useState([false, ""])
  const [editOpen, setEditOpen] = React.useState([false, ""])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage] = React.useState(5)


  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

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

  const subsIndex = subs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((sub: SubType) => {
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - subs.length) : 0;

  return (
    <TableContainer className="subs-table table-container" component={Paper}>
      <Table>
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

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
            rowsPerPageOptions={[5]}
              count={subs.length}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage=""
              page={page}
              onPageChange={handleChangePage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
        
      </Table>
    </TableContainer>
  )
}