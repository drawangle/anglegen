---
title: "正多角形ジェネレーター: 正n角形を表示します"
---

<head>
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="stylesheet" href="./res/alert.css">
<link rel="stylesheet" href="regularPolygon.css">
</head>

<header>

<!-- ツールUI操作エリア（HTML直書き） -->
<style type="text/css">
  body {
    caret-color: transparent;
  }
</style>
<style>
  /* PC用の基本指定 */
  #setDegreeFrame {
    width: 100%;
    height: 320px; 
    border: 0;
  }
  /* スマホ用（画面幅768px以下の場合） */
  @media (max-width: 768px) {
    #setDegreeFrame {
    width: 50%; /* スマホ画面のコンテンツの高さに合わせて調整 */
    height: 260px; 
  }
}

/* デフォルトは透明・クリック不可にしておく */
.container {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease; /* 0.3秒かけて変化 */
}

/* gallery-itemにカーソルが乗ったとき、不透明・クリック可能にする */
.gallery-item:hover .container {
  opacity: 1;
  visibility: visible;
}


/* 左上に配置するリンクのスタイル */
.back-to-top {
  /*position: absolute;*/
  top: 8px;           /* 上からの距離（調整可能） */
  /*bottom: 8px;*/           /* 上からの距離（調整可能） */
  left: 8px;          /* 左からの距離（調整可能） */
  z-index: 10;        /* SVGなどの描画要素より前面に表示させる */
  
  /* 見栄えの調整（お好みに合わせてカスタマイズしてください） */
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
  line-height: 1;
  padding: 4px 8px;
  background-color: rgba(211, 211, 211, 0.79); /* 背景を透けさせて読みやすくする */
  border-radius: 4px;
}

/* 数式全体のフォントをLatin Modern Mathに指定する例 */
math {
  font-family: "Latin Modern Math", math;
}
/*mfrac { font-size: 110%; }*/

/*アンカータグの下線を消す*/
a {
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}



/* --- 共通のテーブル設定 --- */
.responsive-table {
  width: 100%;
  border-collapse: collapse;
}

/* --- PC表示時の幅（デフォルト） --- */
.responsive-table th.col-1 { width: 400px; }
.responsive-table th.col-2 { width: 150px; }
.responsive-table th.col-3 { width: 150px; }
.responsive-table th.col-4 { width: 150px; }

/* --- スマホ表示時の幅（画面幅が 768px 以下の場合に適用） --- */
@media screen and (max-width: 768px) {
  .responsive-table th.col-1 { width: 300px; }
  .responsive-table th.col-2 { width: 50px; }
  .responsive-table th.col-3 { width: 50px; }
  .responsive-table th.col-4 { width: 100px; }
}

.responsive-table td:nth-child(1) {text-align: center;}
.responsive-table td:nth-child(2) {text-align: right;}
.responsive-table td:nth-child(3) {text-align: right;}
.responsive-table td:nth-child(4) {text-align: center;}



</style>

</header>



[ホーム](../index.html) | [概要](../about.html) | [プライバシーポリシー](../privacy.html) | [お問い合わせ](../contact.html)

# 正多角形ジェネレーター: 正n角形を表示します
---
<div id='top'></div>


## 正多角形ジェネレーターの用途

正三角形から正360角形までの正多角形を生成します。
内角、外角・中心角を確認できます。

# Webツール: **正多角形ジェネレーター**
<!--
<div hidden id="____current-angle">0</div>
<div id="current-angle">0</div>
<div id="current-angle-start">0</div>
-->

<div class="app-container" class="no__gallery-item no__fixed-card">

  <!--<div class="svg-wrapper">
  </div>-->
  <div class="control-panel">
    <div class="control-label" id="control-label">入力してEnter</div>
    <div class="input-container">
      <input type="text" inputmode="numeric" id="anydegree" placeholder="135" maxlength="8">
      <button type="button" id="clear-btn">&times;</button>
    </div>
  </div>
</div>


<div id="gallery" class="gallery">




</div>

<script src="drawsvg_main.js"></script>

<script>
  function checkAndFallbackHash() {
    console.log('checkAndFallbackHash',window.location.hash)

    if (window.location.hash) {
      // # を除いたID名を取得
      const targetId = decodeURIComponent(window.location.hash.slice(1));
      const targetElement = document.getElementById(targetId);
      console.log('checkAndFallbackHash_1',targetId)
      console.log('checkAndFallbackHash_1->targetElement',targetElement)

      // 指定されたIDの要素が存在しない場合
      if (!targetElement) {
        const fallbackElement = document.getElementById('gallery');
        if (fallbackElement) {
          // ハッシュを #myfunction に書き換えてフォールバック
          console.log('checkAndFallbackHash_2',targetId)
          //window.location.hash = '#svg-gallary';
          // location.replace を使うことで、#myfunction30 の履歴を #myfunction に上書きす         
          //location.replace('#svg-gallary');
          //fallbackElement.scrollIntoView();

          window.paramDegree = targetId;

          //e.preventDefault(); // 存在しないIDへの遷移（履歴追加）をキャンセル
          // 履歴を追加せずにURLのハッシュだけを変更し、要素へスクロール
          
          //history.replaceState(null, '', 'anglegen_4_jp.md');
          history.replaceState(null, '', '#gallery');
 
          console.log('checkAndFallbackHash_3 paramDegree =',window.paramDegree)
          regNumber = +window.paramDegree;
          updateGallery();
          if (typeof macy == 'undefined') {return}
          // Macyに再計算させる
          // 画像の読み込み完了後に自動で再計算を実行
          macy.runOnImageLoad(function () {
              macy.recalculate();
          }, true); // 第2引数を true にすると、読み込み完了時だけでなく即時実行も試みます
 

          fallbackElement.scrollIntoView();
        }
      }
    }
  }
  // 1. ページ直接アクセス時（読み込み完了時）に実行
  window.addEventListener('DOMContentLoaded', checkAndFallbackHash);
  //document.addEventListener('DOMContentLoaded', checkAndFallbackHash);

  
  // 2. ページ内の <a href="#..."> クリックなどでハッシュが変わった時に実行
  window.addEventListener('hashchange', checkAndFallbackHash);
  
</script>

<!-- export を含むJSファイルを読み込むときは type="module" が必須。読み込みが終わらないと、メインのスクリプトはエラーになる -->
<script type="module">
  import { svg_regular_polygon } from './regularPolygons_InteriorEexteriorAngles.js';
  import { svg_interior_exterior } from './regularPolygons_InteriorEexteriorAngles.js';


  function isValidDegree(value) {
    if (value === '' || value === null) return false;
    const num = Number(value);
    return Number.isInteger(num) && num >= 0 && num <= 360;
  }


    
  // グローバル（window）に登録
  window.updateGallery = updateGallery;

  const gallery = document.getElementById('gallery');
  // 半径
  let r = 200;

  // オフセット角度
  //const Offset = -90
  window.regNumber = 6 //初期値: 六角形
  
  // 初期角度
  const urlParams = new URLSearchParams(window.location.search);

  // タスクリスト
  const taskList = [
    { fn: svg_regular_polygon, args: [regNumber, r] },
    { fn: svg_interior_exterior, args: [regNumber, r] }
  ];

  //
  // ページ初期表示 
  //
  function initPage() {

    console.log('initPage():', regNumber)
    //str -> int()
    regNumber = +urlParams.get('number') || 6; // 指定がない場合は 6 にする.
    if (3 > regNumber || regNumber > 360) {
      regNumber = 6;
    }
    //regNumber = 12;
    //console.log(12);

    // location.hashに数字があったらそれは正多角形の頂点・辺の数とみなす
    // # を除いたhash名を取得
    const hashDegree = window.location.hash.slice(1);
    if (isValidDegree(hashDegree)) {
      regNumber = Number(hashDegree);
      window.location.hash = '';
      history.replaceState(null, '', '#gallery');

    }

    if (window.location.search) {
      //window.location.search = ''; //これはダメ。強制的にリロードされる。無限ループ
      // パス（/mypage.html）と ハッシュ（#myfunction）だけを結合して、クエリ（?〜）を除外したURLを作成
      const cleanUrl = window.location.pathname + window.location.hash;
      // 履歴を増やさずにアドレスバーのURLだけを更新する
      history.replaceState(null, '', cleanUrl);
    }
    console.log('initPage(): 1. regnumber= ', regNumber);
    //const paramDegree = window.location.hash
    //console.log(paramDegree);
    //window.location.hash = "#svg-garally";


    setupGallery();

    console.log('initPage(): 2. regNumber= ', regNumber);

    initGallery();

    console.log('initPage(): 3. regNumber= ', regNumber);
    updateChngeBtn(regNumber)


  }

  function setupGallery() {
    //var finalAngle = Degree;
    //console.log('setupGallery', Degree)
    //document.getElementById('anydegree').value = Degree
    document.getElementById('anydegree').value = regNumber;
    //regNumber = document.getElementById('anydegree').value;


    // forEachで実行と後処理を行う
    taskList.forEach(task => {
      // 1. ラッパー要素の作成
      const wrapper = document.createElement('div');
      wrapper.className = 'gallery-item';
      // 1. style プロパティ経由で背景色を設定する（最も一般的）
      wrapper.style.backgroundColor = '#ECEFF1'; //Blue Grey 50
      // id を付与
      wrapper.id = task.fn.name;
      // 1. 関数を実行して結果を受け取る
      const result = task.fn(...task.args);

      
      const buttons = document.createElement('div');
      buttons.className = 'container'
      buttons.insertAdjacentHTML(
        'beforeend',
        '<button class="copy-svg-btn" data-tooltip="SVGをクリップボードにコピー">To SVG</button>' +
        '<button class="copy-png-btn" data-tooltip="PNGをクリップボードにコピー">To PNG</button>')
      wrapper.appendChild(buttons);
      

      // 2. 受け取った結果を使って後処理を行う
      wrapper.appendChild(result);
      gallery.appendChild(wrapper);
    });

  }
  function updateGallery() {
    console.log('function updateGallery()')
    const oldVal = document.getElementById('anydegree').value;
    document.getElementById('anydegree').value = regNumber;

    // 値のチェッk
    if (regNumber > 360 || regNumber < 0) {
      document.getElementById('anydegree').value = oldVal;
      return;
    }


    //最新の Degree でSVGを再作成する
    taskList.forEach(task => {
      const wrapper = document.getElementById(task.fn.name);
      var oldElement = wrapper.lastChild;
      // パラメータ Degree を更新する
      task.args[0] = regNumber;
      task.args[1] = r;
      if (task.args.length == 3) {
          task.args[2] = +document.getElementById("current-angle-start").textContent;
      }

      // 1. 関数を実行して結果を受け取る
      const result = task.fn(...task.args);
      wrapper.removeChild(oldElement);
      wrapper.appendChild(result);
    });

    // divの表示／非表示の切り替え
    updateChngeBtn(regNumber);

  }

  var mes = {};
  window.mes = mes; // window オブジェクトのプロパティにセット
  mes["tosvg_success"] = "SVGコードがクリップボードにコピーされました。";
  mes["topng_success"] = "画像がクリップボードにコピーされました！他のアプリに貼り付けることができます。";
  mes["copy_error"] = "コピーに失敗しました";
  mes["svg_notfound"] = "SVG要素が見つかりません。";
  mes["png_error"] = "PNGへの変換に失敗しました。";

  /*var mes = {};
    mes["tosvg_success"] = "The SVG code has been copied to the clipboard!";
    mes["topng_success"] = "The image has been copied to the clipboard! You can paste it into other apps.";
    mes["copy_error"] = "Copy failed:";
    mes["svg_notfound"] = "SVG element not found.";
    mes["png_error"] = "Conversion to PNG failed.";
  */
  
  //setupGallery();

  // 2. DOMの構築完了時に実行する
  document.addEventListener('DOMContentLoaded', initPage);



  // Enterキーを検知して描画関数を呼び出す
  var inputEl = document.getElementById('anydegree');
  inputEl.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
          regNumber = +document.getElementById('anydegree').value;
          updateGallery();
          inputEl.blur(); // 入力完了したらスマホのキーボードを閉じる
      }
  });

  /*
  //DIVの出し入れをする。
  document.getElementById('changeBtn').addEventListener('click', () => {
    // 1. すべてのターゲット要素（クラス名 "box"）を取得
    const boxes = document.querySelectorAll('.box');
    
    // 2. ループ処理で、一旦すべての要素を「display: none」にする
    boxes.forEach(box => {
      box.style.display = 'none';
    });
    
    // 3. 0〜23の範囲でランダムな整数（インデックス）を生成
    const randomIndex = Math.floor(Math.random() * boxes.length);
    
    // 4. 選ばれた要素だけを「display: block」にして表示する
    boxes[randomIndex].style.display = 'block';
  });*/

  //DIVの出し入れをする。
  function updateChngeBtn(num) {
    // 1. すべてのターゲット要素（クラス名 "box"）を取得 先頭は三角形の3からスタート
    const boxes = document.querySelectorAll('.box');
    
    // 2. ループ処理で、一旦すべての要素を「display: none」にする
    boxes.forEach(box => {
      box.style.display = 'none';
    });
    
    const newIndex = num - 3;
    console.log('updateChngeBtn(num):', newIndex);

    if (newIndex < boxes.length) {
      // 4. 選ばれた要素だけを「display: block」にして表示する
      boxes[newIndex].style.display = 'block';
    }
    /*
    else {
      var otherNumEl = document.getElementById('otherNum');
      otherNumEl.textContent = `360/n = ${360/num}`
    }*/
  }




