"use strict";
var math = {
  pi: Math.PI,
  tan: function (t) { return Math.tan(t) },
  cos: function (t) { return Math.cos(t) },
  sin: function (t) { return Math.sin(t) },
  sqrt: function (t) { return Math.sqrt(t) }
};
/*
import {
  AssertionError,
  AttributeError,
  BaseException,
  DeprecationWarning,
  Exception,
  IndexError,
  IterableError,
  KeyError,
  NotImplementedError,
  RuntimeWarning,
  StopIteration,
  UserWarning,
  ValueError,
  Warning,
  __JsIterator__,
  __PyIterator__,
  __Terminal__,
  __add__,
  __and__,
  __call__,
  __class__,
  __envir__,
  __eq__,
  __floordiv__,
  __ge__,
  __get__,
  __getcm__,
  __getitem__,
  __getslice__,
  __getsm__,
  __gt__,
  __i__,
  __iadd__,
  __iand__,
  __idiv__,
  __ijsmod__,
  __ilshift__,
  __imatmul__,
  __imod__,
  __imul__,
  __in__,
  __init__,
  __ior__,
  __ipow__,
  __irshift__,
  __isub__,
  __ixor__,
  __jsUsePyNext__,
  __jsmod__,
  __k__,
  __kwargtrans__,
  __le__,
  __lshift__,
  __lt__,
  __matmul__,
  __mergefields__,
  __mergekwargtrans__,
  __mod__,
  __mul__,
  __ne__,
  __neg__,
  __nest__,
  __or__,
  __pow__,
  __pragma__,
  __pyUseJsNext__,
  __rshift__,
  __setitem__,
  __setproperty__,
  __setslice__,
  __sort__,
  __specialattrib__,
  __sub__,
  __super__,
  __t__,
  __terminal__,
  __truediv__,
  __withblock__,
  __xor__,
  _sort,
  abs,
  all,
  any,
  assert,
  bin,
  bool,
  bytearray,
  bytes,
  callable,
  chr,
  delattr,
  dict,
  dir,
  divmod,
  filter,
  float,
  getattr,
  hasattr,
  hex,
  input,
  int,
  isinstance,
  issubclass,
  len,
  list,
  map,
  max,
  min,
  object,
  oct,
  ord,
  pow,
  print,
  property,
  py_TypeError,
  py_enumerate,
  py_iter,
  py_metatype,
  py_next,
  py_reversed,
  py_typeof,
  range,
  repr,
  round,
  set,
  setattr,
  sorted,
  str,
  sum,
  tuple,
  zip,
} from "./org.transcrypt.__runtime__.js";
import * as __module_math__ from "./math.js";
__nest__(math, "", __module_math__);
var __name__ = "__main__";
*/

export var get_l2m = function (_num, _r, _rr, _w) {
  var th = 360 / _num;
  return (2 * _r * math.cos((math.pi * th) / 360)) / 3 + _rr / 3 - _w / 6;
};
export var get_h = function (_num, _r, _rr, _w) {
  var th = 360 / _num;
  return 0.5 * _w * (1 + 3 / math.tan(0.00872664625997165 * th));
};
export var get_m = function (_num, _r, _rr, _w) {
  var th = 360 / _num;
  return _r * math.cos((math.pi * th) / 360) - _w / 2;
};
export var get_center_y = function (_num, _r, _rr, _w) {
  var _l2m = get_l2m(_num, _r, _rr, _w);
  var _h = get_h(_num, _r, _rr, _w);
  var _m = get_m(_num, _r, _rr, _w);
  if (_l2m >= _m && _m >= _h) return _m;
  else if (_m >= _l2m && _l2m >= _h) return _l2m;
  else if (_m >= _h && _h >= _l2m) return (_h + _m) / 2;
  else return -_l2m;
};


/**************************************/
// 常時、transcript で必要になる関数 
/**************************************/
const pythonMod = (n, m) => n - m * Math.floor(n / m);

export var __mod__ = function(...args) {
    return pythonMod(args[0], args[1]);
 };

export var __kwargtrans__ = function (anObject) {
    //anObject.__kwargtrans__ = null;
    return anObject;
};

