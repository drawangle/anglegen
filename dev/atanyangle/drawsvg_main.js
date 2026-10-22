const pythonMod = (n, m) => n - m * Math.floor(n / m);

function npRadians(theta) {
    return theta / 180 * Math.PI
}
function sector(sdeg, edeg) {
  const srad = (sdeg / 180) * Math.PI;
  const erad = (edeg / 180) * Math.PI;
  const scx = [0, 0]; // x min, max
  const scy = [0, 0]; // y min, max

  // 0, 0.5π, 1π, 1.5π... の各角度と [srad, erad] を結合した配列を作成
  const angles = [-2, -3/2, -1, -1/2, 0, 1/2, 1, 3/2, 2, 5/2, 3, 7/2]
    .map(x => Math.PI * x)
    .concat([srad, erad]);

  for (const th of angles) {
    if (srad <= th && th <= erad) {
      scx[0] = Math.min(scx[0], Math.cos(th));
      scx[1] = Math.max(scx[1], Math.cos(th));
      scy[0] = Math.min(scy[0], Math.sin(th));
      scy[1] = Math.max(scy[1], Math.sin(th));
    }
  }
  //console.log('sector:=', scx, scy);
  return [scx, scy];
}
function round(fval, n) {
    return Math.floor(fval * (10**n)) / (10**n);
}
const SVG_NS = "http://www.w3.org/2000/svg";
// SVG要素を作って属性をまとめて適用する汎用関数
function createSVGElement_old(tagName, attributes) {
    const el = document.createElementNS(SVG_NS, tagName);
    Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
    return el;
}
//const SVG_NS = "http://www.w3.org/2000/svg";
// SVG要素を作って属性をまとめて適用し、子要素も追加できる汎用関数
function createSVGElement(tagName, attributes, ...children) {
    const el = document.createElementNS(SVG_NS, tagName);
    Object.entries(attributes).forEach(([key, value]) => el.setAttribute(key, value));
    
    // 子要素があればすべて追加する
    if (children.length > 0) {
        el.append(...children);
    }
    
    return el;
}



const Z = function() {
    return ' Z ';
} 
const M = function(x, y) {
    return `M${round(x, 2)} ${round(y, 2)} `;
} 
const H = function(x) {
    return `H${round(x, 2)} `;
} 
const L = function(x, y) {
    return `L${round(x, 2)} ${round(y, 2)} `;
} 
const LL = function(x, y, u, v) {
    return `L${round(x, 2)} ${round(y, 2)}  ${round(u, 2)} ${round(v, 2)} `;
} 
const S = function(x, y, u, v) {
    return `S${round(x, 2)} ${round(y, 2)}  ${round(u, 2)} ${round(v, 2)} `;
} 
const C = function(x, y, u, v, s, t) {
    return `C${round(x, 2)} ${round(y, 2)}  ${round(u, 2)} ${round(v, 2)}  ${round(s, 2)} ${round(t, 2)}`;
} 
/*const A = function(r, large_arc, sweep, x, y) {
    return `A${round(r, 2)} ${round(r, 2)} 0 ${large_arc} ${sweep} ${round(x, 2)}  ${round(y, 2)} `;
}*/
const A = function () {
    if (arguments.length === 5) {
        const [r, large_arc, sweep, x, y] = arguments;
        return `A${round(r, 2)} ${round(r, 2)} 0 ${large_arc} ${sweep} ${round(x, 2)}  ${round(y, 2)} `;
    }
    else if (arguments.length === 7) {
        const [r, r2, t, large_arc, sweep, x, y] = arguments;
        return `A${round(r, 2)} ${round(r, 2)} 0 ${large_arc} ${sweep} ${round(x, 2)}  ${round(y, 2)} `;
    }
}
function translate(x, y) {
    return `translate(${round(x, 2)}, ${round(y, 2)}) `
}
function rotate(degr) {
    return `rotate(${round( degr,2)}) ` 
}
function scale(w, h) {
    return `scale(${round(w, 2)}, ${round(h, 2)}) `
}
function drawCircle(x, y, r, fill = 'black', stroke='none', stroke_width=1 ) {
    return createSVGElement('circle', {
        'cx': `${round(x, 2)}`, 'cy': `${round(y, 2)}`, 'r': `${round(r, 2)}`, 'fill': fill,
        'stroke': stroke, 'stroke-width': `${round(stroke_width, 2)}`
    })

}
function drawText(str, font_size, x, y, text_anchor, font_family, font_weight, dominant_baseline, fill_col, id) {
    const text_element = createSVGElement("text", {
        "x": `${round(x, 2)}`,
        "y": `${round(y, 2)}`,
        "text-anchor": `${text_anchor}`,
        "font-family": `${font_family}`,
        "font-size": `${round(font_size, 2)}`,
        "font-weight": `${font_weight}`,
        'dominant-baseline': dominant_baseline,
        "fill": fill_col,
        'id': id
    });
    text_element.textContent = str;
    return text_element;
}