</script>

<!--「横から順に並べたい」「隙間なく完璧に敷き詰めたい」場合は、Macy.js などの軽量ライブラリが最適です。-->
<script src="https://cdn.jsdelivr.net/npm/macy@2"></script>

<script>
  // グローバル変数として保持（後から再描画で呼び出せるようにする）
  let macy;

  // 1. 初期化処理を関数にまとめる
  function initGallery() {
    macy = Macy({
      container: '#gallery',
      trueOrder: true,
      margin: 8,
      columns: 2,
      breakAt: {
        940: 2,
        520: 1,
        400: 1
      }
    });
  }

  // 2. DOMの構築完了時に実行する
  //document.addEventListener('DOMContentLoaded', initPage);
</script>

<!--
<math display="block" mathsize="1.2em">
  <mfrac>
    <mrow>
      <mi>a</mi>
      <mo>+</mo>
      <mn>2</mn>
    </mrow>
    <mrow>
      <mn>3</mn>
      <mo>−</mo>
      <mi>b</mi>
    </mrow>
  </mfrac>
</math>
<p></p>

<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow>
      <mn>360</mn>
    </mrow>
    <mrow>
      <mn><b>6</b></mn>
    </mrow>
  </mfrac>
  <mo>＝</mo><mn>60</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow>
      <mn>360</mn>
    </mrow>
    <mrow>
      <mn><b>6</b></mn>
    </mrow>
  </mfrac>
  <mo>＝</mo><mn>120</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>=</mo><mn>180</mn><mo>-</mo><mi>外角</mi> <mo>=</mo><mn>180</mn><mo>-</mo> 
  <mfrac>
    <mrow>
      <mn>360</mn>
    </mrow>
    <mrow>
      <mn><b>6</b></mn>
    </mrow>
  </mfrac>
  <mo>=</mo><mn>120</mn><mi>°</mi>
</math>
-->

<!-- クリップボードにイメージをコピーするツール -->
<script src="clip_tools.js"></script> 

<script>
</script>

