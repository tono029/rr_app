export default function TotalFee(props: {subs: any[]}) {

  const feeArray: number[] = []
  props.subs.forEach(sub => {
    if (sub.period === 1) {
      feeArray.push(sub.fee)
    } else {
      feeArray.push(Math.ceil(sub.fee / 12))
    }
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