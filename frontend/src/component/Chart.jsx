import React from "react";
import {Bar} from "react-chartjs-2"
import {Bar as BarJS} from "chart.js/auto"

 

export default function Chart(props) {
  const datasets = props.subs.map(sub => {
    const dataArray = []
    dataArray.push({
      label: sub.sub_name,
      data: sub.fee,
      backgroundColor: "#008080",

    })

    return dataArray
  })

  const labels = props.subs.map(sub => {
    const labelArray = []
    labelArray.push(sub.sub_name)

    return labelArray
  })

  const data = {
    labels: labels,
    datasets: datasets
  }

  const options = {
    responsive: true,
    height: "30%"
  }

  return (
    <div className="container">
      <Bar
        className="bar-chart"
        data={data}
        options={options}
      />
    </div>
  )
}