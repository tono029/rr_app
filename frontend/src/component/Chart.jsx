import React from "react";
import {Bar} from "react-chartjs-2"
import {Bar as BarJS} from "chart.js/auto"

 

export default function Chart(props) {

  const labels = []
  const data = []
  props.subs.map(sub => {
    labels.push(sub.sub_name)
    data.push(sub.fee)
  })

  const graphData = {
    labels: labels,

    datasets: [
      {
        label: "",
        data: data,
        backgroundColor: "rgba(0, 128, 128, 0.5)",
        borderColor: "#008080",
        borderWidth: 1,
      }
    ]
  }

  const options = {
    responsive: true,
    plugins: {legend: {display: false}},
    scales: {
      
    },

  }

  return (
    <div className="container">
      <Bar
        className="bar-chart"
        data={graphData}
        options={options}
      />
    </div>
  )
}