// SVG作成関数の追加
var draw = {
  Circle: function (...args) {
    if (args.length === 1) {
      const wparam = args[0];
      return createSVGElement('circle', wparam);
    } else if (args.length === 4) {
      const [x, y, r, wparam] = args;
      //console.log("引数4つの処理:", a, b, c, param);
      wparam['cx'] = round(x, 2);
      wparam['cy'] = round(y, 2);
      wparam['r'] = round(r, 2);
      return createSVGElement('circle', wparam);
    } else {
      throw new Error("引数の数が正しくありません");
    }
  },
  Text: function (str, sz, x, y, wparam) {
    wparam['x'] = `${round(x, 2)}`;
    wparam['y'] = `${round(y, 2)}`;
    wparam["font-size"] = `${round(sz, 2)}`;
    const text_element = createSVGElement("text", wparam);
    text_element.textContent = str;
    return text_element;
  },
  Group: function (wparam = {}) {
    return createSVGElement("g", wparam);
  },
  Path: function (wparam) {
    return createSVGElement("path", wparam);
  },
  Drawing: function (w, h, wparam) {
    wparam['width'] = `${w}`;
    wparam['height'] = `${h}`;
    //console.log(wparam)
    return createSVGElement("svg", wparam);
  }
}


// 1. タプルを表すカスタムクラス（配列を拡張）
export function __Tuple__ (iterable) {
    var self = [];
    if (iterable) {
        for (var item of iterable) {
            self.push (item);
        }
    }
    self.__class__ = __Tuple__; // Pythonの型判定（type()やisinstance()）のための識別マーク
    return self;
}

// 2. Pythonの tuple() 呼び出しに対応するヘルパー関数
export function tuple (iterable) {
    if (iterable) {
        if (iterable.__class__ === __Tuple__) {
            return iterable; // すでにタプルの場合はそのまま返す
        }
        else {
            return __Tuple__ (iterable); // 新しくタプル化して返す
        }
    }
    else {
        return __Tuple__ ([]); // 引数なしの場合は空のタプルを返す
    }
}
// Stringのプロトタイプに format メソッドを定義
String.prototype.format = function (...args) {
  let index = 0;
  // {} を順番に引数の値に置き換える
  return this.replace(/\{\}/g, () => args[index++]);
};
/****************** END ********************/



