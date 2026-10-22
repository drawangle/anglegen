/////////////////////////////////////////
// 1. SVGコードをクリップボードにコピーする関数
// 2. 実行（先ほどのコードの直後に置く場合）
// ※ブラウザのセキュリティ制限のため、実際には「ボタンのクリックイベント」などの中。実行する必要があります。
//copySvgAsCode(svg);
/////////////////////////////////////////
async function copySvgAsCode(target_id) {
    try {
    // SVG要素をテキスト文字列（<svg>...</svg>）に変換
    const serializer = new XMLSerializer();
    const svgElement = document.getElementById(target_id);

    const svgString = serializer.serializeToString(svgElement);

    // クリップボードにテキストとして書き込み
    await navigator.clipboard.writeText(svgString);
    //alert(mes["tosvg_success"]);
    // alert() の代わりにトースト表示関数を呼ぶ（2秒後に消去）
    showToast(mes["tosvg_success"], 2000);

    } catch (err) {
    console.error(mes["copy_error"], err);
    }
}

// トースト通知を表示する関数
function showToast(message, duration = 2000) {
    // すでにトーストがあれば消去
    const existingToast = document.getElementById('custom-toast');
    if (existingToast) existingToast.remove();

    // 要素の作成
    const toast = document.createElement('div');
    toast.id = 'custom-toast';
    toast.textContent = message;

    // スタイル設定（CSSファイルに書いてもOK）
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        padding: '10px 20px',
        borderRadius: '20px',
        fontSize: '14px',
        zIndex: '9999',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transition: 'opacity 0.3s ease',
        opacity: '1'
    });

    document.body.appendChild(toast);

    // 指定時間後にふわっと消す
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300); // フェードアウト後に削除
    }, duration);
}        



const pxscale = 2; // 2倍の解像度（3倍なら 3）

/////////////////////////////////////////
// SVGを画像に変換してクリップボードにコピーする関数
// ユーザーのクリックイベント（onClickなど）の直下でこの関数を呼び出してください
// AndroidのChromeでエラー（例外）が発生する場合、原因はほぼ「HTTPS通信（常時SSL）になっていないこと」
// 、または「Android版Chrome特有のセキュリティ（フォーカス制限）」のどちらかです。
/////////////////////////////////////////
async function copySvgToClipboardAsPng(target_id) {
    try {
    // 1. クリップボードへの書き込みを即座に開始（スマホのセキュリティ対策）
    const item = new ClipboardItem({
        "image/png": new Promise((resolve, reject) => {
        
        // ① SVG要素を取得してBlob化
        const svg = document.getElementById(target_id);
        if (!svg) {
            reject(new Error(mes["svg_notfound"]));
            return;
        }
        
        // サイズ（viewBoxまたは属性から取得、デフォルト400）
        const width = svg.viewBox?.baseVal?.width || svg.width?.baseVal?.value || 400;
        const height = svg.viewBox?.baseVal?.height || svg.height?.baseVal?.value || 400;
        
        const svgString = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
        const blobURL = URL.createObjectURL(svgBlob);
        
        // ② SVGを一度Imageオブジェクトに読み込ませる
        const img = new Image();
        img.src = blobURL;
        
        img.onload = () => {
            // ③ 読み込み完了後、メモリ上にCanvasを作成して描画
            const canvas = document.createElement('canvas');
            // 1. Canvas のピクセルサイズを高解像度化（倍にする）
            canvas.width = width * pxscale;
            canvas.height = height * pxscale;
            
            const ctx = canvas.getContext('2ctx' in window ? '2d' : '2d'); // 一般的な2Dコンテキスト
            
            // 2. 描画品質の設定（輪郭を綺麗に引き伸ばす）
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            // 3. 描画コンテキスト自体をスケールアップ
            ctx.scale(pxscale, pxscale);
            
            ctx.drawImage(img, 0, 0, width, height);
            
            // ④ CanvasからPNGのBlobを取り出してPromiseを解決（resolve）
            canvas.toBlob((pngBlob) => {
            URL.revokeObjectURL(blobURL); // メモリ解放
            if (pngBlob) {
                resolve(pngBlob);
            } else {
                reject(new Error(mes["png_error"]));
            }
            }, "image/png");
        };
        
        img.onerror = (err) => {
            URL.revokeObjectURL(blobURL);
            reject(err);
        };
        })
    });

    // 2. クリップボードへ書き込みを実行
    await navigator.clipboard.write([item]);
    //alert(mes["topng_success"]);
    // alert() の代わりにトースト表示関数を呼ぶ（2秒後に消去）
    showToast(mes["topng_success"], 2000);


    } catch (err) {
    console.error("Copying to the clipboard failed, or your browser does not support this feature.", err);
    alert(mes["copy_error"]);
    }
}

/*
document.getElementById("copy-png-btn").addEventListener("click", () => {
    // ここで上記の関数を呼び出す
    copySvgToClipboardAsPng();
});
document.getElementById("copy-svg-btn").addEventListener("click", () => {
    // ここで上記の関数を呼び出す
    copySvgAsCode();
});
*/
// ページ全体のクリックイベントを1つだけ監視
document.addEventListener('click', (event) => {
    // クリックされた要素が .copy-btn かどうか判定
    let btn = event.target.closest('.copy-svg-btn');
    if (btn) {
        // ボタンの親にある <div id="drawXX"> を取得
        const parentDiv = btn.closest('div[id^="draw"], div[id^="angle"], div[id^="svg"]');
        if (parentDiv) {
            console.log('copy-svg', parentDiv.id)
            //copyCode(parentDiv); // どのdivかを引数で渡す
            copySvgAsCode('SVG-' + parentDiv.id);
        }
        return;
    }
    btn = event.target.closest('.copy-png-btn');
    if (btn) {
        // ボタンの親にある <div id="drawXX"> を取得
        const parentDiv = btn.closest('div[id^="draw"], div[id^="angle"], div[id^="svg"]');
        if (parentDiv) {
            console.log('copy-png', parentDiv.id)
            //copyCode(parentDiv); // どのdivかを引数で渡す
            copySvgToClipboardAsPng('SVG-' + parentDiv.id);
        }
        return;
    }
    return;
});

// 呼び出される関数
function copyCode(targetDiv) {
  console.log('対象のDIV ID:', targetDiv.id); // 例: "draw01"
  
  // 対象のdiv内の処理（例: テキストの取得など）
  // const text = targetDiv.textContent;
}