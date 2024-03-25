/**
* @vue/shared v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Qn(e, t) {
  const n = new Set(e.split(","));
  return t ? (s) => n.has(s.toLowerCase()) : (s) => n.has(s);
}
const X = {}, dt = [], _e = () => {
}, Lo = () => !1, cn = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Yn = (e) => e.startsWith("onUpdate:"), re = Object.assign, Jn = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, $o = Object.prototype.hasOwnProperty, K = (e, t) => $o.call(e, t), j = Array.isArray, ht = (e) => un(e) === "[object Map]", mr = (e) => un(e) === "[object Set]", B = (e) => typeof e == "function", te = (e) => typeof e == "string", xt = (e) => typeof e == "symbol", Z = (e) => e !== null && typeof e == "object", _r = (e) => (Z(e) || B(e)) && B(e.then) && B(e.catch), yr = Object.prototype.toString, un = (e) => yr.call(e), No = (e) => un(e).slice(8, -1), vr = (e) => un(e) === "[object Object]", Xn = (e) => te(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Ot = /* @__PURE__ */ Qn(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), fn = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, jo = /-(\w)/g, Le = fn((e) => e.replace(jo, (t, n) => n ? n.toUpperCase() : "")), Fo = /\B([A-Z])/g, wt = fn(
  (e) => e.replace(Fo, "-$1").toLowerCase()
), an = fn((e) => e.charAt(0).toUpperCase() + e.slice(1)), xn = fn((e) => e ? `on${an(e)}` : ""), Ye = (e, t) => !Object.is(e, t), wn = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, nn = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Ho = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Es;
const br = () => Es || (Es = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Zn(e) {
  if (j(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], r = te(s) ? Ko(s) : Zn(s);
      if (r)
        for (const o in r)
          t[o] = r[o];
    }
    return t;
  } else if (te(e) || Z(e))
    return e;
}
const ko = /;(?![^(]*\))/g, Bo = /:([^]+)/, Uo = /\/\*[^]*?\*\//g;
function Ko(e) {
  const t = {};
  return e.replace(Uo, "").split(ko).forEach((n) => {
    if (n) {
      const s = n.split(Bo);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function es(e) {
  let t = "";
  if (te(e))
    t = e;
  else if (j(e))
    for (let n = 0; n < e.length; n++) {
      const s = es(e[n]);
      s && (t += s + " ");
    }
  else if (Z(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const Vo = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Do = /* @__PURE__ */ Qn(Vo);
function Er(e) {
  return !!e || e === "";
}
const Wo = (e) => te(e) ? e : e == null ? "" : j(e) || Z(e) && (e.toString === yr || !B(e.toString)) ? JSON.stringify(e, xr, 2) : String(e), xr = (e, t) => t && t.__v_isRef ? xr(e, t.value) : ht(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [s, r], o) => (n[Rn(s, o) + " =>"] = r, n),
    {}
  )
} : mr(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Rn(n))
} : xt(t) ? Rn(t) : Z(t) && !j(t) && !vr(t) ? String(t) : t, Rn = (e, t = "") => {
  var n;
  return xt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
};
/**
* @vue/reactivity v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ve;
class zo {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this.parent = ve, !t && ve && (this.index = (ve.scopes || (ve.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  run(t) {
    if (this._active) {
      const n = ve;
      try {
        return ve = this, t();
      } finally {
        ve = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ve = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    ve = this.parent;
  }
  stop(t) {
    if (this._active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r && r !== this && (this.parent.scopes[this.index] = r, r.index = this.index);
      }
      this.parent = void 0, this._active = !1;
    }
  }
}
function qo(e, t = ve) {
  t && t.active && t.effects.push(e);
}
function Go() {
  return ve;
}
let nt;
class ts {
  constructor(t, n, s, r) {
    this.fn = t, this.trigger = n, this.scheduler = s, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, qo(this, r);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, rt();
      for (let t = 0; t < this._depsLength; t++) {
        const n = this.deps[t];
        if (n.computed && (Qo(n.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), ot();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(t) {
    this._dirtyLevel = t ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let t = qe, n = nt;
    try {
      return qe = !0, nt = this, this._runnings++, xs(this), this.fn();
    } finally {
      ws(this), this._runnings--, nt = n, qe = t;
    }
  }
  stop() {
    var t;
    this.active && (xs(this), ws(this), (t = this.onStop) == null || t.call(this), this.active = !1);
  }
}
function Qo(e) {
  return e.value;
}
function xs(e) {
  e._trackId++, e._depsLength = 0;
}
function ws(e) {
  if (e.deps.length > e._depsLength) {
    for (let t = e._depsLength; t < e.deps.length; t++)
      wr(e.deps[t], e);
    e.deps.length = e._depsLength;
  }
}
function wr(e, t) {
  const n = e.get(t);
  n !== void 0 && t._trackId !== n && (e.delete(t), e.size === 0 && e.cleanup());
}
let qe = !0, $n = 0;
const Rr = [];
function rt() {
  Rr.push(qe), qe = !1;
}
function ot() {
  const e = Rr.pop();
  qe = e === void 0 ? !0 : e;
}
function ns() {
  $n++;
}
function ss() {
  for ($n--; !$n && Nn.length; )
    Nn.shift()();
}
function Sr(e, t, n) {
  if (t.get(e) !== e._trackId) {
    t.set(e, e._trackId);
    const s = e.deps[e._depsLength];
    s !== t ? (s && wr(s, e), e.deps[e._depsLength++] = t) : e._depsLength++;
  }
}
const Nn = [];
function Cr(e, t, n) {
  ns();
  for (const s of e.keys()) {
    let r;
    s._dirtyLevel < t && (r ?? (r = e.get(s) === s._trackId)) && (s._shouldSchedule || (s._shouldSchedule = s._dirtyLevel === 0), s._dirtyLevel = t), s._shouldSchedule && (r ?? (r = e.get(s) === s._trackId)) && (s.trigger(), (!s._runnings || s.allowRecurse) && s._dirtyLevel !== 2 && (s._shouldSchedule = !1, s.scheduler && Nn.push(s.scheduler)));
  }
  ss();
}
const Pr = (e, t) => {
  const n = /* @__PURE__ */ new Map();
  return n.cleanup = e, n.computed = t, n;
}, jn = /* @__PURE__ */ new WeakMap(), st = Symbol(""), Fn = Symbol("");
function de(e, t, n) {
  if (qe && nt) {
    let s = jn.get(e);
    s || jn.set(e, s = /* @__PURE__ */ new Map());
    let r = s.get(n);
    r || s.set(n, r = Pr(() => s.delete(n))), Sr(
      nt,
      r
    );
  }
}
function je(e, t, n, s, r, o) {
  const i = jn.get(e);
  if (!i)
    return;
  let u = [];
  if (t === "clear")
    u = [...i.values()];
  else if (n === "length" && j(e)) {
    const c = Number(s);
    i.forEach((d, a) => {
      (a === "length" || !xt(a) && a >= c) && u.push(d);
    });
  } else
    switch (n !== void 0 && u.push(i.get(n)), t) {
      case "add":
        j(e) ? Xn(n) && u.push(i.get("length")) : (u.push(i.get(st)), ht(e) && u.push(i.get(Fn)));
        break;
      case "delete":
        j(e) || (u.push(i.get(st)), ht(e) && u.push(i.get(Fn)));
        break;
      case "set":
        ht(e) && u.push(i.get(st));
        break;
    }
  ns();
  for (const c of u)
    c && Cr(
      c,
      4
    );
  ss();
}
const Yo = /* @__PURE__ */ Qn("__proto__,__v_isRef,__isVue"), Ar = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(xt)
), Rs = /* @__PURE__ */ Jo();
function Jo() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = V(this);
      for (let o = 0, i = this.length; o < i; o++)
        de(s, "get", o + "");
      const r = s[t](...n);
      return r === -1 || r === !1 ? s[t](...n.map(V)) : r;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      rt(), ns();
      const s = V(this)[t].apply(this, n);
      return ss(), ot(), s;
    };
  }), e;
}
function Xo(e) {
  const t = V(this);
  return de(t, "has", e), t.hasOwnProperty(e);
}
class Or {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, s) {
    const r = this._isReadonly, o = this._isShallow;
    if (n === "__v_isReactive")
      return !r;
    if (n === "__v_isReadonly")
      return r;
    if (n === "__v_isShallow")
      return o;
    if (n === "__v_raw")
      return s === (r ? o ? ai : Lr : o ? Ir : Mr).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(s) ? t : void 0;
    const i = j(t);
    if (!r) {
      if (i && K(Rs, n))
        return Reflect.get(Rs, n, s);
      if (n === "hasOwnProperty")
        return Xo;
    }
    const u = Reflect.get(t, n, s);
    return (xt(n) ? Ar.has(n) : Yo(n)) || (r || de(t, "get", n), o) ? u : he(u) ? i && Xn(n) ? u : u.value : Z(u) ? r ? Nr(u) : hn(u) : u;
  }
}
class Tr extends Or {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._isShallow) {
      const c = yt(o);
      if (!sn(s) && !yt(s) && (o = V(o), s = V(s)), !j(t) && he(o) && !he(s))
        return c ? !1 : (o.value = s, !0);
    }
    const i = j(t) && Xn(n) ? Number(n) < t.length : K(t, n), u = Reflect.set(t, n, s, r);
    return t === V(r) && (i ? Ye(s, o) && je(t, "set", n, s) : je(t, "add", n, s)), u;
  }
  deleteProperty(t, n) {
    const s = K(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return r && s && je(t, "delete", n, void 0), r;
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return (!xt(n) || !Ar.has(n)) && de(t, "has", n), s;
  }
  ownKeys(t) {
    return de(
      t,
      "iterate",
      j(t) ? "length" : st
    ), Reflect.ownKeys(t);
  }
}
class Zo extends Or {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const ei = /* @__PURE__ */ new Tr(), ti = /* @__PURE__ */ new Zo(), ni = /* @__PURE__ */ new Tr(
  !0
), rs = (e) => e, dn = (e) => Reflect.getPrototypeOf(e);
function Dt(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const r = V(e), o = V(t);
  n || (Ye(t, o) && de(r, "get", t), de(r, "get", o));
  const { has: i } = dn(r), u = s ? rs : n ? ls : Nt;
  if (i.call(r, t))
    return u(e.get(t));
  if (i.call(r, o))
    return u(e.get(o));
  e !== r && e.get(t);
}
function Wt(e, t = !1) {
  const n = this.__v_raw, s = V(n), r = V(e);
  return t || (Ye(e, r) && de(s, "has", e), de(s, "has", r)), e === r ? n.has(e) : n.has(e) || n.has(r);
}
function zt(e, t = !1) {
  return e = e.__v_raw, !t && de(V(e), "iterate", st), Reflect.get(e, "size", e);
}
function Ss(e) {
  e = V(e);
  const t = V(this);
  return dn(t).has.call(t, e) || (t.add(e), je(t, "add", e, e)), this;
}
function Cs(e, t) {
  t = V(t);
  const n = V(this), { has: s, get: r } = dn(n);
  let o = s.call(n, e);
  o || (e = V(e), o = s.call(n, e));
  const i = r.call(n, e);
  return n.set(e, t), o ? Ye(t, i) && je(n, "set", e, t) : je(n, "add", e, t), this;
}
function Ps(e) {
  const t = V(this), { has: n, get: s } = dn(t);
  let r = n.call(t, e);
  r || (e = V(e), r = n.call(t, e)), s && s.call(t, e);
  const o = t.delete(e);
  return r && je(t, "delete", e, void 0), o;
}
function As() {
  const e = V(this), t = e.size !== 0, n = e.clear();
  return t && je(e, "clear", void 0, void 0), n;
}
function qt(e, t) {
  return function(s, r) {
    const o = this, i = o.__v_raw, u = V(i), c = t ? rs : e ? ls : Nt;
    return !e && de(u, "iterate", st), i.forEach((d, a) => s.call(r, c(d), c(a), o));
  };
}
function Gt(e, t, n) {
  return function(...s) {
    const r = this.__v_raw, o = V(r), i = ht(o), u = e === "entries" || e === Symbol.iterator && i, c = e === "keys" && i, d = r[e](...s), a = n ? rs : t ? ls : Nt;
    return !t && de(
      o,
      "iterate",
      c ? Fn : st
    ), {
      // iterator protocol
      next() {
        const { value: h, done: p } = d.next();
        return p ? { value: h, done: p } : {
          value: u ? [a(h[0]), a(h[1])] : a(h),
          done: p
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Ue(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function si() {
  const e = {
    get(o) {
      return Dt(this, o);
    },
    get size() {
      return zt(this);
    },
    has: Wt,
    add: Ss,
    set: Cs,
    delete: Ps,
    clear: As,
    forEach: qt(!1, !1)
  }, t = {
    get(o) {
      return Dt(this, o, !1, !0);
    },
    get size() {
      return zt(this);
    },
    has: Wt,
    add: Ss,
    set: Cs,
    delete: Ps,
    clear: As,
    forEach: qt(!1, !0)
  }, n = {
    get(o) {
      return Dt(this, o, !0);
    },
    get size() {
      return zt(this, !0);
    },
    has(o) {
      return Wt.call(this, o, !0);
    },
    add: Ue("add"),
    set: Ue("set"),
    delete: Ue("delete"),
    clear: Ue("clear"),
    forEach: qt(!0, !1)
  }, s = {
    get(o) {
      return Dt(this, o, !0, !0);
    },
    get size() {
      return zt(this, !0);
    },
    has(o) {
      return Wt.call(this, o, !0);
    },
    add: Ue("add"),
    set: Ue("set"),
    delete: Ue("delete"),
    clear: Ue("clear"),
    forEach: qt(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((o) => {
    e[o] = Gt(
      o,
      !1,
      !1
    ), n[o] = Gt(
      o,
      !0,
      !1
    ), t[o] = Gt(
      o,
      !1,
      !0
    ), s[o] = Gt(
      o,
      !0,
      !0
    );
  }), [
    e,
    n,
    t,
    s
  ];
}
const [
  ri,
  oi,
  ii,
  li
] = /* @__PURE__ */ si();
function os(e, t) {
  const n = t ? e ? li : ii : e ? oi : ri;
  return (s, r, o) => r === "__v_isReactive" ? !e : r === "__v_isReadonly" ? e : r === "__v_raw" ? s : Reflect.get(
    K(n, r) && r in s ? n : s,
    r,
    o
  );
}
const ci = {
  get: /* @__PURE__ */ os(!1, !1)
}, ui = {
  get: /* @__PURE__ */ os(!1, !0)
}, fi = {
  get: /* @__PURE__ */ os(!0, !1)
}, Mr = /* @__PURE__ */ new WeakMap(), Ir = /* @__PURE__ */ new WeakMap(), Lr = /* @__PURE__ */ new WeakMap(), ai = /* @__PURE__ */ new WeakMap();
function di(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function hi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : di(No(e));
}
function hn(e) {
  return yt(e) ? e : is(
    e,
    !1,
    ei,
    ci,
    Mr
  );
}
function $r(e) {
  return is(
    e,
    !1,
    ni,
    ui,
    Ir
  );
}
function Nr(e) {
  return is(
    e,
    !0,
    ti,
    fi,
    Lr
  );
}
function is(e, t, n, s, r) {
  if (!Z(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const o = r.get(e);
  if (o)
    return o;
  const i = hi(e);
  if (i === 0)
    return e;
  const u = new Proxy(
    e,
    i === 2 ? s : n
  );
  return r.set(e, u), u;
}
function pt(e) {
  return yt(e) ? pt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function yt(e) {
  return !!(e && e.__v_isReadonly);
}
function sn(e) {
  return !!(e && e.__v_isShallow);
}
function jr(e) {
  return pt(e) || yt(e);
}
function V(e) {
  const t = e && e.__v_raw;
  return t ? V(t) : e;
}
function Fr(e) {
  return Object.isExtensible(e) && nn(e, "__v_skip", !0), e;
}
const Nt = (e) => Z(e) ? hn(e) : e, ls = (e) => Z(e) ? Nr(e) : e;
class Hr {
  constructor(t, n, s, r) {
    this.getter = t, this._setter = n, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new ts(
      () => t(this._value),
      () => Yt(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !r, this.__v_isReadonly = s;
  }
  get value() {
    const t = V(this);
    return (!t._cacheable || t.effect.dirty) && Ye(t._value, t._value = t.effect.run()) && Yt(t, 4), kr(t), t.effect._dirtyLevel >= 2 && Yt(t, 2), t._value;
  }
  set value(t) {
    this._setter(t);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(t) {
    this.effect.dirty = t;
  }
  // #endregion
}
function pi(e, t, n = !1) {
  let s, r;
  const o = B(e);
  return o ? (s = e, r = _e) : (s = e.get, r = e.set), new Hr(s, r, o || !r, n);
}
function kr(e) {
  var t;
  qe && nt && (e = V(e), Sr(
    nt,
    (t = e.dep) != null ? t : e.dep = Pr(
      () => e.dep = void 0,
      e instanceof Hr ? e : void 0
    )
  ));
}
function Yt(e, t = 4, n) {
  e = V(e);
  const s = e.dep;
  s && Cr(
    s,
    t
  );
}
function he(e) {
  return !!(e && e.__v_isRef === !0);
}
function gi(e) {
  return Br(e, !1);
}
function mi(e) {
  return Br(e, !0);
}
function Br(e, t) {
  return he(e) ? e : new _i(e, t);
}
class _i {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : V(t), this._value = n ? t : Nt(t);
  }
  get value() {
    return kr(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || sn(t) || yt(t);
    t = n ? t : V(t), Ye(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Nt(t), Yt(this, 4));
  }
}
function Ge(e) {
  return he(e) ? e.value : e;
}
const yi = {
  get: (e, t, n) => Ge(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const r = e[t];
    return he(r) && !he(n) ? (r.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function Ur(e) {
  return pt(e) ? e : new Proxy(e, yi);
}
/**
* @vue/runtime-core v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Qe(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    pn(r, t, n);
  }
}
function we(e, t, n, s) {
  if (B(e)) {
    const o = Qe(e, t, n, s);
    return o && _r(o) && o.catch((i) => {
      pn(i, t, n);
    }), o;
  }
  const r = [];
  for (let o = 0; o < e.length; o++)
    r.push(we(e[o], t, n, s));
  return r;
}
function pn(e, t, n, s = !0) {
  const r = t ? t.vnode : null;
  if (t) {
    let o = t.parent;
    const i = t.proxy, u = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; o; ) {
      const d = o.ec;
      if (d) {
        for (let a = 0; a < d.length; a++)
          if (d[a](e, i, u) === !1)
            return;
      }
      o = o.parent;
    }
    const c = t.appContext.config.errorHandler;
    if (c) {
      Qe(
        c,
        null,
        10,
        [e, i, u]
      );
      return;
    }
  }
  vi(e, n, r, s);
}
function vi(e, t, n, s = !0) {
  console.error(e);
}
let jt = !1, Hn = !1;
const ie = [];
let Ie = 0;
const gt = [];
let Ve = null, tt = 0;
const Kr = /* @__PURE__ */ Promise.resolve();
let cs = null;
function Vr(e) {
  const t = cs || Kr;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function bi(e) {
  let t = Ie + 1, n = ie.length;
  for (; t < n; ) {
    const s = t + n >>> 1, r = ie[s], o = Ft(r);
    o < e || o === e && r.pre ? t = s + 1 : n = s;
  }
  return t;
}
function us(e) {
  (!ie.length || !ie.includes(
    e,
    jt && e.allowRecurse ? Ie + 1 : Ie
  )) && (e.id == null ? ie.push(e) : ie.splice(bi(e.id), 0, e), Dr());
}
function Dr() {
  !jt && !Hn && (Hn = !0, cs = Kr.then(zr));
}
function Ei(e) {
  const t = ie.indexOf(e);
  t > Ie && ie.splice(t, 1);
}
function xi(e) {
  j(e) ? gt.push(...e) : (!Ve || !Ve.includes(
    e,
    e.allowRecurse ? tt + 1 : tt
  )) && gt.push(e), Dr();
}
function Os(e, t, n = jt ? Ie + 1 : 0) {
  for (; n < ie.length; n++) {
    const s = ie[n];
    if (s && s.pre) {
      if (e && s.id !== e.uid)
        continue;
      ie.splice(n, 1), n--, s();
    }
  }
}
function Wr(e) {
  if (gt.length) {
    const t = [...new Set(gt)].sort(
      (n, s) => Ft(n) - Ft(s)
    );
    if (gt.length = 0, Ve) {
      Ve.push(...t);
      return;
    }
    for (Ve = t, tt = 0; tt < Ve.length; tt++)
      Ve[tt]();
    Ve = null, tt = 0;
  }
}
const Ft = (e) => e.id == null ? 1 / 0 : e.id, wi = (e, t) => {
  const n = Ft(e) - Ft(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function zr(e) {
  Hn = !1, jt = !0, ie.sort(wi);
  try {
    for (Ie = 0; Ie < ie.length; Ie++) {
      const t = ie[Ie];
      t && t.active !== !1 && Qe(t, null, 14);
    }
  } finally {
    Ie = 0, ie.length = 0, Wr(), jt = !1, cs = null, (ie.length || gt.length) && zr();
  }
}
function Ri(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || X;
  let r = n;
  const o = t.startsWith("update:"), i = o && t.slice(7);
  if (i && i in s) {
    const a = `${i === "modelValue" ? "model" : i}Modifiers`, { number: h, trim: p } = s[a] || X;
    p && (r = n.map((v) => te(v) ? v.trim() : v)), h && (r = n.map(Ho));
  }
  let u, c = s[u = xn(t)] || // also try camelCase event handler (#2249)
  s[u = xn(Le(t))];
  !c && o && (c = s[u = xn(wt(t))]), c && we(
    c,
    e,
    6,
    r
  );
  const d = s[u + "Once"];
  if (d) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[u])
      return;
    e.emitted[u] = !0, we(
      d,
      e,
      6,
      r
    );
  }
}
function qr(e, t, n = !1) {
  const s = t.emitsCache, r = s.get(e);
  if (r !== void 0)
    return r;
  const o = e.emits;
  let i = {}, u = !1;
  if (!B(e)) {
    const c = (d) => {
      const a = qr(d, t, !0);
      a && (u = !0, re(i, a));
    };
    !n && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
  }
  return !o && !u ? (Z(e) && s.set(e, null), null) : (j(o) ? o.forEach((c) => i[c] = null) : re(i, o), Z(e) && s.set(e, i), i);
}
function gn(e, t) {
  return !e || !cn(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), K(e, t[0].toLowerCase() + t.slice(1)) || K(e, wt(t)) || K(e, t));
}
let Ee = null, Gr = null;
function rn(e) {
  const t = Ee;
  return Ee = e, Gr = e && e.type.__scopeId || null, t;
}
function Qr(e, t = Ee, n) {
  if (!t || e._n)
    return e;
  const s = (...r) => {
    s._d && Bs(-1);
    const o = rn(t);
    let i;
    try {
      i = e(...r);
    } finally {
      rn(o), s._d && Bs(1);
    }
    return i;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
function Sn(e) {
  const {
    type: t,
    vnode: n,
    proxy: s,
    withProxy: r,
    props: o,
    propsOptions: [i],
    slots: u,
    attrs: c,
    emit: d,
    render: a,
    renderCache: h,
    data: p,
    setupState: v,
    ctx: A,
    inheritAttrs: L
  } = e;
  let F, T;
  const $ = rn(e);
  try {
    if (n.shapeFlag & 4) {
      const D = r || s, ee = D;
      F = Me(
        a.call(
          ee,
          D,
          h,
          o,
          v,
          p,
          A
        )
      ), T = c;
    } else {
      const D = t;
      F = Me(
        D.length > 1 ? D(
          o,
          { attrs: c, slots: u, emit: d }
        ) : D(
          o,
          null
          /* we know it doesn't need it */
        )
      ), T = t.props ? c : Si(c);
    }
  } catch (D) {
    It.length = 0, pn(D, e, 1), F = ge(Ht);
  }
  let H = F;
  if (T && L !== !1) {
    const D = Object.keys(T), { shapeFlag: ee } = H;
    D.length && ee & 7 && (i && D.some(Yn) && (T = Ci(
      T,
      i
    )), H = vt(H, T));
  }
  return n.dirs && (H = vt(H), H.dirs = H.dirs ? H.dirs.concat(n.dirs) : n.dirs), n.transition && (H.transition = n.transition), F = H, rn($), F;
}
const Si = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || cn(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Ci = (e, t) => {
  const n = {};
  for (const s in e)
    (!Yn(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
};
function Pi(e, t, n) {
  const { props: s, children: r, component: o } = e, { props: i, children: u, patchFlag: c } = t, d = o.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && c >= 0) {
    if (c & 1024)
      return !0;
    if (c & 16)
      return s ? Ts(s, i, d) : !!i;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let h = 0; h < a.length; h++) {
        const p = a[h];
        if (i[p] !== s[p] && !gn(d, p))
          return !0;
      }
    }
  } else
    return (r || u) && (!u || !u.$stable) ? !0 : s === i ? !1 : s ? i ? Ts(s, i, d) : !0 : !!i;
  return !1;
}
function Ts(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !gn(n, o))
      return !0;
  }
  return !1;
}
function Ai({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if (s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Yr = "components";
function Oi(e, t) {
  return Mi(Yr, e, !0, t) || e;
}
const Ti = Symbol.for("v-ndc");
function Mi(e, t, n = !0, s = !1) {
  const r = Ee || le;
  if (r) {
    const o = r.type;
    if (e === Yr) {
      const u = Cl(
        o,
        !1
      );
      if (u && (u === t || u === Le(t) || u === an(Le(t))))
        return o;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      Ms(r[e] || o[e], t) || // global registration
      Ms(r.appContext[e], t)
    );
    return !i && s ? o : i;
  }
}
function Ms(e, t) {
  return e && (e[t] || e[Le(t)] || e[an(Le(t))]);
}
const Ii = (e) => e.__isSuspense;
function Li(e, t) {
  t && t.pendingBranch ? j(e) ? t.effects.push(...e) : t.effects.push(e) : xi(e);
}
const $i = Symbol.for("v-scx"), Ni = () => Fe($i), Qt = {};
function Jt(e, t, n) {
  return Jr(e, t, n);
}
function Jr(e, t, {
  immediate: n,
  deep: s,
  flush: r,
  once: o,
  onTrack: i,
  onTrigger: u
} = X) {
  if (t && o) {
    const k = t;
    t = (...ce) => {
      k(...ce), ee();
    };
  }
  const c = le, d = (k) => s === !0 ? k : (
    // for deep: false, only traverse root-level properties
    at(k, s === !1 ? 1 : void 0)
  );
  let a, h = !1, p = !1;
  if (he(e) ? (a = () => e.value, h = sn(e)) : pt(e) ? (a = () => d(e), h = !0) : j(e) ? (p = !0, h = e.some((k) => pt(k) || sn(k)), a = () => e.map((k) => {
    if (he(k))
      return k.value;
    if (pt(k))
      return d(k);
    if (B(k))
      return Qe(k, c, 2);
  })) : B(e) ? t ? a = () => Qe(e, c, 2) : a = () => (v && v(), we(
    e,
    c,
    3,
    [A]
  )) : a = _e, t && s) {
    const k = a;
    a = () => at(k());
  }
  let v, A = (k) => {
    v = H.onStop = () => {
      Qe(k, c, 4), v = H.onStop = void 0;
    };
  }, L;
  if (vn)
    if (A = _e, t ? n && we(t, c, 3, [
      a(),
      p ? [] : void 0,
      A
    ]) : a(), r === "sync") {
      const k = Ni();
      L = k.__watcherHandles || (k.__watcherHandles = []);
    } else
      return _e;
  let F = p ? new Array(e.length).fill(Qt) : Qt;
  const T = () => {
    if (!(!H.active || !H.dirty))
      if (t) {
        const k = H.run();
        (s || h || (p ? k.some((ce, me) => Ye(ce, F[me])) : Ye(k, F))) && (v && v(), we(t, c, 3, [
          k,
          // pass undefined as the old value when it's changed for the first time
          F === Qt ? void 0 : p && F[0] === Qt ? [] : F,
          A
        ]), F = k);
      } else
        H.run();
  };
  T.allowRecurse = !!t;
  let $;
  r === "sync" ? $ = T : r === "post" ? $ = () => ae(T, c && c.suspense) : (T.pre = !0, c && (T.id = c.uid), $ = () => us(T));
  const H = new ts(a, _e, $), D = Go(), ee = () => {
    H.stop(), D && Jn(D.effects, H);
  };
  return t ? n ? T() : F = H.run() : r === "post" ? ae(
    H.run.bind(H),
    c && c.suspense
  ) : H.run(), L && L.push(ee), ee;
}
function ji(e, t, n) {
  const s = this.proxy, r = te(e) ? e.includes(".") ? Xr(s, e) : () => s[e] : e.bind(s, s);
  let o;
  B(t) ? o = t : (o = t.handler, n = t);
  const i = Kt(this), u = Jr(r, o.bind(s), n);
  return i(), u;
}
function Xr(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++)
      s = s[n[r]];
    return s;
  };
}
function at(e, t, n = 0, s) {
  if (!Z(e) || e.__v_skip)
    return e;
  if (t && t > 0) {
    if (n >= t)
      return e;
    n++;
  }
  if (s = s || /* @__PURE__ */ new Set(), s.has(e))
    return e;
  if (s.add(e), he(e))
    at(e.value, t, n, s);
  else if (j(e))
    for (let r = 0; r < e.length; r++)
      at(e[r], t, n, s);
  else if (mr(e) || ht(e))
    e.forEach((r) => {
      at(r, t, n, s);
    });
  else if (vr(e))
    for (const r in e)
      at(e[r], t, n, s);
  return e;
}
function Ze(e, t, n, s) {
  const r = e.dirs, o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const u = r[i];
    o && (u.oldValue = o[i].value);
    let c = u.dir[s];
    c && (rt(), we(c, n, 8, [
      e.el,
      u,
      e,
      t
    ]), ot());
  }
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function fs(e, t) {
  return B(e) ? (
    // #8326: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    re({ name: e.name }, t, { setup: e })
  ) : e;
}
const Xt = (e) => !!e.type.__asyncLoader, Zr = (e) => e.type.__isKeepAlive;
function Fi(e, t) {
  eo(e, "a", t);
}
function Hi(e, t) {
  eo(e, "da", t);
}
function eo(e, t, n = le) {
  const s = e.__wdc || (e.__wdc = () => {
    let r = n;
    for (; r; ) {
      if (r.isDeactivated)
        return;
      r = r.parent;
    }
    return e();
  });
  if (mn(t, s, n), n) {
    let r = n.parent;
    for (; r && r.parent; )
      Zr(r.parent.vnode) && ki(s, t, n, r), r = r.parent;
  }
}
function ki(e, t, n, s) {
  const r = mn(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  to(() => {
    Jn(s[t], r);
  }, n);
}
function mn(e, t, n = le, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []), o = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      rt();
      const u = Kt(n), c = we(t, n, e, i);
      return u(), ot(), c;
    });
    return s ? r.unshift(o) : r.push(o), o;
  }
}
const He = (e) => (t, n = le) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!vn || e === "sp") && mn(e, (...s) => t(...s), n)
), Bi = He("bm"), Ui = He("m"), Ki = He("bu"), Vi = He("u"), Di = He("bum"), to = He("um"), Wi = He("sp"), zi = He(
  "rtg"
), qi = He(
  "rtc"
);
function Gi(e, t = le) {
  mn("ec", e, t);
}
function Qi(e, t, n, s) {
  let r;
  const o = n && n[s];
  if (j(e) || te(e)) {
    r = new Array(e.length);
    for (let i = 0, u = e.length; i < u; i++)
      r[i] = t(e[i], i, void 0, o && o[i]);
  } else if (typeof e == "number") {
    r = new Array(e);
    for (let i = 0; i < e; i++)
      r[i] = t(i + 1, i, void 0, o && o[i]);
  } else if (Z(e))
    if (e[Symbol.iterator])
      r = Array.from(
        e,
        (i, u) => t(i, u, void 0, o && o[u])
      );
    else {
      const i = Object.keys(e);
      r = new Array(i.length);
      for (let u = 0, c = i.length; u < c; u++) {
        const d = i[u];
        r[u] = t(e[d], d, u, o && o[u]);
      }
    }
  else
    r = [];
  return n && (n[s] = r), r;
}
const kn = (e) => e ? po(e) ? gs(e) || e.proxy : kn(e.parent) : null, Tt = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ re(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => kn(e.parent),
    $root: (e) => kn(e.root),
    $emit: (e) => e.emit,
    $options: (e) => as(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      e.effect.dirty = !0, us(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = Vr.bind(e.proxy)),
    $watch: (e) => ji.bind(e)
  })
), Cn = (e, t) => e !== X && !e.__isScriptSetup && K(e, t), Yi = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: r, props: o, accessCache: i, type: u, appContext: c } = e;
    let d;
    if (t[0] !== "$") {
      const v = i[t];
      if (v !== void 0)
        switch (v) {
          case 1:
            return s[t];
          case 2:
            return r[t];
          case 4:
            return n[t];
          case 3:
            return o[t];
        }
      else {
        if (Cn(s, t))
          return i[t] = 1, s[t];
        if (r !== X && K(r, t))
          return i[t] = 2, r[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (d = e.propsOptions[0]) && K(d, t)
        )
          return i[t] = 3, o[t];
        if (n !== X && K(n, t))
          return i[t] = 4, n[t];
        Bn && (i[t] = 0);
      }
    }
    const a = Tt[t];
    let h, p;
    if (a)
      return t === "$attrs" && de(e, "get", t), a(e);
    if (
      // css module (injected by vue-loader)
      (h = u.__cssModules) && (h = h[t])
    )
      return h;
    if (n !== X && K(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = c.config.globalProperties, K(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: r, ctx: o } = e;
    return Cn(r, t) ? (r[t] = n, !0) : s !== X && K(s, t) ? (s[t] = n, !0) : K(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (o[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: r, propsOptions: o }
  }, i) {
    let u;
    return !!n[i] || e !== X && K(e, i) || Cn(t, i) || (u = o[0]) && K(u, i) || K(s, i) || K(Tt, i) || K(r.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : K(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Is(e) {
  return j(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
let Bn = !0;
function Ji(e) {
  const t = as(e), n = e.proxy, s = e.ctx;
  Bn = !1, t.beforeCreate && Ls(t.beforeCreate, e, "bc");
  const {
    // state
    data: r,
    computed: o,
    methods: i,
    watch: u,
    provide: c,
    inject: d,
    // lifecycle
    created: a,
    beforeMount: h,
    mounted: p,
    beforeUpdate: v,
    updated: A,
    activated: L,
    deactivated: F,
    beforeDestroy: T,
    beforeUnmount: $,
    destroyed: H,
    unmounted: D,
    render: ee,
    renderTracked: k,
    renderTriggered: ce,
    errorCaptured: me,
    serverPrefetch: Je,
    // public API
    expose: Se,
    inheritAttrs: ke,
    // assets
    components: Xe,
    directives: Ce,
    filters: Rt
  } = t;
  if (d && Xi(d, s, null), i)
    for (const G in i) {
      const W = i[G];
      B(W) && (s[G] = W.bind(n));
    }
  if (r) {
    const G = r.call(n, n);
    Z(G) && (e.data = hn(G));
  }
  if (Bn = !0, o)
    for (const G in o) {
      const W = o[G], $e = B(W) ? W.bind(n, n) : B(W.get) ? W.get.bind(n, n) : _e, Be = !B(W) && B(W.set) ? W.set.bind(n) : _e, Pe = be({
        get: $e,
        set: Be
      });
      Object.defineProperty(s, G, {
        enumerable: !0,
        configurable: !0,
        get: () => Pe.value,
        set: (fe) => Pe.value = fe
      });
    }
  if (u)
    for (const G in u)
      no(u[G], s, n, G);
  if (c) {
    const G = B(c) ? c.call(n) : c;
    Reflect.ownKeys(G).forEach((W) => {
      Zt(W, G[W]);
    });
  }
  a && Ls(a, e, "c");
  function ne(G, W) {
    j(W) ? W.forEach(($e) => G($e.bind(n))) : W && G(W.bind(n));
  }
  if (ne(Bi, h), ne(Ui, p), ne(Ki, v), ne(Vi, A), ne(Fi, L), ne(Hi, F), ne(Gi, me), ne(qi, k), ne(zi, ce), ne(Di, $), ne(to, D), ne(Wi, Je), j(Se))
    if (Se.length) {
      const G = e.exposed || (e.exposed = {});
      Se.forEach((W) => {
        Object.defineProperty(G, W, {
          get: () => n[W],
          set: ($e) => n[W] = $e
        });
      });
    } else
      e.exposed || (e.exposed = {});
  ee && e.render === _e && (e.render = ee), ke != null && (e.inheritAttrs = ke), Xe && (e.components = Xe), Ce && (e.directives = Ce);
}
function Xi(e, t, n = _e) {
  j(e) && (e = Un(e));
  for (const s in e) {
    const r = e[s];
    let o;
    Z(r) ? "default" in r ? o = Fe(
      r.from || s,
      r.default,
      !0
    ) : o = Fe(r.from || s) : o = Fe(r), he(o) ? Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => o.value,
      set: (i) => o.value = i
    }) : t[s] = o;
  }
}
function Ls(e, t, n) {
  we(
    j(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function no(e, t, n, s) {
  const r = s.includes(".") ? Xr(n, s) : () => n[s];
  if (te(e)) {
    const o = t[e];
    B(o) && Jt(r, o);
  } else if (B(e))
    Jt(r, e.bind(n));
  else if (Z(e))
    if (j(e))
      e.forEach((o) => no(o, t, n, s));
    else {
      const o = B(e.handler) ? e.handler.bind(n) : t[e.handler];
      B(o) && Jt(r, o, e);
    }
}
function as(e) {
  const t = e.type, { mixins: n, extends: s } = t, {
    mixins: r,
    optionsCache: o,
    config: { optionMergeStrategies: i }
  } = e.appContext, u = o.get(t);
  let c;
  return u ? c = u : !r.length && !n && !s ? c = t : (c = {}, r.length && r.forEach(
    (d) => on(c, d, i, !0)
  ), on(c, t, i)), Z(t) && o.set(t, c), c;
}
function on(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  o && on(e, o, n, !0), r && r.forEach(
    (i) => on(e, i, n, !0)
  );
  for (const i in t)
    if (!(s && i === "expose")) {
      const u = Zi[i] || n && n[i];
      e[i] = u ? u(e[i], t[i]) : t[i];
    }
  return e;
}
const Zi = {
  data: $s,
  props: Ns,
  emits: Ns,
  // objects
  methods: At,
  computed: At,
  // lifecycle
  beforeCreate: ue,
  created: ue,
  beforeMount: ue,
  mounted: ue,
  beforeUpdate: ue,
  updated: ue,
  beforeDestroy: ue,
  beforeUnmount: ue,
  destroyed: ue,
  unmounted: ue,
  activated: ue,
  deactivated: ue,
  errorCaptured: ue,
  serverPrefetch: ue,
  // assets
  components: At,
  directives: At,
  // watch
  watch: tl,
  // provide / inject
  provide: $s,
  inject: el
};
function $s(e, t) {
  return t ? e ? function() {
    return re(
      B(e) ? e.call(this, this) : e,
      B(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function el(e, t) {
  return At(Un(e), Un(t));
}
function Un(e) {
  if (j(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ue(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function At(e, t) {
  return e ? re(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Ns(e, t) {
  return e ? j(e) && j(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : re(
    /* @__PURE__ */ Object.create(null),
    Is(e),
    Is(t ?? {})
  ) : t;
}
function tl(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = re(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = ue(e[s], t[s]);
  return n;
}
function so() {
  return {
    app: null,
    config: {
      isNativeTag: Lo,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let nl = 0;
function sl(e, t) {
  return function(s, r = null) {
    B(s) || (s = re({}, s)), r != null && !Z(r) && (r = null);
    const o = so(), i = /* @__PURE__ */ new WeakSet();
    let u = !1;
    const c = o.app = {
      _uid: nl++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: Al,
      get config() {
        return o.config;
      },
      set config(d) {
      },
      use(d, ...a) {
        return i.has(d) || (d && B(d.install) ? (i.add(d), d.install(c, ...a)) : B(d) && (i.add(d), d(c, ...a))), c;
      },
      mixin(d) {
        return o.mixins.includes(d) || o.mixins.push(d), c;
      },
      component(d, a) {
        return a ? (o.components[d] = a, c) : o.components[d];
      },
      directive(d, a) {
        return a ? (o.directives[d] = a, c) : o.directives[d];
      },
      mount(d, a, h) {
        if (!u) {
          const p = ge(s, r);
          return p.appContext = o, h === !0 ? h = "svg" : h === !1 && (h = void 0), a && t ? t(p, d) : e(p, d, h), u = !0, c._container = d, d.__vue_app__ = c, gs(p.component) || p.component.proxy;
        }
      },
      unmount() {
        u && (e(null, c._container), delete c._container.__vue_app__);
      },
      provide(d, a) {
        return o.provides[d] = a, c;
      },
      runWithContext(d) {
        const a = Mt;
        Mt = c;
        try {
          return d();
        } finally {
          Mt = a;
        }
      }
    };
    return c;
  };
}
let Mt = null;
function Zt(e, t) {
  if (le) {
    let n = le.provides;
    const s = le.parent && le.parent.provides;
    s === n && (n = le.provides = Object.create(s)), n[e] = t;
  }
}
function Fe(e, t, n = !1) {
  const s = le || Ee;
  if (s || Mt) {
    const r = s ? s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides : Mt._context.provides;
    if (r && e in r)
      return r[e];
    if (arguments.length > 1)
      return n && B(t) ? t.call(s && s.proxy) : t;
  }
}
function rl(e, t, n, s = !1) {
  const r = {}, o = {};
  nn(o, yn, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), ro(e, t, r, o);
  for (const i in e.propsOptions[0])
    i in r || (r[i] = void 0);
  n ? e.props = s ? r : $r(r) : e.type.props ? e.props = r : e.props = o, e.attrs = o;
}
function ol(e, t, n, s) {
  const {
    props: r,
    attrs: o,
    vnode: { patchFlag: i }
  } = e, u = V(r), [c] = e.propsOptions;
  let d = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (s || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const a = e.vnode.dynamicProps;
      for (let h = 0; h < a.length; h++) {
        let p = a[h];
        if (gn(e.emitsOptions, p))
          continue;
        const v = t[p];
        if (c)
          if (K(o, p))
            v !== o[p] && (o[p] = v, d = !0);
          else {
            const A = Le(p);
            r[A] = Kn(
              c,
              u,
              A,
              v,
              e,
              !1
            );
          }
        else
          v !== o[p] && (o[p] = v, d = !0);
      }
    }
  } else {
    ro(e, t, r, o) && (d = !0);
    let a;
    for (const h in u)
      (!t || // for camelCase
      !K(t, h) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((a = wt(h)) === h || !K(t, a))) && (c ? n && // for camelCase
      (n[h] !== void 0 || // for kebab-case
      n[a] !== void 0) && (r[h] = Kn(
        c,
        u,
        h,
        void 0,
        e,
        !0
      )) : delete r[h]);
    if (o !== u)
      for (const h in o)
        (!t || !K(t, h)) && (delete o[h], d = !0);
  }
  d && je(e, "set", "$attrs");
}
function ro(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1, u;
  if (t)
    for (let c in t) {
      if (Ot(c))
        continue;
      const d = t[c];
      let a;
      r && K(r, a = Le(c)) ? !o || !o.includes(a) ? n[a] = d : (u || (u = {}))[a] = d : gn(e.emitsOptions, c) || (!(c in s) || d !== s[c]) && (s[c] = d, i = !0);
    }
  if (o) {
    const c = V(n), d = u || X;
    for (let a = 0; a < o.length; a++) {
      const h = o[a];
      n[h] = Kn(
        r,
        c,
        h,
        d[h],
        e,
        !K(d, h)
      );
    }
  }
  return i;
}
function Kn(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const u = K(i, "default");
    if (u && s === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && B(c)) {
        const { propsDefaults: d } = r;
        if (n in d)
          s = d[n];
        else {
          const a = Kt(r);
          s = d[n] = c.call(
            null,
            t
          ), a();
        }
      } else
        s = c;
    }
    i[
      0
      /* shouldCast */
    ] && (o && !u ? s = !1 : i[
      1
      /* shouldCastTrue */
    ] && (s === "" || s === wt(n)) && (s = !0));
  }
  return s;
}
function oo(e, t, n = !1) {
  const s = t.propsCache, r = s.get(e);
  if (r)
    return r;
  const o = e.props, i = {}, u = [];
  let c = !1;
  if (!B(e)) {
    const a = (h) => {
      c = !0;
      const [p, v] = oo(h, t, !0);
      re(i, p), v && u.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  if (!o && !c)
    return Z(e) && s.set(e, dt), dt;
  if (j(o))
    for (let a = 0; a < o.length; a++) {
      const h = Le(o[a]);
      js(h) && (i[h] = X);
    }
  else if (o)
    for (const a in o) {
      const h = Le(a);
      if (js(h)) {
        const p = o[a], v = i[h] = j(p) || B(p) ? { type: p } : re({}, p);
        if (v) {
          const A = ks(Boolean, v.type), L = ks(String, v.type);
          v[
            0
            /* shouldCast */
          ] = A > -1, v[
            1
            /* shouldCastTrue */
          ] = L < 0 || A < L, (A > -1 || K(v, "default")) && u.push(h);
        }
      }
    }
  const d = [i, u];
  return Z(e) && s.set(e, d), d;
}
function js(e) {
  return e[0] !== "$" && !Ot(e);
}
function Fs(e) {
  return e === null ? "null" : typeof e == "function" ? e.name || "" : typeof e == "object" && e.constructor && e.constructor.name || "";
}
function Hs(e, t) {
  return Fs(e) === Fs(t);
}
function ks(e, t) {
  return j(t) ? t.findIndex((n) => Hs(n, e)) : B(t) && Hs(t, e) ? 0 : -1;
}
const io = (e) => e[0] === "_" || e === "$stable", ds = (e) => j(e) ? e.map(Me) : [Me(e)], il = (e, t, n) => {
  if (t._n)
    return t;
  const s = Qr((...r) => ds(t(...r)), n);
  return s._c = !1, s;
}, lo = (e, t, n) => {
  const s = e._ctx;
  for (const r in e) {
    if (io(r))
      continue;
    const o = e[r];
    if (B(o))
      t[r] = il(r, o, s);
    else if (o != null) {
      const i = ds(o);
      t[r] = () => i;
    }
  }
}, co = (e, t) => {
  const n = ds(t);
  e.slots.default = () => n;
}, ll = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = V(t), nn(t, "_", n)) : lo(
      t,
      e.slots = {}
    );
  } else
    e.slots = {}, t && co(e, t);
  nn(e.slots, yn, 1);
}, cl = (e, t, n) => {
  const { vnode: s, slots: r } = e;
  let o = !0, i = X;
  if (s.shapeFlag & 32) {
    const u = t._;
    u ? n && u === 1 ? o = !1 : (re(r, t), !n && u === 1 && delete r._) : (o = !t.$stable, lo(t, r)), i = t;
  } else
    t && (co(e, t), i = { default: 1 });
  if (o)
    for (const u in r)
      !io(u) && i[u] == null && delete r[u];
};
function Vn(e, t, n, s, r = !1) {
  if (j(e)) {
    e.forEach(
      (p, v) => Vn(
        p,
        t && (j(t) ? t[v] : t),
        n,
        s,
        r
      )
    );
    return;
  }
  if (Xt(s) && !r)
    return;
  const o = s.shapeFlag & 4 ? gs(s.component) || s.component.proxy : s.el, i = r ? null : o, { i: u, r: c } = e, d = t && t.r, a = u.refs === X ? u.refs = {} : u.refs, h = u.setupState;
  if (d != null && d !== c && (te(d) ? (a[d] = null, K(h, d) && (h[d] = null)) : he(d) && (d.value = null)), B(c))
    Qe(c, u, 12, [i, a]);
  else {
    const p = te(c), v = he(c);
    if (p || v) {
      const A = () => {
        if (e.f) {
          const L = p ? K(h, c) ? h[c] : a[c] : c.value;
          r ? j(L) && Jn(L, o) : j(L) ? L.includes(o) || L.push(o) : p ? (a[c] = [o], K(h, c) && (h[c] = a[c])) : (c.value = [o], e.k && (a[e.k] = c.value));
        } else
          p ? (a[c] = i, K(h, c) && (h[c] = i)) : v && (c.value = i, e.k && (a[e.k] = i));
      };
      i ? (A.id = -1, ae(A, n)) : A();
    }
  }
}
const ae = Li;
function ul(e) {
  return fl(e);
}
function fl(e, t) {
  const n = br();
  n.__VUE__ = !0;
  const {
    insert: s,
    remove: r,
    patchProp: o,
    createElement: i,
    createText: u,
    createComment: c,
    setText: d,
    setElementText: a,
    parentNode: h,
    nextSibling: p,
    setScopeId: v = _e,
    insertStaticContent: A
  } = e, L = (l, f, g, y = null, m = null, x = null, S = void 0, E = null, w = !!f.dynamicChildren) => {
    if (l === f)
      return;
    l && !Ct(l, f) && (y = _(l), fe(l, m, x, !0), l = null), f.patchFlag === -2 && (w = !1, f.dynamicChildren = null);
    const { type: b, ref: P, shapeFlag: I } = f;
    switch (b) {
      case _n:
        F(l, f, g, y);
        break;
      case Ht:
        T(l, f, g, y);
        break;
      case An:
        l == null && $(f, g, y, S);
        break;
      case Te:
        Xe(
          l,
          f,
          g,
          y,
          m,
          x,
          S,
          E,
          w
        );
        break;
      default:
        I & 1 ? ee(
          l,
          f,
          g,
          y,
          m,
          x,
          S,
          E,
          w
        ) : I & 6 ? Ce(
          l,
          f,
          g,
          y,
          m,
          x,
          S,
          E,
          w
        ) : (I & 64 || I & 128) && b.process(
          l,
          f,
          g,
          y,
          m,
          x,
          S,
          E,
          w,
          O
        );
    }
    P != null && m && Vn(P, l && l.ref, x, f || l, !f);
  }, F = (l, f, g, y) => {
    if (l == null)
      s(
        f.el = u(f.children),
        g,
        y
      );
    else {
      const m = f.el = l.el;
      f.children !== l.children && d(m, f.children);
    }
  }, T = (l, f, g, y) => {
    l == null ? s(
      f.el = c(f.children || ""),
      g,
      y
    ) : f.el = l.el;
  }, $ = (l, f, g, y) => {
    [l.el, l.anchor] = A(
      l.children,
      f,
      g,
      y,
      l.el,
      l.anchor
    );
  }, H = ({ el: l, anchor: f }, g, y) => {
    let m;
    for (; l && l !== f; )
      m = p(l), s(l, g, y), l = m;
    s(f, g, y);
  }, D = ({ el: l, anchor: f }) => {
    let g;
    for (; l && l !== f; )
      g = p(l), r(l), l = g;
    r(f);
  }, ee = (l, f, g, y, m, x, S, E, w) => {
    f.type === "svg" ? S = "svg" : f.type === "math" && (S = "mathml"), l == null ? k(
      f,
      g,
      y,
      m,
      x,
      S,
      E,
      w
    ) : Je(
      l,
      f,
      m,
      x,
      S,
      E,
      w
    );
  }, k = (l, f, g, y, m, x, S, E) => {
    let w, b;
    const { props: P, shapeFlag: I, transition: M, dirs: N } = l;
    if (w = l.el = i(
      l.type,
      x,
      P && P.is,
      P
    ), I & 8 ? a(w, l.children) : I & 16 && me(
      l.children,
      w,
      null,
      y,
      m,
      Pn(l, x),
      S,
      E
    ), N && Ze(l, null, y, "created"), ce(w, l, l.scopeId, S, y), P) {
      for (const Q in P)
        Q !== "value" && !Ot(Q) && o(
          w,
          Q,
          null,
          P[Q],
          x,
          l.children,
          y,
          m,
          oe
        );
      "value" in P && o(w, "value", null, P.value, x), (b = P.onVnodeBeforeMount) && Oe(b, y, l);
    }
    N && Ze(l, null, y, "beforeMount");
    const U = al(m, M);
    U && M.beforeEnter(w), s(w, f, g), ((b = P && P.onVnodeMounted) || U || N) && ae(() => {
      b && Oe(b, y, l), U && M.enter(w), N && Ze(l, null, y, "mounted");
    }, m);
  }, ce = (l, f, g, y, m) => {
    if (g && v(l, g), y)
      for (let x = 0; x < y.length; x++)
        v(l, y[x]);
    if (m) {
      let x = m.subTree;
      if (f === x) {
        const S = m.vnode;
        ce(
          l,
          S,
          S.scopeId,
          S.slotScopeIds,
          m.parent
        );
      }
    }
  }, me = (l, f, g, y, m, x, S, E, w = 0) => {
    for (let b = w; b < l.length; b++) {
      const P = l[b] = E ? De(l[b]) : Me(l[b]);
      L(
        null,
        P,
        f,
        g,
        y,
        m,
        x,
        S,
        E
      );
    }
  }, Je = (l, f, g, y, m, x, S) => {
    const E = f.el = l.el;
    let { patchFlag: w, dynamicChildren: b, dirs: P } = f;
    w |= l.patchFlag & 16;
    const I = l.props || X, M = f.props || X;
    let N;
    if (g && et(g, !1), (N = M.onVnodeBeforeUpdate) && Oe(N, g, f, l), P && Ze(f, l, g, "beforeUpdate"), g && et(g, !0), b ? Se(
      l.dynamicChildren,
      b,
      E,
      g,
      y,
      Pn(f, m),
      x
    ) : S || W(
      l,
      f,
      E,
      null,
      g,
      y,
      Pn(f, m),
      x,
      !1
    ), w > 0) {
      if (w & 16)
        ke(
          E,
          f,
          I,
          M,
          g,
          y,
          m
        );
      else if (w & 2 && I.class !== M.class && o(E, "class", null, M.class, m), w & 4 && o(E, "style", I.style, M.style, m), w & 8) {
        const U = f.dynamicProps;
        for (let Q = 0; Q < U.length; Q++) {
          const J = U[Q], se = I[J], ye = M[J];
          (ye !== se || J === "value") && o(
            E,
            J,
            se,
            ye,
            m,
            l.children,
            g,
            y,
            oe
          );
        }
      }
      w & 1 && l.children !== f.children && a(E, f.children);
    } else
      !S && b == null && ke(
        E,
        f,
        I,
        M,
        g,
        y,
        m
      );
    ((N = M.onVnodeUpdated) || P) && ae(() => {
      N && Oe(N, g, f, l), P && Ze(f, l, g, "updated");
    }, y);
  }, Se = (l, f, g, y, m, x, S) => {
    for (let E = 0; E < f.length; E++) {
      const w = l[E], b = f[E], P = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        w.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (w.type === Te || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ct(w, b) || // - In the case of a component, it could contain anything.
        w.shapeFlag & 70) ? h(w.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          g
        )
      );
      L(
        w,
        b,
        P,
        null,
        y,
        m,
        x,
        S,
        !0
      );
    }
  }, ke = (l, f, g, y, m, x, S) => {
    if (g !== y) {
      if (g !== X)
        for (const E in g)
          !Ot(E) && !(E in y) && o(
            l,
            E,
            g[E],
            null,
            S,
            f.children,
            m,
            x,
            oe
          );
      for (const E in y) {
        if (Ot(E))
          continue;
        const w = y[E], b = g[E];
        w !== b && E !== "value" && o(
          l,
          E,
          b,
          w,
          S,
          f.children,
          m,
          x,
          oe
        );
      }
      "value" in y && o(l, "value", g.value, y.value, S);
    }
  }, Xe = (l, f, g, y, m, x, S, E, w) => {
    const b = f.el = l ? l.el : u(""), P = f.anchor = l ? l.anchor : u("");
    let { patchFlag: I, dynamicChildren: M, slotScopeIds: N } = f;
    N && (E = E ? E.concat(N) : N), l == null ? (s(b, g, y), s(P, g, y), me(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      f.children || [],
      g,
      P,
      m,
      x,
      S,
      E,
      w
    )) : I > 0 && I & 64 && M && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    l.dynamicChildren ? (Se(
      l.dynamicChildren,
      M,
      g,
      m,
      x,
      S,
      E
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (f.key != null || m && f === m.subTree) && uo(
      l,
      f,
      !0
      /* shallow */
    )) : W(
      l,
      f,
      g,
      P,
      m,
      x,
      S,
      E,
      w
    );
  }, Ce = (l, f, g, y, m, x, S, E, w) => {
    f.slotScopeIds = E, l == null ? f.shapeFlag & 512 ? m.ctx.activate(
      f,
      g,
      y,
      S,
      w
    ) : Rt(
      f,
      g,
      y,
      m,
      x,
      S,
      w
    ) : it(l, f, w);
  }, Rt = (l, f, g, y, m, x, S) => {
    const E = l.component = El(
      l,
      y,
      m
    );
    if (Zr(l) && (E.ctx.renderer = O), xl(E), E.asyncDep) {
      if (m && m.registerDep(E, ne), !l.el) {
        const w = E.subTree = ge(Ht);
        T(null, w, f, g);
      }
    } else
      ne(
        E,
        l,
        f,
        g,
        m,
        x,
        S
      );
  }, it = (l, f, g) => {
    const y = f.component = l.component;
    if (Pi(l, f, g))
      if (y.asyncDep && !y.asyncResolved) {
        G(y, f, g);
        return;
      } else
        y.next = f, Ei(y.update), y.effect.dirty = !0, y.update();
    else
      f.el = l.el, y.vnode = f;
  }, ne = (l, f, g, y, m, x, S) => {
    const E = () => {
      if (l.isMounted) {
        let { next: P, bu: I, u: M, parent: N, vnode: U } = l;
        {
          const ut = fo(l);
          if (ut) {
            P && (P.el = U.el, G(l, P, S)), ut.asyncDep.then(() => {
              l.isUnmounted || E();
            });
            return;
          }
        }
        let Q = P, J;
        et(l, !1), P ? (P.el = U.el, G(l, P, S)) : P = U, I && wn(I), (J = P.props && P.props.onVnodeBeforeUpdate) && Oe(J, N, P, U), et(l, !0);
        const se = Sn(l), ye = l.subTree;
        l.subTree = se, L(
          ye,
          se,
          // parent may have changed if it's in a teleport
          h(ye.el),
          // anchor may have changed if it's in a fragment
          _(ye),
          l,
          m,
          x
        ), P.el = se.el, Q === null && Ai(l, se.el), M && ae(M, m), (J = P.props && P.props.onVnodeUpdated) && ae(
          () => Oe(J, N, P, U),
          m
        );
      } else {
        let P;
        const { el: I, props: M } = f, { bm: N, m: U, parent: Q } = l, J = Xt(f);
        if (et(l, !1), N && wn(N), !J && (P = M && M.onVnodeBeforeMount) && Oe(P, Q, f), et(l, !0), I && Y) {
          const se = () => {
            l.subTree = Sn(l), Y(
              I,
              l.subTree,
              l,
              m,
              null
            );
          };
          J ? f.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !l.isUnmounted && se()
          ) : se();
        } else {
          const se = l.subTree = Sn(l);
          L(
            null,
            se,
            g,
            y,
            l,
            m,
            x
          ), f.el = se.el;
        }
        if (U && ae(U, m), !J && (P = M && M.onVnodeMounted)) {
          const se = f;
          ae(
            () => Oe(P, Q, se),
            m
          );
        }
        (f.shapeFlag & 256 || Q && Xt(Q.vnode) && Q.vnode.shapeFlag & 256) && l.a && ae(l.a, m), l.isMounted = !0, f = g = y = null;
      }
    }, w = l.effect = new ts(
      E,
      _e,
      () => us(b),
      l.scope
      // track it in component's effect scope
    ), b = l.update = () => {
      w.dirty && w.run();
    };
    b.id = l.uid, et(l, !0), b();
  }, G = (l, f, g) => {
    f.component = l;
    const y = l.vnode.props;
    l.vnode = f, l.next = null, ol(l, f.props, y, g), cl(l, f.children, g), rt(), Os(l), ot();
  }, W = (l, f, g, y, m, x, S, E, w = !1) => {
    const b = l && l.children, P = l ? l.shapeFlag : 0, I = f.children, { patchFlag: M, shapeFlag: N } = f;
    if (M > 0) {
      if (M & 128) {
        Be(
          b,
          I,
          g,
          y,
          m,
          x,
          S,
          E,
          w
        );
        return;
      } else if (M & 256) {
        $e(
          b,
          I,
          g,
          y,
          m,
          x,
          S,
          E,
          w
        );
        return;
      }
    }
    N & 8 ? (P & 16 && oe(b, m, x), I !== b && a(g, I)) : P & 16 ? N & 16 ? Be(
      b,
      I,
      g,
      y,
      m,
      x,
      S,
      E,
      w
    ) : oe(b, m, x, !0) : (P & 8 && a(g, ""), N & 16 && me(
      I,
      g,
      y,
      m,
      x,
      S,
      E,
      w
    ));
  }, $e = (l, f, g, y, m, x, S, E, w) => {
    l = l || dt, f = f || dt;
    const b = l.length, P = f.length, I = Math.min(b, P);
    let M;
    for (M = 0; M < I; M++) {
      const N = f[M] = w ? De(f[M]) : Me(f[M]);
      L(
        l[M],
        N,
        g,
        null,
        m,
        x,
        S,
        E,
        w
      );
    }
    b > P ? oe(
      l,
      m,
      x,
      !0,
      !1,
      I
    ) : me(
      f,
      g,
      y,
      m,
      x,
      S,
      E,
      w,
      I
    );
  }, Be = (l, f, g, y, m, x, S, E, w) => {
    let b = 0;
    const P = f.length;
    let I = l.length - 1, M = P - 1;
    for (; b <= I && b <= M; ) {
      const N = l[b], U = f[b] = w ? De(f[b]) : Me(f[b]);
      if (Ct(N, U))
        L(
          N,
          U,
          g,
          null,
          m,
          x,
          S,
          E,
          w
        );
      else
        break;
      b++;
    }
    for (; b <= I && b <= M; ) {
      const N = l[I], U = f[M] = w ? De(f[M]) : Me(f[M]);
      if (Ct(N, U))
        L(
          N,
          U,
          g,
          null,
          m,
          x,
          S,
          E,
          w
        );
      else
        break;
      I--, M--;
    }
    if (b > I) {
      if (b <= M) {
        const N = M + 1, U = N < P ? f[N].el : y;
        for (; b <= M; )
          L(
            null,
            f[b] = w ? De(f[b]) : Me(f[b]),
            g,
            U,
            m,
            x,
            S,
            E,
            w
          ), b++;
      }
    } else if (b > M)
      for (; b <= I; )
        fe(l[b], m, x, !0), b++;
    else {
      const N = b, U = b, Q = /* @__PURE__ */ new Map();
      for (b = U; b <= M; b++) {
        const pe = f[b] = w ? De(f[b]) : Me(f[b]);
        pe.key != null && Q.set(pe.key, b);
      }
      let J, se = 0;
      const ye = M - U + 1;
      let ut = !1, ys = 0;
      const St = new Array(ye);
      for (b = 0; b < ye; b++)
        St[b] = 0;
      for (b = N; b <= I; b++) {
        const pe = l[b];
        if (se >= ye) {
          fe(pe, m, x, !0);
          continue;
        }
        let Ae;
        if (pe.key != null)
          Ae = Q.get(pe.key);
        else
          for (J = U; J <= M; J++)
            if (St[J - U] === 0 && Ct(pe, f[J])) {
              Ae = J;
              break;
            }
        Ae === void 0 ? fe(pe, m, x, !0) : (St[Ae - U] = b + 1, Ae >= ys ? ys = Ae : ut = !0, L(
          pe,
          f[Ae],
          g,
          null,
          m,
          x,
          S,
          E,
          w
        ), se++);
      }
      const vs = ut ? dl(St) : dt;
      for (J = vs.length - 1, b = ye - 1; b >= 0; b--) {
        const pe = U + b, Ae = f[pe], bs = pe + 1 < P ? f[pe + 1].el : y;
        St[b] === 0 ? L(
          null,
          Ae,
          g,
          bs,
          m,
          x,
          S,
          E,
          w
        ) : ut && (J < 0 || b !== vs[J] ? Pe(Ae, g, bs, 2) : J--);
      }
    }
  }, Pe = (l, f, g, y, m = null) => {
    const { el: x, type: S, transition: E, children: w, shapeFlag: b } = l;
    if (b & 6) {
      Pe(l.component.subTree, f, g, y);
      return;
    }
    if (b & 128) {
      l.suspense.move(f, g, y);
      return;
    }
    if (b & 64) {
      S.move(l, f, g, O);
      return;
    }
    if (S === Te) {
      s(x, f, g);
      for (let I = 0; I < w.length; I++)
        Pe(w[I], f, g, y);
      s(l.anchor, f, g);
      return;
    }
    if (S === An) {
      H(l, f, g);
      return;
    }
    if (y !== 2 && b & 1 && E)
      if (y === 0)
        E.beforeEnter(x), s(x, f, g), ae(() => E.enter(x), m);
      else {
        const { leave: I, delayLeave: M, afterLeave: N } = E, U = () => s(x, f, g), Q = () => {
          I(x, () => {
            U(), N && N();
          });
        };
        M ? M(x, U, Q) : Q();
      }
    else
      s(x, f, g);
  }, fe = (l, f, g, y = !1, m = !1) => {
    const {
      type: x,
      props: S,
      ref: E,
      children: w,
      dynamicChildren: b,
      shapeFlag: P,
      patchFlag: I,
      dirs: M
    } = l;
    if (E != null && Vn(E, null, g, l, !0), P & 256) {
      f.ctx.deactivate(l);
      return;
    }
    const N = P & 1 && M, U = !Xt(l);
    let Q;
    if (U && (Q = S && S.onVnodeBeforeUnmount) && Oe(Q, f, l), P & 6)
      Vt(l.component, g, y);
    else {
      if (P & 128) {
        l.suspense.unmount(g, y);
        return;
      }
      N && Ze(l, null, f, "beforeUnmount"), P & 64 ? l.type.remove(
        l,
        f,
        g,
        m,
        O,
        y
      ) : b && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (x !== Te || I > 0 && I & 64) ? oe(
        b,
        f,
        g,
        !1,
        !0
      ) : (x === Te && I & 384 || !m && P & 16) && oe(w, f, g), y && lt(l);
    }
    (U && (Q = S && S.onVnodeUnmounted) || N) && ae(() => {
      Q && Oe(Q, f, l), N && Ze(l, null, f, "unmounted");
    }, g);
  }, lt = (l) => {
    const { type: f, el: g, anchor: y, transition: m } = l;
    if (f === Te) {
      ct(g, y);
      return;
    }
    if (f === An) {
      D(l);
      return;
    }
    const x = () => {
      r(g), m && !m.persisted && m.afterLeave && m.afterLeave();
    };
    if (l.shapeFlag & 1 && m && !m.persisted) {
      const { leave: S, delayLeave: E } = m, w = () => S(g, x);
      E ? E(l.el, x, w) : w();
    } else
      x();
  }, ct = (l, f) => {
    let g;
    for (; l !== f; )
      g = p(l), r(l), l = g;
    r(f);
  }, Vt = (l, f, g) => {
    const { bum: y, scope: m, update: x, subTree: S, um: E } = l;
    y && wn(y), m.stop(), x && (x.active = !1, fe(S, l, f, g)), E && ae(E, f), ae(() => {
      l.isUnmounted = !0;
    }, f), f && f.pendingBranch && !f.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
  }, oe = (l, f, g, y = !1, m = !1, x = 0) => {
    for (let S = x; S < l.length; S++)
      fe(l[S], f, g, y, m);
  }, _ = (l) => l.shapeFlag & 6 ? _(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : p(l.anchor || l.el);
  let C = !1;
  const R = (l, f, g) => {
    l == null ? f._vnode && fe(f._vnode, null, null, !0) : L(
      f._vnode || null,
      l,
      f,
      null,
      null,
      null,
      g
    ), C || (C = !0, Os(), Wr(), C = !1), f._vnode = l;
  }, O = {
    p: L,
    um: fe,
    m: Pe,
    r: lt,
    mt: Rt,
    mc: me,
    pc: W,
    pbc: Se,
    n: _,
    o: e
  };
  let z, Y;
  return t && ([z, Y] = t(
    O
  )), {
    render: R,
    hydrate: z,
    createApp: sl(R, z)
  };
}
function Pn({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function et({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function al(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function uo(e, t, n = !1) {
  const s = e.children, r = t.children;
  if (j(s) && j(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let u = r[o];
      u.shapeFlag & 1 && !u.dynamicChildren && ((u.patchFlag <= 0 || u.patchFlag === 32) && (u = r[o] = De(r[o]), u.el = i.el), n || uo(i, u)), u.type === _n && (u.el = i.el);
    }
}
function dl(e) {
  const t = e.slice(), n = [0];
  let s, r, o, i, u;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const d = e[s];
    if (d !== 0) {
      if (r = n[n.length - 1], e[r] < d) {
        t[s] = r, n.push(s);
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        u = o + i >> 1, e[n[u]] < d ? o = u + 1 : i = u;
      d < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), n[o] = s);
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; )
    n[o] = i, i = t[i];
  return n;
}
function fo(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : fo(t);
}
const hl = (e) => e.__isTeleport, Te = Symbol.for("v-fgt"), _n = Symbol.for("v-txt"), Ht = Symbol.for("v-cmt"), An = Symbol.for("v-stc"), It = [];
let xe = null;
function mt(e = !1) {
  It.push(xe = e ? null : []);
}
function pl() {
  It.pop(), xe = It[It.length - 1] || null;
}
let kt = 1;
function Bs(e) {
  kt += e;
}
function gl(e) {
  return e.dynamicChildren = kt > 0 ? xe || dt : null, pl(), kt > 0 && xe && xe.push(e), e;
}
function _t(e, t, n, s, r, o) {
  return gl(
    hs(
      e,
      t,
      n,
      s,
      r,
      o,
      !0
    )
  );
}
function Dn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ct(e, t) {
  return e.type === t.type && e.key === t.key;
}
const yn = "__vInternal", ao = ({ key: e }) => e ?? null, en = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? te(e) || he(e) || B(e) ? { i: Ee, r: e, k: t, f: !!n } : e : null);
function hs(e, t = null, n = null, s = 0, r = null, o = e === Te ? 0 : 1, i = !1, u = !1) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && ao(t),
    ref: t && en(t),
    scopeId: Gr,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Ee
  };
  return u ? (ps(c, n), o & 128 && e.normalize(c)) : n && (c.shapeFlag |= te(n) ? 8 : 16), kt > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  xe && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (c.patchFlag > 0 || o & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  c.patchFlag !== 32 && xe.push(c), c;
}
const ge = ml;
function ml(e, t = null, n = null, s = 0, r = null, o = !1) {
  if ((!e || e === Ti) && (e = Ht), Dn(e)) {
    const u = vt(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && ps(u, n), kt > 0 && !o && xe && (u.shapeFlag & 6 ? xe[xe.indexOf(e)] = u : xe.push(u)), u.patchFlag |= -2, u;
  }
  if (Pl(e) && (e = e.__vccOpts), t) {
    t = _l(t);
    let { class: u, style: c } = t;
    u && !te(u) && (t.class = es(u)), Z(c) && (jr(c) && !j(c) && (c = re({}, c)), t.style = Zn(c));
  }
  const i = te(e) ? 1 : Ii(e) ? 128 : hl(e) ? 64 : Z(e) ? 4 : B(e) ? 2 : 0;
  return hs(
    e,
    t,
    n,
    s,
    r,
    i,
    o,
    !0
  );
}
function _l(e) {
  return e ? jr(e) || yn in e ? re({}, e) : e : null;
}
function vt(e, t, n = !1) {
  const { props: s, ref: r, patchFlag: o, children: i } = e, u = t ? yl(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: u,
    key: u && ao(u),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && r ? j(r) ? r.concat(en(t)) : [r, en(t)] : en(t)
    ) : r,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== Te ? o === -1 ? 16 : o | 16 : o,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && vt(e.ssContent),
    ssFallback: e.ssFallback && vt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
}
function ho(e = " ", t = 0) {
  return ge(_n, null, e, t);
}
function Me(e) {
  return e == null || typeof e == "boolean" ? ge(Ht) : j(e) ? ge(
    Te,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? De(e) : ge(_n, null, String(e));
}
function De(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : vt(e);
}
function ps(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (j(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), ps(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !(yn in t) ? t._ctx = Ee : r === 3 && Ee && (Ee.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    B(t) ? (t = { default: t, _ctx: Ee }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [ho(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function yl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = es([t.class, s.class]));
      else if (r === "style")
        t.style = Zn([t.style, s.style]);
      else if (cn(r)) {
        const o = t[r], i = s[r];
        i && o !== i && !(j(o) && o.includes(i)) && (t[r] = o ? [].concat(o, i) : i);
      } else
        r !== "" && (t[r] = s[r]);
  }
  return t;
}
function Oe(e, t, n, s = null) {
  we(e, t, 7, [
    n,
    s
  ]);
}
const vl = so();
let bl = 0;
function El(e, t, n) {
  const s = e.type, r = (t ? t.appContext : e.appContext) || vl, o = {
    uid: bl++,
    vnode: e,
    type: s,
    parent: t,
    appContext: r,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    scope: new zo(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(r.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: oo(s, r),
    emitsOptions: qr(s, r),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: X,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: X,
    data: X,
    props: X,
    attrs: X,
    slots: X,
    refs: X,
    setupState: X,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return o.ctx = { _: o }, o.root = t ? t.root : o, o.emit = Ri.bind(null, o), e.ce && e.ce(o), o;
}
let le = null, ln, Wn;
{
  const e = br(), t = (n, s) => {
    let r;
    return (r = e[n]) || (r = e[n] = []), r.push(s), (o) => {
      r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
    };
  };
  ln = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => le = n
  ), Wn = t(
    "__VUE_SSR_SETTERS__",
    (n) => vn = n
  );
}
const Kt = (e) => {
  const t = le;
  return ln(e), e.scope.on(), () => {
    e.scope.off(), ln(t);
  };
}, Us = () => {
  le && le.scope.off(), ln(null);
};
function po(e) {
  return e.vnode.shapeFlag & 4;
}
let vn = !1;
function xl(e, t = !1) {
  t && Wn(t);
  const { props: n, children: s } = e.vnode, r = po(e);
  rl(e, n, r, t), ll(e, s);
  const o = r ? wl(e, t) : void 0;
  return t && Wn(!1), o;
}
function wl(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = Fr(new Proxy(e.ctx, Yi));
  const { setup: s } = n;
  if (s) {
    const r = e.setupContext = s.length > 1 ? Sl(e) : null, o = Kt(e);
    rt();
    const i = Qe(
      s,
      e,
      0,
      [
        e.props,
        r
      ]
    );
    if (ot(), o(), _r(i)) {
      if (i.then(Us, Us), t)
        return i.then((u) => {
          Ks(e, u, t);
        }).catch((u) => {
          pn(u, e, 0);
        });
      e.asyncDep = i;
    } else
      Ks(e, i, t);
  } else
    go(e, t);
}
function Ks(e, t, n) {
  B(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Z(t) && (e.setupState = Ur(t)), go(e, n);
}
let Vs;
function go(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Vs && !s.render) {
      const r = s.template || as(e).template;
      if (r) {
        const { isCustomElement: o, compilerOptions: i } = e.appContext.config, { delimiters: u, compilerOptions: c } = s, d = re(
          re(
            {
              isCustomElement: o,
              delimiters: u
            },
            i
          ),
          c
        );
        s.render = Vs(r, d);
      }
    }
    e.render = s.render || _e;
  }
  {
    const r = Kt(e);
    rt();
    try {
      Ji(e);
    } finally {
      ot(), r();
    }
  }
}
function Rl(e) {
  return e.attrsProxy || (e.attrsProxy = new Proxy(
    e.attrs,
    {
      get(t, n) {
        return de(e, "get", "$attrs"), t[n];
      }
    }
  ));
}
function Sl(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    get attrs() {
      return Rl(e);
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function gs(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(Ur(Fr(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in Tt)
          return Tt[n](e);
      },
      has(t, n) {
        return n in t || n in Tt;
      }
    }));
}
function Cl(e, t = !0) {
  return B(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Pl(e) {
  return B(e) && "__vccOpts" in e;
}
const be = (e, t) => pi(e, t, vn);
function mo(e, t, n) {
  const s = arguments.length;
  return s === 2 ? Z(t) && !j(t) ? Dn(t) ? ge(e, null, [t]) : ge(e, t) : ge(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && Dn(n) && (n = [n]), ge(e, t, n));
}
const Al = "3.4.21";
/**
* @vue/runtime-dom v3.4.21
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
const Ol = "http://www.w3.org/2000/svg", Tl = "http://www.w3.org/1998/Math/MathML", We = typeof document < "u" ? document : null, Ds = We && /* @__PURE__ */ We.createElement("template"), Ml = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const r = t === "svg" ? We.createElementNS(Ol, e) : t === "mathml" ? We.createElementNS(Tl, e) : We.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && r.setAttribute("multiple", s.multiple), r;
  },
  createText: (e) => We.createTextNode(e),
  createComment: (e) => We.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => We.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, r, o) {
    const i = n ? n.previousSibling : t.lastChild;
    if (r && (r === o || r.nextSibling))
      for (; t.insertBefore(r.cloneNode(!0), n), !(r === o || !(r = r.nextSibling)); )
        ;
    else {
      Ds.innerHTML = s === "svg" ? `<svg>${e}</svg>` : s === "mathml" ? `<math>${e}</math>` : e;
      const u = Ds.content;
      if (s === "svg" || s === "mathml") {
        const c = u.firstChild;
        for (; c.firstChild; )
          u.appendChild(c.firstChild);
        u.removeChild(c);
      }
      t.insertBefore(u, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Il = Symbol("_vtc");
function Ll(e, t, n) {
  const s = e[Il];
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const Ws = Symbol("_vod"), $l = Symbol("_vsh"), Nl = Symbol(""), jl = /(^|;)\s*display\s*:/;
function Fl(e, t, n) {
  const s = e.style, r = te(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (te(t))
        for (const i of t.split(";")) {
          const u = i.slice(0, i.indexOf(":")).trim();
          n[u] == null && tn(s, u, "");
        }
      else
        for (const i in t)
          n[i] == null && tn(s, i, "");
    for (const i in n)
      i === "display" && (o = !0), tn(s, i, n[i]);
  } else if (r) {
    if (t !== n) {
      const i = s[Nl];
      i && (n += ";" + i), s.cssText = n, o = jl.test(n);
    }
  } else
    t && e.removeAttribute("style");
  Ws in e && (e[Ws] = o ? s.display : "", e[$l] && (s.display = "none"));
}
const zs = /\s*!important$/;
function tn(e, t, n) {
  if (j(n))
    n.forEach((s) => tn(e, t, s));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = Hl(e, t);
    zs.test(n) ? e.setProperty(
      wt(s),
      n.replace(zs, ""),
      "important"
    ) : e[s] = n;
  }
}
const qs = ["Webkit", "Moz", "ms"], On = {};
function Hl(e, t) {
  const n = On[t];
  if (n)
    return n;
  let s = Le(t);
  if (s !== "filter" && s in e)
    return On[t] = s;
  s = an(s);
  for (let r = 0; r < qs.length; r++) {
    const o = qs[r] + s;
    if (o in e)
      return On[t] = o;
  }
  return t;
}
const Gs = "http://www.w3.org/1999/xlink";
function kl(e, t, n, s, r) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(Gs, t.slice(6, t.length)) : e.setAttributeNS(Gs, t, n);
  else {
    const o = Do(t);
    n == null || o && !Er(n) ? e.removeAttribute(t) : e.setAttribute(t, o ? "" : n);
  }
}
function Bl(e, t, n, s, r, o, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, r, o), e[t] = n ?? "";
    return;
  }
  const u = e.tagName;
  if (t === "value" && u !== "PROGRESS" && // custom elements may use _value internally
  !u.includes("-")) {
    const d = u === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n ?? "";
    (d !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let c = !1;
  if (n === "" || n == null) {
    const d = typeof e[t];
    d === "boolean" ? n = Er(n) : n == null && d === "string" ? (n = "", c = !0) : d === "number" && (n = 0, c = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  c && e.removeAttribute(t);
}
function Ul(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Kl(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const Qs = Symbol("_vei");
function Vl(e, t, n, s, r = null) {
  const o = e[Qs] || (e[Qs] = {}), i = o[t];
  if (s && i)
    i.value = s;
  else {
    const [u, c] = Dl(t);
    if (s) {
      const d = o[t] = ql(s, r);
      Ul(e, u, d, c);
    } else
      i && (Kl(e, u, i, c), o[t] = void 0);
  }
}
const Ys = /(?:Once|Passive|Capture)$/;
function Dl(e) {
  let t;
  if (Ys.test(e)) {
    t = {};
    let s;
    for (; s = e.match(Ys); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : wt(e.slice(2)), t];
}
let Tn = 0;
const Wl = /* @__PURE__ */ Promise.resolve(), zl = () => Tn || (Wl.then(() => Tn = 0), Tn = Date.now());
function ql(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    we(
      Gl(s, n.value),
      t,
      5,
      [s]
    );
  };
  return n.value = e, n.attached = zl(), n;
}
function Gl(e, t) {
  if (j(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (r) => !r._stopped && s && s(r));
  } else
    return t;
}
const Js = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Ql = (e, t, n, s, r, o, i, u, c) => {
  const d = r === "svg";
  t === "class" ? Ll(e, s, d) : t === "style" ? Fl(e, n, s) : cn(t) ? Yn(t) || Vl(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Yl(e, t, s, d)) ? Bl(
    e,
    t,
    s,
    o,
    i,
    u,
    c
  ) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), kl(e, t, s, d));
};
function Yl(e, t, n, s) {
  if (s)
    return !!(t === "innerHTML" || t === "textContent" || t in e && Js(t) && B(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return Js(t) && te(n) ? !1 : t in e;
}
const Jl = /* @__PURE__ */ re({ patchProp: Ql }, Ml);
let Xs;
function Xl() {
  return Xs || (Xs = ul(Jl));
}
const Zl = (...e) => {
  const t = Xl().createApp(...e), { mount: n } = t;
  return t.mount = (s) => {
    const r = tc(s);
    if (!r)
      return;
    const o = t._component;
    !B(o) && !o.render && !o.template && (o.template = r.innerHTML), r.innerHTML = "";
    const i = n(r, !1, ec(r));
    return r instanceof Element && (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")), i;
  }, t;
};
function ec(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function tc(e) {
  return te(e) ? document.querySelector(e) : e;
}
const bn = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, r] of t)
    n[s] = r;
  return n;
}, nc = {};
function sc(e, t) {
  return mt(), _t("h1", null, "About!!!");
}
const rc = /* @__PURE__ */ bn(nc, [["render", sc], ["__file", "/home/naka/work/node/express/express_44vue/src/client/About.vue"]]), _o = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: rc
}, Symbol.toStringTag, { value: "Module" })), oc = {};
function ic(e, t) {
  return mt(), _t("h1", null, "Contact!");
}
const lc = /* @__PURE__ */ bn(oc, [["render", ic], ["__file", "/home/naka/work/node/express/express_44vue/src/client/Contact.vue"]]), yo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: lc
}, Symbol.toStringTag, { value: "Module" })), cc = {};
function uc(e, t) {
  return mt(), _t("h1", null, "Home! ");
}
const fc = /* @__PURE__ */ bn(cc, [["render", uc], ["__file", "/home/naka/work/node/express/express_44vue/src/client/Home.vue"]]), vo = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: fc
}, Symbol.toStringTag, { value: "Module" }));
/*!
  * vue-router v4.3.0
  * (c) 2024 Eduardo San Martin Morote
  * @license MIT
  */
const ft = typeof document < "u";
function ac(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const q = Object.assign;
function Mn(e, t) {
  const n = {};
  for (const s in t) {
    const r = t[s];
    n[s] = Re(r) ? r.map(e) : e(r);
  }
  return n;
}
const Lt = () => {
}, Re = Array.isArray, bo = /#/g, dc = /&/g, hc = /\//g, pc = /=/g, gc = /\?/g, Eo = /\+/g, mc = /%5B/g, _c = /%5D/g, xo = /%5E/g, yc = /%60/g, wo = /%7B/g, vc = /%7C/g, Ro = /%7D/g, bc = /%20/g;
function ms(e) {
  return encodeURI("" + e).replace(vc, "|").replace(mc, "[").replace(_c, "]");
}
function Ec(e) {
  return ms(e).replace(wo, "{").replace(Ro, "}").replace(xo, "^");
}
function zn(e) {
  return ms(e).replace(Eo, "%2B").replace(bc, "+").replace(bo, "%23").replace(dc, "%26").replace(yc, "`").replace(wo, "{").replace(Ro, "}").replace(xo, "^");
}
function xc(e) {
  return zn(e).replace(pc, "%3D");
}
function wc(e) {
  return ms(e).replace(bo, "%23").replace(gc, "%3F");
}
function Rc(e) {
  return e == null ? "" : wc(e).replace(hc, "%2F");
}
function Bt(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
  }
  return "" + e;
}
const Sc = /\/$/, Cc = (e) => e.replace(Sc, "");
function In(e, t, n = "/") {
  let s, r = {}, o = "", i = "";
  const u = t.indexOf("#");
  let c = t.indexOf("?");
  return u < c && u >= 0 && (c = -1), c > -1 && (s = t.slice(0, c), o = t.slice(c + 1, u > -1 ? u : t.length), r = e(o)), u > -1 && (s = s || t.slice(0, u), i = t.slice(u, t.length)), s = Tc(s ?? t, n), {
    fullPath: s + (o && "?") + o + i,
    path: s,
    query: r,
    hash: Bt(i)
  };
}
function Pc(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function Zs(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function Ac(e, t, n) {
  const s = t.matched.length - 1, r = n.matched.length - 1;
  return s > -1 && s === r && bt(t.matched[s], n.matched[r]) && So(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function bt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function So(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!Oc(e[n], t[n]))
      return !1;
  return !0;
}
function Oc(e, t) {
  return Re(e) ? er(e, t) : Re(t) ? er(t, e) : e === t;
}
function er(e, t) {
  return Re(t) ? e.length === t.length && e.every((n, s) => n === t[s]) : e.length === 1 && e[0] === t;
}
function Tc(e, t) {
  if (e.startsWith("/"))
    return e;
  if (!e)
    return t;
  const n = t.split("/"), s = e.split("/"), r = s[s.length - 1];
  (r === ".." || r === ".") && s.push("");
  let o = n.length - 1, i, u;
  for (i = 0; i < s.length; i++)
    if (u = s[i], u !== ".")
      if (u === "..")
        o > 1 && o--;
      else
        break;
  return n.slice(0, o).join("/") + "/" + s.slice(i).join("/");
}
var Ut;
(function(e) {
  e.pop = "pop", e.push = "push";
})(Ut || (Ut = {}));
var $t;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})($t || ($t = {}));
function Mc(e) {
  if (!e)
    if (ft) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), Cc(e);
}
const Ic = /^[^#]+#/;
function Lc(e, t) {
  return e.replace(Ic, "#") + t;
}
function $c(e, t) {
  const n = document.documentElement.getBoundingClientRect(), s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0)
  };
}
const En = () => ({
  left: window.scrollX,
  top: window.scrollY
});
function Nc(e) {
  let t;
  if ("el" in e) {
    const n = e.el, s = typeof n == "string" && n.startsWith("#"), r = typeof n == "string" ? s ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!r)
      return;
    t = $c(r, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.scrollX, t.top != null ? t.top : window.scrollY);
}
function tr(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const qn = /* @__PURE__ */ new Map();
function jc(e, t) {
  qn.set(e, t);
}
function Fc(e) {
  const t = qn.get(e);
  return qn.delete(e), t;
}
let Hc = () => location.protocol + "//" + location.host;
function Co(e, t) {
  const { pathname: n, search: s, hash: r } = t, o = e.indexOf("#");
  if (o > -1) {
    let u = r.includes(e.slice(o)) ? e.slice(o).length : 1, c = r.slice(u);
    return c[0] !== "/" && (c = "/" + c), Zs(c, "");
  }
  return Zs(n, e) + s + r;
}
function kc(e, t, n, s) {
  let r = [], o = [], i = null;
  const u = ({ state: p }) => {
    const v = Co(e, location), A = n.value, L = t.value;
    let F = 0;
    if (p) {
      if (n.value = v, t.value = p, i && i === A) {
        i = null;
        return;
      }
      F = L ? p.position - L.position : 0;
    } else
      s(v);
    r.forEach((T) => {
      T(n.value, A, {
        delta: F,
        type: Ut.pop,
        direction: F ? F > 0 ? $t.forward : $t.back : $t.unknown
      });
    });
  };
  function c() {
    i = n.value;
  }
  function d(p) {
    r.push(p);
    const v = () => {
      const A = r.indexOf(p);
      A > -1 && r.splice(A, 1);
    };
    return o.push(v), v;
  }
  function a() {
    const { history: p } = window;
    p.state && p.replaceState(q({}, p.state, { scroll: En() }), "");
  }
  function h() {
    for (const p of o)
      p();
    o = [], window.removeEventListener("popstate", u), window.removeEventListener("beforeunload", a);
  }
  return window.addEventListener("popstate", u), window.addEventListener("beforeunload", a, {
    passive: !0
  }), {
    pauseListeners: c,
    listen: d,
    destroy: h
  };
}
function nr(e, t, n, s = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: r ? En() : null
  };
}
function Bc(e) {
  const { history: t, location: n } = window, s = {
    value: Co(e, n)
  }, r = { value: t.state };
  r.value || o(s.value, {
    back: null,
    current: s.value,
    forward: null,
    // the length is off by one, we need to decrease it
    position: t.length - 1,
    replaced: !0,
    // don't add a scroll as the user may have an anchor, and we want
    // scrollBehavior to be triggered without a saved position
    scroll: null
  }, !0);
  function o(c, d, a) {
    const h = e.indexOf("#"), p = h > -1 ? (n.host && document.querySelector("base") ? e : e.slice(h)) + c : Hc() + e + c;
    try {
      t[a ? "replaceState" : "pushState"](d, "", p), r.value = d;
    } catch (v) {
      console.error(v), n[a ? "replace" : "assign"](p);
    }
  }
  function i(c, d) {
    const a = q({}, t.state, nr(
      r.value.back,
      // keep back and forward entries but override current position
      c,
      r.value.forward,
      !0
    ), d, { position: r.value.position });
    o(c, a, !0), s.value = c;
  }
  function u(c, d) {
    const a = q(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      r.value,
      t.state,
      {
        forward: c,
        scroll: En()
      }
    );
    o(a.current, a, !0);
    const h = q({}, nr(s.value, c, null), { position: a.position + 1 }, d);
    o(c, h, !1), s.value = c;
  }
  return {
    location: s,
    state: r,
    push: u,
    replace: i
  };
}
function Uc(e) {
  e = Mc(e);
  const t = Bc(e), n = kc(e, t.state, t.location, t.replace);
  function s(o, i = !0) {
    i || n.pauseListeners(), history.go(o);
  }
  const r = q({
    // it's overridden right after
    location: "",
    base: e,
    go: s,
    createHref: Lc.bind(null, e)
  }, t, n);
  return Object.defineProperty(r, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(r, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), r;
}
function Kc(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function Po(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const Ke = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
}, Ao = Symbol("");
var sr;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(sr || (sr = {}));
function Et(e, t) {
  return q(new Error(), {
    type: e,
    [Ao]: !0
  }, t);
}
function Ne(e, t) {
  return e instanceof Error && Ao in e && (t == null || !!(e.type & t));
}
const rr = "[^/]+?", Vc = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, Dc = /[.+*?^${}()[\]/\\]/g;
function Wc(e, t) {
  const n = q({}, Vc, t), s = [];
  let r = n.start ? "^" : "";
  const o = [];
  for (const d of e) {
    const a = d.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !d.length && (r += "/");
    for (let h = 0; h < d.length; h++) {
      const p = d[h];
      let v = 40 + (n.sensitive ? 0.25 : 0);
      if (p.type === 0)
        h || (r += "/"), r += p.value.replace(Dc, "\\$&"), v += 40;
      else if (p.type === 1) {
        const { value: A, repeatable: L, optional: F, regexp: T } = p;
        o.push({
          name: A,
          repeatable: L,
          optional: F
        });
        const $ = T || rr;
        if ($ !== rr) {
          v += 10;
          try {
            new RegExp(`(${$})`);
          } catch (D) {
            throw new Error(`Invalid custom RegExp for param "${A}" (${$}): ` + D.message);
          }
        }
        let H = L ? `((?:${$})(?:/(?:${$}))*)` : `(${$})`;
        h || (H = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        F && d.length < 2 ? `(?:/${H})` : "/" + H), F && (H += "?"), r += H, v += 20, F && (v += -8), L && (v += -20), $ === ".*" && (v += -50);
      }
      a.push(v);
    }
    s.push(a);
  }
  if (n.strict && n.end) {
    const d = s.length - 1;
    s[d][s[d].length - 1] += 0.7000000000000001;
  }
  n.strict || (r += "/?"), n.end ? r += "$" : n.strict && (r += "(?:/|$)");
  const i = new RegExp(r, n.sensitive ? "" : "i");
  function u(d) {
    const a = d.match(i), h = {};
    if (!a)
      return null;
    for (let p = 1; p < a.length; p++) {
      const v = a[p] || "", A = o[p - 1];
      h[A.name] = v && A.repeatable ? v.split("/") : v;
    }
    return h;
  }
  function c(d) {
    let a = "", h = !1;
    for (const p of e) {
      (!h || !a.endsWith("/")) && (a += "/"), h = !1;
      for (const v of p)
        if (v.type === 0)
          a += v.value;
        else if (v.type === 1) {
          const { value: A, repeatable: L, optional: F } = v, T = A in d ? d[A] : "";
          if (Re(T) && !L)
            throw new Error(`Provided param "${A}" is an array but it is not repeatable (* or + modifiers)`);
          const $ = Re(T) ? T.join("/") : T;
          if (!$)
            if (F)
              p.length < 2 && (a.endsWith("/") ? a = a.slice(0, -1) : h = !0);
            else
              throw new Error(`Missing required param "${A}"`);
          a += $;
        }
    }
    return a || "/";
  }
  return {
    re: i,
    score: s,
    keys: o,
    parse: u,
    stringify: c
  };
}
function zc(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s)
      return s;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 80 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 80 ? 1 : -1 : 0;
}
function qc(e, t) {
  let n = 0;
  const s = e.score, r = t.score;
  for (; n < s.length && n < r.length; ) {
    const o = zc(s[n], r[n]);
    if (o)
      return o;
    n++;
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (or(s))
      return 1;
    if (or(r))
      return -1;
  }
  return r.length - s.length;
}
function or(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Gc = {
  type: 0,
  value: ""
}, Qc = /[a-zA-Z0-9_]/;
function Yc(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[Gc]];
  if (!e.startsWith("/"))
    throw new Error(`Invalid path "${e}"`);
  function t(v) {
    throw new Error(`ERR (${n})/"${d}": ${v}`);
  }
  let n = 0, s = n;
  const r = [];
  let o;
  function i() {
    o && r.push(o), o = [];
  }
  let u = 0, c, d = "", a = "";
  function h() {
    d && (n === 0 ? o.push({
      type: 0,
      value: d
    }) : n === 1 || n === 2 || n === 3 ? (o.length > 1 && (c === "*" || c === "+") && t(`A repeatable param (${d}) must be alone in its segment. eg: '/:ids+.`), o.push({
      type: 1,
      value: d,
      regexp: a,
      repeatable: c === "*" || c === "+",
      optional: c === "*" || c === "?"
    })) : t("Invalid state to consume buffer"), d = "");
  }
  function p() {
    d += c;
  }
  for (; u < e.length; ) {
    if (c = e[u++], c === "\\" && n !== 2) {
      s = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (d && h(), i()) : c === ":" ? (h(), n = 1) : p();
        break;
      case 4:
        p(), n = s;
        break;
      case 1:
        c === "(" ? n = 2 : Qc.test(c) ? p() : (h(), n = 0, c !== "*" && c !== "?" && c !== "+" && u--);
        break;
      case 2:
        c === ")" ? a[a.length - 1] == "\\" ? a = a.slice(0, -1) + c : n = 3 : a += c;
        break;
      case 3:
        h(), n = 0, c !== "*" && c !== "?" && c !== "+" && u--, a = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${d}"`), h(), i(), r;
}
function Jc(e, t, n) {
  const s = Wc(Yc(e.path), n), r = q(s, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r;
}
function Xc(e, t) {
  const n = [], s = /* @__PURE__ */ new Map();
  t = cr({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(a) {
    return s.get(a);
  }
  function o(a, h, p) {
    const v = !p, A = Zc(a);
    A.aliasOf = p && p.record;
    const L = cr(t, a), F = [
      A
    ];
    if ("alias" in a) {
      const H = typeof a.alias == "string" ? [a.alias] : a.alias;
      for (const D of H)
        F.push(q({}, A, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: p ? p.record.components : A.components,
          path: D,
          // we might be the child of an alias
          aliasOf: p ? p.record : A
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let T, $;
    for (const H of F) {
      const { path: D } = H;
      if (h && D[0] !== "/") {
        const ee = h.record.path, k = ee[ee.length - 1] === "/" ? "" : "/";
        H.path = h.record.path + (D && k + D);
      }
      if (T = Jc(H, h, L), p ? p.alias.push(T) : ($ = $ || T, $ !== T && $.alias.push(T), v && a.name && !lr(T) && i(a.name)), A.children) {
        const ee = A.children;
        for (let k = 0; k < ee.length; k++)
          o(ee[k], T, p && p.children[k]);
      }
      p = p || T, (T.record.components && Object.keys(T.record.components).length || T.record.name || T.record.redirect) && c(T);
    }
    return $ ? () => {
      i($);
    } : Lt;
  }
  function i(a) {
    if (Po(a)) {
      const h = s.get(a);
      h && (s.delete(a), n.splice(n.indexOf(h), 1), h.children.forEach(i), h.alias.forEach(i));
    } else {
      const h = n.indexOf(a);
      h > -1 && (n.splice(h, 1), a.record.name && s.delete(a.record.name), a.children.forEach(i), a.alias.forEach(i));
    }
  }
  function u() {
    return n;
  }
  function c(a) {
    let h = 0;
    for (; h < n.length && qc(a, n[h]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (a.record.path !== n[h].record.path || !Oo(a, n[h])); )
      h++;
    n.splice(h, 0, a), a.record.name && !lr(a) && s.set(a.record.name, a);
  }
  function d(a, h) {
    let p, v = {}, A, L;
    if ("name" in a && a.name) {
      if (p = s.get(a.name), !p)
        throw Et(1, {
          location: a
        });
      L = p.record.name, v = q(
        // paramsFromLocation is a new object
        ir(
          h.params,
          // only keep params that exist in the resolved location
          // only keep optional params coming from a parent record
          p.keys.filter(($) => !$.optional).concat(p.parent ? p.parent.keys.filter(($) => $.optional) : []).map(($) => $.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        a.params && ir(a.params, p.keys.map(($) => $.name))
      ), A = p.stringify(v);
    } else if (a.path != null)
      A = a.path, p = n.find(($) => $.re.test(A)), p && (v = p.parse(A), L = p.record.name);
    else {
      if (p = h.name ? s.get(h.name) : n.find(($) => $.re.test(h.path)), !p)
        throw Et(1, {
          location: a,
          currentLocation: h
        });
      L = p.record.name, v = q({}, h.params, a.params), A = p.stringify(v);
    }
    const F = [];
    let T = p;
    for (; T; )
      F.unshift(T.record), T = T.parent;
    return {
      name: L,
      path: A,
      params: v,
      matched: F,
      meta: tu(F)
    };
  }
  return e.forEach((a) => o(a)), { addRoute: o, resolve: d, removeRoute: i, getRoutes: u, getRecordMatcher: r };
}
function ir(e, t) {
  const n = {};
  for (const s of t)
    s in e && (n[s] = e[s]);
  return n;
}
function Zc(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: eu(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function eu(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const s in e.components)
      t[s] = typeof n == "object" ? n[s] : n;
  return t;
}
function lr(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function tu(e) {
  return e.reduce((t, n) => q(t, n.meta), {});
}
function cr(e, t) {
  const n = {};
  for (const s in e)
    n[s] = s in t ? t[s] : e[s];
  return n;
}
function Oo(e, t) {
  return t.children.some((n) => n === e || Oo(e, n));
}
function nu(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const s = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < s.length; ++r) {
    const o = s[r].replace(Eo, " "), i = o.indexOf("="), u = Bt(i < 0 ? o : o.slice(0, i)), c = i < 0 ? null : Bt(o.slice(i + 1));
    if (u in t) {
      let d = t[u];
      Re(d) || (d = t[u] = [d]), d.push(c);
    } else
      t[u] = c;
  }
  return t;
}
function ur(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (n = xc(n), s == null) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Re(s) ? s.map((o) => o && zn(o)) : [s && zn(s)]).forEach((o) => {
      o !== void 0 && (t += (t.length ? "&" : "") + n, o != null && (t += "=" + o));
    });
  }
  return t;
}
function su(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 && (t[n] = Re(s) ? s.map((r) => r == null ? null : "" + r) : s == null ? s : "" + s);
  }
  return t;
}
const ru = Symbol(""), fr = Symbol(""), _s = Symbol(""), To = Symbol(""), Gn = Symbol("");
function Pt() {
  let e = [];
  function t(s) {
    return e.push(s), () => {
      const r = e.indexOf(s);
      r > -1 && e.splice(r, 1);
    };
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e.slice(),
    reset: n
  };
}
function ze(e, t, n, s, r, o = (i) => i()) {
  const i = s && // name is defined if record is because of the function overload
  (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
  return () => new Promise((u, c) => {
    const d = (p) => {
      p === !1 ? c(Et(4, {
        from: n,
        to: t
      })) : p instanceof Error ? c(p) : Kc(p) ? c(Et(2, {
        from: t,
        to: p
      })) : (i && // since enterCallbackArray is truthy, both record and name also are
      s.enterCallbacks[r] === i && typeof p == "function" && i.push(p), u());
    }, a = o(() => e.call(s && s.instances[r], t, n, d));
    let h = Promise.resolve(a);
    e.length < 3 && (h = h.then(d)), h.catch((p) => c(p));
  });
}
function Ln(e, t, n, s, r = (o) => o()) {
  const o = [];
  for (const i of e)
    for (const u in i.components) {
      let c = i.components[u];
      if (!(t !== "beforeRouteEnter" && !i.instances[u]))
        if (ou(c)) {
          const a = (c.__vccOpts || c)[t];
          a && o.push(ze(a, n, s, i, u, r));
        } else {
          let d = c();
          o.push(() => d.then((a) => {
            if (!a)
              return Promise.reject(new Error(`Couldn't resolve component "${u}" at "${i.path}"`));
            const h = ac(a) ? a.default : a;
            i.components[u] = h;
            const v = (h.__vccOpts || h)[t];
            return v && ze(v, n, s, i, u, r)();
          }));
        }
    }
  return o;
}
function ou(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function ar(e) {
  const t = Fe(_s), n = Fe(To), s = be(() => t.resolve(Ge(e.to))), r = be(() => {
    const { matched: c } = s.value, { length: d } = c, a = c[d - 1], h = n.matched;
    if (!a || !h.length)
      return -1;
    const p = h.findIndex(bt.bind(null, a));
    if (p > -1)
      return p;
    const v = dr(c[d - 2]);
    return (
      // we are dealing with nested routes
      d > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      dr(a) === v && // avoid comparing the child with its parent
      h[h.length - 1].path !== v ? h.findIndex(bt.bind(null, c[d - 2])) : p
    );
  }), o = be(() => r.value > -1 && cu(n.params, s.value.params)), i = be(() => r.value > -1 && r.value === n.matched.length - 1 && So(n.params, s.value.params));
  function u(c = {}) {
    return lu(c) ? t[Ge(e.replace) ? "replace" : "push"](
      Ge(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(Lt) : Promise.resolve();
  }
  return {
    route: s,
    href: be(() => s.value.href),
    isActive: o,
    isExactActive: i,
    navigate: u
  };
}
const iu = /* @__PURE__ */ fs({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink: ar,
  setup(e, { slots: t }) {
    const n = hn(ar(e)), { options: s } = Fe(_s), r = be(() => ({
      [hr(e.activeClass, s.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [hr(e.exactActiveClass, s.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const o = t.default && t.default(n);
      return e.custom ? o : mo("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: r.value
      }, o);
    };
  }
}), Mo = iu;
function lu(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function cu(e, t) {
  for (const n in t) {
    const s = t[n], r = e[n];
    if (typeof s == "string") {
      if (s !== r)
        return !1;
    } else if (!Re(r) || r.length !== s.length || s.some((o, i) => o !== r[i]))
      return !1;
  }
  return !0;
}
function dr(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const hr = (e, t, n) => e ?? t ?? n, uu = /* @__PURE__ */ fs({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: n }) {
    const s = Fe(Gn), r = be(() => e.route || s.value), o = Fe(fr, 0), i = be(() => {
      let d = Ge(o);
      const { matched: a } = r.value;
      let h;
      for (; (h = a[d]) && !h.components; )
        d++;
      return d;
    }), u = be(() => r.value.matched[i.value]);
    Zt(fr, be(() => i.value + 1)), Zt(ru, u), Zt(Gn, r);
    const c = gi();
    return Jt(() => [c.value, u.value, e.name], ([d, a, h], [p, v, A]) => {
      a && (a.instances[h] = d, v && v !== a && d && d === p && (a.leaveGuards.size || (a.leaveGuards = v.leaveGuards), a.updateGuards.size || (a.updateGuards = v.updateGuards))), d && a && // if there is no instance but to and from are the same this might be
      // the first visit
      (!v || !bt(a, v) || !p) && (a.enterCallbacks[h] || []).forEach((L) => L(d));
    }, { flush: "post" }), () => {
      const d = r.value, a = e.name, h = u.value, p = h && h.components[a];
      if (!p)
        return pr(n.default, { Component: p, route: d });
      const v = h.props[a], A = v ? v === !0 ? d.params : typeof v == "function" ? v(d) : v : null, F = mo(p, q({}, A, t, {
        onVnodeUnmounted: (T) => {
          T.component.isUnmounted && (h.instances[a] = null);
        },
        ref: c
      }));
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        pr(n.default, { Component: F, route: d }) || F
      );
    };
  }
});
function pr(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const fu = uu;
function au(e) {
  const t = Xc(e.routes, e), n = e.parseQuery || nu, s = e.stringifyQuery || ur, r = e.history, o = Pt(), i = Pt(), u = Pt(), c = mi(Ke);
  let d = Ke;
  ft && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const a = Mn.bind(null, (_) => "" + _), h = Mn.bind(null, Rc), p = (
    // @ts-expect-error: intentionally avoid the type check
    Mn.bind(null, Bt)
  );
  function v(_, C) {
    let R, O;
    return Po(_) ? (R = t.getRecordMatcher(_), O = C) : O = _, t.addRoute(O, R);
  }
  function A(_) {
    const C = t.getRecordMatcher(_);
    C && t.removeRoute(C);
  }
  function L() {
    return t.getRoutes().map((_) => _.record);
  }
  function F(_) {
    return !!t.getRecordMatcher(_);
  }
  function T(_, C) {
    if (C = q({}, C || c.value), typeof _ == "string") {
      const f = In(n, _, C.path), g = t.resolve({ path: f.path }, C), y = r.createHref(f.fullPath);
      return q(f, g, {
        params: p(g.params),
        hash: Bt(f.hash),
        redirectedFrom: void 0,
        href: y
      });
    }
    let R;
    if (_.path != null)
      R = q({}, _, {
        path: In(n, _.path, C.path).path
      });
    else {
      const f = q({}, _.params);
      for (const g in f)
        f[g] == null && delete f[g];
      R = q({}, _, {
        params: h(f)
      }), C.params = h(C.params);
    }
    const O = t.resolve(R, C), z = _.hash || "";
    O.params = a(p(O.params));
    const Y = Pc(s, q({}, _, {
      hash: Ec(z),
      path: O.path
    })), l = r.createHref(Y);
    return q({
      fullPath: Y,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: z,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        s === ur ? su(_.query) : _.query || {}
      )
    }, O, {
      redirectedFrom: void 0,
      href: l
    });
  }
  function $(_) {
    return typeof _ == "string" ? In(n, _, c.value.path) : q({}, _);
  }
  function H(_, C) {
    if (d !== _)
      return Et(8, {
        from: C,
        to: _
      });
  }
  function D(_) {
    return ce(_);
  }
  function ee(_) {
    return D(q($(_), { replace: !0 }));
  }
  function k(_) {
    const C = _.matched[_.matched.length - 1];
    if (C && C.redirect) {
      const { redirect: R } = C;
      let O = typeof R == "function" ? R(_) : R;
      return typeof O == "string" && (O = O.includes("?") || O.includes("#") ? O = $(O) : (
        // force empty params
        { path: O }
      ), O.params = {}), q({
        query: _.query,
        hash: _.hash,
        // avoid transferring params if the redirect has a path
        params: O.path != null ? {} : _.params
      }, O);
    }
  }
  function ce(_, C) {
    const R = d = T(_), O = c.value, z = _.state, Y = _.force, l = _.replace === !0, f = k(R);
    if (f)
      return ce(
        q($(f), {
          state: typeof f == "object" ? q({}, z, f.state) : z,
          force: Y,
          replace: l
        }),
        // keep original redirectedFrom if it exists
        C || R
      );
    const g = R;
    g.redirectedFrom = C;
    let y;
    return !Y && Ac(s, O, R) && (y = Et(16, { to: g, from: O }), Pe(
      O,
      O,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (y ? Promise.resolve(y) : Se(g, O)).catch((m) => Ne(m) ? (
      // navigation redirects still mark the router as ready
      Ne(
        m,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? m : Be(m)
    ) : (
      // reject any unknown error
      W(m, g, O)
    )).then((m) => {
      if (m) {
        if (Ne(
          m,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return ce(
            // keep options
            q({
              // preserve an existing replacement but allow the redirect to override it
              replace: l
            }, $(m.to), {
              state: typeof m.to == "object" ? q({}, z, m.to.state) : z,
              force: Y
            }),
            // preserve the original redirectedFrom if any
            C || g
          );
      } else
        m = Xe(g, O, !0, l, z);
      return ke(g, O, m), m;
    });
  }
  function me(_, C) {
    const R = H(_, C);
    return R ? Promise.reject(R) : Promise.resolve();
  }
  function Je(_) {
    const C = ct.values().next().value;
    return C && typeof C.runWithContext == "function" ? C.runWithContext(_) : _();
  }
  function Se(_, C) {
    let R;
    const [O, z, Y] = du(_, C);
    R = Ln(O.reverse(), "beforeRouteLeave", _, C);
    for (const f of O)
      f.leaveGuards.forEach((g) => {
        R.push(ze(g, _, C));
      });
    const l = me.bind(null, _, C);
    return R.push(l), oe(R).then(() => {
      R = [];
      for (const f of o.list())
        R.push(ze(f, _, C));
      return R.push(l), oe(R);
    }).then(() => {
      R = Ln(z, "beforeRouteUpdate", _, C);
      for (const f of z)
        f.updateGuards.forEach((g) => {
          R.push(ze(g, _, C));
        });
      return R.push(l), oe(R);
    }).then(() => {
      R = [];
      for (const f of Y)
        if (f.beforeEnter)
          if (Re(f.beforeEnter))
            for (const g of f.beforeEnter)
              R.push(ze(g, _, C));
          else
            R.push(ze(f.beforeEnter, _, C));
      return R.push(l), oe(R);
    }).then(() => (_.matched.forEach((f) => f.enterCallbacks = {}), R = Ln(Y, "beforeRouteEnter", _, C, Je), R.push(l), oe(R))).then(() => {
      R = [];
      for (const f of i.list())
        R.push(ze(f, _, C));
      return R.push(l), oe(R);
    }).catch((f) => Ne(
      f,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? f : Promise.reject(f));
  }
  function ke(_, C, R) {
    u.list().forEach((O) => Je(() => O(_, C, R)));
  }
  function Xe(_, C, R, O, z) {
    const Y = H(_, C);
    if (Y)
      return Y;
    const l = C === Ke, f = ft ? history.state : {};
    R && (O || l ? r.replace(_.fullPath, q({
      scroll: l && f && f.scroll
    }, z)) : r.push(_.fullPath, z)), c.value = _, Pe(_, C, R, l), Be();
  }
  let Ce;
  function Rt() {
    Ce || (Ce = r.listen((_, C, R) => {
      if (!Vt.listening)
        return;
      const O = T(_), z = k(O);
      if (z) {
        ce(q(z, { replace: !0 }), O).catch(Lt);
        return;
      }
      d = O;
      const Y = c.value;
      ft && jc(tr(Y.fullPath, R.delta), En()), Se(O, Y).catch((l) => Ne(
        l,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? l : Ne(
        l,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (ce(
        l.to,
        O
        // avoid an uncaught rejection, let push call triggerError
      ).then((f) => {
        Ne(
          f,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !R.delta && R.type === Ut.pop && r.go(-1, !1);
      }).catch(Lt), Promise.reject()) : (R.delta && r.go(-R.delta, !1), W(l, O, Y))).then((l) => {
        l = l || Xe(
          // after navigation, all matched components are resolved
          O,
          Y,
          !1
        ), l && (R.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !Ne(
          l,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? r.go(-R.delta, !1) : R.type === Ut.pop && Ne(
          l,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && r.go(-1, !1)), ke(O, Y, l);
      }).catch(Lt);
    }));
  }
  let it = Pt(), ne = Pt(), G;
  function W(_, C, R) {
    Be(_);
    const O = ne.list();
    return O.length ? O.forEach((z) => z(_, C, R)) : console.error(_), Promise.reject(_);
  }
  function $e() {
    return G && c.value !== Ke ? Promise.resolve() : new Promise((_, C) => {
      it.add([_, C]);
    });
  }
  function Be(_) {
    return G || (G = !_, Rt(), it.list().forEach(([C, R]) => _ ? R(_) : C()), it.reset()), _;
  }
  function Pe(_, C, R, O) {
    const { scrollBehavior: z } = e;
    if (!ft || !z)
      return Promise.resolve();
    const Y = !R && Fc(tr(_.fullPath, 0)) || (O || !R) && history.state && history.state.scroll || null;
    return Vr().then(() => z(_, C, Y)).then((l) => l && Nc(l)).catch((l) => W(l, _, C));
  }
  const fe = (_) => r.go(_);
  let lt;
  const ct = /* @__PURE__ */ new Set(), Vt = {
    currentRoute: c,
    listening: !0,
    addRoute: v,
    removeRoute: A,
    hasRoute: F,
    getRoutes: L,
    resolve: T,
    options: e,
    push: D,
    replace: ee,
    go: fe,
    back: () => fe(-1),
    forward: () => fe(1),
    beforeEach: o.add,
    beforeResolve: i.add,
    afterEach: u.add,
    onError: ne.add,
    isReady: $e,
    install(_) {
      const C = this;
      _.component("RouterLink", Mo), _.component("RouterView", fu), _.config.globalProperties.$router = C, Object.defineProperty(_.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => Ge(c)
      }), ft && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !lt && c.value === Ke && (lt = !0, D(r.location).catch((z) => {
      }));
      const R = {};
      for (const z in Ke)
        Object.defineProperty(R, z, {
          get: () => c.value[z],
          enumerable: !0
        });
      _.provide(_s, C), _.provide(To, $r(R)), _.provide(Gn, c);
      const O = _.unmount;
      ct.add(_), _.unmount = function() {
        ct.delete(_), ct.size < 1 && (d = Ke, Ce && Ce(), Ce = null, c.value = Ke, lt = !1, G = !1), O();
      };
    }
  };
  function oe(_) {
    return _.reduce((C, R) => C.then(() => Je(R)), Promise.resolve());
  }
  return Vt;
}
function du(e, t) {
  const n = [], s = [], r = [], o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const u = t.matched[i];
    u && (e.matched.find((d) => bt(d, u)) ? s.push(u) : n.push(u));
    const c = e.matched[i];
    c && (t.matched.find((d) => bt(d, c)) || r.push(c));
  }
  return [n, s, r];
}
const hu = /* @__PURE__ */ hs(
  "hr",
  null,
  null,
  -1
  /* HOISTED */
), pu = /* @__PURE__ */ fs({
  __name: "App",
  setup(e) {
    const t = /* @__PURE__ */ Object.assign({ "./client/About.vue": _o, "./client/Contact.vue": yo, "./client/Home.vue": vo }), n = Object.keys(t).map((r) => {
      const o = r.match(/\.\/client\/(.*)\.vue$/)[1];
      return {
        name: o,
        path: o === "Home" ? "/" : `/${o.toLowerCase()}`,
        component: t[r].default
      };
    });
    console.log("#App.vue");
    let s = n;
    return (r, o) => {
      const i = Oi("router-view");
      return mt(), _t("div", null, [
        (mt(!0), _t(
          Te,
          null,
          Qi(Ge(s), (u) => (mt(), _t("li", {
            key: u.path
          }, [
            ge(Ge(Mo), {
              to: "" + u.path
            }, {
              default: Qr(() => [
                ho(
                  Wo(u.name),
                  1
                  /* TEXT */
                )
              ]),
              _: 2
              /* DYNAMIC */
            }, 1032, ["to"])
          ]))),
          128
          /* KEYED_FRAGMENT */
        )),
        hu,
        ge(i)
      ]);
    };
  }
}), gu = /* @__PURE__ */ bn(pu, [["__file", "/home/naka/work/node/express/express_44vue/src/App.vue"]]), gr = /* @__PURE__ */ Object.assign({ "./client/About.vue": _o, "./client/Contact.vue": yo, "./client/Home.vue": vo }), mu = Object.keys(gr).map((e) => {
  const t = e.match(/\.\/client\/(.*)\.vue$/)[1];
  return {
    name: t,
    path: t === "Home" ? "/" : `/${t.toLowerCase()}`,
    component: gr[e].default
  };
}), _u = au({
  history: Uc(),
  routes: mu
}), Io = Zl(gu);
Io.use(_u);
Io.mount("#app");