<!--
### 正多角形 の 内角、外角・中心角の計算式
-->
<div id="otherNum"></div>
<!-- 24個の要素（クラス名 "box" を統一してつけておきます） -->
<div class="box" style="display: none;">
<h3> 正3角形 の 内角、外角・中心角</h3>
<b>正 3 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>3</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>120</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>3</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>60</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正4角形 の 内角、外角・中心角</h3>
<b>正 4 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>4</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>90</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>4</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>90</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正5角形 の 内角、外角・中心角</h3>
<b>正 5 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>5</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>72</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>5</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>108</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正6角形 の 内角、外角・中心角</h3>
<b>正 6 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>6</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>60</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>6</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>120</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正7角形 の 内角、外角・中心角</h3>
<b>正 7 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>7</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>51.42857142857143</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>7</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>128.57142857142856</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正8角形 の 内角、外角・中心角</h3>
<b>正 8 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>8</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>45</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>8</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>135</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正9角形 の 内角、外角・中心角</h3>
<b>正 9 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>9</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>40</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>9</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>140</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正10角形 の 内角、外角・中心角</h3>
<b>正 10 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>10</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>36</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>10</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>144</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正11角形 の 内角、外角・中心角</h3>
<b>正 11 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>11</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>32.72727272727273</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>11</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>147.27272727272728</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正12角形 の 内角、外角・中心角</h3>
<b>正 12 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>12</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>30</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>12</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>150</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正13角形 の 内角、外角・中心角</h3>
<b>正 13 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>13</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>27.692307692307693</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>13</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>152.30769230769232</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正14角形 の 内角、外角・中心角</h3>
<b>正 14 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>14</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>25.714285714285715</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>14</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>154.28571428571428</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正15角形 の 内角、外角・中心角</h3>
<b>正 15 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>15</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>24</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>15</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>156</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正16角形 の 内角、外角・中心角</h3>
<b>正 16 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>16</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>22.5</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>16</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>157.5</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正17角形 の 内角、外角・中心角</h3>
<b>正 17 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>17</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>21.176470588235293</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>17</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>158.8235294117647</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正18角形 の 内角、外角・中心角</h3>
<b>正 18 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>18</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>20</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>18</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>160</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正19角形 の 内角、外角・中心角</h3>
<b>正 19 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>19</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>18.94736842105263</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>19</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>161.05263157894737</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正20角形 の 内角、外角・中心角</h3>
<b>正 20 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>20</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>18</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>20</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>162</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正21角形 の 内角、外角・中心角</h3>
<b>正 21 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>21</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>17.142857142857142</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>21</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>162.85714285714286</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正22角形 の 内角、外角・中心角</h3>
<b>正 22 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>22</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>16.363636363636363</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>22</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>163.63636363636363</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正23角形 の 内角、外角・中心角</h3>
<b>正 23 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>23</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>15.652173913043478</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>23</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>164.34782608695653</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正24角形 の 内角、外角・中心角</h3>
<b>正 24 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>24</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>15</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>24</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>165</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正25角形 の 内角、外角・中心角</h3>
<b>正 25 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>25</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>14.4</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>25</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>165.6</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正26角形 の 内角、外角・中心角</h3>
<b>正 26 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>26</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>13.846153846153847</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>26</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>166.15384615384616</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正27角形 の 内角、外角・中心角</h3>
<b>正 27 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>27</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>13.333333333333334</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>27</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>166.66666666666666</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正28角形 の 内角、外角・中心角</h3>
<b>正 28 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>28</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>12.857142857142858</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>28</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>167.14285714285714</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正29角形 の 内角、外角・中心角</h3>
<b>正 29 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>29</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>12.413793103448276</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>29</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>167.58620689655172</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正30角形 の 内角、外角・中心角</h3>
<b>正 30 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>30</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>12</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>30</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>168</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正31角形 の 内角、外角・中心角</h3>
<b>正 31 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>31</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>11.612903225806452</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>31</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>168.38709677419354</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正32角形 の 内角、外角・中心角</h3>
<b>正 32 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>32</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>11.25</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>32</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>168.75</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正33角形 の 内角、外角・中心角</h3>
<b>正 33 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>33</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>10.909090909090908</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>33</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>169.0909090909091</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正34角形 の 内角、外角・中心角</h3>
<b>正 34 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>34</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>10.588235294117647</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>34</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>169.41176470588235</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正35角形 の 内角、外角・中心角</h3>
<b>正 35 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>35</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>10.285714285714286</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>35</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>169.71428571428572</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正36角形 の 内角、外角・中心角</h3>
<b>正 36 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>36</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>10</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>36</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>170</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正37角形 の 内角、外角・中心角</h3>
<b>正 37 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>37</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>9.72972972972973</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>37</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>170.27027027027026</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正38角形 の 内角、外角・中心角</h3>
<b>正 38 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>38</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>9.473684210526315</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>38</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>170.5263157894737</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正39角形 の 内角、外角・中心角</h3>
<b>正 39 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>39</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>9.23076923076923</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>39</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>170.76923076923077</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正40角形 の 内角、外角・中心角</h3>
<b>正 40 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>40</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>9</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>40</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>171</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正41角形 の 内角、外角・中心角</h3>
<b>正 41 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>41</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>8.78048780487805</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>41</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>171.21951219512195</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正42角形 の 内角、外角・中心角</h3>
<b>正 42 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>42</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>8.571428571428571</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>42</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>171.42857142857142</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正43角形 の 内角、外角・中心角</h3>
<b>正 43 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>43</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>8.372093023255815</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>43</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>171.62790697674419</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正44角形 の 内角、外角・中心角</h3>
<b>正 44 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>44</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>8.181818181818182</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>44</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>171.8181818181818</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正45角形 の 内角、外角・中心角</h3>
<b>正 45 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>45</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>8</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>45</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>172</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正46角形 の 内角、外角・中心角</h3>
<b>正 46 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>46</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>7.826086956521739</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>46</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>172.17391304347825</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正47角形 の 内角、外角・中心角</h3>
<b>正 47 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>47</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>7.659574468085107</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>47</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>172.3404255319149</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正48角形 の 内角、外角・中心角</h3>
<b>正 48 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>48</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>7.5</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>48</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>172.5</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正49角形 の 内角、外角・中心角</h3>
<b>正 49 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>49</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>7.346938775510204</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>49</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>172.6530612244898</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正50角形 の 内角、外角・中心角</h3>
<b>正 50 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>50</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>7.2</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>50</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>172.8</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正51角形 の 内角、外角・中心角</h3>
<b>正 51 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>51</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>7.0588235294117645</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>51</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>172.94117647058823</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正52角形 の 内角、外角・中心角</h3>
<b>正 52 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>52</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>6.923076923076923</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>52</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>173.07692307692307</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正53角形 の 内角、外角・中心角</h3>
<b>正 53 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>53</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>6.7924528301886795</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>53</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>173.20754716981133</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正54角形 の 内角、外角・中心角</h3>
<b>正 54 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>54</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>6.666666666666667</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>54</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>173.33333333333334</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正55角形 の 内角、外角・中心角</h3>
<b>正 55 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>55</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>6.545454545454546</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>55</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>173.45454545454547</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正56角形 の 内角、外角・中心角</h3>
<b>正 56 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>56</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>6.428571428571429</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>56</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>173.57142857142858</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正57角形 の 内角、外角・中心角</h3>
<b>正 57 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>57</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>6.315789473684211</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>57</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>173.68421052631578</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正58角形 の 内角、外角・中心角</h3>
<b>正 58 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>58</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>6.206896551724138</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>58</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>173.79310344827587</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正59角形 の 内角、外角・中心角</h3>
<b>正 59 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>59</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>6.101694915254237</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>59</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>173.89830508474577</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正60角形 の 内角、外角・中心角</h3>
<b>正 60 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>60</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>6</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>60</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>174</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正61角形 の 内角、外角・中心角</h3>
<b>正 61 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>61</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>5.901639344262295</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>61</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>174.0983606557377</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正62角形 の 内角、外角・中心角</h3>
<b>正 62 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>62</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>5.806451612903226</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>62</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>174.19354838709677</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正63角形 の 内角、外角・中心角</h3>
<b>正 63 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>63</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>5.714285714285714</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>63</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>174.28571428571428</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正64角形 の 内角、外角・中心角</h3>
<b>正 64 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>64</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>5.625</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>64</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>174.375</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正65角形 の 内角、外角・中心角</h3>
<b>正 65 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>65</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>5.538461538461538</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>65</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>174.46153846153845</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正66角形 の 内角、外角・中心角</h3>
<b>正 66 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>66</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>5.454545454545454</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>66</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>174.54545454545453</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正67角形 の 内角、外角・中心角</h3>
<b>正 67 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>67</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>5.373134328358209</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>67</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>174.62686567164178</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正68角形 の 内角、外角・中心角</h3>
<b>正 68 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>68</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>5.294117647058823</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>68</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>174.7058823529412</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正69角形 の 内角、外角・中心角</h3>
<b>正 69 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>69</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>5.217391304347826</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>69</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>174.7826086956522</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正70角形 の 内角、外角・中心角</h3>
<b>正 70 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>70</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>5.142857142857143</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>70</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>174.85714285714286</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正71角形 の 内角、外角・中心角</h3>
<b>正 71 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>71</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>5.070422535211268</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>71</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>174.92957746478874</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正72角形 の 内角、外角・中心角</h3>
<b>正 72 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>72</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>5</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>72</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正73角形 の 内角、外角・中心角</h3>
<b>正 73 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>73</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4.931506849315069</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>73</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175.06849315068493</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正74角形 の 内角、外角・中心角</h3>
<b>正 74 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>74</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4.864864864864865</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>74</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175.13513513513513</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正75角形 の 内角、外角・中心角</h3>
<b>正 75 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>75</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4.8</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>75</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175.2</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正76角形 の 内角、外角・中心角</h3>
<b>正 76 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>76</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4.7368421052631575</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>76</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175.26315789473685</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正77角形 の 内角、外角・中心角</h3>
<b>正 77 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>77</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4.675324675324675</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>77</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175.32467532467533</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正78角形 の 内角、外角・中心角</h3>
<b>正 78 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>78</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4.615384615384615</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>78</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175.3846153846154</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正79角形 の 内角、外角・中心角</h3>
<b>正 79 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>79</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4.556962025316456</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>79</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175.44303797468353</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正80角形 の 内角、外角・中心角</h3>
<b>正 80 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>80</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4.5</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>80</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175.5</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正81角形 の 内角、外角・中心角</h3>
<b>正 81 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>81</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4.444444444444445</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>81</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175.55555555555554</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正82角形 の 内角、外角・中心角</h3>
<b>正 82 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>82</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4.390243902439025</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>82</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175.609756097561</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正83角形 の 内角、外角・中心角</h3>
<b>正 83 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>83</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4.337349397590361</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>83</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175.66265060240963</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正84角形 の 内角、外角・中心角</h3>
<b>正 84 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>84</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4.285714285714286</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>84</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175.71428571428572</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正85角形 の 内角、外角・中心角</h3>
<b>正 85 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>85</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4.235294117647059</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>85</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175.76470588235293</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正86角形 の 内角、外角・中心角</h3>
<b>正 86 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>86</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4.186046511627907</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>86</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175.81395348837208</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正87角形 の 内角、外角・中心角</h3>
<b>正 87 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>87</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4.137931034482759</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>87</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175.86206896551724</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正88角形 の 内角、外角・中心角</h3>
<b>正 88 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>88</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4.090909090909091</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>88</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175.9090909090909</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正89角形 の 内角、外角・中心角</h3>
<b>正 89 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>89</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4.044943820224719</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>89</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>175.95505617977528</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正90角形 の 内角、外角・中心角</h3>
<b>正 90 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>90</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>4</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>90</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正91角形 の 内角、外角・中心角</h3>
<b>正 91 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>91</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.956043956043956</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>91</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.04395604395603</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正92角形 の 内角、外角・中心角</h3>
<b>正 92 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>92</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.9130434782608696</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>92</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.08695652173913</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正93角形 の 内角、外角・中心角</h3>
<b>正 93 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>93</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.870967741935484</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>93</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.1290322580645</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正94角形 の 内角、外角・中心角</h3>
<b>正 94 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>94</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.8297872340425534</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>94</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.17021276595744</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正95角形 の 内角、外角・中心角</h3>
<b>正 95 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>95</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.789473684210526</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>95</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.21052631578948</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正96角形 の 内角、外角・中心角</h3>
<b>正 96 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>96</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.75</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>96</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.25</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正97角形 の 内角、外角・中心角</h3>
<b>正 97 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>97</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.711340206185567</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>97</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.28865979381445</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正98角形 の 内角、外角・中心角</h3>
<b>正 98 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>98</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.673469387755102</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>98</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.3265306122449</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正99角形 の 内角、外角・中心角</h3>
<b>正 99 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>99</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.6363636363636362</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>99</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.36363636363637</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正100角形 の 内角、外角・中心角</h3>
<b>正 100 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>100</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.6</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>100</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.4</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正101角形 の 内角、外角・中心角</h3>
<b>正 101 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>101</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.5643564356435644</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>101</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.43564356435644</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正102角形 の 内角、外角・中心角</h3>
<b>正 102 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>102</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.5294117647058822</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>102</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.47058823529412</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正103角形 の 内角、外角・中心角</h3>
<b>正 103 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>103</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.495145631067961</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>103</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.50485436893203</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正104角形 の 内角、外角・中心角</h3>
<b>正 104 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>104</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.4615384615384617</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>104</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.53846153846155</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正105角形 の 内角、外角・中心角</h3>
<b>正 105 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>105</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.4285714285714284</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>105</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.57142857142858</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正106角形 の 内角、外角・中心角</h3>
<b>正 106 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>106</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.3962264150943398</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>106</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.60377358490567</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正107角形 の 内角、外角・中心角</h3>
<b>正 107 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>107</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.364485981308411</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>107</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.6355140186916</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正108角形 の 内角、外角・中心角</h3>
<b>正 108 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>108</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.3333333333333335</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>108</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.66666666666666</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正109角形 の 内角、外角・中心角</h3>
<b>正 109 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>109</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.302752293577982</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>109</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.69724770642202</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正110角形 の 内角、外角・中心角</h3>
<b>正 110 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>110</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.272727272727273</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>110</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.72727272727272</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正111角形 の 内角、外角・中心角</h3>
<b>正 111 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>111</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.2432432432432434</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>111</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.75675675675674</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正112角形 の 内角、外角・中心角</h3>
<b>正 112 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>112</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.2142857142857144</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>112</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.78571428571428</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正113角形 の 内角、外角・中心角</h3>
<b>正 113 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>113</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.185840707964602</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>113</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.81415929203538</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正114角形 の 内角、外角・中心角</h3>
<b>正 114 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>114</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.1578947368421053</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>114</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.8421052631579</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正115角形 の 内角、外角・中心角</h3>
<b>正 115 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>115</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.130434782608696</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>115</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.8695652173913</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正116角形 の 内角、外角・中心角</h3>
<b>正 116 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>116</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.103448275862069</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>116</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.89655172413794</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正117角形 の 内角、外角・中心角</h3>
<b>正 117 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>117</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.076923076923077</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>117</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.92307692307693</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正118角形 の 内角、外角・中心角</h3>
<b>正 118 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>118</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.0508474576271185</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>118</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.94915254237287</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正119角形 の 内角、外角・中心角</h3>
<b>正 119 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>119</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3.0252100840336134</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>119</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>176.9747899159664</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正120角形 の 内角、外角・中心角</h3>
<b>正 120 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>120</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>3</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>120</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正121角形 の 内角、外角・中心角</h3>
<b>正 121 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>121</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.975206611570248</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>121</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.02479338842974</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正122角形 の 内角、外角・中心角</h3>
<b>正 122 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>122</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.9508196721311477</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>122</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.04918032786884</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正123角形 の 内角、外角・中心角</h3>
<b>正 123 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>123</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.926829268292683</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>123</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.0731707317073</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正124角形 の 内角、外角・中心角</h3>
<b>正 124 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>124</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.903225806451613</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>124</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.09677419354838</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正125角形 の 内角、外角・中心角</h3>
<b>正 125 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>125</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.88</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>125</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.12</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正126角形 の 内角、外角・中心角</h3>
<b>正 126 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>126</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.857142857142857</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>126</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.14285714285714</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正127角形 の 内角、外角・中心角</h3>
<b>正 127 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>127</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.8346456692913384</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>127</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.16535433070865</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正128角形 の 内角、外角・中心角</h3>
<b>正 128 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>128</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.8125</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>128</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.1875</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正129角形 の 内角、外角・中心角</h3>
<b>正 129 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>129</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.7906976744186047</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>129</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.2093023255814</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正130角形 の 内角、外角・中心角</h3>
<b>正 130 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>130</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.769230769230769</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>130</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.23076923076923</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正131角形 の 内角、外角・中心角</h3>
<b>正 131 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>131</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.7480916030534353</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>131</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.25190839694656</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正132角形 の 内角、外角・中心角</h3>
<b>正 132 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>132</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.727272727272727</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>132</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.27272727272728</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正133角形 の 内角、外角・中心角</h3>
<b>正 133 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>133</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.706766917293233</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>133</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.29323308270676</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正134角形 の 内角、外角・中心角</h3>
<b>正 134 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>134</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.6865671641791047</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>134</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.3134328358209</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正135角形 の 内角、外角・中心角</h3>
<b>正 135 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>135</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.6666666666666665</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>135</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.33333333333334</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正136角形 の 内角、外角・中心角</h3>
<b>正 136 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>136</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.6470588235294117</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>136</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.35294117647058</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正137角形 の 内角、外角・中心角</h3>
<b>正 137 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>137</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.627737226277372</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>137</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.37226277372264</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正138角形 の 内角、外角・中心角</h3>
<b>正 138 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>138</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.608695652173913</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>138</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.3913043478261</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正139角形 の 内角、外角・中心角</h3>
<b>正 139 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>139</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.5899280575539567</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>139</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.41007194244605</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正140角形 の 内角、外角・中心角</h3>
<b>正 140 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>140</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.5714285714285716</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>140</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.42857142857142</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正141角形 の 内角、外角・中心角</h3>
<b>正 141 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>141</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.5531914893617023</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>141</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.4468085106383</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正142角形 の 内角、外角・中心角</h3>
<b>正 142 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>142</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.535211267605634</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>142</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.46478873239437</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正143角形 の 内角、外角・中心角</h3>
<b>正 143 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>143</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.5174825174825175</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>143</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.4825174825175</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正144角形 の 内角、外角・中心角</h3>
<b>正 144 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>144</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.5</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>144</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.5</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正145角形 の 内角、外角・中心角</h3>
<b>正 145 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>145</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.4827586206896552</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>145</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.51724137931035</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正146角形 の 内角、外角・中心角</h3>
<b>正 146 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>146</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.4657534246575343</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>146</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.53424657534248</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正147角形 の 内角、外角・中心角</h3>
<b>正 147 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>147</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.4489795918367347</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>147</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.55102040816325</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正148角形 の 内角、外角・中心角</h3>
<b>正 148 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>148</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.4324324324324325</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>148</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.56756756756758</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正149角形 の 内角、外角・中心角</h3>
<b>正 149 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>149</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.4161073825503356</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>149</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.58389261744966</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正150角形 の 内角、外角・中心角</h3>
<b>正 150 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>150</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.4</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>150</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.6</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正151角形 の 内角、外角・中心角</h3>
<b>正 151 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>151</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.384105960264901</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>151</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.6158940397351</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正152角形 の 内角、外角・中心角</h3>
<b>正 152 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>152</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.3684210526315788</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>152</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.6315789473684</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正153角形 の 内角、外角・中心角</h3>
<b>正 153 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>153</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.3529411764705883</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>153</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.64705882352942</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正154角形 の 内角、外角・中心角</h3>
<b>正 154 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>154</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.3376623376623376</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>154</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.66233766233765</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正155角形 の 内角、外角・中心角</h3>
<b>正 155 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>155</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.3225806451612905</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>155</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.67741935483872</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正156角形 の 内角、外角・中心角</h3>
<b>正 156 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>156</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.3076923076923075</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>156</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.69230769230768</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正157角形 の 内角、外角・中心角</h3>
<b>正 157 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>157</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.2929936305732483</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>157</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.70700636942675</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正158角形 の 内角、外角・中心角</h3>
<b>正 158 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>158</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.278481012658228</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>158</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.72151898734177</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正159角形 の 内角、外角・中心角</h3>
<b>正 159 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>159</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.2641509433962264</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>159</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.73584905660377</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正160角形 の 内角、外角・中心角</h3>
<b>正 160 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>160</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.25</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>160</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.75</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正161角形 の 内角、外角・中心角</h3>
<b>正 161 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>161</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.2360248447204967</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>161</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.7639751552795</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正162角形 の 内角、外角・中心角</h3>
<b>正 162 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>162</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.2222222222222223</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>162</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.77777777777777</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正163角形 の 内角、外角・中心角</h3>
<b>正 163 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>163</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.208588957055215</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>163</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.7914110429448</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正164角形 の 内角、外角・中心角</h3>
<b>正 164 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>164</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.1951219512195124</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>164</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.8048780487805</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正165角形 の 内角、外角・中心角</h3>
<b>正 165 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>165</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.1818181818181817</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>165</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.8181818181818</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正166角形 の 内角、外角・中心角</h3>
<b>正 166 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>166</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.1686746987951806</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>166</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.83132530120483</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正167角形 の 内角、外角・中心角</h3>
<b>正 167 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>167</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.155688622754491</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>167</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.8443113772455</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正168角形 の 内角、外角・中心角</h3>
<b>正 168 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>168</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.142857142857143</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>168</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.85714285714286</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正169角形 の 内角、外角・中心角</h3>
<b>正 169 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>169</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.1301775147928996</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>169</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.8698224852071</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正170角形 の 内角、外角・中心角</h3>
<b>正 170 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>170</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.1176470588235294</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>170</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.88235294117646</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正171角形 の 内角、外角・中心角</h3>
<b>正 171 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>171</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.1052631578947367</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>171</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.89473684210526</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正172角形 の 内角、外角・中心角</h3>
<b>正 172 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>172</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.0930232558139537</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>172</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.90697674418604</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正173角形 の 内角、外角・中心角</h3>
<b>正 173 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>173</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.0809248554913293</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>173</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.91907514450867</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正174角形 の 内角、外角・中心角</h3>
<b>正 174 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>174</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.0689655172413794</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>174</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.93103448275863</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正175角形 の 内角、外角・中心角</h3>
<b>正 175 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>175</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.057142857142857</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>175</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.94285714285715</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正176角形 の 内角、外角・中心角</h3>
<b>正 176 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>176</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.0454545454545454</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>176</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.95454545454547</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正177角形 の 内角、外角・中心角</h3>
<b>正 177 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>177</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.0338983050847457</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>177</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.96610169491527</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正178角形 の 内角、外角・中心角</h3>
<b>正 178 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>178</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.0224719101123596</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>178</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.97752808988764</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正179角形 の 内角、外角・中心角</h3>
<b>正 179 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>179</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2.011173184357542</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>179</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>177.98882681564245</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正180角形 の 内角、外角・中心角</h3>
<b>正 180 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>180</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>2</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>180</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正181角形 の 内角、外角・中心角</h3>
<b>正 181 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>181</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.988950276243094</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>181</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.0110497237569</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正182角形 の 内角、外角・中心角</h3>
<b>正 182 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>182</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.978021978021978</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>182</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.02197802197801</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正183角形 の 内角、外角・中心角</h3>
<b>正 183 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>183</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.9672131147540983</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>183</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.0327868852459</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正184角形 の 内角、外角・中心角</h3>
<b>正 184 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>184</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.9565217391304348</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>184</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.04347826086956</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正185角形 の 内角、外角・中心角</h3>
<b>正 185 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>185</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.945945945945946</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>185</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.05405405405406</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正186角形 の 内角、外角・中心角</h3>
<b>正 186 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>186</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.935483870967742</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>186</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.06451612903226</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正187角形 の 内角、外角・中心角</h3>
<b>正 187 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>187</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.9251336898395721</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>187</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.07486631016042</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正188角形 の 内角、外角・中心角</h3>
<b>正 188 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>188</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.9148936170212767</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>188</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.08510638297872</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正189角形 の 内角、外角・中心角</h3>
<b>正 189 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>189</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.9047619047619047</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>189</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.0952380952381</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正190角形 の 内角、外角・中心角</h3>
<b>正 190 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>190</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.894736842105263</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>190</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.10526315789474</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正191角形 の 内角、外角・中心角</h3>
<b>正 191 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>191</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.8848167539267016</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>191</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.1151832460733</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正192角形 の 内角、外角・中心角</h3>
<b>正 192 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>192</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.875</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>192</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.125</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正193角形 の 内角、外角・中心角</h3>
<b>正 193 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>193</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.8652849740932642</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>193</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.13471502590673</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正194角形 の 内角、外角・中心角</h3>
<b>正 194 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>194</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.8556701030927836</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>194</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.1443298969072</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正195角形 の 内角、外角・中心角</h3>
<b>正 195 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>195</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.8461538461538463</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>195</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.15384615384616</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正196角形 の 内角、外角・中心角</h3>
<b>正 196 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>196</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.836734693877551</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>196</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.16326530612244</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正197角形 の 内角、外角・中心角</h3>
<b>正 197 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>197</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.8274111675126903</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>197</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.17258883248732</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正198角形 の 内角、外角・中心角</h3>
<b>正 198 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>198</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.8181818181818181</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>198</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.1818181818182</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正199角形 の 内角、外角・中心角</h3>
<b>正 199 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>199</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.8090452261306533</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>199</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.19095477386935</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正200角形 の 内角、外角・中心角</h3>
<b>正 200 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>200</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.8</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>200</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.2</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正201角形 の 内角、外角・中心角</h3>
<b>正 201 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>201</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.791044776119403</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>201</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.2089552238806</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正202角形 の 内角、外角・中心角</h3>
<b>正 202 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>202</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.7821782178217822</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>202</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.21782178217822</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正203角形 の 内角、外角・中心角</h3>
<b>正 203 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>203</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.7733990147783252</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>203</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.22660098522167</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正204角形 の 内角、外角・中心角</h3>
<b>正 204 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>204</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.7647058823529411</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>204</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.23529411764707</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正205角形 の 内角、外角・中心角</h3>
<b>正 205 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>205</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.7560975609756098</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>205</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.2439024390244</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正206角形 の 内角、外角・中心角</h3>
<b>正 206 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>206</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.7475728155339805</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>206</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.25242718446603</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正207角形 の 内角、外角・中心角</h3>
<b>正 207 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>207</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.7391304347826086</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>207</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.2608695652174</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正208角形 の 内角、外角・中心角</h3>
<b>正 208 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>208</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.7307692307692308</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>208</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.26923076923077</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正209角形 の 内角、外角・中心角</h3>
<b>正 209 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>209</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.722488038277512</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>209</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.2775119617225</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正210角形 の 内角、外角・中心角</h3>
<b>正 210 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>210</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.7142857142857142</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>210</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.28571428571428</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正211角形 の 内角、外角・中心角</h3>
<b>正 211 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>211</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.7061611374407584</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>211</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.29383886255926</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正212角形 の 内角、外角・中心角</h3>
<b>正 212 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>212</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.6981132075471699</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>212</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.30188679245282</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正213角形 の 内角、外角・中心角</h3>
<b>正 213 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>213</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.6901408450704225</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>213</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.30985915492957</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正214角形 の 内角、外角・中心角</h3>
<b>正 214 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>214</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.6822429906542056</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>214</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.3177570093458</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正215角形 の 内角、外角・中心角</h3>
<b>正 215 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>215</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.6744186046511629</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>215</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.32558139534885</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正216角形 の 内角、外角・中心角</h3>
<b>正 216 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>216</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.6666666666666667</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>216</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.33333333333334</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正217角形 の 内角、外角・中心角</h3>
<b>正 217 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>217</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.6589861751152073</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>217</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.34101382488478</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正218角形 の 内角、外角・中心角</h3>
<b>正 218 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>218</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.651376146788991</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>218</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.348623853211</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正219角形 の 内角、外角・中心角</h3>
<b>正 219 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>219</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.643835616438356</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>219</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.35616438356163</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正220角形 の 内角、外角・中心角</h3>
<b>正 220 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>220</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.6363636363636365</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>220</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.36363636363637</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正221角形 の 内角、外角・中心角</h3>
<b>正 221 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>221</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.6289592760180995</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>221</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.3710407239819</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正222角形 の 内角、外角・中心角</h3>
<b>正 222 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>222</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.6216216216216217</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>222</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.3783783783784</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正223角形 の 内角、外角・中心角</h3>
<b>正 223 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>223</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.6143497757847534</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>223</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.38565022421525</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正224角形 の 内角、外角・中心角</h3>
<b>正 224 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>224</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.6071428571428572</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>224</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.39285714285714</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正225角形 の 内角、外角・中心角</h3>
<b>正 225 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>225</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.6</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>225</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.4</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正226角形 の 内角、外角・中心角</h3>
<b>正 226 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>226</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.592920353982301</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>226</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.4070796460177</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正227角形 の 内角、外角・中心角</h3>
<b>正 227 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>227</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.5859030837004404</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>227</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.41409691629957</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正228角形 の 内角、外角・中心角</h3>
<b>正 228 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>228</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.5789473684210527</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>228</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.42105263157896</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正229角形 の 内角、外角・中心角</h3>
<b>正 229 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>229</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.5720524017467248</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>229</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.42794759825327</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正230角形 の 内角、外角・中心角</h3>
<b>正 230 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>230</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.565217391304348</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>230</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.43478260869566</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正231角形 の 内角、外角・中心角</h3>
<b>正 231 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>231</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.5584415584415585</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>231</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.44155844155844</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正232角形 の 内角、外角・中心角</h3>
<b>正 232 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>232</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.5517241379310345</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>232</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.44827586206895</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正233角形 の 内角、外角・中心角</h3>
<b>正 233 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>233</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.5450643776824033</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>233</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.4549356223176</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正234角形 の 内角、外角・中心角</h3>
<b>正 234 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>234</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.5384615384615385</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>234</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.46153846153845</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正235角形 の 内角、外角・中心角</h3>
<b>正 235 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>235</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.5319148936170213</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>235</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.46808510638297</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正236角形 の 内角、外角・中心角</h3>
<b>正 236 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>236</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.5254237288135593</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>236</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.47457627118644</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正237角形 の 内角、外角・中心角</h3>
<b>正 237 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>237</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.518987341772152</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>237</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.48101265822785</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正238角形 の 内角、外角・中心角</h3>
<b>正 238 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>238</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.5126050420168067</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>238</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.48739495798318</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正239角形 の 内角、外角・中心角</h3>
<b>正 239 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>239</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.506276150627615</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>239</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.49372384937237</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正240角形 の 内角、外角・中心角</h3>
<b>正 240 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>240</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.5</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>240</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.5</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正241角形 の 内角、外角・中心角</h3>
<b>正 241 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>241</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.4937759336099585</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>241</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.50622406639005</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正242角形 の 内角、外角・中心角</h3>
<b>正 242 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>242</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.487603305785124</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>242</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.51239669421489</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正243角形 の 内角、外角・中心角</h3>
<b>正 243 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>243</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.4814814814814814</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>243</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.5185185185185</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正244角形 の 内角、外角・中心角</h3>
<b>正 244 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>244</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.4754098360655739</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>244</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.52459016393442</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正245角形 の 内角、外角・中心角</h3>
<b>正 245 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>245</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.469387755102041</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>245</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.53061224489795</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正246角形 の 内角、外角・中心角</h3>
<b>正 246 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>246</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.4634146341463414</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>246</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.53658536585365</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正247角形 の 内角、外角・中心角</h3>
<b>正 247 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>247</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.45748987854251</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>247</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.5425101214575</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正248角形 の 内角、外角・中心角</h3>
<b>正 248 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>248</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.4516129032258065</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>248</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.5483870967742</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正249角形 の 内角、外角・中心角</h3>
<b>正 249 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>249</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.4457831325301205</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>249</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.55421686746988</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正250角形 の 内角、外角・中心角</h3>
<b>正 250 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>250</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.44</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>250</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.56</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正251角形 の 内角、外角・中心角</h3>
<b>正 251 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>251</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.4342629482071714</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>251</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.56573705179284</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正252角形 の 内角、外角・中心角</h3>
<b>正 252 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>252</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.4285714285714286</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>252</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.57142857142858</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正253角形 の 内角、外角・中心角</h3>
<b>正 253 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>253</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.4229249011857708</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>253</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.57707509881422</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正254角形 の 内角、外角・中心角</h3>
<b>正 254 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>254</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.4173228346456692</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>254</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.58267716535434</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正255角形 の 内角、外角・中心角</h3>
<b>正 255 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>255</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.411764705882353</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>255</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.58823529411765</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正256角形 の 内角、外角・中心角</h3>
<b>正 256 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>256</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.40625</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>256</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.59375</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正257角形 の 内角、外角・中心角</h3>
<b>正 257 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>257</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.4007782101167314</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>257</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.59922178988327</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正258角形 の 内角、外角・中心角</h3>
<b>正 258 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>258</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.3953488372093024</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>258</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.6046511627907</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正259角形 の 内角、外角・中心角</h3>
<b>正 259 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>259</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.38996138996139</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>259</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.6100386100386</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正260角形 の 内角、外角・中心角</h3>
<b>正 260 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>260</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.3846153846153846</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>260</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.6153846153846</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正261角形 の 内角、外角・中心角</h3>
<b>正 261 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>261</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.3793103448275863</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>261</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.6206896551724</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正262角形 の 内角、外角・中心角</h3>
<b>正 262 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>262</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.3740458015267176</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>262</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.6259541984733</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正263角形 の 内角、外角・中心角</h3>
<b>正 263 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>263</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.3688212927756653</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>263</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.63117870722434</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正264角形 の 内角、外角・中心角</h3>
<b>正 264 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>264</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.3636363636363635</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>264</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.63636363636363</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正265角形 の 内角、外角・中心角</h3>
<b>正 265 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>265</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.3584905660377358</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>265</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.64150943396226</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正266角形 の 内角、外角・中心角</h3>
<b>正 266 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>266</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.3533834586466165</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>266</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.64661654135338</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正267角形 の 内角、外角・中心角</h3>
<b>正 267 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>267</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.348314606741573</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>267</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.65168539325842</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正268角形 の 内角、外角・中心角</h3>
<b>正 268 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>268</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.3432835820895523</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>268</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.65671641791045</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正269角形 の 内角、外角・中心角</h3>
<b>正 269 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>269</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.338289962825279</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>269</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.66171003717471</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正270角形 の 内角、外角・中心角</h3>
<b>正 270 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>270</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.3333333333333333</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>270</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.66666666666666</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正271角形 の 内角、外角・中心角</h3>
<b>正 271 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>271</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.3284132841328413</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>271</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.67158671586716</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正272角形 の 内角、外角・中心角</h3>
<b>正 272 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>272</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.3235294117647058</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>272</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.6764705882353</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正273角形 の 内角、外角・中心角</h3>
<b>正 273 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>273</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.3186813186813187</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>273</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.6813186813187</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正274角形 の 内角、外角・中心角</h3>
<b>正 274 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>274</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.313868613138686</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>274</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.68613138686132</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正275角形 の 内角、外角・中心角</h3>
<b>正 275 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>275</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.309090909090909</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>275</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.6909090909091</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正276角形 の 内角、外角・中心角</h3>
<b>正 276 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>276</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.3043478260869565</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>276</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.69565217391303</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正277角形 の 内角、外角・中心角</h3>
<b>正 277 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>277</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2996389891696751</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>277</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.70036101083033</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正278角形 の 内角、外角・中心角</h3>
<b>正 278 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>278</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2949640287769784</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>278</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.70503597122303</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正279角形 の 内角、外角・中心角</h3>
<b>正 279 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>279</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2903225806451613</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>279</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.70967741935485</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正280角形 の 内角、外角・中心角</h3>
<b>正 280 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>280</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2857142857142858</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>280</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.71428571428572</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正281角形 の 内角、外角・中心角</h3>
<b>正 281 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>281</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2811387900355873</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>281</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.71886120996442</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正282角形 の 内角、外角・中心角</h3>
<b>正 282 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>282</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2765957446808511</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>282</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.72340425531914</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正283角形 の 内角、外角・中心角</h3>
<b>正 283 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>283</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2720848056537102</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>283</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.72791519434628</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正284角形 の 内角、外角・中心角</h3>
<b>正 284 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>284</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.267605633802817</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>284</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.73239436619718</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正285角形 の 内角、外角・中心角</h3>
<b>正 285 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>285</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.263157894736842</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>285</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.73684210526315</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正286角形 の 内角、外角・中心角</h3>
<b>正 286 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>286</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2587412587412588</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>286</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.74125874125875</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正287角形 の 内角、外角・中心角</h3>
<b>正 287 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>287</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.254355400696864</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>287</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.74564459930315</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正288角形 の 内角、外角・中心角</h3>
<b>正 288 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>288</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.25</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>288</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.75</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正289角形 の 内角、外角・中心角</h3>
<b>正 289 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>289</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.245674740484429</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>289</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.75432525951558</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正290角形 の 内角、外角・中心角</h3>
<b>正 290 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>290</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2413793103448276</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>290</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.75862068965517</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正291角形 の 内角、外角・中心角</h3>
<b>正 291 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>291</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2371134020618557</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>291</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.76288659793815</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正292角形 の 内角、外角・中心角</h3>
<b>正 292 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>292</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2328767123287672</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>292</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.76712328767124</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正293角形 の 内角、外角・中心角</h3>
<b>正 293 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>293</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2286689419795223</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>293</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.77133105802048</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正294角形 の 内角、外角・中心角</h3>
<b>正 294 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>294</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2244897959183674</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>294</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.77551020408163</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正295角形 の 内角、外角・中心角</h3>
<b>正 295 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>295</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2203389830508475</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>295</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.77966101694915</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正296角形 の 内角、外角・中心角</h3>
<b>正 296 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>296</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2162162162162162</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>296</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.78378378378378</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正297角形 の 内角、外角・中心角</h3>
<b>正 297 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>297</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2121212121212122</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>297</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.78787878787878</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正298角形 の 内角、外角・中心角</h3>
<b>正 298 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>298</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2080536912751678</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>298</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.79194630872485</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正299角形 の 内角、外角・中心角</h3>
<b>正 299 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>299</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2040133779264215</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>299</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.79598662207357</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正300角形 の 内角、外角・中心角</h3>
<b>正 300 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>300</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.2</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>300</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.8</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正301角形 の 内角、外角・中心角</h3>
<b>正 301 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>301</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.196013289036545</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>301</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.80398671096344</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正302角形 の 内角、外角・中心角</h3>
<b>正 302 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>302</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1920529801324504</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>302</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.80794701986756</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正303角形 の 内角、外角・中心角</h3>
<b>正 303 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>303</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.188118811881188</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>303</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.8118811881188</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正304角形 の 内角、外角・中心角</h3>
<b>正 304 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>304</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1842105263157894</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>304</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.81578947368422</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正305角形 の 内角、外角・中心角</h3>
<b>正 305 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>305</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.180327868852459</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>305</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.81967213114754</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正306角形 の 内角、外角・中心角</h3>
<b>正 306 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>306</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1764705882352942</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>306</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.8235294117647</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正307角形 の 内角、外角・中心角</h3>
<b>正 307 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>307</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1726384364820848</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>307</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.8273615635179</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正308角形 の 内角、外角・中心角</h3>
<b>正 308 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>308</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1688311688311688</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>308</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.83116883116884</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正309角形 の 内角、外角・中心角</h3>
<b>正 309 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>309</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1650485436893203</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>309</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.83495145631068</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正310角形 の 内角、外角・中心角</h3>
<b>正 310 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>310</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1612903225806452</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>310</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.83870967741936</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正311角形 の 内角、外角・中心角</h3>
<b>正 311 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>311</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.157556270096463</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>311</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.84244372990355</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正312角形 の 内角、外角・中心角</h3>
<b>正 312 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>312</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1538461538461537</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>312</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.84615384615384</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正313角形 の 内角、外角・中心角</h3>
<b>正 313 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>313</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1501597444089458</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>313</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.84984025559106</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正314角形 の 内角、外角・中心角</h3>
<b>正 314 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>314</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1464968152866242</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>314</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.8535031847134</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正315角形 の 内角、外角・中心角</h3>
<b>正 315 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>315</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1428571428571428</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>315</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.85714285714286</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正316角形 の 内角、外角・中心角</h3>
<b>正 316 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>316</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.139240506329114</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>316</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.86075949367088</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正317角形 の 内角、外角・中心角</h3>
<b>正 317 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>317</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.135646687697161</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>317</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.86435331230285</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正318角形 の 内角、外角・中心角</h3>
<b>正 318 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>318</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1320754716981132</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>318</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.8679245283019</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正319角形 の 内角、外角・中心角</h3>
<b>正 319 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>319</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.128526645768025</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>319</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.87147335423197</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正320角形 の 内角、外角・中心角</h3>
<b>正 320 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>320</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.125</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>320</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.875</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正321角形 の 内角、外角・中心角</h3>
<b>正 321 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>321</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1214953271028036</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>321</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.8785046728972</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正322角形 の 内角、外角・中心角</h3>
<b>正 322 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>322</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1180124223602483</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>322</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.88198757763976</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正323角形 の 内角、外角・中心角</h3>
<b>正 323 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>323</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1145510835913313</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>323</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.88544891640868</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正324角形 の 内角、外角・中心角</h3>
<b>正 324 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>324</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1111111111111112</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>324</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.88888888888889</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正325角形 の 内角、外角・中心角</h3>
<b>正 325 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>325</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1076923076923078</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>325</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.8923076923077</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正326角形 の 内角、外角・中心角</h3>
<b>正 326 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>326</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1042944785276074</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>326</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.8957055214724</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正327角形 の 内角、外角・中心角</h3>
<b>正 327 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>327</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.1009174311926606</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>327</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.89908256880733</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正328角形 の 内角、外角・中心角</h3>
<b>正 328 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>328</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0975609756097562</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>328</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.90243902439025</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正329角形 の 内角、外角・中心角</h3>
<b>正 329 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>329</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.094224924012158</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>329</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.90577507598783</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正330角形 の 内角、外角・中心角</h3>
<b>正 330 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>330</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0909090909090908</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>330</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.9090909090909</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正331角形 の 内角、外角・中心角</h3>
<b>正 331 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>331</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0876132930513596</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>331</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.91238670694864</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正332角形 の 内角、外角・中心角</h3>
<b>正 332 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>332</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0843373493975903</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>332</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.9156626506024</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正333角形 の 内角、外角・中心角</h3>
<b>正 333 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>333</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0810810810810811</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>333</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.9189189189189</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正334角形 の 内角、外角・中心角</h3>
<b>正 334 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>334</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0778443113772456</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>334</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.92215568862275</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正335角形 の 内角、外角・中心角</h3>
<b>正 335 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>335</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0746268656716418</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>335</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.92537313432837</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正336角形 の 内角、外角・中心角</h3>
<b>正 336 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>336</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0714285714285714</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>336</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.92857142857142</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正337角形 の 内角、外角・中心角</h3>
<b>正 337 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>337</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0682492581602374</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>337</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.93175074183975</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正338角形 の 内角、外角・中心角</h3>
<b>正 338 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>338</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0650887573964498</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>338</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.93491124260356</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正339角形 の 内角、外角・中心角</h3>
<b>正 339 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>339</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0619469026548674</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>339</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.93805309734512</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正340角形 の 内角、外角・中心角</h3>
<b>正 340 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>340</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0588235294117647</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>340</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.94117647058823</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正341角形 の 内角、外角・中心角</h3>
<b>正 341 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>341</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0557184750733137</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>341</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.94428152492668</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正342角形 の 内角、外角・中心角</h3>
<b>正 342 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>342</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0526315789473684</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>342</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.94736842105263</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正343角形 の 内角、外角・中心角</h3>
<b>正 343 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>343</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0495626822157433</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>343</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.95043731778426</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正344角形 の 内角、外角・中心角</h3>
<b>正 344 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>344</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0465116279069768</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>344</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.95348837209303</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正345角形 の 内角、外角・中心角</h3>
<b>正 345 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>345</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0434782608695652</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>345</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.95652173913044</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正346角形 の 内角、外角・中心角</h3>
<b>正 346 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>346</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0404624277456647</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>346</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.95953757225433</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正347角形 の 内角、外角・中心角</h3>
<b>正 347 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>347</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.037463976945245</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>347</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.96253602305475</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正348角形 の 内角、外角・中心角</h3>
<b>正 348 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>348</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0344827586206897</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>348</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.9655172413793</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正349角形 の 内角、外角・中心角</h3>
<b>正 349 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>349</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0315186246418337</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>349</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.96848137535815</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正350角形 の 内角、外角・中心角</h3>
<b>正 350 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>350</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0285714285714285</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>350</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.97142857142856</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正351角形 の 内角、外角・中心角</h3>
<b>正 351 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>351</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0256410256410255</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>351</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.97435897435898</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正352角形 の 内角、外角・中心角</h3>
<b>正 352 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>352</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0227272727272727</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>352</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.97727272727272</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正353角形 の 内角、外角・中心角</h3>
<b>正 353 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>353</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.019830028328612</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>353</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.9801699716714</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正354角形 の 内角、外角・中心角</h3>
<b>正 354 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>354</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0169491525423728</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>354</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.98305084745763</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正355角形 の 内角、外角・中心角</h3>
<b>正 355 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>355</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0140845070422535</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>355</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.98591549295776</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正356角形 の 内角、外角・中心角</h3>
<b>正 356 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>356</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0112359550561798</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>356</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.98876404494382</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正357角形 の 内角、外角・中心角</h3>
<b>正 357 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>357</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0084033613445378</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>357</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.99159663865547</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正358角形 の 内角、外角・中心角</h3>
<b>正 358 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>358</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.005586592178771</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>358</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.99441340782124</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正359角形 の 内角、外角・中心角</h3>
<b>正 359 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>359</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1.0027855153203342</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>359</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>178.99721448467966</mn><mi>°</mi>
</math>
</div>

