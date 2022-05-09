import React from "react";
import {Bar} from "react-chartjs-2"
import {MenuItem, Select, InputLabel, FormControl} from "@mui/material"
import {Chart, registerables} from 'chart.js'

Chart.register(...registerables)

export default function BarChart(props) {
  const [sort, setSort] = React.useState(0)
  const [per, setPer] = React.useState(0)

  const SubsPerMonth = props.subs.map(sub => {
    if (sub.period === 1) {
      return {...sub}
    } else {
      return {
        ...sub,
        fee: Math.ceil(sub.fee / 12)
      }
    }
  })

  const SubsPerYear = props.subs.map(sub => {
    if (sub.period === 2) {
      return {...sub}
    } else {
      return {
        ...sub,
        fee: (sub.fee * 12)
      }
    }
  })


  // コピーしたデータをsortに基づいてソートしてやる。
  function sortData(subData, sort) {
    const labels = []
    const data = []
    // eslint-disable-next-line array-callback-return
    subData.sort((sub, next_sub) => {
      if (sort === 1) {
        return sub.fee > next_sub.fee ? -1 : 1
      } else if (sort === 2) {
        return sub.fee < next_sub.fee ? -1 : 1
      }
    })

    subData.forEach(sub => {
      labels.push(sub.subName)
      data.push(sub.fee)
    })

    return {
      labels: labels,
      data: data
    }
  }

  
  function selectData(sort, per) {
    const labels = []
    const data = []
    // 登録順で表示するとき
    if (sort === 0) {
      if (per === 0) {
        SubsPerMonth.forEach(subPM => {
          labels.push(subPM.subName)
          data.push(subPM.fee)
        })
        return {
          labels: labels,
          data: data
        }
      } else {
          SubsPerYear.forEach(subPY => {
          labels.push(subPY.subName)
          data.push(subPY.fee)
        })
        return {
          labels: labels,
          data: data
        }
      }
      
    // 降順もしくは昇順の時
    } else if (sort === 1 || sort === 2) {
      const copiedDataPM = SubsPerMonth.slice()
      const copiedDataPY = SubsPerYear.slice()

      if (per === 0) {
        return sortData(copiedDataPM, sort)
      } else {
        return sortData(copiedDataPY, sort)
      }
      
    }
  }

  const graphData = {
    labels: selectData(sort, per).labels,

    datasets: [
      { 
        label: "料金",
        data: selectData(sort, per).data,
        backgroundColor: "rgba(0, 128,128, 0.5)",
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
        bodyText: ""
      },
    },

    animation: props.chartAni,
  }

  function handleSortChange(e) {
    props.setChartAni(true)
    setSort(e.target.value)
  }

  function handlePerChange(e) {
    props.setChartAni(true)
    setPer(e.target.value)
  }

  return (
    <div className="container chart">
      

      {
        props.subs.length === 0 ?

        <p className="chart-text">登録されたデータがここにグラフとして表示されます。</p>

        :
        <>
          <div className="chart-header">
  
            <div className="chart-header-r">
              <FormControl
                size="small"
                sx={{ m: 1, minWidth: 80 }}
              >
                <InputLabel id="sort-select-label">期間</InputLabel>
                <Select
                  autoWidth
                  labelId="sort-select-label"
                  id="sort-select"
                  value={per}
                  onChange={(e) => handlePerChange(e)}
                  label="期間"
                > 
                  <MenuItem value={0}>月換算</MenuItem>
                  <MenuItem value={1}>年換算</MenuItem>
  
                </Select>
              </FormControl>
      
              <FormControl
                size="small" 
                sx={{ m: 1, minWidth: 80 }}
              >
                <InputLabel id="sort-select-label">ソート</InputLabel>
                <Select
                  autoWidth
                  labelId="sort-select-label"
                  id="sort-select"
                  value={sort}
                  onChange={(e) => handleSortChange(e)}
                  label="ソート"
                >
                  <MenuItem value={0}>登録順</MenuItem>
                  <MenuItem value={1}>降順</MenuItem>
                  <MenuItem value={2}>昇順</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          
          <Bar
            className="chart-body bar-chart"
            data={graphData}
            options={options}
          />
        </>
      }
      
    </div>
  )
}