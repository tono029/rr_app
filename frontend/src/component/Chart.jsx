import React from "react";
import {Bar} from "react-chartjs-2"
import {MenuItem, Select, InputLabel, FormControl} from "@mui/material"
import {Bar as BarJS} from "chart.js/auto"

export default function Chart(props) {
  const [sort, setSort] = React.useState(0)

  function handleSort(event) {
    setSort(event.target.value)
  }

  // sortが破壊的なためsliceでコピー
  const sortedData = props.subs.slice()

  // props.subsをsortに基づいてソートしてやる。
  sortedData.sort((sub, next_sub) => {
    if (sort === 1) {
      return sub.fee > next_sub.fee ? -1 : 1
    } else if (sort === 2) {
      return sub.fee < next_sub.fee ? -1 : 1
    }
  })

  const labels = []
  const data = []
  if (sort === 0) {
    props.subs.forEach(sub => {
      labels.push(sub.sub_name)
      data.push(sub.fee)
    })
  } else {
    sortedData.forEach(sub => {
      labels.push(sub.sub_name)
      data.push(sub.fee)
    })
  }
  
  
 

  const graphData = {
    labels: labels,

    datasets: [
      {
        data: data,
        backgroundColor: "rgba(0, 128, 128, 0.5)",
        borderColor: "#008080",
        borderWidth: 2,
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {display: false},
      // title: {display: true, text: "グラフ"},
      // hover時の吹き出し
      tooltip: {
        displayColors: false,

      },


    }
  }

  return (
    <div className="container">
      <div className="chart-header">
        <div className="chart-header-l"><p>グラフ</p></div>

        <FormControl
          size="small" 
          sx={{ m: 1, minWidth: 80 }}
          className="chart-header-r"
        >
          <InputLabel id="sort-select-label">ソート</InputLabel>
          <Select
            labelId="sort-select-label"
            id="sort-select"
            value={sort}
            onChange={handleSort}
            autoWidth
            label="ソート"
          >
            <MenuItem value={0}>登録順</MenuItem>
            <MenuItem value={1}>降順</MenuItem>
            <MenuItem value={2}>昇順</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Bar
        className="bar-chart"
        data={graphData}
        options={options}
      />
    </div>
  )
}
