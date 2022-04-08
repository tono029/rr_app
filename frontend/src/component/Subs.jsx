import React from "react";
import Button from "@mui/material/Button"
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Modal, Box, TextField} from '@mui/material';
import Paper from '@mui/material/Paper';
import AddLinkIcon from '@mui/icons-material/AddLink';
import LinkIcon from '@mui/icons-material/Link';
import IconButton from '@mui/material/IconButton';
import { registeralbes } from "chart.js";

export default function Subs(props) {
  async function deleteSub(id) {
    await props.client.delete(`subs/${id}`)
    props.getSubs()
  }

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'white',
    borderRadius: "10px",
    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
    p: 4,
    padding: "0px 30px 20px 30px",
  }
  
  function openLink(url) {
    window.open(url)
  }

  const [showModal, setShowModal] = React.useState(false)

  const subsIndex = props.subs.map(sub => {
    return (
      <TableRow key={sub.id}>
        {/* クリックで編集できるように */}
        <TableCell>{sub.sub_name}</TableCell>

        <TableCell>{sub.fee.toLocaleString()}<span>円</span></TableCell>

        <TableCell>{sub.period === 1 ? "/月" : "/年"}</TableCell>

        {/* リンクが設定されているかで分岐、なければonClickでmodal表示。 */}
        {
          sub.link === "" && 
          <TableCell>
            <IconButton
              className= "link-btn"
              onClick={() => setShowModal(true)}  
            >
              <AddLinkIcon />
            </IconButton>

            <Modal
              open={showModal}
              onClose={() => setShowModal(false)} 
            >
              <Box sx={modalStyle}>
                <p>リンク先追加</p>
                <div className="modal-form">
                  <TextField 
                    size="small"
                    label="リンク"
                  />
                  <Button
                    variant="contained"
                    size="small"
                  >
                    追加
                  </Button>
                </div>
              </Box>
            </Modal>
          </TableCell>
        }
        
        {/* linkが設定されているとき */}
        {
          sub.link !== "" && 
          <TableCell>
            <IconButton 
              className="link-btn"
              onClick={() => openLink(sub.link)}  
            >
              <LinkIcon />
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