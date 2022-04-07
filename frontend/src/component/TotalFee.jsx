import React from "react";

export default function TotalFee(props) {

  const feeArray = []
  props.subs.forEach(sub => {
    feeArray.push(sub.fee)
  })

  let total = 0
  for (let i = 0; i < feeArray.length; i++) {
    total += feeArray[i]
  }

  return (
    <div className="container">
      <p>月々の料金</p>
      <p>{total.toLocaleString()}<span>円</span></p>
    </div>
  )
}