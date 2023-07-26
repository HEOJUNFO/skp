(function() {
  "use strict";
  var pg = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}
    , ZC = {};
  (function() {
      var Y;
      function s(C) {
          var Q = 0;
          return function() {
              return Q < C.length ? {
                  done: !1,
                  value: C[Q++]
              } : {
                  done: !0
              }
          }
      }
      var o = typeof Object.defineProperties == "function" ? Object.defineProperty : function(C, Q, E) {
          return C == Array.prototype || C == Object.prototype || (C[Q] = E.value),
          C
      }
      ;
      function H(C) {
          C = [typeof globalThis == "object" && globalThis, C, typeof window == "object" && window, typeof self == "object" && self, typeof pg == "object" && pg];
          for (var Q = 0; Q < C.length; ++Q) {
              var E = C[Q];
              if (E && E.Math == Math)
                  return E
          }
          throw Error("Cannot find global object")
      }
      var l = H(this);
      function n(C, Q) {
          if (Q)
              A: {
                  var E = l;
                  C = C.split(".");
                  for (var R = 0; R < C.length - 1; R++) {
                      var h = C[R];
                      if (!(h in E))
                          break A;
                      E = E[h]
                  }
                  C = C[C.length - 1],
                  R = E[C],
                  Q = Q(R),
                  Q != R && Q != null && o(E, C, {
                      configurable: !0,
                      writable: !0,
                      value: Q
                  })
              }
      }
      n("Symbol", function(C) {
          function Q(M) {
              if (this instanceof Q)
                  throw new TypeError("Symbol is not a constructor");
              return new E(R + (M || "") + "_" + h++,M)
          }
          function E(M, K) {
              this.g = M,
              o(this, "description", {
                  configurable: !0,
                  writable: !0,
                  value: K
              })
          }
          if (C)
              return C;
          E.prototype.toString = function() {
              return this.g
          }
          ;
          var R = "jscomp_symbol_" + (1e9 * Math.random() >>> 0) + "_"
            , h = 0;
          return Q
      }),
      n("Symbol.iterator", function(C) {
          if (C)
              return C;
          C = Symbol("Symbol.iterator");
          for (var Q = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), E = 0; E < Q.length; E++) {
              var R = l[Q[E]];
              typeof R == "function" && typeof R.prototype[C] != "function" && o(R.prototype, C, {
                  configurable: !0,
                  writable: !0,
                  value: function() {
                      return Z(s(this))
                  }
              })
          }
          return C
      });
      function Z(C) {
          return C = {
              next: C
          },
          C[Symbol.iterator] = function() {
              return this
          }
          ,
          C
      }
      function V(C) {
          var Q = typeof Symbol < "u" && Symbol.iterator && C[Symbol.iterator];
          return Q ? Q.call(C) : {
              next: s(C)
          }
      }
      function gA(C) {
          if (!(C instanceof Array)) {
              C = V(C);
              for (var Q, E = []; !(Q = C.next()).done; )
                  E.push(Q.value);
              C = E
          }
          return C
      }
      var b = typeof Object.create == "function" ? Object.create : function(C) {
          function Q() {}
          return Q.prototype = C,
          new Q
      }
      , u;
      if (typeof Object.setPrototypeOf == "function")
          u = Object.setPrototypeOf;
      else {
          var NA;
          A: {
              var _ = {
                  a: !0
              }
                , rA = {};
              try {
                  rA.__proto__ = _,
                  NA = rA.a;
                  break A
              } catch {}
              NA = !1
          }
          u = NA ? function(C, Q) {
              if (C.__proto__ = Q,
              C.__proto__ !== Q)
                  throw new TypeError(C + " is not extensible");
              return C
          }
          : null
      }
      var yA = u;
      function nA(C, Q) {
          if (C.prototype = b(Q.prototype),
          C.prototype.constructor = C,
          yA)
              yA(C, Q);
          else
              for (var E in Q)
                  if (E != "prototype")
                      if (Object.defineProperties) {
                          var R = Object.getOwnPropertyDescriptor(Q, E);
                          R && Object.defineProperty(C, E, R)
                      } else
                          C[E] = Q[E];
          C.ea = Q.prototype
      }
      function fA() {
          this.l = !1,
          this.i = null,
          this.h = void 0,
          this.g = 1,
          this.s = this.m = 0,
          this.j = null
      }
      function _A(C) {
          if (C.l)
              throw new TypeError("Generator is already running");
          C.l = !0
      }
      fA.prototype.o = function(C) {
          this.h = C
      }
      ;
      function q(C, Q) {
          C.j = {
              U: Q,
              V: !0
          },
          C.g = C.m || C.s
      }
      fA.prototype.return = function(C) {
          this.j = {
              return: C
          },
          this.g = this.s
      }
      ;
      function x(C, Q, E) {
          return C.g = E,
          {
              value: Q
          }
      }
      function FA(C) {
          this.g = new fA,
          this.h = C
      }
      function ZI(C, Q) {
          _A(C.g);
          var E = C.g.i;
          return E ? CI(C, "return"in E ? E.return : function(R) {
              return {
                  value: R,
                  done: !0
              }
          }
          , Q, C.g.return) : (C.g.return(Q),
          HA(C))
      }
      function CI(C, Q, E, R) {
          try {
              var h = Q.call(C.g.i, E);
              if (!(h instanceof Object))
                  throw new TypeError("Iterator result " + h + " is not an object");
              if (!h.done)
                  return C.g.l = !1,
                  h;
              var M = h.value
          } catch (K) {
              return C.g.i = null,
              q(C.g, K),
              HA(C)
          }
          return C.g.i = null,
          R.call(C.g, M),
          HA(C)
      }
      function HA(C) {
          for (; C.g.g; )
              try {
                  var Q = C.h(C.g);
                  if (Q)
                      return C.g.l = !1,
                      {
                          value: Q.value,
                          done: !1
                      }
              } catch (E) {
                  C.g.h = void 0,
                  q(C.g, E)
              }
          if (C.g.l = !1,
          C.g.j) {
              if (Q = C.g.j,
              C.g.j = null,
              Q.V)
                  throw Q.U;
              return {
                  value: Q.return,
                  done: !0
              }
          }
          return {
              value: void 0,
              done: !0
          }
      }
      function iI(C) {
          this.next = function(Q) {
              return _A(C.g),
              C.g.i ? Q = CI(C, C.g.i.next, Q, C.g.o) : (C.g.o(Q),
              Q = HA(C)),
              Q
          }
          ,
          this.throw = function(Q) {
              return _A(C.g),
              C.g.i ? Q = CI(C, C.g.i.throw, Q, C.g.o) : (q(C.g, Q),
              Q = HA(C)),
              Q
          }
          ,
          this.return = function(Q) {
              return ZI(C, Q)
          }
          ,
          this[Symbol.iterator] = function() {
              return this
          }
      }
      function tA(C, Q) {
          return Q = new iI(new FA(Q)),
          yA && C.prototype && yA(Q, C.prototype),
          Q
      }
      function MA(C, Q) {
          C instanceof String && (C += "");
          var E = 0
            , R = !1
            , h = {
              next: function() {
                  if (!R && E < C.length) {
                      var M = E++;
                      return {
                          value: Q(M, C[M]),
                          done: !1
                      }
                  }
                  return R = !0,
                  {
                      done: !0,
                      value: void 0
                  }
              }
          };
          return h[Symbol.iterator] = function() {
              return h
          }
          ,
          h
      }
      var lA = typeof Object.assign == "function" ? Object.assign : function(C, Q) {
          for (var E = 1; E < arguments.length; E++) {
              var R = arguments[E];
              if (R)
                  for (var h in R)
                      Object.prototype.hasOwnProperty.call(R, h) && (C[h] = R[h])
          }
          return C
      }
      ;
      n("Object.assign", function(C) {
          return C || lA
      }),
      n("Promise", function(C) {
          function Q(K) {
              this.h = 0,
              this.i = void 0,
              this.g = [],
              this.o = !1;
              var k = this.j();
              try {
                  K(k.resolve, k.reject)
              } catch (L) {
                  k.reject(L)
              }
          }
          function E() {
              this.g = null
          }
          function R(K) {
              return K instanceof Q ? K : new Q(function(k) {
                  k(K)
              }
              )
          }
          if (C)
              return C;
          E.prototype.h = function(K) {
              if (this.g == null) {
                  this.g = [];
                  var k = this;
                  this.i(function() {
                      k.l()
                  })
              }
              this.g.push(K)
          }
          ;
          var h = l.setTimeout;
          E.prototype.i = function(K) {
              h(K, 0)
          }
          ,
          E.prototype.l = function() {
              for (; this.g && this.g.length; ) {
                  var K = this.g;
                  this.g = [];
                  for (var k = 0; k < K.length; ++k) {
                      var L = K[k];
                      K[k] = null;
                      try {
                          L()
                      } catch (f) {
                          this.j(f)
                      }
                  }
              }
              this.g = null
          }
          ,
          E.prototype.j = function(K) {
              this.i(function() {
                  throw K
              })
          }
          ,
          Q.prototype.j = function() {
              function K(f) {
                  return function(m) {
                      L || (L = !0,
                      f.call(k, m))
                  }
              }
              var k = this
                , L = !1;
              return {
                  resolve: K(this.C),
                  reject: K(this.l)
              }
          }
          ,
          Q.prototype.C = function(K) {
              if (K === this)
                  this.l(new TypeError("A Promise cannot resolve to itself"));
              else if (K instanceof Q)
                  this.F(K);
              else {
                  A: switch (typeof K) {
                  case "object":
                      var k = K != null;
                      break A;
                  case "function":
                      k = !0;
                      break A;
                  default:
                      k = !1
                  }
                  k ? this.u(K) : this.m(K)
              }
          }
          ,
          Q.prototype.u = function(K) {
              var k = void 0;
              try {
                  k = K.then
              } catch (L) {
                  this.l(L);
                  return
              }
              typeof k == "function" ? this.G(k, K) : this.m(K)
          }
          ,
          Q.prototype.l = function(K) {
              this.s(2, K)
          }
          ,
          Q.prototype.m = function(K) {
              this.s(1, K)
          }
          ,
          Q.prototype.s = function(K, k) {
              if (this.h != 0)
                  throw Error("Cannot settle(" + K + ", " + k + "): Promise already settled in state" + this.h);
              this.h = K,
              this.i = k,
              this.h === 2 && this.D(),
              this.A()
          }
          ,
          Q.prototype.D = function() {
              var K = this;
              h(function() {
                  if (K.B()) {
                      var k = l.console;
                      typeof k < "u" && k.error(K.i)
                  }
              }, 1)
          }
          ,
          Q.prototype.B = function() {
              if (this.o)
                  return !1;
              var K = l.CustomEvent
                , k = l.Event
                , L = l.dispatchEvent;
              return typeof L > "u" ? !0 : (typeof K == "function" ? K = new K("unhandledrejection",{
                  cancelable: !0
              }) : typeof k == "function" ? K = new k("unhandledrejection",{
                  cancelable: !0
              }) : (K = l.document.createEvent("CustomEvent"),
              K.initCustomEvent("unhandledrejection", !1, !0, K)),
              K.promise = this,
              K.reason = this.i,
              L(K))
          }
          ,
          Q.prototype.A = function() {
              if (this.g != null) {
                  for (var K = 0; K < this.g.length; ++K)
                      M.h(this.g[K]);
                  this.g = null
              }
          }
          ;
          var M = new E;
          return Q.prototype.F = function(K) {
              var k = this.j();
              K.J(k.resolve, k.reject)
          }
          ,
          Q.prototype.G = function(K, k) {
              var L = this.j();
              try {
                  K.call(k, L.resolve, L.reject)
              } catch (f) {
                  L.reject(f)
              }
          }
          ,
          Q.prototype.then = function(K, k) {
              function L(AA, X) {
                  return typeof AA == "function" ? function(W) {
                      try {
                          f(AA(W))
                      } catch (p) {
                          m(p)
                      }
                  }
                  : X
              }
              var f, m, RA = new Q(function(AA, X) {
                  f = AA,
                  m = X
              }
              );
              return this.J(L(K, f), L(k, m)),
              RA
          }
          ,
          Q.prototype.catch = function(K) {
              return this.then(void 0, K)
          }
          ,
          Q.prototype.J = function(K, k) {
              function L() {
                  switch (f.h) {
                  case 1:
                      K(f.i);
                      break;
                  case 2:
                      k(f.i);
                      break;
                  default:
                      throw Error("Unexpected state: " + f.h)
                  }
              }
              var f = this;
              this.g == null ? M.h(L) : this.g.push(L),
              this.o = !0
          }
          ,
          Q.resolve = R,
          Q.reject = function(K) {
              return new Q(function(k, L) {
                  L(K)
              }
              )
          }
          ,
          Q.race = function(K) {
              return new Q(function(k, L) {
                  for (var f = V(K), m = f.next(); !m.done; m = f.next())
                      R(m.value).J(k, L)
              }
              )
          }
          ,
          Q.all = function(K) {
              var k = V(K)
                , L = k.next();
              return L.done ? R([]) : new Q(function(f, m) {
                  function RA(W) {
                      return function(p) {
                          AA[W] = p,
                          X--,
                          X == 0 && f(AA)
                      }
                  }
                  var AA = []
                    , X = 0;
                  do
                      AA.push(void 0),
                      X++,
                      R(L.value).J(RA(AA.length - 1), m),
                      L = k.next();
                  while (!L.done)
              }
              )
          }
          ,
          Q
      }),
      n("Object.is", function(C) {
          return C || function(Q, E) {
              return Q === E ? Q !== 0 || 1 / Q === 1 / E : Q !== Q && E !== E
          }
      }),
      n("Array.prototype.includes", function(C) {
          return C || function(Q, E) {
              var R = this;
              R instanceof String && (R = String(R));
              var h = R.length;
              for (E = E || 0,
              0 > E && (E = Math.max(E + h, 0)); E < h; E++) {
                  var M = R[E];
                  if (M === Q || Object.is(M, Q))
                      return !0
              }
              return !1
          }
      }),
      n("String.prototype.includes", function(C) {
          return C || function(Q, E) {
              if (this == null)
                  throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");
              if (Q instanceof RegExp)
                  throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
              return this.indexOf(Q, E || 0) !== -1
          }
      }),
      n("Array.prototype.keys", function(C) {
          return C || function() {
              return MA(this, function(Q) {
                  return Q
              })
          }
      });
      var DI = this || self;
      function JA(C, Q) {
          C = C.split(".");
          var E = DI;
          C[0]in E || typeof E.execScript > "u" || E.execScript("var " + C[0]);
          for (var R; C.length && (R = C.shift()); )
              C.length || Q === void 0 ? E[R] && E[R] !== Object.prototype[R] ? E = E[R] : E = E[R] = {} : E[R] = Q
      }
      function tI(C, Q) {
          return Q = String.fromCharCode.apply(null, Q),
          C == null ? Q : C + Q
      }
      var TI, sg = typeof TextDecoder < "u", qI, hg = typeof TextEncoder < "u";
      function ag(C) {
          if (hg)
              C = (qI || (qI = new TextEncoder)).encode(C);
          else {
              var Q = void 0;
              Q = Q === void 0 ? !1 : Q;
              for (var E = 0, R = new Uint8Array(3 * C.length), h = 0; h < C.length; h++) {
                  var M = C.charCodeAt(h);
                  if (128 > M)
                      R[E++] = M;
                  else {
                      if (2048 > M)
                          R[E++] = M >> 6 | 192;
                      else {
                          if (55296 <= M && 57343 >= M) {
                              if (56319 >= M && h < C.length) {
                                  var K = C.charCodeAt(++h);
                                  if (56320 <= K && 57343 >= K) {
                                      M = 1024 * (M - 55296) + K - 56320 + 65536,
                                      R[E++] = M >> 18 | 240,
                                      R[E++] = M >> 12 & 63 | 128,
                                      R[E++] = M >> 6 & 63 | 128,
                                      R[E++] = M & 63 | 128;
                                      continue
                                  } else
                                      h--
                              }
                              if (Q)
                                  throw Error("Found an unpaired surrogate");
                              M = 65533
                          }
                          R[E++] = M >> 12 | 224,
                          R[E++] = M >> 6 & 63 | 128
                      }
                      R[E++] = M & 63 | 128
                  }
              }
              C = R.subarray(0, E)
          }
          return C
      }
      var yg = {}
        , rI = null;
      function vg(C, Q) {
          Q === void 0 && (Q = 0),
          Kg(),
          Q = yg[Q];
          for (var E = Array(Math.floor(C.length / 3)), R = Q[64] || "", h = 0, M = 0; h < C.length - 2; h += 3) {
              var K = C[h]
                , k = C[h + 1]
                , L = C[h + 2]
                , f = Q[K >> 2];
              K = Q[(K & 3) << 4 | k >> 4],
              k = Q[(k & 15) << 2 | L >> 6],
              L = Q[L & 63],
              E[M++] = f + K + k + L
          }
          switch (f = 0,
          L = R,
          C.length - h) {
          case 2:
              f = C[h + 1],
              L = Q[(f & 15) << 2] || R;
          case 1:
              C = C[h],
              E[M] = Q[C >> 2] + Q[(C & 3) << 4 | f >> 4] + L + R
          }
          return E.join("")
      }
      function _g(C) {
          var Q = C.length
            , E = 3 * Q / 4;
          E % 3 ? E = Math.floor(E) : "=.".indexOf(C[Q - 1]) != -1 && (E = "=.".indexOf(C[Q - 2]) != -1 ? E - 2 : E - 1);
          var R = new Uint8Array(E)
            , h = 0;
          return $g(C, function(M) {
              R[h++] = M
          }),
          R.subarray(0, h)
      }
      function $g(C, Q) {
          function E(L) {
              for (; R < C.length; ) {
                  var f = C.charAt(R++)
                    , m = rI[f];
                  if (m != null)
                      return m;
                  if (!/^[\s\xa0]*$/.test(f))
                      throw Error("Unknown base64 encoding at char: " + f)
              }
              return L
          }
          Kg();
          for (var R = 0; ; ) {
              var h = E(-1)
                , M = E(0)
                , K = E(64)
                , k = E(64);
              if (k === 64 && h === -1)
                  break;
              Q(h << 2 | M >> 4),
              K != 64 && (Q(M << 4 & 240 | K >> 2),
              k != 64 && Q(K << 6 & 192 | k))
          }
      }
      function Kg() {
          if (!rI) {
              rI = {};
              for (var C = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), Q = ["+/=", "+/", "-_=", "-_.", "-_"], E = 0; 5 > E; E++) {
                  var R = C.concat(Q[E].split(""));
                  yg[E] = R;
                  for (var h = 0; h < R.length; h++) {
                      var M = R[h];
                      rI[M] === void 0 && (rI[M] = h)
                  }
              }
          }
      }
      var AC = typeof Uint8Array.prototype.slice == "function", Ug;
      function eI(C, Q, E) {
          return Q === E ? Ug || (Ug = new Uint8Array(0)) : AC ? C.slice(Q, E) : new Uint8Array(C.subarray(Q, E))
      }
      var KA = 0
        , YA = 0;
      function pA(C, Q) {
          Q = Q === void 0 ? {} : Q,
          Q = Q.v === void 0 ? !1 : Q.v,
          this.h = null,
          this.g = this.j = this.l = 0,
          this.m = !1,
          this.v = Q,
          C && nI(this, C)
      }
      function nI(C, Q) {
          Q = Q.constructor === Uint8Array ? Q : Q.constructor === ArrayBuffer ? new Uint8Array(Q) : Q.constructor === Array ? new Uint8Array(Q) : Q.constructor === String ? _g(Q) : Q instanceof Uint8Array ? new Uint8Array(Q.buffer,Q.byteOffset,Q.byteLength) : new Uint8Array(0),
          C.h = Q,
          C.l = 0,
          C.j = C.h.length,
          C.g = C.l
      }
      pA.prototype.reset = function() {
          this.g = this.l
      }
      ;
      function d(C) {
          for (var Q = 128, E = 0, R = 0, h = 0; 4 > h && 128 <= Q; h++)
              Q = C.h[C.g++],
              E |= (Q & 127) << 7 * h;
          if (128 <= Q && (Q = C.h[C.g++],
          E |= (Q & 127) << 28,
          R |= (Q & 127) >> 4),
          128 <= Q)
              for (h = 0; 5 > h && 128 <= Q; h++)
                  Q = C.h[C.g++],
                  R |= (Q & 127) << 7 * h + 3;
          if (128 > Q)
              return C = E >>> 0,
              Q = R >>> 0,
              (R = Q & 2147483648) && (C = ~C + 1 >>> 0,
              Q = ~Q >>> 0,
              C == 0 && (Q = Q + 1 >>> 0)),
              C = 4294967296 * Q + (C >>> 0),
              R ? -C : C;
          C.m = !0
      }
      pA.prototype.i = function() {
          var C = this.h
            , Q = C[this.g]
            , E = Q & 127;
          return 128 > Q ? (this.g += 1,
          E) : (Q = C[this.g + 1],
          E |= (Q & 127) << 7,
          128 > Q ? (this.g += 2,
          E) : (Q = C[this.g + 2],
          E |= (Q & 127) << 14,
          128 > Q ? (this.g += 3,
          E) : (Q = C[this.g + 3],
          E |= (Q & 127) << 21,
          128 > Q ? (this.g += 4,
          E) : (Q = C[this.g + 4],
          E |= (Q & 15) << 28,
          128 > Q ? (this.g += 5,
          E >>> 0) : (this.g += 5,
          128 <= C[this.g++] && 128 <= C[this.g++] && 128 <= C[this.g++] && 128 <= C[this.g++] && this.g++,
          E)))))
      }
      ,
      pA.prototype.o = function() {
          var C = this.h[this.g]
            , Q = this.h[this.g + 1]
            , E = this.h[this.g + 2]
            , R = this.h[this.g + 3];
          return this.g += 4,
          E = (C << 0 | Q << 8 | E << 16 | R << 24) >>> 0,
          C = 2 * (E >> 31) + 1,
          Q = E >>> 23 & 255,
          E &= 8388607,
          Q == 255 ? E ? NaN : 1 / 0 * C : Q == 0 ? C * Math.pow(2, -149) * E : C * Math.pow(2, Q - 150) * (E + Math.pow(2, 23))
      }
      ;
      var OA = [];
      function lI() {
          this.g = new Uint8Array(64),
          this.h = 0
      }
      lI.prototype.push = function(C) {
          if (!(this.h + 1 < this.g.length)) {
              var Q = this.g;
              this.g = new Uint8Array(Math.ceil(1 + 2 * this.g.length)),
              this.g.set(Q)
          }
          this.g[this.h++] = C
      }
      ,
      lI.prototype.length = function() {
          return this.h
      }
      ,
      lI.prototype.end = function() {
          var C = this.g
            , Q = this.h;
          return this.h = 0,
          eI(C, 0, Q)
      }
      ;
      function $A(C, Q) {
          for (; 127 < Q; )
              C.push(Q & 127 | 128),
              Q >>>= 7;
          C.push(Q)
      }
      function KI(C) {
          var Q = {}
            , E = Q.N === void 0 ? !1 : Q.N;
          this.o = {
              v: Q.v === void 0 ? !1 : Q.v
          },
          this.N = E,
          Q = this.o,
          OA.length ? (E = OA.pop(),
          Q && (E.v = Q.v),
          C && nI(E, C),
          C = E) : C = new pA(C,Q),
          this.g = C,
          this.m = this.g.g,
          this.h = this.i = this.l = -1,
          this.j = !1
      }
      KI.prototype.reset = function() {
          this.g.reset(),
          this.h = this.l = -1
      }
      ;
      function mA(C) {
          var Q = C.g;
          if ((Q = Q.g == Q.j) || (Q = C.j) || (Q = C.g,
          Q = Q.m || 0 > Q.g || Q.g > Q.j),
          Q)
              return !1;
          C.m = C.g.g,
          Q = C.g.i();
          var E = Q & 7;
          return E != 0 && E != 5 && E != 1 && E != 2 && E != 3 && E != 4 ? (C.j = !0,
          !1) : (C.i = Q,
          C.l = Q >>> 3,
          C.h = E,
          !0)
      }
      function oI(C) {
          switch (C.h) {
          case 0:
              if (C.h != 0)
                  oI(C);
              else {
                  for (C = C.g; C.h[C.g] & 128; )
                      C.g++;
                  C.g++
              }
              break;
          case 1:
              C.h != 1 ? oI(C) : (C = C.g,
              C.g += 8);
              break;
          case 2:
              if (C.h != 2)
                  oI(C);
              else {
                  var Q = C.g.i();
                  C = C.g,
                  C.g += Q
              }
              break;
          case 5:
              C.h != 5 ? oI(C) : (C = C.g,
              C.g += 4);
              break;
          case 3:
              Q = C.l;
              do {
                  if (!mA(C)) {
                      C.j = !0;
                      break
                  }
                  if (C.h == 4) {
                      C.l != Q && (C.j = !0);
                      break
                  }
                  oI(C)
              } while (1);
              break;
          default:
              C.j = !0
          }
      }
      function dI(C, Q, E) {
          var R = C.g.j
            , h = C.g.i()
            , M = C.g.g + h;
          if (C.g.j = M,
          E(Q, C),
          E = M - C.g.g,
          E !== 0)
              throw Error("Message parsing ended unexpectedly. Expected to read " + h + " bytes, instead read " + (h - E) + " bytes, either the data ended unexpectedly or the message misreported its own length");
          return C.g.g = M,
          C.g.j = R,
          Q
      }
      function uA(C) {
          return C.g.o()
      }
      function vI(C) {
          var Q = C.g.i();
          C = C.g;
          var E = C.g;
          C.g += Q,
          C = C.h;
          var R;
          if (sg)
              (R = TI) || (R = TI = new TextDecoder("utf-8",{
                  fatal: !1
              })),
              R = R.decode(C.subarray(E, E + Q));
          else {
              Q = E + Q;
              for (var h = [], M = null, K, k, L; E < Q; )
                  K = C[E++],
                  128 > K ? h.push(K) : 224 > K ? E >= Q ? h.push(65533) : (k = C[E++],
                  194 > K || (k & 192) !== 128 ? (E--,
                  h.push(65533)) : h.push((K & 31) << 6 | k & 63)) : 240 > K ? E >= Q - 1 ? h.push(65533) : (k = C[E++],
                  (k & 192) !== 128 || K === 224 && 160 > k || K === 237 && 160 <= k || ((R = C[E++]) & 192) !== 128 ? (E--,
                  h.push(65533)) : h.push((K & 15) << 12 | (k & 63) << 6 | R & 63)) : 244 >= K ? E >= Q - 2 ? h.push(65533) : (k = C[E++],
                  (k & 192) !== 128 || (K << 28) + (k - 144) >> 30 || ((R = C[E++]) & 192) !== 128 || ((L = C[E++]) & 192) !== 128 ? (E--,
                  h.push(65533)) : (K = (K & 7) << 18 | (k & 63) << 12 | (R & 63) << 6 | L & 63,
                  K -= 65536,
                  h.push((K >> 10 & 1023) + 55296, (K & 1023) + 56320))) : h.push(65533),
                  8192 <= h.length && (M = tI(M, h),
                  h.length = 0);
              R = tI(M, h)
          }
          return R
      }
      function Mg(C, Q, E) {
          var R = C.g.i();
          for (R = C.g.g + R; C.g.g < R; )
              E.push(Q.call(C.g))
      }
      function kg(C, Q) {
          C.h == 2 ? Mg(C, pA.prototype.o, Q) : Q.push(uA(C))
      }
      function _I() {
          this.h = [],
          this.i = 0,
          this.g = new lI
      }
      function UI(C, Q) {
          Q.length !== 0 && (C.h.push(Q),
          C.i += Q.length)
      }
      function $I(C) {
          var Q = C.i + C.g.length();
          if (Q === 0)
              return new Uint8Array(0);
          Q = new Uint8Array(Q);
          for (var E = C.h, R = E.length, h = 0, M = 0; M < R; M++) {
              var K = E[M];
              K.length !== 0 && (Q.set(K, h),
              h += K.length)
          }
          return E = C.g,
          R = E.h,
          R !== 0 && (Q.set(E.g.subarray(0, R), h),
          E.h = 0),
          C.h = [Q],
          Q
      }
      function jA(C, Q, E) {
          if (E != null) {
              $A(C.g, 8 * Q + 5),
              C = C.g;
              var R = E;
              R = (E = 0 > R ? 1 : 0) ? -R : R,
              R === 0 ? 0 < 1 / R ? KA = YA = 0 : (YA = 0,
              KA = 2147483648) : isNaN(R) ? (YA = 0,
              KA = 2147483647) : 34028234663852886e22 < R ? (YA = 0,
              KA = (E << 31 | 2139095040) >>> 0) : 11754943508222875e-54 > R ? (R = Math.round(R / Math.pow(2, -149)),
              YA = 0,
              KA = (E << 31 | R) >>> 0) : (Q = Math.floor(Math.log(R) / Math.LN2),
              R *= Math.pow(2, -Q),
              R = Math.round(8388608 * R),
              16777216 <= R && ++Q,
              YA = 0,
              KA = (E << 31 | Q + 127 << 23 | R & 8388607) >>> 0),
              E = KA,
              C.push(E >>> 0 & 255),
              C.push(E >>> 8 & 255),
              C.push(E >>> 16 & 255),
              C.push(E >>> 24 & 255)
          }
      }
      var BI = typeof Uint8Array == "function";
      function MI(C, Q, E) {
          if (C != null)
              return typeof C == "object" ? BI && C instanceof Uint8Array ? E(C) : IC(C, Q, E) : Q(C)
      }
      function IC(C, Q, E) {
          if (Array.isArray(C)) {
              for (var R = Array(C.length), h = 0; h < C.length; h++)
                  R[h] = MI(C[h], Q, E);
              return Array.isArray(C) && C.W && cA(R),
              R
          }
          R = {};
          for (h in C)
              R[h] = MI(C[h], Q, E);
          return R
      }
      function mI(C) {
          return typeof C == "number" ? isFinite(C) ? C : String(C) : C
      }
      var fI = {
          W: {
              value: !0,
              configurable: !0
          }
      };
      function cA(C) {
          return Array.isArray(C) && !Object.isFrozen(C) && Object.defineProperties(C, fI),
          C
      }
      var Ag;
      function eA(C, Q, E) {
          var R = Ag;
          Ag = null,
          C || (C = R),
          R = this.constructor.ca,
          C || (C = R ? [R] : []),
          this.j = R ? 0 : -1,
          this.m = this.g = null,
          this.h = C;
          A: {
              if (R = this.h.length,
              C = R - 1,
              R && (R = this.h[C],
              !(R === null || typeof R != "object" || Array.isArray(R) || BI && R instanceof Uint8Array))) {
                  this.l = C - this.j,
                  this.i = R;
                  break A
              }
              Q !== void 0 && -1 < Q ? (this.l = Math.max(Q, C + 1 - this.j),
              this.i = null) : this.l = Number.MAX_VALUE
          }
          if (E)
              for (Q = 0; Q < E.length; Q++)
                  C = E[Q],
                  C < this.l ? (C += this.j,
                  (R = this.h[C]) ? cA(R) : this.h[C] = kI) : (Sg(this),
                  (R = this.i[C]) ? cA(R) : this.i[C] = kI)
      }
      var kI = Object.freeze(cA([]));
      function Sg(C) {
          var Q = C.l + C.j;
          C.h[Q] || (C.i = C.h[Q] = {})
      }
      function UA(C, Q, E) {
          return Q === -1 ? null : E !== void 0 && E || Q >= C.l ? C.i ? C.i[Q] : void 0 : C.h[Q + C.j]
      }
      function ZA(C, Q) {
          var E = E === void 0 ? !1 : E
            , R = UA(C, Q, E);
          return R == null && (R = kI),
          R === kI && (R = cA([]),
          T(C, Q, R, E)),
          R
      }
      function Ig(C) {
          var Q = ZA(C, 3);
          if (C.m || (C.m = {}),
          !C.m[3]) {
              for (var E = 0; E < Q.length; E++)
                  Q[E] = +Q[E];
              C.m[3] = !0
          }
          return Q
      }
      function GI(C, Q, E) {
          return C = UA(C, Q),
          C ?? E
      }
      function PA(C, Q, E) {
          return C = UA(C, Q),
          C = C == null ? C : +C,
          C ?? (E === void 0 ? 0 : E)
      }
      function T(C, Q, E, R) {
          R !== void 0 && R || Q >= C.l ? (Sg(C),
          C.i[Q] = E) : C.h[Q + C.j] = E
      }
      function zA(C, Q, E) {
          if (E === -1)
              return null;
          if (C.g || (C.g = {}),
          !C.g[E]) {
              var R = UA(C, E, !1);
              R && (C.g[E] = new Q(R))
          }
          return C.g[E]
      }
      function SI(C, Q) {
          C.g || (C.g = {});
          var E = C.g[1];
          if (!E) {
              var R = ZA(C, 1);
              E = [];
              for (var h = 0; h < R.length; h++)
                  E[h] = new Q(R[h]);
              C.g[1] = E
          }
          return E
      }
      function wI(C, Q, E) {
          var R = R === void 0 ? !1 : R;
          C.g || (C.g = {});
          var h = E && y(E);
          C.g[Q] = E,
          T(C, Q, h, R)
      }
      function Jg(C, Q, E, R) {
          var h = SI(C, E);
          Q = Q || new E,
          C = ZA(C, 1),
          R != null ? (h.splice(R, 0, Q),
          C.splice(R, 0, y(Q))) : (h.push(Q),
          C.push(y(Q)))
      }
      eA.prototype.toJSON = function() {
          var C = y(this);
          return IC(C, mI, vg)
      }
      ;
      function y(C, Q) {
          if (C.g)
              for (var E in C.g) {
                  var R = C.g[E];
                  if (Array.isArray(R))
                      for (var h = 0; h < R.length; h++)
                          R[h] && y(R[h]);
                  else
                      R && y(R)
              }
          return C.h
      }
      eA.prototype.toString = function() {
          return y(this).toString()
      }
      ;
      function JI(C, Q) {
          if (C = C.o) {
              UI(Q, Q.g.end());
              for (var E = 0; E < C.length; E++)
                  UI(Q, C[E])
          }
      }
      function kA(C, Q) {
          if (Q.h == 4)
              return !1;
          var E = Q.m;
          return oI(Q),
          Q.N || (Q = eI(Q.g.h, E, Q.g.g),
          (E = C.o) ? E.push(Q) : C.o = [Q]),
          !0
      }
      function FI(C) {
          eA.call(this, C, -1, gC)
      }
      nA(FI, eA),
      FI.prototype.getRows = function() {
          return UA(this, 1)
      }
      ,
      FI.prototype.getCols = function() {
          return UA(this, 2)
      }
      ,
      FI.prototype.getPackedDataList = function() {
          return Ig(this)
      }
      ,
      FI.prototype.getLayout = function() {
          return GI(this, 4, 0)
      }
      ;
      function JC(C, Q) {
          for (; mA(Q); )
              switch (Q.i) {
              case 8:
                  var E = Q.g.i();
                  T(C, 1, E);
                  break;
              case 16:
                  E = Q.g.i(),
                  T(C, 2, E);
                  break;
              case 29:
              case 26:
                  kg(Q, C.getPackedDataList());
                  break;
              case 32:
                  E = d(Q.g),
                  T(C, 4, E);
                  break;
              default:
                  if (!kA(C, Q))
                      return C
              }
          return C
      }
      var gC = [3];
      function WA(C, Q) {
          var E = void 0;
          return new (E || (E = Promise))(function(R, h) {
              function M(L) {
                  try {
                      k(Q.next(L))
                  } catch (f) {
                      h(f)
                  }
              }
              function K(L) {
                  try {
                      k(Q.throw(L))
                  } catch (f) {
                      h(f)
                  }
              }
              function k(L) {
                  L.done ? R(L.value) : new E(function(f) {
                      f(L.value)
                  }
                  ).then(M, K)
              }
              k((Q = Q.apply(C, void 0)).next())
          }
          )
      }
      function VI(C) {
          eA.call(this, C)
      }
      nA(VI, eA);
      function Yg(C, Q) {
          for (; mA(Q); )
              switch (Q.i) {
              case 8:
                  var E = Q.g.i();
                  T(C, 1, E);
                  break;
              case 21:
                  E = uA(Q),
                  T(C, 2, E);
                  break;
              case 26:
                  E = vI(Q),
                  T(C, 3, E);
                  break;
              case 34:
                  E = vI(Q),
                  T(C, 4, E);
                  break;
              default:
                  if (!kA(C, Q))
                      return C
              }
          return C
      }
      function oA(C) {
          eA.call(this, C, -1, CC)
      }
      nA(oA, eA),
      oA.prototype.addClassification = function(C, Q) {
          return Jg(this, C, VI, Q),
          this
      }
      ;
      var CC = [1];
      function TA(C) {
          eA.call(this, C)
      }
      nA(TA, eA);
      function RI(C, Q) {
          for (; mA(Q); )
              switch (Q.i) {
              case 13:
                  var E = uA(Q);
                  T(C, 1, E);
                  break;
              case 21:
                  E = uA(Q),
                  T(C, 2, E);
                  break;
              case 29:
                  E = uA(Q),
                  T(C, 3, E);
                  break;
              case 37:
                  E = uA(Q),
                  T(C, 4, E);
                  break;
              case 45:
                  E = uA(Q),
                  T(C, 5, E);
                  break;
              default:
                  if (!kA(C, Q))
                      return C
              }
          return C
      }
      function cg(C) {
          eA.call(this, C, -1, D)
      }
      nA(cg, eA);
      function O(C) {
          A: {
              var Q = new cg;
              for (C = new KI(C); mA(C); )
                  switch (C.i) {
                  case 10:
                      var E = dI(C, new TA, RI);
                      Jg(Q, E, TA, void 0);
                      break;
                  default:
                      if (!kA(Q, C))
                          break A
                  }
          }
          return Q
      }
      var D = [1];
      function SA(C) {
          eA.call(this, C)
      }
      nA(SA, eA);
      function NI(C) {
          eA.call(this, C, -1, QC)
      }
      nA(NI, eA),
      NI.prototype.getVertexType = function() {
          return GI(this, 1, 0)
      }
      ,
      NI.prototype.getPrimitiveType = function() {
          return GI(this, 2, 0)
      }
      ,
      NI.prototype.getVertexBufferList = function() {
          return Ig(this)
      }
      ,
      NI.prototype.getIndexBufferList = function() {
          return ZA(this, 4)
      }
      ;
      function BC(C, Q) {
          for (; mA(Q); )
              switch (Q.i) {
              case 8:
                  var E = d(Q.g);
                  T(C, 1, E);
                  break;
              case 16:
                  E = d(Q.g),
                  T(C, 2, E);
                  break;
              case 29:
              case 26:
                  kg(Q, C.getVertexBufferList());
                  break;
              case 32:
              case 34:
                  E = Q;
                  var R = C.getIndexBufferList();
                  E.h == 2 ? Mg(E, pA.prototype.i, R) : R.push(E.g.i());
                  break;
              default:
                  if (!kA(C, Q))
                      return C
              }
          return C
      }
      var QC = [3, 4];
      function sI(C) {
          eA.call(this, C)
      }
      nA(sI, eA),
      sI.prototype.getMesh = function() {
          return zA(this, NI, 1)
      }
      ,
      sI.prototype.getPoseTransformMatrix = function() {
          return zA(this, FI, 2)
      }
      ;
      function bI(C) {
          A: {
              var Q = new sI;
              for (C = new KI(C); mA(C); )
                  switch (C.i) {
                  case 10:
                      var E = dI(C, new NI, BC);
                      wI(Q, 1, E);
                      break;
                  case 18:
                      E = dI(C, new FI, JC),
                      wI(Q, 2, E);
                      break;
                  default:
                      if (!kA(Q, C))
                          break A
                  }
          }
          return Q
      }
      function hI(C, Q, E) {
          if (E = C.createShader(E === 0 ? C.VERTEX_SHADER : C.FRAGMENT_SHADER),
          C.shaderSource(E, Q),
          C.compileShader(E),
          !C.getShaderParameter(E, C.COMPILE_STATUS))
              throw Error(`Could not compile WebGL shader.

` + C.getShaderInfoLog(E));
          return E
      }
      function YI(C) {
          return SI(C, VI).map(function(Q) {
              return {
                  index: GI(Q, 1, 0),
                  Y: PA(Q, 2),
                  label: UA(Q, 3) != null ? GI(Q, 3, "") : void 0,
                  displayName: UA(Q, 4) != null ? GI(Q, 4, "") : void 0
              }
          })
      }
      function QI(C) {
          return {
              x: PA(C, 1),
              y: PA(C, 2),
              z: PA(C, 3),
              visibility: UA(C, 4) != null ? PA(C, 4) : void 0
          }
      }
      function cI(C, Q) {
          this.h = C,
          this.g = Q,
          this.l = 0
      }
      function Lg(C, Q, E) {
          return EC(C, Q),
          typeof C.g.canvas.transferToImageBitmap == "function" ? Promise.resolve(C.g.canvas.transferToImageBitmap()) : E ? Promise.resolve(C.g.canvas) : typeof createImageBitmap == "function" ? createImageBitmap(C.g.canvas) : (C.i === void 0 && (C.i = document.createElement("canvas")),
          new Promise(function(R) {
              C.i.height = C.g.canvas.height,
              C.i.width = C.g.canvas.width,
              C.i.getContext("2d", {}).drawImage(C.g.canvas, 0, 0, C.g.canvas.width, C.g.canvas.height),
              R(C.i)
          }
          ))
      }
      function EC(C, Q) {
          var E = C.g;
          if (C.m === void 0) {
              var R = hI(E, `
attribute vec2 aVertex;
attribute vec2 aTex;
varying vec2 vTex;
void main(void) {
  gl_Position = vec4(aVertex, 0.0, 1.0);
  vTex = aTex;
}`, 0)
                , h = hI(E, `
precision mediump float;
varying vec2 vTex;
uniform sampler2D sampler0;
void main(){
  gl_FragColor = texture2D(sampler0, vTex);
}`, 1)
                , M = E.createProgram();
              if (E.attachShader(M, R),
              E.attachShader(M, h),
              E.linkProgram(M),
              !E.getProgramParameter(M, E.LINK_STATUS))
                  throw Error(`Could not compile WebGL program.

` + E.getProgramInfoLog(M));
              R = C.m = M,
              E.useProgram(R),
              h = E.getUniformLocation(R, "sampler0"),
              C.j = {
                  I: E.getAttribLocation(R, "aVertex"),
                  H: E.getAttribLocation(R, "aTex"),
                  da: h
              },
              C.s = E.createBuffer(),
              E.bindBuffer(E.ARRAY_BUFFER, C.s),
              E.enableVertexAttribArray(C.j.I),
              E.vertexAttribPointer(C.j.I, 2, E.FLOAT, !1, 0, 0),
              E.bufferData(E.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), E.STATIC_DRAW),
              E.bindBuffer(E.ARRAY_BUFFER, null),
              C.o = E.createBuffer(),
              E.bindBuffer(E.ARRAY_BUFFER, C.o),
              E.enableVertexAttribArray(C.j.H),
              E.vertexAttribPointer(C.j.H, 2, E.FLOAT, !1, 0, 0),
              E.bufferData(E.ARRAY_BUFFER, new Float32Array([0, 1, 0, 0, 1, 0, 1, 1]), E.STATIC_DRAW),
              E.bindBuffer(E.ARRAY_BUFFER, null),
              E.uniform1i(h, 0)
          }
          R = C.j,
          E.useProgram(C.m),
          E.canvas.width = Q.width,
          E.canvas.height = Q.height,
          E.viewport(0, 0, Q.width, Q.height),
          E.activeTexture(E.TEXTURE0),
          C.h.bindTexture2d(Q.glName),
          E.enableVertexAttribArray(R.I),
          E.bindBuffer(E.ARRAY_BUFFER, C.s),
          E.vertexAttribPointer(R.I, 2, E.FLOAT, !1, 0, 0),
          E.enableVertexAttribArray(R.H),
          E.bindBuffer(E.ARRAY_BUFFER, C.o),
          E.vertexAttribPointer(R.H, 2, E.FLOAT, !1, 0, 0),
          E.bindFramebuffer(E.DRAW_FRAMEBUFFER ? E.DRAW_FRAMEBUFFER : E.FRAMEBUFFER, null),
          E.clearColor(0, 0, 0, 0),
          E.clear(E.COLOR_BUFFER_BIT),
          E.colorMask(!0, !0, !0, !0),
          E.drawArrays(E.TRIANGLE_FAN, 0, 4),
          E.disableVertexAttribArray(R.I),
          E.disableVertexAttribArray(R.H),
          E.bindBuffer(E.ARRAY_BUFFER, null),
          C.h.bindTexture2d(0)
      }
      function XI(C) {
          this.g = C
      }
      var gg = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 4, 1, 96, 0, 0, 3, 2, 1, 0, 10, 9, 1, 7, 0, 65, 0, 253, 15, 26, 11]);
      function Cg(C, Q) {
          return Q + C
      }
      function Bg(C, Q) {
          window[C] = Q
      }
      function pI(C) {
          var Q = document.createElement("script");
          return Q.setAttribute("src", C),
          Q.setAttribute("crossorigin", "anonymous"),
          new Promise(function(E) {
              Q.addEventListener("load", function() {
                  E()
              }, !1),
              Q.addEventListener("error", function() {
                  E()
              }, !1),
              document.body.appendChild(Q)
          }
          )
      }
      function XA() {
          return WA(this, function C() {
              return tA(C, function(Q) {
                  switch (Q.g) {
                  case 1:
                      return Q.m = 2,
                      x(Q, WebAssembly.instantiate(gg), 4);
                  case 4:
                      Q.g = 3,
                      Q.m = 0;
                      break;
                  case 2:
                      return Q.m = 0,
                      Q.j = null,
                      Q.return(!1);
                  case 3:
                      return Q.return(!0)
                  }
              })
          })
      }
      function Qg(C) {
          if (this.g = C,
          this.listeners = {},
          this.j = {},
          this.F = {},
          this.m = {},
          this.s = {},
          this.G = this.o = this.R = !0,
          this.C = Promise.resolve(),
          this.P = "",
          this.B = {},
          this.locateFile = C && C.locateFile || Cg,
          typeof window == "object")
              var Q = window.location.pathname.toString().substring(0, window.location.pathname.toString().lastIndexOf("/")) + "/";
          else if (typeof location < "u")
              Q = location.pathname.toString().substring(0, location.pathname.toString().lastIndexOf("/")) + "/";
          else
              throw Error("solutions can only be loaded on a web page or in a web worker");
          if (this.S = Q,
          C.options) {
              Q = V(Object.keys(C.options));
              for (var E = Q.next(); !E.done; E = Q.next()) {
                  E = E.value;
                  var R = C.options[E].default;
                  R !== void 0 && (this.j[E] = typeof R == "function" ? R() : R)
              }
          }
      }
      Y = Qg.prototype,
      Y.close = function() {
          return this.i && this.i.delete(),
          Promise.resolve()
      }
      ;
      function OI(C, Q) {
          return C.g.files === void 0 ? [] : typeof C.g.files == "function" ? C.g.files(Q) : C.g.files
      }
      function iC(C) {
          return WA(C, function Q() {
              var E = this, R, h, M, K, k, L, f, m, RA, AA, X;
              return tA(Q, function(W) {
                  switch (W.g) {
                  case 1:
                      return R = E,
                      E.R ? (h = OI(E, E.j),
                      x(W, XA(), 2)) : W.return();
                  case 2:
                      if (M = W.h,
                      typeof window == "object")
                          return Bg("createMediapipeSolutionsWasm", {
                              locateFile: E.locateFile
                          }),
                          Bg("createMediapipeSolutionsPackedAssets", {
                              locateFile: E.locateFile
                          }),
                          L = h.filter(function(p) {
                              return p.data !== void 0
                          }),
                          f = h.filter(function(p) {
                              return p.data === void 0
                          }),
                          m = Promise.all(L.map(function(p) {
                              var $ = uI(R, p.url);
                              if (p.path !== void 0) {
                                  var CA = p.path;
                                  $ = $.then(function(dA) {
                                      return R.overrideFile(CA, dA),
                                      Promise.resolve(dA)
                                  })
                              }
                              return $
                          })),
                          RA = Promise.all(f.map(function(p) {
                              return p.simd === void 0 || p.simd && M || !p.simd && !M ? pI(R.locateFile(p.url, R.S)) : Promise.resolve()
                          })).then(function() {
                              return WA(R, function p() {
                                  var $, CA, dA = this;
                                  return tA(p, function(sA) {
                                      if (sA.g == 1)
                                          return $ = window.createMediapipeSolutionsWasm,
                                          CA = window.createMediapipeSolutionsPackedAssets,
                                          x(sA, $(CA), 2);
                                      dA.h = sA.h,
                                      sA.g = 0
                                  })
                              })
                          }),
                          AA = function() {
                              return WA(R, function p() {
                                  var $ = this;
                                  return tA(p, function(CA) {
                                      return $.g.graph && $.g.graph.url ? CA = x(CA, uI($, $.g.graph.url), 0) : (CA.g = 0,
                                      CA = void 0),
                                      CA
                                  })
                              })
                          }(),
                          x(W, Promise.all([RA, m, AA]), 7);
                      if (typeof importScripts != "function")
                          throw Error("solutions can only be loaded on a web page or in a web worker");
                      return K = h.filter(function(p) {
                          return p.simd === void 0 || p.simd && M || !p.simd && !M
                      }).map(function(p) {
                          return R.locateFile(p.url, R.S)
                      }),
                      importScripts.apply(null, gA(K)),
                      x(W, createMediapipeSolutionsWasm(Module), 6);
                  case 6:
                      E.h = W.h,
                      E.l = new OffscreenCanvas(1,1),
                      E.h.canvas = E.l,
                      k = E.h.GL.createContext(E.l, {
                          antialias: !1,
                          alpha: !1,
                          ba: typeof WebGL2RenderingContext < "u" ? 2 : 1
                      }),
                      E.h.GL.makeContextCurrent(k),
                      W.g = 4;
                      break;
                  case 7:
                      if (E.l = document.createElement("canvas"),
                      X = E.l.getContext("webgl2", {}),
                      !X && (X = E.l.getContext("webgl", {}),
                      !X))
                          return alert("Failed to create WebGL canvas context when passing video frame."),
                          W.return();
                      E.D = X,
                      E.h.canvas = E.l,
                      E.h.createContext(E.l, !0, !0, {});
                  case 4:
                      E.i = new E.h.SolutionWasm,
                      E.R = !1,
                      W.g = 0
                  }
              })
          })
      }
      function Eg(C) {
          return WA(C, function Q() {
              var E = this, R, h, M, K, k, L, f, m;
              return tA(Q, function(RA) {
                  if (RA.g == 1) {
                      if (E.g.graph && E.g.graph.url && E.P === E.g.graph.url)
                          return RA.return();
                      if (E.o = !0,
                      !E.g.graph || !E.g.graph.url) {
                          RA.g = 2;
                          return
                      }
                      return E.P = E.g.graph.url,
                      x(RA, uI(E, E.g.graph.url), 3)
                  }
                  for (RA.g != 2 && (R = RA.h,
                  E.i.loadGraph(R)),
                  h = V(Object.keys(E.B)),
                  M = h.next(); !M.done; M = h.next())
                      K = M.value,
                      E.i.overrideFile(K, E.B[K]);
                  if (E.B = {},
                  E.g.listeners)
                      for (k = V(E.g.listeners),
                      L = k.next(); !L.done; L = k.next())
                          f = L.value,
                          IA(E, f);
                  m = E.j,
                  E.j = {},
                  E.setOptions(m),
                  RA.g = 0
              })
          })
      }
      Y.reset = function() {
          return WA(this, function C() {
              var Q = this;
              return tA(C, function(E) {
                  Q.i && (Q.i.reset(),
                  Q.m = {},
                  Q.s = {}),
                  E.g = 0
              })
          })
      }
      ,
      Y.setOptions = function(C, Q) {
          var E = this;
          if (Q = Q || this.g.options) {
              for (var R = [], h = [], M = {}, K = V(Object.keys(C)), k = K.next(); !k.done; M = {
                  K: M.K,
                  L: M.L
              },
              k = K.next()) {
                  var L = k.value;
                  L in this.j && this.j[L] === C[L] || (this.j[L] = C[L],
                  k = Q[L],
                  k !== void 0 && (k.onChange && (M.K = k.onChange,
                  M.L = C[L],
                  R.push(function(f) {
                      return function() {
                          return WA(E, function m() {
                              var RA, AA = this;
                              return tA(m, function(X) {
                                  if (X.g == 1)
                                      return x(X, f.K(f.L), 2);
                                  RA = X.h,
                                  RA === !0 && (AA.o = !0),
                                  X.g = 0
                              })
                          })
                      }
                  }(M))),
                  k.graphOptionXref && (L = {
                      valueNumber: k.type === 1 ? C[L] : 0,
                      valueBoolean: k.type === 0 ? C[L] : !1,
                      valueString: k.type === 2 ? C[L] : ""
                  },
                  k = Object.assign(Object.assign(Object.assign({}, {
                      calculatorName: "",
                      calculatorIndex: 0
                  }), k.graphOptionXref), L),
                  h.push(k))))
              }
              (R.length !== 0 || h.length !== 0) && (this.o = !0,
              this.A = (this.A === void 0 ? [] : this.A).concat(h),
              this.u = (this.u === void 0 ? [] : this.u).concat(R))
          }
      }
      ;
      function DC(C) {
          return WA(C, function Q() {
              var E = this, R, h, M, K, k, L, f;
              return tA(Q, function(m) {
                  switch (m.g) {
                  case 1:
                      if (!E.o)
                          return m.return();
                      if (!E.u) {
                          m.g = 2;
                          break
                      }
                      R = V(E.u),
                      h = R.next();
                  case 3:
                      if (h.done) {
                          m.g = 5;
                          break
                      }
                      return M = h.value,
                      x(m, M(), 4);
                  case 4:
                      h = R.next(),
                      m.g = 3;
                      break;
                  case 5:
                      E.u = void 0;
                  case 2:
                      if (E.A) {
                          for (K = new E.h.GraphOptionChangeRequestList,
                          k = V(E.A),
                          L = k.next(); !L.done; L = k.next())
                              f = L.value,
                              K.push_back(f);
                          E.i.changeOptions(K),
                          K.delete(),
                          E.A = void 0
                      }
                      E.o = !1,
                      m.g = 0
                  }
              })
          })
      }
      Y.initialize = function() {
          return WA(this, function C() {
              var Q = this;
              return tA(C, function(E) {
                  return E.g == 1 ? x(E, iC(Q), 2) : E.g != 3 ? x(E, Eg(Q), 3) : x(E, DC(Q), 0)
              })
          })
      }
      ;
      function uI(C, Q) {
          return WA(C, function E() {
              var R = this, h, M;
              return tA(E, function(K) {
                  return Q in R.F ? K.return(R.F[Q]) : (h = R.locateFile(Q, ""),
                  M = fetch(h).then(function(k) {
                      return k.arrayBuffer()
                  }),
                  R.F[Q] = M,
                  K.return(M))
              })
          })
      }
      Y.overrideFile = function(C, Q) {
          this.i ? this.i.overrideFile(C, Q) : this.B[C] = Q
      }
      ,
      Y.clearOverriddenFiles = function() {
          this.B = {},
          this.i && this.i.clearOverriddenFiles()
      }
      ,
      Y.send = function(C, Q) {
          return WA(this, function E() {
              var R = this, h, M, K, k, L, f, m, RA, AA;
              return tA(E, function(X) {
                  switch (X.g) {
                  case 1:
                      return R.g.inputs ? (h = 1e3 * (Q ?? performance.now()),
                      x(X, R.C, 2)) : X.return();
                  case 2:
                      return x(X, R.initialize(), 3);
                  case 3:
                      for (M = new R.h.PacketDataList,
                      K = V(Object.keys(C)),
                      k = K.next(); !k.done; k = K.next())
                          if (L = k.value,
                          f = R.g.inputs[L]) {
                              A: {
                                  var W = R
                                    , p = C[L];
                                  switch (f.type) {
                                  case "video":
                                      var $ = W.m[f.stream];
                                      if ($ || ($ = new cI(W.h,W.D),
                                      W.m[f.stream] = $),
                                      W = $,
                                      W.l === 0 && (W.l = W.h.createTexture()),
                                      typeof HTMLVideoElement < "u" && p instanceof HTMLVideoElement) {
                                          var CA = p.videoWidth;
                                          $ = p.videoHeight
                                      } else
                                          typeof HTMLImageElement < "u" && p instanceof HTMLImageElement ? (CA = p.naturalWidth,
                                          $ = p.naturalHeight) : (CA = p.width,
                                          $ = p.height);
                                      $ = {
                                          glName: W.l,
                                          width: CA,
                                          height: $
                                      },
                                      CA = W.g,
                                      CA.canvas.width = $.width,
                                      CA.canvas.height = $.height,
                                      CA.activeTexture(CA.TEXTURE0),
                                      W.h.bindTexture2d(W.l),
                                      CA.texImage2D(CA.TEXTURE_2D, 0, CA.RGBA, CA.RGBA, CA.UNSIGNED_BYTE, p),
                                      W.h.bindTexture2d(0),
                                      W = $;
                                      break A;
                                  case "detections":
                                      for ($ = W.m[f.stream],
                                      $ || ($ = new XI(W.h),
                                      W.m[f.stream] = $),
                                      W = $,
                                      W.data || (W.data = new W.g.DetectionListData),
                                      W.data.reset(p.length),
                                      $ = 0; $ < p.length; ++$) {
                                          CA = p[$];
                                          var dA = W.data
                                            , sA = dA.setBoundingBox
                                            , VA = $
                                            , LA = CA.T
                                            , P = new SA;
                                          T(P, 1, LA.Z),
                                          T(P, 2, LA.$),
                                          T(P, 3, LA.height),
                                          T(P, 4, LA.width),
                                          T(P, 5, LA.rotation),
                                          T(P, 6, LA.X);
                                          var QA = LA = new _I;
                                          jA(QA, 1, UA(P, 1)),
                                          jA(QA, 2, UA(P, 2)),
                                          jA(QA, 3, UA(P, 3)),
                                          jA(QA, 4, UA(P, 4)),
                                          jA(QA, 5, UA(P, 5));
                                          var GA = UA(P, 6);
                                          if (GA != null && GA != null) {
                                              $A(QA.g, 48);
                                              var j = QA.g
                                                , EA = GA;
                                              GA = 0 > EA,
                                              EA = Math.abs(EA);
                                              var wA = EA >>> 0;
                                              for (EA = Math.floor((EA - wA) / 4294967296),
                                              EA >>>= 0,
                                              GA && (EA = ~EA >>> 0,
                                              wA = (~wA >>> 0) + 1,
                                              4294967295 < wA && (wA = 0,
                                              EA++,
                                              4294967295 < EA && (EA = 0))),
                                              KA = wA,
                                              YA = EA,
                                              GA = KA,
                                              wA = YA; 0 < wA || 127 < GA; )
                                                  j.push(GA & 127 | 128),
                                                  GA = (GA >>> 7 | wA << 25) >>> 0,
                                                  wA >>>= 7;
                                              j.push(GA)
                                          }
                                          if (JI(P, QA),
                                          LA = $I(LA),
                                          sA.call(dA, VA, LA),
                                          CA.O)
                                              for (dA = 0; dA < CA.O.length; ++dA)
                                                  P = CA.O[dA],
                                                  QA = !!P.visibility,
                                                  sA = W.data,
                                                  VA = sA.addNormalizedLandmark,
                                                  LA = $,
                                                  P = Object.assign(Object.assign({}, P), {
                                                      visibility: QA ? P.visibility : 0
                                                  }),
                                                  QA = new TA,
                                                  T(QA, 1, P.x),
                                                  T(QA, 2, P.y),
                                                  T(QA, 3, P.z),
                                                  P.visibility && T(QA, 4, P.visibility),
                                                  j = P = new _I,
                                                  jA(j, 1, UA(QA, 1)),
                                                  jA(j, 2, UA(QA, 2)),
                                                  jA(j, 3, UA(QA, 3)),
                                                  jA(j, 4, UA(QA, 4)),
                                                  jA(j, 5, UA(QA, 5)),
                                                  JI(QA, j),
                                                  P = $I(P),
                                                  VA.call(sA, LA, P);
                                          if (CA.M)
                                              for (dA = 0; dA < CA.M.length; ++dA) {
                                                  if (sA = W.data,
                                                  VA = sA.addClassification,
                                                  LA = $,
                                                  P = CA.M[dA],
                                                  QA = new VI,
                                                  T(QA, 2, P.Y),
                                                  P.index && T(QA, 1, P.index),
                                                  P.label && T(QA, 3, P.label),
                                                  P.displayName && T(QA, 4, P.displayName),
                                                  j = P = new _I,
                                                  wA = UA(QA, 1),
                                                  wA != null && wA != null)
                                                      if ($A(j.g, 8),
                                                      GA = j.g,
                                                      0 <= wA)
                                                          $A(GA, wA);
                                                      else {
                                                          for (EA = 0; 9 > EA; EA++)
                                                              GA.push(wA & 127 | 128),
                                                              wA >>= 7;
                                                          GA.push(1)
                                                      }
                                                  jA(j, 2, UA(QA, 2)),
                                                  GA = UA(QA, 3),
                                                  GA != null && (GA = ag(GA),
                                                  $A(j.g, 26),
                                                  $A(j.g, GA.length),
                                                  UI(j, j.g.end()),
                                                  UI(j, GA)),
                                                  GA = UA(QA, 4),
                                                  GA != null && (GA = ag(GA),
                                                  $A(j.g, 34),
                                                  $A(j.g, GA.length),
                                                  UI(j, j.g.end()),
                                                  UI(j, GA)),
                                                  JI(QA, j),
                                                  P = $I(P),
                                                  VA.call(sA, LA, P)
                                              }
                                      }
                                      W = W.data;
                                      break A;
                                  default:
                                      W = {}
                                  }
                              }
                              switch (m = W,
                              RA = f.stream,
                              f.type) {
                              case "video":
                                  M.pushTexture2d(Object.assign(Object.assign({}, m), {
                                      stream: RA,
                                      timestamp: h
                                  }));
                                  break;
                              case "detections":
                                  AA = m,
                                  AA.stream = RA,
                                  AA.timestamp = h,
                                  M.pushDetectionList(AA);
                                  break;
                              default:
                                  throw Error("Unknown input config type: '" + f.type + "'")
                              }
                          }
                      return R.i.send(M),
                      x(X, R.C, 4);
                  case 4:
                      M.delete(),
                      X.g = 0
                  }
              })
          })
      }
      ;
      function qA(C, Q, E) {
          return WA(C, function R() {
              var h, M, K, k, L, f, m = this, RA, AA, X, W, p, $, CA, dA;
              return tA(R, function(sA) {
                  switch (sA.g) {
                  case 1:
                      if (!E)
                          return sA.return(Q);
                      for (h = {},
                      M = 0,
                      K = V(Object.keys(E)),
                      k = K.next(); !k.done; k = K.next())
                          L = k.value,
                          f = E[L],
                          typeof f != "string" && f.type === "texture" && Q[f.stream] !== void 0 && ++M;
                      1 < M && (m.G = !1),
                      RA = V(Object.keys(E)),
                      k = RA.next();
                  case 2:
                      if (k.done) {
                          sA.g = 4;
                          break
                      }
                      if (AA = k.value,
                      X = E[AA],
                      typeof X == "string")
                          return CA = h,
                          dA = AA,
                          x(sA, LI(m, AA, Q[X]), 14);
                      if (W = Q[X.stream],
                      X.type === "detection_list") {
                          if (W) {
                              for (var VA = W.getRectList(), LA = W.getLandmarksList(), P = W.getClassificationsList(), QA = [], GA = 0; GA < VA.size(); ++GA) {
                                  var j = VA.get(GA);
                                  A: {
                                      var EA = new SA;
                                      for (j = new KI(j); mA(j); )
                                          switch (j.i) {
                                          case 13:
                                              var wA = uA(j);
                                              T(EA, 1, wA);
                                              break;
                                          case 21:
                                              wA = uA(j),
                                              T(EA, 2, wA);
                                              break;
                                          case 29:
                                              wA = uA(j),
                                              T(EA, 3, wA);
                                              break;
                                          case 37:
                                              wA = uA(j),
                                              T(EA, 4, wA);
                                              break;
                                          case 45:
                                              wA = uA(j),
                                              T(EA, 5, wA);
                                              break;
                                          case 48:
                                              wA = d(j.g),
                                              T(EA, 6, wA);
                                              break;
                                          default:
                                              if (!kA(EA, j))
                                                  break A
                                          }
                                  }
                                  EA = {
                                      Z: PA(EA, 1),
                                      $: PA(EA, 2),
                                      height: PA(EA, 3),
                                      width: PA(EA, 4),
                                      rotation: PA(EA, 5, 0),
                                      X: GI(EA, 6, 0)
                                  },
                                  j = SI(O(LA.get(GA)), TA).map(QI);
                                  var II = P.get(GA);
                                  A: for (wA = new oA,
                                  II = new KI(II); mA(II); )
                                      switch (II.i) {
                                      case 10:
                                          wA.addClassification(dI(II, new VI, Yg));
                                          break;
                                      default:
                                          if (!kA(wA, II))
                                              break A
                                      }
                                  EA = {
                                      T: EA,
                                      O: j,
                                      M: YI(wA)
                                  },
                                  QA.push(EA)
                              }
                              VA = QA
                          } else
                              VA = [];
                          h[AA] = VA,
                          sA.g = 7;
                          break
                      }
                      if (X.type === "proto_list") {
                          if (W) {
                              for (VA = Array(W.size()),
                              LA = 0; LA < W.size(); LA++)
                                  VA[LA] = W.get(LA);
                              W.delete()
                          } else
                              VA = [];
                          h[AA] = VA,
                          sA.g = 7;
                          break
                      }
                      if (W === void 0) {
                          sA.g = 3;
                          break
                      }
                      if (X.type === "float_list") {
                          h[AA] = W,
                          sA.g = 7;
                          break
                      }
                      if (X.type === "proto") {
                          h[AA] = W,
                          sA.g = 7;
                          break
                      }
                      if (X.type !== "texture")
                          throw Error("Unknown output config type: '" + X.type + "'");
                      return p = m.s[AA],
                      p || (p = new cI(m.h,m.D),
                      m.s[AA] = p),
                      x(sA, Lg(p, W, m.G), 13);
                  case 13:
                      $ = sA.h,
                      h[AA] = $;
                  case 7:
                      X.transform && h[AA] && (h[AA] = X.transform(h[AA])),
                      sA.g = 3;
                      break;
                  case 14:
                      CA[dA] = sA.h;
                  case 3:
                      k = RA.next(),
                      sA.g = 2;
                      break;
                  case 4:
                      return sA.return(h)
                  }
              })
          })
      }
      function LI(C, Q, E) {
          return WA(C, function R() {
              var h = this, M;
              return tA(R, function(K) {
                  return typeof E == "number" || E instanceof Uint8Array || E instanceof h.h.Uint8BlobList ? K.return(E) : E instanceof h.h.Texture2dDataOut ? (M = h.s[Q],
                  M || (M = new cI(h.h,h.D),
                  h.s[Q] = M),
                  K.return(Lg(M, E, h.G))) : K.return(void 0)
              })
          })
      }
      function IA(C, Q) {
          for (var E = Q.name || "$", R = [].concat(gA(Q.wants)), h = new C.h.StringList, M = V(Q.wants), K = M.next(); !K.done; K = M.next())
              h.push_back(K.value);
          M = C.h.PacketListener.implement({
              onResults: function(k) {
                  for (var L = {}, f = 0; f < Q.wants.length; ++f)
                      L[R[f]] = k.get(f);
                  var m = C.listeners[E];
                  m && (C.C = qA(C, L, Q.outs).then(function(RA) {
                      RA = m(RA);
                      for (var AA = 0; AA < Q.wants.length; ++AA) {
                          var X = L[R[AA]];
                          typeof X == "object" && X.hasOwnProperty && X.hasOwnProperty("delete") && X.delete()
                      }
                      RA && (C.C = RA)
                  }))
              }
          }),
          C.i.attachMultiListener(h, M),
          h.delete()
      }
      Y.onResults = function(C, Q) {
          this.listeners[Q || "$"] = C
      }
      ,
      JA("Solution", Qg),
      JA("OptionType", {
          BOOL: 0,
          NUMBER: 1,
          aa: 2,
          0: "BOOL",
          1: "NUMBER",
          2: "STRING"
      });
      function AI(C) {
          C = bI(C);
          var Q = C.getMesh();
          if (!Q)
              return C;
          var E = new Float32Array(Q.getVertexBufferList());
          Q.getVertexBufferList = function() {
              return E
          }
          ;
          var R = new Uint32Array(Q.getIndexBufferList());
          return Q.getIndexBufferList = function() {
              return R
          }
          ,
          C
      }
      var oC = {
          files: [{
              url: "face_mesh_solution_packed_assets_loader.js"
          }, {
              simd: !0,
              url: "face_mesh_solution_simd_wasm_bin.js"
          }, {
              simd: !1,
              url: "face_mesh_solution_wasm_bin.js"
          }],
          graph: {
              url: "face_mesh.binarypb"
          },
          listeners: [{
              wants: ["multi_face_geometry", "image_transformed", "multi_face_landmarks"],
              outs: {
                  image: "image_transformed",
                  multiFaceGeometry: {
                      type: "proto_list",
                      stream: "multi_face_geometry",
                      transform: function(C) {
                          return C.map(AI)
                      }
                  },
                  multiFaceLandmarks: {
                      type: "proto_list",
                      stream: "multi_face_landmarks",
                      transform: function(C) {
                          return C.map(function(Q) {
                              return SI(O(Q), TA).map(QI)
                          })
                      }
                  }
              }
          }],
          inputs: {
              image: {
                  type: "video",
                  stream: "input_frames_gpu"
              }
          },
          options: {
              useCpuInference: {
                  type: 0,
                  graphOptionXref: {
                      calculatorType: "InferenceCalculator",
                      fieldName: "use_cpu_inference"
                  },
                  default: "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform) || navigator.userAgent.includes("Mac") && "ontouchend"in document
              },
              enableFaceGeometry: {
                  type: 0,
                  graphOptionXref: {
                      calculatorName: "EnableFaceGeometryConstant",
                      calculatorType: "ConstantSidePacketCalculator",
                      fieldName: "bool_value"
                  }
              },
              selfieMode: {
                  type: 0,
                  graphOptionXref: {
                      calculatorType: "GlScalerCalculator",
                      calculatorIndex: 1,
                      fieldName: "flip_horizontal"
                  }
              },
              maxNumFaces: {
                  type: 1,
                  graphOptionXref: {
                      calculatorType: "ConstantSidePacketCalculator",
                      calculatorName: "ConstantSidePacketCalculatorNumFaces",
                      fieldName: "int_value"
                  }
              },
              refineLandmarks: {
                  type: 0,
                  graphOptionXref: {
                      calculatorType: "ConstantSidePacketCalculator",
                      calculatorName: "ConstantSidePacketCalculatorRefineLandmarks",
                      fieldName: "bool_value"
                  }
              },
              minDetectionConfidence: {
                  type: 1,
                  graphOptionXref: {
                      calculatorType: "TensorsToDetectionsCalculator",
                      calculatorName: "facelandmarkfrontgpu__facedetectionshortrangegpu__facedetectionshortrangecommon__TensorsToDetectionsCalculator",
                      fieldName: "min_score_thresh"
                  }
              },
              minTrackingConfidence: {
                  type: 1,
                  graphOptionXref: {
                      calculatorType: "ThresholdingCalculator",
                      calculatorName: "facelandmarkfrontgpu__facelandmarkgpu__ThresholdingCalculator",
                      fieldName: "threshold"
                  }
              },
              cameraNear: {
                  type: 1,
                  graphOptionXref: {
                      calculatorType: "FaceGeometryEnvGeneratorCalculator",
                      fieldName: "near"
                  }
              },
              cameraFar: {
                  type: 1,
                  graphOptionXref: {
                      calculatorType: "FaceGeometryEnvGeneratorCalculator",
                      fieldName: "far"
                  }
              },
              cameraVerticalFovDegrees: {
                  type: 1,
                  graphOptionXref: {
                      calculatorType: "FaceGeometryEnvGeneratorCalculator",
                      fieldName: "vertical_fov_degrees"
                  }
              }
          }
      }
        , Hg = [[61, 146], [146, 91], [91, 181], [181, 84], [84, 17], [17, 314], [314, 405], [405, 321], [321, 375], [375, 291], [61, 185], [185, 40], [40, 39], [39, 37], [37, 0], [0, 267], [267, 269], [269, 270], [270, 409], [409, 291], [78, 95], [95, 88], [88, 178], [178, 87], [87, 14], [14, 317], [317, 402], [402, 318], [318, 324], [324, 308], [78, 191], [191, 80], [80, 81], [81, 82], [82, 13], [13, 312], [312, 311], [311, 310], [310, 415], [415, 308]]
        , tg = [[263, 249], [249, 390], [390, 373], [373, 374], [374, 380], [380, 381], [381, 382], [382, 362], [263, 466], [466, 388], [388, 387], [387, 386], [386, 385], [385, 384], [384, 398], [398, 362]]
        , jI = [[276, 283], [283, 282], [282, 295], [295, 285], [300, 293], [293, 334], [334, 296], [296, 336]]
        , PI = [[33, 7], [7, 163], [163, 144], [144, 145], [145, 153], [153, 154], [154, 155], [155, 133], [33, 246], [246, 161], [161, 160], [160, 159], [159, 158], [158, 157], [157, 173], [173, 133]]
        , ig = [[46, 53], [53, 52], [52, 65], [65, 55], [70, 63], [63, 105], [105, 66], [66, 107]]
        , qg = [[10, 338], [338, 297], [297, 332], [332, 284], [284, 251], [251, 389], [389, 356], [356, 454], [454, 323], [323, 361], [361, 288], [288, 397], [397, 365], [365, 379], [379, 378], [378, 400], [400, 377], [377, 152], [152, 148], [148, 176], [176, 149], [149, 150], [150, 136], [136, 172], [172, 58], [58, 132], [132, 93], [93, 234], [234, 127], [127, 162], [162, 21], [21, 54], [54, 103], [103, 67], [67, 109], [109, 10]]
        , rg = [].concat(gA(Hg), gA(tg), gA(jI), gA(PI), gA(ig), gA(qg));
      function HI(C) {
          C = C || {},
          C = Object.assign(Object.assign({}, oC), C),
          this.g = new Qg(C)
      }
      Y = HI.prototype,
      Y.close = function() {
          return this.g.close(),
          Promise.resolve()
      }
      ,
      Y.onResults = function(C) {
          this.g.onResults(C)
      }
      ,
      Y.initialize = function() {
          return WA(this, function C() {
              var Q = this;
              return tA(C, function(E) {
                  return x(E, Q.g.initialize(), 0)
              })
          })
      }
      ,
      Y.reset = function() {
          this.g.reset()
      }
      ,
      Y.send = function(C) {
          return WA(this, function Q() {
              var E = this;
              return tA(Q, function(R) {
                  return x(R, E.g.send(C), 0)
              })
          })
      }
      ,
      Y.setOptions = function(C) {
          this.g.setOptions(C)
      }
      ,
      JA("FACE_GEOMETRY", {
          Layout: {
              COLUMN_MAJOR: 0,
              ROW_MAJOR: 1,
              0: "COLUMN_MAJOR",
              1: "ROW_MAJOR"
          },
          PrimitiveType: {
              TRIANGLE: 0,
              0: "TRIANGLE"
          },
          VertexType: {
              VERTEX_PT: 0,
              0: "VERTEX_PT"
          },
          DEFAULT_CAMERA_PARAMS: {
              verticalFovDegrees: 63,
              near: 1,
              far: 1e4
          }
      }),
      JA("FaceMesh", HI),
      JA("FACEMESH_LIPS", Hg),
      JA("FACEMESH_LEFT_EYE", tg),
      JA("FACEMESH_LEFT_EYEBROW", jI),
      JA("FACEMESH_LEFT_IRIS", [[474, 475], [475, 476], [476, 477], [477, 474]]),
      JA("FACEMESH_RIGHT_EYE", PI),
      JA("FACEMESH_RIGHT_EYEBROW", ig),
      JA("FACEMESH_RIGHT_IRIS", [[469, 470], [470, 471], [471, 472], [472, 469]]),
      JA("FACEMESH_FACE_OVAL", qg),
      JA("FACEMESH_CONTOURS", rg),
      JA("FACEMESH_TESSELATION", [[127, 34], [34, 139], [139, 127], [11, 0], [0, 37], [37, 11], [232, 231], [231, 120], [120, 232], [72, 37], [37, 39], [39, 72], [128, 121], [121, 47], [47, 128], [232, 121], [121, 128], [128, 232], [104, 69], [69, 67], [67, 104], [175, 171], [171, 148], [148, 175], [118, 50], [50, 101], [101, 118], [73, 39], [39, 40], [40, 73], [9, 151], [151, 108], [108, 9], [48, 115], [115, 131], [131, 48], [194, 204], [204, 211], [211, 194], [74, 40], [40, 185], [185, 74], [80, 42], [42, 183], [183, 80], [40, 92], [92, 186], [186, 40], [230, 229], [229, 118], [118, 230], [202, 212], [212, 214], [214, 202], [83, 18], [18, 17], [17, 83], [76, 61], [61, 146], [146, 76], [160, 29], [29, 30], [30, 160], [56, 157], [157, 173], [173, 56], [106, 204], [204, 194], [194, 106], [135, 214], [214, 192], [192, 135], [203, 165], [165, 98], [98, 203], [21, 71], [71, 68], [68, 21], [51, 45], [45, 4], [4, 51], [144, 24], [24, 23], [23, 144], [77, 146], [146, 91], [91, 77], [205, 50], [50, 187], [187, 205], [201, 200], [200, 18], [18, 201], [91, 106], [106, 182], [182, 91], [90, 91], [91, 181], [181, 90], [85, 84], [84, 17], [17, 85], [206, 203], [203, 36], [36, 206], [148, 171], [171, 140], [140, 148], [92, 40], [40, 39], [39, 92], [193, 189], [189, 244], [244, 193], [159, 158], [158, 28], [28, 159], [247, 246], [246, 161], [161, 247], [236, 3], [3, 196], [196, 236], [54, 68], [68, 104], [104, 54], [193, 168], [168, 8], [8, 193], [117, 228], [228, 31], [31, 117], [189, 193], [193, 55], [55, 189], [98, 97], [97, 99], [99, 98], [126, 47], [47, 100], [100, 126], [166, 79], [79, 218], [218, 166], [155, 154], [154, 26], [26, 155], [209, 49], [49, 131], [131, 209], [135, 136], [136, 150], [150, 135], [47, 126], [126, 217], [217, 47], [223, 52], [52, 53], [53, 223], [45, 51], [51, 134], [134, 45], [211, 170], [170, 140], [140, 211], [67, 69], [69, 108], [108, 67], [43, 106], [106, 91], [91, 43], [230, 119], [119, 120], [120, 230], [226, 130], [130, 247], [247, 226], [63, 53], [53, 52], [52, 63], [238, 20], [20, 242], [242, 238], [46, 70], [70, 156], [156, 46], [78, 62], [62, 96], [96, 78], [46, 53], [53, 63], [63, 46], [143, 34], [34, 227], [227, 143], [123, 117], [117, 111], [111, 123], [44, 125], [125, 19], [19, 44], [236, 134], [134, 51], [51, 236], [216, 206], [206, 205], [205, 216], [154, 153], [153, 22], [22, 154], [39, 37], [37, 167], [167, 39], [200, 201], [201, 208], [208, 200], [36, 142], [142, 100], [100, 36], [57, 212], [212, 202], [202, 57], [20, 60], [60, 99], [99, 20], [28, 158], [158, 157], [157, 28], [35, 226], [226, 113], [113, 35], [160, 159], [159, 27], [27, 160], [204, 202], [202, 210], [210, 204], [113, 225], [225, 46], [46, 113], [43, 202], [202, 204], [204, 43], [62, 76], [76, 77], [77, 62], [137, 123], [123, 116], [116, 137], [41, 38], [38, 72], [72, 41], [203, 129], [129, 142], [142, 203], [64, 98], [98, 240], [240, 64], [49, 102], [102, 64], [64, 49], [41, 73], [73, 74], [74, 41], [212, 216], [216, 207], [207, 212], [42, 74], [74, 184], [184, 42], [169, 170], [170, 211], [211, 169], [170, 149], [149, 176], [176, 170], [105, 66], [66, 69], [69, 105], [122, 6], [6, 168], [168, 122], [123, 147], [147, 187], [187, 123], [96, 77], [77, 90], [90, 96], [65, 55], [55, 107], [107, 65], [89, 90], [90, 180], [180, 89], [101, 100], [100, 120], [120, 101], [63, 105], [105, 104], [104, 63], [93, 137], [137, 227], [227, 93], [15, 86], [86, 85], [85, 15], [129, 102], [102, 49], [49, 129], [14, 87], [87, 86], [86, 14], [55, 8], [8, 9], [9, 55], [100, 47], [47, 121], [121, 100], [145, 23], [23, 22], [22, 145], [88, 89], [89, 179], [179, 88], [6, 122], [122, 196], [196, 6], [88, 95], [95, 96], [96, 88], [138, 172], [172, 136], [136, 138], [215, 58], [58, 172], [172, 215], [115, 48], [48, 219], [219, 115], [42, 80], [80, 81], [81, 42], [195, 3], [3, 51], [51, 195], [43, 146], [146, 61], [61, 43], [171, 175], [175, 199], [199, 171], [81, 82], [82, 38], [38, 81], [53, 46], [46, 225], [225, 53], [144, 163], [163, 110], [110, 144], [52, 65], [65, 66], [66, 52], [229, 228], [228, 117], [117, 229], [34, 127], [127, 234], [234, 34], [107, 108], [108, 69], [69, 107], [109, 108], [108, 151], [151, 109], [48, 64], [64, 235], [235, 48], [62, 78], [78, 191], [191, 62], [129, 209], [209, 126], [126, 129], [111, 35], [35, 143], [143, 111], [117, 123], [123, 50], [50, 117], [222, 65], [65, 52], [52, 222], [19, 125], [125, 141], [141, 19], [221, 55], [55, 65], [65, 221], [3, 195], [195, 197], [197, 3], [25, 7], [7, 33], [33, 25], [220, 237], [237, 44], [44, 220], [70, 71], [71, 139], [139, 70], [122, 193], [193, 245], [245, 122], [247, 130], [130, 33], [33, 247], [71, 21], [21, 162], [162, 71], [170, 169], [169, 150], [150, 170], [188, 174], [174, 196], [196, 188], [216, 186], [186, 92], [92, 216], [2, 97], [97, 167], [167, 2], [141, 125], [125, 241], [241, 141], [164, 167], [167, 37], [37, 164], [72, 38], [38, 12], [12, 72], [38, 82], [82, 13], [13, 38], [63, 68], [68, 71], [71, 63], [226, 35], [35, 111], [111, 226], [101, 50], [50, 205], [205, 101], [206, 92], [92, 165], [165, 206], [209, 198], [198, 217], [217, 209], [165, 167], [167, 97], [97, 165], [220, 115], [115, 218], [218, 220], [133, 112], [112, 243], [243, 133], [239, 238], [238, 241], [241, 239], [214, 135], [135, 169], [169, 214], [190, 173], [173, 133], [133, 190], [171, 208], [208, 32], [32, 171], [125, 44], [44, 237], [237, 125], [86, 87], [87, 178], [178, 86], [85, 86], [86, 179], [179, 85], [84, 85], [85, 180], [180, 84], [83, 84], [84, 181], [181, 83], [201, 83], [83, 182], [182, 201], [137, 93], [93, 132], [132, 137], [76, 62], [62, 183], [183, 76], [61, 76], [76, 184], [184, 61], [57, 61], [61, 185], [185, 57], [212, 57], [57, 186], [186, 212], [214, 207], [207, 187], [187, 214], [34, 143], [143, 156], [156, 34], [79, 239], [239, 237], [237, 79], [123, 137], [137, 177], [177, 123], [44, 1], [1, 4], [4, 44], [201, 194], [194, 32], [32, 201], [64, 102], [102, 129], [129, 64], [213, 215], [215, 138], [138, 213], [59, 166], [166, 219], [219, 59], [242, 99], [99, 97], [97, 242], [2, 94], [94, 141], [141, 2], [75, 59], [59, 235], [235, 75], [24, 110], [110, 228], [228, 24], [25, 130], [130, 226], [226, 25], [23, 24], [24, 229], [229, 23], [22, 23], [23, 230], [230, 22], [26, 22], [22, 231], [231, 26], [112, 26], [26, 232], [232, 112], [189, 190], [190, 243], [243, 189], [221, 56], [56, 190], [190, 221], [28, 56], [56, 221], [221, 28], [27, 28], [28, 222], [222, 27], [29, 27], [27, 223], [223, 29], [30, 29], [29, 224], [224, 30], [247, 30], [30, 225], [225, 247], [238, 79], [79, 20], [20, 238], [166, 59], [59, 75], [75, 166], [60, 75], [75, 240], [240, 60], [147, 177], [177, 215], [215, 147], [20, 79], [79, 166], [166, 20], [187, 147], [147, 213], [213, 187], [112, 233], [233, 244], [244, 112], [233, 128], [128, 245], [245, 233], [128, 114], [114, 188], [188, 128], [114, 217], [217, 174], [174, 114], [131, 115], [115, 220], [220, 131], [217, 198], [198, 236], [236, 217], [198, 131], [131, 134], [134, 198], [177, 132], [132, 58], [58, 177], [143, 35], [35, 124], [124, 143], [110, 163], [163, 7], [7, 110], [228, 110], [110, 25], [25, 228], [356, 389], [389, 368], [368, 356], [11, 302], [302, 267], [267, 11], [452, 350], [350, 349], [349, 452], [302, 303], [303, 269], [269, 302], [357, 343], [343, 277], [277, 357], [452, 453], [453, 357], [357, 452], [333, 332], [332, 297], [297, 333], [175, 152], [152, 377], [377, 175], [347, 348], [348, 330], [330, 347], [303, 304], [304, 270], [270, 303], [9, 336], [336, 337], [337, 9], [278, 279], [279, 360], [360, 278], [418, 262], [262, 431], [431, 418], [304, 408], [408, 409], [409, 304], [310, 415], [415, 407], [407, 310], [270, 409], [409, 410], [410, 270], [450, 348], [348, 347], [347, 450], [422, 430], [430, 434], [434, 422], [313, 314], [314, 17], [17, 313], [306, 307], [307, 375], [375, 306], [387, 388], [388, 260], [260, 387], [286, 414], [414, 398], [398, 286], [335, 406], [406, 418], [418, 335], [364, 367], [367, 416], [416, 364], [423, 358], [358, 327], [327, 423], [251, 284], [284, 298], [298, 251], [281, 5], [5, 4], [4, 281], [373, 374], [374, 253], [253, 373], [307, 320], [320, 321], [321, 307], [425, 427], [427, 411], [411, 425], [421, 313], [313, 18], [18, 421], [321, 405], [405, 406], [406, 321], [320, 404], [404, 405], [405, 320], [315, 16], [16, 17], [17, 315], [426, 425], [425, 266], [266, 426], [377, 400], [400, 369], [369, 377], [322, 391], [391, 269], [269, 322], [417, 465], [465, 464], [464, 417], [386, 257], [257, 258], [258, 386], [466, 260], [260, 388], [388, 466], [456, 399], [399, 419], [419, 456], [284, 332], [332, 333], [333, 284], [417, 285], [285, 8], [8, 417], [346, 340], [340, 261], [261, 346], [413, 441], [441, 285], [285, 413], [327, 460], [460, 328], [328, 327], [355, 371], [371, 329], [329, 355], [392, 439], [439, 438], [438, 392], [382, 341], [341, 256], [256, 382], [429, 420], [420, 360], [360, 429], [364, 394], [394, 379], [379, 364], [277, 343], [343, 437], [437, 277], [443, 444], [444, 283], [283, 443], [275, 440], [440, 363], [363, 275], [431, 262], [262, 369], [369, 431], [297, 338], [338, 337], [337, 297], [273, 375], [375, 321], [321, 273], [450, 451], [451, 349], [349, 450], [446, 342], [342, 467], [467, 446], [293, 334], [334, 282], [282, 293], [458, 461], [461, 462], [462, 458], [276, 353], [353, 383], [383, 276], [308, 324], [324, 325], [325, 308], [276, 300], [300, 293], [293, 276], [372, 345], [345, 447], [447, 372], [352, 345], [345, 340], [340, 352], [274, 1], [1, 19], [19, 274], [456, 248], [248, 281], [281, 456], [436, 427], [427, 425], [425, 436], [381, 256], [256, 252], [252, 381], [269, 391], [391, 393], [393, 269], [200, 199], [199, 428], [428, 200], [266, 330], [330, 329], [329, 266], [287, 273], [273, 422], [422, 287], [250, 462], [462, 328], [328, 250], [258, 286], [286, 384], [384, 258], [265, 353], [353, 342], [342, 265], [387, 259], [259, 257], [257, 387], [424, 431], [431, 430], [430, 424], [342, 353], [353, 276], [276, 342], [273, 335], [335, 424], [424, 273], [292, 325], [325, 307], [307, 292], [366, 447], [447, 345], [345, 366], [271, 303], [303, 302], [302, 271], [423, 266], [266, 371], [371, 423], [294, 455], [455, 460], [460, 294], [279, 278], [278, 294], [294, 279], [271, 272], [272, 304], [304, 271], [432, 434], [434, 427], [427, 432], [272, 407], [407, 408], [408, 272], [394, 430], [430, 431], [431, 394], [395, 369], [369, 400], [400, 395], [334, 333], [333, 299], [299, 334], [351, 417], [417, 168], [168, 351], [352, 280], [280, 411], [411, 352], [325, 319], [319, 320], [320, 325], [295, 296], [296, 336], [336, 295], [319, 403], [403, 404], [404, 319], [330, 348], [348, 349], [349, 330], [293, 298], [298, 333], [333, 293], [323, 454], [454, 447], [447, 323], [15, 16], [16, 315], [315, 15], [358, 429], [429, 279], [279, 358], [14, 15], [15, 316], [316, 14], [285, 336], [336, 9], [9, 285], [329, 349], [349, 350], [350, 329], [374, 380], [380, 252], [252, 374], [318, 402], [402, 403], [403, 318], [6, 197], [197, 419], [419, 6], [318, 319], [319, 325], [325, 318], [367, 364], [364, 365], [365, 367], [435, 367], [367, 397], [397, 435], [344, 438], [438, 439], [439, 344], [272, 271], [271, 311], [311, 272], [195, 5], [5, 281], [281, 195], [273, 287], [287, 291], [291, 273], [396, 428], [428, 199], [199, 396], [311, 271], [271, 268], [268, 311], [283, 444], [444, 445], [445, 283], [373, 254], [254, 339], [339, 373], [282, 334], [334, 296], [296, 282], [449, 347], [347, 346], [346, 449], [264, 447], [447, 454], [454, 264], [336, 296], [296, 299], [299, 336], [338, 10], [10, 151], [151, 338], [278, 439], [439, 455], [455, 278], [292, 407], [407, 415], [415, 292], [358, 371], [371, 355], [355, 358], [340, 345], [345, 372], [372, 340], [346, 347], [347, 280], [280, 346], [442, 443], [443, 282], [282, 442], [19, 94], [94, 370], [370, 19], [441, 442], [442, 295], [295, 441], [248, 419], [419, 197], [197, 248], [263, 255], [255, 359], [359, 263], [440, 275], [275, 274], [274, 440], [300, 383], [383, 368], [368, 300], [351, 412], [412, 465], [465, 351], [263, 467], [467, 466], [466, 263], [301, 368], [368, 389], [389, 301], [395, 378], [378, 379], [379, 395], [412, 351], [351, 419], [419, 412], [436, 426], [426, 322], [322, 436], [2, 164], [164, 393], [393, 2], [370, 462], [462, 461], [461, 370], [164, 0], [0, 267], [267, 164], [302, 11], [11, 12], [12, 302], [268, 12], [12, 13], [13, 268], [293, 300], [300, 301], [301, 293], [446, 261], [261, 340], [340, 446], [330, 266], [266, 425], [425, 330], [426, 423], [423, 391], [391, 426], [429, 355], [355, 437], [437, 429], [391, 327], [327, 326], [326, 391], [440, 457], [457, 438], [438, 440], [341, 382], [382, 362], [362, 341], [459, 457], [457, 461], [461, 459], [434, 430], [430, 394], [394, 434], [414, 463], [463, 362], [362, 414], [396, 369], [369, 262], [262, 396], [354, 461], [461, 457], [457, 354], [316, 403], [403, 402], [402, 316], [315, 404], [404, 403], [403, 315], [314, 405], [405, 404], [404, 314], [313, 406], [406, 405], [405, 313], [421, 418], [418, 406], [406, 421], [366, 401], [401, 361], [361, 366], [306, 408], [408, 407], [407, 306], [291, 409], [409, 408], [408, 291], [287, 410], [410, 409], [409, 287], [432, 436], [436, 410], [410, 432], [434, 416], [416, 411], [411, 434], [264, 368], [368, 383], [383, 264], [309, 438], [438, 457], [457, 309], [352, 376], [376, 401], [401, 352], [274, 275], [275, 4], [4, 274], [421, 428], [428, 262], [262, 421], [294, 327], [327, 358], [358, 294], [433, 416], [416, 367], [367, 433], [289, 455], [455, 439], [439, 289], [462, 370], [370, 326], [326, 462], [2, 326], [326, 370], [370, 2], [305, 460], [460, 455], [455, 305], [254, 449], [449, 448], [448, 254], [255, 261], [261, 446], [446, 255], [253, 450], [450, 449], [449, 253], [252, 451], [451, 450], [450, 252], [256, 452], [452, 451], [451, 256], [341, 453], [453, 452], [452, 341], [413, 464], [464, 463], [463, 413], [441, 413], [413, 414], [414, 441], [258, 442], [442, 441], [441, 258], [257, 443], [443, 442], [442, 257], [259, 444], [444, 443], [443, 259], [260, 445], [445, 444], [444, 260], [467, 342], [342, 445], [445, 467], [459, 458], [458, 250], [250, 459], [289, 392], [392, 290], [290, 289], [290, 328], [328, 460], [460, 290], [376, 433], [433, 435], [435, 376], [250, 290], [290, 392], [392, 250], [411, 416], [416, 433], [433, 411], [341, 463], [463, 464], [464, 341], [453, 464], [464, 465], [465, 453], [357, 465], [465, 412], [412, 357], [343, 412], [412, 399], [399, 343], [360, 363], [363, 440], [440, 360], [437, 399], [399, 456], [456, 437], [420, 456], [456, 363], [363, 420], [401, 435], [435, 288], [288, 401], [372, 383], [383, 353], [353, 372], [339, 255], [255, 249], [249, 339], [448, 261], [261, 255], [255, 448], [133, 243], [243, 190], [190, 133], [133, 155], [155, 112], [112, 133], [33, 246], [246, 247], [247, 33], [33, 130], [130, 25], [25, 33], [398, 384], [384, 286], [286, 398], [362, 398], [398, 414], [414, 362], [362, 463], [463, 341], [341, 362], [263, 359], [359, 467], [467, 263], [263, 249], [249, 255], [255, 263], [466, 467], [467, 260], [260, 466], [75, 60], [60, 166], [166, 75], [238, 239], [239, 79], [79, 238], [162, 127], [127, 139], [139, 162], [72, 11], [11, 37], [37, 72], [121, 232], [232, 120], [120, 121], [73, 72], [72, 39], [39, 73], [114, 128], [128, 47], [47, 114], [233, 232], [232, 128], [128, 233], [103, 104], [104, 67], [67, 103], [152, 175], [175, 148], [148, 152], [119, 118], [118, 101], [101, 119], [74, 73], [73, 40], [40, 74], [107, 9], [9, 108], [108, 107], [49, 48], [48, 131], [131, 49], [32, 194], [194, 211], [211, 32], [184, 74], [74, 185], [185, 184], [191, 80], [80, 183], [183, 191], [185, 40], [40, 186], [186, 185], [119, 230], [230, 118], [118, 119], [210, 202], [202, 214], [214, 210], [84, 83], [83, 17], [17, 84], [77, 76], [76, 146], [146, 77], [161, 160], [160, 30], [30, 161], [190, 56], [56, 173], [173, 190], [182, 106], [106, 194], [194, 182], [138, 135], [135, 192], [192, 138], [129, 203], [203, 98], [98, 129], [54, 21], [21, 68], [68, 54], [5, 51], [51, 4], [4, 5], [145, 144], [144, 23], [23, 145], [90, 77], [77, 91], [91, 90], [207, 205], [205, 187], [187, 207], [83, 201], [201, 18], [18, 83], [181, 91], [91, 182], [182, 181], [180, 90], [90, 181], [181, 180], [16, 85], [85, 17], [17, 16], [205, 206], [206, 36], [36, 205], [176, 148], [148, 140], [140, 176], [165, 92], [92, 39], [39, 165], [245, 193], [193, 244], [244, 245], [27, 159], [159, 28], [28, 27], [30, 247], [247, 161], [161, 30], [174, 236], [236, 196], [196, 174], [103, 54], [54, 104], [104, 103], [55, 193], [193, 8], [8, 55], [111, 117], [117, 31], [31, 111], [221, 189], [189, 55], [55, 221], [240, 98], [98, 99], [99, 240], [142, 126], [126, 100], [100, 142], [219, 166], [166, 218], [218, 219], [112, 155], [155, 26], [26, 112], [198, 209], [209, 131], [131, 198], [169, 135], [135, 150], [150, 169], [114, 47], [47, 217], [217, 114], [224, 223], [223, 53], [53, 224], [220, 45], [45, 134], [134, 220], [32, 211], [211, 140], [140, 32], [109, 67], [67, 108], [108, 109], [146, 43], [43, 91], [91, 146], [231, 230], [230, 120], [120, 231], [113, 226], [226, 247], [247, 113], [105, 63], [63, 52], [52, 105], [241, 238], [238, 242], [242, 241], [124, 46], [46, 156], [156, 124], [95, 78], [78, 96], [96, 95], [70, 46], [46, 63], [63, 70], [116, 143], [143, 227], [227, 116], [116, 123], [123, 111], [111, 116], [1, 44], [44, 19], [19, 1], [3, 236], [236, 51], [51, 3], [207, 216], [216, 205], [205, 207], [26, 154], [154, 22], [22, 26], [165, 39], [39, 167], [167, 165], [199, 200], [200, 208], [208, 199], [101, 36], [36, 100], [100, 101], [43, 57], [57, 202], [202, 43], [242, 20], [20, 99], [99, 242], [56, 28], [28, 157], [157, 56], [124, 35], [35, 113], [113, 124], [29, 160], [160, 27], [27, 29], [211, 204], [204, 210], [210, 211], [124, 113], [113, 46], [46, 124], [106, 43], [43, 204], [204, 106], [96, 62], [62, 77], [77, 96], [227, 137], [137, 116], [116, 227], [73, 41], [41, 72], [72, 73], [36, 203], [203, 142], [142, 36], [235, 64], [64, 240], [240, 235], [48, 49], [49, 64], [64, 48], [42, 41], [41, 74], [74, 42], [214, 212], [212, 207], [207, 214], [183, 42], [42, 184], [184, 183], [210, 169], [169, 211], [211, 210], [140, 170], [170, 176], [176, 140], [104, 105], [105, 69], [69, 104], [193, 122], [122, 168], [168, 193], [50, 123], [123, 187], [187, 50], [89, 96], [96, 90], [90, 89], [66, 65], [65, 107], [107, 66], [179, 89], [89, 180], [180, 179], [119, 101], [101, 120], [120, 119], [68, 63], [63, 104], [104, 68], [234, 93], [93, 227], [227, 234], [16, 15], [15, 85], [85, 16], [209, 129], [129, 49], [49, 209], [15, 14], [14, 86], [86, 15], [107, 55], [55, 9], [9, 107], [120, 100], [100, 121], [121, 120], [153, 145], [145, 22], [22, 153], [178, 88], [88, 179], [179, 178], [197, 6], [6, 196], [196, 197], [89, 88], [88, 96], [96, 89], [135, 138], [138, 136], [136, 135], [138, 215], [215, 172], [172, 138], [218, 115], [115, 219], [219, 218], [41, 42], [42, 81], [81, 41], [5, 195], [195, 51], [51, 5], [57, 43], [43, 61], [61, 57], [208, 171], [171, 199], [199, 208], [41, 81], [81, 38], [38, 41], [224, 53], [53, 225], [225, 224], [24, 144], [144, 110], [110, 24], [105, 52], [52, 66], [66, 105], [118, 229], [229, 117], [117, 118], [227, 34], [34, 234], [234, 227], [66, 107], [107, 69], [69, 66], [10, 109], [109, 151], [151, 10], [219, 48], [48, 235], [235, 219], [183, 62], [62, 191], [191, 183], [142, 129], [129, 126], [126, 142], [116, 111], [111, 143], [143, 116], [118, 117], [117, 50], [50, 118], [223, 222], [222, 52], [52, 223], [94, 19], [19, 141], [141, 94], [222, 221], [221, 65], [65, 222], [196, 3], [3, 197], [197, 196], [45, 220], [220, 44], [44, 45], [156, 70], [70, 139], [139, 156], [188, 122], [122, 245], [245, 188], [139, 71], [71, 162], [162, 139], [149, 170], [170, 150], [150, 149], [122, 188], [188, 196], [196, 122], [206, 216], [216, 92], [92, 206], [164, 2], [2, 167], [167, 164], [242, 141], [141, 241], [241, 242], [0, 164], [164, 37], [37, 0], [11, 72], [72, 12], [12, 11], [12, 38], [38, 13], [13, 12], [70, 63], [63, 71], [71, 70], [31, 226], [226, 111], [111, 31], [36, 101], [101, 205], [205, 36], [203, 206], [206, 165], [165, 203], [126, 209], [209, 217], [217, 126], [98, 165], [165, 97], [97, 98], [237, 220], [220, 218], [218, 237], [237, 239], [239, 241], [241, 237], [210, 214], [214, 169], [169, 210], [140, 171], [171, 32], [32, 140], [241, 125], [125, 237], [237, 241], [179, 86], [86, 178], [178, 179], [180, 85], [85, 179], [179, 180], [181, 84], [84, 180], [180, 181], [182, 83], [83, 181], [181, 182], [194, 201], [201, 182], [182, 194], [177, 137], [137, 132], [132, 177], [184, 76], [76, 183], [183, 184], [185, 61], [61, 184], [184, 185], [186, 57], [57, 185], [185, 186], [216, 212], [212, 186], [186, 216], [192, 214], [214, 187], [187, 192], [139, 34], [34, 156], [156, 139], [218, 79], [79, 237], [237, 218], [147, 123], [123, 177], [177, 147], [45, 44], [44, 4], [4, 45], [208, 201], [201, 32], [32, 208], [98, 64], [64, 129], [129, 98], [192, 213], [213, 138], [138, 192], [235, 59], [59, 219], [219, 235], [141, 242], [242, 97], [97, 141], [97, 2], [2, 141], [141, 97], [240, 75], [75, 235], [235, 240], [229, 24], [24, 228], [228, 229], [31, 25], [25, 226], [226, 31], [230, 23], [23, 229], [229, 230], [231, 22], [22, 230], [230, 231], [232, 26], [26, 231], [231, 232], [233, 112], [112, 232], [232, 233], [244, 189], [189, 243], [243, 244], [189, 221], [221, 190], [190, 189], [222, 28], [28, 221], [221, 222], [223, 27], [27, 222], [222, 223], [224, 29], [29, 223], [223, 224], [225, 30], [30, 224], [224, 225], [113, 247], [247, 225], [225, 113], [99, 60], [60, 240], [240, 99], [213, 147], [147, 215], [215, 213], [60, 20], [20, 166], [166, 60], [192, 187], [187, 213], [213, 192], [243, 112], [112, 244], [244, 243], [244, 233], [233, 245], [245, 244], [245, 128], [128, 188], [188, 245], [188, 114], [114, 174], [174, 188], [134, 131], [131, 220], [220, 134], [174, 217], [217, 236], [236, 174], [236, 198], [198, 134], [134, 236], [215, 177], [177, 58], [58, 215], [156, 143], [143, 124], [124, 156], [25, 110], [110, 7], [7, 25], [31, 228], [228, 25], [25, 31], [264, 356], [356, 368], [368, 264], [0, 11], [11, 267], [267, 0], [451, 452], [452, 349], [349, 451], [267, 302], [302, 269], [269, 267], [350, 357], [357, 277], [277, 350], [350, 452], [452, 357], [357, 350], [299, 333], [333, 297], [297, 299], [396, 175], [175, 377], [377, 396], [280, 347], [347, 330], [330, 280], [269, 303], [303, 270], [270, 269], [151, 9], [9, 337], [337, 151], [344, 278], [278, 360], [360, 344], [424, 418], [418, 431], [431, 424], [270, 304], [304, 409], [409, 270], [272, 310], [310, 407], [407, 272], [322, 270], [270, 410], [410, 322], [449, 450], [450, 347], [347, 449], [432, 422], [422, 434], [434, 432], [18, 313], [313, 17], [17, 18], [291, 306], [306, 375], [375, 291], [259, 387], [387, 260], [260, 259], [424, 335], [335, 418], [418, 424], [434, 364], [364, 416], [416, 434], [391, 423], [423, 327], [327, 391], [301, 251], [251, 298], [298, 301], [275, 281], [281, 4], [4, 275], [254, 373], [373, 253], [253, 254], [375, 307], [307, 321], [321, 375], [280, 425], [425, 411], [411, 280], [200, 421], [421, 18], [18, 200], [335, 321], [321, 406], [406, 335], [321, 320], [320, 405], [405, 321], [314, 315], [315, 17], [17, 314], [423, 426], [426, 266], [266, 423], [396, 377], [377, 369], [369, 396], [270, 322], [322, 269], [269, 270], [413, 417], [417, 464], [464, 413], [385, 386], [386, 258], [258, 385], [248, 456], [456, 419], [419, 248], [298, 284], [284, 333], [333, 298], [168, 417], [417, 8], [8, 168], [448, 346], [346, 261], [261, 448], [417, 413], [413, 285], [285, 417], [326, 327], [327, 328], [328, 326], [277, 355], [355, 329], [329, 277], [309, 392], [392, 438], [438, 309], [381, 382], [382, 256], [256, 381], [279, 429], [429, 360], [360, 279], [365, 364], [364, 379], [379, 365], [355, 277], [277, 437], [437, 355], [282, 443], [443, 283], [283, 282], [281, 275], [275, 363], [363, 281], [395, 431], [431, 369], [369, 395], [299, 297], [297, 337], [337, 299], [335, 273], [273, 321], [321, 335], [348, 450], [450, 349], [349, 348], [359, 446], [446, 467], [467, 359], [283, 293], [293, 282], [282, 283], [250, 458], [458, 462], [462, 250], [300, 276], [276, 383], [383, 300], [292, 308], [308, 325], [325, 292], [283, 276], [276, 293], [293, 283], [264, 372], [372, 447], [447, 264], [346, 352], [352, 340], [340, 346], [354, 274], [274, 19], [19, 354], [363, 456], [456, 281], [281, 363], [426, 436], [436, 425], [425, 426], [380, 381], [381, 252], [252, 380], [267, 269], [269, 393], [393, 267], [421, 200], [200, 428], [428, 421], [371, 266], [266, 329], [329, 371], [432, 287], [287, 422], [422, 432], [290, 250], [250, 328], [328, 290], [385, 258], [258, 384], [384, 385], [446, 265], [265, 342], [342, 446], [386, 387], [387, 257], [257, 386], [422, 424], [424, 430], [430, 422], [445, 342], [342, 276], [276, 445], [422, 273], [273, 424], [424, 422], [306, 292], [292, 307], [307, 306], [352, 366], [366, 345], [345, 352], [268, 271], [271, 302], [302, 268], [358, 423], [423, 371], [371, 358], [327, 294], [294, 460], [460, 327], [331, 279], [279, 294], [294, 331], [303, 271], [271, 304], [304, 303], [436, 432], [432, 427], [427, 436], [304, 272], [272, 408], [408, 304], [395, 394], [394, 431], [431, 395], [378, 395], [395, 400], [400, 378], [296, 334], [334, 299], [299, 296], [6, 351], [351, 168], [168, 6], [376, 352], [352, 411], [411, 376], [307, 325], [325, 320], [320, 307], [285, 295], [295, 336], [336, 285], [320, 319], [319, 404], [404, 320], [329, 330], [330, 349], [349, 329], [334, 293], [293, 333], [333, 334], [366, 323], [323, 447], [447, 366], [316, 15], [15, 315], [315, 316], [331, 358], [358, 279], [279, 331], [317, 14], [14, 316], [316, 317], [8, 285], [285, 9], [9, 8], [277, 329], [329, 350], [350, 277], [253, 374], [374, 252], [252, 253], [319, 318], [318, 403], [403, 319], [351, 6], [6, 419], [419, 351], [324, 318], [318, 325], [325, 324], [397, 367], [367, 365], [365, 397], [288, 435], [435, 397], [397, 288], [278, 344], [344, 439], [439, 278], [310, 272], [272, 311], [311, 310], [248, 195], [195, 281], [281, 248], [375, 273], [273, 291], [291, 375], [175, 396], [396, 199], [199, 175], [312, 311], [311, 268], [268, 312], [276, 283], [283, 445], [445, 276], [390, 373], [373, 339], [339, 390], [295, 282], [282, 296], [296, 295], [448, 449], [449, 346], [346, 448], [356, 264], [264, 454], [454, 356], [337, 336], [336, 299], [299, 337], [337, 338], [338, 151], [151, 337], [294, 278], [278, 455], [455, 294], [308, 292], [292, 415], [415, 308], [429, 358], [358, 355], [355, 429], [265, 340], [340, 372], [372, 265], [352, 346], [346, 280], [280, 352], [295, 442], [442, 282], [282, 295], [354, 19], [19, 370], [370, 354], [285, 441], [441, 295], [295, 285], [195, 248], [248, 197], [197, 195], [457, 440], [440, 274], [274, 457], [301, 300], [300, 368], [368, 301], [417, 351], [351, 465], [465, 417], [251, 301], [301, 389], [389, 251], [394, 395], [395, 379], [379, 394], [399, 412], [412, 419], [419, 399], [410, 436], [436, 322], [322, 410], [326, 2], [2, 393], [393, 326], [354, 370], [370, 461], [461, 354], [393, 164], [164, 267], [267, 393], [268, 302], [302, 12], [12, 268], [312, 268], [268, 13], [13, 312], [298, 293], [293, 301], [301, 298], [265, 446], [446, 340], [340, 265], [280, 330], [330, 425], [425, 280], [322, 426], [426, 391], [391, 322], [420, 429], [429, 437], [437, 420], [393, 391], [391, 326], [326, 393], [344, 440], [440, 438], [438, 344], [458, 459], [459, 461], [461, 458], [364, 434], [434, 394], [394, 364], [428, 396], [396, 262], [262, 428], [274, 354], [354, 457], [457, 274], [317, 316], [316, 402], [402, 317], [316, 315], [315, 403], [403, 316], [315, 314], [314, 404], [404, 315], [314, 313], [313, 405], [405, 314], [313, 421], [421, 406], [406, 313], [323, 366], [366, 361], [361, 323], [292, 306], [306, 407], [407, 292], [306, 291], [291, 408], [408, 306], [291, 287], [287, 409], [409, 291], [287, 432], [432, 410], [410, 287], [427, 434], [434, 411], [411, 427], [372, 264], [264, 383], [383, 372], [459, 309], [309, 457], [457, 459], [366, 352], [352, 401], [401, 366], [1, 274], [274, 4], [4, 1], [418, 421], [421, 262], [262, 418], [331, 294], [294, 358], [358, 331], [435, 433], [433, 367], [367, 435], [392, 289], [289, 439], [439, 392], [328, 462], [462, 326], [326, 328], [94, 2], [2, 370], [370, 94], [289, 305], [305, 455], [455, 289], [339, 254], [254, 448], [448, 339], [359, 255], [255, 446], [446, 359], [254, 253], [253, 449], [449, 254], [253, 252], [252, 450], [450, 253], [252, 256], [256, 451], [451, 252], [256, 341], [341, 452], [452, 256], [414, 413], [413, 463], [463, 414], [286, 441], [441, 414], [414, 286], [286, 258], [258, 441], [441, 286], [258, 257], [257, 442], [442, 258], [257, 259], [259, 443], [443, 257], [259, 260], [260, 444], [444, 259], [260, 467], [467, 445], [445, 260], [309, 459], [459, 250], [250, 309], [305, 289], [289, 290], [290, 305], [305, 290], [290, 460], [460, 305], [401, 376], [376, 435], [435, 401], [309, 250], [250, 392], [392, 309], [376, 411], [411, 433], [433, 376], [453, 341], [341, 464], [464, 453], [357, 453], [453, 465], [465, 357], [343, 357], [357, 412], [412, 343], [437, 343], [343, 399], [399, 437], [344, 360], [360, 440], [440, 344], [420, 437], [437, 456], [456, 420], [360, 420], [420, 363], [363, 360], [361, 401], [401, 288], [288, 361], [265, 372], [372, 353], [353, 265], [390, 339], [339, 249], [249, 390], [339, 448], [448, 255], [255, 339]]),
      JA("matrixDataToMatrix", function(C) {
          for (var Q = C.getCols(), E = C.getRows(), R = C.getPackedDataList(), h = [], M = 0; M < E; M++)
              h.push(Array(Q));
          for (M = 0; M < E; M++)
              for (var K = 0; K < Q; K++) {
                  var k = C.getLayout() === 1 ? M * Q + K : K * E + M;
                  h[M][K] = R[k]
              }
          return h
      }),
      JA("VERSION", "0.4.1633559619")
  }
  ).call(pg);
  class TC {
      constructor() {
          this.detectResolve = null;
          let s = ZC.FaceMesh;
          s === void 0 && (console.log("FaceMesh undefined, using window.FaceMesh"),
          s = window.FaceMesh),
          this.faceMesh = new s({
              locateFile: o=>`https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4/${o}`
          }),
          this.faceMesh.setOptions({
              maxNumFaces: 1,
              refineLandmarks: !1,
              minDetectionConfidence: .5,
              minTrackingConfidence: .5
          }),
          this.faceMesh.onResults(o=>{
              this.detectResolve && this.detectResolve(o)
          }
          )
      }
      async detect(s) {
          return await new Promise((H,l)=>{
              this.detectResolve = H,
              this.faceMesh.send({
                  image: s
              })
          }
          )
      }
  }
  let mC = {};
  var sC = function() {
      var Y = typeof document < "u" && document.currentScript ? document.currentScript.src : void 0;
      return typeof __filename < "u" && (Y = Y || __filename),
      function(s) {
          s = s || {};
          var o = typeof s < "u" ? s : {}, H, l;
          o.ready = new Promise(function(A, I) {
              H = A,
              l = I
          }
          );
          var n = {}, Z;
          for (Z in o)
              o.hasOwnProperty(Z) && (n[Z] = o[Z]);
          var V = "./this.program"
            , gA = !1
            , b = !1
            , u = !1
            , NA = !1;
          gA = typeof window == "object",
          b = typeof importScripts == "function",
          u = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string",
          NA = !gA && !u && !b;
          var _ = "";
          function rA(A) {
              return o.locateFile ? o.locateFile(A, _) : _ + A
          }
          var yA, nA, fA, _A, q;
          u ? (b ? _ = require("path").dirname(_) + "/" : _ = __dirname + "/",
          yA = function(I, g) {
              var B = WI(I);
              return B ? g ? B : B.toString() : (_A || (_A = require("fs")),
              q || (q = require("path")),
              I = q.normalize(I),
              _A.readFileSync(I, g ? null : "utf8"))
          }
          ,
          fA = function(I) {
              var g = yA(I, !0);
              return g.buffer || (g = new Uint8Array(g)),
              lA(g.buffer),
              g
          }
          ,
          process.argv.length > 1 && (V = process.argv[1].replace(/\\/g, "/")),
          process.argv.slice(2),
          process.on("uncaughtException", function(A) {
              if (!(A instanceof WC))
                  throw A
          }),
          process.on("unhandledRejection", cA),
          o.inspect = function() {
              return "[Emscripten Module object]"
          }
          ) : NA ? (typeof read < "u" && (yA = function(I) {
              var g = WI(I);
              return g ? dC(g) : read(I)
          }
          ),
          fA = function(I) {
              var g;
              return g = WI(I),
              g || (typeof readbuffer == "function" ? new Uint8Array(readbuffer(I)) : (g = read(I, "binary"),
              lA(typeof g == "object"),
              g))
          }
          ,
          typeof scriptArgs < "u" && scriptArgs,
          typeof print < "u" && (typeof console > "u" && (console = {}),
          console.log = print,
          console.warn = console.error = typeof printErr < "u" ? printErr : print)) : (gA || b) && (b ? _ = self.location.href : typeof document < "u" && document.currentScript && (_ = document.currentScript.src),
          Y && (_ = Y),
          _.indexOf("blob:") !== 0 ? _ = _.substr(0, _.lastIndexOf("/") + 1) : _ = "",
          yA = function(I) {
              try {
                  var g = new XMLHttpRequest;
                  return g.open("GET", I, !1),
                  g.send(null),
                  g.responseText
              } catch (i) {
                  var B = WI(I);
                  if (B)
                      return dC(B);
                  throw i
              }
          }
          ,
          b && (fA = function(I) {
              try {
                  var g = new XMLHttpRequest;
                  return g.open("GET", I, !1),
                  g.responseType = "arraybuffer",
                  g.send(null),
                  new Uint8Array(g.response)
              } catch (i) {
                  var B = WI(I);
                  if (B)
                      return B;
                  throw i
              }
          }
          ),
          nA = function(I, g, B) {
              var i = new XMLHttpRequest;
              i.open("GET", I, !0),
              i.responseType = "arraybuffer",
              i.onload = function() {
                  if (i.status == 200 || i.status == 0 && i.response) {
                      g(i.response);
                      return
                  }
                  var w = WI(I);
                  if (w) {
                      g(w.buffer);
                      return
                  }
                  B()
              }
              ,
              i.onerror = B,
              i.send(null)
          }
          );
          var x = o.print || console.log.bind(console)
            , FA = o.printErr || console.warn.bind(console);
          for (Z in n)
              n.hasOwnProperty(Z) && (o[Z] = n[Z]);
          n = null,
          o.arguments && o.arguments,
          o.thisProgram && (V = o.thisProgram),
          o.quit && o.quit;
          var ZI = 16;
          function CI(A, I) {
              return I || (I = ZI),
              Math.ceil(A / I) * I
          }
          function HA(A) {
              HA.shown || (HA.shown = {}),
              HA.shown[A] || (HA.shown[A] = 1,
              FA(A))
          }
          var iI;
          o.wasmBinary && (iI = o.wasmBinary),
          o.noExitRuntime && o.noExitRuntime,
          typeof WebAssembly != "object" && cA("no native wasm support detected");
          var tA, MA = !1;
          function lA(A, I) {
              A || cA("Assertion failed: " + I)
          }
          var DI = typeof TextDecoder < "u" ? new TextDecoder("utf8") : void 0;
          function JA(A, I, g) {
              for (var B = I + g, i = I; A[i] && !(i >= B); )
                  ++i;
              if (i - I > 16 && A.subarray && DI)
                  return DI.decode(A.subarray(I, i));
              for (var G = ""; I < i; ) {
                  var w = A[I++];
                  if (!(w & 128)) {
                      G += String.fromCharCode(w);
                      continue
                  }
                  var F = A[I++] & 63;
                  if ((w & 224) == 192) {
                      G += String.fromCharCode((w & 31) << 6 | F);
                      continue
                  }
                  var N = A[I++] & 63;
                  if ((w & 240) == 224 ? w = (w & 15) << 12 | F << 6 | N : w = (w & 7) << 18 | F << 12 | N << 6 | A[I++] & 63,
                  w < 65536)
                      G += String.fromCharCode(w);
                  else {
                      var a = w - 65536;
                      G += String.fromCharCode(55296 | a >> 10, 56320 | a & 1023)
                  }
              }
              return G
          }
          function tI(A, I) {
              return A ? JA(YA, A, I) : ""
          }
          function TI(A, I, g, B) {
              if (!(B > 0))
                  return 0;
              for (var i = g, G = g + B - 1, w = 0; w < A.length; ++w) {
                  var F = A.charCodeAt(w);
                  if (F >= 55296 && F <= 57343) {
                      var N = A.charCodeAt(++w);
                      F = 65536 + ((F & 1023) << 10) | N & 1023
                  }
                  if (F <= 127) {
                      if (g >= G)
                          break;
                      I[g++] = F
                  } else if (F <= 2047) {
                      if (g + 1 >= G)
                          break;
                      I[g++] = 192 | F >> 6,
                      I[g++] = 128 | F & 63
                  } else if (F <= 65535) {
                      if (g + 2 >= G)
                          break;
                      I[g++] = 224 | F >> 12,
                      I[g++] = 128 | F >> 6 & 63,
                      I[g++] = 128 | F & 63
                  } else {
                      if (g + 3 >= G)
                          break;
                      I[g++] = 240 | F >> 18,
                      I[g++] = 128 | F >> 12 & 63,
                      I[g++] = 128 | F >> 6 & 63,
                      I[g++] = 128 | F & 63
                  }
              }
              return I[g] = 0,
              g - i
          }
          function sg(A, I, g) {
              return TI(A, YA, I, g)
          }
          function qI(A) {
              for (var I = 0, g = 0; g < A.length; ++g) {
                  var B = A.charCodeAt(g);
                  B >= 55296 && B <= 57343 && (B = 65536 + ((B & 1023) << 10) | A.charCodeAt(++g) & 1023),
                  B <= 127 ? ++I : B <= 2047 ? I += 2 : B <= 65535 ? I += 3 : I += 4
              }
              return I
          }
          var hg = typeof TextDecoder < "u" ? new TextDecoder("utf-16le") : void 0;
          function ag(A, I) {
              for (var g = A, B = g >> 1, i = B + I / 2; !(B >= i) && nI[B]; )
                  ++B;
              if (g = B << 1,
              g - A > 32 && hg)
                  return hg.decode(YA.subarray(A, g));
              for (var G = "", w = 0; !(w >= I / 2); ++w) {
                  var F = pA[A + w * 2 >> 1];
                  if (F == 0)
                      break;
                  G += String.fromCharCode(F)
              }
              return G
          }
          function yg(A, I, g) {
              if (g === void 0 && (g = 2147483647),
              g < 2)
                  return 0;
              g -= 2;
              for (var B = I, i = g < A.length * 2 ? g / 2 : A.length, G = 0; G < i; ++G) {
                  var w = A.charCodeAt(G);
                  pA[I >> 1] = w,
                  I += 2
              }
              return pA[I >> 1] = 0,
              I - B
          }
          function rI(A) {
              return A.length * 2
          }
          function vg(A, I) {
              for (var g = 0, B = ""; !(g >= I / 4); ) {
                  var i = d[A + g * 4 >> 2];
                  if (i == 0)
                      break;
                  if (++g,
                  i >= 65536) {
                      var G = i - 65536;
                      B += String.fromCharCode(55296 | G >> 10, 56320 | G & 1023)
                  } else
                      B += String.fromCharCode(i)
              }
              return B
          }
          function _g(A, I, g) {
              if (g === void 0 && (g = 2147483647),
              g < 4)
                  return 0;
              for (var B = I, i = B + g - 4, G = 0; G < A.length; ++G) {
                  var w = A.charCodeAt(G);
                  if (w >= 55296 && w <= 57343) {
                      var F = A.charCodeAt(++G);
                      w = 65536 + ((w & 1023) << 10) | F & 1023
                  }
                  if (d[I >> 2] = w,
                  I += 4,
                  I + 4 > i)
                      break
              }
              return d[I >> 2] = 0,
              I - B
          }
          function $g(A) {
              for (var I = 0, g = 0; g < A.length; ++g) {
                  var B = A.charCodeAt(g);
                  B >= 55296 && B <= 57343 && ++g,
                  I += 4
              }
              return I
          }
          function Kg(A, I) {
              KA.set(A, I)
          }
          function AC(A, I, g) {
              for (var B = 0; B < A.length; ++B)
                  KA[I++ >> 0] = A.charCodeAt(B);
              g || (KA[I >> 0] = 0)
          }
          function Ug(A, I) {
              return A % I > 0 && (A += I - A % I),
              A
          }
          var eI, KA, YA, pA, nI, d, OA, lI, $A;
          function KI(A) {
              eI = A,
              o.HEAP8 = KA = new Int8Array(A),
              o.HEAP16 = pA = new Int16Array(A),
              o.HEAP32 = d = new Int32Array(A),
              o.HEAPU8 = YA = new Uint8Array(A),
              o.HEAPU16 = nI = new Uint16Array(A),
              o.HEAPU32 = OA = new Uint32Array(A),
              o.HEAPF32 = lI = new Float32Array(A),
              o.HEAPF64 = $A = new Float64Array(A)
          }
          o.INITIAL_MEMORY;
          var mA, oI = [], dI = [], uA = [], vI = [];
          function Mg() {
              if (o.preRun)
                  for (typeof o.preRun == "function" && (o.preRun = [o.preRun]); o.preRun.length; )
                      $I(o.preRun.shift());
              JI(oI)
          }
          function kg() {
              !o.noFSInit && !D.init.initialized && D.init(),
              JI(dI)
          }
          function _I() {
              D.ignorePermissions = !1,
              JI(uA)
          }
          function UI() {
              if (o.postRun)
                  for (typeof o.postRun == "function" && (o.postRun = [o.postRun]); o.postRun.length; )
                      jA(o.postRun.shift());
              JI(vI)
          }
          function $I(A) {
              oI.unshift(A)
          }
          function jA(A) {
              vI.unshift(A)
          }
          var BI = 0
            , MI = null;
          function IC(A) {
              return A
          }
          function mI(A) {
              BI++,
              o.monitorRunDependencies && o.monitorRunDependencies(BI)
          }
          function fI(A) {
              if (BI--,
              o.monitorRunDependencies && o.monitorRunDependencies(BI),
              BI == 0 && MI) {
                  var I = MI;
                  MI = null,
                  I()
              }
          }
          o.preloadedImages = {},
          o.preloadedAudios = {};
          function cA(A) {
              o.onAbort && o.onAbort(A),
              A += "",
              FA(A),
              MA = !0,
              A = "abort(" + A + "). Build with -s ASSERTIONS=1 for more info.";
              var I = new WebAssembly.RuntimeError(A);
              throw l(I),
              I
          }
          function Ag(A, I) {
              return String.prototype.startsWith ? A.startsWith(I) : A.indexOf(I) === 0
          }
          var eA = "data:application/octet-stream;base64,";
          function kI(A) {
              return Ag(A, eA)
          }
          var Sg = "file://";
          function UA(A) {
              return Ag(A, Sg)
          }
          kI(ZA) || (ZA = rA(ZA));
          function Ig() {
              try {
                  if (iI)
                      return new Uint8Array(iI);
                  var A = WI(ZA);
                  if (A)
                      return A;
                  if (fA)
                      return fA(ZA);
                  throw "both async and sync fetching of the wasm failed"
              } catch (I) {
                  cA(I)
              }
          }
          function GI() {
              return !iI && (gA || b) && typeof fetch == "function" && !UA(ZA) ? fetch(ZA, {
                  credentials: "same-origin"
              }).then(function(A) {
                  if (!A.ok)
                      throw "failed to load wasm binary file at '" + ZA + "'";
                  return A.arrayBuffer()
              }).catch(function() {
                  return Ig()
              }) : Promise.resolve().then(Ig)
          }
          function PA() {
              var A = {
                  env: fC,
                  wasi_snapshot_preview1: fC
              };
              function I(w, F) {
                  var N = w.exports;
                  o.asm = N,
                  tA = o.asm.memory,
                  KI(tA.buffer),
                  mA = o.asm.__indirect_function_table,
                  fI()
              }
              mI();
              function g(w) {
                  I(w.instance)
              }
              function B(w) {
                  return GI().then(function(F) {
                      return WebAssembly.instantiate(F, A)
                  }).then(w, function(F) {
                      FA("failed to asynchronously prepare wasm: " + F),
                      cA(F)
                  })
              }
              function i() {
                  return !iI && typeof WebAssembly.instantiateStreaming == "function" && !kI(ZA) && !UA(ZA) && typeof fetch == "function" ? fetch(ZA, {
                      credentials: "same-origin"
                  }).then(function(w) {
                      var F = WebAssembly.instantiateStreaming(w, A);
                      return F.then(g, function(N) {
                          return FA("wasm streaming compile failed: " + N),
                          FA("falling back to ArrayBuffer instantiation"),
                          B(g)
                      })
                  }) : B(g)
              }
              if (o.instantiateWasm)
                  try {
                      var G = o.instantiateWasm(A, I);
                      return G
                  } catch (w) {
                      return FA("Module.instantiateWasm callback failed with error: " + w),
                      !1
                  }
              return i().catch(l),
              {}
          }
          var T, zA;
          function SI(A, I) {
              if (y.mainLoop.timingMode = A,
              y.mainLoop.timingValue = I,
              !y.mainLoop.func)
                  return 1;
              if (A == 0)
                  y.mainLoop.scheduler = function() {
                      var w = Math.max(0, y.mainLoop.tickStartTime + I - wI()) | 0;
                      setTimeout(y.mainLoop.runner, w)
                  }
                  ,
                  y.mainLoop.method = "timeout";
              else if (A == 1)
                  y.mainLoop.scheduler = function() {
                      y.requestAnimationFrame(y.mainLoop.runner)
                  }
                  ,
                  y.mainLoop.method = "rAF";
              else if (A == 2) {
                  if (typeof setImmediate > "u") {
                      var g = []
                        , B = "setimmediate"
                        , i = function(G) {
                          (G.data === B || G.data.target === B) && (G.stopPropagation(),
                          g.shift()())
                      };
                      addEventListener("message", i, !0),
                      setImmediate = function(w) {
                          g.push(w),
                          b ? (o.setImmediates === void 0 && (o.setImmediates = []),
                          o.setImmediates.push(w),
                          postMessage({
                              target: B
                          })) : postMessage(B, "*")
                      }
                  }
                  y.mainLoop.scheduler = function() {
                      setImmediate(y.mainLoop.runner)
                  }
                  ,
                  y.mainLoop.method = "immediate"
              }
              return 0
          }
          var wI;
          u ? wI = function() {
              var A = process.hrtime();
              return A[0] * 1e3 + A[1] / 1e6
          }
          : typeof dateNow < "u" ? wI = dateNow : wI = function() {
              return performance.now()
          }
          ;
          function Jg(A, I, g, B, i) {
              lA(!y.mainLoop.func, "emscripten_set_main_loop: there can only be one main loop function at once: call emscripten_cancel_main_loop to cancel the previous one before setting a new one with different parameters."),
              y.mainLoop.func = A,
              y.mainLoop.arg = B;
              var G = y.mainLoop.currentlyRunningMainloop;
              if (y.mainLoop.runner = function() {
                  if (!MA) {
                      if (y.mainLoop.queue.length > 0) {
                          var F = Date.now()
                            , N = y.mainLoop.queue.shift();
                          if (N.func(N.arg),
                          y.mainLoop.remainingBlockers) {
                              var a = y.mainLoop.remainingBlockers
                                , U = a % 1 == 0 ? a - 1 : Math.floor(a);
                              N.counted ? y.mainLoop.remainingBlockers = U : (U = U + .5,
                              y.mainLoop.remainingBlockers = (8 * a + U) / 9)
                          }
                          if (console.log('main loop blocker "' + N.name + '" took ' + (Date.now() - F) + " ms"),
                          y.mainLoop.updateStatus(),
                          G < y.mainLoop.currentlyRunningMainloop)
                              return;
                          setTimeout(y.mainLoop.runner, 0);
                          return
                      }
                      if (!(G < y.mainLoop.currentlyRunningMainloop)) {
                          if (y.mainLoop.currentFrameNumber = y.mainLoop.currentFrameNumber + 1 | 0,
                          y.mainLoop.timingMode == 1 && y.mainLoop.timingValue > 1 && y.mainLoop.currentFrameNumber % y.mainLoop.timingValue != 0) {
                              y.mainLoop.scheduler();
                              return
                          } else
                              y.mainLoop.timingMode == 0 && (y.mainLoop.tickStartTime = wI());
                          y.mainLoop.runIter(A),
                          !(G < y.mainLoop.currentlyRunningMainloop) && (typeof SDL == "object" && SDL.audio && SDL.audio.queueNewAudioData && SDL.audio.queueNewAudioData(),
                          y.mainLoop.scheduler())
                      }
                  }
              }
              ,
              i || (I && I > 0 ? SI(0, 1e3 / I) : SI(1, 1),
              y.mainLoop.scheduler()),
              g)
                  throw "unwind"
          }
          var y = {
              mainLoop: {
                  scheduler: null,
                  method: "",
                  currentlyRunningMainloop: 0,
                  func: null,
                  arg: 0,
                  timingMode: 0,
                  timingValue: 0,
                  currentFrameNumber: 0,
                  queue: [],
                  pause: function() {
                      y.mainLoop.scheduler = null,
                      y.mainLoop.currentlyRunningMainloop++
                  },
                  resume: function() {
                      y.mainLoop.currentlyRunningMainloop++;
                      var A = y.mainLoop.timingMode
                        , I = y.mainLoop.timingValue
                        , g = y.mainLoop.func;
                      y.mainLoop.func = null,
                      Jg(g, 0, !1, y.mainLoop.arg, !0),
                      SI(A, I),
                      y.mainLoop.scheduler()
                  },
                  updateStatus: function() {
                      if (o.setStatus) {
                          var A = o.statusMessage || "Please wait..."
                            , I = y.mainLoop.remainingBlockers
                            , g = y.mainLoop.expectedBlockers;
                          I ? I < g ? o.setStatus(A + " (" + (g - I) + "/" + g + ")") : o.setStatus(A) : o.setStatus("")
                      }
                  },
                  runIter: function(A) {
                      if (!MA) {
                          if (o.preMainLoop) {
                              var I = o.preMainLoop();
                              if (I === !1)
                                  return
                          }
                          try {
                              A()
                          } catch (g) {
                              if (g instanceof WC)
                                  return;
                              if (g == "unwind")
                                  return;
                              throw g && typeof g == "object" && g.stack && FA("exception thrown: " + [g, g.stack]),
                              g
                          }
                          o.postMainLoop && o.postMainLoop()
                      }
                  }
              },
              isFullscreen: !1,
              pointerLock: !1,
              moduleContextCreatedCallbacks: [],
              workers: [],
              init: function() {
                  if (o.preloadPlugins || (o.preloadPlugins = []),
                  y.initted)
                      return;
                  y.initted = !0;
                  try {
                      new Blob,
                      y.hasBlobConstructor = !0
                  } catch {
                      y.hasBlobConstructor = !1,
                      console.log("warning: no blob constructor, cannot create blobs with mimetypes")
                  }
                  y.BlobBuilder = typeof MozBlobBuilder < "u" ? MozBlobBuilder : typeof WebKitBlobBuilder < "u" ? WebKitBlobBuilder : y.hasBlobConstructor ? null : console.log("warning: no BlobBuilder"),
                  y.URLObject = typeof window < "u" ? window.URL ? window.URL : window.webkitURL : void 0,
                  !o.noImageDecoding && typeof y.URLObject > "u" && (console.log("warning: Browser does not support creating object URLs. Built-in browser image decoding will not be available."),
                  o.noImageDecoding = !0);
                  var A = {};
                  A.canHandle = function(G) {
                      return !o.noImageDecoding && /\.(jpg|jpeg|png|bmp)$/i.test(G)
                  }
                  ,
                  A.handle = function(G, w, F, N) {
                      var a = null;
                      if (y.hasBlobConstructor)
                          try {
                              a = new Blob([G],{
                                  type: y.getMimetype(w)
                              }),
                              a.size !== G.length && (a = new Blob([new Uint8Array(G).buffer],{
                                  type: y.getMimetype(w)
                              }))
                          } catch (t) {
                              HA("Blob constructor present but fails: " + t + "; falling back to blob builder")
                          }
                      if (!a) {
                          var U = new y.BlobBuilder;
                          U.append(new Uint8Array(G).buffer),
                          a = U.getBlob()
                      }
                      var J = y.URLObject.createObjectURL(a)
                        , S = new Image;
                      S.onload = function() {
                          lA(S.complete, "Image " + w + " could not be decoded");
                          var r = document.createElement("canvas");
                          r.width = S.width,
                          r.height = S.height;
                          var z = r.getContext("2d");
                          z.drawImage(S, 0, 0),
                          o.preloadedImages[w] = r,
                          y.URLObject.revokeObjectURL(J),
                          F && F(G)
                      }
                      ,
                      S.onerror = function(r) {
                          console.log("Image " + J + " could not be decoded"),
                          N && N()
                      }
                      ,
                      S.src = J
                  }
                  ,
                  o.preloadPlugins.push(A);
                  var I = {};
                  I.canHandle = function(G) {
                      return !o.noAudioDecoding && G.substr(-4)in {
                          ".ogg": 1,
                          ".wav": 1,
                          ".mp3": 1
                      }
                  }
                  ,
                  I.handle = function(G, w, F, N) {
                      var a = !1;
                      function U(z) {
                          a || (a = !0,
                          o.preloadedAudios[w] = z,
                          F && F(G))
                      }
                      function J() {
                          a || (a = !0,
                          o.preloadedAudios[w] = new Audio,
                          N && N())
                      }
                      if (y.hasBlobConstructor) {
                          try {
                              var S = new Blob([G],{
                                  type: y.getMimetype(w)
                              })
                          } catch {
                              return J()
                          }
                          var t = y.URLObject.createObjectURL(S)
                            , r = new Audio;
                          r.addEventListener("canplaythrough", function() {
                              U(r)
                          }, !1),
                          r.onerror = function(hA) {
                              if (a)
                                  return;
                              console.log("warning: browser could not fully decode audio " + w + ", trying slower base64 approach");
                              function iA(c) {
                                  for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", DA = "=", v = "", BA = 0, xA = 0, gI = 0; gI < c.length; gI++)
                                      for (BA = BA << 8 | c[gI],
                                      xA += 8; xA >= 6; ) {
                                          var GQ = BA >> xA - 6 & 63;
                                          xA -= 6,
                                          v += e[GQ]
                                      }
                                  return xA == 2 ? (v += e[(BA & 3) << 4],
                                  v += DA + DA) : xA == 4 && (v += e[(BA & 15) << 2],
                                  v += DA),
                                  v
                              }
                              r.src = "data:audio/x-" + w.substr(-3) + ";base64," + iA(G),
                              U(r)
                          }
                          ,
                          r.src = t,
                          y.safeSetTimeout(function() {
                              U(r)
                          }, 1e4)
                      } else
                          return J()
                  }
                  ,
                  o.preloadPlugins.push(I);
                  function g() {
                      y.pointerLock = document.pointerLockElement === o.canvas || document.mozPointerLockElement === o.canvas || document.webkitPointerLockElement === o.canvas || document.msPointerLockElement === o.canvas
                  }
                  var B = o.canvas;
                  B && (B.requestPointerLock = B.requestPointerLock || B.mozRequestPointerLock || B.webkitRequestPointerLock || B.msRequestPointerLock || function() {}
                  ,
                  B.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || document.webkitExitPointerLock || document.msExitPointerLock || function() {}
                  ,
                  B.exitPointerLock = B.exitPointerLock.bind(document),
                  document.addEventListener("pointerlockchange", g, !1),
                  document.addEventListener("mozpointerlockchange", g, !1),
                  document.addEventListener("webkitpointerlockchange", g, !1),
                  document.addEventListener("mspointerlockchange", g, !1),
                  o.elementPointerLock && B.addEventListener("click", function(i) {
                      !y.pointerLock && o.canvas.requestPointerLock && (o.canvas.requestPointerLock(),
                      i.preventDefault())
                  }, !1))
              },
              createContext: function(A, I, g, B) {
                  if (I && o.ctx && A == o.canvas)
                      return o.ctx;
                  var i, G;
                  if (I) {
                      var w = {
                          antialias: !1,
                          alpha: !1,
                          majorVersion: 1
                      };
                      if (B)
                          for (var F in B)
                              w[F] = B[F];
                      typeof GL < "u" && (G = GL.createContext(A, w),
                      G && (i = GL.getContext(G).GLctx))
                  } else
                      i = A.getContext("2d");
                  return i ? (g && (I || lA(typeof GLctx > "u", "cannot set in module if GLctx is used, but we are a non-GL context that would replace it"),
                  o.ctx = i,
                  I && GL.makeContextCurrent(G),
                  o.useWebGL = I,
                  y.moduleContextCreatedCallbacks.forEach(function(N) {
                      N()
                  }),
                  y.init()),
                  i) : null
              },
              destroyContext: function(A, I, g) {},
              fullscreenHandlersInstalled: !1,
              lockPointer: void 0,
              resizeCanvas: void 0,
              requestFullscreen: function(A, I) {
                  y.lockPointer = A,
                  y.resizeCanvas = I,
                  typeof y.lockPointer > "u" && (y.lockPointer = !0),
                  typeof y.resizeCanvas > "u" && (y.resizeCanvas = !1);
                  var g = o.canvas;
                  function B() {
                      y.isFullscreen = !1;
                      var G = g.parentNode;
                      (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === G ? (g.exitFullscreen = y.exitFullscreen,
                      y.lockPointer && g.requestPointerLock(),
                      y.isFullscreen = !0,
                      y.resizeCanvas ? y.setFullscreenCanvasSize() : y.updateCanvasDimensions(g)) : (G.parentNode.insertBefore(g, G),
                      G.parentNode.removeChild(G),
                      y.resizeCanvas ? y.setWindowedCanvasSize() : y.updateCanvasDimensions(g)),
                      o.onFullScreen && o.onFullScreen(y.isFullscreen),
                      o.onFullscreen && o.onFullscreen(y.isFullscreen)
                  }
                  y.fullscreenHandlersInstalled || (y.fullscreenHandlersInstalled = !0,
                  document.addEventListener("fullscreenchange", B, !1),
                  document.addEventListener("mozfullscreenchange", B, !1),
                  document.addEventListener("webkitfullscreenchange", B, !1),
                  document.addEventListener("MSFullscreenChange", B, !1));
                  var i = document.createElement("div");
                  g.parentNode.insertBefore(i, g),
                  i.appendChild(g),
                  i.requestFullscreen = i.requestFullscreen || i.mozRequestFullScreen || i.msRequestFullscreen || (i.webkitRequestFullscreen ? function() {
                      i.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
                  }
                  : null) || (i.webkitRequestFullScreen ? function() {
                      i.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
                  }
                  : null),
                  i.requestFullscreen()
              },
              exitFullscreen: function() {
                  if (!y.isFullscreen)
                      return !1;
                  var A = document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen || function() {}
                  ;
                  return A.apply(document, []),
                  !0
              },
              nextRAF: 0,
              fakeRequestAnimationFrame: function(A) {
                  var I = Date.now();
                  if (y.nextRAF === 0)
                      y.nextRAF = I + 1e3 / 60;
                  else
                      for (; I + 2 >= y.nextRAF; )
                          y.nextRAF += 1e3 / 60;
                  var g = Math.max(y.nextRAF - I, 0);
                  setTimeout(A, g)
              },
              requestAnimationFrame: function(A) {
                  if (typeof requestAnimationFrame == "function") {
                      requestAnimationFrame(A);
                      return
                  }
                  var I = y.fakeRequestAnimationFrame;
                  I(A)
              },
              safeCallback: function(A) {
                  return function() {
                      if (!MA)
                          return A.apply(null, arguments)
                  }
              },
              allowAsyncCallbacks: !0,
              queuedAsyncCallbacks: [],
              pauseAsyncCallbacks: function() {
                  y.allowAsyncCallbacks = !1
              },
              resumeAsyncCallbacks: function() {
                  if (y.allowAsyncCallbacks = !0,
                  y.queuedAsyncCallbacks.length > 0) {
                      var A = y.queuedAsyncCallbacks;
                      y.queuedAsyncCallbacks = [],
                      A.forEach(function(I) {
                          I()
                      })
                  }
              },
              safeRequestAnimationFrame: function(A) {
                  return y.requestAnimationFrame(function() {
                      MA || (y.allowAsyncCallbacks ? A() : y.queuedAsyncCallbacks.push(A))
                  })
              },
              safeSetTimeout: function(A, I) {
                  return setTimeout(function() {
                      MA || (y.allowAsyncCallbacks ? A() : y.queuedAsyncCallbacks.push(A))
                  }, I)
              },
              safeSetInterval: function(A, I) {
                  return setInterval(function() {
                      MA || y.allowAsyncCallbacks && A()
                  }, I)
              },
              getMimetype: function(A) {
                  return {
                      jpg: "image/jpeg",
                      jpeg: "image/jpeg",
                      png: "image/png",
                      bmp: "image/bmp",
                      ogg: "audio/ogg",
                      wav: "audio/wav",
                      mp3: "audio/mpeg"
                  }[A.substr(A.lastIndexOf(".") + 1)]
              },
              getUserMedia: function(A) {
                  window.getUserMedia || (window.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia),
                  window.getUserMedia(A)
              },
              getMovementX: function(A) {
                  return A.movementX || A.mozMovementX || A.webkitMovementX || 0
              },
              getMovementY: function(A) {
                  return A.movementY || A.mozMovementY || A.webkitMovementY || 0
              },
              getMouseWheelDelta: function(A) {
                  var I = 0;
                  switch (A.type) {
                  case "DOMMouseScroll":
                      I = A.detail / 3;
                      break;
                  case "mousewheel":
                      I = A.wheelDelta / 120;
                      break;
                  case "wheel":
                      switch (I = A.deltaY,
                      A.deltaMode) {
                      case 0:
                          I /= 100;
                          break;
                      case 1:
                          I /= 3;
                          break;
                      case 2:
                          I *= 80;
                          break;
                      default:
                          throw "unrecognized mouse wheel delta mode: " + A.deltaMode
                      }
                      break;
                  default:
                      throw "unrecognized mouse wheel event: " + A.type
                  }
                  return I
              },
              mouseX: 0,
              mouseY: 0,
              mouseMovementX: 0,
              mouseMovementY: 0,
              touches: {},
              lastTouches: {},
              calculateMouseEvent: function(A) {
                  if (y.pointerLock)
                      A.type != "mousemove" && "mozMovementX"in A ? y.mouseMovementX = y.mouseMovementY = 0 : (y.mouseMovementX = y.getMovementX(A),
                      y.mouseMovementY = y.getMovementY(A)),
                      typeof SDL < "u" ? (y.mouseX = SDL.mouseX + y.mouseMovementX,
                      y.mouseY = SDL.mouseY + y.mouseMovementY) : (y.mouseX += y.mouseMovementX,
                      y.mouseY += y.mouseMovementY);
                  else {
                      var I = o.canvas.getBoundingClientRect()
                        , g = o.canvas.width
                        , B = o.canvas.height
                        , i = typeof window.scrollX < "u" ? window.scrollX : window.pageXOffset
                        , G = typeof window.scrollY < "u" ? window.scrollY : window.pageYOffset;
                      if (A.type === "touchstart" || A.type === "touchend" || A.type === "touchmove") {
                          var w = A.touch;
                          if (w === void 0)
                              return;
                          var F = w.pageX - (i + I.left)
                            , N = w.pageY - (G + I.top);
                          F = F * (g / I.width),
                          N = N * (B / I.height);
                          var a = {
                              x: F,
                              y: N
                          };
                          if (A.type === "touchstart")
                              y.lastTouches[w.identifier] = a,
                              y.touches[w.identifier] = a;
                          else if (A.type === "touchend" || A.type === "touchmove") {
                              var U = y.touches[w.identifier];
                              U || (U = a),
                              y.lastTouches[w.identifier] = U,
                              y.touches[w.identifier] = a
                          }
                          return
                      }
                      var J = A.pageX - (i + I.left)
                        , S = A.pageY - (G + I.top);
                      J = J * (g / I.width),
                      S = S * (B / I.height),
                      y.mouseMovementX = J - y.mouseX,
                      y.mouseMovementY = S - y.mouseY,
                      y.mouseX = J,
                      y.mouseY = S
                  }
              },
              asyncLoad: function(A, I, g, B) {
                  var i = B ? "" : "al " + A;
                  nA(A, function(G) {
                      lA(G, 'Loading data file "' + A + '" failed (no arrayBuffer).'),
                      I(new Uint8Array(G)),
                      i && fI()
                  }, function(G) {
                      if (g)
                          g();
                      else
                          throw 'Loading data file "' + A + '" failed.'
                  }),
                  i && mI()
              },
              resizeListeners: [],
              updateResizeListeners: function() {
                  var A = o.canvas;
                  y.resizeListeners.forEach(function(I) {
                      I(A.width, A.height)
                  })
              },
              setCanvasSize: function(A, I, g) {
                  var B = o.canvas;
                  y.updateCanvasDimensions(B, A, I),
                  g || y.updateResizeListeners()
              },
              windowedWidth: 0,
              windowedHeight: 0,
              setFullscreenCanvasSize: function() {
                  if (typeof SDL < "u") {
                      var A = OA[SDL.screen >> 2];
                      A = A | 8388608,
                      d[SDL.screen >> 2] = A
                  }
                  y.updateCanvasDimensions(o.canvas),
                  y.updateResizeListeners()
              },
              setWindowedCanvasSize: function() {
                  if (typeof SDL < "u") {
                      var A = OA[SDL.screen >> 2];
                      A = A & -8388609,
                      d[SDL.screen >> 2] = A
                  }
                  y.updateCanvasDimensions(o.canvas),
                  y.updateResizeListeners()
              },
              updateCanvasDimensions: function(A, I, g) {
                  I && g ? (A.widthNative = I,
                  A.heightNative = g) : (I = A.widthNative,
                  g = A.heightNative);
                  var B = I
                    , i = g;
                  if (o.forcedAspectRatio && o.forcedAspectRatio > 0 && (B / i < o.forcedAspectRatio ? B = Math.round(i * o.forcedAspectRatio) : i = Math.round(B / o.forcedAspectRatio)),
                  (document.fullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement) === A.parentNode && typeof screen < "u") {
                      var G = Math.min(screen.width / B, screen.height / i);
                      B = Math.round(B * G),
                      i = Math.round(i * G)
                  }
                  y.resizeCanvas ? (A.width != B && (A.width = B),
                  A.height != i && (A.height = i),
                  typeof A.style < "u" && (A.style.removeProperty("width"),
                  A.style.removeProperty("height"))) : (A.width != I && (A.width = I),
                  A.height != g && (A.height = g),
                  typeof A.style < "u" && (B != I || i != g ? (A.style.setProperty("width", B + "px", "important"),
                  A.style.setProperty("height", i + "px", "important")) : (A.style.removeProperty("width"),
                  A.style.removeProperty("height"))))
              },
              wgetRequests: {},
              nextWgetRequestHandle: 0,
              getNextWgetRequestHandle: function() {
                  var A = y.nextWgetRequestHandle;
                  return y.nextWgetRequestHandle++,
                  A
              }
          };
          function JI(A) {
              for (; A.length > 0; ) {
                  var I = A.shift();
                  if (typeof I == "function") {
                      I(o);
                      continue
                  }
                  var g = I.func;
                  typeof g == "number" ? I.arg === void 0 ? mA.get(g)() : mA.get(g)(I.arg) : g(I.arg === void 0 ? null : I.arg)
              }
          }
          var kA = {
              DESTRUCTOR_OFFSET: 0,
              REFCOUNT_OFFSET: 4,
              TYPE_OFFSET: 8,
              CAUGHT_OFFSET: 12,
              RETHROWN_OFFSET: 13,
              SIZE: 16
          };
          function FI(A) {
              return Gg(A + kA.SIZE) + kA.SIZE
          }
          function JC(A, I) {}
          function gC(A, I) {
              return void 0
          }
          function WA(A) {
              this.excPtr = A,
              this.ptr = A - kA.SIZE,
              this.set_type = function(I) {
                  d[this.ptr + kA.TYPE_OFFSET >> 2] = I
              }
              ,
              this.get_type = function() {
                  return d[this.ptr + kA.TYPE_OFFSET >> 2]
              }
              ,
              this.set_destructor = function(I) {
                  d[this.ptr + kA.DESTRUCTOR_OFFSET >> 2] = I
              }
              ,
              this.get_destructor = function() {
                  return d[this.ptr + kA.DESTRUCTOR_OFFSET >> 2]
              }
              ,
              this.set_refcount = function(I) {
                  d[this.ptr + kA.REFCOUNT_OFFSET >> 2] = I
              }
              ,
              this.set_caught = function(I) {
                  I = I ? 1 : 0,
                  KA[this.ptr + kA.CAUGHT_OFFSET >> 0] = I
              }
              ,
              this.get_caught = function() {
                  return KA[this.ptr + kA.CAUGHT_OFFSET >> 0] != 0
              }
              ,
              this.set_rethrown = function(I) {
                  I = I ? 1 : 0,
                  KA[this.ptr + kA.RETHROWN_OFFSET >> 0] = I
              }
              ,
              this.get_rethrown = function() {
                  return KA[this.ptr + kA.RETHROWN_OFFSET >> 0] != 0
              }
              ,
              this.init = function(I, g) {
                  this.set_type(I),
                  this.set_destructor(g),
                  this.set_refcount(0),
                  this.set_caught(!1),
                  this.set_rethrown(!1)
              }
              ,
              this.add_ref = function() {
                  var I = d[this.ptr + kA.REFCOUNT_OFFSET >> 2];
                  d[this.ptr + kA.REFCOUNT_OFFSET >> 2] = I + 1
              }
              ,
              this.release_ref = function() {
                  var I = d[this.ptr + kA.REFCOUNT_OFFSET >> 2];
                  return d[this.ptr + kA.REFCOUNT_OFFSET >> 2] = I - 1,
                  I === 1
              }
          }
          function VI(A, I, g) {
              var B = new WA(A);
              throw B.init(I, g),
              A
          }
          function Yg(A) {
              return d[bC() >> 2] = A,
              A
          }
          var oA = {
              splitPath: function(A) {
                  var I = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
                  return I.exec(A).slice(1)
              },
              normalizeArray: function(A, I) {
                  for (var g = 0, B = A.length - 1; B >= 0; B--) {
                      var i = A[B];
                      i === "." ? A.splice(B, 1) : i === ".." ? (A.splice(B, 1),
                      g++) : g && (A.splice(B, 1),
                      g--)
                  }
                  if (I)
                      for (; g; g--)
                          A.unshift("..");
                  return A
              },
              normalize: function(A) {
                  var I = A.charAt(0) === "/"
                    , g = A.substr(-1) === "/";
                  return A = oA.normalizeArray(A.split("/").filter(function(B) {
                      return !!B
                  }), !I).join("/"),
                  !A && !I && (A = "."),
                  A && g && (A += "/"),
                  (I ? "/" : "") + A
              },
              dirname: function(A) {
                  var I = oA.splitPath(A)
                    , g = I[0]
                    , B = I[1];
                  return !g && !B ? "." : (B && (B = B.substr(0, B.length - 1)),
                  g + B)
              },
              basename: function(A) {
                  if (A === "/")
                      return "/";
                  A = oA.normalize(A),
                  A = A.replace(/\/$/, "");
                  var I = A.lastIndexOf("/");
                  return I === -1 ? A : A.substr(I + 1)
              },
              extname: function(A) {
                  return oA.splitPath(A)[3]
              },
              join: function() {
                  var A = Array.prototype.slice.call(arguments, 0);
                  return oA.normalize(A.join("/"))
              },
              join2: function(A, I) {
                  return oA.normalize(A + "/" + I)
              }
          };
          function CC() {
              if (typeof crypto == "object" && typeof crypto.getRandomValues == "function") {
                  var A = new Uint8Array(1);
                  return function() {
                      return crypto.getRandomValues(A),
                      A[0]
                  }
              } else if (u)
                  try {
                      var I = require("crypto");
                      return function() {
                          return I.randomBytes(1)[0]
                      }
                  } catch {}
              return function() {
                  cA("randomDevice")
              }
          }
          var TA = {
              resolve: function() {
                  for (var A = "", I = !1, g = arguments.length - 1; g >= -1 && !I; g--) {
                      var B = g >= 0 ? arguments[g] : D.cwd();
                      if (typeof B != "string")
                          throw new TypeError("Arguments to path.resolve must be strings");
                      if (!B)
                          return "";
                      A = B + "/" + A,
                      I = B.charAt(0) === "/"
                  }
                  return A = oA.normalizeArray(A.split("/").filter(function(i) {
                      return !!i
                  }), !I).join("/"),
                  (I ? "/" : "") + A || "."
              },
              relative: function(A, I) {
                  A = TA.resolve(A).substr(1),
                  I = TA.resolve(I).substr(1);
                  function g(a) {
                      for (var U = 0; U < a.length && a[U] === ""; U++)
                          ;
                      for (var J = a.length - 1; J >= 0 && a[J] === ""; J--)
                          ;
                      return U > J ? [] : a.slice(U, J - U + 1)
                  }
                  for (var B = g(A.split("/")), i = g(I.split("/")), G = Math.min(B.length, i.length), w = G, F = 0; F < G; F++)
                      if (B[F] !== i[F]) {
                          w = F;
                          break
                      }
                  for (var N = [], F = w; F < B.length; F++)
                      N.push("..");
                  return N = N.concat(i.slice(w)),
                  N.join("/")
              }
          }
            , RI = {
              ttys: [],
              init: function() {},
              shutdown: function() {},
              register: function(A, I) {
                  RI.ttys[A] = {
                      input: [],
                      output: [],
                      ops: I
                  },
                  D.registerDevice(A, RI.stream_ops)
              },
              stream_ops: {
                  open: function(A) {
                      var I = RI.ttys[A.node.rdev];
                      if (!I)
                          throw new D.ErrnoError(43);
                      A.tty = I,
                      A.seekable = !1
                  },
                  close: function(A) {
                      A.tty.ops.flush(A.tty)
                  },
                  flush: function(A) {
                      A.tty.ops.flush(A.tty)
                  },
                  read: function(A, I, g, B, i) {
                      if (!A.tty || !A.tty.ops.get_char)
                          throw new D.ErrnoError(60);
                      for (var G = 0, w = 0; w < B; w++) {
                          var F;
                          try {
                              F = A.tty.ops.get_char(A.tty)
                          } catch {
                              throw new D.ErrnoError(29)
                          }
                          if (F === void 0 && G === 0)
                              throw new D.ErrnoError(6);
                          if (F == null)
                              break;
                          G++,
                          I[g + w] = F
                      }
                      return G && (A.node.timestamp = Date.now()),
                      G
                  },
                  write: function(A, I, g, B, i) {
                      if (!A.tty || !A.tty.ops.put_char)
                          throw new D.ErrnoError(60);
                      try {
                          for (var G = 0; G < B; G++)
                              A.tty.ops.put_char(A.tty, I[g + G])
                      } catch {
                          throw new D.ErrnoError(29)
                      }
                      return B && (A.node.timestamp = Date.now()),
                      G
                  }
              },
              default_tty_ops: {
                  get_char: function(A) {
                      if (!A.input.length) {
                          var I = null;
                          if (u) {
                              var g = 256
                                , B = Buffer.alloc ? Buffer.alloc(g) : new Buffer(g)
                                , i = 0;
                              try {
                                  i = _A.readSync(process.stdin.fd, B, 0, g, null)
                              } catch (G) {
                                  if (G.toString().indexOf("EOF") != -1)
                                      i = 0;
                                  else
                                      throw G
                              }
                              i > 0 ? I = B.slice(0, i).toString("utf-8") : I = null
                          } else
                              typeof window < "u" && typeof window.prompt == "function" ? (I = window.prompt("Input: "),
                              I !== null && (I += `
`)) : typeof readline == "function" && (I = readline(),
                              I !== null && (I += `
`));
                          if (!I)
                              return null;
                          A.input = Wg(I, !0)
                      }
                      return A.input.shift()
                  },
                  put_char: function(A, I) {
                      I === null || I === 10 ? (x(JA(A.output, 0)),
                      A.output = []) : I != 0 && A.output.push(I)
                  },
                  flush: function(A) {
                      A.output && A.output.length > 0 && (x(JA(A.output, 0)),
                      A.output = [])
                  }
              },
              default_tty1_ops: {
                  put_char: function(A, I) {
                      I === null || I === 10 ? (FA(JA(A.output, 0)),
                      A.output = []) : I != 0 && A.output.push(I)
                  },
                  flush: function(A) {
                      A.output && A.output.length > 0 && (FA(JA(A.output, 0)),
                      A.output = [])
                  }
              }
          };
          function cg(A) {
              for (var I = CI(A, 16384), g = Gg(I); A < I; )
                  KA[g + A++] = 0;
              return g
          }
          var O = {
              ops_table: null,
              mount: function(A) {
                  return O.createNode(null, "/", 16895, 0)
              },
              createNode: function(A, I, g, B) {
                  if (D.isBlkdev(g) || D.isFIFO(g))
                      throw new D.ErrnoError(63);
                  O.ops_table || (O.ops_table = {
                      dir: {
                          node: {
                              getattr: O.node_ops.getattr,
                              setattr: O.node_ops.setattr,
                              lookup: O.node_ops.lookup,
                              mknod: O.node_ops.mknod,
                              rename: O.node_ops.rename,
                              unlink: O.node_ops.unlink,
                              rmdir: O.node_ops.rmdir,
                              readdir: O.node_ops.readdir,
                              symlink: O.node_ops.symlink
                          },
                          stream: {
                              llseek: O.stream_ops.llseek
                          }
                      },
                      file: {
                          node: {
                              getattr: O.node_ops.getattr,
                              setattr: O.node_ops.setattr
                          },
                          stream: {
                              llseek: O.stream_ops.llseek,
                              read: O.stream_ops.read,
                              write: O.stream_ops.write,
                              allocate: O.stream_ops.allocate,
                              mmap: O.stream_ops.mmap,
                              msync: O.stream_ops.msync
                          }
                      },
                      link: {
                          node: {
                              getattr: O.node_ops.getattr,
                              setattr: O.node_ops.setattr,
                              readlink: O.node_ops.readlink
                          },
                          stream: {}
                      },
                      chrdev: {
                          node: {
                              getattr: O.node_ops.getattr,
                              setattr: O.node_ops.setattr
                          },
                          stream: D.chrdev_stream_ops
                      }
                  });
                  var i = D.createNode(A, I, g, B);
                  return D.isDir(i.mode) ? (i.node_ops = O.ops_table.dir.node,
                  i.stream_ops = O.ops_table.dir.stream,
                  i.contents = {}) : D.isFile(i.mode) ? (i.node_ops = O.ops_table.file.node,
                  i.stream_ops = O.ops_table.file.stream,
                  i.usedBytes = 0,
                  i.contents = null) : D.isLink(i.mode) ? (i.node_ops = O.ops_table.link.node,
                  i.stream_ops = O.ops_table.link.stream) : D.isChrdev(i.mode) && (i.node_ops = O.ops_table.chrdev.node,
                  i.stream_ops = O.ops_table.chrdev.stream),
                  i.timestamp = Date.now(),
                  A && (A.contents[I] = i),
                  i
              },
              getFileDataAsRegularArray: function(A) {
                  if (A.contents && A.contents.subarray) {
                      for (var I = [], g = 0; g < A.usedBytes; ++g)
                          I.push(A.contents[g]);
                      return I
                  }
                  return A.contents
              },
              getFileDataAsTypedArray: function(A) {
                  return A.contents ? A.contents.subarray ? A.contents.subarray(0, A.usedBytes) : new Uint8Array(A.contents) : new Uint8Array(0)
              },
              expandFileStorage: function(A, I) {
                  var g = A.contents ? A.contents.length : 0;
                  if (!(g >= I)) {
                      var B = 1024 * 1024;
                      I = Math.max(I, g * (g < B ? 2 : 1.125) >>> 0),
                      g != 0 && (I = Math.max(I, 256));
                      var i = A.contents;
                      A.contents = new Uint8Array(I),
                      A.usedBytes > 0 && A.contents.set(i.subarray(0, A.usedBytes), 0)
                  }
              },
              resizeFileStorage: function(A, I) {
                  if (A.usedBytes != I) {
                      if (I == 0) {
                          A.contents = null,
                          A.usedBytes = 0;
                          return
                      }
                      if (!A.contents || A.contents.subarray) {
                          var g = A.contents;
                          A.contents = new Uint8Array(I),
                          g && A.contents.set(g.subarray(0, Math.min(I, A.usedBytes))),
                          A.usedBytes = I;
                          return
                      }
                      if (A.contents || (A.contents = []),
                      A.contents.length > I)
                          A.contents.length = I;
                      else
                          for (; A.contents.length < I; )
                              A.contents.push(0);
                      A.usedBytes = I
                  }
              },
              node_ops: {
                  getattr: function(A) {
                      var I = {};
                      return I.dev = D.isChrdev(A.mode) ? A.id : 1,
                      I.ino = A.id,
                      I.mode = A.mode,
                      I.nlink = 1,
                      I.uid = 0,
                      I.gid = 0,
                      I.rdev = A.rdev,
                      D.isDir(A.mode) ? I.size = 4096 : D.isFile(A.mode) ? I.size = A.usedBytes : D.isLink(A.mode) ? I.size = A.link.length : I.size = 0,
                      I.atime = new Date(A.timestamp),
                      I.mtime = new Date(A.timestamp),
                      I.ctime = new Date(A.timestamp),
                      I.blksize = 4096,
                      I.blocks = Math.ceil(I.size / I.blksize),
                      I
                  },
                  setattr: function(A, I) {
                      I.mode !== void 0 && (A.mode = I.mode),
                      I.timestamp !== void 0 && (A.timestamp = I.timestamp),
                      I.size !== void 0 && O.resizeFileStorage(A, I.size)
                  },
                  lookup: function(A, I) {
                      throw D.genericErrors[44]
                  },
                  mknod: function(A, I, g, B) {
                      return O.createNode(A, I, g, B)
                  },
                  rename: function(A, I, g) {
                      if (D.isDir(A.mode)) {
                          var B;
                          try {
                              B = D.lookupNode(I, g)
                          } catch {}
                          if (B)
                              for (var i in B.contents)
                                  throw new D.ErrnoError(55)
                      }
                      delete A.parent.contents[A.name],
                      A.name = g,
                      I.contents[g] = A,
                      A.parent = I
                  },
                  unlink: function(A, I) {
                      delete A.contents[I]
                  },
                  rmdir: function(A, I) {
                      var g = D.lookupNode(A, I);
                      for (var B in g.contents)
                          throw new D.ErrnoError(55);
                      delete A.contents[I]
                  },
                  readdir: function(A) {
                      var I = [".", ".."];
                      for (var g in A.contents)
                          A.contents.hasOwnProperty(g) && I.push(g);
                      return I
                  },
                  symlink: function(A, I, g) {
                      var B = O.createNode(A, I, 41471, 0);
                      return B.link = g,
                      B
                  },
                  readlink: function(A) {
                      if (!D.isLink(A.mode))
                          throw new D.ErrnoError(28);
                      return A.link
                  }
              },
              stream_ops: {
                  read: function(A, I, g, B, i) {
                      var G = A.node.contents;
                      if (i >= A.node.usedBytes)
                          return 0;
                      var w = Math.min(A.node.usedBytes - i, B);
                      if (w > 8 && G.subarray)
                          I.set(G.subarray(i, i + w), g);
                      else
                          for (var F = 0; F < w; F++)
                              I[g + F] = G[i + F];
                      return w
                  },
                  write: function(A, I, g, B, i, G) {
                      if (I.buffer === KA.buffer && (G = !1),
                      !B)
                          return 0;
                      var w = A.node;
                      if (w.timestamp = Date.now(),
                      I.subarray && (!w.contents || w.contents.subarray)) {
                          if (G)
                              return w.contents = I.subarray(g, g + B),
                              w.usedBytes = B,
                              B;
                          if (w.usedBytes === 0 && i === 0)
                              return w.contents = I.slice(g, g + B),
                              w.usedBytes = B,
                              B;
                          if (i + B <= w.usedBytes)
                              return w.contents.set(I.subarray(g, g + B), i),
                              B
                      }
                      if (O.expandFileStorage(w, i + B),
                      w.contents.subarray && I.subarray)
                          w.contents.set(I.subarray(g, g + B), i);
                      else
                          for (var F = 0; F < B; F++)
                              w.contents[i + F] = I[g + F];
                      return w.usedBytes = Math.max(w.usedBytes, i + B),
                      B
                  },
                  llseek: function(A, I, g) {
                      var B = I;
                      if (g === 1 ? B += A.position : g === 2 && D.isFile(A.node.mode) && (B += A.node.usedBytes),
                      B < 0)
                          throw new D.ErrnoError(28);
                      return B
                  },
                  allocate: function(A, I, g) {
                      O.expandFileStorage(A.node, I + g),
                      A.node.usedBytes = Math.max(A.node.usedBytes, I + g)
                  },
                  mmap: function(A, I, g, B, i, G) {
                      if (lA(I === 0),
                      !D.isFile(A.node.mode))
                          throw new D.ErrnoError(43);
                      var w, F, N = A.node.contents;
                      if (!(G & 2) && N.buffer === eI)
                          F = !1,
                          w = N.byteOffset;
                      else {
                          if ((B > 0 || B + g < N.length) && (N.subarray ? N = N.subarray(B, B + g) : N = Array.prototype.slice.call(N, B, B + g)),
                          F = !0,
                          w = cg(g),
                          !w)
                              throw new D.ErrnoError(48);
                          KA.set(N, w)
                      }
                      return {
                          ptr: w,
                          allocated: F
                      }
                  },
                  msync: function(A, I, g, B, i) {
                      if (!D.isFile(A.node.mode))
                          throw new D.ErrnoError(43);
                      return i & 2 || O.stream_ops.write(A, I, 0, B, g, !1),
                      0
                  }
              }
          }
            , D = {
              root: null,
              mounts: [],
              devices: {},
              streams: [],
              nextInode: 1,
              nameTable: null,
              currentPath: "/",
              initialized: !1,
              ignorePermissions: !0,
              trackingDelegate: {},
              tracking: {
                  openFlags: {
                      READ: 1,
                      WRITE: 2
                  }
              },
              ErrnoError: null,
              genericErrors: {},
              filesystems: null,
              syncFSRequests: 0,
              lookupPath: function(A, I) {
                  if (A = TA.resolve(D.cwd(), A),
                  I = I || {},
                  !A)
                      return {
                          path: "",
                          node: null
                      };
                  var g = {
                      follow_mount: !0,
                      recurse_count: 0
                  };
                  for (var B in g)
                      I[B] === void 0 && (I[B] = g[B]);
                  if (I.recurse_count > 8)
                      throw new D.ErrnoError(32);
                  for (var i = oA.normalizeArray(A.split("/").filter(function(S) {
                      return !!S
                  }), !1), G = D.root, w = "/", F = 0; F < i.length; F++) {
                      var N = F === i.length - 1;
                      if (N && I.parent)
                          break;
                      if (G = D.lookupNode(G, i[F]),
                      w = oA.join2(w, i[F]),
                      D.isMountpoint(G) && (!N || N && I.follow_mount) && (G = G.mounted.root),
                      !N || I.follow)
                          for (var a = 0; D.isLink(G.mode); ) {
                              var U = D.readlink(w);
                              w = TA.resolve(oA.dirname(w), U);
                              var J = D.lookupPath(w, {
                                  recurse_count: I.recurse_count
                              });
                              if (G = J.node,
                              a++ > 40)
                                  throw new D.ErrnoError(32)
                          }
                  }
                  return {
                      path: w,
                      node: G
                  }
              },
              getPath: function(A) {
                  for (var I; ; ) {
                      if (D.isRoot(A)) {
                          var g = A.mount.mountpoint;
                          return I ? g[g.length - 1] !== "/" ? g + "/" + I : g + I : g
                      }
                      I = I ? A.name + "/" + I : A.name,
                      A = A.parent
                  }
              },
              hashName: function(A, I) {
                  for (var g = 0, B = 0; B < I.length; B++)
                      g = (g << 5) - g + I.charCodeAt(B) | 0;
                  return (A + g >>> 0) % D.nameTable.length
              },
              hashAddNode: function(A) {
                  var I = D.hashName(A.parent.id, A.name);
                  A.name_next = D.nameTable[I],
                  D.nameTable[I] = A
              },
              hashRemoveNode: function(A) {
                  var I = D.hashName(A.parent.id, A.name);
                  if (D.nameTable[I] === A)
                      D.nameTable[I] = A.name_next;
                  else
                      for (var g = D.nameTable[I]; g; ) {
                          if (g.name_next === A) {
                              g.name_next = A.name_next;
                              break
                          }
                          g = g.name_next
                      }
              },
              lookupNode: function(A, I) {
                  var g = D.mayLookup(A);
                  if (g)
                      throw new D.ErrnoError(g,A);
                  for (var B = D.hashName(A.id, I), i = D.nameTable[B]; i; i = i.name_next) {
                      var G = i.name;
                      if (i.parent.id === A.id && G === I)
                          return i
                  }
                  return D.lookup(A, I)
              },
              createNode: function(A, I, g, B) {
                  var i = new D.FSNode(A,I,g,B);
                  return D.hashAddNode(i),
                  i
              },
              destroyNode: function(A) {
                  D.hashRemoveNode(A)
              },
              isRoot: function(A) {
                  return A === A.parent
              },
              isMountpoint: function(A) {
                  return !!A.mounted
              },
              isFile: function(A) {
                  return (A & 61440) === 32768
              },
              isDir: function(A) {
                  return (A & 61440) === 16384
              },
              isLink: function(A) {
                  return (A & 61440) === 40960
              },
              isChrdev: function(A) {
                  return (A & 61440) === 8192
              },
              isBlkdev: function(A) {
                  return (A & 61440) === 24576
              },
              isFIFO: function(A) {
                  return (A & 61440) === 4096
              },
              isSocket: function(A) {
                  return (A & 49152) === 49152
              },
              flagModes: {
                  r: 0,
                  "r+": 2,
                  w: 577,
                  "w+": 578,
                  a: 1089,
                  "a+": 1090
              },
              modeStringToFlags: function(A) {
                  var I = D.flagModes[A];
                  if (typeof I > "u")
                      throw new Error("Unknown file open mode: " + A);
                  return I
              },
              flagsToPermissionString: function(A) {
                  var I = ["r", "w", "rw"][A & 3];
                  return A & 512 && (I += "w"),
                  I
              },
              nodePermissions: function(A, I) {
                  return D.ignorePermissions ? 0 : I.indexOf("r") !== -1 && !(A.mode & 292) || I.indexOf("w") !== -1 && !(A.mode & 146) || I.indexOf("x") !== -1 && !(A.mode & 73) ? 2 : 0
              },
              mayLookup: function(A) {
                  var I = D.nodePermissions(A, "x");
                  return I || (A.node_ops.lookup ? 0 : 2)
              },
              mayCreate: function(A, I) {
                  try {
                      var g = D.lookupNode(A, I);
                      return 20
                  } catch {}
                  return D.nodePermissions(A, "wx")
              },
              mayDelete: function(A, I, g) {
                  var B;
                  try {
                      B = D.lookupNode(A, I)
                  } catch (G) {
                      return G.errno
                  }
                  var i = D.nodePermissions(A, "wx");
                  if (i)
                      return i;
                  if (g) {
                      if (!D.isDir(B.mode))
                          return 54;
                      if (D.isRoot(B) || D.getPath(B) === D.cwd())
                          return 10
                  } else if (D.isDir(B.mode))
                      return 31;
                  return 0
              },
              mayOpen: function(A, I) {
                  return A ? D.isLink(A.mode) ? 32 : D.isDir(A.mode) && (D.flagsToPermissionString(I) !== "r" || I & 512) ? 31 : D.nodePermissions(A, D.flagsToPermissionString(I)) : 44
              },
              MAX_OPEN_FDS: 4096,
              nextfd: function(A, I) {
                  A = A || 0,
                  I = I || D.MAX_OPEN_FDS;
                  for (var g = A; g <= I; g++)
                      if (!D.streams[g])
                          return g;
                  throw new D.ErrnoError(33)
              },
              getStream: function(A) {
                  return D.streams[A]
              },
              createStream: function(A, I, g) {
                  D.FSStream || (D.FSStream = function() {}
                  ,
                  D.FSStream.prototype = {
                      object: {
                          get: function() {
                              return this.node
                          },
                          set: function(w) {
                              this.node = w
                          }
                      },
                      isRead: {
                          get: function() {
                              return (this.flags & 2097155) !== 1
                          }
                      },
                      isWrite: {
                          get: function() {
                              return (this.flags & 2097155) !== 0
                          }
                      },
                      isAppend: {
                          get: function() {
                              return this.flags & 1024
                          }
                      }
                  });
                  var B = new D.FSStream;
                  for (var i in A)
                      B[i] = A[i];
                  A = B;
                  var G = D.nextfd(I, g);
                  return A.fd = G,
                  D.streams[G] = A,
                  A
              },
              closeStream: function(A) {
                  D.streams[A] = null
              },
              chrdev_stream_ops: {
                  open: function(A) {
                      var I = D.getDevice(A.node.rdev);
                      A.stream_ops = I.stream_ops,
                      A.stream_ops.open && A.stream_ops.open(A)
                  },
                  llseek: function() {
                      throw new D.ErrnoError(70)
                  }
              },
              major: function(A) {
                  return A >> 8
              },
              minor: function(A) {
                  return A & 255
              },
              makedev: function(A, I) {
                  return A << 8 | I
              },
              registerDevice: function(A, I) {
                  D.devices[A] = {
                      stream_ops: I
                  }
              },
              getDevice: function(A) {
                  return D.devices[A]
              },
              getMounts: function(A) {
                  for (var I = [], g = [A]; g.length; ) {
                      var B = g.pop();
                      I.push(B),
                      g.push.apply(g, B.mounts)
                  }
                  return I
              },
              syncfs: function(A, I) {
                  typeof A == "function" && (I = A,
                  A = !1),
                  D.syncFSRequests++,
                  D.syncFSRequests > 1 && FA("warning: " + D.syncFSRequests + " FS.syncfs operations in flight at once, probably just doing extra work");
                  var g = D.getMounts(D.root.mount)
                    , B = 0;
                  function i(w) {
                      return D.syncFSRequests--,
                      I(w)
                  }
                  function G(w) {
                      if (w)
                          return G.errored ? void 0 : (G.errored = !0,
                          i(w));
                      ++B >= g.length && i(null)
                  }
                  g.forEach(function(w) {
                      if (!w.type.syncfs)
                          return G(null);
                      w.type.syncfs(w, A, G)
                  })
              },
              mount: function(A, I, g) {
                  var B = g === "/", i = !g, G;
                  if (B && D.root)
                      throw new D.ErrnoError(10);
                  if (!B && !i) {
                      var w = D.lookupPath(g, {
                          follow_mount: !1
                      });
                      if (g = w.path,
                      G = w.node,
                      D.isMountpoint(G))
                          throw new D.ErrnoError(10);
                      if (!D.isDir(G.mode))
                          throw new D.ErrnoError(54)
                  }
                  var F = {
                      type: A,
                      opts: I,
                      mountpoint: g,
                      mounts: []
                  }
                    , N = A.mount(F);
                  return N.mount = F,
                  F.root = N,
                  B ? D.root = N : G && (G.mounted = F,
                  G.mount && G.mount.mounts.push(F)),
                  N
              },
              unmount: function(A) {
                  var I = D.lookupPath(A, {
                      follow_mount: !1
                  });
                  if (!D.isMountpoint(I.node))
                      throw new D.ErrnoError(28);
                  var g = I.node
                    , B = g.mounted
                    , i = D.getMounts(B);
                  Object.keys(D.nameTable).forEach(function(w) {
                      for (var F = D.nameTable[w]; F; ) {
                          var N = F.name_next;
                          i.indexOf(F.mount) !== -1 && D.destroyNode(F),
                          F = N
                      }
                  }),
                  g.mounted = null;
                  var G = g.mount.mounts.indexOf(B);
                  g.mount.mounts.splice(G, 1)
              },
              lookup: function(A, I) {
                  return A.node_ops.lookup(A, I)
              },
              mknod: function(A, I, g) {
                  var B = D.lookupPath(A, {
                      parent: !0
                  })
                    , i = B.node
                    , G = oA.basename(A);
                  if (!G || G === "." || G === "..")
                      throw new D.ErrnoError(28);
                  var w = D.mayCreate(i, G);
                  if (w)
                      throw new D.ErrnoError(w);
                  if (!i.node_ops.mknod)
                      throw new D.ErrnoError(63);
                  return i.node_ops.mknod(i, G, I, g)
              },
              create: function(A, I) {
                  return I = I !== void 0 ? I : 438,
                  I &= 4095,
                  I |= 32768,
                  D.mknod(A, I, 0)
              },
              mkdir: function(A, I) {
                  return I = I !== void 0 ? I : 511,
                  I &= 1023,
                  I |= 16384,
                  D.mknod(A, I, 0)
              },
              mkdirTree: function(A, I) {
                  for (var g = A.split("/"), B = "", i = 0; i < g.length; ++i)
                      if (g[i]) {
                          B += "/" + g[i];
                          try {
                              D.mkdir(B, I)
                          } catch (G) {
                              if (G.errno != 20)
                                  throw G
                          }
                      }
              },
              mkdev: function(A, I, g) {
                  return typeof g > "u" && (g = I,
                  I = 438),
                  I |= 8192,
                  D.mknod(A, I, g)
              },
              symlink: function(A, I) {
                  if (!TA.resolve(A))
                      throw new D.ErrnoError(44);
                  var g = D.lookupPath(I, {
                      parent: !0
                  })
                    , B = g.node;
                  if (!B)
                      throw new D.ErrnoError(44);
                  var i = oA.basename(I)
                    , G = D.mayCreate(B, i);
                  if (G)
                      throw new D.ErrnoError(G);
                  if (!B.node_ops.symlink)
                      throw new D.ErrnoError(63);
                  return B.node_ops.symlink(B, i, A)
              },
              rename: function(A, I) {
                  var g = oA.dirname(A), B = oA.dirname(I), i = oA.basename(A), G = oA.basename(I), w, F, N;
                  if (w = D.lookupPath(A, {
                      parent: !0
                  }),
                  F = w.node,
                  w = D.lookupPath(I, {
                      parent: !0
                  }),
                  N = w.node,
                  !F || !N)
                      throw new D.ErrnoError(44);
                  if (F.mount !== N.mount)
                      throw new D.ErrnoError(75);
                  var a = D.lookupNode(F, i)
                    , U = TA.relative(A, B);
                  if (U.charAt(0) !== ".")
                      throw new D.ErrnoError(28);
                  if (U = TA.relative(I, g),
                  U.charAt(0) !== ".")
                      throw new D.ErrnoError(55);
                  var J;
                  try {
                      J = D.lookupNode(N, G)
                  } catch {}
                  if (a !== J) {
                      var S = D.isDir(a.mode)
                        , t = D.mayDelete(F, i, S);
                      if (t)
                          throw new D.ErrnoError(t);
                      if (t = J ? D.mayDelete(N, G, S) : D.mayCreate(N, G),
                      t)
                          throw new D.ErrnoError(t);
                      if (!F.node_ops.rename)
                          throw new D.ErrnoError(63);
                      if (D.isMountpoint(a) || J && D.isMountpoint(J))
                          throw new D.ErrnoError(10);
                      if (N !== F && (t = D.nodePermissions(F, "w"),
                      t))
                          throw new D.ErrnoError(t);
                      try {
                          D.trackingDelegate.willMovePath && D.trackingDelegate.willMovePath(A, I)
                      } catch (r) {
                          FA("FS.trackingDelegate['willMovePath']('" + A + "', '" + I + "') threw an exception: " + r.message)
                      }
                      D.hashRemoveNode(a);
                      try {
                          F.node_ops.rename(a, N, G)
                      } catch (r) {
                          throw r
                      } finally {
                          D.hashAddNode(a)
                      }
                      try {
                          D.trackingDelegate.onMovePath && D.trackingDelegate.onMovePath(A, I)
                      } catch (r) {
                          FA("FS.trackingDelegate['onMovePath']('" + A + "', '" + I + "') threw an exception: " + r.message)
                      }
                  }
              },
              rmdir: function(A) {
                  var I = D.lookupPath(A, {
                      parent: !0
                  })
                    , g = I.node
                    , B = oA.basename(A)
                    , i = D.lookupNode(g, B)
                    , G = D.mayDelete(g, B, !0);
                  if (G)
                      throw new D.ErrnoError(G);
                  if (!g.node_ops.rmdir)
                      throw new D.ErrnoError(63);
                  if (D.isMountpoint(i))
                      throw new D.ErrnoError(10);
                  try {
                      D.trackingDelegate.willDeletePath && D.trackingDelegate.willDeletePath(A)
                  } catch (w) {
                      FA("FS.trackingDelegate['willDeletePath']('" + A + "') threw an exception: " + w.message)
                  }
                  g.node_ops.rmdir(g, B),
                  D.destroyNode(i);
                  try {
                      D.trackingDelegate.onDeletePath && D.trackingDelegate.onDeletePath(A)
                  } catch (w) {
                      FA("FS.trackingDelegate['onDeletePath']('" + A + "') threw an exception: " + w.message)
                  }
              },
              readdir: function(A) {
                  var I = D.lookupPath(A, {
                      follow: !0
                  })
                    , g = I.node;
                  if (!g.node_ops.readdir)
                      throw new D.ErrnoError(54);
                  return g.node_ops.readdir(g)
              },
              unlink: function(A) {
                  var I = D.lookupPath(A, {
                      parent: !0
                  })
                    , g = I.node
                    , B = oA.basename(A)
                    , i = D.lookupNode(g, B)
                    , G = D.mayDelete(g, B, !1);
                  if (G)
                      throw new D.ErrnoError(G);
                  if (!g.node_ops.unlink)
                      throw new D.ErrnoError(63);
                  if (D.isMountpoint(i))
                      throw new D.ErrnoError(10);
                  try {
                      D.trackingDelegate.willDeletePath && D.trackingDelegate.willDeletePath(A)
                  } catch (w) {
                      FA("FS.trackingDelegate['willDeletePath']('" + A + "') threw an exception: " + w.message)
                  }
                  g.node_ops.unlink(g, B),
                  D.destroyNode(i);
                  try {
                      D.trackingDelegate.onDeletePath && D.trackingDelegate.onDeletePath(A)
                  } catch (w) {
                      FA("FS.trackingDelegate['onDeletePath']('" + A + "') threw an exception: " + w.message)
                  }
              },
              readlink: function(A) {
                  var I = D.lookupPath(A)
                    , g = I.node;
                  if (!g)
                      throw new D.ErrnoError(44);
                  if (!g.node_ops.readlink)
                      throw new D.ErrnoError(28);
                  return TA.resolve(D.getPath(g.parent), g.node_ops.readlink(g))
              },
              stat: function(A, I) {
                  var g = D.lookupPath(A, {
                      follow: !I
                  })
                    , B = g.node;
                  if (!B)
                      throw new D.ErrnoError(44);
                  if (!B.node_ops.getattr)
                      throw new D.ErrnoError(63);
                  return B.node_ops.getattr(B)
              },
              lstat: function(A) {
                  return D.stat(A, !0)
              },
              chmod: function(A, I, g) {
                  var B;
                  if (typeof A == "string") {
                      var i = D.lookupPath(A, {
                          follow: !g
                      });
                      B = i.node
                  } else
                      B = A;
                  if (!B.node_ops.setattr)
                      throw new D.ErrnoError(63);
                  B.node_ops.setattr(B, {
                      mode: I & 4095 | B.mode & -4096,
                      timestamp: Date.now()
                  })
              },
              lchmod: function(A, I) {
                  D.chmod(A, I, !0)
              },
              fchmod: function(A, I) {
                  var g = D.getStream(A);
                  if (!g)
                      throw new D.ErrnoError(8);
                  D.chmod(g.node, I)
              },
              chown: function(A, I, g, B) {
                  var i;
                  if (typeof A == "string") {
                      var G = D.lookupPath(A, {
                          follow: !B
                      });
                      i = G.node
                  } else
                      i = A;
                  if (!i.node_ops.setattr)
                      throw new D.ErrnoError(63);
                  i.node_ops.setattr(i, {
                      timestamp: Date.now()
                  })
              },
              lchown: function(A, I, g) {
                  D.chown(A, I, g, !0)
              },
              fchown: function(A, I, g) {
                  var B = D.getStream(A);
                  if (!B)
                      throw new D.ErrnoError(8);
                  D.chown(B.node, I, g)
              },
              truncate: function(A, I) {
                  if (I < 0)
                      throw new D.ErrnoError(28);
                  var g;
                  if (typeof A == "string") {
                      var B = D.lookupPath(A, {
                          follow: !0
                      });
                      g = B.node
                  } else
                      g = A;
                  if (!g.node_ops.setattr)
                      throw new D.ErrnoError(63);
                  if (D.isDir(g.mode))
                      throw new D.ErrnoError(31);
                  if (!D.isFile(g.mode))
                      throw new D.ErrnoError(28);
                  var i = D.nodePermissions(g, "w");
                  if (i)
                      throw new D.ErrnoError(i);
                  g.node_ops.setattr(g, {
                      size: I,
                      timestamp: Date.now()
                  })
              },
              ftruncate: function(A, I) {
                  var g = D.getStream(A);
                  if (!g)
                      throw new D.ErrnoError(8);
                  if (!(g.flags & 2097155))
                      throw new D.ErrnoError(28);
                  D.truncate(g.node, I)
              },
              utime: function(A, I, g) {
                  var B = D.lookupPath(A, {
                      follow: !0
                  })
                    , i = B.node;
                  i.node_ops.setattr(i, {
                      timestamp: Math.max(I, g)
                  })
              },
              open: function(A, I, g, B, i) {
                  if (A === "")
                      throw new D.ErrnoError(44);
                  I = typeof I == "string" ? D.modeStringToFlags(I) : I,
                  g = typeof g > "u" ? 438 : g,
                  I & 64 ? g = g & 4095 | 32768 : g = 0;
                  var G;
                  if (typeof A == "object")
                      G = A;
                  else {
                      A = oA.normalize(A);
                      try {
                          var w = D.lookupPath(A, {
                              follow: !(I & 131072)
                          });
                          G = w.node
                      } catch {}
                  }
                  var F = !1;
                  if (I & 64)
                      if (G) {
                          if (I & 128)
                              throw new D.ErrnoError(20)
                      } else
                          G = D.mknod(A, g, 0),
                          F = !0;
                  if (!G)
                      throw new D.ErrnoError(44);
                  if (D.isChrdev(G.mode) && (I &= -513),
                  I & 65536 && !D.isDir(G.mode))
                      throw new D.ErrnoError(54);
                  if (!F) {
                      var N = D.mayOpen(G, I);
                      if (N)
                          throw new D.ErrnoError(N)
                  }
                  I & 512 && D.truncate(G, 0),
                  I &= -131713;
                  var a = D.createStream({
                      node: G,
                      path: D.getPath(G),
                      flags: I,
                      seekable: !0,
                      position: 0,
                      stream_ops: G.stream_ops,
                      ungotten: [],
                      error: !1
                  }, B, i);
                  a.stream_ops.open && a.stream_ops.open(a),
                  o.logReadFiles && !(I & 1) && (D.readFiles || (D.readFiles = {}),
                  A in D.readFiles || (D.readFiles[A] = 1,
                  FA("FS.trackingDelegate error on read file: " + A)));
                  try {
                      if (D.trackingDelegate.onOpenFile) {
                          var U = 0;
                          (I & 2097155) !== 1 && (U |= D.tracking.openFlags.READ),
                          I & 2097155 && (U |= D.tracking.openFlags.WRITE),
                          D.trackingDelegate.onOpenFile(A, U)
                      }
                  } catch (J) {
                      FA("FS.trackingDelegate['onOpenFile']('" + A + "', flags) threw an exception: " + J.message)
                  }
                  return a
              },
              close: function(A) {
                  if (D.isClosed(A))
                      throw new D.ErrnoError(8);
                  A.getdents && (A.getdents = null);
                  try {
                      A.stream_ops.close && A.stream_ops.close(A)
                  } catch (I) {
                      throw I
                  } finally {
                      D.closeStream(A.fd)
                  }
                  A.fd = null
              },
              isClosed: function(A) {
                  return A.fd === null
              },
              llseek: function(A, I, g) {
                  if (D.isClosed(A))
                      throw new D.ErrnoError(8);
                  if (!A.seekable || !A.stream_ops.llseek)
                      throw new D.ErrnoError(70);
                  if (g != 0 && g != 1 && g != 2)
                      throw new D.ErrnoError(28);
                  return A.position = A.stream_ops.llseek(A, I, g),
                  A.ungotten = [],
                  A.position
              },
              read: function(A, I, g, B, i) {
                  if (B < 0 || i < 0)
                      throw new D.ErrnoError(28);
                  if (D.isClosed(A))
                      throw new D.ErrnoError(8);
                  if ((A.flags & 2097155) === 1)
                      throw new D.ErrnoError(8);
                  if (D.isDir(A.node.mode))
                      throw new D.ErrnoError(31);
                  if (!A.stream_ops.read)
                      throw new D.ErrnoError(28);
                  var G = typeof i < "u";
                  if (!G)
                      i = A.position;
                  else if (!A.seekable)
                      throw new D.ErrnoError(70);
                  var w = A.stream_ops.read(A, I, g, B, i);
                  return G || (A.position += w),
                  w
              },
              write: function(A, I, g, B, i, G) {
                  if (B < 0 || i < 0)
                      throw new D.ErrnoError(28);
                  if (D.isClosed(A))
                      throw new D.ErrnoError(8);
                  if (!(A.flags & 2097155))
                      throw new D.ErrnoError(8);
                  if (D.isDir(A.node.mode))
                      throw new D.ErrnoError(31);
                  if (!A.stream_ops.write)
                      throw new D.ErrnoError(28);
                  A.seekable && A.flags & 1024 && D.llseek(A, 0, 2);
                  var w = typeof i < "u";
                  if (!w)
                      i = A.position;
                  else if (!A.seekable)
                      throw new D.ErrnoError(70);
                  var F = A.stream_ops.write(A, I, g, B, i, G);
                  w || (A.position += F);
                  try {
                      A.path && D.trackingDelegate.onWriteToFile && D.trackingDelegate.onWriteToFile(A.path)
                  } catch (N) {
                      FA("FS.trackingDelegate['onWriteToFile']('" + A.path + "') threw an exception: " + N.message)
                  }
                  return F
              },
              allocate: function(A, I, g) {
                  if (D.isClosed(A))
                      throw new D.ErrnoError(8);
                  if (I < 0 || g <= 0)
                      throw new D.ErrnoError(28);
                  if (!(A.flags & 2097155))
                      throw new D.ErrnoError(8);
                  if (!D.isFile(A.node.mode) && !D.isDir(A.node.mode))
                      throw new D.ErrnoError(43);
                  if (!A.stream_ops.allocate)
                      throw new D.ErrnoError(138);
                  A.stream_ops.allocate(A, I, g)
              },
              mmap: function(A, I, g, B, i, G) {
                  if (i & 2 && !(G & 2) && (A.flags & 2097155) !== 2)
                      throw new D.ErrnoError(2);
                  if ((A.flags & 2097155) === 1)
                      throw new D.ErrnoError(2);
                  if (!A.stream_ops.mmap)
                      throw new D.ErrnoError(43);
                  return A.stream_ops.mmap(A, I, g, B, i, G)
              },
              msync: function(A, I, g, B, i) {
                  return !A || !A.stream_ops.msync ? 0 : A.stream_ops.msync(A, I, g, B, i)
              },
              munmap: function(A) {
                  return 0
              },
              ioctl: function(A, I, g) {
                  if (!A.stream_ops.ioctl)
                      throw new D.ErrnoError(59);
                  return A.stream_ops.ioctl(A, I, g)
              },
              readFile: function(A, I) {
                  if (I = I || {},
                  I.flags = I.flags || 0,
                  I.encoding = I.encoding || "binary",
                  I.encoding !== "utf8" && I.encoding !== "binary")
                      throw new Error('Invalid encoding type "' + I.encoding + '"');
                  var g, B = D.open(A, I.flags), i = D.stat(A), G = i.size, w = new Uint8Array(G);
                  return D.read(B, w, 0, G, 0),
                  I.encoding === "utf8" ? g = JA(w, 0) : I.encoding === "binary" && (g = w),
                  D.close(B),
                  g
              },
              writeFile: function(A, I, g) {
                  g = g || {},
                  g.flags = g.flags || 577;
                  var B = D.open(A, g.flags, g.mode);
                  if (typeof I == "string") {
                      var i = new Uint8Array(qI(I) + 1)
                        , G = TI(I, i, 0, i.length);
                      D.write(B, i, 0, G, void 0, g.canOwn)
                  } else if (ArrayBuffer.isView(I))
                      D.write(B, I, 0, I.byteLength, void 0, g.canOwn);
                  else
                      throw new Error("Unsupported data type");
                  D.close(B)
              },
              cwd: function() {
                  return D.currentPath
              },
              chdir: function(A) {
                  var I = D.lookupPath(A, {
                      follow: !0
                  });
                  if (I.node === null)
                      throw new D.ErrnoError(44);
                  if (!D.isDir(I.node.mode))
                      throw new D.ErrnoError(54);
                  var g = D.nodePermissions(I.node, "x");
                  if (g)
                      throw new D.ErrnoError(g);
                  D.currentPath = I.path
              },
              createDefaultDirectories: function() {
                  D.mkdir("/tmp"),
                  D.mkdir("/home"),
                  D.mkdir("/home/web_user")
              },
              createDefaultDevices: function() {
                  D.mkdir("/dev"),
                  D.registerDevice(D.makedev(1, 3), {
                      read: function() {
                          return 0
                      },
                      write: function(I, g, B, i, G) {
                          return i
                      }
                  }),
                  D.mkdev("/dev/null", D.makedev(1, 3)),
                  RI.register(D.makedev(5, 0), RI.default_tty_ops),
                  RI.register(D.makedev(6, 0), RI.default_tty1_ops),
                  D.mkdev("/dev/tty", D.makedev(5, 0)),
                  D.mkdev("/dev/tty1", D.makedev(6, 0));
                  var A = CC();
                  D.createDevice("/dev", "random", A),
                  D.createDevice("/dev", "urandom", A),
                  D.mkdir("/dev/shm"),
                  D.mkdir("/dev/shm/tmp")
              },
              createSpecialDirectories: function() {
                  D.mkdir("/proc"),
                  D.mkdir("/proc/self"),
                  D.mkdir("/proc/self/fd"),
                  D.mount({
                      mount: function() {
                          var A = D.createNode("/proc/self", "fd", 16895, 73);
                          return A.node_ops = {
                              lookup: function(I, g) {
                                  var B = +g
                                    , i = D.getStream(B);
                                  if (!i)
                                      throw new D.ErrnoError(8);
                                  var G = {
                                      parent: null,
                                      mount: {
                                          mountpoint: "fake"
                                      },
                                      node_ops: {
                                          readlink: function() {
                                              return i.path
                                          }
                                      }
                                  };
                                  return G.parent = G,
                                  G
                              }
                          },
                          A
                      }
                  }, {}, "/proc/self/fd")
              },
              createStandardStreams: function() {
                  D.open("/dev/stdin", 0),
              },
};
}
