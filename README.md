# nodeユーザ画面分割

## 概要

nodeを使って、現在ログインしている(urlに入っている)人の人数をカウントする<br>
1台のpcと最大4台のspを使う。<br>
1台のみ → 繋がってないと表示<br>
2台(sp1-2) → spの接続台数に応じてpcの画面に自動的に分割される

## アプリの実行

### アプリケーション起動

```
$ node server
```
or
```
$ npm start
```

を行ったら別のターミナルを開いて、

```
$ browser-sync start --proxy localhost:4000 --files *
```

を実行
(2つとも実行させる)

※これで動かない場合には、node.jsのインストールなどが必要かも！？

### アプリへのアクセス

`localhost:3000/`にブラウザからアクセスしてください。


## 注意

### 注意1

* pcはブラウザのサイズを768px以上で接続<br>
* spはブラウザのサイズを767px以下で接続<br>
※リサイズはかけていないため、接続する前に上記のブラウザサイズにする

#### 注意2

リロードをしたり、途中で切ったりすると接続人数がおかしくなるため注意！！


## とりあえずできてること

* index.html

pcのstartボタン押すとpc,sp共にページ遷移する

* page2.html

spの1,2,3,4を押すと値がpcに反映される
spのstartボタン押すとpc,sp共にページ遷移する

* server.js

mysqlの接続(49-64行)

* create.html,js/sample.js

値を入力するとconsole.logに値を出力

## まだできてない(あとできっと調べる予定)

* js/sample.js,server.js

mysqlの値を使って、create文の発行など

* ????ページ

複数人での処理(現在は1人用)
※どっちがどっちが今はわからない

* page2.js

ES6に変更

* page2.html,page2.js

formの値を(postで)取得してpage3.htmlに表示

* ????ページ ２つ目

browser-sync startの処理時にページを開いたりすると右上になにかでる
(browser-syncのアプリケーションの使用??)
