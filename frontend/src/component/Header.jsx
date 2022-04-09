import React from "react";

export default function Header(props) {
  function greeting() {
    const now = new Date().getHours()
    if (now >= 6 && now < 12) {
      return "おはようございます"
    } else if (now >= 12 && now < 18) {
      return "こんにちは"
    } else {
      return "こんばんは"
    }
  }

  return (
    <header>
      <div className="header-left">
        <h2>SubscManager</h2>
      </div>

      <div className="header-right">
        <div className="greeting">
          <p>{greeting()}, {props.user}さん</p>
        </div>

        <p>navItems</p>
      </div>
    </header>
  )
}