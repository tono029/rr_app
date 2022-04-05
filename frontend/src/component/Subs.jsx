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
  const [subs, setSubs] = React.useState([])

  React.useEffect(() => {
    const subsArray = []

    async function getSubs() {
      const res = await props.client.get("subs")

      res.data.map(sub => {
        subsArray.push({
          ...sub,
          // 必要なプロパティがあれば追加

        })
      })

      setSubs(subsArray)
    }
    getSubs()
  }, [])

  async function deleteSub(id) {
    await props.client.delete(`subs/${id}`)
  }

  console.log("subs", subs)
  
  const subsIndex = subs.map(sub => {
    return (
      <TableRow key={sub.id}>
        <TableCell>{sub.sub_name}</TableCell>
        <TableCell>{sub.fee}</TableCell>
        <TableCell>{sub.period === 1 ? "/月" : "/年"}</TableCell>
        <TableCell>
          <Button
            onClick={() => deleteSub(sub.id)}
            variant="contained"
            size="small"
          >
            delete
          </Button>
        </TableCell>
      </TableRow>
    
    )
  })

  return (
    <div className="container">
      <h2>一覧</h2>
      <hr />
      <TableContainer className="subs-table" component={Paper}>
        <Table>
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
    </div>
  )
}