export var point_yajirushi = function (
  r,
  dg,
  start,
  ylen,
  swidth,
  ox,
  oy,
  color,
) {
  if (
    typeof ox == "undefined" ||
    (ox != null && ox.hasOwnProperty("__kwargtrans__"))
  )
    var ox = 0;
  if (
    typeof oy == "undefined" ||
    (oy != null && oy.hasOwnProperty("__kwargtrans__"))
  )
    var oy = 0;
  if (
    typeof color == "undefined" ||
    (color != null && color.hasOwnProperty("__kwargtrans__"))
  )
    var color = "#E91E63";
  var degree = abs(dg);
  if (ylen > (0.8 * r * math.pi * degree) / 360) {
    //print(ylen, (r * math.pi * degree) / 360);
    var ylen = (0.8 * r * math.pi * degree) / 360;
  }
  var rdg = (start / 180) * math.pi;
  var __left0__ = tuple([math.cos(rdg), math.sin(rdg)]);
  var rcos = __left0__[0];
  var rsin = __left0__[1];
  var __left0__ = tuple([r * rcos - 0, r * rsin + 0]);
  var x0 = __left0__[0];
  var y0 = __left0__[1];
  var P = [x0, y0];
  var __left0__ = tuple([
    (r - ylen / 3) * rcos - -ylen * rsin,
    (r - ylen / 3) * rsin + -ylen * rcos,
  ]);
  var _x1 = __left0__[0];
  var _y1 = __left0__[1];
  var __left0__ = tuple([
    (r + ylen / 3) * rcos - -ylen * rsin,
    (r + ylen / 3) * rsin + -ylen * rcos,
  ]);
  var _x2 = __left0__[0];
  var _y2 = __left0__[1];
  var th = (-ylen / r) * 0.4;
  var __left0__ = tuple([math.cos(th), math.sin(th)]);
  var trcos = __left0__[0];
  var trsin = __left0__[1];
  var __left0__ = tuple([
    (_x1 - r * rcos) * trcos - (_y1 - r * rsin) * trsin + r * rcos,
    (_x1 - r * rcos) * trsin + (_y1 - r * rsin) * trcos + r * rsin,
  ]);
  var x1 = __left0__[0];
  var y1 = __left0__[1];
  var __left0__ = tuple([
    (_x2 - r * rcos) * trcos - (_y2 - r * rsin) * trsin + r * rcos,
    (_x2 - r * rcos) * trsin + (_y2 - r * rsin) * trcos + r * rsin,
  ]);
  var x2 = __left0__[0];
  var y2 = __left0__[1];
  var p = draw.Path(
    __kwargtrans__({
      fill: "none",
      stroke: color,
      'stroke-width': swidth,
      'stroke-linejoin': "round",
      transform: "translate({},{})".format(ox, oy),
      d: "M{} {}L{} {} {} {}".format(x1, y1, x0, y0, x2, y2),
    }),
  );
  var th = -th;
  var ylen = -ylen;
  var rdg = ((dg + start) / 180) * math.pi;
  var __left0__ = tuple([math.cos(rdg), math.sin(rdg)]);
  var rcos = __left0__[0];
  var rsin = __left0__[1];
  var __left0__ = tuple([r * rcos - 0, r * rsin + 0]);
  var x0 = __left0__[0];
  var y0 = __left0__[1];
  var Q = [x0, y0];
  var __left0__ = tuple([
    (r - ylen / 3) * rcos - -ylen * rsin,
    (r - ylen / 3) * rsin + -ylen * rcos,
  ]);
  var _x1 = __left0__[0];
  var _y1 = __left0__[1];
  var __left0__ = tuple([
    (r + ylen / 3) * rcos - -ylen * rsin,
    (r + ylen / 3) * rsin + -ylen * rcos,
  ]);
  var _x2 = __left0__[0];
  var _y2 = __left0__[1];
  var __left0__ = tuple([math.cos(th), math.sin(th)]);
  var trcos = __left0__[0];
  var trsin = __left0__[1];
  var __left0__ = tuple([
    (_x1 - r * rcos) * trcos - (_y1 - r * rsin) * trsin + r * rcos,
    (_x1 - r * rcos) * trsin + (_y1 - r * rsin) * trcos + r * rsin,
  ]);
  var x1 = __left0__[0];
  var y1 = __left0__[1];
  var __left0__ = tuple([
    (_x2 - r * rcos) * trcos - (_y2 - r * rsin) * trsin + r * rcos,
    (_x2 - r * rcos) * trsin + (_y2 - r * rsin) * trcos + r * rsin,
  ]);
  var x2 = __left0__[0];
  var y2 = __left0__[1];
  p.setAttribute("d", p.getAttribute("d") + "M{} {}L{} {} {} {}".format(x1, y1, x0, y0, x2, y2) );
  p.setAttribute("d", p.getAttribute("d") + "M{} {}A{} {} 0 0 0 {} {}".format(
    P[0],
    P[1],
    r,
    r,
    Q[0],
    Q[1],
  ) );
  return p;
};
export var get_regular_polygon_cs = function (n) {
  var cs = [];
  var th0 = (2 * math.pi) / n;
  var start = -math.pi / 2;
  if (__mod__(n, 2) == 0) start += th0 / 2;
  for (var i = 0; i < n; i++) {
    var th = th0 * i + start;
    cs.push(tuple([math.cos(th), math.sin(th)]));
  }
  return cs;
};
export var svg_regular_polygon = function (number, frameR) {
  var funcName = svg_regular_polygon.name;
  var r = frameR;
  var R = frameR;
  var rr = R * 0.3;
  if (number == 3) var rr = R * 0.2;
  var sw = 1;
  var Rsw = (sw * 2 * frameR) / 300;
  var __left0__ = tuple([
    [-1, 1],
    [-1, 1],
  ]);
  var scx = __left0__[0];
  var scy = __left0__[1];
  var w = round(frameR * abs(scx[1] - scx[0]), 2);
  var h = round(frameR * abs(scy[1] - scy[0]), 2);
  var padding = 10;
  var d = draw.Drawing(
    w + 2 * padding,
    h + 2 * padding,
    __kwargtrans__({
      viewBox: tuple([
        round(frameR * scx[0] - padding, 2),
        round(frameR * scy[0] - padding, 2),
        w + 2 * padding,
        h + 2 * padding,
      ]),
      id: 'SVG-' + funcName,
      //origin: tuple([
      //  round(frameR * scx[0] - padding, 2),
      //  round(frameR * scy[0] - padding, 2),
      //]),
    }),
  );
  var cords = get_regular_polygon_cs(number);
  var pdesc = "M{} {}".format(r * cords[0][0], r * cords[0][1]);
  for (var i = 1; i < number; i++) {
    var e = cords[i];
    var xy = [r * e[0], r * e[1]];
    pdesc += "L{} {}".format(xy[0], xy[1]);
  }
  pdesc += "Z";
  d.append(
    draw.Path(
      __kwargtrans__({
        fill: "none",
        stroke: "#FF5722",
        'stroke-width': sw,
        d: pdesc,
      }),
    ),
  );
  for (var i = 0; i < number; i++) {
    var e = cords[i];
    var xy = [r * e[0], r * e[1]];
    d.append(
      draw.Circle(
        ...xy,
        Rsw,
        __kwargtrans__({ fill: "#F44336", stroke: "none" }),
      ),
    );
  }
  d.append(
    draw.Circle(
      0,
      0,
      2 * Rsw,
      __kwargtrans__({ fill: "#F44336", stroke: "none" }),
    ),
  );
  var figname = "\u6b63{}\u89d2\u5f62".format(number);
  if (number == 3) var figname = "\u6b63\u4e09\u89d2\u5f62";
  else if (number == 4) var figname = "\u6b63\u65b9\u5f62";
  var g = draw.Group();
  g.append(
    draw.Text(
      figname,
      moji_size,
      0,
      -moji_size,
      __kwargtrans__({
        'text-anchor': "middle",
        'dominant-baseline': "middle",
        fill: "#263238",
      }),
    ),
  );
  g.setAttribute("font-family", 
      "'Times New Roman', 'Hiragino Mincho ProN', 'Yu Mincho', 'MS PMincho', 'Noto Serif CJK JP', 'Noto Serif JP', serif" );
  g.setAttribute("font-weight", 800);
  d.append(g);
  if (__mod__(number, 2) == 0) {
    var j = Math.floor(number / 2);
    var i = j - 1;
    var th1 = -90 + (360 / number) * (0.5 + j);
  } else {
    var i = Math.floor(number / 2);
    var j = i + 1;
    var th1 = -90 + (360 / number) * j;
  }
  d.append(
    draw.Path(
      __kwargtrans__({
        fill: "none",
        stroke: "#009688",
        'stroke-width': sw / 2,
        d: "M{} {} L0 0 {} {}".format(
          r * cords[i][0],
          r * cords[i][1],
          r * cords[j][0],
          r * cords[j][1],
        ),
      }),
    ),
  );
  var p = point_yajirushi(rr, -360 / number, th1, rr / 5, 4, 0, 0, "#009688");
  d.append(p);
  var cstr_y = get_center_y(number, r, rr, moji_size);
  if (cstr_y < 0) {
    var cstr_y = (rr - cstr_y) / 2;
    g.append(
      draw.Text(
        "\u4e2d\u5fc3\u89d2",
        moji_size,
        r / 2,
        cstr_y,
        __kwargtrans__({
          'text-anchor': "middle",
          'dominant-baseline': "middle",
          fill: "#263238",
        }),
      ),
    );
    d.append(
      draw.Path(
        __kwargtrans__({
          fill: "none",
          stroke: "#009688",
          'stroke-width': sw / 2,
          d: "M0 {} V{} H{}".format(rr, cstr_y, r / 2 - moji_size * 1.5),
        }),
      ),
    );
  } else {
    g.append(
      draw.Text(
        "\u4e2d\u5fc3\u89d2",
        moji_size,
        0,
        cstr_y,
        __kwargtrans__({
          'text-anchor': "middle",
          'dominant-baseline': "middle",
          fill: "#263238",
        }),
      ),
    );
    d.append(
      draw.Path(
        __kwargtrans__({
          fill: "none",
          stroke: "#009688",
          'stroke-width': sw / 2,
          d: "M0 {} V{}".format(rr, cstr_y - moji_size * 0.8),
        }),
      ),
    );
  }
  return d;
};

