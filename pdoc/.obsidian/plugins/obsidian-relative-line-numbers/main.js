/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// main.ts
__export(exports, {
  default: () => RelativeLineNumbers
});
var import_obsidian = __toModule(require("obsidian"));

// extension.ts
var import_view = __toModule(require("@codemirror/view"));
var import_state = __toModule(require("@codemirror/state"));
var import_language = __toModule(require("@codemirror/language"));
var relativeLineNumberGutter = new import_state.Compartment();
var Marker = class extends import_view.GutterMarker {
  constructor(text) {
    super();
    this.text = text;
    this.elementClass = "relative-line-numbers-mono";
  }
  toDOM() {
    return document.createTextNode(this.text);
  }
};
function linesCharLength(state) {
  return state.doc.lines.toString().length;
}
var absoluteLineNumberGutter = (0, import_view.gutter)({
  lineMarker: (view, line) => {
    const lineNo = view.state.doc.lineAt(line.from).number;
    const charLength = linesCharLength(view.state);
    const absoluteLineNo = new Marker(lineNo.toString().padStart(charLength, " "));
    const cursorLine = view.state.doc.lineAt(view.state.selection.asSingle().ranges[0].to).number;
    if (lineNo === cursorLine) {
      return absoluteLineNo;
    }
    return null;
  },
  initialSpacer: (view) => {
    const spacer = new Marker("0".repeat(linesCharLength(view.state)));
    return spacer;
  }
});
function relativeLineNumbers(lineNo, state) {
  const charLength = linesCharLength(state);
  const blank = " ".padStart(charLength, " ");
  if (lineNo > state.doc.lines) {
    return blank;
  }
  const cursorLine = state.doc.lineAt(state.selection.asSingle().ranges[0].to).number;
  const start = Math.min(state.doc.line(lineNo).from, state.selection.asSingle().ranges[0].to);
  const stop = Math.max(state.doc.line(lineNo).from, state.selection.asSingle().ranges[0].to);
  const folds = (0, import_language.foldedRanges)(state);
  let foldedCount = 0;
  folds.between(start, stop, (from, to) => {
    let rangeStart = state.doc.lineAt(from).number;
    let rangeStop = state.doc.lineAt(to).number;
    foldedCount += rangeStop - rangeStart;
  });
  if (lineNo === cursorLine) {
    return blank;
  } else {
    return (Math.abs(cursorLine - lineNo) - foldedCount).toString().padStart(charLength, " ");
  }
}
var showLineNumbers = relativeLineNumberGutter.of((0, import_view.lineNumbers)({ formatNumber: relativeLineNumbers }));
var lineNumbersUpdateListener = import_view.EditorView.updateListener.of((viewUpdate) => {
  if (viewUpdate.selectionSet) {
    viewUpdate.view.dispatch({
      effects: relativeLineNumberGutter.reconfigure((0, import_view.lineNumbers)({ formatNumber: relativeLineNumbers }))
    });
  }
});
function lineNumbersRelative() {
  return [absoluteLineNumberGutter, showLineNumbers, lineNumbersUpdateListener];
}

// main.ts
var RelativeLineNumbers = class extends import_obsidian.Plugin {
  isLegacy() {
    var _a;
    return (_a = this.app.vault.config) == null ? void 0 : _a.legacyEditor;
  }
  onload() {
    return __async(this, null, function* () {
      const showLineNumber = this.app.vault.getConfig("showLineNumber");
      if (showLineNumber) {
        this.enable();
      }
      this.setupConfigChangeListener();
    });
  }
  onunload() {
    this.disable();
  }
  enable() {
    this.enabled = true;
    if (this.isLegacy()) {
      this.legacyEnable();
    } else {
      this.registerEditorExtension(lineNumbersRelative());
    }
  }
  disable() {
    this.enabled = false;
    if (this.isLegacy) {
      this.legacyDisable();
    }
  }
  legacyEnable() {
    this.registerCodeMirror((cm) => {
      cm.on("cursorActivity", this.legacyRelativeLineNumbers);
    });
  }
  legacyDisable() {
    this.app.workspace.iterateCodeMirrors((cm) => {
      cm.off("cursorActivity", this.legacyRelativeLineNumbers);
      cm.setOption("lineNumberFormatter", CodeMirror.defaults["lineNumberFormatter"]);
    });
  }
  setupConfigChangeListener() {
    const configChangedEvent = this.app.vault.on("config-changed", () => {
      const showLineNumber = this.app.vault.getConfig("showLineNumber");
      if (showLineNumber && !this.enabled) {
        this.enable();
      } else if (!showLineNumber && this.enabled) {
        this.disable();
      }
    });
    configChangedEvent.ctx = this;
    this.registerEvent(configChangedEvent);
  }
  legacyRelativeLineNumbers(cm) {
    const current = cm.getCursor().line + 1;
    if (cm.state.curLineNum === current) {
      return;
    }
    cm.state.curLineNum = current;
    cm.setOption("lineNumberFormatter", (line) => {
      if (line === current) {
        return String(current);
      }
      return String(Math.abs(current - line));
    });
  }
};