<div class="box" style="display: none;">
<h3> 正360角形 の 内角、外角・中心角</h3>
<b>正 360 角形</b>の内角、外角・中心角は次のように計算できます。
<math display="block" mathsize="1.1em">
  <mi>外角</mi> <mo>＝</mo> <mi>中心角</mi> <mo>＝</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>360</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>1</mn><mi>°</mi>
</math>
<p></p>
<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mn><b>360</b></mn></mrow>
  </mfrac>
  <mo>＝</mo><mn>179</mn><mi>°</mi>
</math>
</div>


<!-- 左上の先頭へ戻るリンク -->
<!--
<div id="top_anc">
  <a href="#top" class="back-to-top" title="先頭へ戻る">↑TOP</a>
</div>
-->

----

## <small>（主な）</small> 正多角形 の内角と外角・中心角

<!--
| 主な<br/>正多角形 | 内角 | 外角<br/>・中<br/>心角| 頂点<br/>・辺<br/>の数 |
| :---: | ---: | ---: | :---: |
| <a href="#3">正3角形</a> | 60° | 120°|<a href="#3">3</a>|
| <a href="#4">正4角形</a> | 90° | 90°|<a href="#4">4</a>|
| <a href="#5">正5角形</a> | 108° | 72°|<a href="#5">5</a>|
| <a href="#6">正6角形</a> | 120° | 60°|<a href="#6">6</a>|
| <a href="#8">正8角形</a> | 135° | 45°|<a href="#8">8</a>|
| <a href="#9">正9角形</a> | 140° | 40°|<a href="#9">9</a>|
| <a href="#10">正10角形</a> | 144° | 36°|<a href="#10">10</a>|
| <a href="#12">正12角形</a> | 150° | 30°|<a href="#12">12</a>|
| <a href="#15">正15角形</a> | 156° | 24°|<a href="#15">15</a>|
| <a href="#18">正18角形</a> | 160° | 20°|<a href="#18">18</a>|
| <a href="#20">正20角形</a> | 162° | 18°|<a href="#20">20</a>|
| <a href="#24">正24角形</a> | 165° | 15°|<a href="#24">24</a>|
| <a href="#30">正30角形</a> | 168° | 12°|<a href="#30">30</a>|
| <a href="#36">正36角形</a> | 170° | 10°|<a href="#36">36</a>|
| <a href="#40">正40角形</a> | 171° | 9°|<a href="#40">40</a>|
| <a href="#45">正45角形</a> | 172° | 8°|<a href="#45">45</a>|
| <a href="#60">正60角形</a> | 174° | 6°|<a href="#60">60</a>|
| <a href="#72">正72角形</a> | 175° | 5°|<a href="#72">72</a>|
| <a href="#90">正90角形</a> | 176° | 4°|<a href="#90">90</a>|
| <a href="#120">正120角形</a> | 177° | 3°|<a href="#120">120</a>|
| <a href="#180">正180角形</a> | 178° | 2°|<a href="#180">180</a>|
| <a href="#360">正360角形</a> | 179° | 1°|<a href="#360">360</a>|
-->
<table class="responsive-table">
<thead>
<tr>
<th class="col-1">主な<wbr>正多角形</th>
<th class="col-2">内角</th>
<th class="col-3">外角<wbr>・中<wbr>心角</th>
<th class="col-4">頂点<wbr>・辺<wbr>の数</th>
</tr>
</thead>
<tbody>

