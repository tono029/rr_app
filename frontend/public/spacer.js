var unit = 20,
    canvasList, // キャンバスの配列
    info = {}, // 全キャンバス共通の描画情報
    colorList; // 各キャンバスの色情報
    canvas = document.getElementById("waveCanvas")

/**
 * Init function.
 * 
 * Initialize variables and begin the animation.
 */
function init() {
  info.seconds = 0;
  info.t = 0;
  canvasList = [];
  colorList = [];
  // canvasの色指定
  canvasList.push(document.getElementById("waveCanvas"));
  colorList.push(['#58cccb', '#4cb0af', '#008080']);//重ねる波の色設定

  canvas.width = window.innerWidth;
  window.addEventListener("resize", function() {
    canvas.width = window.innerWidth
  })
  
  canvas.height = 30;
  canvas.contextCache = canvas.getContext("2d");
  // 共通の更新処理呼び出し
  update();
}

function update() {
  var canvas = canvasList[0];
  // 各キャンバスの描画
  draw(canvas, colorList[0]);
  
  // 共通の描画情報の更新
  info.seconds = info.seconds + .014;
  info.t = info.seconds*Math.PI;
  // 自身の再起呼び出し
  setTimeout(update, 35);
}

/**
 * Draw animation function.
 * 
 * This function draws one frame of the animation, waits 20ms, and then calls
 * itself again.
 */
function draw(canvas, color) {
  // 対象のcanvasのコンテキストを取得
  var context = canvas.contextCache;
  // キャンバスの描画をクリア
  context.clearRect(0, 0, canvas.width, canvas.height);

  //波の重なりを描画 drawWave(canvas, color[数字（波の数を0から数えて指定）], 透過, 波の幅のzoom,波の開始位置の遅れ )
  drawWave(canvas, color[0], 0.5, 7, 0);
  drawWave(canvas, color[1], 0.8, 3, 200);
  drawWave(canvas, color[2], 0.45, 5, 100);
}

/**
* 波を描画
* drawWave(色, 不透明度, 波の幅のzoom, 波の開始位置の遅れ)
*/
function drawWave(canvas, color, alpha, zoom, delay) {
    var context = canvas.contextCache;
    context.fillStyle = color;//塗りの色
    context.globalAlpha = alpha;
    context.beginPath(); //パスの開始
    drawSine(canvas, info.t / 0.5, zoom, delay);
    context.lineTo(canvas.width, 0); //パスをCanvasの右上へ
    context.lineTo(0, 0); //パスをCanvasの左上へ
    context.closePath() //パスを閉じる
    context.fill(); //塗りつぶす
}

/**
 * Function to draw sine
 * 
 * The sine curve is drawn in 10px segments starting at the origin. 
 * drawSine(時間, 波の幅のzoom, 波の開始位置の遅れ)
 */
function drawSine(canvas, t, zoom, delay) {
    var xAxis = Math.floor(canvas.height/ 2.5);
    var yAxis = 0;
    var context = canvas.contextCache;
    // Set the initial x and y, starting at 0,0 and translating to the origin on
    // the canvas.
    var x = t; //時間を横の位置とする
    var y = Math.sin(x)/zoom;
    context.moveTo(yAxis, unit*y+xAxis); //スタート位置にパスを置く

    // Loop to draw segments (横幅の分、波を描画)
    for (i = yAxis; i <= canvas.width + 10; i += 10) {
        x = t+(-yAxis+i)/unit/zoom;
        y = Math.sin(x - delay)/3;
        context.lineTo(i, unit*y+xAxis);
    }
}

init();