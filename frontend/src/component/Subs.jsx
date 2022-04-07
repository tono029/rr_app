import React from "react";
import Button from "@mui/material/Button"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
        <TableCell>
          <Button
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