<tr><td> <a href="#3">正三角形</a></td><td>60°</td><td>120°</td><td><a href="#3">3</a></td></tr>
<tr><td> <a href="#4">正方形</a></td><td>90°</td><td>90°</td><td><a href="#4">4</a></td></tr>
<tr><td> <a href="#5">正5角形</a></td><td>108°</td><td>72°</td><td><a href="#5">5</a></td></tr>
<tr><td> <a href="#6">正6角形</a></td><td>120°</td><td>60°</td><td><a href="#6">6</a></td></tr>
<tr><td> <a href="#8">正8角形</a></td><td>135°</td><td>45°</td><td><a href="#8">8</a></td></tr>
<tr><td> <a href="#9">正9角形</a></td><td>140°</td><td>40°</td><td><a href="#9">9</a></td></tr>
<tr><td> <a href="#10">正10角形</a></td><td>144°</td><td>36°</td><td><a href="#10">10</a></td></tr>
<tr><td> <a href="#12">正12角形</a></td><td>150°</td><td>30°</td><td><a href="#12">12</a></td></tr>
<tr><td> <a href="#15">正15角形</a></td><td>156°</td><td>24°</td><td><a href="#15">15</a></td></tr>
<tr><td> <a href="#18">正18角形</a></td><td>160°</td><td>20°</td><td><a href="#18">18</a></td></tr>
<tr><td> <a href="#20">正20角形</a></td><td>162°</td><td>18°</td><td><a href="#20">20</a></td></tr>
<tr><td> <a href="#24">正24角形</a></td><td>165°</td><td>15°</td><td><a href="#24">24</a></td></tr>
<tr><td> <a href="#30">正30角形</a></td><td>168°</td><td>12°</td><td><a href="#30">30</a></td></tr>
<tr><td> <a href="#36">正36角形</a></td><td>170°</td><td>10°</td><td><a href="#36">36</a></td></tr>
<tr><td> <a href="#40">正40角形</a></td><td>171°</td><td>9°</td><td><a href="#40">40</a></td></tr>
<tr><td> <a href="#45">正45角形</a></td><td>172°</td><td>8°</td><td><a href="#45">45</a></td></tr>
<tr><td> <a href="#60">正60角形</a></td><td>174°</td><td>6°</td><td><a href="#60">60</a></td></tr>
<tr><td> <a href="#72">正72角形</a></td><td>175°</td><td>5°</td><td><a href="#72">72</a></td></tr>
<tr><td> <a href="#90">正90角形</a></td><td>176°</td><td>4°</td><td><a href="#90">90</a></td></tr>
<tr><td> <a href="#120">正120角形</a></td><td>177°</td><td>3°</td><td><a href="#120">120</a></td></tr>
<tr><td> <a href="#180">正180角形</a></td><td>178°</td><td>2°</td><td><a href="#180">180</a></td></tr>
<tr><td> <a href="#360">正360角形</a></td><td>179°</td><td>1°</td><td><a href="#360">360</a></td></tr>

