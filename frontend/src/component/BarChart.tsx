import React from "react";
import {Bar} from "react-chartjs-2"
import {MenuItem, Select, InputLabel, FormControl, SelectChangeEvent} from "@mui/material"
import {Chart, registerables} from 'chart.js'

Chart.register(...registerables)

export default function BarChart(props: { subs: SubsType; chartAni: any; setChartAni: (arg0: boolean) => void; }) {
  const [per, setPer] = React.useState(0)
  const [total, setTotal] = React.useState(0)
  const [sort, setSort] = React.useState(0)
  const divisions = ["no division", "hobby", "food", "music", "game", "other"]

  const SubsPerMonth: SubsType = props.subs.map(sub => {
    if (sub.period === 1) {
      return {...sub}
    } else {
      return {
        ...sub,
        fee: Math.ceil(sub.fee / 12)
      }
    }
  })

  const SubsPerYear: SubsType = props.subs.map(sub => {
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
  function sortData(subData: SubsType, sort: number) {
    const labels: string[] = []
    const data: number[] = []
    // eslint-disable-next-line array-callback-return
    subData.sort((sub: SubType, next_sub: SubType) => {
      if (sort === 1) {
        return sub.fee > next_sub.fee ? -1 : 1
      } else {
        return sub.fee < next_sub.fee ? -1 : 1
      }
    })

    subData.forEach((sub: SubType) => {
      labels.push(sub.subName)
      data.push(sub.fee)
    })

    return {
      labels: labels,
      data: data
    }
  }

  const totaledData = divisions.map(div => {
    const list = SubsPerMonth.filter(r => r.division === div)
    return {
      division: div,
      fee: list.reduce((sum, r) => sum + r.fee, 0) 
    }
  })

  const transLabel = (labels: string[]) => {
    const dist = {
      "no division": "未分類", 
      "hobby": "娯楽", 
      "food": "食事", 
      "music": "音楽", 
      "game": "ゲーム", 
      "other": "その他",
    }
    const newLabel: string[] = []
    
    labels.forEach(label => {
      Object.entries(dist).forEach(array => {
        if (label === array[0]) {
          newLabel.push(array[1]) 
        }
      })
    })

    return newLabel
  }

  function selectData(sort: number, per: number, total:number) {
    const labels: string[] = []
    const data: number[] = []
    // 個別
    if (total === 0) {
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
      } else {
        const copiedDataPM = SubsPerMonth.slice()
        const copiedDataPY = SubsPerYear.slice()

        if (per === 0) {
          return sortData(copiedDataPM, sort)
        } else {
          return sortData(copiedDataPY, sort)
        }
      }


      // 分類別の時
    } else {
      if (sort === 0) {
        totaledData.forEach(total => {
          labels.push(total.division)
          data.push(total.fee)
        })
  
        return {
          labels: transLabel(labels),
          data: data
        }
      } else {
        const copiedTotal = totaledData.slice()

        copiedTotal.sort((i, j) => {
          if (sort === 1) {
            return i.fee > j.fee ? -1 : 1
          } else {
            return i.fee < j.fee ? -1 : 1
          }
        })

        copiedTotal.forEach(total => {
          labels.push(total.division)
          data.push(total.fee)
        })

        return {
          labels: transLabel(labels),
          data: data
        }
      }
      
    }
    
  }

  const [BGColor, setBGColor] = React.useState<string[]>(["rgba(0, 128,128, 0.5)"])
  const [borderColor, setBorderColor] = React.useState<string[]>(["#008080"])

  const graphData = {
    labels: selectData(sort, per, total).labels,

    datasets: [
      { 
        label: "料金",
        data: selectData(sort, per, total).data,
        // グラフの色を分類によって変える
        backgroundColor: BGColor,
        borderColor: borderColor,
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

  const handleTotalChange = (e: SelectChangeEvent<number>) => {
    setTotal(Number(e.target.value))

    if (e.target.value === 0) {
      setBGColor(["rgba(0, 128,128, 0.5)"])
      setBorderColor(["#008080"])
    } else {
      setBGColor(["rgba(0, 128,128, .5)", "rgba(255, 152, 0, .5)","rgba(156, 39, 176, .5)","rgba(63, 81, 181, .5)","rgba(139, 195, 74, .5)","rgba(3, 169, 244, .5)",])
      setBorderColor(["#008080", "#ff9800", "#9c27b0", "#3f51b5", "#8bc34a", "#03a9f4"])
    }
  }

  function handleSortChange(e: SelectChangeEvent<number>) {
    setSort(Number(e.target.value))
  }

  function handlePerChange(e: SelectChangeEvent<number>) {
    setPer(Number(e.target.value))
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
                <InputLabel>集計</InputLabel>
                <Select
                  autoWidth
                  value={total}
                  onChange={(e) => handleTotalChange(e)}
                  label="集計"
                > 
                  <MenuItem value={0}>個別</MenuItem>
                  <MenuItem value={1}>分類別</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl
                size="small"
                sx={{ m: 1, minWidth: 80 }}
              >
                <InputLabel id="period-select-label">期間</InputLabel>
                <Select
                  autoWidth
                  disabled={total === 1}
                  labelId="period-select-label"
                  id="period-select"
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
                  disabled={total === 1}
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