export var get_result = function (th, h, s) {
  var x0 = Math.pow(s, 2);
  var x1 = math.cos(th);
  var x2 = x0 * x1;
  var x3 = Math.pow(h, 2) * Math.pow(x1, 2);
  var x4 = math.sqrt(2) * math.sqrt(x0 + x2 - 2 * x3);
  var x5 = 1 / 2 / (x1 + 1);
  var x6 = math.sin(th);
  return tuple([
    x5 * (h * math.sin(2 * th) + x1 * x4 + x4),
    x5 * x6 * (2 * h * x6 + math.sqrt(2 * x0 + 2 * x2 - 4 * x3)),
  ]);
};
export var get_result_loop = function (moji_size, degree, rr, R) {
  var h = moji_size / 2;
  var _s = rr * 1.1;
  var th = (degree / 180) * math.pi;
  for (var i = 0; i < 100; i++) {
    var s = _s + i;
    var p = get_result(th, h, s);
    if (p[1] - h > 0) {
      //print("\u5782\u7dda\u306e\u8db3\u306e\u9577\u3055:", p[1] - h);
      var n2 = p[0] * math.sin(th) - (p[1] + h) * math.cos(th);
      //print("leg n2:", n2);
      return tuple([p[0] + moji_size, p[1]]);
    }
    if (p[0] + 4 * h > R) break;
  }
  var p_orig = get_result(th, h, _s);
  return tuple([p_orig[0] + moji_size, -h]);
};
export var svg_interior_exterior = function (number, frameR) {
  var funcName = svg_interior_exterior.name;
  var vertices = [];
  var r = frameR;
  var R = frameR;
  var rr = R * 0.4;
  var sw = (frameR / 100) * 2;
  var Rsw = sw;
  var g = draw.Group();
  var rint = ((180 - 360 / number) / 180) * math.pi;
  var __left0__ = tuple([math.cos(rint), math.sin(rint)]);
  var icos = __left0__[0];
  var isin = __left0__[1];
  var rext = (360 / number / 180) * math.pi;
  var __left0__ = tuple([math.cos(rext), math.sin(rext)]);
  var ecos = __left0__[0];
  var esin = __left0__[1];
  g.append(
    draw.Path(
      __kwargtrans__({
        fill: "none",
        stroke: "#009688",
        'stroke-width': sw / 2,
        d: "M{} {}H{}".format(0, 0, R),
      }),
    ),
  );
  g.append(
    draw.Path(
      __kwargtrans__({
        fill: "none",
        stroke: "#FF5722",
        'stroke-width': sw,
        d: "M{} {}H{}L{} {}".format(-R, 0, 0, R * ecos, -R * esin),
      }),
    ),
  );
  g.append(
    draw.Circle(-R, 0, 3, __kwargtrans__({ fill: "#E91E63", stroke: "none" })),
  );
  g.append(
    draw.Circle(0, 0, 3, __kwargtrans__({ fill: "#E91E63", stroke: "none" })),
  );
  g.append(
    draw.Circle(
      R * ecos,
      -R * esin,
      3,
      __kwargtrans__({ fill: "#E91E63", stroke: "none" }),
    ),
  );
  var exterior = 360 / number;
  var interior = 180 - 360 / number;
  var p = point_yajirushi(rr, -interior, -exterior, rr / 5, 2, 0, 0);
  g.append(p);
  vertices.push([R, 0]);
  vertices.push([-R, 0]);
  vertices.push([R * ecos, -R * esin]);
  var txtx = rr * math.cos((interior / 2 / 180) * math.pi);
  var txty = rr * math.sin((interior / 2 / 180) * math.pi);
  g.append(
    draw.Text(
      "\u5185\u89d2",
      moji_size,
      -txtx - moji_size,
      -txty - moji_size / 2,
      __kwargtrans__({
        'text-anchor': "middle",
        'dominant-baseline': "middle",
        fill: "#263238",
      }),
    ),
  );
  vertices.push([
    -txtx - moji_size - moji_size,
    -txty - moji_size / 2 - moji_size / 2,
  ]);
  vertices.push([
    -txtx - moji_size + moji_size,
    -txty - moji_size / 2 - moji_size / 2,
  ]);
  var etxtx = rr * math.cos((exterior / 2 / 180) * math.pi);
  var etxty = rr * math.sin((exterior / 2 / 180) * math.pi);
  var __left0__ = get_result_loop(moji_size, exterior, rr, frameR);
  var o_tx = __left0__[0];
  var o_ty = __left0__[1];
  if (o_ty < 0) {
    var p = point_yajirushi(rr * 1.5, -exterior, 0, rr / 5, 2, 0, 0, "#009688");
    g.append(p);
    g.append(
      draw.Path(
        __kwargtrans__({
          fill: "none",
          stroke: "#009688",
          'stroke-width': sw / 2,
          d: "M{} {}H{}V{}".format(
            etxtx * 1.5,
            -etxty * 1.5,
            0.7 * R,
            moji_size * 0.7,
          ),
        }),
      ),
    );
    g.append(
      draw.Text(
        "\u5916\u89d2",
        moji_size,
        0.7 * R,
        moji_size * 1.6,
        __kwargtrans__({
          'text-anchor': "middle",
          'dominant-baseline': "middle",
          fill: "#263238",
        }),
      ),
    );
    vertices.push([0.7 * R - moji_size, moji_size * 1.6 + moji_size / 2]);
    vertices.push([0.7 * R + moji_size, moji_size * 1.6 + moji_size / 2]);
  } else {
    var p = point_yajirushi(rr, -exterior, 0, rr / 5, 2, 0, 0, "#009688");
    g.append(p);
    g.append(
      draw.Text(
        "\u5916\u89d2",
        moji_size,
        o_tx,
        -o_ty,
        __kwargtrans__({
          'text-anchor': "middle",
          'dominant-baseline': "central",
          fill: "#263238",
        }),
      ),
    );
    vertices.push([o_tx - moji_size, -o_ty - moji_size / 2]);
    vertices.push([o_tx + moji_size, -o_ty - moji_size / 2]);
  }
  var __left0__ = tuple([
    [0, 0],
    [0, 0],
  ]);
  var scx = __left0__[0];
  var scy = __left0__[1];
  for (var v of vertices) {
    var __left0__ = v;
    var vx = __left0__[0];
    var vy = __left0__[1];
    scx[0] = min(scx[0], vx / frameR);
    scx[1] = max(scx[1], vx / frameR);
    scy[0] = min(scy[0], vy / frameR);
    scy[1] = max(scy[1], vy / frameR);
  }
  //print(scx, scy);
  var w = round(frameR * abs(scx[1] - scx[0]), 2);
  var h = round(frameR * abs(scy[1] - scy[0]), 2);
  var padding = 15;
  var d = draw.Drawing(
    w + 2 * padding,
    h + 2 * padding,
    __kwargtrans__({
      viewBox: tuple([
        round(frameR * scx[0] - padding, 2),
        round(frameR * scy[0] - padding, 2),
        w + 2 * padding,
        h + 2 * padding,
      ]),
      id: 'SVG-' + funcName,
      //origin: tuple([
      //  round(frameR * scx[0] - padding, 2),
      //  round(frameR * scy[0] - padding, 2),
      //]),
    }),
  );
  d.append(g);
  g.setAttribute(["font-family"] ,
    "'Times New Roman', 'Hiragino Mincho ProN', 'Yu Mincho', 'MS PMincho', 'Noto Serif CJK JP', 'Noto Serif JP', serif" );
  g.setAttribute(["font-weight"] , 800);
  return d;
};
export var number = 60;
export var frameR = 100;
export var moji_size = 32;
export var svg = svg_regular_polygon(number, frameR);
//svg.set_pixel_scale(1);
export var svg_angle = svg_interior_exterior(number, frameR);
//svg_angle.set_pixel_scale(1);

//# sourceMappingURL=regularPolygons_InteriorEexteriorAngles.map