</tbody>
</table>

<!-- 左上の先頭へ戻るリンク -->
<div id="top_anc">
  <a href="#top" class="back-to-top" title="先頭へ戻る">↑TOP</a>
</div>




### 正n角形における 外角・中心角、内角 の計算式

<math display="block" mathsize="1.1em">
  <mi>外角</mi><mo>＝</mo><mi>中心角</mi><mo>＝</mo>
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mi><b>n</b></mi></mrow>
  </mfrac>
</math>

<math display="block" mathsize="1.1em">
  <mi>内角</mi><mo>＝</mo><mn>180</mn><mo>−</mo><mi>外角</mi> <mo>＝</mo><mn>180</mn><mo>−</mo> 
  <mfrac>
    <mrow><mn>360</mn></mrow>
    <mrow><mi><b>n</b></mi></mrow>
  </mfrac>
</math>
<math display="block" mathsize="1.1em">
  <mo>＝</mo><mn>180</mn><mo>&InvisibleTimes;</mo>
  <mfrac>
    <mrow> <mo>(</mo><mi><b>n</b></mi><mo>−</mo><mn>2</mn><mo>)</mo></mrow>
    <mrow><mi><b>n</b></mi></mrow>
  </mfrac>
</math>





### 正n角形の 公式

正多角形の内角の和



