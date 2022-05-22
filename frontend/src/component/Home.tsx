import sample from "../img/sample.png"

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-text">
        <div className="title-background">
          <h2>
            <span>SubscManagerは利用している</span>
            <br></br>
            サブスクリプションサービス<span>を</span>
            <br></br>
            登録、管理
            <br></br>
            <span>する機能を提供します。</span>
          </h2>
        </div>

        <p>
          利用しているサービスの月々の料金把握やリストによる管理、グラフによる可視化が可能です。
        </p>
      </div>

        <img 
          src={sample} 
          alt="サブスク管理画面"
          className="img-container"
        />
    </div>
  )
}
