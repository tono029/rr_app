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
    <>
      <p>月々の料金</p>
      <h1>{total.toLocaleString()}<span>円</span></h1>
    </>
  )
}