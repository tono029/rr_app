# subsc-manager
バックエンドにrails API、フロントエンドにReactを用いて作成しました。

利用しているサブスクサービスを登録し、管理することを目的としています。
フォームから登録されたデータをテーブル化し、視覚的に確認できるようチャート化も行っています。

# URL
rails apiを「Heroku」, Reactを「firebase」でデプロイしました。
* [subsc-manager](https://subsc-manager-11559.web.app/)

# 使用技術
* Ruby
* Ruby on Rails
* React
* JavaScript
* material-UI

# 機能
* rails APIからユーザーに紐づいたデータの取得(axios)、テーブル化
* データのチャート化、料金に応じたソート(chart.js)
* tokenを用いたユーザー認証、サインイン、サインアウト、ユーザー削除(devise, devise_token_auth)
* 登録確認メールの送信(gmail)
* ウィンドウサイズに合わせたスタイル変更
* フラッシュメッセージ（snackbar）
