import React from "react";
import Button from "@mui/material/Button"
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material';
import Paper from '@mui/material/Paper';
import AddLinkIcon from '@mui/icons-material/AddLink';
import IconButton from '@mui/material/IconButton';

export default function Subs(props) {
  async function deleteSub(id) {
    await props.client.delete(`subs/${id}`)
    props.getSubs()
  }

  const subsIndex = props.subs.map(sub => {
    return (
      <TableRow key={sub.id}>
        {/* クリックで編集できるように */}
        <TableCell>{sub.sub_name}</TableCell>

        <TableCell>{sub.fee.toLocaleString()}<span>円</span></TableCell>

        <TableCell>{sub.period === 1 ? "/月" : "/年"}</TableCell>

        {/* リンクあるかで分岐、なければmodal表示。 */}
        <TableCell>
          <IconButton className="link-btn">
            <AddLinkIcon />
          </IconButton>
        </TableCell>

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