//line = draw.Line(0,0,sx, sy, stroke_width=20, stroke_linecap='round')
function drawLine(x1, y1, x2, y2, swidth, linecap) {
    const line = createSVGElement("line", {
            'x1': `${round(x1, 2)}`,
            'y1': `${round(y1, 2)}`,
            'x2': `${round(x2, 2)}`,
            'y2': `${round(y2, 2)}`,
            'stroke-width': `${swidth}`,
            'stroke-linecap': linecap
        });
    return line;
}
function abs(value) {
    return Math.abs(value)
}
function min(a, b) {
    return Math.min(a,b)
}
function max(a, b) {
    return Math.max(a,b)
}
function getUuid() {
    // 32ビットのランダムな16進数を生成して8文字切り出し
    const shortId = Math.random().toString(16).substring(2, 10);
    //console.log(shortId); // 例: "a3f81c9b"
    return shortId
}
function drawRectangle(x, y, width, height, fill) {
    const rect = createSVGElement("rect", {
            'x': `${round(x, 2)}`,
            'y': `${round(y, 2)}`,
            'width': `${round(width, 2)}`,
            'height': `${round(height, 2)}`,
            'fill': `${fill}`
        });
    return rect;
   
}

function getId(element) {
    return element.getAttribute('id')
}
function drawFilter(id, x, y, width, height) {
    filter = createSVGElement("filter", {
        'id': id, 'x': x, 'y': y, 'width': width, 'height': height
    });
    return filter;
}
function drawFilterItem(item, dx, dy, std_deviation, flood_color, flood_opacity) {
    fitem = createSVGElement(item, {
        'dx': dx, 'dy': dy, 'stdDeviation': std_deviation, 'flood-color': flood_color, 'flood-opacity': flood_opacity
    });
    return fitem;
}
function drawDefs() {
    defs = createSVGElement('defs', {});
    return defs;
}
function drawGroup() {
    g = createSVGElement('g', {});
    return g;
}





function get_transformed_vertices(x, y, w, h, lx, ly, th_deg) {
    // 1. 角度をラジアンに変換
    th_rad = npRadians(th_deg)

        
    // 2. 回転行列を定義
    
    const [c, s] = [Math.cos(th_rad), Math.sin(th_rad)]
    /*
    R = np.array([
        [c, -s],
        [s,  c]
    ])
    
    // 3. 矩形の「回転中心」をどこにするかで基準頂点を決める
    // ここでは、元の矩形の左上 (x, y) を基準（ローカル原点）として4頂点を定義
    local_vertices = np.array([
        [x,     y],     // 左上
        [x + w, y],     // 右上
        [x + w, y + h], // 右下
        [x,     y + h]  // 左下
    ])
    
    // 4. すべての頂点に回転行列を適用 (4, 2) x (2, 2) の行列積
    // ※NumPyの仕様上、頂点ベクトルを横に並べるため R ではなく Rの転置(R.T) を掛けます
    rotated_vertices = np.dot(local_vertices, R.T)
    
    // 5. 平行移動 (lx, ly) を加算
    transformed_vertices = rotated_vertices + np.array([lx, ly])
    return transformed_vertices
    */
    
    // 変換後の頂点座標（[ [x1, y1], [x2, y2], ... ] 形式）
    const transformedVertices = [
    [x,     y],     // 左上
    [x + w, y],     // 右上
    [x + w, y + h], // 右下
    [x,     y + h]  // 左下
    ].map(([px, py]) => [
    px * c - py * s + lx,
    px * s + py * c + ly
    ]);
    
    return transformedVertices;
}








//text_element = draw.Text(
    //        ss, s, tx, ty, 
    //        text_anchor='middle', font_family='sans-serif', font_weight='500', dominant_baseline='central', 
    //        fill=col, id=id
    //    )
/*
    const text_element = createSVGElement("text", {
        "x": `${round(tx, 2)}`,
        "y": `${round(ty, 2)}`,
        "text-anchor": "middle",
        "font-family": "sans-serif",
        "font-size": `${s}`,
        "font-weight": "500",
        'dominant_baseline': 'central',
        "fill": col,
        'id': id
    });
    text_element.textContent = ss;
*/



// サンプル関数
function dummy_drawsvg_001_1(degree, r) {
  data = {width:200, height:200, color: "#009688"};
    // 2. SVG要素の作成（viewBoxで本来の縦横比を定義）
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  SVG.setAttribute("xmlns", 'http://www.w3.org/2000/svg');
  svg.setAttribute('viewBox', `0 0 ${data.width} ${data.height}`);

  // 3. イラスト描画用の図形要素を作成（サンプルとして背景と文字を描画）
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  rect.setAttribute('width', data.width);
  rect.setAttribute('height', data.height);
  rect.setAttribute('fill', data.color);

  const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  text.setAttribute('x', '50%');
  text.setAttribute('y', '50%');
  text.setAttribute('dominant-baseline', 'middle');
  text.setAttribute('text-anchor', 'middle');
  text.setAttribute('fill', '#ffffff');
  text.setAttribute('font-size', '14');
  text.setAttribute('font-family', 'sans-serif');
  text.textContent = `SVG #${degree} ${r}  (${data.width}x${data.height})`;

  // 4. 要素の組み立てとDOMへの追加
  svg.appendChild(rect);
  svg.appendChild(text);

  return svg;
}
