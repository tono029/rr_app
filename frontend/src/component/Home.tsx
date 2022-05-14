import sample from "../sample.png"

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-text">
        <h2>SubscManagerは利用しているサブスクリプションサービスを登録、管理する機能を提供します。</h2>

        <p>
          利用しているサービスの月々の料金把握やリストによる管理、グラフによる可視化が可能です。
        </p>
      </div>

      <div className="img-container">
        <img src={sample} alt="" />
      </div>
    </div>
  )
}