## すべての正多角形（正360角形まで）の一覧

| 正n角形 |
| --- |
|<a href="#3">3</a> <a href="#4">4</a> <a href="#5">5</a> <a href="#6">6</a> <a href="#7">7</a> <a href="#8">8</a> <a href="#9">9</a> <a href="#10">10</a> <a href="#11">11</a> <a href="#12">12</a> <a href="#13">13</a> <a href="#14">14</a> <a href="#15">15</a> <a href="#16">16</a> <a href="#17">17</a> <a href="#18">18</a> <a href="#19">19</a> <a href="#20">20</a> |
|<a href="#21">21</a> <a href="#22">22</a> <a href="#23">23</a> <a href="#24">24</a> <a href="#25">25</a> <a href="#26">26</a> <a href="#27">27</a> <a href="#28">28</a> <a href="#29">29</a> <a href="#30">30</a> <a href="#31">31</a> <a href="#32">32</a> <a href="#33">33</a> <a href="#34">34</a> <a href="#35">35</a> <a href="#36">36</a> <a href="#37">37</a> <a href="#38">38</a> <a href="#39">39</a> <a href="#40">40</a> |
|<a href="#41">41</a> <a href="#42">42</a> <a href="#43">43</a> <a href="#44">44</a> <a href="#45">45</a> <a href="#46">46</a> <a href="#47">47</a> <a href="#48">48</a> <a href="#49">49</a> <a href="#50">50</a> <a href="#51">51</a> <a href="#52">52</a> <a href="#53">53</a> <a href="#54">54</a> <a href="#55">55</a> <a href="#56">56</a> <a href="#57">57</a> <a href="#58">58</a> <a href="#59">59</a> <a href="#60">60</a> |
|<a href="#61">61</a> <a href="#62">62</a> <a href="#63">63</a> <a href="#64">64</a> <a href="#65">65</a> <a href="#66">66</a> <a href="#67">67</a> <a href="#68">68</a> <a href="#69">69</a> <a href="#70">70</a> <a href="#71">71</a> <a href="#72">72</a> <a href="#73">73</a> <a href="#74">74</a> <a href="#75">75</a> <a href="#76">76</a> <a href="#77">77</a> <a href="#78">78</a> <a href="#79">79</a> <a href="#80">80</a> |
|<a href="#81">81</a> <a href="#82">82</a> <a href="#83">83</a> <a href="#84">84</a> <a href="#85">85</a> <a href="#86">86</a> <a href="#87">87</a> <a href="#88">88</a> <a href="#89">89</a> <a href="#90">90</a> <a href="#91">91</a> <a href="#92">92</a> <a href="#93">93</a> <a href="#94">94</a> <a href="#95">95</a> <a href="#96">96</a> <a href="#97">97</a> <a href="#98">98</a> <a href="#99">99</a> <a href="#100">100</a> |
|<a href="#101">101</a> <a href="#102">102</a> <a href="#103">103</a> <a href="#104">104</a> <a href="#105">105</a> <a href="#106">106</a> <a href="#107">107</a> <a href="#108">108</a> <a href="#109">109</a> <a href="#110">110</a> <a href="#111">111</a> <a href="#112">112</a> <a href="#113">113</a> <a href="#114">114</a> <a href="#115">115</a> <a href="#116">116</a> <a href="#117">117</a> <a href="#118">118</a> <a href="#119">119</a> <a href="#120">120</a> |
|<a href="#121">121</a> <a href="#122">122</a> <a href="#123">123</a> <a href="#124">124</a> <a href="#125">125</a> <a href="#126">126</a> <a href="#127">127</a> <a href="#128">128</a> <a href="#129">129</a> <a href="#130">130</a> <a href="#131">131</a> <a href="#132">132</a> <a href="#133">133</a> <a href="#134">134</a> <a href="#135">135</a> <a href="#136">136</a> <a href="#137">137</a> <a href="#138">138</a> <a href="#139">139</a> <a href="#140">140</a> |
|<a href="#141">141</a> <a href="#142">142</a> <a href="#143">143</a> <a href="#144">144</a> <a href="#145">145</a> <a href="#146">146</a> <a href="#147">147</a> <a href="#148">148</a> <a href="#149">149</a> <a href="#150">150</a> <a href="#151">151</a> <a href="#152">152</a> <a href="#153">153</a> <a href="#154">154</a> <a href="#155">155</a> <a href="#156">156</a> <a href="#157">157</a> <a href="#158">158</a> <a href="#159">159</a> <a href="#160">160</a> |
|<a href="#161">161</a> <a href="#162">162</a> <a href="#163">163</a> <a href="#164">164</a> <a href="#165">165</a> <a href="#166">166</a> <a href="#167">167</a> <a href="#168">168</a> <a href="#169">169</a> <a href="#170">170</a> <a href="#171">171</a> <a href="#172">172</a> <a href="#173">173</a> <a href="#174">174</a> <a href="#175">175</a> <a href="#176">176</a> <a href="#177">177</a> <a href="#178">178</a> <a href="#179">179</a> <a href="#180">180</a> |
|<a href="#181">181</a> <a href="#182">182</a> <a href="#183">183</a> <a href="#184">184</a> <a href="#185">185</a> <a href="#186">186</a> <a href="#187">187</a> <a href="#188">188</a> <a href="#189">189</a> <a href="#190">190</a> <a href="#191">191</a> <a href="#192">192</a> <a href="#193">193</a> <a href="#194">194</a> <a href="#195">195</a> <a href="#196">196</a> <a href="#197">197</a> <a href="#198">198</a> <a href="#199">199</a> <a href="#200">200</a> |
|<a href="#201">201</a> <a href="#202">202</a> <a href="#203">203</a> <a href="#204">204</a> <a href="#205">205</a> <a href="#206">206</a> <a href="#207">207</a> <a href="#208">208</a> <a href="#209">209</a> <a href="#210">210</a> <a href="#211">211</a> <a href="#212">212</a> <a href="#213">213</a> <a href="#214">214</a> <a href="#215">215</a> <a href="#216">216</a> <a href="#217">217</a> <a href="#218">218</a> <a href="#219">219</a> <a href="#220">220</a> |
|<a href="#221">221</a> <a href="#222">222</a> <a href="#223">223</a> <a href="#224">224</a> <a href="#225">225</a> <a href="#226">226</a> <a href="#227">227</a> <a href="#228">228</a> <a href="#229">229</a> <a href="#230">230</a> <a href="#231">231</a> <a href="#232">232</a> <a href="#233">233</a> <a href="#234">234</a> <a href="#235">235</a> <a href="#236">236</a> <a href="#237">237</a> <a href="#238">238</a> <a href="#239">239</a> <a href="#240">240</a> |
|<a href="#241">241</a> <a href="#242">242</a> <a href="#243">243</a> <a href="#244">244</a> <a href="#245">245</a> <a href="#246">246</a> <a href="#247">247</a> <a href="#248">248</a> <a href="#249">249</a> <a href="#250">250</a> <a href="#251">251</a> <a href="#252">252</a> <a href="#253">253</a> <a href="#254">254</a> <a href="#255">255</a> <a href="#256">256</a> <a href="#257">257</a> <a href="#258">258</a> <a href="#259">259</a> <a href="#260">260</a> |
|<a href="#261">261</a> <a href="#262">262</a> <a href="#263">263</a> <a href="#264">264</a> <a href="#265">265</a> <a href="#266">266</a> <a href="#267">267</a> <a href="#268">268</a> <a href="#269">269</a> <a href="#270">270</a> <a href="#271">271</a> <a href="#272">272</a> <a href="#273">273</a> <a href="#274">274</a> <a href="#275">275</a> <a href="#276">276</a> <a href="#277">277</a> <a href="#278">278</a> <a href="#279">279</a> <a href="#280">280</a> |
|<a href="#281">281</a> <a href="#282">282</a> <a href="#283">283</a> <a href="#284">284</a> <a href="#285">285</a> <a href="#286">286</a> <a href="#287">287</a> <a href="#288">288</a> <a href="#289">289</a> <a href="#290">290</a> <a href="#291">291</a> <a href="#292">292</a> <a href="#293">293</a> <a href="#294">294</a> <a href="#295">295</a> <a href="#296">296</a> <a href="#297">297</a> <a href="#298">298</a> <a href="#299">299</a> <a href="#300">300</a> |
|<a href="#301">301</a> <a href="#302">302</a> <a href="#303">303</a> <a href="#304">304</a> <a href="#305">305</a> <a href="#306">306</a> <a href="#307">307</a> <a href="#308">308</a> <a href="#309">309</a> <a href="#310">310</a> <a href="#311">311</a> <a href="#312">312</a> <a href="#313">313</a> <a href="#314">314</a> <a href="#315">315</a> <a href="#316">316</a> <a href="#317">317</a> <a href="#318">318</a> <a href="#319">319</a> <a href="#320">320</a> |
|<a href="#321">321</a> <a href="#322">322</a> <a href="#323">323</a> <a href="#324">324</a> <a href="#325">325</a> <a href="#326">326</a> <a href="#327">327</a> <a href="#328">328</a> <a href="#329">329</a> <a href="#330">330</a> <a href="#331">331</a> <a href="#332">332</a> <a href="#333">333</a> <a href="#334">334</a> <a href="#335">335</a> <a href="#336">336</a> <a href="#337">337</a> <a href="#338">338</a> <a href="#339">339</a> <a href="#340">340</a> |
|<a href="#341">341</a> <a href="#342">342</a> <a href="#343">343</a> <a href="#344">344</a> <a href="#345">345</a> <a href="#346">346</a> <a href="#347">347</a> <a href="#348">348</a> <a href="#349">349</a> <a href="#350">350</a> <a href="#351">351</a> <a href="#352">352</a> <a href="#353">353</a> <a href="#354">354</a> <a href="#355">355</a> <a href="#356">356</a> <a href="#357">357</a> <a href="#358">358</a> <a href="#359">359</a> <a href="#360">360</a>|



