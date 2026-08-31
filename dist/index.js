"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __knownSymbol = (name, symbol) => (symbol = Symbol[name]) ? symbol : /* @__PURE__ */ Symbol.for("Symbol." + name);
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decoratorStart = (base) => [, , , __create(base?.[__knownSymbol("metadata")] ?? null)];
var __decoratorStrings = ["class", "method", "getter", "setter", "accessor", "field", "value", "get", "set"];
var __expectFn = (fn) => fn !== void 0 && typeof fn !== "function" ? __typeError("Function expected") : fn;
var __decoratorContext = (kind, name, done, metadata, fns) => ({ kind: __decoratorStrings[kind], name, metadata, addInitializer: (fn) => done._ ? __typeError("Already initialized") : fns.push(__expectFn(fn || null)) });
var __decoratorMetadata = (array, target) => __defNormalProp(target, __knownSymbol("metadata"), array[3]);
var __runInitializers = (array, flags, self, value) => {
  for (var i = 0, fns = array[flags >> 1], n = fns && fns.length; i < n; i++) flags & 1 ? fns[i].call(self) : value = fns[i].call(self, value);
  return value;
};
var __decorateElement = (array, flags, name, decorators, target, extra) => {
  var fn, it, done, ctx, access, k = flags & 7, s = !!(flags & 8), p = !!(flags & 16);
  var j = k > 3 ? array.length + 1 : k ? s ? 1 : 2 : 0, key = __decoratorStrings[k + 5];
  var initializers = k > 3 && (array[j - 1] = []), extraInitializers = array[j] || (array[j] = []);
  var desc = k && (!p && !s && (target = target.prototype), k < 5 && (k > 3 || !p) && __getOwnPropDesc(k < 4 ? target : { get [name]() {
    return __privateGet(this, extra);
  }, set [name](x) {
    return __privateSet(this, extra, x);
  } }, name));
  k ? p && k < 4 && __name(extra, (k > 2 ? "set " : k > 1 ? "get " : "") + name) : __name(target, name);
  for (var i = decorators.length - 1; i >= 0; i--) {
    ctx = __decoratorContext(k, name, done = {}, array[3], extraInitializers);
    if (k) {
      ctx.static = s, ctx.private = p, access = ctx.access = { has: p ? (x) => __privateIn(target, x) : (x) => name in x };
      if (k ^ 3) access.get = p ? (x) => (k ^ 1 ? __privateGet : __privateMethod)(x, target, k ^ 4 ? extra : desc.get) : (x) => x[name];
      if (k > 2) access.set = p ? (x, y) => __privateSet(x, target, y, k ^ 4 ? extra : desc.set) : (x, y) => x[name] = y;
    }
    it = (0, decorators[i])(k ? k < 4 ? p ? extra : desc[key] : k > 4 ? void 0 : { get: desc.get, set: desc.set } : target, ctx), done._ = 1;
    if (k ^ 4 || it === void 0) __expectFn(it) && (k > 4 ? initializers.unshift(it) : k ? p ? extra = it : desc[key] = it : target = it);
    else if (typeof it !== "object" || it === null) __typeError("Object expected");
    else __expectFn(fn = it.get) && (desc.get = fn), __expectFn(fn = it.set) && (desc.set = fn), __expectFn(fn = it.init) && initializers.unshift(fn);
  }
  return k || __decoratorMetadata(array, target), desc && __defProp(target, name, desc), p ? k ^ 4 ? extra : desc : target;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateIn = (member, obj) => Object(obj) !== obj ? __typeError('Cannot use the "in" operator on this value') : member.has(obj);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// src/Class/ConsoleLogger.shared.ts
var ConsoleLogger = class _ConsoleLogger {
  instanceName;
  tagName;
  constructor(instanceName) {
    this.instanceName = instanceName;
  }
  // Création du préfixe de temps
  static getTimeStamp() {
    const now = /* @__PURE__ */ new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }
  // Création du préfixe
  static getPrefix(typeName, instanceName, tagName = void 0) {
    return `[${_ConsoleLogger.getTimeStamp()}] [${this.StrPadCenter(typeName, 5, " ").toLocaleUpperCase()}] [${instanceName}] ${tagName ? "[" + tagName + "]" : ""}`;
  }
  static StrPadCenter(str, maxLength, fillString) {
    const l = str.length;
    const f = fillString?.[0] ?? " ";
    if (l >= maxLength) {
      return str;
    }
    if (l > maxLength) {
      return str.substring(0, maxLength);
    }
    const totalPadding = maxLength - str.length;
    const left = Math.floor(totalPadding / 2);
    const right = totalPadding - left;
    return f.repeat(left) + str + f.repeat(right);
  }
  // Méthode interne pour gérer différents types de messages
  static Logger(functionLog, typeName, instanceName, tagName, ...message) {
    for (const msg of message) {
      const prefix = _ConsoleLogger.getPrefix(typeName, instanceName, tagName);
      if (msg instanceof Error) {
        const stack = msg.stack?.split("\n").slice(1).join("\n") || "no stack trace available";
        functionLog(`${prefix}${msg.name} : ${msg.message} 
 ${stack}`);
        continue;
      }
      if (Array.isArray(msg)) {
        functionLog(`${prefix} Array : `, JSON.stringify(msg, null, 2));
        continue;
      }
      switch (typeof msg) {
        case "string":
        case "bigint":
        case "number":
        case "boolean":
        case "undefined":
          functionLog(`${prefix}${msg}`);
          continue;
        case "function":
        case "symbol":
          functionLog(`${prefix}${msg.toString()}`);
          continue;
        case "object":
          functionLog(`${prefix} Object : `, JSON.stringify(msg, null, 2));
          continue;
        default:
          functionLog(`${prefix}`, msg);
          continue;
      }
    }
  }
  static LevelError = 0;
  // 0 = Tout , 1 = Warn , 2 = Error
  //////////////////////////////////////////////////
  // API 
  log(...message) {
    _ConsoleLogger.Logger(console.log, "log", this.instanceName, this.tagName, ...message);
  }
  error(...message) {
    if (_ConsoleLogger.LevelError >= 2 || _ConsoleLogger.LevelError === 0) _ConsoleLogger.Logger(console.error, "error", this.instanceName, this.tagName, ...message);
  }
  warn(...message) {
    if (_ConsoleLogger.LevelError >= 1 || _ConsoleLogger.LevelError === 0) _ConsoleLogger.Logger(console.warn, "warn", this.instanceName, this.tagName, ...message);
  }
  fatalError(...message) {
    _ConsoleLogger.Logger(console.error, "fatal", this.instanceName, this.tagName, ...message);
    process.exit(1);
  }
  tag(tag) {
    this.tagName = tag;
    return this;
  }
  //////////////////////////////////////////////////
  // Static API 
  static log(...message) {
    _ConsoleLogger.Logger(console.log, "log", "Systeme", void 0, ...message);
  }
  static error(...message) {
    if (_ConsoleLogger.LevelError >= 2 || _ConsoleLogger.LevelError === 0) _ConsoleLogger.Logger(console.error, "error", "Systeme", void 0, ...message);
  }
  static warn(...message) {
    if (_ConsoleLogger.LevelError >= 1 || _ConsoleLogger.LevelError === 0) _ConsoleLogger.Logger(console.warn, "warn", "Systeme", void 0, ...message);
  }
  static fatalError(...message) {
    _ConsoleLogger.Logger(console.error, "fatal", "Systeme", void 0, ...message);
    process.exit(1);
  }
  static SetLogLevel(level) {
    switch (level) {
      case "All":
        _ConsoleLogger.LevelError = 0;
        break;
      case "Warn":
        _ConsoleLogger.LevelError = 1;
        break;
      case "Error":
        _ConsoleLogger.LevelError = 2;
        break;
    }
  }
  static getInstance(instanceName, tag = void 0) {
    const i = new _ConsoleLogger(instanceName);
    tag ? i.tag(tag) : null;
    return i;
  }
};

// src/Class/EnvConfig/EnvConfig.back.ts
var import_dotenv = __toESM(require("dotenv"));

// src/Class/EnvConfig/EnvConfigContext.shared.ts
var EnvConfigContext = class {
  constructor() {
  }
  int = EnvConfigShared._build(EnvConfigShared._int);
  float = EnvConfigShared._build(EnvConfigShared._float);
  boolean = EnvConfigShared._build(EnvConfigShared._boolean);
  string = EnvConfigShared._build(EnvConfigShared._string);
  positiveInt = EnvConfigShared._build(EnvConfigShared._positiveInt);
  positiveFloat = EnvConfigShared._build(EnvConfigShared._positiveFloat);
  array = {
    OrNull: (tag, Separator = ";") => EnvConfigShared._array(tag, null, Separator),
    OrUndefined: (tag, Separator = ";") => EnvConfigShared._array(tag, void 0, Separator),
    OrDefault: (tag, Default, Separator = ";") => EnvConfigShared._array(tag, Default, Separator),
    OrError: (tag, ErrorName, Throw = false, Separator = ";") => {
      const t = EnvConfigShared._array(tag, void 0, Separator);
      if (t === void 0) {
        if (Throw) throw new Error(ErrorName);
        return new Error(ErrorName);
      }
      return t;
    }
  };
  json = {
    OrNull: (tag) => EnvConfigShared._json(tag, null),
    OrUndefined: (tag) => EnvConfigShared._json(tag, void 0),
    OrDefault: (tag, Default) => EnvConfigShared._json(tag, Default),
    OrError: (tag, ErrorName, Throw = false) => {
      const t = EnvConfigShared._json(tag, void 0);
      if (t === void 0) {
        if (Throw) throw new Error(ErrorName);
        return new Error(ErrorName);
      }
      return t;
    }
  };
  url = EnvConfigShared._build(EnvConfigShared._url);
  email = EnvConfigShared._build(EnvConfigShared._email);
  hostname = EnvConfigShared._build(EnvConfigShared._hostname);
  duration = EnvConfigShared._build(EnvConfigShared._duration);
  enum(Values) {
    return {
      OrNull: (tag) => EnvConfigShared._enum(tag, Values, null),
      OrUndefined: (tag) => EnvConfigShared._enum(tag, Values, void 0),
      OrDefault: (tag, Default) => EnvConfigShared._enum(tag, Values, Default),
      OrError: (tag, ErrorName, Throw = false) => {
        const t = EnvConfigShared._enum(tag, Values, void 0);
        if (t === void 0) {
          if (Throw) throw new Error(ErrorName);
          return new Error(ErrorName);
        }
        return t;
      }
    };
  }
  ip = EnvConfigShared._build(EnvConfigShared._ip);
  port = EnvConfigShared._build(EnvConfigShared._port);
  hexColor = EnvConfigShared._build(EnvConfigShared._hexColor);
};

// src/Class/EnvConfig/EnvConfig.shared.ts
var EnvConfigShared = class _EnvConfigShared {
  static data;
  static console;
  static I18n;
  static createEnvConfigContext() {
    return new EnvConfigContext();
  }
  static display() {
    console.log("EnvConfigShared :");
    for (const key in _EnvConfigShared.data) {
      console.log(`  ${key} = ${_EnvConfigShared.data[key]}`);
    }
  }
  //////////////////////////////////////////////////
  // API
  static _build(callback) {
    return {
      OrNull: (tag) => callback(_EnvConfigShared.checkTag(tag), null),
      OrUndefined: (tag) => callback(_EnvConfigShared.checkTag(tag), void 0),
      OrDefault: (tag, Default) => callback(_EnvConfigShared.checkTag(tag), Default),
      require: (tag) => {
        const t = callback(_EnvConfigShared.checkTag(tag), void 0);
        if (!_EnvConfigShared._isDefined(t)) return _EnvConfigShared.console.fatalError(new Error(_EnvConfigShared.I18n.get("EnvConfig_require_error", { tag })));
        return t;
      }
    };
  }
  static checkTag(tag) {
    return tag.trim().toLocaleUpperCase().replaceAll(" ", "_");
  }
  static _isDefined(value) {
    return value !== void 0;
  }
  static _int(tag, Default) {
    const data = _EnvConfigShared.data[tag];
    if (!data) return Default;
    const value = parseInt(data, 10);
    return isNaN(value) ? Default : value;
  }
  static _float(tag, Default) {
    const data = _EnvConfigShared.data[tag];
    if (!data) return Default;
    const value = parseFloat(data);
    return isNaN(value) ? Default : value;
  }
  static _boolean(tag, Default) {
    const data = _EnvConfigShared.data[tag];
    if (!data) return Default;
    switch (data) {
      case "true":
      case "1":
      case "yes":
      case "on":
        return true;
      case "false":
      case "0":
      case "no":
      case "off":
        return false;
      default:
        return Default;
    }
  }
  static _string(tag, Default) {
    const data = _EnvConfigShared.data[tag];
    return data ?? Default;
  }
  static _array(tag, Default, Separator = ";") {
    const data = _EnvConfigShared.data[tag];
    if (!data) return Default;
    return data.split(Separator).map((v) => v.trim());
  }
  static _json(tag, Default) {
    const data = _EnvConfigShared.data[tag];
    if (!data) return Default;
    if (data.startsWith("{") === false && data.startsWith("[") === false) return Default;
    if (data.endsWith("}") === false && data.endsWith("]") === false) return Default;
    try {
      return JSON.parse(data);
    } catch (e) {
      return Default;
    }
  }
  static _positiveInt(tag, Default) {
    const data = _EnvConfigShared.data[tag];
    if (!data) return Default;
    const value = parseInt(data);
    return isNaN(value) || value < 0 ? Default : value;
  }
  static _positiveFloat(tag, Default) {
    const data = _EnvConfigShared.data[tag];
    if (!data) return Default;
    const value = parseFloat(data);
    return isNaN(value) || value < 0 ? Default : value;
  }
  static _url(tag, Default) {
    const data = _EnvConfigShared.data[tag];
    if (!data) return Default;
    try {
      return new URL(data);
    } catch {
      return Default;
    }
  }
  static _email(tag, Default) {
    const data = _EnvConfigShared.data[tag];
    if (!data) return Default;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(data) ? data : Default;
  }
  static _hostname(tag, Default) {
    const data = _EnvConfigShared.data[tag];
    if (!data) return Default;
    const regex = /^(?=.{1,253}$)(localhost|([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63})$/;
    return regex.test(data) ? data : Default;
  }
  static _duration(tag, Default) {
    const data = _EnvConfigShared.data[tag];
    if (!data) return Default;
    const regex = /^(\d+)(ms|s|m|h|d)$/;
    const match = data.match(regex);
    if (!match) return Default;
    const value = parseInt(match[1], 10);
    const unit = match[2];
    switch (unit) {
      case "ms":
        return value;
      case "s":
        return value * 1e3;
      case "m":
        return value * 6e4;
      case "h":
        return value * 36e5;
      case "d":
        return value * 864e5;
      default:
        return Default;
    }
  }
  static _enum(tag, Values, Default) {
    const data = _EnvConfigShared.data[tag];
    if (!data)
      return Default;
    return Values.includes(
      data
    ) ? data : Default;
  }
  static _ip(tag, Default) {
    const data = _EnvConfigShared.data[tag];
    if (!data) return Default;
    const ipv4 = /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
    const ipv6 = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv4.test(data) || ipv6.test(data) ? data : Default;
  }
  static _port(tag, Default) {
    const data = _EnvConfigShared.data[tag];
    if (!data) return Default;
    const value = parseInt(data, 10);
    return Number.isInteger(value) && value >= 0 && value <= 65535 ? value : Default;
  }
  static _range(tag, min, max, Default) {
    const data = _EnvConfigShared.data[tag];
    if (!data) return Default;
    const value = parseInt(data, 10);
    if (isNaN(value)) return Default;
    return value >= min && value <= max ? value : Default;
  }
  static _hexColor(tag, Default) {
    const data = _EnvConfigShared.data[tag];
    if (!data) return Default;
    const regex = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    return regex.test(data) ? data : Default;
  }
};

// src/Class/PerformanceProfiler/PerformanceScope.shared.ts
var PerformanceScope = class {
  mesures = [];
  addMesure(start, end) {
    this.mesures.push({
      start,
      end
    });
    if (this.mesures.length > PerformanceProfiler.maxHistory) {
      this.mesures.shift();
    }
  }
  // Time
  get durationsNs() {
    return this.mesures.map((m) => Number(m.end.ns - m.start.ns));
  }
  get durationsMs() {
    return this.durationsNs.map((x) => x / 1e6);
  }
  get sortedDurationsMs() {
    return [...this.durationsMs].sort((a, b) => a - b);
  }
  get nCall() {
    return this.mesures.length;
  }
  get totalMs() {
    let total = 0;
    for (const value of this.durationsMs)
      total += value;
    return total;
  }
  get averageMs() {
    if (this.nCall === 0)
      return 0;
    return this.totalMs / this.nCall;
  }
  get minMs() {
    if (this.nCall === 0) return 0;
    return Math.min(...this.durationsMs);
  }
  get maxMs() {
    if (this.nCall === 0) return 0;
    return Math.max(...this.durationsMs);
  }
  get medianMs() {
    if (this.nCall === 0)
      return 0;
    const values = this.sortedDurationsMs;
    const middle = Math.floor(values.length / 2);
    if (values.length % 2 === 0)
      return (values[middle - 1] + values[middle]) / 2;
    return values[middle];
  }
  get p50Ms() {
    return this.medianMs;
  }
  percentile(percent) {
    if (this.nCall === 0) return 0;
    const values = this.sortedDurationsMs;
    const index = Math.ceil(values.length * percent) - 1;
    return values[Math.max(0, index)];
  }
  get p90Ms() {
    return this.percentile(0.9);
  }
  get p95Ms() {
    return this.percentile(0.95);
  }
  get p99Ms() {
    return this.percentile(0.99);
  }
  get variance() {
    if (this.nCall === 0) return 0;
    const avg = this.averageMs;
    let total = 0;
    for (const value of this.durationsMs) {
      total += (value - avg) ** 2;
    }
    return total / this.nCall;
  }
  get standardDeviation() {
    return Math.sqrt(this.variance);
  }
  get operationsPerSecond() {
    if (this.totalMs === 0) return 0;
    return this.nCall / (this.totalMs / 1e3);
  }
  // RAM
  get averageRam() {
    if (this.nCall === 0) return 0;
    let total = 0;
    for (const m of this.mesures) {
      total += m.end.ram - m.start.ram;
    }
    return total / this.nCall;
  }
  get minRam() {
    if (this.nCall === 0) return 0;
    return Math.min(
      ...this.mesures.map(
        (m) => m.end.ram - m.start.ram
      )
    );
  }
  get maxRam() {
    if (this.nCall === 0) return 0;
    return Math.max(
      ...this.mesures.map(
        (m) => m.end.ram - m.start.ram
      )
    );
  }
  get totalRam() {
    let total = 0;
    for (const m of this.mesures) {
      total += m.end.ram - m.start.ram;
    }
    return total;
  }
};

// src/Class/PerformanceProfiler/PerformanceMeasure.shared.ts
var PerformanceMeasure = class {
  constructor(scope) {
    this.scope = scope;
    this.start = this.measure();
  }
  scope;
  start;
  measure() {
    if (typeof process !== "undefined" && typeof process.hrtime?.bigint === "function") {
      return {
        ns: process.hrtime.bigint(),
        ram: process.memoryUsage().heapUsed
      };
    }
    if (typeof performance !== "undefined") {
      return {
        ns: BigInt(Math.round(performance.now() * 1e6)),
        ram: performance.memory?.usedJSHeapSize ?? 0
      };
    }
    throw new Error("Unsupported platform.");
  }
  [Symbol.dispose]() {
    this.dispose();
  }
  async [Symbol.asyncDispose]() {
    this.dispose();
  }
  dispose() {
    this.scope.addMesure(
      this.start,
      this.measure()
    );
  }
  end() {
    this.dispose();
  }
};

// src/Class/PerformanceProfiler/ReportNode.shared.ts
var ReportNode = class {
  children = /* @__PURE__ */ new Map();
  scope;
};

// src/Class/PerformanceProfiler/NullPerformanceMeasure.shared.ts
var NullPerformanceMeasure = class {
  [Symbol.dispose]() {
  }
  async [Symbol.asyncDispose]() {
  }
  end() {
  }
};

// src/Class/PerformanceProfiler/PerformanceProfiler.shared.ts
var PerformanceProfiler = class _PerformanceProfiler {
  static isDebug = true;
  //CLIManager.getContext().hasArg("Debug")
  static #Profig = {};
  static maxHistory = 1e4;
  static sampleHistory = 1e3;
  static measure(scopeName) {
    if (!_PerformanceProfiler.isDebug) return new NullPerformanceMeasure();
    if (!_PerformanceProfiler.#Profig[scopeName]) _PerformanceProfiler.#Profig[scopeName] = new PerformanceScope();
    return new PerformanceMeasure(_PerformanceProfiler.#Profig[scopeName]);
  }
  static report() {
    if (!this.isDebug) return;
    const root = new ReportNode();
    for (const [scopeName, scope] of Object.entries(this.#Profig)) {
      const parts = scopeName.split(".");
      let current = root;
      for (const part of parts) {
        let child = current.children.get(part);
        if (!child) {
          child = new ReportNode();
          current.children.set(part, child);
        }
        current = child;
      }
      current.scope = scope;
    }
    console.log("");
    console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
    console.log(" Performance Report");
    console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
    this.printNode(root, "");
    console.log("\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550");
  }
  static printNode(node, indent) {
    const entries = [...node.children.entries()].sort((a, b) => a[0].localeCompare(b[0]));
    entries.forEach(([name, child], index) => {
      const last = index === entries.length - 1;
      const branch = last ? "\u2514\u2500\u2500 " : "\u251C\u2500\u2500 ";
      if (child.scope) {
        const minram = child.scope.minRam;
        const maxram = child.scope.maxRam;
        const totalram = child.scope.totalRam;
        console.log(`${indent}${branch}${name}`);
        console.log(`${indent}${last ? "    " : "\u2502   "}   Calls  : ${child.scope.nCall}`);
        console.log(`${indent}${last ? "    " : "\u2502   "}   Avg    : ${child.scope.averageMs.toFixed(3)} ms`);
        console.log(`${indent}${last ? "    " : "\u2502   "}   Min    : ${child.scope.minMs.toFixed(3)} ms`);
        console.log(`${indent}${last ? "    " : "\u2502   "}   Max    : ${child.scope.maxMs.toFixed(3)} ms`);
        console.log(`${indent}${last ? "    " : "\u2502   "}   P95    : ${child.scope.p95Ms.toFixed(3)} ms`);
        console.log(`${indent}${last ? "    " : "\u2502   "}   minRam : ${_PerformanceProfiler.formatBytes(minram)}`);
        console.log(`${indent}${last ? "    " : "\u2502   "}   maxRam : ${_PerformanceProfiler.formatBytes(maxram)}`);
        console.log(`${indent}${last ? "    " : "\u2502   "}   Total  : ${child.scope.totalMs.toFixed(3)} ms | ${_PerformanceProfiler.formatBytes(totalram)}`);
        console.log(`${indent}${last ? "    " : "\u2502   "}`);
      } else {
        console.log(`${indent}${branch}${name}`);
      }
      this.printNode(
        child,
        indent + (last ? "    " : "\u2502   ")
      );
    });
  }
  static formatBytes(bytes) {
    const units = ["B", "KB", "MB", "GB", "TB"];
    const sign = bytes < 0 ? "-" : "";
    let value = Math.abs(bytes);
    let unit = 0;
    while (value >= 1024 && unit < units.length - 1) {
      value /= 1024;
      unit++;
    }
    return `${sign}${value.toFixed(2)} ${units[unit]}`;
  }
  static save() {
    const metadata = {
      version: 1,
      profilerVersion: "1.0.0",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      node: process.version,
      platform: process.platform
    };
    const save = {
      metadata,
      scopes: {}
    };
    for (const [name, scope] of Object.entries(this.#Profig)) {
      const statistics = {
        calls: scope.nCall,
        totalMs: scope.totalMs,
        averageMs: scope.averageMs,
        medianMs: scope.medianMs,
        minMs: scope.minMs,
        maxMs: scope.maxMs,
        p90Ms: scope.p90Ms,
        p95Ms: scope.p95Ms,
        p99Ms: scope.p99Ms,
        standardDeviation: scope.standardDeviation,
        averageRam: scope.averageRam,
        minRam: scope.minRam,
        maxRam: scope.maxRam
      };
      const t = scope.durationsMs;
      const samples = t.length > _PerformanceProfiler.sampleHistory ? scope.durationsMs.slice(0, _PerformanceProfiler.sampleHistory) : t;
      save.scopes[name] = {
        statistics,
        samples
      };
    }
  }
  static decorator(scopeName) {
    return function(originalMethod, context) {
      return function(...args) {
        if (!_PerformanceProfiler.isDebug) return originalMethod.apply(this, args);
        const className = this.name ? this.name.replaceAll("_", "") : this.constructor.name.replaceAll("_", "");
        const name = scopeName ?? `${className}.${String(context.name)}`;
        const perf = _PerformanceProfiler.measure(name);
        let result;
        try {
          result = originalMethod.apply(this, args);
        } catch (err) {
          perf.end();
          throw err;
        }
        if (result && typeof result.then === "function") {
          return result.then((v) => {
            perf.end();
            return v;
          }).catch((err) => {
            perf.end();
            throw err;
          });
        }
        perf.end();
        return result;
      };
    };
  }
};

// src/Class/InitsClass.shared.ts
var _init_dec, _start_dec, _map, _tamp, _init;
_start_dec = [PerformanceProfiler.decorator()], _init_dec = [PerformanceProfiler.decorator()];
var _InitsClass = class _InitsClass {
  static register(func, priorite = 0) {
    const COI = {
      init: func,
      priorite
    };
    if (_InitsClass.isInit) {
      __privateGet(this, _tamp).push(COI);
    } else {
      __privateGet(this, _map).push(COI);
    }
  }
  static async start(option) {
    _InitsClass.isInit = 1;
    await _InitsClass.init(__privateGet(_InitsClass, _map), option);
  }
  static async init(map, option) {
    for (const coi of map.sort(((a, b) => b.priorite - a.priorite))) {
      await coi.init(option);
      _InitsClass.i++;
    }
    if (__privateGet(this, _tamp).length > 0) {
      const tamp = __privateGet(this, _tamp);
      __privateSet(this, _tamp, []);
      await _InitsClass.init(tamp, option);
    }
  }
};
_init = __decoratorStart(null);
_map = new WeakMap();
_tamp = new WeakMap();
__decorateElement(_init, 9, "start", _start_dec, _InitsClass);
__decorateElement(_init, 9, "init", _init_dec, _InitsClass);
__decoratorMetadata(_init, _InitsClass);
__runInitializers(_init, 3, _InitsClass);
__publicField(_InitsClass, "i", 0);
__privateAdd(_InitsClass, _map, []);
__publicField(_InitsClass, "isInit", 0);
__privateAdd(_InitsClass, _tamp, []);
var InitsClass = _InitsClass;

// src/Class/I18n/I18nColdContext.shared.ts
var I18nColdContext = class {
  get(key, args) {
    return I18nShared._get(String(key), args);
  }
  replacesInText(text, ListeTag) {
    return I18nShared._replacesInText(text, ListeTag);
  }
};

// src/Class/I18n/I18n.shared.ts
var I18nShared = class _I18nShared {
  static map = {};
  // Cold
  static locales = {};
  // Hot
  static local = "fr";
  static localFolderPath = "./local/";
  static console;
  static I18n;
  static EnvConfig;
  static setLocalFolderPath(path5) {
    if (path5.endsWith("/")) {
      _I18nShared.localFolderPath = path5;
    } else {
      _I18nShared.localFolderPath = path5 + "/";
    }
  }
  static _get(key, args, map) {
    const text = map ? map[key] : _I18nShared.map[key];
    if (text === void 0) return `{{missing:${key}}}`;
    if (text == "") return `{{empty:${key}}}`;
    return _I18nShared.interpolate(text, args);
  }
  static interpolate(text, args) {
    if (!args) return text;
    return text.replace(
      /{{\s*([^}]+)\s*}}/g,
      (_, key) => {
        const value = args[key];
        if (value === void 0 || value === null) {
          return `{{${key}}}`;
        }
        return String(value);
      }
    );
  }
  static _replacesInText(text, ListeTag = {}, map) {
    return text.replace(/{{\s*(\w+)\s*}}/g, (_, Tag) => {
      return this._get(Tag, ListeTag[Tag] || {}, map);
    });
  }
  static createColdContext() {
    return new I18nColdContext();
  }
};

// src/Class/I18n/I18nHotContext.shared.ts
var I18nHotContext = class {
  constructor(local = {}) {
    this.local = local;
  }
  local;
  get(key, args) {
    return I18nShared._get(String(key), args, this.local);
  }
  replacesInText(text, ListeTag) {
    return I18nShared._replacesInText(text, ListeTag, this.local);
  }
};

// src/Class/Express/RegisteRoutes.back.ts
var RegisteRoutes = class _RegisteRoutes {
  static URLs = [];
  static Router = /* @__PURE__ */ new Map();
  static Middleware = [];
  static StaticRouter = /* @__PURE__ */ new Map();
  static WsRouter = /* @__PURE__ */ new Map();
  static I18n;
  static console;
  static _init() {
    _RegisteRoutes.console = ConsoleLogger.getInstance("RegisteRoutes");
    _RegisteRoutes.I18n = I18n.createColdContext();
  }
  static {
    InitsClass.register(_RegisteRoutes._init);
  }
  static addStaticRouter(url, path5) {
    _RegisteRoutes.StaticRouter.set(url, path5);
    if (_RegisteRoutes.debug) {
      _RegisteRoutes.console.log(_RegisteRoutes.I18n.get("RegisteRoutes_debug_RegisteRoutes", { url, path: path5 }));
    }
  }
  static addRoute(url, Router) {
    _RegisteRoutes.Router.set(url, Router);
    if (_RegisteRoutes.debug) {
      _RegisteRoutes.console.log(_RegisteRoutes.I18n.get("RegisteRoutes_debug_addRoute", { url, name: Router.name }));
    }
  }
  static addMiddleware(Middleware, priorite = 0) {
    _RegisteRoutes.Middleware.push({ priorite, handler: Middleware });
    if (_RegisteRoutes.debug) {
      _RegisteRoutes.console.log(_RegisteRoutes.I18n.get("RegisteRoutes_debug_addMiddleware", { name: Middleware.name }));
    }
  }
  static addWsRoute(url, callback) {
    _RegisteRoutes.WsRouter.set(url, callback);
    if (_RegisteRoutes.debug) {
      _RegisteRoutes.console.log(_RegisteRoutes.I18n.get("RegisteRoutes_debug_addWsRoute", { url }));
    }
  }
  static addURLs(...option) {
    _RegisteRoutes.URLs.push(...option);
  }
  /////////////////////////////////////////////////////
  static getRoutes() {
    return _RegisteRoutes.Router;
  }
  static getMiddlewares() {
    return _RegisteRoutes.Middleware.sort((a, b) => b.priorite - a.priorite).map((m) => m.handler);
  }
  static getStaticRouter() {
    return _RegisteRoutes.StaticRouter;
  }
  static getWsRouter() {
    return _RegisteRoutes.WsRouter;
  }
  static getURLs() {
    return _RegisteRoutes.URLs;
  }
  static _debug = false;
  static set debug(value) {
    _RegisteRoutes._debug = value;
  }
};

// src/Class/I18n/I18n.back.ts
var import_fs = __toESM(require("fs"));
var _setLocal_dec, _load_dec, _a, _init2;
var _I18n = class _I18n extends (_a = I18nShared, _load_dec = [PerformanceProfiler.decorator()], _setLocal_dec = [PerformanceProfiler.decorator()], _a) {
  static async _init() {
    I18nShared.console = ConsoleLogger.getInstance("I18n");
    I18nShared.I18n = _I18n.createColdContext();
    I18nShared.EnvConfig = EnvConfig.createEnvConfigContext();
    RegisteRoutes.addStaticRouter("/i18n/local", "./local");
    EnvConfig.addPublicConfigTag("I18N_LOCAL_ENDPOINT");
    await _I18n.setLocal(_I18n.EnvConfig.string.OrDefault("I18N_LOCAL", "fr"));
  }
  static async load(path5) {
    if (import_fs.default.existsSync(path5)) {
      return JSON.parse(import_fs.default.readFileSync(path5, "utf8"));
    } else {
      ConsoleLogger.error("I18n : Path of file");
      return null;
    }
  }
  static async setLocal(local) {
    _I18n.local = local;
    const path5 = _I18n.localFolderPath + local + ".json";
    const data = await _I18n.load(path5);
    if (data) {
      _I18n.map = data;
    } else {
      _I18n.map = {};
    }
  }
  static async createHotContext(local) {
    if (I18nShared.locales[local]) return new I18nHotContext(I18nShared.locales[local]);
    const path5 = I18nShared.localFolderPath + local + ".hot.json";
    const data = await _I18n.load(path5);
    if (data) {
      I18nShared.locales[local] = data;
      return new I18nHotContext(data);
    }
    return new I18nHotContext();
  }
};
_init2 = __decoratorStart(_a);
__decorateElement(_init2, 9, "load", _load_dec, _I18n);
__decorateElement(_init2, 9, "setLocal", _setLocal_dec, _I18n);
__decoratorMetadata(_init2, _I18n);
__runInitializers(_init2, 3, _I18n);
InitsClass.register(_I18n._init);
var I18n = _I18n;

// src/Class/Bootstrap.back.ts
var Bootstrap = class _Bootstrap {
  static console;
  static I18n;
  static data = {};
  static async _init() {
    _Bootstrap.console = ConsoleLogger.getInstance("Bootstrap");
    _Bootstrap.I18n = I18n.createColdContext();
    RegisteRoutes.addURLs({
      url: "/bootstrap.js",
      methode: "GET",
      handler: (req, res) => {
        using pref = PerformanceProfiler.measure("Bootstrap.request");
        res.type("application/javascript");
        const strs = [];
        for (const name in _Bootstrap.data) {
          strs.push(`window.__${name.toLocaleUpperCase()}__ = ${JSON.stringify(_Bootstrap.data[name]())};`);
        }
        res.send(strs.join("\r\n"));
      }
    });
  }
  static {
    InitsClass.register(_Bootstrap._init);
  }
  static addBootstrap(name, callback) {
    if (_Bootstrap.data[name] != void 0) return;
    _Bootstrap.data[name] = callback;
  }
};

// src/Class/EnvConfig/EnvConfig.back.ts
var _load_dec2, _a2, _EnvConfig_static, _init_fn, _init3;
var _EnvConfig = class _EnvConfig extends (_a2 = EnvConfigShared, _load_dec2 = [PerformanceProfiler.decorator()], _a2) {
  static async load() {
    const result = import_dotenv.default.config({ quiet: false });
    if (result.error) {
      throw result.error;
    }
    EnvConfigShared.data = result.parsed ?? {};
  }
  static addPublicConfigTag(...tags) {
    tags.forEach((t) => {
      if (!_EnvConfig.publicConfigTag.includes(t)) {
        _EnvConfig.publicConfigTag.push(EnvConfigShared.checkTag(t));
      }
    });
  }
  static setBootstrap() {
    const envConfig2 = new EnvConfigContext();
    Bootstrap.addBootstrap("CONFIG", () => {
      const json = {};
      _EnvConfig.publicConfigTag.forEach((tag) => {
        json[tag] = envConfig2.string.OrUndefined(tag);
      });
      return json;
    });
  }
};
_init3 = __decoratorStart(_a2);
_EnvConfig_static = new WeakSet();
_init_fn = async function() {
  EnvConfigShared.I18n = I18n.createColdContext();
  EnvConfigShared.console = ConsoleLogger.getInstance("EnvConfigShared");
  _EnvConfig.load();
  _EnvConfig.setBootstrap();
};
__decorateElement(_init3, 9, "load", _load_dec2, _EnvConfig);
__privateAdd(_EnvConfig, _EnvConfig_static);
__decoratorMetadata(_init3, _EnvConfig);
__runInitializers(_init3, 3, _EnvConfig);
__publicField(_EnvConfig, "publicConfigTag", []);
InitsClass.register(__privateMethod(_EnvConfig, _EnvConfig_static, _init_fn), 100);
var EnvConfig = _EnvConfig;

// src/SetupShutdown.ts
var isShuttingDown = false;
var envConfig = EnvConfig.createEnvConfigContext();
var i18n = I18n.createColdContext();
var SetupShutdown_default = (callback) => {
  const shutdown = async (signal) => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    ConsoleLogger.warn(`Shutdown signal: ${signal}`);
    try {
      await callback();
      if (envConfig.boolean.OrDefault("SERVEUR_FORCE_STOP_SIGINT", false)) {
        ConsoleLogger.warn(i18n.get("Serveur_force_ServeurStop"));
        process.exit(0);
      }
    } catch (err) {
      ConsoleLogger.error(err);
      process.exit(1);
    }
  };
  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
};

// src/Class/CLIManager/CLIManager.back.ts
var import_minimist = __toESM(require("minimist"));

// src/Class/CLIManager/CLIConfig.shared.ts
var CLIConfig = class {
  #args;
  constructor(args) {
    this.#args = args;
  }
  positionalArgs() {
    return this.#args._;
  }
  getArgs() {
    return this.#args;
  }
  getArg(key, defaultValue) {
    return this.#args[key] ?? defaultValue;
  }
  getArgOrNull(key) {
    const value = this.#args[key];
    return value !== void 0 ? value : null;
  }
  hasArg(key) {
    return this.#args[key] !== void 0;
  }
  getArgByAlias(key, alias, defaultValue) {
    if (this.#args[key] !== void 0) return this.#args[key];
    if (this.#args[alias] !== void 0) return this.#args[alias];
    return defaultValue;
  }
  getArgByAliasOrNull(key, alias) {
    if (this.#args[key] !== void 0) return this.#args[key];
    if (this.#args[alias] !== void 0) return this.#args[alias];
    return null;
  }
};

// src/Class/CLIManager/CLIManager.back.ts
var CLIManager = class _CLIManager {
  static debug = false;
  static rawArgs = process.argv.slice(2);
  static args = (0, import_minimist.default)(process.argv.slice(2));
  static console;
  static I18n;
  static EnvConfig;
  static CLIConfig;
  static _init() {
    _CLIManager.console = ConsoleLogger.getInstance("CLIManager");
    _CLIManager.I18n = I18n.createColdContext();
    _CLIManager.EnvConfig = EnvConfig.createEnvConfigContext();
    _CLIManager.CLIConfig = _CLIManager.getContext();
  }
  static {
    InitsClass.register(_CLIManager._init);
  }
  static async init(options) {
    const manOptions = [];
    const configCallbacks = [];
    for (const option of options) {
      manOptions.push({
        name: option.name,
        alias: option.alias,
        description: option.description,
        defaultValue: option.defaultValue,
        parameters: option.parameters,
        required: option.required,
        globale: option.globale
      });
      if (option.callback) {
        configCallbacks.push({
          name: option.name,
          alias: option.alias,
          callback: option.callback,
          exitAfterRun: option.exitAfterRun,
          exitIfCallbackReturnFalse: option.exitIfCallbackReturnFalse,
          defaultValue: option.defaultValue,
          exitAfterAllRun: option.exitAfterAllRun,
          globale: option.globale
        });
      }
    }
    _CLIManager.displayMan(manOptions);
    if (!_CLIManager.requiredArgs(configCallbacks)) {
      process.exit(0);
    }
    await _CLIManager.runMultiple(configCallbacks);
  }
  /////////////////////////////////////////////////
  // API
  static getContext() {
    return new CLIConfig(_CLIManager.args);
  }
  /////////////////////////////////////////////////
  static requiredArgs(args) {
    let isGood = true;
    for (const arg of args) {
      if (!arg.required) {
        continue;
      }
      const value = _CLIManager.CLIConfig.getArgByAliasOrNull(arg.name, arg.alias ?? "");
      if (value === null) {
        _CLIManager.console.error(_CLIManager.I18n.get("CLIManager_arg_required", { name: arg.name }));
        isGood = false;
      }
    }
    return isGood;
  }
  static async runMultiple(options) {
    const { Globales, Commandes } = _CLIManager.filterConfigGlobales(options);
    let exitAfterAllRun = false;
    for (const Globale of Globales) {
      if (_CLIManager.CLIConfig.hasArg(Globale.name) || Globale.alias && _CLIManager.CLIConfig.hasArg(Globale.alias)) {
        if (_CLIManager.debug) {
          _CLIManager.console.log(_CLIManager.I18n.get("CLIManager_debug_globale", { name: Globale.name }));
        }
        if (Globale.callback === void 0) continue;
        const value = _CLIManager.CLIConfig.getArgByAlias(Globale.name, Globale.alias ?? "", "");
        try {
          await Globale.callback(value);
        } catch (error) {
          _CLIManager.console.fatalError(_CLIManager.I18n.get("CLIManager_callback_globale_error", { name: Globale.name }), error);
        }
      }
    }
    for (const Commande of Commandes) {
      if (_CLIManager.CLIConfig.hasArg(Commande.name) || Commande.alias && _CLIManager.CLIConfig.hasArg(Commande.alias)) {
        if (_CLIManager.debug) {
          _CLIManager.console.log(_CLIManager.I18n.get("CLIManager_debug_commande", { name: Commande.name }));
        }
        if (Commande.callback === void 0) continue;
        const value = _CLIManager.CLIConfig.getArgByAlias(Commande.name, Commande.alias ?? "", "");
        try {
          const result = await Commande.callback(value);
          if (Commande.exitAfterAllRun) exitAfterAllRun = true;
          if (Commande.exitAfterRun) process.exit(0);
          if (Commande.exitIfCallbackReturnFalse && result === false) process.exit(0);
        } catch (error) {
          _CLIManager.console.fatalError(_CLIManager.I18n.get("CLIManager_callback_commande_error", { name: Commande.name }), error);
        }
      }
    }
    if (exitAfterAllRun) process.exit(0);
  }
  static displayMan(args) {
    if (_CLIManager.CLIConfig.getArgByAliasOrNull("help", "h") || _CLIManager.CLIConfig.getArgOrNull("man")) {
      for (const arg of args) {
        const keys = `--${arg.name}` + (arg.alias ? `, -${arg.alias}` : "");
        const description = arg.description;
        const defaultValue = arg.defaultValue !== void 0 ? ` (${_CLIManager.I18n.get("Word_default")}: ${arg.defaultValue})` : "";
        const required = arg.required ? ` (${_CLIManager.I18n.get("Word_required")})` : "";
        const globale = arg.globale ? ` (${_CLIManager.I18n.get("Word_globale")})` : "";
        console.log(`${keys} : ${description}${defaultValue}${required}${globale}`);
        if (arg.parameters) {
          console.log(`   \u21B3 ${_CLIManager.I18n.get("Word_possible_values")} :`);
          for (const param of arg.parameters) {
            console.log(`       \u2501 ${param.value} : ${param.description}`);
          }
        }
      }
      process.exit(0);
    }
  }
  static displayAllArgs() {
    const prefix = "Args : ";
    const args = _CLIManager.CLIConfig.getArgs();
    console.log(prefix);
    for (const key in args) {
      if (key === "_") continue;
      const value = args[key];
      console.log(`  ${key} : ${value}`);
    }
  }
  static filterConfigGlobales(configCallbacks) {
    const ArgsGlobales = [];
    const ArgsCommandes = [];
    for (const config of configCallbacks) {
      if (config.globale) {
        ArgsGlobales.push(config);
      } else {
        ArgsCommandes.push(config);
      }
    }
    return { Globales: ArgsGlobales, Commandes: ArgsCommandes };
  }
};

// src/Class/DOMStyleEmitter/DOMStyleEmitter.back.ts
var import_events = require("events");

// src/Class/DOMStyleEmitter/DOMStyleEmitte.shared.ts
var DOMStyleEmitterShared = class _DOMStyleEmitterShared {
  constructor(name = void 0) {
    this.name = name;
  }
  name;
  static console;
  static I18n;
  static logEvent = false;
  logger(tag, eventTag, detail) {
    switch (tag) {
      case "addListener":
        _DOMStyleEmitterShared.logEvent && _DOMStyleEmitterShared.console.log(_DOMStyleEmitterShared.I18n.get("DOMStyleEmitter_log_addListener", { name: this.name || this.constructor.name, event: eventTag }));
        break;
      case "removeListener":
        _DOMStyleEmitterShared.logEvent && _DOMStyleEmitterShared.console.log(_DOMStyleEmitterShared.I18n.get("DOMStyleEmitter_log_removeListener", { name: this.name || this.constructor.name, event: eventTag }));
        break;
      case "dispatchEvent":
        _DOMStyleEmitterShared.logEvent && _DOMStyleEmitterShared.console.log(_DOMStyleEmitterShared.I18n.get("DOMStyleEmitter_log_dispatchEvent", { name: this.name || this.constructor.name, event: eventTag }), detail);
        break;
      default:
        break;
    }
  }
};

// src/Class/DOMStyleEmitter/DOMStyleEmitter.back.ts
var DOMStyleEmitter = class _DOMStyleEmitter extends DOMStyleEmitterShared {
  static #init() {
    _DOMStyleEmitter.console = ConsoleLogger.getInstance("DOMStyleEmitter");
    _DOMStyleEmitter.I18n = I18n.createColdContext();
  }
  static {
    InitsClass.register(_DOMStyleEmitter.#init);
  }
  /**
   * Instance interne du EventEmitter Node.js.
   * Exposée en `protected` pour permettre aux sous-classes
   * (ex: EventBus) d'accéder aux listeners et d'enchaîner
   * des comportements personnalisés.
   */
  #emitter;
  constructor(name = void 0) {
    super(name);
    this.#emitter = new import_events.EventEmitter();
  }
  /**
   * Ajoute un listener sur un événement.
   * 
   * Exemple :
   * ```js
   * emitter.addEventListener("connect", (data) => {
   *     console.log(data.user);
   * });
   * ```
   * 
   * 
   * @param event Nom de l'événement.
   * @param listener Fonction appelée lors du déclenchement.
   */
  addEventListener(event, listener) {
    this.#emitter.on(event, listener);
    this.logger("addListener", event);
  }
  /**
   * Supprime un listener d'un événement.
   * 
   * Le listener doit être exactement la même référence
   * que celle utilisée dans addEventListener().
   * 
   * Exemple :
   * 
   * ```js
   * const callback = () => {};
   * 
   * emitter.addEventListener("test", callback);
   * emitter.removeEventListener("test", callback);
   * ```
   * 
   * 
   * @param event Nom de l'événement.
   * @param listener Listener à supprimer.
   */
  removeEventListener(event, listener) {
    this.#emitter.off(event, listener);
    this.logger("removeListener", event);
  }
  /**
   * Déclenche un événement.
   * 
   * Exemple :
   * ```js
   * emitter.dispatchEvent("message", {
   *     content: "Hello"
   * });
   * ```
   * 
   * 
   * @param event Nom de l'événement.
   * @param detail Données transmises aux listeners.
   */
  dispatchEvent(event, detail) {
    this.#emitter.emit(event, detail);
    this.logger("dispatchEvent", event, detail);
  }
  /**
   * Retourne le nombre de listeners enregistrés
   * pour un événement donné.
   * 
   * Principalement utile pour le debug sous Node.js.
   * 
   * Exemple :
   * 
   * const count = emitter.getAllEventListener("message");
   * 
   * @param eventName Nom de l'événement.
   * 
   * @returns Nombre de listeners enregistrés.
   */
  getAllEventListener(eventName) {
    return this.#emitter.listenerCount(eventName);
  }
};

// src/Class/MessageChat/MessageChat.shared.ts
var MessageChat = class _MessageChat {
  constructor(data) {
    this.data = data;
    if (!_MessageChat._logMessage) return;
    const consoleLogger = ConsoleLogger.getInstance("MessageChat");
    consoleLogger.tag(data.platform);
    consoleLogger.log(`MessageChat_${data.type}`, data);
  }
  data;
  static _logMessage = false;
  static set logMessage(value) {
    _MessageChat._logMessage = value;
  }
  toJSON() {
    return this.data;
  }
};

// src/Function/CLI_debug.ts
function CLI_debug(value) {
  if (value === "hard") {
    CLIManager.displayAllArgs();
    EnvConfig.display();
  }
  DOMStyleEmitter.logEvent = true;
  RegisteRoutes.debug = true;
  MessageChat.logMessage = true;
}

// src/Class/EnvConfig/EnvConfigExtractor.back.ts
var import_typescript = __toESM(require("typescript"));
var import_fs2 = __toESM(require("fs"));
var EnvConfigExtractor = class _EnvConfigExtractor {
  static console;
  static I18n;
  static EnvConfig;
  static _init() {
    _EnvConfigExtractor.console = ConsoleLogger.getInstance("EnvConfigExtractor");
    _EnvConfigExtractor.I18n = I18n.createColdContext();
    _EnvConfigExtractor.EnvConfig = EnvConfig.createEnvConfigContext();
  }
  static {
    InitsClass.register(_EnvConfigExtractor._init);
  }
  static arr = {};
  static checker;
  static start() {
    const configFile = import_typescript.default.readConfigFile("./tsconfig.json", import_typescript.default.sys.readFile);
    const parsed = import_typescript.default.parseJsonConfigFileContent(configFile.config, import_typescript.default.sys, "./");
    const program = import_typescript.default.createProgram({
      rootNames: parsed.fileNames,
      options: parsed.options
    });
    const sourceFiles = program.getSourceFiles();
    _EnvConfigExtractor.checker = program.getTypeChecker();
    for (const sourceFile of sourceFiles) {
      if (sourceFile.isDeclarationFile) {
        continue;
      }
      _EnvConfigExtractor.visit(sourceFile);
    }
    const str = Object.keys(_EnvConfigExtractor.arr).map((escapedName) => {
      const prefix = `
########################
# ${escapedName}
########################

`;
      return prefix + Object.keys(_EnvConfigExtractor.arr[escapedName]).map((key) => {
        return "#" + key.toLocaleUpperCase().trim().replace(" ", "_") + "=";
      }).join("\r");
    }).join("\n\r");
    import_fs2.default.writeFileSync(
      "./.example.env",
      str,
      "utf8"
    );
  }
  static visit(node) {
    if (import_typescript.default.isCallExpression(node)) {
      const type = _EnvConfigExtractor.getTemplateTypeOfFunction(node, "EnvConfig.createEnvConfigContext");
      if (type?.isUnion()) {
        const escapedName = type.aliasSymbol?.escapedName ?? "";
        if (!_EnvConfigExtractor.arr[escapedName]) {
          _EnvConfigExtractor.arr[escapedName] = {};
        }
        type.types.filter((t) => t.isStringLiteral()).map((t) => t.value).forEach((t) => _EnvConfigExtractor.arr[escapedName][t] = true);
      }
    }
    import_typescript.default.forEachChild(node, _EnvConfigExtractor.visit);
  }
  static getTemplateTypeOfFunction(node, PropertyAccessExpressionText) {
    const expr = node.expression;
    if (!import_typescript.default.isPropertyAccessExpression(expr)) return null;
    if (expr.getText() !== PropertyAccessExpressionText) return null;
    const typeNode = node.typeArguments?.[0];
    if (!typeNode) return null;
    return _EnvConfigExtractor.checker.getTypeFromTypeNode(typeNode);
  }
};

// src/Function/CLI_env.ts
function CLI_env(value) {
  const OUTPUT_FILE = "./.env.example";
  EnvConfigExtractor.start();
}

// src/Class/I18n/I18nExtractor.shared.ts
var import_typescript2 = __toESM(require("typescript"));
var import_fs3 = __toESM(require("fs"));
var I18nExtractor = class _I18nExtractor {
  static console;
  static I18n;
  static EnvConfig;
  static _init() {
    _I18nExtractor.console = ConsoleLogger.getInstance("I18nExtractor");
    _I18nExtractor.I18n = I18n.createColdContext();
    _I18nExtractor.EnvConfig = EnvConfig.createEnvConfigContext();
  }
  static {
    InitsClass.register(_I18nExtractor._init);
  }
  static CollMap = {};
  static HotMap = {};
  static checker;
  static start(OUTPUT_DIR, LOCAL_NAME = "en") {
    const configFile = import_typescript2.default.readConfigFile("./tsconfig.json", import_typescript2.default.sys.readFile);
    const parsed = import_typescript2.default.parseJsonConfigFileContent(configFile.config, import_typescript2.default.sys, "./");
    const program = import_typescript2.default.createProgram({
      rootNames: parsed.fileNames,
      options: parsed.options
    });
    const sourceFiles = program.getSourceFiles();
    _I18nExtractor.checker = program.getTypeChecker();
    for (const sourceFile of sourceFiles) {
      if (sourceFile.isDeclarationFile) {
        continue;
      }
      this.visit(sourceFile);
    }
    console.log(_I18nExtractor.CollMap);
    console.log(_I18nExtractor.HotMap);
    let finalData = {};
    const OUTPUT_FILE = OUTPUT_DIR.endsWith("/") ? OUTPUT_DIR + LOCAL_NAME + ".json" : OUTPUT_DIR + "/" + LOCAL_NAME + ".json";
    if (import_fs3.default.existsSync(OUTPUT_FILE)) {
      _I18nExtractor.console.log(_I18nExtractor.I18n.get("I18nExtractor_file_exists", { file: OUTPUT_FILE }));
      const old = JSON.parse(
        import_fs3.default.readFileSync(OUTPUT_FILE, "utf8")
      );
      const tagsDead = _I18nExtractor.checkIfTagIsDead(old, _I18nExtractor.CollMap);
      _I18nExtractor.console.log(_I18nExtractor.I18n.get("I18nExtractor_dead_tags", { count: tagsDead.length }));
      finalData = {
        ..._I18nExtractor.CollMap,
        ..._I18nExtractor.removeDeadTagFromFile(tagsDead, old)
      };
      _I18nExtractor.console.log(_I18nExtractor.I18n.get("I18nExtractor_file_update", { file: OUTPUT_FILE }));
      import_fs3.default.writeFileSync(
        OUTPUT_FILE,
        JSON.stringify(finalData, null, 4),
        "utf8"
      );
    } else {
      _I18nExtractor.console.log(_I18nExtractor.I18n.get("I18nExtractor_file_created", { file: OUTPUT_FILE }));
      finalData = _I18nExtractor.CollMap;
      import_fs3.default.writeFileSync(
        OUTPUT_FILE,
        JSON.stringify(finalData, null, 4),
        "utf8"
      );
    }
    const OUTPUT_FILE_HOT = OUTPUT_DIR.endsWith("/") ? OUTPUT_DIR + LOCAL_NAME + ".hot.json" : OUTPUT_DIR + "/" + LOCAL_NAME + ".hot.json";
    let finalDataHot = {};
    if (import_fs3.default.existsSync(OUTPUT_FILE_HOT)) {
      _I18nExtractor.console.log(_I18nExtractor.I18n.get("I18nExtractor_file_exists", { file: OUTPUT_FILE_HOT }));
      const old = JSON.parse(
        import_fs3.default.readFileSync(OUTPUT_FILE_HOT, "utf8")
      );
      const tagsDead = _I18nExtractor.checkIfTagIsDead(old, _I18nExtractor.HotMap);
      _I18nExtractor.console.log(_I18nExtractor.I18n.get("I18nExtractor_dead_tags", { count: tagsDead.length }));
      finalDataHot = {
        ..._I18nExtractor.HotMap,
        ..._I18nExtractor.removeDeadTagFromFile(tagsDead, old)
      };
      import_fs3.default.writeFileSync(
        OUTPUT_FILE_HOT,
        JSON.stringify(finalDataHot, null, 4),
        "utf8"
      );
    } else {
      _I18nExtractor.console.log(_I18nExtractor.I18n.get("I18nExtractor_file_created", { file: OUTPUT_FILE_HOT }));
      finalDataHot = _I18nExtractor.HotMap;
      import_fs3.default.writeFileSync(
        OUTPUT_FILE_HOT,
        JSON.stringify(finalDataHot, null, 4),
        "utf8"
      );
    }
  }
  static visit(node) {
    if (import_typescript2.default.isCallExpression(node)) {
      const typeHot = _I18nExtractor.getTypeOfI18nContext(node, "I18n.createHotContext");
      const typeCold = _I18nExtractor.getTypeOfI18nContext(node, "I18n.createColdContext");
      if (typeHot) _I18nExtractor.getTagEndArg("Hot", typeHot);
      if (typeCold) _I18nExtractor.getTagEndArg("Cold", typeCold);
    }
    import_typescript2.default.forEachChild(node, _I18nExtractor.visit);
  }
  static getTypeOfI18nContext(node, PropertyAccessExpressionText) {
    const expr = node.expression;
    if (!import_typescript2.default.isPropertyAccessExpression(expr)) return null;
    if (expr.getText() !== PropertyAccessExpressionText) return null;
    const typeNode = node.typeArguments?.[0];
    if (!typeNode) return null;
    return _I18nExtractor.checker.getTypeFromTypeNode(typeNode);
  }
  static getTagEndArg(type, TStype) {
    for (const tag of TStype.getProperties()) {
      if (!tag.valueDeclaration) continue;
      const tagType = _I18nExtractor.checker.getTypeOfSymbolAtLocation(tag, tag.valueDeclaration);
      const args = [];
      for (const arg of tagType.getProperties()) {
        args.push(`{{${arg.getName()}}}`);
      }
      const map = type == "Cold" ? _I18nExtractor.CollMap : _I18nExtractor.HotMap;
      map[tag.getName()] = args.join(" ");
    }
  }
  static checkIfTagIsDead(oldMap, newMap) {
    const deadTags = [];
    for (const tag in oldMap) {
      if (!newMap[tag]) {
        deadTags.push(tag);
      }
    }
    return deadTags;
  }
  static removeDeadTagFromFile(deadTags, map) {
    for (const tag of deadTags) {
      delete map[tag];
    }
    return map;
  }
};

// src/Function/CLI_i18n.ts
function CLI_i18n(value) {
  const name = typeof value === "string" ? value : "en";
  const OUTPUT_FILE = "./local/";
  I18nExtractor.start(OUTPUT_FILE, name);
}

// src/Function/CLI_token.ts
var import_path2 = __toESM(require("path"));
var import_fs5 = __toESM(require("fs"));

// src/Class/Twitch/ClientTwitch.ts
var import_ws = __toESM(require("ws"));

// src/Class/OAuth2Manager/OAuth2Manager.back.ts
var import_fs4 = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_uuid = require("uuid");
var import_express = __toESM(require("express"));
var import_open = __toESM(require("open"));
var _run_dec, _a3, _I18n2, _OAuth2Manager_static, _init_fn2, _init4;
var _OAuth2Manager = class _OAuth2Manager extends (_a3 = DOMStyleEmitter, _run_dec = [PerformanceProfiler.decorator()], _a3) {
  constructor(Option) {
    super();
    __runInitializers(_init4, 5, this);
    __publicField(this, "credentials");
    __publicField(this, "tokenPath");
    __publicField(this, "token");
    __publicField(this, "option");
    __publicField(this, "state");
    __publicField(this, "status", false);
    __publicField(this, "autoRefreshID");
    __publicField(this, "console");
    this.credentials = JSON.parse(import_fs4.default.readFileSync(Option.credentialsPath, "utf-8"));
    this.tokenPath = Option.tokenPath ?? import_path.default.resolve(__dirname, "token.json");
    this.option = Option;
    this.console = ConsoleLogger.getInstance(Option.logInstanceName);
  }
  run() {
    this.loadToken();
    if (this.token) {
      if (this.isRefreshTokenExpired()) {
        return this.Auth();
      }
      if (this.isTokenExpired()) {
        this.refreshAccessToken();
      } else {
        const dif = Date.now() - this.token.created_at;
        const delay = Math.max(this.token.expires_in * 1e3 - 6e4 - dif, 5e3);
        this.autoRefreshID = setTimeout(() => this.refreshAccessToken(), delay);
        this.dispatchEvent("Authorized", {});
        this.status = true;
      }
    } else {
      this.Auth();
    }
  }
  loadToken() {
    if (import_fs4.default.existsSync(this.tokenPath)) {
      this.token = JSON.parse(import_fs4.default.readFileSync(this.tokenPath, "utf-8"));
    }
  }
  saveToken(token) {
    import_fs4.default.writeFileSync(this.tokenPath, JSON.stringify(token, null, 2));
    this.token = token;
  }
  getAuthUrl() {
    const { auth_uri, client_id, redirect_uris, scopes, extra_params } = this.credentials;
    this.state = (0, import_uuid.v4)();
    const params = new URLSearchParams({
      response_type: "code",
      client_id,
      redirect_uri: redirect_uris[0],
      scope: scopes.join(" "),
      state: this.state
    });
    if (extra_params) {
      for (const [key, value] of Object.entries(extra_params)) {
        params.append(key, value);
      }
    }
    return `${auth_uri}?${params.toString()}`;
  }
  async exchangeCodeForToken(code) {
    const { client_id, client_secret, redirect_uris, token_uri } = this.credentials;
    const response = await fetch(token_uri, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id,
        client_secret,
        redirect_uri: redirect_uris[0],
        grant_type: "authorization_code"
      }).toString()
    });
    if (!response.ok) {
      const text = await response.text();
      this.console.fatalError(new Error(__privateGet(_OAuth2Manager, _I18n2).get("OAuth2Manager_exchange_code_to_token_failed")), response.status, text);
    }
    const token = {
      ...await response.json(),
      created_at: Date.now()
    };
    this.saveToken(token);
    if (this.autoRefreshID) clearTimeout(this.autoRefreshID);
    this.autoRefreshID = setTimeout(() => {
      this.refreshAccessToken();
    }, this.token.expires_in * 1e3 - 6e4);
    return token;
  }
  isTokenExpired() {
    if (!this.token) return true;
    const expiresAt = this.token.created_at + this.token.expires_in * 1e3;
    return Date.now() > expiresAt - 6e4;
  }
  isRefreshTokenExpired() {
    if (!this.token) return true;
    if (!this.token.refresh_token_expires_in) return false;
    const expiresAt = this.token.created_at + this.token.refresh_token_expires_in * 1e3;
    return Date.now() > expiresAt - 6e4;
  }
  async getAccessToken() {
    if (!this.token) this.console.fatalError(new Error(__privateGet(_OAuth2Manager, _I18n2).get("OAuth2Manager_token_unfound")));
    if (this.isTokenExpired()) {
      if (this.token.refresh_token) {
        await this.refreshAccessToken();
      } else {
        this.console.fatalError(new Error(__privateGet(_OAuth2Manager, _I18n2).get("OAuth2Manager_token_expired_and_refresh_token_available")));
      }
    }
    return this.token.access_token;
  }
  async refreshAccessToken() {
    const { client_id, client_secret, token_uri } = this.credentials;
    if (!this.token?.refresh_token) this.console.fatalError(new Error(__privateGet(_OAuth2Manager, _I18n2).get("OAuth2Manager_refresh_token_available")));
    const response = await fetch(token_uri, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id,
        client_secret,
        refresh_token: this.token.refresh_token,
        grant_type: "refresh_token"
      }).toString()
    });
    if (!response.ok) {
      this.console.fatalError(new Error(__privateGet(_OAuth2Manager, _I18n2).get("OAuth2Manager_refresh_token_failed")));
    }
    const data = await response.json();
    const newToken = {
      ...this.token,
      ...data,
      refresh_token: data.refresh_token ?? this.token.refresh_token,
      // Recuper l'ancien refresh_token si il y a pas dans le nouveaux token
      created_at: Date.now()
    };
    this.saveToken(newToken);
    this.dispatchEvent("Authorized", {});
    this.status = true;
    if (this.autoRefreshID) clearTimeout(this.autoRefreshID);
    if (newToken.expires_in) {
      this.autoRefreshID = setTimeout(() => {
        this.refreshAccessToken();
      }, newToken.expires_in * 1e3 - 6e4);
    }
  }
  Auth() {
    const app = (0, import_express.default)();
    let server = null;
    const timeout = setTimeout(() => {
      this.dispatchEvent("Error", {});
      this.status = false;
      if (server) server.close();
    }, 5 * 60 * 1e3);
    app.get(this.option.url, async (req, res) => {
      const code = req.query.code;
      if (req.query.state !== this.state) {
        res.status(400).send(__privateGet(_OAuth2Manager, _I18n2).get("OAuth2Manager_serveur_error_state"));
        this.dispatchEvent("Error", {});
        this.status = false;
        return;
      }
      try {
        await this.exchangeCodeForToken(code);
        this.dispatchEvent("Authorized", {});
        this.status = true;
        res.send(__privateGet(_OAuth2Manager, _I18n2).get("OAuth2Manager_serveur_successful_Authorized"));
      } catch (error) {
        this.console.error(error);
        res.status(500).send(__privateGet(_OAuth2Manager, _I18n2).get("OAuth2Manager_serveur_error_Authorized"));
        this.dispatchEvent("Error", {});
        this.status = false;
      } finally {
        res.on("finish", () => {
          if (server) {
            server.close(() => {
              this.console.log(__privateGet(_OAuth2Manager, _I18n2).get("OAuth2Manager_log_close_serveur"));
            });
          }
          clearTimeout(timeout);
        });
      }
    });
    server = app.listen(this.option.port, () => {
      this.console.log(__privateGet(_OAuth2Manager, _I18n2).get("OAuth2Manager_open_serveur", { port: this.option.port, url: this.option.url }));
    });
    const openOptions = this.option.openOptions ? { app: { name: this.option.openOptions } } : void 0;
    (0, import_open.default)(this.getAuthUrl(), openOptions);
  }
  async Request(url, options = {}) {
    const accessToken = await this.getAccessToken();
    const headers = { ...options.headers || {}, Authorization: `Bearer ${accessToken}` };
    const response = await fetch(url, { ...options, headers });
    return response;
  }
  getStatus() {
    return this.status;
  }
};
_init4 = __decoratorStart(_a3);
_I18n2 = new WeakMap();
_OAuth2Manager_static = new WeakSet();
_init_fn2 = function() {
  __privateSet(_OAuth2Manager, _I18n2, I18n.createColdContext());
};
__decorateElement(_init4, 1, "run", _run_dec, _OAuth2Manager);
__privateAdd(_OAuth2Manager, _OAuth2Manager_static);
__decoratorMetadata(_init4, _OAuth2Manager);
__privateAdd(_OAuth2Manager, _I18n2);
InitsClass.register(__privateMethod(_OAuth2Manager, _OAuth2Manager_static, _init_fn2));
__publicField(_OAuth2Manager, "EventType", {
  Error: "Error",
  Authorized: "Authorized"
});
var OAuth2Manager = _OAuth2Manager;

// src/Class/Twitch/ClientTwitch.ts
var ClientTwitch = class _ClientTwitch extends DOMStyleEmitter {
  // oAuth Twitch
  static oAuth2Manager;
  static registerList = [];
  // Websocketet / heartbeat
  static keepAliveTimeout;
  static keepAliveTimeoutMs = 0;
  static websocketSessionID;
  static ClientWebSocket;
  // ID 
  static CHAT_CHANNEL_USER_ID;
  // id compte du chats 
  static BOT_USER_ID;
  // id du bot
  static #console;
  static #I18n;
  static #EnvConfig;
  static #_init() {
    _ClientTwitch.#console = ConsoleLogger.getInstance("ClientTwitch");
    _ClientTwitch.#I18n = I18n.createColdContext();
    _ClientTwitch.#EnvConfig = EnvConfig.createEnvConfigContext();
  }
  static {
    InitsClass.register(_ClientTwitch.#_init);
  }
  static instance;
  constructor() {
    super();
    if (!_ClientTwitch.Config.TWITCH_CLIENT_ID()) _ClientTwitch.console.fatalError(_ClientTwitch.#I18n.get("ClientTwitch_CLIENT_ID_FatalError"));
    _ClientTwitch.oAuth2Manager = new OAuth2Manager({
      credentialsPath: _ClientTwitch.Config.TWITCH_CLIENT_CREDENTIALS_PATH(),
      tokenPath: _ClientTwitch.Config.TWITCH_CLIENT_TOKEN_PATH(),
      port: _ClientTwitch.Config.TWITCH_CLIENT_SERVEUR_PORT(),
      url: _ClientTwitch.Config.TWITCH_CLIENT_SERVEUR_URL(),
      logInstanceName: "OAuth2Manager_TWITCH"
    });
    _ClientTwitch.oAuth2Manager.addEventListener("Authorized", () => {
      _ClientTwitch.console.log(_ClientTwitch.#I18n.get("ClientTwitch_Authorized"));
      if (_ClientTwitch.Config.TWITCH_CLIENT_RUN()) this.startWebsocketSession();
      else {
        _ClientTwitch.console.warn(_ClientTwitch.#I18n.get("ClientTwitch_NotRun"));
      }
    });
    _ClientTwitch.oAuth2Manager.addEventListener("Error", () => {
      _ClientTwitch.console.error(_ClientTwitch.#I18n.get("ClientTwitch_NotAuthorized"));
    });
    _ClientTwitch.oAuth2Manager.run();
  }
  async startWebsocketSession() {
    if (_ClientTwitch.ClientWebSocket?.readyState === import_ws.default.OPEN) return;
    const id = (await this.getUserInfo()).id;
    _ClientTwitch.CHAT_CHANNEL_USER_ID = id;
    _ClientTwitch.BOT_USER_ID = id;
    this.connectWebsocket();
  }
  connectWebsocket(url = "wss://eventsub.wss.twitch.tv/ws") {
    _ClientTwitch.ClientWebSocket = new import_ws.default(url);
    _ClientTwitch.ClientWebSocket.on("open", () => {
      _ClientTwitch.console.log(_ClientTwitch.#I18n.get("ClientTwitch_WebSocket_Open"));
    });
    _ClientTwitch.ClientWebSocket.on("message", (data) => {
      this.handleWebsocketMessage(data);
    });
    _ClientTwitch.ClientWebSocket.on("close", () => {
      _ClientTwitch.console.log(_ClientTwitch.#I18n.get("ClientTwitch_WebSocket_Close"));
    });
    _ClientTwitch.ClientWebSocket.on("error", (error) => {
      _ClientTwitch.console.error(_ClientTwitch.#I18n.get("ClientTwitch_WebSocket_Error"), error);
    });
  }
  disconnectWebsocket() {
    if (_ClientTwitch.ClientWebSocket) {
      _ClientTwitch.ClientWebSocket.removeAllListeners();
      _ClientTwitch.ClientWebSocket.terminate();
    }
  }
  async register(type, version, condition) {
    if (!_ClientTwitch.oAuth2Manager.getStatus()) {
      _ClientTwitch.console.log(_ClientTwitch.#I18n.get("ClientTwitch_NotAuthorized"));
      return false;
    }
    if (_ClientTwitch.registerList.includes(`${type}:${version}`)) return true;
    _ClientTwitch.registerList.push(`${type}:${version}`);
    const Reponse = await _ClientTwitch.oAuth2Manager.Request("https://api.twitch.tv/helix/eventsub/subscriptions", {
      method: "POST",
      headers: {
        "Client-Id": _ClientTwitch.Config.TWITCH_CLIENT_ID(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type,
        version,
        condition: condition ?? {
          broadcaster_user_id: _ClientTwitch.CHAT_CHANNEL_USER_ID,
          user_id: _ClientTwitch.BOT_USER_ID
        },
        transport: {
          method: "websocket",
          session_id: _ClientTwitch.websocketSessionID
        }
      })
    });
    const isOk = Reponse.status != 202 ? false : true;
    if (!isOk) {
      let data = await Reponse.json();
      _ClientTwitch.console.error(_ClientTwitch.#I18n.get("ClientTwitch_Subscribe_Error") + " " + Reponse.status);
      _ClientTwitch.console.error(data);
      _ClientTwitch.registerList.splice(_ClientTwitch.registerList.indexOf(type), 1);
    }
    return isOk;
  }
  async getUserInfo() {
    const Reponse = await _ClientTwitch.oAuth2Manager.Request("https://api.twitch.tv/helix/users", {
      headers: { "Client-Id": _ClientTwitch.Config.TWITCH_CLIENT_ID() }
    });
    const data = await Reponse.json();
    return data.data[0];
  }
  handleWebsocketMessage(data) {
    try {
      const message = JSON.parse(data.toString());
      switch (message.metadata.message_type) {
        case "session_welcome":
          _ClientTwitch.websocketSessionID = message.payload.session?.id ?? "";
          _ClientTwitch.keepAliveTimeoutMs = (message.payload.session?.keepalive_timeout_seconds ?? 10) * 1e3 * 2;
          _ClientTwitch.console.log(_ClientTwitch.#I18n.get("ClientTwitch_WebSocket_Session_Welcome"));
          _ClientTwitch.keepAliveTimeout = setTimeout(() => {
            this.disconnectWebsocket();
            this.connectWebsocket();
          }, _ClientTwitch.keepAliveTimeoutMs);
          this.dispatchEvent("register", {});
          break;
        case "session_keepalive":
          if (_ClientTwitch.keepAliveTimeout) clearTimeout(_ClientTwitch.keepAliveTimeout);
          _ClientTwitch.keepAliveTimeout = setTimeout(() => {
            this.disconnectWebsocket();
            this.connectWebsocket();
          }, _ClientTwitch.keepAliveTimeoutMs);
          break;
        case "session_reconnect":
          this.disconnectWebsocket();
          this.connectWebsocket(message.payload.session?.reconnect_url);
          break;
        default:
          if (!message.payload.subscription) return _ClientTwitch.console.warn(_ClientTwitch.#I18n.get("ClientTwitch_WebSocket_Message_No_Subscription"), message);
          this.dispatchEvent(message.payload.subscription.type, { message });
          break;
      }
    } catch (error) {
      _ClientTwitch.console.error(_ClientTwitch.#I18n.get("ClientTwitch_WebSocket_Message_Parse_Error"), error);
    }
  }
  async SendMessageInChat(Message) {
    const Reponse = await _ClientTwitch.oAuth2Manager.Request("https://api.twitch.tv/helix/chat/messages", {
      method: "POST",
      headers: {
        "Client-Id": _ClientTwitch.Config.TWITCH_CLIENT_ID(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        broadcaster_id: _ClientTwitch.CHAT_CHANNEL_USER_ID,
        sender_id: _ClientTwitch.BOT_USER_ID,
        message: Message
      })
    });
    return Reponse.status != 202 ? false : true;
  }
  async StartSondage(opt) {
    await _ClientTwitch.oAuth2Manager.Request("https://api.twitch.tv/helix/polls", {
      method: "POST",
      headers: {
        "Client-Id": _ClientTwitch.Config.TWITCH_CLIENT_ID(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(opt)
    });
  }
  async getInfoStream(user_ids) {
    const reponse = await _ClientTwitch.oAuth2Manager.Request("https://api.twitch.tv/helix/polls", {
      method: "GET",
      headers: {
        "Client-Id": _ClientTwitch.Config.TWITCH_CLIENT_ID(),
        "Content-Type": "application/json"
      }
    });
    if (!reponse.ok) return null;
    return await reponse.json();
  }
  static getInstance() {
    if (!_ClientTwitch.instance) _ClientTwitch.instance = new _ClientTwitch();
    return _ClientTwitch.instance;
  }
  static async disconnect() {
    _ClientTwitch.websocketSessionID = "";
    if (_ClientTwitch.ClientWebSocket) {
      _ClientTwitch.ClientWebSocket.close();
      _ClientTwitch.console.log(_ClientTwitch.#I18n.get("ClientTwitch_WebSocket_Disconnect"));
    }
  }
  static Config = {
    TWITCH_CLIENT_RUN: () => _ClientTwitch.#EnvConfig.boolean.OrDefault("TWITCH_CLIENT_RUN", true),
    TWITCH_CLIENT_ID: () => {
      return _ClientTwitch.#EnvConfig.string.require("TWITCH_CLIENT_ID");
    },
    TWITCH_CLIENT_CREDENTIALS_PATH: () => {
      return _ClientTwitch.#EnvConfig.string.OrDefault("TWITCH_CLIENT_CREDENTIALS_PATH", "./OAuth/Credentials/twitch.json");
    },
    TWITCH_CLIENT_TOKEN_PATH: () => {
      return _ClientTwitch.#EnvConfig.string.OrDefault("TWITCH_CLIENT_TOKEN_PATH", "./OAuth/Tokens/twitch.json");
    },
    TWITCH_CLIENT_SERVEUR_PORT: () => {
      return _ClientTwitch.#EnvConfig.int.OrDefault("TWITCH_CLIENT_SERVEUR_PORT", 5001);
    },
    TWITCH_CLIENT_SERVEUR_URL: () => {
      return _ClientTwitch.#EnvConfig.string.OrDefault("TWITCH_CLIENT_SERVEUR_URL", "/callback");
    }
  };
};

// src/Class/ClientYoutube/ChatObservator.back.ts
var import_grpc_js = __toESM(require("@grpc/grpc-js"));
var import_proto_loader = __toESM(require("@grpc/proto-loader"));
var ChatObservator = class _ChatObservator extends DOMStyleEmitter {
  constructor(IdChatLive) {
    super();
    this.IdChatLive = IdChatLive;
    this.console = ConsoleLogger.getInstance(`ChatObservator_${IdChatLive}`);
    this.start();
  }
  IdChatLive;
  static debug = false;
  pageToken;
  metadata;
  grpcClient;
  static ENDPOINT = "dns:///youtube.googleapis.com:443";
  Running = false;
  call;
  setTimeout;
  console;
  static #I18n;
  static _init() {
    _ChatObservator.#I18n = I18n.createColdContext();
  }
  static {
    InitsClass.register(_ChatObservator._init);
  }
  async start() {
    await this.Metadata();
    this.gRPCClient();
    this.listenLiveChat();
    this.Running = true;
  }
  async Metadata() {
    const md = new import_grpc_js.default.Metadata();
    md.set("authorization", `Bearer ${await ClientYoutube.getAccessToken()}`);
    this.metadata = md;
    return this;
  }
  gRPCClient() {
    const packageDef = import_proto_loader.default.loadSync(ClientYoutube.Config.YOUTUBE_CLIENT_PROTO_PATH(), {
      keepCase: false,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });
    const grpcObj = import_grpc_js.default.loadPackageDefinition(packageDef);
    const Service = grpcObj.youtube.api.v3.V3DataLiveChatMessageService;
    this.grpcClient = new Service(_ChatObservator.ENDPOINT, import_grpc_js.default.credentials.createSsl());
    return this;
  }
  listenLiveChat() {
    const request = {
      liveChatId: this.IdChatLive,
      // requis
      part: ["id", "snippet", "authorDetails"],
      // requis
      hl: "fr",
      // optionnel (langue des messages système)
      pageToken: this.pageToken || void 0
      // pour reprendre au bon endroit après coupure
      // max_results est ignoré côté streaming selon le proto (non utilisé)
    };
    const call = this.grpcClient.streamList(request, this.metadata);
    call.on("data", (resp) => this.callbackOnData(call, resp));
    call.on("error", (error) => this.callbackOnError(call, error));
    call.on("end", () => this.callbackOnEnd(call));
    this.call = call;
  }
  callbackOnData(call, resp) {
    if (resp.nextPageToken) this.pageToken = resp.nextPageToken;
    if (resp.offlineAt) {
      this.console.log(_ChatObservator.#I18n.get("ChatObservator_LiveEnd", { time: resp.offlineAt }));
      this.pageToken = void 0;
      this.Running = false;
      this.dispatchEvent("LiveEnd", {});
      call.cancel();
      return;
    }
    for (const item of resp.items || []) {
      if (!this.filterLastMinute(item)) {
        continue;
      }
      if (_ChatObservator.debug) {
        this.console.log(_ChatObservator.#I18n.get("ChatObservator_debug_message", {
          author: item.authorDetails?.displayName ?? "",
          type: item.snippet?.type ?? ""
        }));
      }
      this.dispatchEvent("message", { message: item });
      this.dispatchEvent(item.snippet?.type, { message: item });
    }
  }
  callbackOnError(call, err) {
    this.console.error(_ChatObservator.#I18n.get("ChatObservator_callbackOnError", { code: err.code, message: err.message }));
  }
  callbackOnEnd(call) {
    if (this.Running) {
      clearTimeout(this.setTimeout);
      this.setTimeout = setTimeout(() => {
        this.listenLiveChat();
      }, ClientYoutube.Config.YOUTUBE_CLIENT_CHAT_RECONNECT_TIME());
    }
  }
  filterLastMinute(item) {
    const now = /* @__PURE__ */ new Date();
    const oneMinuteAgo = new Date(now.getTime() - 60 * 1e3);
    const fewSecondsAhead = new Date(now.getTime() + 10 * 1e3);
    if (typeof item.snippet?.publishedAt != "string") return false;
    const date = new Date(item.snippet.publishedAt);
    return date >= oneMinuteAgo && date <= fewSecondsAhead;
  }
  stop() {
    this.Running = false;
    if (this.call) {
      this.call.cancel();
    }
  }
};

// src/Class/ClientYoutube/ClientYoutube.back.ts
var ClientYoutube = class _ClientYoutube {
  static oAuth2Manager;
  static intervaleID = null;
  static ListChatObservator = {};
  static console;
  static I18n;
  static EnvConfig;
  static emitter = new DOMStyleEmitter();
  static _init() {
    _ClientYoutube.console = ConsoleLogger.getInstance("ClientYoutube");
    _ClientYoutube.I18n = I18n.createColdContext();
    _ClientYoutube.EnvConfig = EnvConfig.createEnvConfigContext();
  }
  static {
    InitsClass.register(_ClientYoutube._init);
  }
  static init() {
    _ClientYoutube.oAuth2Manager = new OAuth2Manager({
      credentialsPath: _ClientYoutube.Config.YOUTUBE_CLIENT_CREDENTIALS_PATH(),
      tokenPath: _ClientYoutube.Config.YOUTUBE_CLIENT_TOKEN_PATH(),
      port: _ClientYoutube.Config.YOUTUBE_CLIENT_SERVEUR_PORT(),
      url: _ClientYoutube.Config.YOUTUBE_CLIENT_SERVEUR_URL(),
      logInstanceName: "OAuth2Manager_YOUTUBE"
    });
    _ClientYoutube.oAuth2Manager.addEventListener("Authorized", () => {
      _ClientYoutube.console.log(_ClientYoutube.I18n.get("ClientYoutube_Authorized"));
      if (_ClientYoutube.Config.YOUTUBE_CLIENT_RUN()) _ClientYoutube.start();
      else {
        _ClientYoutube.console.warn(_ClientYoutube.I18n.get("ClientYoutube_NotRun"));
      }
    });
    _ClientYoutube.oAuth2Manager.addEventListener("Error", () => {
      _ClientYoutube.console.error(_ClientYoutube.I18n.get("ClientYoutube_NotAuthorized"));
    });
    _ClientYoutube.oAuth2Manager.run();
  }
  static start() {
    const func = async () => {
      const ids = await _ClientYoutube.getIdLives();
      ids.forEach((id) => {
        if (!_ClientYoutube.ListChatObservator[id]) {
          _ClientYoutube.console.log(_ClientYoutube.I18n.get("ClientYoutube_new_live", { id }));
          const Observator = new ChatObservator(id);
          Observator.addEventListener("LiveEnd", () => {
            delete _ClientYoutube.ListChatObservator[id];
          });
          _ClientYoutube.ListChatObservator[id] = Observator;
          _ClientYoutube.emitter.dispatchEvent("Observator", { Observator });
        }
      });
    };
    func();
    _ClientYoutube.intervaleID = setInterval(func, _ClientYoutube.Config.YOUTUBE_CLIENT_CHECK_LIVE_TIME());
  }
  static async getIdLives() {
    const params = new URLSearchParams({
      part: ["snippet"].join(","),
      broadcastStatus: "active"
    });
    const Reponse = await _ClientYoutube.oAuth2Manager.Request("https://www.googleapis.com/youtube/v3/liveBroadcasts?" + params.toString());
    if (!Reponse.ok) {
      _ClientYoutube.console.error(_ClientYoutube.I18n.get("ClientYoutube_getIdLives_error"));
      return [];
    }
    const data = await Reponse.json();
    return data.items.map((item) => item.snippet.liveChatId);
  }
  static async getAccessToken() {
    return await _ClientYoutube.oAuth2Manager.getAccessToken();
  }
  static stop() {
    if (_ClientYoutube.intervaleID) {
      clearInterval(_ClientYoutube.intervaleID);
      _ClientYoutube.intervaleID = null;
    }
    for (const id in _ClientYoutube.ListChatObservator) {
      _ClientYoutube.ListChatObservator[id].stop();
    }
  }
  static Config = {
    YOUTUBE_CLIENT_RUN: () => _ClientYoutube.EnvConfig.boolean.OrDefault("YOUTUBE_CLIENT_RUN", true),
    YOUTUBE_CLIENT_CREDENTIALS_PATH: () => _ClientYoutube.EnvConfig.string.OrDefault("YOUTUBE_CLIENT_CREDENTIALS_PATH", "./OAuth/Credentials/google.json"),
    YOUTUBE_CLIENT_TOKEN_PATH: () => _ClientYoutube.EnvConfig.string.OrDefault("YOUTUBE_CLIENT_TOKEN_PATH", "./OAuth/Tokens/google_token.json"),
    YOUTUBE_CLIENT_SERVEUR_PORT: () => _ClientYoutube.EnvConfig.int.OrDefault("YOUTUBE_CLIENT_SERVEUR_PORT", 5e3),
    YOUTUBE_CLIENT_SERVEUR_URL: () => _ClientYoutube.EnvConfig.string.OrDefault("YOUTUBE_CLIENT_SERVEUR_URL", "/callback"),
    YOUTUBE_CLIENT_PROTO_PATH: () => _ClientYoutube.EnvConfig.string.OrDefault("YOUTUBE_CLIENT_PROTO_PATH", "./stream_list.proto"),
    YOUTUBE_CLIENT_CHECK_LIVE_TIME: () => _ClientYoutube.EnvConfig.int.OrDefault("YOUTUBE_CLIENT_CHECK_LIVE_TIME", 1e4),
    YOUTUBE_CLIENT_CHAT_RECONNECT_TIME: () => _ClientYoutube.EnvConfig.int.OrDefault("YOUTUBE_CLIENT_CHAT_RECONNECT_TIME ", 3e3)
  };
  static addEventListener(event, listener) {
    _ClientYoutube.emitter.addEventListener(event, listener);
  }
  static removeEventListener(event, listener) {
    _ClientYoutube.emitter.removeEventListener(event, listener);
  }
  static dispatchEvent(event, detail) {
    _ClientYoutube.emitter.dispatchEvent(event, detail);
  }
};

// src/Function/CLI_token.ts
async function CLI_token() {
  const console2 = ConsoleLogger.getInstance("CLI_Token");
  const i18n3 = I18n.createColdContext();
  const tokensDir = import_path2.default.resolve(__dirname, "../OAuth/Tokens");
  if (!import_fs5.default.existsSync(tokensDir)) import_fs5.default.mkdirSync(tokensDir, { recursive: true });
  let completed = 0;
  const providers = [
    {
      name: "Google",
      credentials: ClientYoutube.Config.YOUTUBE_CLIENT_CREDENTIALS_PATH(),
      token: ClientYoutube.Config.YOUTUBE_CLIENT_TOKEN_PATH(),
      port: ClientYoutube.Config.YOUTUBE_CLIENT_SERVEUR_PORT(),
      url: ClientYoutube.Config.YOUTUBE_CLIENT_SERVEUR_URL()
    },
    {
      name: "Twitch",
      credentials: ClientTwitch.Config.TWITCH_CLIENT_CREDENTIALS_PATH(),
      token: ClientTwitch.Config.TWITCH_CLIENT_TOKEN_PATH(),
      port: ClientTwitch.Config.TWITCH_CLIENT_SERVEUR_PORT(),
      url: ClientTwitch.Config.TWITCH_CLIENT_SERVEUR_URL()
    }
  ];
  const promises = providers.map((p) => {
    return new Promise((resolve, reject) => {
      if (!import_fs5.default.existsSync(p.credentials)) {
        console2.error(i18n3.get("CLI_Token_credentials_unfound", { name: p.name, path: p.credentials }));
        reject();
      }
      const manager = new OAuth2Manager({
        port: p.port,
        url: p.url,
        credentialsPath: p.credentials,
        tokenPath: p.token,
        logInstanceName: `${p.name}OAuth`,
        openOptions: "firefox"
      });
      manager.addEventListener("Authorized", () => {
        console2.log(i18n3.get("CLI_Token_authorized"));
        completed++;
        if (completed >= providers.length) {
          console2.log(i18n3.get("CLI_Token_all_authorized"));
          resolve();
        }
      });
      manager.addEventListener("Error", () => {
        console2.error(i18n3.get("CLI_Token_Authorized_failed", { name: p.name }));
        reject();
      });
      manager.run();
    });
  });
  await Promise.all(promises);
}

// src/Class/CacheManager/CacheManager.back.ts
var import_fs7 = __toESM(require("fs"));

// src/Class/FilesManager/FilesSystemeFunction.back.ts
var import_node_path = __toESM(require("node:path"));
var import_fs6 = __toESM(require("fs"));
var FilesSystemeFunction = class _FilesSystemeFunction {
  static getContext(createInstance, root, path5, premission, options) {
    const resolve = _FilesSystemeFunction.resolve(root, path5);
    if (resolve.status === "error") return resolve;
    return { status: "success", value: createInstance(resolve.value, premission, options) };
  }
  static resolve(root, relativePath = "") {
    const absolute = import_node_path.default.resolve(root, relativePath);
    const relative = import_node_path.default.relative(root, absolute);
    if (relative.startsWith("..") || import_node_path.default.isAbsolute(relative)) {
      return { status: "error", error: "resolve" };
    }
    return { status: "success", value: absolute };
  }
  static require(premission, key) {
    if (!premission[key]) {
      return { status: "error", error: "require" };
    }
    return { status: "success", value: void 0 };
  }
  static exists(root, pathFile) {
    const resolve = _FilesSystemeFunction.resolve(root, pathFile);
    if (resolve.status === "error") return resolve;
    return { status: "success", value: import_fs6.default.existsSync(resolve.value) };
  }
  static createDirectory(premission, root, pathDir) {
    const require2 = this.require(premission, "create");
    if (require2.status === "error") return require2;
    const resolve = _FilesSystemeFunction.resolve(root, pathDir);
    if (resolve.status === "error") return resolve;
    import_fs6.default.mkdirSync(resolve.value, { recursive: true });
    return { status: "success", value: void 0 };
  }
  static deleteDirectory(premission, root, pathDir) {
    const require2 = this.require(premission, "delete");
    if (require2.status === "error") return require2;
    const resolve = _FilesSystemeFunction.resolve(root, pathDir);
    if (resolve.status === "error") return resolve;
    import_fs6.default.rmSync(resolve.value, { recursive: true });
    return { status: "success", value: void 0 };
  }
  static writeFile(premission, root, pathFile, content, options) {
    const require2 = this.require(premission, "write");
    if (require2.status === "error") return require2;
    const resolve = _FilesSystemeFunction.resolve(root, pathFile);
    if (resolve.status === "error") return resolve;
    this.createDirectory(premission, root, import_node_path.default.dirname(resolve.value));
    import_fs6.default.writeFileSync(resolve.value, content, options);
    return { status: "success", value: void 0 };
  }
  static readFile(premission, root, pathFile, options) {
    const require2 = this.require(premission, "read");
    if (require2.status === "error") return require2;
    const resolve = _FilesSystemeFunction.resolve(root, pathFile);
    if (resolve.status === "error") return resolve;
    return { status: "success", value: import_fs6.default.readFileSync(resolve.value, options) };
  }
  static list(premission, root, pathDir) {
    const require2 = this.require(premission, "read");
    if (require2.status === "error") return require2;
    const resolve = _FilesSystemeFunction.resolve(root, pathDir);
    if (resolve.status === "error") return resolve;
    return { status: "success", value: import_fs6.default.readdirSync(resolve.value) };
  }
  static defaultPremission = {
    read: true,
    write: false,
    delete: false,
    create: false
  };
};

// src/Class/FilesManager/FilesSysteme.back.ts
var _isSuccess_dec, _list_dec, _readFile_dec, _writeFile_dec, _deleteDirectory_dec, _createDirectory_dec, _exists_dec, _require_dec, _resolve_dec, _getContext_dec, _root, _premission, _init5;
_getContext_dec = [PerformanceProfiler.decorator()], _resolve_dec = [PerformanceProfiler.decorator()], _require_dec = [PerformanceProfiler.decorator()], _exists_dec = [PerformanceProfiler.decorator()], _createDirectory_dec = [PerformanceProfiler.decorator()], _deleteDirectory_dec = [PerformanceProfiler.decorator()], _writeFile_dec = [PerformanceProfiler.decorator()], _readFile_dec = [PerformanceProfiler.decorator()], _list_dec = [PerformanceProfiler.decorator()], _isSuccess_dec = [PerformanceProfiler.decorator()];
var _FilesSysteme = class _FilesSysteme {
  constructor(root = process.cwd(), premission = FilesSystemeFunction.defaultPremission) {
    __runInitializers(_init5, 5, this);
    __privateAdd(this, _root);
    __privateAdd(this, _premission);
    __publicField(this, "isSuccess", _FilesSysteme.isSuccess);
    __privateSet(this, _root, root);
    __privateSet(this, _premission, premission);
  }
  getContext(root, premission, options) {
    return FilesSystemeFunction.getContext(this.createInstance.bind(this), __privateGet(this, _root), root, premission, options);
  }
  resolve(relativePath = "") {
    return FilesSystemeFunction.resolve(__privateGet(this, _root), relativePath);
  }
  require(permission) {
    return FilesSystemeFunction.require(__privateGet(this, _premission), permission);
  }
  exists(pathFile) {
    return FilesSystemeFunction.exists(__privateGet(this, _root), pathFile);
  }
  createDirectory(pathDir) {
    return FilesSystemeFunction.createDirectory(
      __privateGet(this, _premission),
      __privateGet(this, _root),
      pathDir
    );
  }
  deleteDirectory(pathDir) {
    return FilesSystemeFunction.deleteDirectory(
      __privateGet(this, _premission),
      __privateGet(this, _root),
      pathDir
    );
  }
  writeFile(pathFile, content, options) {
    return FilesSystemeFunction.writeFile(
      __privateGet(this, _premission),
      __privateGet(this, _root),
      pathFile,
      content,
      options
    );
  }
  readFile(pathFile, options) {
    return FilesSystemeFunction.readFile(
      __privateGet(this, _premission),
      __privateGet(this, _root),
      pathFile,
      options
    );
  }
  list(pathDir) {
    return FilesSystemeFunction.list(
      __privateGet(this, _premission),
      __privateGet(this, _root),
      pathDir
    );
  }
  get premission() {
    return __privateGet(this, _premission);
  }
  static isSuccess(result, callbackError) {
    if (result.status === "error") {
      callbackError?.(result.error);
      throw new Error(result.error);
    }
    return result.value;
  }
};
_init5 = __decoratorStart(null);
_root = new WeakMap();
_premission = new WeakMap();
__decorateElement(_init5, 9, "isSuccess", _isSuccess_dec, _FilesSysteme);
__decorateElement(_init5, 1, "getContext", _getContext_dec, _FilesSysteme);
__decorateElement(_init5, 1, "resolve", _resolve_dec, _FilesSysteme);
__decorateElement(_init5, 1, "require", _require_dec, _FilesSysteme);
__decorateElement(_init5, 1, "exists", _exists_dec, _FilesSysteme);
__decorateElement(_init5, 1, "createDirectory", _createDirectory_dec, _FilesSysteme);
__decorateElement(_init5, 1, "deleteDirectory", _deleteDirectory_dec, _FilesSysteme);
__decorateElement(_init5, 1, "writeFile", _writeFile_dec, _FilesSysteme);
__decorateElement(_init5, 1, "readFile", _readFile_dec, _FilesSysteme);
__decorateElement(_init5, 1, "list", _list_dec, _FilesSysteme);
__decoratorMetadata(_init5, _FilesSysteme);
__runInitializers(_init5, 3, _FilesSysteme);
var FilesSysteme = _FilesSysteme;

// src/Class/FilesManager/FilesManager.back.ts
var FilesManager = class _FilesManager extends FilesSysteme {
  createInstance(root, premission, options) {
    return new _FilesManager(root, premission);
  }
  static #S_root = process.cwd();
  static Abstract = FilesSysteme;
  constructor(root = process.cwd(), premission = FilesSystemeFunction.defaultPremission) {
    super(root, premission);
  }
  getContext(root, premission) {
    return super.getContext(root, premission);
  }
  resolve(relativePath = "") {
    return super.resolve(relativePath);
  }
  require(permission) {
    return super.require(permission);
  }
  exists(pathFile) {
    return super.exists(pathFile);
  }
  createDirectory(pathDir) {
    return super.createDirectory(pathDir);
  }
  deleteDirectory(pathDir) {
    return super.deleteDirectory(pathDir);
  }
  writeFile(pathFile, content) {
    return super.writeFile(pathFile, content);
  }
  readFile(pathFile, options) {
    return super.readFile(pathFile, options);
  }
  list(pathDir) {
    return super.list(pathDir);
  }
  // Static API 
  static getContext(root, premission) {
    const Permission = { ...FilesSystemeFunction.defaultPremission, ...premission };
    const createInstance = (root2, premission2, options) => {
      return new _FilesManager(root2, premission2);
    };
    return FilesSystemeFunction.getContext(createInstance, _FilesManager.#S_root, root, Permission);
  }
  static resolve(relativePath = "") {
    return FilesSystemeFunction.resolve(_FilesManager.#S_root, relativePath);
  }
  static exists(Pathfile) {
    return FilesSystemeFunction.exists(_FilesManager.#S_root, Pathfile);
  }
  static createDirectory(pathDir) {
    return FilesSystemeFunction.createDirectory(FilesSystemeFunction.defaultPremission, _FilesManager.#S_root, pathDir);
  }
  static deleteDirectory(pathDir) {
    return FilesSystemeFunction.deleteDirectory(FilesSystemeFunction.defaultPremission, _FilesManager.#S_root, pathDir);
  }
  static writeFile(pathFile, content, options) {
    return FilesSystemeFunction.writeFile(FilesSystemeFunction.defaultPremission, _FilesManager.#S_root, pathFile, content, options);
  }
  static readFile(pathFile, options) {
    return FilesSystemeFunction.readFile(FilesSystemeFunction.defaultPremission, _FilesManager.#S_root, pathFile, options);
  }
  static list(pathDir) {
    return FilesSystemeFunction.list(FilesSystemeFunction.defaultPremission, _FilesManager.#S_root, pathDir);
  }
};

// src/Class/CacheManager/CacheManager.back.ts
var CacheManager = class _CacheManager extends FilesManager.Abstract {
  console;
  static console;
  static I18n;
  static EnvConfig;
  static _root;
  static _init() {
    _CacheManager.console = ConsoleLogger.getInstance("CacheManager");
    _CacheManager.I18n = I18n.createColdContext();
    _CacheManager.EnvConfig = EnvConfig.createEnvConfigContext();
    _CacheManager._root = _CacheManager.EnvConfig.string.OrDefault("CacheManager_cache_path", "./cache/");
  }
  static {
    InitsClass.register(_CacheManager._init);
  }
  constructor(root, premission, consoleTag) {
    super(root, premission);
    this.console = ConsoleLogger.getInstance("CacheManager", consoleTag ? consoleTag : root);
  }
  createInstance(root, premission, options) {
    return new _CacheManager(root, premission, options?.consoleTag);
  }
  getAbsolutePath(path5 = "") {
    return super.resolve(path5);
  }
  set(pathFile, content, options) {
    const t = super.writeFile(pathFile, content, options);
    if (t.status === "error") {
      this.console.error(_CacheManager.I18n.get("cacheManager_error_set"));
      return false;
    }
    return true;
  }
  get(pathFile, options) {
    const t = super.readFile(pathFile, options);
    if (t.status === "error") {
      this.console.error(_CacheManager.I18n.get("cacheManager_error_ get"));
      return null;
    }
    return t.value;
  }
  setJson(pathFile, content) {
    return this.set(pathFile, JSON.stringify(content), { encoding: "utf-8" });
  }
  getJson(pathFile) {
    const data = this.get(pathFile, "utf-8");
    if (data === null) {
      this.console.error(_CacheManager.I18n.get("cacheManager_error_getJson"));
      return null;
    }
    try {
      return JSON.parse(data);
    } catch (error) {
      const syntaxError = error;
      this.console.error(syntaxError);
      return null;
    }
  }
  has(pathFile) {
    return super.exists(pathFile);
  }
  static getContext(root = "", premission, consoleTag) {
    const createInstance = (root2, premission2, options) => {
      return new _CacheManager(root2, premission2, options?.consoleTag);
    };
    return FilesSystemeFunction.getContext(
      createInstance,
      _CacheManager._root,
      root,
      premission ? premission : { read: true, write: true, create: true, delete: true }
    );
  }
  static clear() {
    import_fs7.default.rmSync(
      _CacheManager._root,
      {
        recursive: true
      }
    );
    import_fs7.default.mkdirSync(
      _CacheManager._root,
      {
        recursive: true
      }
    );
  }
};

// src/Function/CLI_Clear.ts
function CLI_Clear(value) {
  CacheManager.clear();
}

// src/Class/BuilderFront/BuilderFront.back.ts
var esbuild = __toESM(require("esbuild"));
var import_jsdom = require("jsdom");
var import_path3 = __toESM(require("path"));
var _buildStaticPages_dec, _renderHTML_dec, _esbuild_dec, _BuilderFront_static, _init_fn3, _init6;
_esbuild_dec = [PerformanceProfiler.decorator()], _renderHTML_dec = [PerformanceProfiler.decorator()], _buildStaticPages_dec = [PerformanceProfiler.decorator()];
var _BuilderFront = class _BuilderFront {
  static register(page) {
    if (this.pages.has(page.name)) {
      throw new Error(`Page '${page.name}' already exists`);
    }
    this.pages.set(page.name, page);
  }
  static async start() {
    await _BuilderFront.esbuild();
    await _BuilderFront.buildStaticPages();
  }
  static async esbuild() {
    const entryPoints = [];
    for (const page of _BuilderFront.pages.values()) {
      if (!page.entryPoint) {
        continue;
      }
      const name = import_path3.default.parse(page.entryPoint).name;
      entryPoints.push({
        in: page.entryPoint,
        out: `${page.namespace}/${name}`
      });
    }
    if (entryPoints.length === 0) {
      return;
    }
    await esbuild.build({
      ..._BuilderFront.config,
      entryPoints
    });
  }
  static async renderHTML(page) {
    const dom = new import_jsdom.JSDOM(`<!doctype html><html><head></head><body></body></html>`);
    const document = dom.window.document;
    if (typeof page.html === "string") {
      document.body.innerHTML = page.html;
    } else if (page.html) {
      await page.html(document);
    }
    const head = document.head;
    const css = [
      ...page.css ?? []
    ];
    for (const url of css) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      head.appendChild(link);
    }
    const js = [
      ...page.js ?? []
    ];
    for (const url of js) {
      const script = document.createElement("script");
      script.src = url;
      head.appendChild(script);
    }
    if (page.entryPoint) {
      const name = import_path3.default.parse(page.entryPoint).name;
      const script = document.createElement("script");
      script.type = "module";
      script.src = `/bundles/${page.namespace}/${name}.js`;
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `/bundles/${page.namespace}/${name}.css`;
      head.appendChild(script);
      head.appendChild(link);
    }
    return dom.serialize();
  }
  static async buildStaticPages() {
    for (const page of this.pages.values()) {
      const html = await this.renderHTML(page);
      const result = this.cachePages.set(`${page.namespace}/${page.name}.html`, html);
      if (!result) {
        _BuilderFront.console.error(_BuilderFront.I18n.get("builderFront_error_buildStaticPages"));
      }
    }
  }
};
_init6 = __decoratorStart(null);
_BuilderFront_static = new WeakSet();
_init_fn3 = async function() {
  _BuilderFront.console = ConsoleLogger.getInstance("BuilderFront");
  _BuilderFront.I18n = I18n.createColdContext();
  _BuilderFront.EnvConfig = EnvConfig.createEnvConfigContext();
  this.cachePages = CacheManager.isSuccess(
    CacheManager.getContext("BuilderFront/pages", { read: true, write: true, create: true, delete: true }),
    (error) => {
      _BuilderFront.console.fatalError(_BuilderFront.I18n.get("builderFront_error_cachePages"));
    }
  );
  this.cacheBundles = CacheManager.isSuccess(
    CacheManager.getContext("BuilderFront/bundles", { read: true, write: true, create: true, delete: true }),
    (error) => {
      _BuilderFront.console.fatalError(_BuilderFront.I18n.get("builderFront_error_cacheBundles"));
    }
  );
  const OutputBundleDir = CacheManager.isSuccess(
    this.cacheBundles.getAbsolutePath(),
    (error) => {
      _BuilderFront.console.fatalError(_BuilderFront.I18n.get("builderFront_error_outputBundleDir"));
    }
  );
  const OutputHTMLDir = CacheManager.isSuccess(
    this.cachePages.getAbsolutePath(),
    (error) => {
      _BuilderFront.console.fatalError(_BuilderFront.I18n.get("builderFront_error_outputHTMLDir"));
    }
  );
  RegisteRoutes.addStaticRouter("/pages", OutputHTMLDir);
  RegisteRoutes.addStaticRouter("/bundles", OutputBundleDir);
  _BuilderFront.config = {
    outdir: OutputBundleDir,
    // get Real path
    bundle: true,
    splitting: true,
    format: "esm",
    platform: "browser",
    target: "es2022",
    sourcemap: true,
    chunkNames: "chunks/[name]-[hash]",
    alias: {
      "@": "./src",
      "@CSS": "./src/CSS"
    },
    external: [
      "/css/font/*"
      // css
    ]
  };
};
__decorateElement(_init6, 9, "esbuild", _esbuild_dec, _BuilderFront);
__decorateElement(_init6, 9, "renderHTML", _renderHTML_dec, _BuilderFront);
__decorateElement(_init6, 9, "buildStaticPages", _buildStaticPages_dec, _BuilderFront);
__privateAdd(_BuilderFront, _BuilderFront_static);
__decoratorMetadata(_init6, _BuilderFront);
__runInitializers(_init6, 3, _BuilderFront);
__publicField(_BuilderFront, "pages", /* @__PURE__ */ new Map());
__publicField(_BuilderFront, "config");
__publicField(_BuilderFront, "cachePages");
// CacheManager for pages
__publicField(_BuilderFront, "cacheBundles");
// CacheManager for bundles
__publicField(_BuilderFront, "console");
__publicField(_BuilderFront, "I18n");
__publicField(_BuilderFront, "EnvConfig");
__publicField(_BuilderFront, "isBuild", CLIManager.getContext().hasArg("build"));
InitsClass.register(__privateMethod(_BuilderFront, _BuilderFront_static, _init_fn3), -100);
var BuilderFront = _BuilderFront;

// src/Function/CLI_Build.ts
async function CLI_Build(value) {
  await BuilderFront.start();
  PerformanceProfiler.report();
}

// src/CLIManagerConfig.ts
var i18n2 = I18n.createColdContext();
function Config() {
  return [
    {
      name: "help",
      alias: "h",
      description: i18n2.get("CLIManager_man_help")
      // "Affiche ce message d'aide",
    },
    {
      name: "man",
      description: i18n2.get("CLIManager_man_man")
      // "Affiche ce message d'aide (alias de --help)", 
    },
    {
      name: "token",
      alias: "t",
      description: i18n2.get("CLIManager_man_token"),
      // "Lance le processus de récupération des tokens d'authentification pour les plateformes de streaming",
      callback: CLI_token,
      exitAfterAllRun: true
    },
    {
      name: "i18n",
      alias: "i",
      description: i18n2.get("CLIManager_man_i18n"),
      // "Cree un fichier de traductions i18n",
      defaultValue: "en",
      parameters: [
        { value: "[language]", description: i18n2.get("CLIManager_man_i18n_parameter_language") }
        // "Nom de la localie : 'fr', 'en', etc." 
      ],
      callback: CLI_i18n,
      exitAfterAllRun: true
    },
    {
      name: "env",
      alias: "e",
      description: i18n2.get("CLIManager_man_env"),
      //  "Cree un fichier env"
      callback: CLI_env,
      exitAfterAllRun: true
    },
    {
      name: "debug",
      alias: "d",
      callback: CLI_debug,
      description: i18n2.get("CLIManager_man_debug"),
      // "Active le mode debug ",
      defaultValue: false,
      parameters: [{ value: "hard", description: i18n2.get("CLIManager_man_debug_parameter_hard") }],
      // "Active le mode debug hard qui permet de voir plus de détails commet les configurations env" 
      globale: true
    },
    {
      name: "clear",
      callback: CLI_Clear,
      description: i18n2.get("CLIManager_man_clear"),
      globale: true
    },
    {
      name: "build",
      callback: CLI_Build,
      description: i18n2.get("CLIManager_man_build"),
      exitAfterRun: true
    }
  ];
}

// src/Class/SQLite.back.ts
var import_better_sqlite3 = __toESM(require("better-sqlite3"));
var import_fs8 = __toESM(require("fs"));
var SQLite = class _SQLite {
  static pathDB = "./sqlite.db";
  static dataBase;
  static console;
  static I18n;
  static EnvConfig;
  static _init() {
    _SQLite.console = ConsoleLogger.getInstance("SQLite");
    _SQLite.I18n = I18n.createColdContext();
    _SQLite.EnvConfig = EnvConfig.createEnvConfigContext();
  }
  static {
    InitsClass.register(_SQLite._init);
  }
  static setPathDB(path5) {
    _SQLite.pathDB = path5;
  }
  static connection(options) {
    if (_SQLite.dataBase) _SQLite.dataBase.close();
    if (!import_fs8.default.existsSync(_SQLite.pathDB)) {
      ConsoleLogger.warn(_SQLite.I18n.get("sqlite_file_not_found", { path: _SQLite.pathDB }));
      return false;
    }
    _SQLite.dataBase = new import_better_sqlite3.default(_SQLite.pathDB, options);
    return true;
  }
  static get prepare() {
    return _SQLite.dataBase.prepare;
  }
  static disconnect() {
    if (_SQLite.dataBase) _SQLite.dataBase.close();
  }
};

// src/Class/EventClass/MessageManager.ts
var MessageManager = class extends DOMStyleEmitter {
  sendMessage(message) {
    this.dispatchEvent("message", message);
  }
};

// src/Class/Express/ServeurExpress.back.ts
var import_express2 = __toESM(require("express"));
var import_https = __toESM(require("https"));
var import_fs9 = __toESM(require("fs"));
var ServeurExpress = class _ServeurExpress {
  static serveur;
  static option;
  static app = (0, import_express2.default)();
  static console;
  static I18n;
  static EnvConfig;
  static _init() {
    _ServeurExpress.console = ConsoleLogger.getInstance("ServeurExpress");
    _ServeurExpress.I18n = I18n.createColdContext();
    _ServeurExpress.EnvConfig = EnvConfig.createEnvConfigContext();
  }
  static {
    InitsClass.register(_ServeurExpress._init, -200);
  }
  static init(option) {
    const app = _ServeurExpress.app;
    _ServeurExpress.option = option;
    RegisteRoutes.getMiddlewares().forEach((m) => app.use(m));
    RegisteRoutes.getStaticRouter().forEach((path5, url) => app.use(url, import_express2.default.static(path5)));
    RegisteRoutes.getRoutes().forEach((router, path5) => {
      app.use(path5, router);
    });
    RegisteRoutes.getURLs().forEach((option2) => {
      switch (option2.methode) {
        case "GET":
          return app.get(option2.url, option2.handler);
        case "POST":
          return app.post(option2.url, option2.handler);
        case "PUT":
          return app.put(option2.url, option2.handler);
        case "DELETE":
          return app.delete(option2.url, option2.handler);
        case "HEAD":
          return app.head(option2.url, option2.handler);
        case "OPTIONS":
          return app.options(option2.url, option2.handler);
        case "TRACE":
          return app.trace(option2.url, option2.handler);
        case "PATCH":
          return app.patch(option2.url, option2.handler);
        case "CONNECT":
          return app.connect(option2.url, option2.handler);
      }
    });
    _ServeurExpress.createServeur();
    if (option.webSocket) {
      _ServeurExpress.console.log(_ServeurExpress.I18n.get("ServeurExpress_WSS_On"));
      _ServeurExpress.SetWebSocket();
    }
  }
  static createServeur() {
    const opt = _ServeurExpress.option;
    const SRopt = {
      port: opt.port,
      isSSL: false
    };
    if (opt.certPath && opt.keyPath && import_fs9.default.existsSync(opt.certPath) && import_fs9.default.existsSync(opt.keyPath)) {
      const options = {
        key: import_fs9.default.readFileSync(opt.certPath),
        cert: import_fs9.default.readFileSync(opt.keyPath)
      };
      SRopt.isSSL = true;
      _ServeurExpress.console.log(_ServeurExpress.I18n.get("ServeurExpress_SSL_On"));
      _ServeurExpress.serveur = import_https.default.createServer(options, _ServeurExpress.app).listen(opt.port, () => {
        _ServeurExpress.console.log(_ServeurExpress.I18n.get("ServeurExpress_ServeurHTPS", { port: opt.port }));
        if (opt.serveurRun) opt.serveurRun(SRopt);
      });
    } else {
      _ServeurExpress.console.log(_ServeurExpress.I18n.get("ServeurExpress_SSL_Off"));
      _ServeurExpress.serveur = _ServeurExpress.app.listen(opt.port, () => {
        _ServeurExpress.console.log(_ServeurExpress.I18n.get("ServeurExpress_ServeurHTTP", { port: opt.port }));
        if (opt.serveurRun) opt.serveurRun(SRopt);
      });
    }
  }
  static SetWebSocket() {
    const Map2 = RegisteRoutes.getWsRouter();
    _ServeurExpress.serveur.on("upgrade", (req, socket, head) => {
      if (!req.url) return socket.destroy();
      const isHandled = Map2.has(req.url);
      if (!isHandled) return socket.destroy();
      const wss = Map2.get(req.url);
      if (!wss) return socket.destroy();
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit("connection", ws, req);
      });
    });
  }
  static getServeur() {
    return _ServeurExpress.serveur;
  }
  static close() {
    const timeout = setTimeout(() => {
      _ServeurExpress.console.warn(_ServeurExpress.I18n.get("ServeurExpress_force_timeout_Stop"));
      process.exit(1);
    }, 1e4);
    _ServeurExpress.serveur.closeAllConnections();
    _ServeurExpress.serveur.close(() => {
      clearTimeout(timeout);
      _ServeurExpress.console.log(_ServeurExpress.I18n.get("ServeurExpress_Serveur_Stop"));
      process.exit(0);
    });
  }
};

// src/Class/WebSocket/UniverselWebSocketServer.back.ts
var import_uuid2 = require("uuid");
var import_ws2 = require("ws");

// src/Class/WebSocket/WebSocketActionContext.back.ts
var WebSocketActionContext = class {
  constructor(ws, message) {
    this.message = message;
    this.ws = ws;
  }
  message;
  ws;
  sendResponse(response) {
    if (this.ws.readyState === this.ws.OPEN) {
      this.ws.send(JSON.stringify(response));
    }
  }
};

// src/Class/WebSocket/UniverselWebSocketServer.back.ts
var UniverselWebSocketServer = class _UniverselWebSocketServer {
  serveur;
  option;
  heartbeatInterval;
  console;
  event;
  static I18n;
  static _init() {
    _UniverselWebSocketServer.I18n = I18n.createColdContext();
  }
  static {
    InitsClass.register(_UniverselWebSocketServer._init);
  }
  constructor(option) {
    this.console = ConsoleLogger.getInstance(option?.instanceName ?? "UniverselWebSocketServer");
    this.event = new DOMStyleEmitter(option?.instanceName ?? "UniverselWebSocketServer");
    this.option = option;
    this.serveur = new import_ws2.WebSocketServer(option);
    this.startHeartbeat(option?.heartbeatInterval ?? 3e4);
    this.serveur.on("connection", (ws, req) => {
      ws.isAlive = true;
      ws.uuid = (0, import_uuid2.v4)();
      ws.on("pong", () => {
        ws.isAlive = true;
      });
      ws.on("ping", () => {
        ws.isAlive = true;
        this.sendPong(ws);
      });
      ws.on("message", (data) => {
        ws.isAlive = true;
        this.handleMessage(ws, data);
      });
      this.event.dispatchEvent("ClientConnection", { id: ws.uuid });
    });
    this.serveur.on("close", () => {
      if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    });
  }
  disconnect() {
    clearInterval(this.heartbeatInterval);
    this.serveur.clients.forEach((ws) => {
      const client = ws;
      this.event.dispatchEvent("ClientDisconnect", { id: client.uuid });
      client.close();
    });
    this.serveur.close();
  }
  startHeartbeat(interval) {
    this.heartbeatInterval = setInterval(() => {
      for (const client of this.serveur.clients) {
        if (client.readyState === client.OPEN) {
          if (!client.isAlive) {
            this.event.dispatchEvent("ClientDisconnect", { id: client.uuid });
            client.terminate();
            continue;
          }
          client.isAlive = false;
          this.sendPing(client);
        }
      }
    }, interval);
  }
  // Message handling system
  handleMessage(ws, data) {
    if (data.toString() === "ping") {
      ws.emit("ping");
      return;
    }
    ;
    if (data.toString() === "pong") {
      ws.emit("pong");
      return;
    }
    ;
    this.event.dispatchEvent(`message`, { ws, data });
    try {
      const parsedData = JSON.parse(data.toString());
      parsedData.uuidClient = ws.uuid;
      if (typeof parsedData.Action !== "string") {
        this.console.error(_UniverselWebSocketServer.I18n.get("UniverselWebSocketServer_Invalid_JSON_Action"));
        return;
      }
      this.dispatchEvent(`action:${parsedData.Action}`, { ws, message: new WebSocketActionContext(ws, parsedData) });
    } catch (error) {
      this.console.error(_UniverselWebSocketServer.I18n.get("UniverselWebSocketServer_Invalid_JSON"), data.toString());
    }
  }
  //////////////////////////////////////////
  // Ping/Pong Protocol
  sendPong(ws) {
    if (ws.readyState === ws.OPEN) {
      if (this.option?.pingPongProtocol) {
        ws.pong();
      } else {
        ws.send("pong");
      }
    }
  }
  sendPing(ws) {
    if (ws.readyState === ws.OPEN) {
      if (this.option?.pingPongProtocol) {
        ws.ping();
      } else {
        ws.send("ping");
      }
    }
  }
  ////////////////////////////////////////////
  // API 
  broadcast(data) {
    const message = typeof data === "string" ? data : JSON.stringify(data);
    for (const client of this.serveur.clients) {
      if (client.readyState === client.OPEN) {
        client.send(message);
      }
    }
  }
  send(uuid, data) {
    const message = typeof data === "string" ? data : JSON.stringify(data);
    for (const client of this.serveur.clients) {
      if (client.readyState === client.OPEN && client.uuid == uuid) {
        client.send(message);
        return true;
      }
    }
    return false;
  }
  getWebSocketServer() {
    return this.serveur;
  }
  addEventListener(event, listener) {
    this.event.addEventListener(event, listener);
  }
  removeEventListener(event, listener) {
    this.event.removeEventListener(event, listener);
  }
  dispatchEvent(event, detail) {
    this.event.dispatchEvent(event, detail);
  }
};

// src/Class/Overlays/OverlayChat/OverlayChat.shared.ts
var OverlayChatShared = class {
  static console;
  static I18n;
  static EnvConfig;
  static message = [];
  static endpointWS = "/OverlayChat/Message";
  // private static WebSocket : UniverselWebSocketServer
  static setIntervalID;
  static generateViewerColor(name) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = (hash << 5) - hash + name.charCodeAt(i);
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 75%, 65%)`;
  }
  static IconsPath = {
    platform: {
      YouTube: "/img/platform/youtube.png",
      Twitch: "/img/platform/twitch.png",
      Kick: "/img/platform/kick.png",
      Trovo: "/img/platform/trovo.png",
      Rumble: "/img/platform/rumble.png",
      DLive: "/img/platform/dlive.png",
      Glimesh: "/img/platform/glimesh.png",
      NimoTV: "/img/platform/nimo.png",
      FacebookGaming: "/img/platform/facebook.png",
      AfreecaTV: "/img/platform/afreeca.png",
      Vimeo: "/img/platform/vimeo.png",
      Dailymotion: "/img/platform/dailymotion.png",
      Periscope: "/img/platform/periscope.png",
      LinkedInLive: "/img/platform/linkedin.png",
      VKLive: "/img/platform/vk.png",
      BigoLive: "/img/platform/bigo.png",
      Other: "/img/platform/default.png"
    },
    statf: {
      owner: "/img/badges/owner.png",
      moderator: "/img/badges/moderator.png"
    }
  };
};

// src/Class/Overlays/OverlayChat/OverlayChat.back.ts
var OverlayChat = class _OverlayChat extends OverlayChatShared {
  static WebSocket;
  static _init() {
    OverlayChatShared.console = ConsoleLogger.getInstance("OverlayChat");
    OverlayChatShared.I18n = I18n.createColdContext();
    OverlayChatShared.EnvConfig = EnvConfig.createEnvConfigContext();
    _OverlayChat.buildFrontHTML();
    _OverlayChat.WebSocket = new UniverselWebSocketServer({
      heartbeat: true,
      noServer: true
    });
    RegisteRoutes.addWsRoute(OverlayChatShared.endpointWS, _OverlayChat.WebSocket.getWebSocketServer());
    OverlayChatShared.setIntervalID = setInterval(() => {
      if (_OverlayChat.message.length > 0) {
        const msg = _OverlayChat.message;
        _OverlayChat.message = [];
        _OverlayChat.WebSocket.broadcast({
          data: msg
        });
      }
    }, 2e3);
  }
  static {
    InitsClass.register(_OverlayChat._init);
  }
  static async sendMessage(message) {
    _OverlayChat.message.push(message);
  }
  static async close() {
    _OverlayChat.WebSocket.disconnect();
  }
  static buildFrontHTML() {
    if (!BuilderFront.isBuild) return;
    BuilderFront.register({
      name: "ChatAll",
      namespace: "OverlayChat",
      js: [
        "/bootstrap.js",
        "/js/smooth-scrollbar.js"
      ],
      entryPoint: "./src/EntryPoints/OverlayChat/ChatAll.ts",
      html(document) {
        const div = document.createElement("div");
        div.id = "chat";
        document.body.appendChild(div);
      }
    });
    BuilderFront.register({
      name: "ChatStreamer",
      namespace: "OverlayChat",
      js: [
        "/bootstrap.js"
      ],
      entryPoint: "./src/EntryPoints/OverlayChat/ChatStreamer.ts",
      html(document) {
        const div = document.createElement("div");
        div.id = "chat";
        document.body.appendChild(div);
      }
    });
    BuilderFront.register({
      name: "ChatOnlyTwitch",
      namespace: "OverlayChat",
      js: [
        "/bootstrap.js",
        "/js/smooth-scrollbar.js"
      ],
      entryPoint: "./src/EntryPoints/OverlayChat/ChatOnlyTwitch.ts",
      html(document) {
        const div = document.createElement("div");
        div.id = "chat";
        div.setAttribute("data-scrollbar", "");
        document.body.appendChild(div);
      }
    });
  }
};

// src/index.ts
var main = async () => {
  using perf = PerformanceProfiler.measure("Main");
  await InitsClass.start();
  await I18n.setLocal(I18n.EnvConfig.string.OrDefault("I18N_LOCAL", "fr"));
  await CLIManager.init(Config());
  SQLite.setPathDB(SQLite.EnvConfig.string.OrDefault("SQLITE_PATH", "./sqlite.db"));
  if (SQLite.connection({ fileMustExist: false })) {
  }
  RegisteRoutes.addStaticRouter("/", "./public");
  const messageManager = new MessageManager();
  messageManager.addEventListener("message", (message) => {
    OverlayChat.sendMessage(message);
  });
  const clientTwitch = ClientTwitch.getInstance();
  clientTwitch.addEventListener("register", () => {
    clientTwitch.register("channel.chat.message", "1");
  });
  clientTwitch.addEventListener("channel.chat.message", (data) => {
    const messageChat = new MessageChat({
      type: "message",
      platform: "Twitch",
      text: data.message.payload.event?.message.text,
      author: data.message.payload.event?.chatter_user_name,
      timestamp: 100
    });
    messageManager.sendMessage(messageChat);
  });
  ClientYoutube.init();
  ClientYoutube.addEventListener("Observator", ({ Observator }) => {
    Observator.addEventListener("TEXT_MESSAGE_EVENT", ({ message }) => {
      const messageChat = new MessageChat({
        type: "message",
        platform: "Twitch",
        text: message.snippet?.textMessageDetails?.messageText,
        author: message.authorDetails?.displayName,
        isOwner: message.authorDetails?.isChatOwner,
        isModerator: message.authorDetails?.isChatModerator,
        isSubscriber: message.authorDetails?.isChatSponsor,
        timestamp: 100
      });
      messageManager.sendMessage(messageChat);
    });
  });
  ClientYoutube.start();
  ServeurExpress.init({
    port: ServeurExpress.EnvConfig.int.OrDefault("ServeurExpress_PORT", 3e3),
    certPath: ServeurExpress.EnvConfig.string.OrUndefined("ServeurExpress_CERT_PATH"),
    keyPath: ServeurExpress.EnvConfig.string.OrUndefined("ServeurExpress_KEY_PATH"),
    webSocket: true
  });
  SetupShutdown_default(async () => {
    ClientTwitch.disconnect();
    SQLite.disconnect();
    OverlayChat.close();
    ServeurExpress.close();
    ClientYoutube.stop();
    PerformanceProfiler.report();
  });
};
main();
//# sourceMappingURL=index.js.map