<!-- 左上の先頭へ戻るリンク -->
<div id="top_anc">
  <a href="#top" class="back-to-top" title="先頭へ戻る">↑TOP</a>
</div>


作図、学習、新しい発見のために、このツールをぜひご利用ください。


----
## まとめ


任意の角度を入力して、簡単にイラストを生成して角度を確認できるツールをご紹介しました。完成したイメージはSVG形式、PNG形式の画像として保存し、自由に使用できます。
また、SVG形式のテキストをブラウザ内に画像として表示する手法についてご説明しました。
本ツールが生成する、新しいイラストのデザイン案について、ご要望をお待ちしています。
**角度生成ツール** は 100% 自由にお使いいただけます。内部での課金、ユーザー登録、機能制限などはありません。必要なだけ何度でもご利用ください。
**角度生成ツール** がお役に立ちましたら、ぜひ当サイトの他の関連ページもご覧ください。


- [方位ナビゲーター](/atanyangle/compass_rose_1-jp.md)
- [角度生成ツール](/atanyangle/anglegen_4_jp.md)
- [角度シミュレーター](/atanyangle/spiral_1_jp.md)
- [角度シミュレーター【続編】](/atanyangle/spiral_2_jp.md)
- [SVGからPNGに変換するツール ](/atanyangle/svg2png_tool_jp.md)

- [正多角形ジェネレーター](/atanyangle/regularPlygon.md)





----

© 2026 anglegen.com. All rights reserved.

[ホーム](../index.html) | [概要](../about.html) | [プライバシーポリシー](../privacy.html) | [利用規約 / 免責事項](../terms.html) | [お問い合わせ](../contact.html)


