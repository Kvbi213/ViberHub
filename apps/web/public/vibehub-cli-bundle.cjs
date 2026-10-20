#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/.pnpm/picomatch@2.3.2/node_modules/picomatch/lib/constants.js
var require_constants = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.2/node_modules/picomatch/lib/constants.js"(exports2, module2) {
    "use strict";
    var path6 = require("path");
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DEFAULT_MAX_EXTGLOB_RECURSION = 0;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR
    };
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`
    };
    var POSIX_REGEX_SOURCE = {
      __proto__: null,
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module2.exports = {
      DEFAULT_MAX_EXTGLOB_RECURSION,
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      // regular expressions
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      // Replace globs with equivalent patterns to reduce parsing time.
      REPLACEMENTS: {
        __proto__: null,
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      // Digits
      CHAR_0: 48,
      /* 0 */
      CHAR_9: 57,
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: 65,
      /* A */
      CHAR_LOWERCASE_A: 97,
      /* a */
      CHAR_UPPERCASE_Z: 90,
      /* Z */
      CHAR_LOWERCASE_Z: 122,
      /* z */
      CHAR_LEFT_PARENTHESES: 40,
      /* ( */
      CHAR_RIGHT_PARENTHESES: 41,
      /* ) */
      CHAR_ASTERISK: 42,
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: 38,
      /* & */
      CHAR_AT: 64,
      /* @ */
      CHAR_BACKWARD_SLASH: 92,
      /* \ */
      CHAR_CARRIAGE_RETURN: 13,
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: 94,
      /* ^ */
      CHAR_COLON: 58,
      /* : */
      CHAR_COMMA: 44,
      /* , */
      CHAR_DOT: 46,
      /* . */
      CHAR_DOUBLE_QUOTE: 34,
      /* " */
      CHAR_EQUAL: 61,
      /* = */
      CHAR_EXCLAMATION_MARK: 33,
      /* ! */
      CHAR_FORM_FEED: 12,
      /* \f */
      CHAR_FORWARD_SLASH: 47,
      /* / */
      CHAR_GRAVE_ACCENT: 96,
      /* ` */
      CHAR_HASH: 35,
      /* # */
      CHAR_HYPHEN_MINUS: 45,
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: 60,
      /* < */
      CHAR_LEFT_CURLY_BRACE: 123,
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: 91,
      /* [ */
      CHAR_LINE_FEED: 10,
      /* \n */
      CHAR_NO_BREAK_SPACE: 160,
      /* \u00A0 */
      CHAR_PERCENT: 37,
      /* % */
      CHAR_PLUS: 43,
      /* + */
      CHAR_QUESTION_MARK: 63,
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      /* > */
      CHAR_RIGHT_CURLY_BRACE: 125,
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      /* ] */
      CHAR_SEMICOLON: 59,
      /* ; */
      CHAR_SINGLE_QUOTE: 39,
      /* ' */
      CHAR_SPACE: 32,
      /*   */
      CHAR_TAB: 9,
      /* \t */
      CHAR_UNDERSCORE: 95,
      /* _ */
      CHAR_VERTICAL_LINE: 124,
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      /* \uFEFF */
      SEP: path6.sep,
      /**
       * Create EXTGLOB_CHARS
       */
      extglobChars(chars) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      /**
       * Create GLOB_CHARS
       */
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// node_modules/.pnpm/picomatch@2.3.2/node_modules/picomatch/lib/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.2/node_modules/picomatch/lib/utils.js"(exports2) {
    "use strict";
    var path6 = require("path");
    var win32 = process.platform === "win32";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants();
    exports2.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports2.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports2.isRegexChar = (str) => str.length === 1 && exports2.hasRegexChars(str);
    exports2.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports2.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports2.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports2.supportsLookbehinds = () => {
      const segs = process.version.slice(1).split(".").map(Number);
      if (segs.length === 3 && segs[0] >= 9 || segs[0] === 8 && segs[1] >= 10) {
        return true;
      }
      return false;
    };
    exports2.isWindows = (options) => {
      if (options && typeof options.windows === "boolean") {
        return options.windows;
      }
      return win32 === true || path6.sep === "\\";
    };
    exports2.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1) return input;
      if (input[idx - 1] === "\\") return exports2.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports2.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports2.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
  }
});

// node_modules/.pnpm/picomatch@2.3.2/node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.2/node_modules/picomatch/lib/scan.js"(exports2, module2) {
    "use strict";
    var utils = require_utils();
    var {
      CHAR_ASTERISK,
      /* * */
      CHAR_AT,
      /* @ */
      CHAR_BACKWARD_SLASH,
      /* \ */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_EXCLAMATION_MARK,
      /* ! */
      CHAR_FORWARD_SLASH,
      /* / */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_PLUS,
      /* + */
      CHAR_QUESTION_MARK,
      /* ? */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_RIGHT_SQUARE_BRACKET
      /* ] */
    } = require_constants();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts = [];
      let str = input;
      let index = -1;
      let start = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true) continue;
          if (prev === CHAR_DOT && index === start + 1) {
            start += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  code = advance();
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES) {
                  isGlob = token.isGlob = true;
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start) {
          negated = token.negated = true;
          start++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_LEFT_PARENTHESES) {
                backslashes = token.backslashes = true;
                code = advance();
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base = str;
      let prefix = "";
      let glob = "";
      if (start > 0) {
        prefix = str.slice(0, start);
        str = str.slice(start);
        lastIndex -= start;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex);
        glob = str.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob = str;
      } else {
        base = str;
      }
      if (base && base !== "" && base !== "/" && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob) glob = utils.removeBackslashes(glob);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start,
        base,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n = prevIndex ? prevIndex + 1 : start;
          const i = slashes[idx];
          const value = input.slice(n, i);
          if (opts.tokens) {
            if (idx === 0 && start !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (idx !== 0 || value !== "") {
            parts.push(value);
          }
          prevIndex = i;
        }
        if (prevIndex && prevIndex + 1 < input.length) {
          const value = input.slice(prevIndex + 1);
          parts.push(value);
          if (opts.tokens) {
            tokens[tokens.length - 1].value = value;
            depth(tokens[tokens.length - 1]);
            state.maxDepth += tokens[tokens.length - 1].depth;
          }
        }
        state.slashes = slashes;
        state.parts = parts;
      }
      return state;
    };
    module2.exports = scan;
  }
});

// node_modules/.pnpm/picomatch@2.3.2/node_modules/picomatch/lib/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.2/node_modules/picomatch/lib/parse.js"(exports2, module2) {
    "use strict";
    var constants = require_constants();
    var utils = require_utils();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    var expandRange = (args, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args, options);
      }
      args.sort();
      const value = `[${args.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args.map((v) => utils.escapeRegex(v)).join("..");
      }
      return value;
    };
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var splitTopLevel = (input) => {
      const parts = [];
      let bracket = 0;
      let paren = 0;
      let quote = 0;
      let value = "";
      let escaped = false;
      for (const ch of input) {
        if (escaped === true) {
          value += ch;
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          value += ch;
          escaped = true;
          continue;
        }
        if (ch === '"') {
          quote = quote === 1 ? 0 : 1;
          value += ch;
          continue;
        }
        if (quote === 0) {
          if (ch === "[") {
            bracket++;
          } else if (ch === "]" && bracket > 0) {
            bracket--;
          } else if (bracket === 0) {
            if (ch === "(") {
              paren++;
            } else if (ch === ")" && paren > 0) {
              paren--;
            } else if (ch === "|" && paren === 0) {
              parts.push(value);
              value = "";
              continue;
            }
          }
        }
        value += ch;
      }
      parts.push(value);
      return parts;
    };
    var isPlainBranch = (branch) => {
      let escaped = false;
      for (const ch of branch) {
        if (escaped === true) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (/[?*+@!()[\]{}]/.test(ch)) {
          return false;
        }
      }
      return true;
    };
    var normalizeSimpleBranch = (branch) => {
      let value = branch.trim();
      let changed = true;
      while (changed === true) {
        changed = false;
        if (/^@\([^\\()[\]{}|]+\)$/.test(value)) {
          value = value.slice(2, -1);
          changed = true;
        }
      }
      if (!isPlainBranch(value)) {
        return;
      }
      return value.replace(/\\(.)/g, "$1");
    };
    var hasRepeatedCharPrefixOverlap = (branches) => {
      const values = branches.map(normalizeSimpleBranch).filter(Boolean);
      for (let i = 0; i < values.length; i++) {
        for (let j = i + 1; j < values.length; j++) {
          const a = values[i];
          const b = values[j];
          const char = a[0];
          if (!char || a !== char.repeat(a.length) || b !== char.repeat(b.length)) {
            continue;
          }
          if (a === b || a.startsWith(b) || b.startsWith(a)) {
            return true;
          }
        }
      }
      return false;
    };
    var parseRepeatedExtglob = (pattern, requireEnd = true) => {
      if (pattern[0] !== "+" && pattern[0] !== "*" || pattern[1] !== "(") {
        return;
      }
      let bracket = 0;
      let paren = 0;
      let quote = 0;
      let escaped = false;
      for (let i = 1; i < pattern.length; i++) {
        const ch = pattern[i];
        if (escaped === true) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (ch === '"') {
          quote = quote === 1 ? 0 : 1;
          continue;
        }
        if (quote === 1) {
          continue;
        }
        if (ch === "[") {
          bracket++;
          continue;
        }
        if (ch === "]" && bracket > 0) {
          bracket--;
          continue;
        }
        if (bracket > 0) {
          continue;
        }
        if (ch === "(") {
          paren++;
          continue;
        }
        if (ch === ")") {
          paren--;
          if (paren === 0) {
            if (requireEnd === true && i !== pattern.length - 1) {
              return;
            }
            return {
              type: pattern[0],
              body: pattern.slice(2, i),
              end: i
            };
          }
        }
      }
    };
    var getStarExtglobSequenceOutput = (pattern) => {
      let index = 0;
      const chars = [];
      while (index < pattern.length) {
        const match = parseRepeatedExtglob(pattern.slice(index), false);
        if (!match || match.type !== "*") {
          return;
        }
        const branches = splitTopLevel(match.body).map((branch2) => branch2.trim());
        if (branches.length !== 1) {
          return;
        }
        const branch = normalizeSimpleBranch(branches[0]);
        if (!branch || branch.length !== 1) {
          return;
        }
        chars.push(branch);
        index += match.end + 1;
      }
      if (chars.length < 1) {
        return;
      }
      const source = chars.length === 1 ? utils.escapeRegex(chars[0]) : `[${chars.map((ch) => utils.escapeRegex(ch)).join("")}]`;
      return `${source}*`;
    };
    var repeatedExtglobRecursion = (pattern) => {
      let depth = 0;
      let value = pattern.trim();
      let match = parseRepeatedExtglob(value);
      while (match) {
        depth++;
        value = match.body.trim();
        match = parseRepeatedExtglob(value);
      }
      return depth;
    };
    var analyzeRepeatedExtglob = (body, options) => {
      if (options.maxExtglobRecursion === false) {
        return { risky: false };
      }
      const max = typeof options.maxExtglobRecursion === "number" ? options.maxExtglobRecursion : constants.DEFAULT_MAX_EXTGLOB_RECURSION;
      const branches = splitTopLevel(body).map((branch) => branch.trim());
      if (branches.length > 1) {
        if (branches.some((branch) => branch === "") || branches.some((branch) => /^[*?]+$/.test(branch)) || hasRepeatedCharPrefixOverlap(branches)) {
          return { risky: true };
        }
      }
      for (const branch of branches) {
        const safeOutput = getStarExtglobSequenceOutput(branch);
        if (safeOutput) {
          return { risky: true, safeOutput };
        }
        if (repeatedExtglobRecursion(branch) > max) {
          return { risky: true };
        }
      }
      return { risky: false };
    };
    var parse = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const win32 = utils.isWindows(options);
      const PLATFORM_CHARS = constants.globChars(win32);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n = 1) => input[state.index + n];
      const advance = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type) => {
        state[type]++;
        stack.push(type);
      };
      const decrement = (type) => {
        state[type]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output) append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.value += tok.value;
          prev.output = (prev.output || "") + tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        token.startIndex = state.index;
        token.tokensIndex = tokens.length;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
        push({ type: "paren", extglob: true, value: advance(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        const literal = input.slice(token.startIndex, state.index + 1);
        const body = input.slice(token.startIndex + 2, state.index);
        const analysis = analyzeRepeatedExtglob(body, opts);
        if ((token.type === "plus" || token.type === "star") && analysis.risky) {
          const safeOutput = analysis.safeOutput ? (token.output ? "" : ONE_CHAR) + (opts.capture ? `(${analysis.safeOutput})` : analysis.safeOutput) : void 0;
          const open = tokens[token.tokensIndex];
          open.type = "text";
          open.value = literal;
          open.output = safeOutput || utils.escapeRegex(literal);
          for (let i = token.tokensIndex + 1; i < tokens.length; i++) {
            tokens[i].value = "";
            tokens[i].output = "";
            delete tokens[i].suffix;
          }
          state.output = token.output + open.output;
          state.backtrack = true;
          push({ type: "paren", extglob: true, value, output: "" });
          decrement("parens");
          return;
        }
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse(rest, { ...options, fastpaths: false }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m : `\\${m}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix = POSIX_REGEX_SOURCE[rest2];
                if (posix) {
                  prev.value = pre + posix;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i = arr.length - 1; i >= 0; i--) {
              tokens.pop();
              if (arr[i].type === "brace") {
                break;
              }
              if (arr[i].type !== "dots") {
                range.unshift(arr[i].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".") prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (next === "<" && !utils.supportsLookbehinds()) {
              throw new Error("Node.js v10 or higher is required for regex lookbehinds");
            }
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && eos()) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse.fastpaths = (input, options) => {
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const win32 = utils.isWindows(options);
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(win32);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true) return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match) return;
            const source2 = create(match[1]);
            if (!source2) return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module2.exports = parse;
  }
});

// node_modules/.pnpm/picomatch@2.3.2/node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.2/node_modules/picomatch/lib/picomatch.js"(exports2, module2) {
    "use strict";
    var path6 = require("path");
    var scan = require_scan();
    var parse = require_parse();
    var utils = require_utils();
    var constants = require_constants();
    var isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2) return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject(glob) && glob.tokens && glob.input;
      if (glob === "" || typeof glob !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix = utils.isWindows(options);
      const regex = isState ? picomatch.compileRe(glob, options) : picomatch.makeRe(glob, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix });
        const result = { glob, state, regex, posix, input, output, match, isMatch };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch.test = (input, regex, options, { glob, posix } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix ? utils.toPosixSlashes : null);
      let match = input === glob;
      let output = match && format ? format(input) : input;
      if (match === false) {
        output = format ? format(input) : input;
        match = output === glob;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch.matchBase(input, regex, options, posix);
        } else {
          match = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch.matchBase = (input, glob, options, posix = utils.isWindows(options)) => {
      const regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
      return regex.test(path6.basename(input));
    };
    picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
    picomatch.parse = (pattern, options) => {
      if (Array.isArray(pattern)) return pattern.map((p) => picomatch.parse(p, options));
      return parse(pattern, { ...options, fastpaths: false });
    };
    picomatch.scan = (input, options) => scan(input, options);
    picomatch.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse(input, options);
      }
      return picomatch.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err) {
        if (options && options.debug === true) throw err;
        return /$^/;
      }
    };
    picomatch.constants = constants;
    module2.exports = picomatch;
  }
});

// node_modules/.pnpm/picomatch@2.3.2/node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "node_modules/.pnpm/picomatch@2.3.2/node_modules/picomatch/index.js"(exports2, module2) {
    "use strict";
    module2.exports = require_picomatch();
  }
});

// node_modules/.pnpm/readdirp@3.6.0/node_modules/readdirp/index.js
var require_readdirp = __commonJS({
  "node_modules/.pnpm/readdirp@3.6.0/node_modules/readdirp/index.js"(exports2, module2) {
    "use strict";
    var fs5 = require("fs");
    var { Readable } = require("stream");
    var sysPath = require("path");
    var { promisify: promisify2 } = require("util");
    var picomatch = require_picomatch2();
    var readdir = promisify2(fs5.readdir);
    var stat = promisify2(fs5.stat);
    var lstat = promisify2(fs5.lstat);
    var realpath = promisify2(fs5.realpath);
    var BANG = "!";
    var RECURSIVE_ERROR_CODE = "READDIRP_RECURSIVE_ERROR";
    var NORMAL_FLOW_ERRORS = /* @__PURE__ */ new Set(["ENOENT", "EPERM", "EACCES", "ELOOP", RECURSIVE_ERROR_CODE]);
    var FILE_TYPE = "files";
    var DIR_TYPE = "directories";
    var FILE_DIR_TYPE = "files_directories";
    var EVERYTHING_TYPE = "all";
    var ALL_TYPES = [FILE_TYPE, DIR_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE];
    var isNormalFlowError = (error) => NORMAL_FLOW_ERRORS.has(error.code);
    var [maj, min] = process.versions.node.split(".").slice(0, 2).map((n) => Number.parseInt(n, 10));
    var wantBigintFsStats = process.platform === "win32" && (maj > 10 || maj === 10 && min >= 5);
    var normalizeFilter = (filter) => {
      if (filter === void 0) return;
      if (typeof filter === "function") return filter;
      if (typeof filter === "string") {
        const glob = picomatch(filter.trim());
        return (entry) => glob(entry.basename);
      }
      if (Array.isArray(filter)) {
        const positive = [];
        const negative = [];
        for (const item of filter) {
          const trimmed = item.trim();
          if (trimmed.charAt(0) === BANG) {
            negative.push(picomatch(trimmed.slice(1)));
          } else {
            positive.push(picomatch(trimmed));
          }
        }
        if (negative.length > 0) {
          if (positive.length > 0) {
            return (entry) => positive.some((f) => f(entry.basename)) && !negative.some((f) => f(entry.basename));
          }
          return (entry) => !negative.some((f) => f(entry.basename));
        }
        return (entry) => positive.some((f) => f(entry.basename));
      }
    };
    var ReaddirpStream = class _ReaddirpStream extends Readable {
      static get defaultOptions() {
        return {
          root: ".",
          /* eslint-disable no-unused-vars */
          fileFilter: (path6) => true,
          directoryFilter: (path6) => true,
          /* eslint-enable no-unused-vars */
          type: FILE_TYPE,
          lstat: false,
          depth: 2147483648,
          alwaysStat: false
        };
      }
      constructor(options = {}) {
        super({
          objectMode: true,
          autoDestroy: true,
          highWaterMark: options.highWaterMark || 4096
        });
        const opts = { ..._ReaddirpStream.defaultOptions, ...options };
        const { root, type } = opts;
        this._fileFilter = normalizeFilter(opts.fileFilter);
        this._directoryFilter = normalizeFilter(opts.directoryFilter);
        const statMethod = opts.lstat ? lstat : stat;
        if (wantBigintFsStats) {
          this._stat = (path6) => statMethod(path6, { bigint: true });
        } else {
          this._stat = statMethod;
        }
        this._maxDepth = opts.depth;
        this._wantsDir = [DIR_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE].includes(type);
        this._wantsFile = [FILE_TYPE, FILE_DIR_TYPE, EVERYTHING_TYPE].includes(type);
        this._wantsEverything = type === EVERYTHING_TYPE;
        this._root = sysPath.resolve(root);
        this._isDirent = "Dirent" in fs5 && !opts.alwaysStat;
        this._statsProp = this._isDirent ? "dirent" : "stats";
        this._rdOptions = { encoding: "utf8", withFileTypes: this._isDirent };
        this.parents = [this._exploreDir(root, 1)];
        this.reading = false;
        this.parent = void 0;
      }
      async _read(batch) {
        if (this.reading) return;
        this.reading = true;
        try {
          while (!this.destroyed && batch > 0) {
            const { path: path6, depth, files = [] } = this.parent || {};
            if (files.length > 0) {
              const slice = files.splice(0, batch).map((dirent) => this._formatEntry(dirent, path6));
              for (const entry of await Promise.all(slice)) {
                if (this.destroyed) return;
                const entryType = await this._getEntryType(entry);
                if (entryType === "directory" && this._directoryFilter(entry)) {
                  if (depth <= this._maxDepth) {
                    this.parents.push(this._exploreDir(entry.fullPath, depth + 1));
                  }
                  if (this._wantsDir) {
                    this.push(entry);
                    batch--;
                  }
                } else if ((entryType === "file" || this._includeAsFile(entry)) && this._fileFilter(entry)) {
                  if (this._wantsFile) {
                    this.push(entry);
                    batch--;
                  }
                }
              }
            } else {
              const parent = this.parents.pop();
              if (!parent) {
                this.push(null);
                break;
              }
              this.parent = await parent;
              if (this.destroyed) return;
            }
          }
        } catch (error) {
          this.destroy(error);
        } finally {
          this.reading = false;
        }
      }
      async _exploreDir(path6, depth) {
        let files;
        try {
          files = await readdir(path6, this._rdOptions);
        } catch (error) {
          this._onError(error);
        }
        return { files, depth, path: path6 };
      }
      async _formatEntry(dirent, path6) {
        let entry;
        try {
          const basename = this._isDirent ? dirent.name : dirent;
          const fullPath = sysPath.resolve(sysPath.join(path6, basename));
          entry = { path: sysPath.relative(this._root, fullPath), fullPath, basename };
          entry[this._statsProp] = this._isDirent ? dirent : await this._stat(fullPath);
        } catch (err) {
          this._onError(err);
        }
        return entry;
      }
      _onError(err) {
        if (isNormalFlowError(err) && !this.destroyed) {
          this.emit("warn", err);
        } else {
          this.destroy(err);
        }
      }
      async _getEntryType(entry) {
        const stats = entry && entry[this._statsProp];
        if (!stats) {
          return;
        }
        if (stats.isFile()) {
          return "file";
        }
        if (stats.isDirectory()) {
          return "directory";
        }
        if (stats && stats.isSymbolicLink()) {
          const full = entry.fullPath;
          try {
            const entryRealPath = await realpath(full);
            const entryRealPathStats = await lstat(entryRealPath);
            if (entryRealPathStats.isFile()) {
              return "file";
            }
            if (entryRealPathStats.isDirectory()) {
              const len = entryRealPath.length;
              if (full.startsWith(entryRealPath) && full.substr(len, 1) === sysPath.sep) {
                const recursiveError = new Error(
                  `Circular symlink detected: "${full}" points to "${entryRealPath}"`
                );
                recursiveError.code = RECURSIVE_ERROR_CODE;
                return this._onError(recursiveError);
              }
              return "directory";
            }
          } catch (error) {
            this._onError(error);
          }
        }
      }
      _includeAsFile(entry) {
        const stats = entry && entry[this._statsProp];
        return stats && this._wantsEverything && !stats.isDirectory();
      }
    };
    var readdirp = (root, options = {}) => {
      let type = options.entryType || options.type;
      if (type === "both") type = FILE_DIR_TYPE;
      if (type) options.type = type;
      if (!root) {
        throw new Error("readdirp: root argument is required. Usage: readdirp(root, options)");
      } else if (typeof root !== "string") {
        throw new TypeError("readdirp: root argument must be a string. Usage: readdirp(root, options)");
      } else if (type && !ALL_TYPES.includes(type)) {
        throw new Error(`readdirp: Invalid type passed. Use one of ${ALL_TYPES.join(", ")}`);
      }
      options.root = root;
      return new ReaddirpStream(options);
    };
    var readdirpPromise = (root, options = {}) => {
      return new Promise((resolve, reject) => {
        const files = [];
        readdirp(root, options).on("data", (entry) => files.push(entry)).on("end", () => resolve(files)).on("error", (error) => reject(error));
      });
    };
    readdirp.promise = readdirpPromise;
    readdirp.ReaddirpStream = ReaddirpStream;
    readdirp.default = readdirp;
    module2.exports = readdirp;
  }
});

// node_modules/.pnpm/normalize-path@3.0.0/node_modules/normalize-path/index.js
var require_normalize_path = __commonJS({
  "node_modules/.pnpm/normalize-path@3.0.0/node_modules/normalize-path/index.js"(exports2, module2) {
    module2.exports = function(path6, stripTrailing) {
      if (typeof path6 !== "string") {
        throw new TypeError("expected path to be a string");
      }
      if (path6 === "\\" || path6 === "/") return "/";
      var len = path6.length;
      if (len <= 1) return path6;
      var prefix = "";
      if (len > 4 && path6[3] === "\\") {
        var ch = path6[2];
        if ((ch === "?" || ch === ".") && path6.slice(0, 2) === "\\\\") {
          path6 = path6.slice(2);
          prefix = "//";
        }
      }
      var segs = path6.split(/[/\\]+/);
      if (stripTrailing !== false && segs[segs.length - 1] === "") {
        segs.pop();
      }
      return prefix + segs.join("/");
    };
  }
});

// node_modules/.pnpm/anymatch@3.1.3/node_modules/anymatch/index.js
var require_anymatch = __commonJS({
  "node_modules/.pnpm/anymatch@3.1.3/node_modules/anymatch/index.js"(exports2, module2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", { value: true });
    var picomatch = require_picomatch2();
    var normalizePath = require_normalize_path();
    var BANG = "!";
    var DEFAULT_OPTIONS = { returnIndex: false };
    var arrify = (item) => Array.isArray(item) ? item : [item];
    var createPattern = (matcher, options) => {
      if (typeof matcher === "function") {
        return matcher;
      }
      if (typeof matcher === "string") {
        const glob = picomatch(matcher, options);
        return (string) => matcher === string || glob(string);
      }
      if (matcher instanceof RegExp) {
        return (string) => matcher.test(string);
      }
      return (string) => false;
    };
    var matchPatterns = (patterns, negPatterns, args, returnIndex) => {
      const isList = Array.isArray(args);
      const _path = isList ? args[0] : args;
      if (!isList && typeof _path !== "string") {
        throw new TypeError("anymatch: second argument must be a string: got " + Object.prototype.toString.call(_path));
      }
      const path6 = normalizePath(_path, false);
      for (let index = 0; index < negPatterns.length; index++) {
        const nglob = negPatterns[index];
        if (nglob(path6)) {
          return returnIndex ? -1 : false;
        }
      }
      const applied = isList && [path6].concat(args.slice(1));
      for (let index = 0; index < patterns.length; index++) {
        const pattern = patterns[index];
        if (isList ? pattern(...applied) : pattern(path6)) {
          return returnIndex ? index : true;
        }
      }
      return returnIndex ? -1 : false;
    };
    var anymatch = (matchers, testString, options = DEFAULT_OPTIONS) => {
      if (matchers == null) {
        throw new TypeError("anymatch: specify first argument");
      }
      const opts = typeof options === "boolean" ? { returnIndex: options } : options;
      const returnIndex = opts.returnIndex || false;
      const mtchers = arrify(matchers);
      const negatedGlobs = mtchers.filter((item) => typeof item === "string" && item.charAt(0) === BANG).map((item) => item.slice(1)).map((item) => picomatch(item, opts));
      const patterns = mtchers.filter((item) => typeof item !== "string" || typeof item === "string" && item.charAt(0) !== BANG).map((matcher) => createPattern(matcher, opts));
      if (testString == null) {
        return (testString2, ri = false) => {
          const returnIndex2 = typeof ri === "boolean" ? ri : false;
          return matchPatterns(patterns, negatedGlobs, testString2, returnIndex2);
        };
      }
      return matchPatterns(patterns, negatedGlobs, testString, returnIndex);
    };
    anymatch.default = anymatch;
    module2.exports = anymatch;
  }
});

// node_modules/.pnpm/is-extglob@2.1.1/node_modules/is-extglob/index.js
var require_is_extglob = __commonJS({
  "node_modules/.pnpm/is-extglob@2.1.1/node_modules/is-extglob/index.js"(exports2, module2) {
    module2.exports = function isExtglob(str) {
      if (typeof str !== "string" || str === "") {
        return false;
      }
      var match;
      while (match = /(\\).|([@?!+*]\(.*\))/g.exec(str)) {
        if (match[2]) return true;
        str = str.slice(match.index + match[0].length);
      }
      return false;
    };
  }
});

// node_modules/.pnpm/is-glob@4.0.3/node_modules/is-glob/index.js
var require_is_glob = __commonJS({
  "node_modules/.pnpm/is-glob@4.0.3/node_modules/is-glob/index.js"(exports2, module2) {
    var isExtglob = require_is_extglob();
    var chars = { "{": "}", "(": ")", "[": "]" };
    var strictCheck = function(str) {
      if (str[0] === "!") {
        return true;
      }
      var index = 0;
      var pipeIndex = -2;
      var closeSquareIndex = -2;
      var closeCurlyIndex = -2;
      var closeParenIndex = -2;
      var backSlashIndex = -2;
      while (index < str.length) {
        if (str[index] === "*") {
          return true;
        }
        if (str[index + 1] === "?" && /[\].+)]/.test(str[index])) {
          return true;
        }
        if (closeSquareIndex !== -1 && str[index] === "[" && str[index + 1] !== "]") {
          if (closeSquareIndex < index) {
            closeSquareIndex = str.indexOf("]", index);
          }
          if (closeSquareIndex > index) {
            if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
              return true;
            }
            backSlashIndex = str.indexOf("\\", index);
            if (backSlashIndex === -1 || backSlashIndex > closeSquareIndex) {
              return true;
            }
          }
        }
        if (closeCurlyIndex !== -1 && str[index] === "{" && str[index + 1] !== "}") {
          closeCurlyIndex = str.indexOf("}", index);
          if (closeCurlyIndex > index) {
            backSlashIndex = str.indexOf("\\", index);
            if (backSlashIndex === -1 || backSlashIndex > closeCurlyIndex) {
              return true;
            }
          }
        }
        if (closeParenIndex !== -1 && str[index] === "(" && str[index + 1] === "?" && /[:!=]/.test(str[index + 2]) && str[index + 3] !== ")") {
          closeParenIndex = str.indexOf(")", index);
          if (closeParenIndex > index) {
            backSlashIndex = str.indexOf("\\", index);
            if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
              return true;
            }
          }
        }
        if (pipeIndex !== -1 && str[index] === "(" && str[index + 1] !== "|") {
          if (pipeIndex < index) {
            pipeIndex = str.indexOf("|", index);
          }
          if (pipeIndex !== -1 && str[pipeIndex + 1] !== ")") {
            closeParenIndex = str.indexOf(")", pipeIndex);
            if (closeParenIndex > pipeIndex) {
              backSlashIndex = str.indexOf("\\", pipeIndex);
              if (backSlashIndex === -1 || backSlashIndex > closeParenIndex) {
                return true;
              }
            }
          }
        }
        if (str[index] === "\\") {
          var open = str[index + 1];
          index += 2;
          var close = chars[open];
          if (close) {
            var n = str.indexOf(close, index);
            if (n !== -1) {
              index = n + 1;
            }
          }
          if (str[index] === "!") {
            return true;
          }
        } else {
          index++;
        }
      }
      return false;
    };
    var relaxedCheck = function(str) {
      if (str[0] === "!") {
        return true;
      }
      var index = 0;
      while (index < str.length) {
        if (/[*?{}()[\]]/.test(str[index])) {
          return true;
        }
        if (str[index] === "\\") {
          var open = str[index + 1];
          index += 2;
          var close = chars[open];
          if (close) {
            var n = str.indexOf(close, index);
            if (n !== -1) {
              index = n + 1;
            }
          }
          if (str[index] === "!") {
            return true;
          }
        } else {
          index++;
        }
      }
      return false;
    };
    module2.exports = function isGlob(str, options) {
      if (typeof str !== "string" || str === "") {
        return false;
      }
      if (isExtglob(str)) {
        return true;
      }
      var check = strictCheck;
      if (options && options.strict === false) {
        check = relaxedCheck;
      }
      return check(str);
    };
  }
});

// node_modules/.pnpm/glob-parent@5.1.2/node_modules/glob-parent/index.js
var require_glob_parent = __commonJS({
  "node_modules/.pnpm/glob-parent@5.1.2/node_modules/glob-parent/index.js"(exports2, module2) {
    "use strict";
    var isGlob = require_is_glob();
    var pathPosixDirname = require("path").posix.dirname;
    var isWin32 = require("os").platform() === "win32";
    var slash = "/";
    var backslash = /\\/g;
    var enclosure = /[\{\[].*[\}\]]$/;
    var globby = /(^|[^\\])([\{\[]|\([^\)]+$)/;
    var escaped = /\\([\!\*\?\|\[\]\(\)\{\}])/g;
    module2.exports = function globParent(str, opts) {
      var options = Object.assign({ flipBackslashes: true }, opts);
      if (options.flipBackslashes && isWin32 && str.indexOf(slash) < 0) {
        str = str.replace(backslash, slash);
      }
      if (enclosure.test(str)) {
        str += slash;
      }
      str += "a";
      do {
        str = pathPosixDirname(str);
      } while (isGlob(str) || globby.test(str));
      return str.replace(escaped, "$1");
    };
  }
});

// node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/utils.js
var require_utils2 = __commonJS({
  "node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/utils.js"(exports2) {
    "use strict";
    exports2.isInteger = (num) => {
      if (typeof num === "number") {
        return Number.isInteger(num);
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isInteger(Number(num));
      }
      return false;
    };
    exports2.find = (node, type) => node.nodes.find((node2) => node2.type === type);
    exports2.exceedsLimit = (min, max, step = 1, limit) => {
      if (limit === false) return false;
      if (!exports2.isInteger(min) || !exports2.isInteger(max)) return false;
      return (Number(max) - Number(min)) / Number(step) >= limit;
    };
    exports2.escapeNode = (block, n = 0, type) => {
      const node = block.nodes[n];
      if (!node) return;
      if (type && node.type === type || node.type === "open" || node.type === "close") {
        if (node.escaped !== true) {
          node.value = "\\" + node.value;
          node.escaped = true;
        }
      }
    };
    exports2.encloseBrace = (node) => {
      if (node.type !== "brace") return false;
      if (node.commas >> 0 + node.ranges >> 0 === 0) {
        node.invalid = true;
        return true;
      }
      return false;
    };
    exports2.isInvalidBrace = (block) => {
      if (block.type !== "brace") return false;
      if (block.invalid === true || block.dollar) return true;
      if (block.commas >> 0 + block.ranges >> 0 === 0) {
        block.invalid = true;
        return true;
      }
      if (block.open !== true || block.close !== true) {
        block.invalid = true;
        return true;
      }
      return false;
    };
    exports2.isOpenOrClose = (node) => {
      if (node.type === "open" || node.type === "close") {
        return true;
      }
      return node.open === true || node.close === true;
    };
    exports2.reduce = (nodes) => nodes.reduce((acc, node) => {
      if (node.type === "text") acc.push(node.value);
      if (node.type === "range") node.type = "text";
      return acc;
    }, []);
    exports2.flatten = (...args) => {
      const result = [];
      const flat = (arr) => {
        for (let i = 0; i < arr.length; i++) {
          const ele = arr[i];
          if (Array.isArray(ele)) {
            flat(ele);
            continue;
          }
          if (ele !== void 0) {
            result.push(ele);
          }
        }
        return result;
      };
      flat(args);
      return result;
    };
  }
});

// node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/stringify.js"(exports2, module2) {
    "use strict";
    var utils = require_utils2();
    module2.exports = (ast, options = {}) => {
      const stringify = (node, parent = {}) => {
        const invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
        const invalidNode = node.invalid === true && options.escapeInvalid === true;
        let output = "";
        if (node.value) {
          if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
            return "\\" + node.value;
          }
          return node.value;
        }
        if (node.value) {
          return node.value;
        }
        if (node.nodes) {
          for (const child of node.nodes) {
            output += stringify(child);
          }
        }
        return output;
      };
      return stringify(ast);
    };
  }
});

// node_modules/.pnpm/is-number@7.0.0/node_modules/is-number/index.js
var require_is_number = __commonJS({
  "node_modules/.pnpm/is-number@7.0.0/node_modules/is-number/index.js"(exports2, module2) {
    "use strict";
    module2.exports = function(num) {
      if (typeof num === "number") {
        return num - num === 0;
      }
      if (typeof num === "string" && num.trim() !== "") {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
      }
      return false;
    };
  }
});

// node_modules/.pnpm/to-regex-range@5.0.1/node_modules/to-regex-range/index.js
var require_to_regex_range = __commonJS({
  "node_modules/.pnpm/to-regex-range@5.0.1/node_modules/to-regex-range/index.js"(exports2, module2) {
    "use strict";
    var isNumber = require_is_number();
    var toRegexRange = (min, max, options) => {
      if (isNumber(min) === false) {
        throw new TypeError("toRegexRange: expected the first argument to be a number");
      }
      if (max === void 0 || min === max) {
        return String(min);
      }
      if (isNumber(max) === false) {
        throw new TypeError("toRegexRange: expected the second argument to be a number.");
      }
      let opts = { relaxZeros: true, ...options };
      if (typeof opts.strictZeros === "boolean") {
        opts.relaxZeros = opts.strictZeros === false;
      }
      let relax = String(opts.relaxZeros);
      let shorthand = String(opts.shorthand);
      let capture = String(opts.capture);
      let wrap = String(opts.wrap);
      let cacheKey = min + ":" + max + "=" + relax + shorthand + capture + wrap;
      if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
        return toRegexRange.cache[cacheKey].result;
      }
      let a = Math.min(min, max);
      let b = Math.max(min, max);
      if (Math.abs(a - b) === 1) {
        let result = min + "|" + max;
        if (opts.capture) {
          return `(${result})`;
        }
        if (opts.wrap === false) {
          return result;
        }
        return `(?:${result})`;
      }
      let isPadded = hasPadding(min) || hasPadding(max);
      let state = { min, max, a, b };
      let positives = [];
      let negatives = [];
      if (isPadded) {
        state.isPadded = isPadded;
        state.maxLen = String(state.max).length;
      }
      if (a < 0) {
        let newMin = b < 0 ? Math.abs(b) : 1;
        negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
        a = state.a = 0;
      }
      if (b >= 0) {
        positives = splitToPatterns(a, b, state, opts);
      }
      state.negatives = negatives;
      state.positives = positives;
      state.result = collatePatterns(negatives, positives, opts);
      if (opts.capture === true) {
        state.result = `(${state.result})`;
      } else if (opts.wrap !== false && positives.length + negatives.length > 1) {
        state.result = `(?:${state.result})`;
      }
      toRegexRange.cache[cacheKey] = state;
      return state.result;
    };
    function collatePatterns(neg, pos, options) {
      let onlyNegative = filterPatterns(neg, pos, "-", false, options) || [];
      let onlyPositive = filterPatterns(pos, neg, "", false, options) || [];
      let intersected = filterPatterns(neg, pos, "-?", true, options) || [];
      let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
      return subpatterns.join("|");
    }
    function splitToRanges(min, max) {
      let nines = 1;
      let zeros = 1;
      let stop = countNines(min, nines);
      let stops = /* @__PURE__ */ new Set([max]);
      while (min <= stop && stop <= max) {
        stops.add(stop);
        nines += 1;
        stop = countNines(min, nines);
      }
      stop = countZeros(max + 1, zeros) - 1;
      while (min < stop && stop <= max) {
        stops.add(stop);
        zeros += 1;
        stop = countZeros(max + 1, zeros) - 1;
      }
      stops = [...stops];
      stops.sort(compare);
      return stops;
    }
    function rangeToPattern(start, stop, options) {
      if (start === stop) {
        return { pattern: start, count: [], digits: 0 };
      }
      let zipped = zip(start, stop);
      let digits = zipped.length;
      let pattern = "";
      let count = 0;
      for (let i = 0; i < digits; i++) {
        let [startDigit, stopDigit] = zipped[i];
        if (startDigit === stopDigit) {
          pattern += startDigit;
        } else if (startDigit !== "0" || stopDigit !== "9") {
          pattern += toCharacterClass(startDigit, stopDigit, options);
        } else {
          count++;
        }
      }
      if (count) {
        pattern += options.shorthand === true ? "\\d" : "[0-9]";
      }
      return { pattern, count: [count], digits };
    }
    function splitToPatterns(min, max, tok, options) {
      let ranges = splitToRanges(min, max);
      let tokens = [];
      let start = min;
      let prev;
      for (let i = 0; i < ranges.length; i++) {
        let max2 = ranges[i];
        let obj = rangeToPattern(String(start), String(max2), options);
        let zeros = "";
        if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
          if (prev.count.length > 1) {
            prev.count.pop();
          }
          prev.count.push(obj.count[0]);
          prev.string = prev.pattern + toQuantifier(prev.count);
          start = max2 + 1;
          continue;
        }
        if (tok.isPadded) {
          zeros = padZeros(max2, tok, options);
        }
        obj.string = zeros + obj.pattern + toQuantifier(obj.count);
        tokens.push(obj);
        start = max2 + 1;
        prev = obj;
      }
      return tokens;
    }
    function filterPatterns(arr, comparison, prefix, intersection, options) {
      let result = [];
      for (let ele of arr) {
        let { string } = ele;
        if (!intersection && !contains(comparison, "string", string)) {
          result.push(prefix + string);
        }
        if (intersection && contains(comparison, "string", string)) {
          result.push(prefix + string);
        }
      }
      return result;
    }
    function zip(a, b) {
      let arr = [];
      for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]]);
      return arr;
    }
    function compare(a, b) {
      return a > b ? 1 : b > a ? -1 : 0;
    }
    function contains(arr, key, val) {
      return arr.some((ele) => ele[key] === val);
    }
    function countNines(min, len) {
      return Number(String(min).slice(0, -len) + "9".repeat(len));
    }
    function countZeros(integer, zeros) {
      return integer - integer % Math.pow(10, zeros);
    }
    function toQuantifier(digits) {
      let [start = 0, stop = ""] = digits;
      if (stop || start > 1) {
        return `{${start + (stop ? "," + stop : "")}}`;
      }
      return "";
    }
    function toCharacterClass(a, b, options) {
      return `[${a}${b - a === 1 ? "" : "-"}${b}]`;
    }
    function hasPadding(str) {
      return /^-?(0+)\d/.test(str);
    }
    function padZeros(value, tok, options) {
      if (!tok.isPadded) {
        return value;
      }
      let diff = Math.abs(tok.maxLen - String(value).length);
      let relax = options.relaxZeros !== false;
      switch (diff) {
        case 0:
          return "";
        case 1:
          return relax ? "0?" : "0";
        case 2:
          return relax ? "0{0,2}" : "00";
        default: {
          return relax ? `0{0,${diff}}` : `0{${diff}}`;
        }
      }
    }
    toRegexRange.cache = {};
    toRegexRange.clearCache = () => toRegexRange.cache = {};
    module2.exports = toRegexRange;
  }
});

// node_modules/.pnpm/fill-range@7.1.1/node_modules/fill-range/index.js
var require_fill_range = __commonJS({
  "node_modules/.pnpm/fill-range@7.1.1/node_modules/fill-range/index.js"(exports2, module2) {
    "use strict";
    var util = require("util");
    var toRegexRange = require_to_regex_range();
    var isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    var transform = (toNumber) => {
      return (value) => toNumber === true ? Number(value) : String(value);
    };
    var isValidValue = (value) => {
      return typeof value === "number" || typeof value === "string" && value !== "";
    };
    var isNumber = (num) => Number.isInteger(+num);
    var zeros = (input) => {
      let value = `${input}`;
      let index = -1;
      if (value[0] === "-") value = value.slice(1);
      if (value === "0") return false;
      while (value[++index] === "0") ;
      return index > 0;
    };
    var stringify = (start, end, options) => {
      if (typeof start === "string" || typeof end === "string") {
        return true;
      }
      return options.stringify === true;
    };
    var pad = (input, maxLength, toNumber) => {
      if (maxLength > 0) {
        let dash = input[0] === "-" ? "-" : "";
        if (dash) input = input.slice(1);
        input = dash + input.padStart(dash ? maxLength - 1 : maxLength, "0");
      }
      if (toNumber === false) {
        return String(input);
      }
      return input;
    };
    var toMaxLen = (input, maxLength) => {
      let negative = input[0] === "-" ? "-" : "";
      if (negative) {
        input = input.slice(1);
        maxLength--;
      }
      while (input.length < maxLength) input = "0" + input;
      return negative ? "-" + input : input;
    };
    var toSequence = (parts, options, maxLen) => {
      parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
      parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
      let prefix = options.capture ? "" : "?:";
      let positives = "";
      let negatives = "";
      let result;
      if (parts.positives.length) {
        positives = parts.positives.map((v) => toMaxLen(String(v), maxLen)).join("|");
      }
      if (parts.negatives.length) {
        negatives = `-(${prefix}${parts.negatives.map((v) => toMaxLen(String(v), maxLen)).join("|")})`;
      }
      if (positives && negatives) {
        result = `${positives}|${negatives}`;
      } else {
        result = positives || negatives;
      }
      if (options.wrap) {
        return `(${prefix}${result})`;
      }
      return result;
    };
    var toRange = (a, b, isNumbers, options) => {
      if (isNumbers) {
        return toRegexRange(a, b, { wrap: false, ...options });
      }
      let start = String.fromCharCode(a);
      if (a === b) return start;
      let stop = String.fromCharCode(b);
      return `[${start}-${stop}]`;
    };
    var toRegex = (start, end, options) => {
      if (Array.isArray(start)) {
        let wrap = options.wrap === true;
        let prefix = options.capture ? "" : "?:";
        return wrap ? `(${prefix}${start.join("|")})` : start.join("|");
      }
      return toRegexRange(start, end, options);
    };
    var rangeError = (...args) => {
      return new RangeError("Invalid range arguments: " + util.inspect(...args));
    };
    var invalidRange = (start, end, options) => {
      if (options.strictRanges === true) throw rangeError([start, end]);
      return [];
    };
    var invalidStep = (step, options) => {
      if (options.strictRanges === true) {
        throw new TypeError(`Expected step "${step}" to be a number`);
      }
      return [];
    };
    var fillNumbers = (start, end, step = 1, options = {}) => {
      let a = Number(start);
      let b = Number(end);
      if (!Number.isInteger(a) || !Number.isInteger(b)) {
        if (options.strictRanges === true) throw rangeError([start, end]);
        return [];
      }
      if (a === 0) a = 0;
      if (b === 0) b = 0;
      let descending = a > b;
      let startString = String(start);
      let endString = String(end);
      let stepString = String(step);
      step = Math.max(Math.abs(step), 1);
      let padded = zeros(startString) || zeros(endString) || zeros(stepString);
      let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
      let toNumber = padded === false && stringify(start, end, options) === false;
      let format = options.transform || transform(toNumber);
      if (options.toRegex && step === 1) {
        return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
      }
      let parts = { negatives: [], positives: [] };
      let push = (num) => parts[num < 0 ? "negatives" : "positives"].push(Math.abs(num));
      let range = [];
      let index = 0;
      while (descending ? a >= b : a <= b) {
        if (options.toRegex === true && step > 1) {
          push(a);
        } else {
          range.push(pad(format(a, index), maxLen, toNumber));
        }
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return step > 1 ? toSequence(parts, options, maxLen) : toRegex(range, null, { wrap: false, ...options });
      }
      return range;
    };
    var fillLetters = (start, end, step = 1, options = {}) => {
      if (!isNumber(start) && start.length > 1 || !isNumber(end) && end.length > 1) {
        return invalidRange(start, end, options);
      }
      let format = options.transform || ((val) => String.fromCharCode(val));
      let a = `${start}`.charCodeAt(0);
      let b = `${end}`.charCodeAt(0);
      let descending = a > b;
      let min = Math.min(a, b);
      let max = Math.max(a, b);
      if (options.toRegex && step === 1) {
        return toRange(min, max, false, options);
      }
      let range = [];
      let index = 0;
      while (descending ? a >= b : a <= b) {
        range.push(format(a, index));
        a = descending ? a - step : a + step;
        index++;
      }
      if (options.toRegex === true) {
        return toRegex(range, null, { wrap: false, options });
      }
      return range;
    };
    var fill = (start, end, step, options = {}) => {
      if (end == null && isValidValue(start)) {
        return [start];
      }
      if (!isValidValue(start) || !isValidValue(end)) {
        return invalidRange(start, end, options);
      }
      if (typeof step === "function") {
        return fill(start, end, 1, { transform: step });
      }
      if (isObject(step)) {
        return fill(start, end, 0, step);
      }
      let opts = { ...options };
      if (opts.capture === true) opts.wrap = true;
      step = step || opts.step || 1;
      if (!isNumber(step)) {
        if (step != null && !isObject(step)) return invalidStep(step, opts);
        return fill(start, end, 1, step);
      }
      if (isNumber(start) && isNumber(end)) {
        return fillNumbers(start, end, step, opts);
      }
      return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
    };
    module2.exports = fill;
  }
});

// node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/compile.js
var require_compile = __commonJS({
  "node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/compile.js"(exports2, module2) {
    "use strict";
    var fill = require_fill_range();
    var utils = require_utils2();
    var compile = (ast, options = {}) => {
      const walk = (node, parent = {}) => {
        const invalidBlock = utils.isInvalidBrace(parent);
        const invalidNode = node.invalid === true && options.escapeInvalid === true;
        const invalid = invalidBlock === true || invalidNode === true;
        const prefix = options.escapeInvalid === true ? "\\" : "";
        let output = "";
        if (node.isOpen === true) {
          return prefix + node.value;
        }
        if (node.isClose === true) {
          console.log("node.isClose", prefix, node.value);
          return prefix + node.value;
        }
        if (node.type === "open") {
          return invalid ? prefix + node.value : "(";
        }
        if (node.type === "close") {
          return invalid ? prefix + node.value : ")";
        }
        if (node.type === "comma") {
          return node.prev.type === "comma" ? "" : invalid ? node.value : "|";
        }
        if (node.value) {
          return node.value;
        }
        if (node.nodes && node.ranges > 0) {
          const args = utils.reduce(node.nodes);
          const range = fill(...args, { ...options, wrap: false, toRegex: true, strictZeros: true });
          if (range.length !== 0) {
            return args.length > 1 && range.length > 1 ? `(${range})` : range;
          }
        }
        if (node.nodes) {
          for (const child of node.nodes) {
            output += walk(child, node);
          }
        }
        return output;
      };
      return walk(ast);
    };
    module2.exports = compile;
  }
});

// node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/expand.js
var require_expand = __commonJS({
  "node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/expand.js"(exports2, module2) {
    "use strict";
    var fill = require_fill_range();
    var stringify = require_stringify();
    var utils = require_utils2();
    var append = (queue = "", stash = "", enclose = false) => {
      const result = [];
      queue = [].concat(queue);
      stash = [].concat(stash);
      if (!stash.length) return queue;
      if (!queue.length) {
        return enclose ? utils.flatten(stash).map((ele) => `{${ele}}`) : stash;
      }
      for (const item of queue) {
        if (Array.isArray(item)) {
          for (const value of item) {
            result.push(append(value, stash, enclose));
          }
        } else {
          for (let ele of stash) {
            if (enclose === true && typeof ele === "string") ele = `{${ele}}`;
            result.push(Array.isArray(ele) ? append(item, ele, enclose) : item + ele);
          }
        }
      }
      return utils.flatten(result);
    };
    var expand = (ast, options = {}) => {
      const rangeLimit = options.rangeLimit === void 0 ? 1e3 : options.rangeLimit;
      const walk = (node, parent = {}) => {
        node.queue = [];
        let p = parent;
        let q = parent.queue;
        while (p.type !== "brace" && p.type !== "root" && p.parent) {
          p = p.parent;
          q = p.queue;
        }
        if (node.invalid || node.dollar) {
          q.push(append(q.pop(), stringify(node, options)));
          return;
        }
        if (node.type === "brace" && node.invalid !== true && node.nodes.length === 2) {
          q.push(append(q.pop(), ["{}"]));
          return;
        }
        if (node.nodes && node.ranges > 0) {
          const args = utils.reduce(node.nodes);
          if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
            throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
          }
          let range = fill(...args, options);
          if (range.length === 0) {
            range = stringify(node, options);
          }
          q.push(append(q.pop(), range));
          node.nodes = [];
          return;
        }
        const enclose = utils.encloseBrace(node);
        let queue = node.queue;
        let block = node;
        while (block.type !== "brace" && block.type !== "root" && block.parent) {
          block = block.parent;
          queue = block.queue;
        }
        for (let i = 0; i < node.nodes.length; i++) {
          const child = node.nodes[i];
          if (child.type === "comma" && node.type === "brace") {
            if (i === 1) queue.push("");
            queue.push("");
            continue;
          }
          if (child.type === "close") {
            q.push(append(q.pop(), queue, enclose));
            continue;
          }
          if (child.value && child.type !== "open") {
            queue.push(append(queue.pop(), child.value));
            continue;
          }
          if (child.nodes) {
            walk(child, node);
          }
        }
        return queue;
      };
      return utils.flatten(walk(ast));
    };
    module2.exports = expand;
  }
});

// node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/constants.js
var require_constants2 = __commonJS({
  "node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/constants.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      MAX_LENGTH: 1e4,
      // Digits
      CHAR_0: "0",
      /* 0 */
      CHAR_9: "9",
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: "A",
      /* A */
      CHAR_LOWERCASE_A: "a",
      /* a */
      CHAR_UPPERCASE_Z: "Z",
      /* Z */
      CHAR_LOWERCASE_Z: "z",
      /* z */
      CHAR_LEFT_PARENTHESES: "(",
      /* ( */
      CHAR_RIGHT_PARENTHESES: ")",
      /* ) */
      CHAR_ASTERISK: "*",
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: "&",
      /* & */
      CHAR_AT: "@",
      /* @ */
      CHAR_BACKSLASH: "\\",
      /* \ */
      CHAR_BACKTICK: "`",
      /* ` */
      CHAR_CARRIAGE_RETURN: "\r",
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: "^",
      /* ^ */
      CHAR_COLON: ":",
      /* : */
      CHAR_COMMA: ",",
      /* , */
      CHAR_DOLLAR: "$",
      /* . */
      CHAR_DOT: ".",
      /* . */
      CHAR_DOUBLE_QUOTE: '"',
      /* " */
      CHAR_EQUAL: "=",
      /* = */
      CHAR_EXCLAMATION_MARK: "!",
      /* ! */
      CHAR_FORM_FEED: "\f",
      /* \f */
      CHAR_FORWARD_SLASH: "/",
      /* / */
      CHAR_HASH: "#",
      /* # */
      CHAR_HYPHEN_MINUS: "-",
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: "<",
      /* < */
      CHAR_LEFT_CURLY_BRACE: "{",
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: "[",
      /* [ */
      CHAR_LINE_FEED: "\n",
      /* \n */
      CHAR_NO_BREAK_SPACE: "\xA0",
      /* \u00A0 */
      CHAR_PERCENT: "%",
      /* % */
      CHAR_PLUS: "+",
      /* + */
      CHAR_QUESTION_MARK: "?",
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: ">",
      /* > */
      CHAR_RIGHT_CURLY_BRACE: "}",
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: "]",
      /* ] */
      CHAR_SEMICOLON: ";",
      /* ; */
      CHAR_SINGLE_QUOTE: "'",
      /* ' */
      CHAR_SPACE: " ",
      /*   */
      CHAR_TAB: "	",
      /* \t */
      CHAR_UNDERSCORE: "_",
      /* _ */
      CHAR_VERTICAL_LINE: "|",
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
      /* \uFEFF */
    };
  }
});

// node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/parse.js
var require_parse2 = __commonJS({
  "node_modules/.pnpm/braces@3.0.3/node_modules/braces/lib/parse.js"(exports2, module2) {
    "use strict";
    var stringify = require_stringify();
    var {
      MAX_LENGTH,
      CHAR_BACKSLASH,
      /* \ */
      CHAR_BACKTICK,
      /* ` */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_RIGHT_SQUARE_BRACKET,
      /* ] */
      CHAR_DOUBLE_QUOTE,
      /* " */
      CHAR_SINGLE_QUOTE,
      /* ' */
      CHAR_NO_BREAK_SPACE,
      CHAR_ZERO_WIDTH_NOBREAK_SPACE
    } = require_constants2();
    var parse = (input, options = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      const opts = options || {};
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      if (input.length > max) {
        throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
      }
      const ast = { type: "root", input, nodes: [] };
      const stack = [ast];
      let block = ast;
      let prev = ast;
      let brackets = 0;
      const length = input.length;
      let index = 0;
      let depth = 0;
      let value;
      const advance = () => input[index++];
      const push = (node) => {
        if (node.type === "text" && prev.type === "dot") {
          prev.type = "text";
        }
        if (prev && prev.type === "text" && node.type === "text") {
          prev.value += node.value;
          return;
        }
        block.nodes.push(node);
        node.parent = block;
        node.prev = prev;
        prev = node;
        return node;
      };
      push({ type: "bos" });
      while (index < length) {
        block = stack[stack.length - 1];
        value = advance();
        if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
          continue;
        }
        if (value === CHAR_BACKSLASH) {
          push({ type: "text", value: (options.keepEscaping ? value : "") + advance() });
          continue;
        }
        if (value === CHAR_RIGHT_SQUARE_BRACKET) {
          push({ type: "text", value: "\\" + value });
          continue;
        }
        if (value === CHAR_LEFT_SQUARE_BRACKET) {
          brackets++;
          let next;
          while (index < length && (next = advance())) {
            value += next;
            if (next === CHAR_LEFT_SQUARE_BRACKET) {
              brackets++;
              continue;
            }
            if (next === CHAR_BACKSLASH) {
              value += advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              brackets--;
              if (brackets === 0) {
                break;
              }
            }
          }
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_LEFT_PARENTHESES) {
          block = push({ type: "paren", nodes: [] });
          stack.push(block);
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_RIGHT_PARENTHESES) {
          if (block.type !== "paren") {
            push({ type: "text", value });
            continue;
          }
          block = stack.pop();
          push({ type: "text", value });
          block = stack[stack.length - 1];
          continue;
        }
        if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
          const open = value;
          let next;
          if (options.keepQuotes !== true) {
            value = "";
          }
          while (index < length && (next = advance())) {
            if (next === CHAR_BACKSLASH) {
              value += next + advance();
              continue;
            }
            if (next === open) {
              if (options.keepQuotes === true) value += next;
              break;
            }
            value += next;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === CHAR_LEFT_CURLY_BRACE) {
          depth++;
          const dollar = prev.value && prev.value.slice(-1) === "$" || block.dollar === true;
          const brace = {
            type: "brace",
            open: true,
            close: false,
            dollar,
            depth,
            commas: 0,
            ranges: 0,
            nodes: []
          };
          block = push(brace);
          stack.push(block);
          push({ type: "open", value });
          continue;
        }
        if (value === CHAR_RIGHT_CURLY_BRACE) {
          if (block.type !== "brace") {
            push({ type: "text", value });
            continue;
          }
          const type = "close";
          block = stack.pop();
          block.close = true;
          push({ type, value });
          depth--;
          block = stack[stack.length - 1];
          continue;
        }
        if (value === CHAR_COMMA && depth > 0) {
          if (block.ranges > 0) {
            block.ranges = 0;
            const open = block.nodes.shift();
            block.nodes = [open, { type: "text", value: stringify(block) }];
          }
          push({ type: "comma", value });
          block.commas++;
          continue;
        }
        if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
          const siblings = block.nodes;
          if (depth === 0 || siblings.length === 0) {
            push({ type: "text", value });
            continue;
          }
          if (prev.type === "dot") {
            block.range = [];
            prev.value += value;
            prev.type = "range";
            if (block.nodes.length !== 3 && block.nodes.length !== 5) {
              block.invalid = true;
              block.ranges = 0;
              prev.type = "text";
              continue;
            }
            block.ranges++;
            block.args = [];
            continue;
          }
          if (prev.type === "range") {
            siblings.pop();
            const before = siblings[siblings.length - 1];
            before.value += prev.value + value;
            prev = before;
            block.ranges--;
            continue;
          }
          push({ type: "dot", value });
          continue;
        }
        push({ type: "text", value });
      }
      do {
        block = stack.pop();
        if (block.type !== "root") {
          block.nodes.forEach((node) => {
            if (!node.nodes) {
              if (node.type === "open") node.isOpen = true;
              if (node.type === "close") node.isClose = true;
              if (!node.nodes) node.type = "text";
              node.invalid = true;
            }
          });
          const parent = stack[stack.length - 1];
          const index2 = parent.nodes.indexOf(block);
          parent.nodes.splice(index2, 1, ...block.nodes);
        }
      } while (stack.length > 0);
      push({ type: "eos" });
      return ast;
    };
    module2.exports = parse;
  }
});

// node_modules/.pnpm/braces@3.0.3/node_modules/braces/index.js
var require_braces = __commonJS({
  "node_modules/.pnpm/braces@3.0.3/node_modules/braces/index.js"(exports2, module2) {
    "use strict";
    var stringify = require_stringify();
    var compile = require_compile();
    var expand = require_expand();
    var parse = require_parse2();
    var braces = (input, options = {}) => {
      let output = [];
      if (Array.isArray(input)) {
        for (const pattern of input) {
          const result = braces.create(pattern, options);
          if (Array.isArray(result)) {
            output.push(...result);
          } else {
            output.push(result);
          }
        }
      } else {
        output = [].concat(braces.create(input, options));
      }
      if (options && options.expand === true && options.nodupes === true) {
        output = [...new Set(output)];
      }
      return output;
    };
    braces.parse = (input, options = {}) => parse(input, options);
    braces.stringify = (input, options = {}) => {
      if (typeof input === "string") {
        return stringify(braces.parse(input, options), options);
      }
      return stringify(input, options);
    };
    braces.compile = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      return compile(input, options);
    };
    braces.expand = (input, options = {}) => {
      if (typeof input === "string") {
        input = braces.parse(input, options);
      }
      let result = expand(input, options);
      if (options.noempty === true) {
        result = result.filter(Boolean);
      }
      if (options.nodupes === true) {
        result = [...new Set(result)];
      }
      return result;
    };
    braces.create = (input, options = {}) => {
      if (input === "" || input.length < 3) {
        return [input];
      }
      return options.expand !== true ? braces.compile(input, options) : braces.expand(input, options);
    };
    module2.exports = braces;
  }
});

// node_modules/.pnpm/binary-extensions@2.3.0/node_modules/binary-extensions/binary-extensions.json
var require_binary_extensions = __commonJS({
  "node_modules/.pnpm/binary-extensions@2.3.0/node_modules/binary-extensions/binary-extensions.json"(exports2, module2) {
    module2.exports = [
      "3dm",
      "3ds",
      "3g2",
      "3gp",
      "7z",
      "a",
      "aac",
      "adp",
      "afdesign",
      "afphoto",
      "afpub",
      "ai",
      "aif",
      "aiff",
      "alz",
      "ape",
      "apk",
      "appimage",
      "ar",
      "arj",
      "asf",
      "au",
      "avi",
      "bak",
      "baml",
      "bh",
      "bin",
      "bk",
      "bmp",
      "btif",
      "bz2",
      "bzip2",
      "cab",
      "caf",
      "cgm",
      "class",
      "cmx",
      "cpio",
      "cr2",
      "cur",
      "dat",
      "dcm",
      "deb",
      "dex",
      "djvu",
      "dll",
      "dmg",
      "dng",
      "doc",
      "docm",
      "docx",
      "dot",
      "dotm",
      "dra",
      "DS_Store",
      "dsk",
      "dts",
      "dtshd",
      "dvb",
      "dwg",
      "dxf",
      "ecelp4800",
      "ecelp7470",
      "ecelp9600",
      "egg",
      "eol",
      "eot",
      "epub",
      "exe",
      "f4v",
      "fbs",
      "fh",
      "fla",
      "flac",
      "flatpak",
      "fli",
      "flv",
      "fpx",
      "fst",
      "fvt",
      "g3",
      "gh",
      "gif",
      "graffle",
      "gz",
      "gzip",
      "h261",
      "h263",
      "h264",
      "icns",
      "ico",
      "ief",
      "img",
      "ipa",
      "iso",
      "jar",
      "jpeg",
      "jpg",
      "jpgv",
      "jpm",
      "jxr",
      "key",
      "ktx",
      "lha",
      "lib",
      "lvp",
      "lz",
      "lzh",
      "lzma",
      "lzo",
      "m3u",
      "m4a",
      "m4v",
      "mar",
      "mdi",
      "mht",
      "mid",
      "midi",
      "mj2",
      "mka",
      "mkv",
      "mmr",
      "mng",
      "mobi",
      "mov",
      "movie",
      "mp3",
      "mp4",
      "mp4a",
      "mpeg",
      "mpg",
      "mpga",
      "mxu",
      "nef",
      "npx",
      "numbers",
      "nupkg",
      "o",
      "odp",
      "ods",
      "odt",
      "oga",
      "ogg",
      "ogv",
      "otf",
      "ott",
      "pages",
      "pbm",
      "pcx",
      "pdb",
      "pdf",
      "pea",
      "pgm",
      "pic",
      "png",
      "pnm",
      "pot",
      "potm",
      "potx",
      "ppa",
      "ppam",
      "ppm",
      "pps",
      "ppsm",
      "ppsx",
      "ppt",
      "pptm",
      "pptx",
      "psd",
      "pya",
      "pyc",
      "pyo",
      "pyv",
      "qt",
      "rar",
      "ras",
      "raw",
      "resources",
      "rgb",
      "rip",
      "rlc",
      "rmf",
      "rmvb",
      "rpm",
      "rtf",
      "rz",
      "s3m",
      "s7z",
      "scpt",
      "sgi",
      "shar",
      "snap",
      "sil",
      "sketch",
      "slk",
      "smv",
      "snk",
      "so",
      "stl",
      "suo",
      "sub",
      "swf",
      "tar",
      "tbz",
      "tbz2",
      "tga",
      "tgz",
      "thmx",
      "tif",
      "tiff",
      "tlz",
      "ttc",
      "ttf",
      "txz",
      "udf",
      "uvh",
      "uvi",
      "uvm",
      "uvp",
      "uvs",
      "uvu",
      "viv",
      "vob",
      "war",
      "wav",
      "wax",
      "wbmp",
      "wdp",
      "weba",
      "webm",
      "webp",
      "whl",
      "wim",
      "wm",
      "wma",
      "wmv",
      "wmx",
      "woff",
      "woff2",
      "wrm",
      "wvx",
      "xbm",
      "xif",
      "xla",
      "xlam",
      "xls",
      "xlsb",
      "xlsm",
      "xlsx",
      "xlt",
      "xltm",
      "xltx",
      "xm",
      "xmind",
      "xpi",
      "xpm",
      "xwd",
      "xz",
      "z",
      "zip",
      "zipx"
    ];
  }
});

// node_modules/.pnpm/binary-extensions@2.3.0/node_modules/binary-extensions/index.js
var require_binary_extensions2 = __commonJS({
  "node_modules/.pnpm/binary-extensions@2.3.0/node_modules/binary-extensions/index.js"(exports2, module2) {
    module2.exports = require_binary_extensions();
  }
});

// node_modules/.pnpm/is-binary-path@2.1.0/node_modules/is-binary-path/index.js
var require_is_binary_path = __commonJS({
  "node_modules/.pnpm/is-binary-path@2.1.0/node_modules/is-binary-path/index.js"(exports2, module2) {
    "use strict";
    var path6 = require("path");
    var binaryExtensions = require_binary_extensions2();
    var extensions = new Set(binaryExtensions);
    module2.exports = (filePath) => extensions.has(path6.extname(filePath).slice(1).toLowerCase());
  }
});

// node_modules/.pnpm/chokidar@3.6.0/node_modules/chokidar/lib/constants.js
var require_constants3 = __commonJS({
  "node_modules/.pnpm/chokidar@3.6.0/node_modules/chokidar/lib/constants.js"(exports2) {
    "use strict";
    var { sep } = require("path");
    var { platform } = process;
    var os7 = require("os");
    exports2.EV_ALL = "all";
    exports2.EV_READY = "ready";
    exports2.EV_ADD = "add";
    exports2.EV_CHANGE = "change";
    exports2.EV_ADD_DIR = "addDir";
    exports2.EV_UNLINK = "unlink";
    exports2.EV_UNLINK_DIR = "unlinkDir";
    exports2.EV_RAW = "raw";
    exports2.EV_ERROR = "error";
    exports2.STR_DATA = "data";
    exports2.STR_END = "end";
    exports2.STR_CLOSE = "close";
    exports2.FSEVENT_CREATED = "created";
    exports2.FSEVENT_MODIFIED = "modified";
    exports2.FSEVENT_DELETED = "deleted";
    exports2.FSEVENT_MOVED = "moved";
    exports2.FSEVENT_CLONED = "cloned";
    exports2.FSEVENT_UNKNOWN = "unknown";
    exports2.FSEVENT_FLAG_MUST_SCAN_SUBDIRS = 1;
    exports2.FSEVENT_TYPE_FILE = "file";
    exports2.FSEVENT_TYPE_DIRECTORY = "directory";
    exports2.FSEVENT_TYPE_SYMLINK = "symlink";
    exports2.KEY_LISTENERS = "listeners";
    exports2.KEY_ERR = "errHandlers";
    exports2.KEY_RAW = "rawEmitters";
    exports2.HANDLER_KEYS = [exports2.KEY_LISTENERS, exports2.KEY_ERR, exports2.KEY_RAW];
    exports2.DOT_SLASH = `.${sep}`;
    exports2.BACK_SLASH_RE = /\\/g;
    exports2.DOUBLE_SLASH_RE = /\/\//;
    exports2.SLASH_OR_BACK_SLASH_RE = /[/\\]/;
    exports2.DOT_RE = /\..*\.(sw[px])$|~$|\.subl.*\.tmp/;
    exports2.REPLACER_RE = /^\.[/\\]/;
    exports2.SLASH = "/";
    exports2.SLASH_SLASH = "//";
    exports2.BRACE_START = "{";
    exports2.BANG = "!";
    exports2.ONE_DOT = ".";
    exports2.TWO_DOTS = "..";
    exports2.STAR = "*";
    exports2.GLOBSTAR = "**";
    exports2.ROOT_GLOBSTAR = "/**/*";
    exports2.SLASH_GLOBSTAR = "/**";
    exports2.DIR_SUFFIX = "Dir";
    exports2.ANYMATCH_OPTS = { dot: true };
    exports2.STRING_TYPE = "string";
    exports2.FUNCTION_TYPE = "function";
    exports2.EMPTY_STR = "";
    exports2.EMPTY_FN = () => {
    };
    exports2.IDENTITY_FN = (val) => val;
    exports2.isWindows = platform === "win32";
    exports2.isMacos = platform === "darwin";
    exports2.isLinux = platform === "linux";
    exports2.isIBMi = os7.type() === "OS400";
  }
});

// node_modules/.pnpm/chokidar@3.6.0/node_modules/chokidar/lib/nodefs-handler.js
var require_nodefs_handler = __commonJS({
  "node_modules/.pnpm/chokidar@3.6.0/node_modules/chokidar/lib/nodefs-handler.js"(exports2, module2) {
    "use strict";
    var fs5 = require("fs");
    var sysPath = require("path");
    var { promisify: promisify2 } = require("util");
    var isBinaryPath = require_is_binary_path();
    var {
      isWindows,
      isLinux,
      EMPTY_FN,
      EMPTY_STR,
      KEY_LISTENERS,
      KEY_ERR,
      KEY_RAW,
      HANDLER_KEYS,
      EV_CHANGE,
      EV_ADD,
      EV_ADD_DIR,
      EV_ERROR,
      STR_DATA,
      STR_END,
      BRACE_START,
      STAR
    } = require_constants3();
    var THROTTLE_MODE_WATCH = "watch";
    var open = promisify2(fs5.open);
    var stat = promisify2(fs5.stat);
    var lstat = promisify2(fs5.lstat);
    var close = promisify2(fs5.close);
    var fsrealpath = promisify2(fs5.realpath);
    var statMethods = { lstat, stat };
    var foreach = (val, fn) => {
      if (val instanceof Set) {
        val.forEach(fn);
      } else {
        fn(val);
      }
    };
    var addAndConvert = (main2, prop, item) => {
      let container = main2[prop];
      if (!(container instanceof Set)) {
        main2[prop] = container = /* @__PURE__ */ new Set([container]);
      }
      container.add(item);
    };
    var clearItem = (cont) => (key) => {
      const set = cont[key];
      if (set instanceof Set) {
        set.clear();
      } else {
        delete cont[key];
      }
    };
    var delFromSet = (main2, prop, item) => {
      const container = main2[prop];
      if (container instanceof Set) {
        container.delete(item);
      } else if (container === item) {
        delete main2[prop];
      }
    };
    var isEmptySet = (val) => val instanceof Set ? val.size === 0 : !val;
    var FsWatchInstances = /* @__PURE__ */ new Map();
    function createFsWatchInstance(path6, options, listener, errHandler, emitRaw) {
      const handleEvent = (rawEvent, evPath) => {
        listener(path6);
        emitRaw(rawEvent, evPath, { watchedPath: path6 });
        if (evPath && path6 !== evPath) {
          fsWatchBroadcast(
            sysPath.resolve(path6, evPath),
            KEY_LISTENERS,
            sysPath.join(path6, evPath)
          );
        }
      };
      try {
        return fs5.watch(path6, options, handleEvent);
      } catch (error) {
        errHandler(error);
      }
    }
    var fsWatchBroadcast = (fullPath, type, val1, val2, val3) => {
      const cont = FsWatchInstances.get(fullPath);
      if (!cont) return;
      foreach(cont[type], (listener) => {
        listener(val1, val2, val3);
      });
    };
    var setFsWatchListener = (path6, fullPath, options, handlers) => {
      const { listener, errHandler, rawEmitter } = handlers;
      let cont = FsWatchInstances.get(fullPath);
      let watcher;
      if (!options.persistent) {
        watcher = createFsWatchInstance(
          path6,
          options,
          listener,
          errHandler,
          rawEmitter
        );
        return watcher.close.bind(watcher);
      }
      if (cont) {
        addAndConvert(cont, KEY_LISTENERS, listener);
        addAndConvert(cont, KEY_ERR, errHandler);
        addAndConvert(cont, KEY_RAW, rawEmitter);
      } else {
        watcher = createFsWatchInstance(
          path6,
          options,
          fsWatchBroadcast.bind(null, fullPath, KEY_LISTENERS),
          errHandler,
          // no need to use broadcast here
          fsWatchBroadcast.bind(null, fullPath, KEY_RAW)
        );
        if (!watcher) return;
        watcher.on(EV_ERROR, async (error) => {
          const broadcastErr = fsWatchBroadcast.bind(null, fullPath, KEY_ERR);
          cont.watcherUnusable = true;
          if (isWindows && error.code === "EPERM") {
            try {
              const fd = await open(path6, "r");
              await close(fd);
              broadcastErr(error);
            } catch (err) {
            }
          } else {
            broadcastErr(error);
          }
        });
        cont = {
          listeners: listener,
          errHandlers: errHandler,
          rawEmitters: rawEmitter,
          watcher
        };
        FsWatchInstances.set(fullPath, cont);
      }
      return () => {
        delFromSet(cont, KEY_LISTENERS, listener);
        delFromSet(cont, KEY_ERR, errHandler);
        delFromSet(cont, KEY_RAW, rawEmitter);
        if (isEmptySet(cont.listeners)) {
          cont.watcher.close();
          FsWatchInstances.delete(fullPath);
          HANDLER_KEYS.forEach(clearItem(cont));
          cont.watcher = void 0;
          Object.freeze(cont);
        }
      };
    };
    var FsWatchFileInstances = /* @__PURE__ */ new Map();
    var setFsWatchFileListener = (path6, fullPath, options, handlers) => {
      const { listener, rawEmitter } = handlers;
      let cont = FsWatchFileInstances.get(fullPath);
      let listeners = /* @__PURE__ */ new Set();
      let rawEmitters = /* @__PURE__ */ new Set();
      const copts = cont && cont.options;
      if (copts && (copts.persistent < options.persistent || copts.interval > options.interval)) {
        listeners = cont.listeners;
        rawEmitters = cont.rawEmitters;
        fs5.unwatchFile(fullPath);
        cont = void 0;
      }
      if (cont) {
        addAndConvert(cont, KEY_LISTENERS, listener);
        addAndConvert(cont, KEY_RAW, rawEmitter);
      } else {
        cont = {
          listeners: listener,
          rawEmitters: rawEmitter,
          options,
          watcher: fs5.watchFile(fullPath, options, (curr, prev) => {
            foreach(cont.rawEmitters, (rawEmitter2) => {
              rawEmitter2(EV_CHANGE, fullPath, { curr, prev });
            });
            const currmtime = curr.mtimeMs;
            if (curr.size !== prev.size || currmtime > prev.mtimeMs || currmtime === 0) {
              foreach(cont.listeners, (listener2) => listener2(path6, curr));
            }
          })
        };
        FsWatchFileInstances.set(fullPath, cont);
      }
      return () => {
        delFromSet(cont, KEY_LISTENERS, listener);
        delFromSet(cont, KEY_RAW, rawEmitter);
        if (isEmptySet(cont.listeners)) {
          FsWatchFileInstances.delete(fullPath);
          fs5.unwatchFile(fullPath);
          cont.options = cont.watcher = void 0;
          Object.freeze(cont);
        }
      };
    };
    var NodeFsHandler = class {
      /**
       * @param {import("../index").FSWatcher} fsW
       */
      constructor(fsW) {
        this.fsw = fsW;
        this._boundHandleError = (error) => fsW._handleError(error);
      }
      /**
       * Watch file for changes with fs_watchFile or fs_watch.
       * @param {String} path to file or dir
       * @param {Function} listener on fs change
       * @returns {Function} closer for the watcher instance
       */
      _watchWithNodeFs(path6, listener) {
        const opts = this.fsw.options;
        const directory = sysPath.dirname(path6);
        const basename = sysPath.basename(path6);
        const parent = this.fsw._getWatchedDir(directory);
        parent.add(basename);
        const absolutePath = sysPath.resolve(path6);
        const options = { persistent: opts.persistent };
        if (!listener) listener = EMPTY_FN;
        let closer;
        if (opts.usePolling) {
          options.interval = opts.enableBinaryInterval && isBinaryPath(basename) ? opts.binaryInterval : opts.interval;
          closer = setFsWatchFileListener(path6, absolutePath, options, {
            listener,
            rawEmitter: this.fsw._emitRaw
          });
        } else {
          closer = setFsWatchListener(path6, absolutePath, options, {
            listener,
            errHandler: this._boundHandleError,
            rawEmitter: this.fsw._emitRaw
          });
        }
        return closer;
      }
      /**
       * Watch a file and emit add event if warranted.
       * @param {Path} file Path
       * @param {fs.Stats} stats result of fs_stat
       * @param {Boolean} initialAdd was the file added at watch instantiation?
       * @returns {Function} closer for the watcher instance
       */
      _handleFile(file, stats, initialAdd) {
        if (this.fsw.closed) {
          return;
        }
        const dirname = sysPath.dirname(file);
        const basename = sysPath.basename(file);
        const parent = this.fsw._getWatchedDir(dirname);
        let prevStats = stats;
        if (parent.has(basename)) return;
        const listener = async (path6, newStats) => {
          if (!this.fsw._throttle(THROTTLE_MODE_WATCH, file, 5)) return;
          if (!newStats || newStats.mtimeMs === 0) {
            try {
              const newStats2 = await stat(file);
              if (this.fsw.closed) return;
              const at = newStats2.atimeMs;
              const mt = newStats2.mtimeMs;
              if (!at || at <= mt || mt !== prevStats.mtimeMs) {
                this.fsw._emit(EV_CHANGE, file, newStats2);
              }
              if (isLinux && prevStats.ino !== newStats2.ino) {
                this.fsw._closeFile(path6);
                prevStats = newStats2;
                this.fsw._addPathCloser(path6, this._watchWithNodeFs(file, listener));
              } else {
                prevStats = newStats2;
              }
            } catch (error) {
              this.fsw._remove(dirname, basename);
            }
          } else if (parent.has(basename)) {
            const at = newStats.atimeMs;
            const mt = newStats.mtimeMs;
            if (!at || at <= mt || mt !== prevStats.mtimeMs) {
              this.fsw._emit(EV_CHANGE, file, newStats);
            }
            prevStats = newStats;
          }
        };
        const closer = this._watchWithNodeFs(file, listener);
        if (!(initialAdd && this.fsw.options.ignoreInitial) && this.fsw._isntIgnored(file)) {
          if (!this.fsw._throttle(EV_ADD, file, 0)) return;
          this.fsw._emit(EV_ADD, file, stats);
        }
        return closer;
      }
      /**
       * Handle symlinks encountered while reading a dir.
       * @param {Object} entry returned by readdirp
       * @param {String} directory path of dir being read
       * @param {String} path of this item
       * @param {String} item basename of this item
       * @returns {Promise<Boolean>} true if no more processing is needed for this entry.
       */
      async _handleSymlink(entry, directory, path6, item) {
        if (this.fsw.closed) {
          return;
        }
        const full = entry.fullPath;
        const dir = this.fsw._getWatchedDir(directory);
        if (!this.fsw.options.followSymlinks) {
          this.fsw._incrReadyCount();
          let linkPath;
          try {
            linkPath = await fsrealpath(path6);
          } catch (e) {
            this.fsw._emitReady();
            return true;
          }
          if (this.fsw.closed) return;
          if (dir.has(item)) {
            if (this.fsw._symlinkPaths.get(full) !== linkPath) {
              this.fsw._symlinkPaths.set(full, linkPath);
              this.fsw._emit(EV_CHANGE, path6, entry.stats);
            }
          } else {
            dir.add(item);
            this.fsw._symlinkPaths.set(full, linkPath);
            this.fsw._emit(EV_ADD, path6, entry.stats);
          }
          this.fsw._emitReady();
          return true;
        }
        if (this.fsw._symlinkPaths.has(full)) {
          return true;
        }
        this.fsw._symlinkPaths.set(full, true);
      }
      _handleRead(directory, initialAdd, wh, target, dir, depth, throttler) {
        directory = sysPath.join(directory, EMPTY_STR);
        if (!wh.hasGlob) {
          throttler = this.fsw._throttle("readdir", directory, 1e3);
          if (!throttler) return;
        }
        const previous = this.fsw._getWatchedDir(wh.path);
        const current = /* @__PURE__ */ new Set();
        let stream = this.fsw._readdirp(directory, {
          fileFilter: (entry) => wh.filterPath(entry),
          directoryFilter: (entry) => wh.filterDir(entry),
          depth: 0
        }).on(STR_DATA, async (entry) => {
          if (this.fsw.closed) {
            stream = void 0;
            return;
          }
          const item = entry.path;
          let path6 = sysPath.join(directory, item);
          current.add(item);
          if (entry.stats.isSymbolicLink() && await this._handleSymlink(entry, directory, path6, item)) {
            return;
          }
          if (this.fsw.closed) {
            stream = void 0;
            return;
          }
          if (item === target || !target && !previous.has(item)) {
            this.fsw._incrReadyCount();
            path6 = sysPath.join(dir, sysPath.relative(dir, path6));
            this._addToNodeFs(path6, initialAdd, wh, depth + 1);
          }
        }).on(EV_ERROR, this._boundHandleError);
        return new Promise(
          (resolve) => stream.once(STR_END, () => {
            if (this.fsw.closed) {
              stream = void 0;
              return;
            }
            const wasThrottled = throttler ? throttler.clear() : false;
            resolve();
            previous.getChildren().filter((item) => {
              return item !== directory && !current.has(item) && // in case of intersecting globs;
              // a path may have been filtered out of this readdir, but
              // shouldn't be removed because it matches a different glob
              (!wh.hasGlob || wh.filterPath({
                fullPath: sysPath.resolve(directory, item)
              }));
            }).forEach((item) => {
              this.fsw._remove(directory, item);
            });
            stream = void 0;
            if (wasThrottled) this._handleRead(directory, false, wh, target, dir, depth, throttler);
          })
        );
      }
      /**
       * Read directory to add / remove files from `@watched` list and re-read it on change.
       * @param {String} dir fs path
       * @param {fs.Stats} stats
       * @param {Boolean} initialAdd
       * @param {Number} depth relative to user-supplied path
       * @param {String} target child path targeted for watch
       * @param {Object} wh Common watch helpers for this path
       * @param {String} realpath
       * @returns {Promise<Function>} closer for the watcher instance.
       */
      async _handleDir(dir, stats, initialAdd, depth, target, wh, realpath) {
        const parentDir = this.fsw._getWatchedDir(sysPath.dirname(dir));
        const tracked = parentDir.has(sysPath.basename(dir));
        if (!(initialAdd && this.fsw.options.ignoreInitial) && !target && !tracked) {
          if (!wh.hasGlob || wh.globFilter(dir)) this.fsw._emit(EV_ADD_DIR, dir, stats);
        }
        parentDir.add(sysPath.basename(dir));
        this.fsw._getWatchedDir(dir);
        let throttler;
        let closer;
        const oDepth = this.fsw.options.depth;
        if ((oDepth == null || depth <= oDepth) && !this.fsw._symlinkPaths.has(realpath)) {
          if (!target) {
            await this._handleRead(dir, initialAdd, wh, target, dir, depth, throttler);
            if (this.fsw.closed) return;
          }
          closer = this._watchWithNodeFs(dir, (dirPath, stats2) => {
            if (stats2 && stats2.mtimeMs === 0) return;
            this._handleRead(dirPath, false, wh, target, dir, depth, throttler);
          });
        }
        return closer;
      }
      /**
       * Handle added file, directory, or glob pattern.
       * Delegates call to _handleFile / _handleDir after checks.
       * @param {String} path to file or ir
       * @param {Boolean} initialAdd was the file added at watch instantiation?
       * @param {Object} priorWh depth relative to user-supplied path
       * @param {Number} depth Child path actually targeted for watch
       * @param {String=} target Child path actually targeted for watch
       * @returns {Promise}
       */
      async _addToNodeFs(path6, initialAdd, priorWh, depth, target) {
        const ready = this.fsw._emitReady;
        if (this.fsw._isIgnored(path6) || this.fsw.closed) {
          ready();
          return false;
        }
        const wh = this.fsw._getWatchHelpers(path6, depth);
        if (!wh.hasGlob && priorWh) {
          wh.hasGlob = priorWh.hasGlob;
          wh.globFilter = priorWh.globFilter;
          wh.filterPath = (entry) => priorWh.filterPath(entry);
          wh.filterDir = (entry) => priorWh.filterDir(entry);
        }
        try {
          const stats = await statMethods[wh.statMethod](wh.watchPath);
          if (this.fsw.closed) return;
          if (this.fsw._isIgnored(wh.watchPath, stats)) {
            ready();
            return false;
          }
          const follow = this.fsw.options.followSymlinks && !path6.includes(STAR) && !path6.includes(BRACE_START);
          let closer;
          if (stats.isDirectory()) {
            const absPath = sysPath.resolve(path6);
            const targetPath = follow ? await fsrealpath(path6) : path6;
            if (this.fsw.closed) return;
            closer = await this._handleDir(wh.watchPath, stats, initialAdd, depth, target, wh, targetPath);
            if (this.fsw.closed) return;
            if (absPath !== targetPath && targetPath !== void 0) {
              this.fsw._symlinkPaths.set(absPath, targetPath);
            }
          } else if (stats.isSymbolicLink()) {
            const targetPath = follow ? await fsrealpath(path6) : path6;
            if (this.fsw.closed) return;
            const parent = sysPath.dirname(wh.watchPath);
            this.fsw._getWatchedDir(parent).add(wh.watchPath);
            this.fsw._emit(EV_ADD, wh.watchPath, stats);
            closer = await this._handleDir(parent, stats, initialAdd, depth, path6, wh, targetPath);
            if (this.fsw.closed) return;
            if (targetPath !== void 0) {
              this.fsw._symlinkPaths.set(sysPath.resolve(path6), targetPath);
            }
          } else {
            closer = this._handleFile(wh.watchPath, stats, initialAdd);
          }
          ready();
          this.fsw._addPathCloser(path6, closer);
          return false;
        } catch (error) {
          if (this.fsw._handleError(error)) {
            ready();
            return path6;
          }
        }
      }
    };
    module2.exports = NodeFsHandler;
  }
});

// node_modules/.pnpm/chokidar@3.6.0/node_modules/chokidar/lib/fsevents-handler.js
var require_fsevents_handler = __commonJS({
  "node_modules/.pnpm/chokidar@3.6.0/node_modules/chokidar/lib/fsevents-handler.js"(exports2, module2) {
    "use strict";
    var fs5 = require("fs");
    var sysPath = require("path");
    var { promisify: promisify2 } = require("util");
    var fsevents;
    try {
      fsevents = require("fsevents");
    } catch (error) {
      if (process.env.CHOKIDAR_PRINT_FSEVENTS_REQUIRE_ERROR) console.error(error);
    }
    if (fsevents) {
      const mtch = process.version.match(/v(\d+)\.(\d+)/);
      if (mtch && mtch[1] && mtch[2]) {
        const maj = Number.parseInt(mtch[1], 10);
        const min = Number.parseInt(mtch[2], 10);
        if (maj === 8 && min < 16) {
          fsevents = void 0;
        }
      }
    }
    var {
      EV_ADD,
      EV_CHANGE,
      EV_ADD_DIR,
      EV_UNLINK,
      EV_ERROR,
      STR_DATA,
      STR_END,
      FSEVENT_CREATED,
      FSEVENT_MODIFIED,
      FSEVENT_DELETED,
      FSEVENT_MOVED,
      // FSEVENT_CLONED,
      FSEVENT_UNKNOWN,
      FSEVENT_FLAG_MUST_SCAN_SUBDIRS,
      FSEVENT_TYPE_FILE,
      FSEVENT_TYPE_DIRECTORY,
      FSEVENT_TYPE_SYMLINK,
      ROOT_GLOBSTAR,
      DIR_SUFFIX,
      DOT_SLASH,
      FUNCTION_TYPE,
      EMPTY_FN,
      IDENTITY_FN
    } = require_constants3();
    var Depth = (value) => isNaN(value) ? {} : { depth: value };
    var stat = promisify2(fs5.stat);
    var lstat = promisify2(fs5.lstat);
    var realpath = promisify2(fs5.realpath);
    var statMethods = { stat, lstat };
    var FSEventsWatchers = /* @__PURE__ */ new Map();
    var consolidateThreshhold = 10;
    var wrongEventFlags = /* @__PURE__ */ new Set([
      69888,
      70400,
      71424,
      72704,
      73472,
      131328,
      131840,
      262912
    ]);
    var createFSEventsInstance = (path6, callback) => {
      const stop = fsevents.watch(path6, callback);
      return { stop };
    };
    function setFSEventsListener(path6, realPath, listener, rawEmitter) {
      let watchPath = sysPath.extname(realPath) ? sysPath.dirname(realPath) : realPath;
      const parentPath = sysPath.dirname(watchPath);
      let cont = FSEventsWatchers.get(watchPath);
      if (couldConsolidate(parentPath)) {
        watchPath = parentPath;
      }
      const resolvedPath = sysPath.resolve(path6);
      const hasSymlink = resolvedPath !== realPath;
      const filteredListener = (fullPath, flags, info) => {
        if (hasSymlink) fullPath = fullPath.replace(realPath, resolvedPath);
        if (fullPath === resolvedPath || !fullPath.indexOf(resolvedPath + sysPath.sep)) listener(fullPath, flags, info);
      };
      let watchedParent = false;
      for (const watchedPath of FSEventsWatchers.keys()) {
        if (realPath.indexOf(sysPath.resolve(watchedPath) + sysPath.sep) === 0) {
          watchPath = watchedPath;
          cont = FSEventsWatchers.get(watchPath);
          watchedParent = true;
          break;
        }
      }
      if (cont || watchedParent) {
        cont.listeners.add(filteredListener);
      } else {
        cont = {
          listeners: /* @__PURE__ */ new Set([filteredListener]),
          rawEmitter,
          watcher: createFSEventsInstance(watchPath, (fullPath, flags) => {
            if (!cont.listeners.size) return;
            if (flags & FSEVENT_FLAG_MUST_SCAN_SUBDIRS) return;
            const info = fsevents.getInfo(fullPath, flags);
            cont.listeners.forEach((list) => {
              list(fullPath, flags, info);
            });
            cont.rawEmitter(info.event, fullPath, info);
          })
        };
        FSEventsWatchers.set(watchPath, cont);
      }
      return () => {
        const lst = cont.listeners;
        lst.delete(filteredListener);
        if (!lst.size) {
          FSEventsWatchers.delete(watchPath);
          if (cont.watcher) return cont.watcher.stop().then(() => {
            cont.rawEmitter = cont.watcher = void 0;
            Object.freeze(cont);
          });
        }
      };
    }
    var couldConsolidate = (path6) => {
      let count = 0;
      for (const watchPath of FSEventsWatchers.keys()) {
        if (watchPath.indexOf(path6) === 0) {
          count++;
          if (count >= consolidateThreshhold) {
            return true;
          }
        }
      }
      return false;
    };
    var canUse = () => fsevents && FSEventsWatchers.size < 128;
    var calcDepth = (path6, root) => {
      let i = 0;
      while (!path6.indexOf(root) && (path6 = sysPath.dirname(path6)) !== root) i++;
      return i;
    };
    var sameTypes = (info, stats) => info.type === FSEVENT_TYPE_DIRECTORY && stats.isDirectory() || info.type === FSEVENT_TYPE_SYMLINK && stats.isSymbolicLink() || info.type === FSEVENT_TYPE_FILE && stats.isFile();
    var FsEventsHandler = class {
      /**
       * @param {import('../index').FSWatcher} fsw
       */
      constructor(fsw) {
        this.fsw = fsw;
      }
      checkIgnored(path6, stats) {
        const ipaths = this.fsw._ignoredPaths;
        if (this.fsw._isIgnored(path6, stats)) {
          ipaths.add(path6);
          if (stats && stats.isDirectory()) {
            ipaths.add(path6 + ROOT_GLOBSTAR);
          }
          return true;
        }
        ipaths.delete(path6);
        ipaths.delete(path6 + ROOT_GLOBSTAR);
      }
      addOrChange(path6, fullPath, realPath, parent, watchedDir, item, info, opts) {
        const event = watchedDir.has(item) ? EV_CHANGE : EV_ADD;
        this.handleEvent(event, path6, fullPath, realPath, parent, watchedDir, item, info, opts);
      }
      async checkExists(path6, fullPath, realPath, parent, watchedDir, item, info, opts) {
        try {
          const stats = await stat(path6);
          if (this.fsw.closed) return;
          if (sameTypes(info, stats)) {
            this.addOrChange(path6, fullPath, realPath, parent, watchedDir, item, info, opts);
          } else {
            this.handleEvent(EV_UNLINK, path6, fullPath, realPath, parent, watchedDir, item, info, opts);
          }
        } catch (error) {
          if (error.code === "EACCES") {
            this.addOrChange(path6, fullPath, realPath, parent, watchedDir, item, info, opts);
          } else {
            this.handleEvent(EV_UNLINK, path6, fullPath, realPath, parent, watchedDir, item, info, opts);
          }
        }
      }
      handleEvent(event, path6, fullPath, realPath, parent, watchedDir, item, info, opts) {
        if (this.fsw.closed || this.checkIgnored(path6)) return;
        if (event === EV_UNLINK) {
          const isDirectory = info.type === FSEVENT_TYPE_DIRECTORY;
          if (isDirectory || watchedDir.has(item)) {
            this.fsw._remove(parent, item, isDirectory);
          }
        } else {
          if (event === EV_ADD) {
            if (info.type === FSEVENT_TYPE_DIRECTORY) this.fsw._getWatchedDir(path6);
            if (info.type === FSEVENT_TYPE_SYMLINK && opts.followSymlinks) {
              const curDepth = opts.depth === void 0 ? void 0 : calcDepth(fullPath, realPath) + 1;
              return this._addToFsEvents(path6, false, true, curDepth);
            }
            this.fsw._getWatchedDir(parent).add(item);
          }
          const eventName = info.type === FSEVENT_TYPE_DIRECTORY ? event + DIR_SUFFIX : event;
          this.fsw._emit(eventName, path6);
          if (eventName === EV_ADD_DIR) this._addToFsEvents(path6, false, true);
        }
      }
      /**
       * Handle symlinks encountered during directory scan
       * @param {String} watchPath  - file/dir path to be watched with fsevents
       * @param {String} realPath   - real path (in case of symlinks)
       * @param {Function} transform  - path transformer
       * @param {Function} globFilter - path filter in case a glob pattern was provided
       * @returns {Function} closer for the watcher instance
      */
      _watchWithFsEvents(watchPath, realPath, transform, globFilter) {
        if (this.fsw.closed || this.fsw._isIgnored(watchPath)) return;
        const opts = this.fsw.options;
        const watchCallback = async (fullPath, flags, info) => {
          if (this.fsw.closed) return;
          if (opts.depth !== void 0 && calcDepth(fullPath, realPath) > opts.depth) return;
          const path6 = transform(sysPath.join(
            watchPath,
            sysPath.relative(watchPath, fullPath)
          ));
          if (globFilter && !globFilter(path6)) return;
          const parent = sysPath.dirname(path6);
          const item = sysPath.basename(path6);
          const watchedDir = this.fsw._getWatchedDir(
            info.type === FSEVENT_TYPE_DIRECTORY ? path6 : parent
          );
          if (wrongEventFlags.has(flags) || info.event === FSEVENT_UNKNOWN) {
            if (typeof opts.ignored === FUNCTION_TYPE) {
              let stats;
              try {
                stats = await stat(path6);
              } catch (error) {
              }
              if (this.fsw.closed) return;
              if (this.checkIgnored(path6, stats)) return;
              if (sameTypes(info, stats)) {
                this.addOrChange(path6, fullPath, realPath, parent, watchedDir, item, info, opts);
              } else {
                this.handleEvent(EV_UNLINK, path6, fullPath, realPath, parent, watchedDir, item, info, opts);
              }
            } else {
              this.checkExists(path6, fullPath, realPath, parent, watchedDir, item, info, opts);
            }
          } else {
            switch (info.event) {
              case FSEVENT_CREATED:
              case FSEVENT_MODIFIED:
                return this.addOrChange(path6, fullPath, realPath, parent, watchedDir, item, info, opts);
              case FSEVENT_DELETED:
              case FSEVENT_MOVED:
                return this.checkExists(path6, fullPath, realPath, parent, watchedDir, item, info, opts);
            }
          }
        };
        const closer = setFSEventsListener(
          watchPath,
          realPath,
          watchCallback,
          this.fsw._emitRaw
        );
        this.fsw._emitReady();
        return closer;
      }
      /**
       * Handle symlinks encountered during directory scan
       * @param {String} linkPath path to symlink
       * @param {String} fullPath absolute path to the symlink
       * @param {Function} transform pre-existing path transformer
       * @param {Number} curDepth level of subdirectories traversed to where symlink is
       * @returns {Promise<void>}
       */
      async _handleFsEventsSymlink(linkPath, fullPath, transform, curDepth) {
        if (this.fsw.closed || this.fsw._symlinkPaths.has(fullPath)) return;
        this.fsw._symlinkPaths.set(fullPath, true);
        this.fsw._incrReadyCount();
        try {
          const linkTarget = await realpath(linkPath);
          if (this.fsw.closed) return;
          if (this.fsw._isIgnored(linkTarget)) {
            return this.fsw._emitReady();
          }
          this.fsw._incrReadyCount();
          this._addToFsEvents(linkTarget || linkPath, (path6) => {
            let aliasedPath = linkPath;
            if (linkTarget && linkTarget !== DOT_SLASH) {
              aliasedPath = path6.replace(linkTarget, linkPath);
            } else if (path6 !== DOT_SLASH) {
              aliasedPath = sysPath.join(linkPath, path6);
            }
            return transform(aliasedPath);
          }, false, curDepth);
        } catch (error) {
          if (this.fsw._handleError(error)) {
            return this.fsw._emitReady();
          }
        }
      }
      /**
       *
       * @param {Path} newPath
       * @param {fs.Stats} stats
       */
      emitAdd(newPath, stats, processPath, opts, forceAdd) {
        const pp = processPath(newPath);
        const isDir = stats.isDirectory();
        const dirObj = this.fsw._getWatchedDir(sysPath.dirname(pp));
        const base = sysPath.basename(pp);
        if (isDir) this.fsw._getWatchedDir(pp);
        if (dirObj.has(base)) return;
        dirObj.add(base);
        if (!opts.ignoreInitial || forceAdd === true) {
          this.fsw._emit(isDir ? EV_ADD_DIR : EV_ADD, pp, stats);
        }
      }
      initWatch(realPath, path6, wh, processPath) {
        if (this.fsw.closed) return;
        const closer = this._watchWithFsEvents(
          wh.watchPath,
          sysPath.resolve(realPath || wh.watchPath),
          processPath,
          wh.globFilter
        );
        this.fsw._addPathCloser(path6, closer);
      }
      /**
       * Handle added path with fsevents
       * @param {String} path file/dir path or glob pattern
       * @param {Function|Boolean=} transform converts working path to what the user expects
       * @param {Boolean=} forceAdd ensure add is emitted
       * @param {Number=} priorDepth Level of subdirectories already traversed.
       * @returns {Promise<void>}
       */
      async _addToFsEvents(path6, transform, forceAdd, priorDepth) {
        if (this.fsw.closed) {
          return;
        }
        const opts = this.fsw.options;
        const processPath = typeof transform === FUNCTION_TYPE ? transform : IDENTITY_FN;
        const wh = this.fsw._getWatchHelpers(path6);
        try {
          const stats = await statMethods[wh.statMethod](wh.watchPath);
          if (this.fsw.closed) return;
          if (this.fsw._isIgnored(wh.watchPath, stats)) {
            throw null;
          }
          if (stats.isDirectory()) {
            if (!wh.globFilter) this.emitAdd(processPath(path6), stats, processPath, opts, forceAdd);
            if (priorDepth && priorDepth > opts.depth) return;
            this.fsw._readdirp(wh.watchPath, {
              fileFilter: (entry) => wh.filterPath(entry),
              directoryFilter: (entry) => wh.filterDir(entry),
              ...Depth(opts.depth - (priorDepth || 0))
            }).on(STR_DATA, (entry) => {
              if (this.fsw.closed) {
                return;
              }
              if (entry.stats.isDirectory() && !wh.filterPath(entry)) return;
              const joinedPath = sysPath.join(wh.watchPath, entry.path);
              const { fullPath } = entry;
              if (wh.followSymlinks && entry.stats.isSymbolicLink()) {
                const curDepth = opts.depth === void 0 ? void 0 : calcDepth(joinedPath, sysPath.resolve(wh.watchPath)) + 1;
                this._handleFsEventsSymlink(joinedPath, fullPath, processPath, curDepth);
              } else {
                this.emitAdd(joinedPath, entry.stats, processPath, opts, forceAdd);
              }
            }).on(EV_ERROR, EMPTY_FN).on(STR_END, () => {
              this.fsw._emitReady();
            });
          } else {
            this.emitAdd(wh.watchPath, stats, processPath, opts, forceAdd);
            this.fsw._emitReady();
          }
        } catch (error) {
          if (!error || this.fsw._handleError(error)) {
            this.fsw._emitReady();
            this.fsw._emitReady();
          }
        }
        if (opts.persistent && forceAdd !== true) {
          if (typeof transform === FUNCTION_TYPE) {
            this.initWatch(void 0, path6, wh, processPath);
          } else {
            let realPath;
            try {
              realPath = await realpath(wh.watchPath);
            } catch (e) {
            }
            this.initWatch(realPath, path6, wh, processPath);
          }
        }
      }
    };
    module2.exports = FsEventsHandler;
    module2.exports.canUse = canUse;
  }
});

// node_modules/.pnpm/chokidar@3.6.0/node_modules/chokidar/index.js
var require_chokidar = __commonJS({
  "node_modules/.pnpm/chokidar@3.6.0/node_modules/chokidar/index.js"(exports2) {
    "use strict";
    var { EventEmitter } = require("events");
    var fs5 = require("fs");
    var sysPath = require("path");
    var { promisify: promisify2 } = require("util");
    var readdirp = require_readdirp();
    var anymatch = require_anymatch().default;
    var globParent = require_glob_parent();
    var isGlob = require_is_glob();
    var braces = require_braces();
    var normalizePath = require_normalize_path();
    var NodeFsHandler = require_nodefs_handler();
    var FsEventsHandler = require_fsevents_handler();
    var {
      EV_ALL,
      EV_READY,
      EV_ADD,
      EV_CHANGE,
      EV_UNLINK,
      EV_ADD_DIR,
      EV_UNLINK_DIR,
      EV_RAW,
      EV_ERROR,
      STR_CLOSE,
      STR_END,
      BACK_SLASH_RE,
      DOUBLE_SLASH_RE,
      SLASH_OR_BACK_SLASH_RE,
      DOT_RE,
      REPLACER_RE,
      SLASH,
      SLASH_SLASH,
      BRACE_START,
      BANG,
      ONE_DOT,
      TWO_DOTS,
      GLOBSTAR,
      SLASH_GLOBSTAR,
      ANYMATCH_OPTS,
      STRING_TYPE,
      FUNCTION_TYPE,
      EMPTY_STR,
      EMPTY_FN,
      isWindows,
      isMacos,
      isIBMi
    } = require_constants3();
    var stat = promisify2(fs5.stat);
    var readdir = promisify2(fs5.readdir);
    var arrify = (value = []) => Array.isArray(value) ? value : [value];
    var flatten = (list, result = []) => {
      list.forEach((item) => {
        if (Array.isArray(item)) {
          flatten(item, result);
        } else {
          result.push(item);
        }
      });
      return result;
    };
    var unifyPaths = (paths_) => {
      const paths = flatten(arrify(paths_));
      if (!paths.every((p) => typeof p === STRING_TYPE)) {
        throw new TypeError(`Non-string provided as watch path: ${paths}`);
      }
      return paths.map(normalizePathToUnix);
    };
    var toUnix = (string) => {
      let str = string.replace(BACK_SLASH_RE, SLASH);
      let prepend = false;
      if (str.startsWith(SLASH_SLASH)) {
        prepend = true;
      }
      while (str.match(DOUBLE_SLASH_RE)) {
        str = str.replace(DOUBLE_SLASH_RE, SLASH);
      }
      if (prepend) {
        str = SLASH + str;
      }
      return str;
    };
    var normalizePathToUnix = (path6) => toUnix(sysPath.normalize(toUnix(path6)));
    var normalizeIgnored = (cwd = EMPTY_STR) => (path6) => {
      if (typeof path6 !== STRING_TYPE) return path6;
      return normalizePathToUnix(sysPath.isAbsolute(path6) ? path6 : sysPath.join(cwd, path6));
    };
    var getAbsolutePath = (path6, cwd) => {
      if (sysPath.isAbsolute(path6)) {
        return path6;
      }
      if (path6.startsWith(BANG)) {
        return BANG + sysPath.join(cwd, path6.slice(1));
      }
      return sysPath.join(cwd, path6);
    };
    var undef = (opts, key) => opts[key] === void 0;
    var DirEntry = class {
      /**
       * @param {Path} dir
       * @param {Function} removeWatcher
       */
      constructor(dir, removeWatcher) {
        this.path = dir;
        this._removeWatcher = removeWatcher;
        this.items = /* @__PURE__ */ new Set();
      }
      add(item) {
        const { items } = this;
        if (!items) return;
        if (item !== ONE_DOT && item !== TWO_DOTS) items.add(item);
      }
      async remove(item) {
        const { items } = this;
        if (!items) return;
        items.delete(item);
        if (items.size > 0) return;
        const dir = this.path;
        try {
          await readdir(dir);
        } catch (err) {
          if (this._removeWatcher) {
            this._removeWatcher(sysPath.dirname(dir), sysPath.basename(dir));
          }
        }
      }
      has(item) {
        const { items } = this;
        if (!items) return;
        return items.has(item);
      }
      /**
       * @returns {Array<String>}
       */
      getChildren() {
        const { items } = this;
        if (!items) return;
        return [...items.values()];
      }
      dispose() {
        this.items.clear();
        delete this.path;
        delete this._removeWatcher;
        delete this.items;
        Object.freeze(this);
      }
    };
    var STAT_METHOD_F = "stat";
    var STAT_METHOD_L = "lstat";
    var WatchHelper = class {
      constructor(path6, watchPath, follow, fsw) {
        this.fsw = fsw;
        this.path = path6 = path6.replace(REPLACER_RE, EMPTY_STR);
        this.watchPath = watchPath;
        this.fullWatchPath = sysPath.resolve(watchPath);
        this.hasGlob = watchPath !== path6;
        if (path6 === EMPTY_STR) this.hasGlob = false;
        this.globSymlink = this.hasGlob && follow ? void 0 : false;
        this.globFilter = this.hasGlob ? anymatch(path6, void 0, ANYMATCH_OPTS) : false;
        this.dirParts = this.getDirParts(path6);
        this.dirParts.forEach((parts) => {
          if (parts.length > 1) parts.pop();
        });
        this.followSymlinks = follow;
        this.statMethod = follow ? STAT_METHOD_F : STAT_METHOD_L;
      }
      checkGlobSymlink(entry) {
        if (this.globSymlink === void 0) {
          this.globSymlink = entry.fullParentDir === this.fullWatchPath ? false : { realPath: entry.fullParentDir, linkPath: this.fullWatchPath };
        }
        if (this.globSymlink) {
          return entry.fullPath.replace(this.globSymlink.realPath, this.globSymlink.linkPath);
        }
        return entry.fullPath;
      }
      entryPath(entry) {
        return sysPath.join(
          this.watchPath,
          sysPath.relative(this.watchPath, this.checkGlobSymlink(entry))
        );
      }
      filterPath(entry) {
        const { stats } = entry;
        if (stats && stats.isSymbolicLink()) return this.filterDir(entry);
        const resolvedPath = this.entryPath(entry);
        const matchesGlob = this.hasGlob && typeof this.globFilter === FUNCTION_TYPE ? this.globFilter(resolvedPath) : true;
        return matchesGlob && this.fsw._isntIgnored(resolvedPath, stats) && this.fsw._hasReadPermissions(stats);
      }
      getDirParts(path6) {
        if (!this.hasGlob) return [];
        const parts = [];
        const expandedPath = path6.includes(BRACE_START) ? braces.expand(path6) : [path6];
        expandedPath.forEach((path7) => {
          parts.push(sysPath.relative(this.watchPath, path7).split(SLASH_OR_BACK_SLASH_RE));
        });
        return parts;
      }
      filterDir(entry) {
        if (this.hasGlob) {
          const entryParts = this.getDirParts(this.checkGlobSymlink(entry));
          let globstar = false;
          this.unmatchedGlob = !this.dirParts.some((parts) => {
            return parts.every((part, i) => {
              if (part === GLOBSTAR) globstar = true;
              return globstar || !entryParts[0][i] || anymatch(part, entryParts[0][i], ANYMATCH_OPTS);
            });
          });
        }
        return !this.unmatchedGlob && this.fsw._isntIgnored(this.entryPath(entry), entry.stats);
      }
    };
    var FSWatcher2 = class extends EventEmitter {
      // Not indenting methods for history sake; for now.
      constructor(_opts) {
        super();
        const opts = {};
        if (_opts) Object.assign(opts, _opts);
        this._watched = /* @__PURE__ */ new Map();
        this._closers = /* @__PURE__ */ new Map();
        this._ignoredPaths = /* @__PURE__ */ new Set();
        this._throttled = /* @__PURE__ */ new Map();
        this._symlinkPaths = /* @__PURE__ */ new Map();
        this._streams = /* @__PURE__ */ new Set();
        this.closed = false;
        if (undef(opts, "persistent")) opts.persistent = true;
        if (undef(opts, "ignoreInitial")) opts.ignoreInitial = false;
        if (undef(opts, "ignorePermissionErrors")) opts.ignorePermissionErrors = false;
        if (undef(opts, "interval")) opts.interval = 100;
        if (undef(opts, "binaryInterval")) opts.binaryInterval = 300;
        if (undef(opts, "disableGlobbing")) opts.disableGlobbing = false;
        opts.enableBinaryInterval = opts.binaryInterval !== opts.interval;
        if (undef(opts, "useFsEvents")) opts.useFsEvents = !opts.usePolling;
        const canUseFsEvents = FsEventsHandler.canUse();
        if (!canUseFsEvents) opts.useFsEvents = false;
        if (undef(opts, "usePolling") && !opts.useFsEvents) {
          opts.usePolling = isMacos;
        }
        if (isIBMi) {
          opts.usePolling = true;
        }
        const envPoll = process.env.CHOKIDAR_USEPOLLING;
        if (envPoll !== void 0) {
          const envLower = envPoll.toLowerCase();
          if (envLower === "false" || envLower === "0") {
            opts.usePolling = false;
          } else if (envLower === "true" || envLower === "1") {
            opts.usePolling = true;
          } else {
            opts.usePolling = !!envLower;
          }
        }
        const envInterval = process.env.CHOKIDAR_INTERVAL;
        if (envInterval) {
          opts.interval = Number.parseInt(envInterval, 10);
        }
        if (undef(opts, "atomic")) opts.atomic = !opts.usePolling && !opts.useFsEvents;
        if (opts.atomic) this._pendingUnlinks = /* @__PURE__ */ new Map();
        if (undef(opts, "followSymlinks")) opts.followSymlinks = true;
        if (undef(opts, "awaitWriteFinish")) opts.awaitWriteFinish = false;
        if (opts.awaitWriteFinish === true) opts.awaitWriteFinish = {};
        const awf = opts.awaitWriteFinish;
        if (awf) {
          if (!awf.stabilityThreshold) awf.stabilityThreshold = 2e3;
          if (!awf.pollInterval) awf.pollInterval = 100;
          this._pendingWrites = /* @__PURE__ */ new Map();
        }
        if (opts.ignored) opts.ignored = arrify(opts.ignored);
        let readyCalls = 0;
        this._emitReady = () => {
          readyCalls++;
          if (readyCalls >= this._readyCount) {
            this._emitReady = EMPTY_FN;
            this._readyEmitted = true;
            process.nextTick(() => this.emit(EV_READY));
          }
        };
        this._emitRaw = (...args) => this.emit(EV_RAW, ...args);
        this._readyEmitted = false;
        this.options = opts;
        if (opts.useFsEvents) {
          this._fsEventsHandler = new FsEventsHandler(this);
        } else {
          this._nodeFsHandler = new NodeFsHandler(this);
        }
        Object.freeze(opts);
      }
      // Public methods
      /**
       * Adds paths to be watched on an existing FSWatcher instance
       * @param {Path|Array<Path>} paths_
       * @param {String=} _origAdd private; for handling non-existent paths to be watched
       * @param {Boolean=} _internal private; indicates a non-user add
       * @returns {FSWatcher} for chaining
       */
      add(paths_, _origAdd, _internal) {
        const { cwd, disableGlobbing } = this.options;
        this.closed = false;
        let paths = unifyPaths(paths_);
        if (cwd) {
          paths = paths.map((path6) => {
            const absPath = getAbsolutePath(path6, cwd);
            if (disableGlobbing || !isGlob(path6)) {
              return absPath;
            }
            return normalizePath(absPath);
          });
        }
        paths = paths.filter((path6) => {
          if (path6.startsWith(BANG)) {
            this._ignoredPaths.add(path6.slice(1));
            return false;
          }
          this._ignoredPaths.delete(path6);
          this._ignoredPaths.delete(path6 + SLASH_GLOBSTAR);
          this._userIgnored = void 0;
          return true;
        });
        if (this.options.useFsEvents && this._fsEventsHandler) {
          if (!this._readyCount) this._readyCount = paths.length;
          if (this.options.persistent) this._readyCount += paths.length;
          paths.forEach((path6) => this._fsEventsHandler._addToFsEvents(path6));
        } else {
          if (!this._readyCount) this._readyCount = 0;
          this._readyCount += paths.length;
          Promise.all(
            paths.map(async (path6) => {
              const res = await this._nodeFsHandler._addToNodeFs(path6, !_internal, 0, 0, _origAdd);
              if (res) this._emitReady();
              return res;
            })
          ).then((results) => {
            if (this.closed) return;
            results.filter((item) => item).forEach((item) => {
              this.add(sysPath.dirname(item), sysPath.basename(_origAdd || item));
            });
          });
        }
        return this;
      }
      /**
       * Close watchers or start ignoring events from specified paths.
       * @param {Path|Array<Path>} paths_ - string or array of strings, file/directory paths and/or globs
       * @returns {FSWatcher} for chaining
      */
      unwatch(paths_) {
        if (this.closed) return this;
        const paths = unifyPaths(paths_);
        const { cwd } = this.options;
        paths.forEach((path6) => {
          if (!sysPath.isAbsolute(path6) && !this._closers.has(path6)) {
            if (cwd) path6 = sysPath.join(cwd, path6);
            path6 = sysPath.resolve(path6);
          }
          this._closePath(path6);
          this._ignoredPaths.add(path6);
          if (this._watched.has(path6)) {
            this._ignoredPaths.add(path6 + SLASH_GLOBSTAR);
          }
          this._userIgnored = void 0;
        });
        return this;
      }
      /**
       * Close watchers and remove all listeners from watched paths.
       * @returns {Promise<void>}.
      */
      close() {
        if (this.closed) return this._closePromise;
        this.closed = true;
        this.removeAllListeners();
        const closers = [];
        this._closers.forEach((closerList) => closerList.forEach((closer) => {
          const promise = closer();
          if (promise instanceof Promise) closers.push(promise);
        }));
        this._streams.forEach((stream) => stream.destroy());
        this._userIgnored = void 0;
        this._readyCount = 0;
        this._readyEmitted = false;
        this._watched.forEach((dirent) => dirent.dispose());
        ["closers", "watched", "streams", "symlinkPaths", "throttled"].forEach((key) => {
          this[`_${key}`].clear();
        });
        this._closePromise = closers.length ? Promise.all(closers).then(() => void 0) : Promise.resolve();
        return this._closePromise;
      }
      /**
       * Expose list of watched paths
       * @returns {Object} for chaining
      */
      getWatched() {
        const watchList = {};
        this._watched.forEach((entry, dir) => {
          const key = this.options.cwd ? sysPath.relative(this.options.cwd, dir) : dir;
          watchList[key || ONE_DOT] = entry.getChildren().sort();
        });
        return watchList;
      }
      emitWithAll(event, args) {
        this.emit(...args);
        if (event !== EV_ERROR) this.emit(EV_ALL, ...args);
      }
      // Common helpers
      // --------------
      /**
       * Normalize and emit events.
       * Calling _emit DOES NOT MEAN emit() would be called!
       * @param {EventName} event Type of event
       * @param {Path} path File or directory path
       * @param {*=} val1 arguments to be passed with event
       * @param {*=} val2
       * @param {*=} val3
       * @returns the error if defined, otherwise the value of the FSWatcher instance's `closed` flag
       */
      async _emit(event, path6, val1, val2, val3) {
        if (this.closed) return;
        const opts = this.options;
        if (isWindows) path6 = sysPath.normalize(path6);
        if (opts.cwd) path6 = sysPath.relative(opts.cwd, path6);
        const args = [event, path6];
        if (val3 !== void 0) args.push(val1, val2, val3);
        else if (val2 !== void 0) args.push(val1, val2);
        else if (val1 !== void 0) args.push(val1);
        const awf = opts.awaitWriteFinish;
        let pw;
        if (awf && (pw = this._pendingWrites.get(path6))) {
          pw.lastChange = /* @__PURE__ */ new Date();
          return this;
        }
        if (opts.atomic) {
          if (event === EV_UNLINK) {
            this._pendingUnlinks.set(path6, args);
            setTimeout(() => {
              this._pendingUnlinks.forEach((entry, path7) => {
                this.emit(...entry);
                this.emit(EV_ALL, ...entry);
                this._pendingUnlinks.delete(path7);
              });
            }, typeof opts.atomic === "number" ? opts.atomic : 100);
            return this;
          }
          if (event === EV_ADD && this._pendingUnlinks.has(path6)) {
            event = args[0] = EV_CHANGE;
            this._pendingUnlinks.delete(path6);
          }
        }
        if (awf && (event === EV_ADD || event === EV_CHANGE) && this._readyEmitted) {
          const awfEmit = (err, stats) => {
            if (err) {
              event = args[0] = EV_ERROR;
              args[1] = err;
              this.emitWithAll(event, args);
            } else if (stats) {
              if (args.length > 2) {
                args[2] = stats;
              } else {
                args.push(stats);
              }
              this.emitWithAll(event, args);
            }
          };
          this._awaitWriteFinish(path6, awf.stabilityThreshold, event, awfEmit);
          return this;
        }
        if (event === EV_CHANGE) {
          const isThrottled = !this._throttle(EV_CHANGE, path6, 50);
          if (isThrottled) return this;
        }
        if (opts.alwaysStat && val1 === void 0 && (event === EV_ADD || event === EV_ADD_DIR || event === EV_CHANGE)) {
          const fullPath = opts.cwd ? sysPath.join(opts.cwd, path6) : path6;
          let stats;
          try {
            stats = await stat(fullPath);
          } catch (err) {
          }
          if (!stats || this.closed) return;
          args.push(stats);
        }
        this.emitWithAll(event, args);
        return this;
      }
      /**
       * Common handler for errors
       * @param {Error} error
       * @returns {Error|Boolean} The error if defined, otherwise the value of the FSWatcher instance's `closed` flag
       */
      _handleError(error) {
        const code = error && error.code;
        if (error && code !== "ENOENT" && code !== "ENOTDIR" && (!this.options.ignorePermissionErrors || code !== "EPERM" && code !== "EACCES")) {
          this.emit(EV_ERROR, error);
        }
        return error || this.closed;
      }
      /**
       * Helper utility for throttling
       * @param {ThrottleType} actionType type being throttled
       * @param {Path} path being acted upon
       * @param {Number} timeout duration of time to suppress duplicate actions
       * @returns {Object|false} tracking object or false if action should be suppressed
       */
      _throttle(actionType, path6, timeout) {
        if (!this._throttled.has(actionType)) {
          this._throttled.set(actionType, /* @__PURE__ */ new Map());
        }
        const action = this._throttled.get(actionType);
        const actionPath = action.get(path6);
        if (actionPath) {
          actionPath.count++;
          return false;
        }
        let timeoutObject;
        const clear = () => {
          const item = action.get(path6);
          const count = item ? item.count : 0;
          action.delete(path6);
          clearTimeout(timeoutObject);
          if (item) clearTimeout(item.timeoutObject);
          return count;
        };
        timeoutObject = setTimeout(clear, timeout);
        const thr = { timeoutObject, clear, count: 0 };
        action.set(path6, thr);
        return thr;
      }
      _incrReadyCount() {
        return this._readyCount++;
      }
      /**
       * Awaits write operation to finish.
       * Polls a newly created file for size variations. When files size does not change for 'threshold' milliseconds calls callback.
       * @param {Path} path being acted upon
       * @param {Number} threshold Time in milliseconds a file size must be fixed before acknowledging write OP is finished
       * @param {EventName} event
       * @param {Function} awfEmit Callback to be called when ready for event to be emitted.
       */
      _awaitWriteFinish(path6, threshold, event, awfEmit) {
        let timeoutHandler;
        let fullPath = path6;
        if (this.options.cwd && !sysPath.isAbsolute(path6)) {
          fullPath = sysPath.join(this.options.cwd, path6);
        }
        const now = /* @__PURE__ */ new Date();
        const awaitWriteFinish = (prevStat) => {
          fs5.stat(fullPath, (err, curStat) => {
            if (err || !this._pendingWrites.has(path6)) {
              if (err && err.code !== "ENOENT") awfEmit(err);
              return;
            }
            const now2 = Number(/* @__PURE__ */ new Date());
            if (prevStat && curStat.size !== prevStat.size) {
              this._pendingWrites.get(path6).lastChange = now2;
            }
            const pw = this._pendingWrites.get(path6);
            const df = now2 - pw.lastChange;
            if (df >= threshold) {
              this._pendingWrites.delete(path6);
              awfEmit(void 0, curStat);
            } else {
              timeoutHandler = setTimeout(
                awaitWriteFinish,
                this.options.awaitWriteFinish.pollInterval,
                curStat
              );
            }
          });
        };
        if (!this._pendingWrites.has(path6)) {
          this._pendingWrites.set(path6, {
            lastChange: now,
            cancelWait: () => {
              this._pendingWrites.delete(path6);
              clearTimeout(timeoutHandler);
              return event;
            }
          });
          timeoutHandler = setTimeout(
            awaitWriteFinish,
            this.options.awaitWriteFinish.pollInterval
          );
        }
      }
      _getGlobIgnored() {
        return [...this._ignoredPaths.values()];
      }
      /**
       * Determines whether user has asked to ignore this path.
       * @param {Path} path filepath or dir
       * @param {fs.Stats=} stats result of fs.stat
       * @returns {Boolean}
       */
      _isIgnored(path6, stats) {
        if (this.options.atomic && DOT_RE.test(path6)) return true;
        if (!this._userIgnored) {
          const { cwd } = this.options;
          const ign = this.options.ignored;
          const ignored = ign && ign.map(normalizeIgnored(cwd));
          const paths = arrify(ignored).filter((path7) => typeof path7 === STRING_TYPE && !isGlob(path7)).map((path7) => path7 + SLASH_GLOBSTAR);
          const list = this._getGlobIgnored().map(normalizeIgnored(cwd)).concat(ignored, paths);
          this._userIgnored = anymatch(list, void 0, ANYMATCH_OPTS);
        }
        return this._userIgnored([path6, stats]);
      }
      _isntIgnored(path6, stat2) {
        return !this._isIgnored(path6, stat2);
      }
      /**
       * Provides a set of common helpers and properties relating to symlink and glob handling.
       * @param {Path} path file, directory, or glob pattern being watched
       * @param {Number=} depth at any depth > 0, this isn't a glob
       * @returns {WatchHelper} object containing helpers for this path
       */
      _getWatchHelpers(path6, depth) {
        const watchPath = depth || this.options.disableGlobbing || !isGlob(path6) ? path6 : globParent(path6);
        const follow = this.options.followSymlinks;
        return new WatchHelper(path6, watchPath, follow, this);
      }
      // Directory helpers
      // -----------------
      /**
       * Provides directory tracking objects
       * @param {String} directory path of the directory
       * @returns {DirEntry} the directory's tracking object
       */
      _getWatchedDir(directory) {
        if (!this._boundRemove) this._boundRemove = this._remove.bind(this);
        const dir = sysPath.resolve(directory);
        if (!this._watched.has(dir)) this._watched.set(dir, new DirEntry(dir, this._boundRemove));
        return this._watched.get(dir);
      }
      // File helpers
      // ------------
      /**
       * Check for read permissions.
       * Based on this answer on SO: https://stackoverflow.com/a/11781404/1358405
       * @param {fs.Stats} stats - object, result of fs_stat
       * @returns {Boolean} indicates whether the file can be read
      */
      _hasReadPermissions(stats) {
        if (this.options.ignorePermissionErrors) return true;
        const md = stats && Number.parseInt(stats.mode, 10);
        const st = md & 511;
        const it = Number.parseInt(st.toString(8)[0], 10);
        return Boolean(4 & it);
      }
      /**
       * Handles emitting unlink events for
       * files and directories, and via recursion, for
       * files and directories within directories that are unlinked
       * @param {String} directory within which the following item is located
       * @param {String} item      base path of item/directory
       * @returns {void}
      */
      _remove(directory, item, isDirectory) {
        const path6 = sysPath.join(directory, item);
        const fullPath = sysPath.resolve(path6);
        isDirectory = isDirectory != null ? isDirectory : this._watched.has(path6) || this._watched.has(fullPath);
        if (!this._throttle("remove", path6, 100)) return;
        if (!isDirectory && !this.options.useFsEvents && this._watched.size === 1) {
          this.add(directory, item, true);
        }
        const wp = this._getWatchedDir(path6);
        const nestedDirectoryChildren = wp.getChildren();
        nestedDirectoryChildren.forEach((nested) => this._remove(path6, nested));
        const parent = this._getWatchedDir(directory);
        const wasTracked = parent.has(item);
        parent.remove(item);
        if (this._symlinkPaths.has(fullPath)) {
          this._symlinkPaths.delete(fullPath);
        }
        let relPath = path6;
        if (this.options.cwd) relPath = sysPath.relative(this.options.cwd, path6);
        if (this.options.awaitWriteFinish && this._pendingWrites.has(relPath)) {
          const event = this._pendingWrites.get(relPath).cancelWait();
          if (event === EV_ADD) return;
        }
        this._watched.delete(path6);
        this._watched.delete(fullPath);
        const eventName = isDirectory ? EV_UNLINK_DIR : EV_UNLINK;
        if (wasTracked && !this._isIgnored(path6)) this._emit(eventName, path6);
        if (!this.options.useFsEvents) {
          this._closePath(path6);
        }
      }
      /**
       * Closes all watchers for a path
       * @param {Path} path
       */
      _closePath(path6) {
        this._closeFile(path6);
        const dir = sysPath.dirname(path6);
        this._getWatchedDir(dir).remove(sysPath.basename(path6));
      }
      /**
       * Closes only file-specific watchers
       * @param {Path} path
       */
      _closeFile(path6) {
        const closers = this._closers.get(path6);
        if (!closers) return;
        closers.forEach((closer) => closer());
        this._closers.delete(path6);
      }
      /**
       *
       * @param {Path} path
       * @param {Function} closer
       */
      _addPathCloser(path6, closer) {
        if (!closer) return;
        let list = this._closers.get(path6);
        if (!list) {
          list = [];
          this._closers.set(path6, list);
        }
        list.push(closer);
      }
      _readdirp(root, opts) {
        if (this.closed) return;
        const options = { type: EV_ALL, alwaysStat: true, lstat: true, ...opts };
        let stream = readdirp(root, options);
        this._streams.add(stream);
        stream.once(STR_CLOSE, () => {
          stream = void 0;
        });
        stream.once(STR_END, () => {
          if (stream) {
            this._streams.delete(stream);
            stream = void 0;
          }
        });
        return stream;
      }
    };
    exports2.FSWatcher = FSWatcher2;
    var watch = (paths, options) => {
      const watcher = new FSWatcher2(options);
      watcher.add(paths);
      return watcher;
    };
    exports2.watch = watch;
  }
});

// apps/bridge/src/cli.ts
var cli_exports = {};
module.exports = __toCommonJS(cli_exports);
var import_fs4 = __toESM(require("fs"));
var import_path5 = __toESM(require("path"));
var import_os6 = __toESM(require("os"));
var import_readline2 = __toESM(require("readline"));

// apps/bridge/src/core/daemon.ts
var import_os3 = __toESM(require("os"));

// apps/bridge/src/redaction/redactor.ts
var SENSITIVE_KEY_PATTERNS = [
  /api[_-]?key/i,
  /secret/i,
  /token/i,
  /password/i,
  /credential/i,
  /private[_-]?key/i,
  /auth/i
];
var SECRET_VALUE_PATTERNS = [
  /AIza[0-9A-Za-z-_]{35}/g,
  // Google API Key
  /sk-[a-zA-Z0-9]{20,}/g,
  // OpenAI / general secret key
  /ghp_[a-zA-Z0-9]{36}/g,
  // GitHub Personal Access Token
  /bearer\s+[a-zA-Z0-9._-]+/gi
];
var RedactionEngine = class {
  projectRoot;
  homeDir;
  constructor(projectRoot = "", homeDir = "") {
    this.projectRoot = projectRoot;
    this.homeDir = homeDir || process.env.USERPROFILE || process.env.HOME || "";
  }
  sanitizeString(text) {
    if (!text) return text;
    let result = text;
    for (const pattern of SECRET_VALUE_PATTERNS) {
      result = result.replace(pattern, "<REDACTED_SECRET>");
    }
    if (this.homeDir && this.homeDir.length > 3) {
      result = result.split(this.homeDir).join("$USER_HOME");
    }
    if (this.projectRoot && this.projectRoot.length > 3) {
      result = result.split(this.projectRoot).join("$PROJECT_ROOT");
    }
    return result;
  }
  sanitizeObject(obj) {
    let count = 0;
    const sanitized = JSON.parse(JSON.stringify(obj));
    const recurse = (current) => {
      for (const key of Object.keys(current)) {
        const val = current[key];
        const isKeySensitive = SENSITIVE_KEY_PATTERNS.some((pat) => pat.test(key));
        if (isKeySensitive) {
          current[key] = "<REDACTED_BY_VIBEHUB>";
          count++;
          continue;
        }
        if (typeof val === "string") {
          const cleaned = this.sanitizeString(val);
          if (cleaned !== val) {
            current[key] = cleaned;
            count++;
          }
        } else if (val !== null && typeof val === "object" && !Array.isArray(val)) {
          recurse(val);
        } else if (Array.isArray(val)) {
          current[key] = val.map((item) => {
            if (typeof item === "string") {
              return this.sanitizeString(item);
            }
            if (item !== null && typeof item === "object") {
              recurse(item);
            }
            return item;
          });
        }
      }
    };
    recurse(sanitized);
    return { redactedData: sanitized, redactedFieldsCount: count };
  }
  isIgnoredPath(relPath) {
    const ignored = [
      ".git",
      "node_modules",
      ".next",
      "dist",
      ".env",
      ".env.local",
      ".env.production",
      ".env.development",
      "id_rsa",
      "id_ed25519"
    ];
    const normalized = relPath.replace(/\\/g, "/");
    return ignored.some((ign) => normalized === ign || normalized.startsWith(`${ign}/`) || normalized.includes(`/${ign}/`));
  }
};

// apps/bridge/src/transport/http-transport.ts
var HttpTransport = class {
  config;
  queue = [];
  heartbeatInterval = null;
  flushInterval = null;
  isRunning = false;
  constructor(config) {
    this.config = config;
  }
  start() {
    this.isRunning = true;
    this.heartbeatInterval = setInterval(() => {
      this.sendHeartbeat().catch(() => {
      });
    }, 15e3);
    this.flushInterval = setInterval(() => {
      this.flushQueue().catch(() => {
      });
    }, 2e3);
    this.sendHeartbeat().catch(() => {
    });
  }
  enqueue(event) {
    this.queue.push(event);
  }
  async sendHeartbeat() {
    if (!this.isRunning) return null;
    const payload = {
      deviceId: this.config.deviceId,
      bridgeVersion: this.config.bridgeVersion,
      uptimeSeconds: Math.floor(process.uptime()),
      activeProjectsCount: 1,
      activeAdapters: ["antigravity", "claude-code"]
    };
    try {
      const res = await fetch(`${this.config.baseUrl}/bridge/heartbeat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        return await res.json();
      }
      return null;
    } catch {
      return null;
    }
  }
  async flushQueue() {
    if (!this.isRunning || this.queue.length === 0) return null;
    const batch = this.queue.splice(0, 50);
    const payload = {
      schemaVersion: 1,
      deviceId: this.config.deviceId,
      projectId: this.config.projectId,
      events: batch
    };
    try {
      const res = await fetch(`${this.config.baseUrl}/events/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        return await res.json();
      } else {
        this.queue.unshift(...batch);
        return null;
      }
    } catch {
      this.queue.unshift(...batch);
      return null;
    }
  }
  async stop() {
    this.isRunning = false;
    if (this.heartbeatInterval) clearInterval(this.heartbeatInterval);
    if (this.flushInterval) clearInterval(this.flushInterval);
    await this.flushQueue();
  }
};

// apps/bridge/src/collectors/git-collector.ts
var import_child_process = require("child_process");
var import_util = require("util");
var execAsync = (0, import_util.promisify)(import_child_process.exec);
var GitCollector = class {
  projectRoot;
  deviceId;
  projectId;
  redactor;
  lastState = null;
  constructor(projectRoot, deviceId, projectId, redactor) {
    this.projectRoot = projectRoot;
    this.deviceId = deviceId;
    this.projectId = projectId;
    this.redactor = redactor;
  }
  async pollGitState(emit) {
    try {
      const branchCmd = await execAsync("git rev-parse --abbrev-ref HEAD", { cwd: this.projectRoot });
      const branch = branchCmd.stdout.trim();
      const logCmd = await execAsync('git log -n 1 --pretty=format:"%h|%s|%an|%cI"', {
        cwd: this.projectRoot
      });
      const [lastCommitHash, rawMessage, author, dateStr] = logCmd.stdout.trim().split("|");
      const lastCommitMessage = this.redactor.sanitizeString(rawMessage || "");
      const statusCmd = await execAsync("git status --porcelain", { cwd: this.projectRoot });
      const hasUncommittedChanges = statusCmd.stdout.trim().length > 0;
      const currentState = {
        branch,
        lastCommitHash: lastCommitHash || "",
        lastCommitMessage,
        hasUncommittedChanges
      };
      if (this.lastState && this.lastState.lastCommitHash !== currentState.lastCommitHash && currentState.lastCommitHash) {
        const commitEvent = {
          id: `evt_git_${Date.now()}_${currentState.lastCommitHash}`,
          schemaVersion: 1,
          deviceId: this.deviceId,
          projectId: this.projectId,
          occurredAt: dateStr || (/* @__PURE__ */ new Date()).toISOString(),
          source: "git",
          type: "git.commit_created",
          data: {
            hash: currentState.lastCommitHash,
            message: currentState.lastCommitMessage,
            branch: currentState.branch,
            author: author || "Developer"
          }
        };
        await emit(commitEvent);
      }
      this.lastState = currentState;
      return currentState;
    } catch {
      return null;
    }
  }
};

// apps/bridge/src/collectors/file-watcher.ts
var import_chokidar = __toESM(require_chokidar());
var import_path = __toESM(require("path"));
var FileWatcherCollector = class {
  projectRoot;
  deviceId;
  projectId;
  redactor;
  watcher = null;
  debounceMap = /* @__PURE__ */ new Map();
  constructor(projectRoot, deviceId, projectId, redactor) {
    this.projectRoot = projectRoot;
    this.deviceId = deviceId;
    this.projectId = projectId;
    this.redactor = redactor;
  }
  start(emit) {
    const isSystemOrIgnored = (filePath) => {
      const normalized = filePath.replace(/\\/g, "/");
      if (/(\/|^)(Cookies|AppData|Application Data|Local Settings|NetHood|PrintHood|Recent|SendTo|Start Menu|Templates|System Volume Information|\$Recycle\.Bin)(\/|$)/i.test(normalized)) {
        return true;
      }
      if (/(NTUSER|usrclass)\.dat/i.test(normalized)) {
        return true;
      }
      if (/(\/|^)(node_modules|\.git|\.next|dist|out|\.firebase|\.turbo|\.cache|\.gemini)(\/|$)/i.test(normalized)) {
        return true;
      }
      return false;
    };
    try {
      this.watcher = import_chokidar.default.watch(this.projectRoot, {
        ignored: isSystemOrIgnored,
        ignoreInitial: true,
        persistent: true,
        depth: 5,
        ignorePermissionErrors: true
        // Kluczowe dla Windows EPERM / EACCES
      });
      this.watcher.on("error", (err) => {
        console.warn(`[*] INFO :: FileWatcher pomija chroniony zas\xF3b [${err?.code || "WARN"}]: ${err?.path || err?.message || err}`);
      });
      const handleFileEvent = (action, fullPath) => {
        if (isSystemOrIgnored(fullPath)) return;
        const relPath = import_path.default.relative(this.projectRoot, fullPath);
        if (this.redactor.isIgnoredPath(relPath)) return;
        const existing = this.debounceMap.get(relPath);
        if (existing) clearTimeout(existing);
        const timeout = setTimeout(async () => {
          this.debounceMap.delete(relPath);
          const event = {
            id: `evt_file_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            schemaVersion: 1,
            deviceId: this.deviceId,
            projectId: this.projectId,
            occurredAt: (/* @__PURE__ */ new Date()).toISOString(),
            source: "system",
            type: "file.changed",
            data: {
              filePath: relPath.replace(/\\/g, "/"),
              action,
              timestamp: Date.now()
            }
          };
          await emit(event);
        }, 500);
        this.debounceMap.set(relPath, timeout);
      };
      this.watcher.on("add", (p) => handleFileEvent("add", p));
      this.watcher.on("change", (p) => handleFileEvent("change", p));
      this.watcher.on("unlink", (p) => handleFileEvent("unlink", p));
    } catch (err) {
      console.warn("[!] ALERT :: FileWatcher failed to start:", err.message);
    }
  }
  async stop() {
    for (const timeout of this.debounceMap.values()) {
      clearTimeout(timeout);
    }
    this.debounceMap.clear();
    if (this.watcher) {
      await this.watcher.close();
      this.watcher = null;
    }
  }
};

// apps/bridge/src/adapters/antigravity/antigravity-adapter.ts
var AntigravityAdapter = class {
  id = "antigravity";
  name = "Google Antigravity CLI Adapter";
  version = "0.1.0";
  activeSession = null;
  redactor;
  constructor(redactor) {
    this.redactor = redactor;
  }
  async detect() {
    return true;
  }
  async getCapabilities() {
    return {
      supportedLevels: ["L1", "L2", "L3"],
      canDetectTools: true,
      canInspectTasks: true,
      canCaptureLiveOutput: false,
      // Bezpieczeństwo: brak strumieniowania raw shella
      requiresLocalDaemon: true,
      supportedEventTypes: [
        "agent.status_changed",
        "agent.task_started",
        "agent.task_completed",
        "tool.started",
        "tool.completed"
      ]
    };
  }
  async start(context, emit) {
    const sessionId = `agy_sess_${Date.now()}`;
    let isStopped = false;
    const initialEvent = {
      id: `evt_${Date.now()}_agy_start`,
      schemaVersion: 1,
      deviceId: context.deviceId,
      projectId: context.projectId,
      occurredAt: (/* @__PURE__ */ new Date()).toISOString(),
      source: "antigravity",
      type: "agent.status_changed",
      data: {
        status: "working",
        activity: "Google Antigravity CLI pod\u0142\u0105czone do VibeHub Mesh",
        provider: "antigravity",
        confidence: 1,
        expiresInMs: 3e4
      }
    };
    await emit(initialEvent);
    this.activeSession = {
      sessionId,
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      stop: async () => {
        isStopped = true;
        const stopEvent = {
          id: `evt_${Date.now()}_agy_stop`,
          schemaVersion: 1,
          deviceId: context.deviceId,
          projectId: context.projectId,
          occurredAt: (/* @__PURE__ */ new Date()).toISOString(),
          source: "antigravity",
          type: "agent.status_changed",
          data: {
            status: "idle",
            activity: "Google Antigravity CLI od\u0142\u0105czone",
            provider: "antigravity",
            confidence: 1
          }
        };
        await emit(stopEvent);
      }
    };
    return this.activeSession;
  }
  handleStatuslineInput(payload, context, emit) {
    const rawActivity = payload.activity_summary || (payload.current_tool ? `Wywo\u0142anie narz\u0119dzia: ${payload.current_tool}` : "Praca nad zadaniem");
    const sanitizedActivity = this.redactor.sanitizeString(rawActivity);
    const event = {
      id: `evt_${Date.now()}_agy_state`,
      schemaVersion: 1,
      deviceId: context.deviceId,
      projectId: context.projectId,
      occurredAt: (/* @__PURE__ */ new Date()).toISOString(),
      source: "antigravity",
      type: "agent.status_changed",
      data: {
        status: payload.agent_state === "running" ? "working" : payload.agent_state || "working",
        activity: sanitizedActivity,
        provider: "antigravity",
        tool: payload.current_tool,
        confidence: 1,
        expiresInMs: 45e3
      }
    };
    return emit(event);
  }
  async stop() {
    if (this.activeSession) {
      await this.activeSession.stop();
      this.activeSession = null;
    }
  }
};

// apps/bridge/src/adapters/claude-code/claude-code-adapter.ts
var ClaudeCodeAdapter = class {
  id = "claude-code";
  name = "Claude Code Adapter";
  version = "0.1.0";
  activeSession = null;
  redactor;
  constructor(redactor) {
    this.redactor = redactor;
  }
  async detect() {
    return true;
  }
  async getCapabilities() {
    return {
      supportedLevels: ["L1", "L2", "L3"],
      canDetectTools: true,
      canInspectTasks: true,
      canCaptureLiveOutput: false,
      requiresLocalDaemon: true,
      supportedEventTypes: [
        "agent.status_changed",
        "tool.started",
        "tool.completed"
      ]
    };
  }
  async start(context, emit) {
    const sessionId = `claude_sess_${Date.now()}`;
    this.activeSession = {
      sessionId,
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      stop: async () => {
        const stopEvent = {
          id: `evt_${Date.now()}_claude_stop`,
          schemaVersion: 1,
          deviceId: context.deviceId,
          projectId: context.projectId,
          occurredAt: (/* @__PURE__ */ new Date()).toISOString(),
          source: "claude-code",
          type: "agent.status_changed",
          data: {
            status: "idle",
            activity: "Claude Code sesja zako\u0144czona",
            provider: "claude-code",
            confidence: 1
          }
        };
        await emit(stopEvent);
      }
    };
    return this.activeSession;
  }
  async handleHookPayload(payload, context, emit) {
    let eventType = "agent.status_changed";
    let status = "working";
    let activity = "Claude Code wykonuje operacj\u0119";
    if (payload.hook_event === "pre_tool_use") {
      eventType = "tool.started";
      status = "working";
      activity = `Narz\u0119dzie: ${payload.tool_name || "nieznane"}`;
    } else if (payload.hook_event === "post_tool_use") {
      eventType = "tool.completed";
      status = "waiting";
      activity = `Zako\u0144czono narz\u0119dzie: ${payload.tool_name || "nieznane"}`;
    }
    const sanitizedActivity = this.redactor.sanitizeString(payload.tool_input_summary || activity);
    const event = {
      id: `evt_${Date.now()}_claude_hook`,
      schemaVersion: 1,
      deviceId: context.deviceId,
      projectId: context.projectId,
      occurredAt: (/* @__PURE__ */ new Date()).toISOString(),
      source: "claude-code",
      type: eventType,
      data: {
        status,
        activity: sanitizedActivity,
        provider: "claude-code",
        tool: payload.tool_name,
        confidence: 1,
        expiresInMs: 3e4
      }
    };
    await emit(event);
  }
  async stop() {
    if (this.activeSession) {
      await this.activeSession.stop();
      this.activeSession = null;
    }
  }
};

// apps/bridge/src/adapters/cursor/cursor-adapter.ts
var CursorAdapter = class {
  id = "cursor";
  name = "Cursor AI / Autonomous Agent Adapter";
  version = "0.1.0";
  activeSession = null;
  redactor;
  constructor(redactor) {
    this.redactor = redactor;
  }
  async detect() {
    return true;
  }
  async getCapabilities() {
    return {
      supportedLevels: ["L1", "L2", "L3"],
      canDetectTools: true,
      canInspectTasks: true,
      canCaptureLiveOutput: false,
      requiresLocalDaemon: true,
      supportedEventTypes: [
        "agent.status_changed",
        "agent.task_started",
        "agent.task_completed"
      ]
    };
  }
  async start(context, emit) {
    const sessionId = `cursor_sess_${Date.now()}`;
    const initialEvent = {
      id: `evt_${Date.now()}_cursor_start`,
      schemaVersion: 1,
      deviceId: context.deviceId,
      projectId: context.projectId,
      occurredAt: (/* @__PURE__ */ new Date()).toISOString(),
      source: "custom",
      type: "agent.status_changed",
      data: {
        status: "working",
        activity: "Cursor AI Agent aktywny w projekcie",
        provider: "cursor",
        confidence: 0.95,
        expiresInMs: 3e4
      }
    };
    await emit(initialEvent);
    this.activeSession = {
      sessionId,
      startedAt: (/* @__PURE__ */ new Date()).toISOString(),
      stop: async () => {
        const stopEvent = {
          id: `evt_${Date.now()}_cursor_stop`,
          schemaVersion: 1,
          deviceId: context.deviceId,
          projectId: context.projectId,
          occurredAt: (/* @__PURE__ */ new Date()).toISOString(),
          source: "custom",
          type: "agent.status_changed",
          data: {
            status: "idle",
            activity: "Cursor AI Agent od\u0142\u0105czony",
            provider: "cursor",
            confidence: 1
          }
        };
        await emit(stopEvent);
      }
    };
    return this.activeSession;
  }
  async stop() {
    if (this.activeSession) {
      await this.activeSession.stop();
      this.activeSession = null;
    }
  }
};

// apps/bridge/src/observers/antigravity-observer.ts
var import_fs = __toESM(require("fs"));
var import_path2 = __toESM(require("path"));
var import_os = __toESM(require("os"));
var AntigravityConversationObserver = class {
  brainDir;
  conversations = /* @__PURE__ */ new Map();
  pollInterval = null;
  isScanning = false;
  deviceId;
  projectId;
  hostname;
  operatorName;
  constructor(deviceId, projectId, operatorName) {
    this.deviceId = deviceId;
    this.projectId = projectId;
    this.hostname = import_os.default.hostname();
    this.operatorName = operatorName;
    this.brainDir = import_path2.default.join(import_os.default.homedir(), ".gemini", "antigravity", "brain");
  }
  start(onSessionUpdate, emitEvent) {
    if (!import_fs.default.existsSync(this.brainDir)) {
      console.log(`[*] INFO :: Antigravity brain dir nie istnieje w ${this.brainDir} \u2014 observer oczekuje.`);
      return;
    }
    this.scanAndTail(onSessionUpdate, emitEvent).catch((err) => {
      console.warn("[!] ALERT :: Antigravity observer initial scan warning:", err.message);
    });
    this.pollInterval = setInterval(async () => {
      if (this.isScanning) return;
      this.isScanning = true;
      try {
        await this.scanAndTail(onSessionUpdate, emitEvent);
      } catch (err) {
      } finally {
        this.isScanning = false;
      }
    }, 2e3);
  }
  stop() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }
  getActiveSessions() {
    const list = [];
    const now = Date.now();
    const MAX_ACTIVE_AGE_MS = 20 * 60 * 1e3;
    for (const [convId, state] of this.conversations.entries()) {
      const lastActiveTime = new Date(state.lastActiveAt).getTime();
      if (now - lastActiveTime > MAX_ACTIVE_AGE_MS) continue;
      const isRecentlyActive = now - lastActiveTime < 4 * 60 * 1e3;
      const status = isRecentlyActive ? "working" : state.status;
      list.push({
        id: `agy_${convId.slice(0, 8)}`,
        conversationId: convId,
        provider: "antigravity",
        name: `Google Antigravity #${convId.slice(0, 8)}`,
        model: "Gemini 3.8 Flash",
        status,
        activity: state.activity || state.lastPrompt || "Sesja Antigravity aktywna",
        currentTool: state.currentTool,
        activeFile: state.activeFile,
        fileStats: state.fileStats,
        diffSnippet: state.diffSnippet.length > 0 ? state.diffSnippet : void 0,
        tokens: state.tokens,
        lastActiveAt: state.lastActiveAt,
        machine: this.hostname,
        operatorName: this.operatorName
      });
    }
    return list.sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime());
  }
  async scanAndTail(onSessionUpdate, emitEvent) {
    if (!import_fs.default.existsSync(this.brainDir)) return;
    let entries = [];
    try {
      entries = import_fs.default.readdirSync(this.brainDir);
    } catch {
      return;
    }
    const now = Date.now();
    const RECENT_THRESHOLD_MS = 30 * 60 * 1e3;
    let hasChanges = false;
    for (const entry of entries) {
      const convPath = import_path2.default.join(this.brainDir, entry);
      let stat;
      try {
        stat = import_fs.default.statSync(convPath);
      } catch {
        continue;
      }
      if (!stat.isDirectory()) continue;
      if (now - stat.mtimeMs > RECENT_THRESHOLD_MS) continue;
      const logPath = import_path2.default.join(convPath, ".system_generated", "logs", "transcript.jsonl");
      if (!import_fs.default.existsSync(logPath)) continue;
      const changed = this.tailTranscript(entry, logPath, emitEvent);
      if (changed) hasChanges = true;
    }
    if (hasChanges) {
      onSessionUpdate(this.getActiveSessions());
    }
  }
  tailTranscript(convId, logFilePath, emitEvent) {
    let stat;
    try {
      stat = import_fs.default.statSync(logFilePath);
    } catch {
      return false;
    }
    let state = this.conversations.get(convId);
    let isInitial = false;
    if (!state) {
      isInitial = true;
      state = {
        conversationId: convId,
        byteOffset: 0,
        lastPrompt: "Praca nad projektem...",
        status: "working",
        diffSnippet: [],
        tokens: { input: 0, output: 0, cacheRead: 0 },
        lastActiveAt: stat.mtime.toISOString(),
        createdAt: stat.birthtime.toISOString()
      };
      this.conversations.set(convId, state);
      try {
        const fullContent = import_fs.default.readFileSync(logFilePath, "utf-8");
        const lines2 = fullContent.split("\n");
        for (let i = lines2.length - 1; i >= 0; i--) {
          const line = lines2[i].trim();
          if (!line) continue;
          try {
            const item = JSON.parse(line);
            this.processTranscriptItem(convId, state, item, void 0);
            if (state.lastPrompt && state.lastPrompt !== "Praca nad projektem...") {
              break;
            }
          } catch {
          }
        }
        state.byteOffset = stat.size;
        return true;
      } catch {
      }
    }
    if (stat.size <= state.byteOffset) {
      return false;
    }
    const readLength = stat.size - state.byteOffset;
    const buffer = Buffer.alloc(readLength);
    let fd = null;
    let bytesRead = 0;
    try {
      fd = import_fs.default.openSync(logFilePath, "r");
      bytesRead = import_fs.default.readSync(fd, buffer, 0, readLength, state.byteOffset);
      state.byteOffset += bytesRead;
      state.lastActiveAt = (/* @__PURE__ */ new Date()).toISOString();
    } catch (err) {
      return false;
    } finally {
      if (fd !== null) {
        try {
          import_fs.default.closeSync(fd);
        } catch {
        }
      }
    }
    const chunk = buffer.toString("utf-8");
    const lines = chunk.split("\n");
    let updated = false;
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;
      try {
        const item = JSON.parse(line);
        this.processTranscriptItem(convId, state, item, emitEvent);
        updated = true;
      } catch {
      }
    }
    return updated;
  }
  processTranscriptItem(convId, state, item, emitEvent) {
    if (item.type === "USER_INPUT" && item.content) {
      let promptText = String(item.content);
      const matchRequest = promptText.match(/<USER_REQUEST>([\s\S]*?)<\/USER_REQUEST>/i);
      if (matchRequest && matchRequest[1]) {
        promptText = matchRequest[1].trim();
      }
      state.lastPrompt = promptText.slice(0, 160);
      state.status = "working";
      state.lastActiveAt = item.created_at || (/* @__PURE__ */ new Date()).toISOString();
      if (emitEvent) {
        emitEvent({
          id: `evt_${Date.now()}_agy_task`,
          schemaVersion: 1,
          deviceId: this.deviceId,
          projectId: this.projectId,
          occurredAt: state.lastActiveAt,
          source: "antigravity",
          type: "agent.task_started",
          data: {
            conversationId: convId,
            status: "working",
            activity: state.lastPrompt,
            provider: "antigravity"
          }
        });
      }
    }
    if (item.type === "PLANNER_RESPONSE") {
      if (typeof item.input_tokens === "number") state.tokens.input = item.input_tokens;
      if (typeof item.output_tokens === "number") state.tokens.output = item.output_tokens;
      if (typeof item.cache_read_tokens === "number") state.tokens.cacheRead = item.cache_read_tokens;
      if (Array.isArray(item.tool_calls) && item.tool_calls.length > 0) {
        state.status = "working";
        const primaryTool = item.tool_calls[0];
        state.currentTool = primaryTool.name;
        if (primaryTool.name === "run_command" && primaryTool.args) {
          const cmd = primaryTool.args.CommandLine || primaryTool.args.toolSummary || "Shell command";
          state.activity = `Terminal: ${String(cmd).slice(0, 80)}`;
        } else if ((primaryTool.name === "edit_file" || primaryTool.name === "write_file" || primaryTool.name === "read_file") && primaryTool.args) {
          const filePath = primaryTool.args.Path || "workspace file";
          const relPath = import_path2.default.basename(filePath);
          state.activeFile = relPath;
          state.activity = `${primaryTool.name}: ${relPath}`;
          if (primaryTool.name === "edit_file" && primaryTool.args.Replacement) {
            state.fileStats = "+ modified";
            const repLines = String(primaryTool.args.Replacement).split("\n").slice(0, 4);
            state.diffSnippet = repLines.map((l, i) => ({
              line: i + 1,
              type: "+",
              text: l.slice(0, 60)
            }));
          }
        }
        if (emitEvent) {
          emitEvent({
            id: `evt_${Date.now()}_tool_${primaryTool.name}`,
            schemaVersion: 1,
            deviceId: this.deviceId,
            projectId: this.projectId,
            occurredAt: item.created_at || (/* @__PURE__ */ new Date()).toISOString(),
            source: "antigravity",
            type: "tool.started",
            data: {
              conversationId: convId,
              tool: primaryTool.name,
              activity: state.activity || state.lastPrompt,
              activeFile: state.activeFile
            }
          });
        }
      }
    }
    if (item.status === "DONE" && (!item.tool_calls || item.tool_calls.length === 0)) {
      state.status = "waiting";
    }
  }
};

// apps/bridge/src/observers/claude-observer.ts
var import_fs2 = __toESM(require("fs"));
var import_path3 = __toESM(require("path"));
var import_os2 = __toESM(require("os"));
var ClaudeCodeSessionObserver = class {
  historyFile;
  byteOffset = 0;
  lastSession = null;
  pollInterval = null;
  deviceId;
  projectId;
  hostname;
  operatorName;
  constructor(deviceId, projectId, operatorName) {
    this.deviceId = deviceId;
    this.projectId = projectId;
    this.hostname = import_os2.default.hostname();
    this.operatorName = operatorName;
    this.historyFile = import_path3.default.join(import_os2.default.homedir(), ".claude", "history.jsonl");
  }
  start(onSessionUpdate, emitEvent) {
    if (!import_fs2.default.existsSync(this.historyFile)) {
      return;
    }
    try {
      const stat = import_fs2.default.statSync(this.historyFile);
      if (stat.size > 32 * 1024) {
        this.byteOffset = stat.size - 16 * 1024;
      }
    } catch {
    }
    this.pollHistory(onSessionUpdate, emitEvent);
    this.pollInterval = setInterval(() => {
      this.pollHistory(onSessionUpdate, emitEvent);
    }, 3e3);
  }
  stop() {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
    }
  }
  getActiveSessions() {
    if (!this.lastSession) return [];
    const ageMs = Date.now() - new Date(this.lastSession.lastActiveAt).getTime();
    if (ageMs > 2 * 60 * 60 * 1e3) {
      return [];
    }
    return [this.lastSession];
  }
  pollHistory(onSessionUpdate, emitEvent) {
    if (!import_fs2.default.existsSync(this.historyFile)) return;
    let stat;
    try {
      stat = import_fs2.default.statSync(this.historyFile);
    } catch {
      return;
    }
    if (stat.size <= this.byteOffset) return;
    const readLength = stat.size - this.byteOffset;
    const buffer = Buffer.alloc(readLength);
    let fd = null;
    try {
      fd = import_fs2.default.openSync(this.historyFile, "r");
      import_fs2.default.readSync(fd, buffer, 0, readLength, this.byteOffset);
      this.byteOffset += readLength;
    } catch {
      return;
    } finally {
      if (fd !== null) {
        try {
          import_fs2.default.closeSync(fd);
        } catch {
        }
      }
    }
    const chunk = buffer.toString("utf-8");
    const lines = chunk.split("\n");
    let hasNew = false;
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;
      try {
        const item = JSON.parse(line);
        if (item.sessionId && item.display) {
          const occurredAt = item.timestamp ? new Date(item.timestamp).toISOString() : (/* @__PURE__ */ new Date()).toISOString();
          this.lastSession = {
            id: `claude_${String(item.sessionId).slice(0, 8)}`,
            conversationId: item.sessionId,
            provider: "claude-code",
            name: `Claude Code #${String(item.sessionId).slice(0, 8)}`,
            model: "claude-3.5-sonnet",
            status: "working",
            activity: String(item.display).slice(0, 140),
            activeFile: item.project ? import_path3.default.basename(item.project) : void 0,
            lastActiveAt: occurredAt,
            machine: this.hostname,
            operatorName: this.operatorName
          };
          hasNew = true;
          if (emitEvent) {
            emitEvent({
              id: `evt_${Date.now()}_claude_act`,
              schemaVersion: 1,
              deviceId: this.deviceId,
              projectId: this.projectId,
              occurredAt,
              source: "claude-code",
              type: "agent.task_started",
              data: {
                sessionId: item.sessionId,
                activity: item.display,
                project: item.project
              }
            });
          }
        }
      } catch {
      }
    }
    if (hasNew) {
      onSessionUpdate(this.getActiveSessions());
    }
  }
};

// apps/bridge/src/observers/conversation-manager.ts
var MultiConversationManager = class {
  apiUrl;
  deviceId;
  projectId;
  operatorName;
  enabledProviders;
  onEmitEvent;
  antigravityObserver;
  claudeObserver;
  lastSyncedSessions = [];
  syncTimer = null;
  constructor(options) {
    this.apiUrl = options.apiUrl;
    this.deviceId = options.deviceId;
    this.projectId = options.projectId;
    this.operatorName = options.operatorName;
    this.enabledProviders = options.enabledProviders;
    this.onEmitEvent = options.onEmitEvent;
    this.antigravityObserver = new AntigravityConversationObserver(
      this.deviceId,
      this.projectId,
      this.operatorName
    );
    this.claudeObserver = new ClaudeCodeSessionObserver(
      this.deviceId,
      this.projectId,
      this.operatorName
    );
  }
  start() {
    const handleUpdate = () => {
      this.syncActiveSessionsToCloud();
    };
    if (this.enabledProviders.includes("antigravity")) {
      this.antigravityObserver.start((_) => handleUpdate(), this.onEmitEvent);
    }
    if (this.enabledProviders.includes("claude-code")) {
      this.claudeObserver.start((_) => handleUpdate(), this.onEmitEvent);
    }
    this.syncActiveSessionsToCloud();
    this.syncTimer = setInterval(() => {
      this.syncActiveSessionsToCloud();
    }, 1e4);
  }
  stop() {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
      this.syncTimer = null;
    }
    this.antigravityObserver.stop();
    this.claudeObserver.stop();
  }
  getAllActiveSessions() {
    const list = [];
    if (this.enabledProviders.includes("antigravity")) {
      list.push(...this.antigravityObserver.getActiveSessions());
    }
    if (this.enabledProviders.includes("claude-code")) {
      list.push(...this.claudeObserver.getActiveSessions());
    }
    return list;
  }
  async syncActiveSessionsToCloud() {
    const active = this.getAllActiveSessions();
    this.lastSyncedSessions = active;
    const cleanBase = this.apiUrl.replace(/\/$/, "");
    const endpoint = cleanBase.endsWith("/api/v1") ? `${cleanBase}/agents/active` : `${cleanBase}/api/v1/agents/active`;
    const payload = {
      roomId: this.projectId,
      deviceId: this.deviceId,
      agents: active
    };
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch (err) {
    }
  }
};

// apps/bridge/src/core/daemon.ts
var VibeHubBridgeDaemon = class {
  version = "0.1.5";
  apiUrl;
  deviceId;
  projectId;
  projectRoot;
  activeAgentsList;
  operatorName;
  operatorRole;
  redactor;
  transport;
  gitCollector;
  fileWatcher;
  antigravityAdapter;
  claudeCodeAdapter;
  cursorAdapter;
  conversationManager;
  gitPollTimer = null;
  isRunning = false;
  constructor(options = {}) {
    this.apiUrl = options.apiUrl || process.env.VIBEHUB_API_URL || "https://viber-hub.vercel.app/api/v1";
    this.deviceId = options.deviceId || process.env.VIBEHUB_DEVICE_ID || "dev_win32_local";
    this.projectId = options.projectId || process.env.VIBEHUB_PROJECT_ID || "viberhub-8842f";
    this.projectRoot = options.projectRoot || process.cwd();
    this.activeAgentsList = options.activeAgents || ["antigravity", "claude-code", "cursor"];
    this.operatorName = options.operatorName || "Jakub (Operator)";
    this.operatorRole = options.operatorRole || "Systems & Observability Architect";
    this.redactor = new RedactionEngine(this.projectRoot);
    this.transport = new HttpTransport({
      baseUrl: this.apiUrl,
      deviceId: this.deviceId,
      projectId: this.projectId,
      bridgeVersion: this.version
    });
    this.gitCollector = new GitCollector(this.projectRoot, this.deviceId, this.projectId, this.redactor);
    this.fileWatcher = new FileWatcherCollector(this.projectRoot, this.deviceId, this.projectId, this.redactor);
    this.antigravityAdapter = new AntigravityAdapter(this.redactor);
    this.claudeCodeAdapter = new ClaudeCodeAdapter(this.redactor);
    this.cursorAdapter = new CursorAdapter(this.redactor);
    this.conversationManager = new MultiConversationManager({
      apiUrl: this.apiUrl,
      deviceId: this.deviceId,
      projectId: this.projectId,
      operatorName: this.operatorName,
      enabledProviders: this.activeAgentsList,
      onEmitEvent: (event) => {
        this.emitEvent(event);
      }
    });
  }
  async start() {
    console.log("================================================================");
    console.log(`[*] INFO :: VibeHub Bridge Daemon v${this.version} starting...`);
    console.log(`[*] INFO :: Target API: ${this.apiUrl}`);
    console.log(`[*] INFO :: Device ID: ${this.deviceId}`);
    console.log(`[*] INFO :: Operator: ${this.operatorName} [${this.operatorRole}]`);
    console.log(`[*] INFO :: Active Agents: ${this.activeAgentsList.join(", ")}`);
    console.log(`[*] INFO :: Project ID: ${this.projectId}`);
    console.log(`[*] INFO :: Project Root: ${this.projectRoot}`);
    console.log("================================================================");
    this.isRunning = true;
    this.transport.start();
    this.fileWatcher.start(async (event) => {
      this.emitEvent(event);
    });
    const adapterContext = {
      projectId: this.projectId,
      projectRoot: this.projectRoot,
      deviceId: this.deviceId,
      config: {
        operatorName: this.operatorName,
        operatorRole: this.operatorRole
      }
    };
    if (this.activeAgentsList.includes("antigravity")) {
      await this.antigravityAdapter.start(adapterContext, async (event) => {
        this.emitEvent(event);
      });
    }
    if (this.activeAgentsList.includes("claude-code")) {
      await this.claudeCodeAdapter.start(adapterContext, async (event) => {
        this.emitEvent(event);
      });
    }
    if (this.activeAgentsList.includes("cursor")) {
      await this.cursorAdapter.start(adapterContext, async (event) => {
        this.emitEvent(event);
      });
    }
    this.gitPollTimer = setInterval(async () => {
      if (!this.isRunning) return;
      await this.gitCollector.pollGitState(async (event) => {
        this.emitEvent(event);
      });
    }, 5e3);
    await this.gitCollector.pollGitState(async (event) => {
      this.emitEvent(event);
    });
    this.conversationManager.start();
    await this.registerDevice();
    console.log("[+] SUCCESS :: VibeHub Bridge Daemon running and listening (Multi-Agent & Real-Time Observer Active).");
  }
  async registerDevice() {
    const cleanBase = this.apiUrl.replace(/\/$/, "");
    const endpoint = cleanBase.endsWith("/api/v1") ? `${cleanBase}/bridge/pair` : `${cleanBase}/api/v1/bridge/pair`;
    const cpus = import_os3.default.cpus();
    const payload = {
      pairingCode: "VH-DIRECT-SYNC",
      hostname: import_os3.default.hostname(),
      platform: process.platform === "win32" || process.platform === "darwin" || process.platform === "linux" ? process.platform : "linux",
      bridgeVersion: this.version,
      operator: {
        name: this.operatorName,
        role: this.operatorRole
      },
      activeAgents: this.activeAgentsList,
      workspaceRoot: this.projectRoot,
      systemInfo: {
        cpu: `${cpus[0]?.model || "Processor"} (${cpus.length} rdzeni)`,
        memory: `${Math.round(import_os3.default.totalmem() / 1024 / 1024 / 1024)}GB`,
        os: `${import_os3.default.type()} ${import_os3.default.release()}`
      }
    };
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      console.log(`[+] SUCCESS :: Stacja robocza ${import_os3.default.hostname()} pomy\u015Blnie powi\u0105zana z klastrem.`);
    } catch (err) {
      console.warn("[!] ALERT :: Device registration warning:", err.message);
    }
  }
  emitEvent(event) {
    const { redactedData } = this.redactor.sanitizeObject(event.data);
    const sanitizedEvent = {
      ...event,
      data: redactedData
    };
    this.transport.enqueue(sanitizedEvent);
  }
  async stop() {
    console.log("[*] INFO :: Stopping VibeHub Bridge Daemon...");
    this.isRunning = false;
    if (this.gitPollTimer) {
      clearInterval(this.gitPollTimer);
      this.gitPollTimer = null;
    }
    this.conversationManager.stop();
    await this.fileWatcher.stop();
    await this.antigravityAdapter.stop();
    await this.claudeCodeAdapter.stop();
    await this.cursorAdapter.stop();
    await this.transport.stop();
    console.log("[+] SUCCESS :: VibeHub Bridge Daemon stopped cleanly.");
  }
};

// apps/bridge/src/core/scanner.ts
var import_os4 = __toESM(require("os"));
var import_fs3 = __toESM(require("fs"));
var import_path4 = __toESM(require("path"));
var import_child_process2 = require("child_process");
function checkBinaryInstalled(cmd) {
  try {
    const checkCmd = process.platform === "win32" ? `where.exe ${cmd}` : `which ${cmd}`;
    (0, import_child_process2.execSync)(checkCmd, { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}
function scanSystemEnvironment(targetDir = process.cwd()) {
  const homeDir = import_os4.default.homedir();
  const totalMemMB = Math.round(import_os4.default.totalmem() / (1024 * 1024));
  const freeMemMB = Math.round(import_os4.default.freemem() / (1024 * 1024));
  const usedMemMB = totalMemMB - freeMemMB;
  const memoryUsageFormatted = `${usedMemMB}MB / ${Math.round(totalMemMB / 1024)}GB (Wolne: ${Math.round(freeMemMB / 1024)}GB)`;
  const cpus = import_os4.default.cpus() || [];
  const cpuModel = cpus[0]?.model?.trim() || "Generic Processor";
  const cpuCores = cpus.length;
  const ipAddresses = [];
  try {
    const ifaces = import_os4.default.networkInterfaces();
    for (const name of Object.keys(ifaces)) {
      for (const iface of ifaces[name] || []) {
        if (iface.family === "IPv4" && !iface.internal) {
          ipAddresses.push(iface.address);
        }
      }
    }
  } catch {
  }
  const installedTools = {
    hasAntigravity: checkBinaryInstalled("agy") || checkBinaryInstalled("antigravity"),
    hasClaudeCode: checkBinaryInstalled("claude"),
    hasCursor: checkBinaryInstalled("cursor"),
    hasVsCode: checkBinaryInstalled("code"),
    hasGit: checkBinaryInstalled("git"),
    hasPnpm: checkBinaryInstalled("pnpm")
  };
  let antigravityBrainsCount = 0;
  const agyBrainDir = import_path4.default.join(homeDir, ".gemini", "antigravity", "brain");
  try {
    if (import_fs3.default.existsSync(agyBrainDir)) {
      const entries = import_fs3.default.readdirSync(agyBrainDir, { withFileTypes: true });
      antigravityBrainsCount = entries.filter((e) => e.isDirectory() && !e.name.startsWith(".")).length;
    }
  } catch {
  }
  const claudeConfigDir = import_path4.default.join(homeDir, ".claude");
  const hasClaudeSession = import_fs3.default.existsSync(claudeConfigDir);
  const hasCursorRules = import_fs3.default.existsSync(import_path4.default.join(targetDir, ".cursorrules")) || import_fs3.default.existsSync(import_path4.default.join(targetDir, ".cursor"));
  let isGitRepo = false;
  let branch = "main";
  let lastCommit = "0000000";
  let commitMessage = "No git repository detected";
  let modifiedFilesCount = 0;
  try {
    (0, import_child_process2.execSync)("git rev-parse --is-inside-work-tree", { cwd: targetDir, stdio: "ignore" });
    isGitRepo = true;
    branch = (0, import_child_process2.execSync)("git rev-parse --abbrev-ref HEAD", { cwd: targetDir, encoding: "utf-8" }).trim();
    lastCommit = (0, import_child_process2.execSync)("git rev-parse --short HEAD", { cwd: targetDir, encoding: "utf-8" }).trim();
    commitMessage = (0, import_child_process2.execSync)("git log -1 --pretty=format:%s", { cwd: targetDir, encoding: "utf-8" }).trim();
    const statusRaw = (0, import_child_process2.execSync)("git status --porcelain", { cwd: targetDir, encoding: "utf-8" }).trim();
    if (statusRaw) {
      modifiedFilesCount = statusRaw.split("\n").filter(Boolean).length;
    }
  } catch {
  }
  return {
    hostname: import_os4.default.hostname(),
    platform: process.platform,
    arch: import_os4.default.arch(),
    osRelease: import_os4.default.release(),
    osType: import_os4.default.type(),
    uptimeSeconds: Math.floor(import_os4.default.uptime()),
    cpuModel,
    cpuCores,
    totalMemoryMB: totalMemMB,
    freeMemoryMB: freeMemMB,
    memoryUsageFormatted,
    ipAddresses,
    nodeVersion: process.version,
    username: import_os4.default.userInfo()?.username || "Operator",
    installedTools,
    detectedAiAgents: {
      antigravityBrainsCount,
      hasClaudeSession,
      hasCursorRules
    },
    git: {
      isGitRepo,
      branch,
      lastCommit,
      commitMessage,
      modifiedFilesCount
    }
  };
}

// apps/bridge/src/mcp/server.ts
var import_readline = __toESM(require("readline"));
var import_os5 = __toESM(require("os"));
var VibeHubMcpServer = class {
  apiUrl;
  roomId;
  deviceId;
  agentProvider;
  constructor(config = {}) {
    this.apiUrl = config.apiUrl || process.env.VIBEHUB_API_URL || "https://viber-hub.vercel.app/api/v1";
    this.roomId = config.roomId || "viberhub-8842f";
    this.deviceId = config.deviceId || `dev_${process.platform}_${import_os5.default.hostname()}`;
    this.agentProvider = config.agentProvider || "antigravity";
  }
  start() {
    const rl = import_readline.default.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    });
    rl.on("line", async (line) => {
      const trimmed = line.trim();
      if (!trimmed) return;
      try {
        const message = JSON.parse(trimmed);
        await this.handleMessage(message);
      } catch (err) {
        this.sendError(null, -32700, `Parse error: ${err.message}`);
      }
    });
    console.error(`[*] INFO :: VibeHub MCP Server v0.1.4 active on stdio. Room: ${this.roomId}`);
  }
  async handleMessage(message) {
    const { id, method, params } = message;
    if (method === "initialize") {
      this.sendResponse(id, {
        protocolVersion: "2024-11-05",
        capabilities: {
          tools: {}
        },
        serverInfo: {
          name: "vibehub-mcp",
          version: "0.1.4"
        }
      });
      return;
    }
    if (method === "notifications/initialized" || method === "initialized") {
      return;
    }
    if (method === "ping") {
      this.sendResponse(id, {});
      return;
    }
    if (method === "tools/list") {
      this.sendResponse(id, {
        tools: [
          {
            name: "vibehub_push_status",
            description: "Report live agent status, current prompt, active tool and code diff directly to VibeHub dashboard.",
            inputSchema: {
              type: "object",
              properties: {
                status: {
                  type: "string",
                  enum: ["working", "waiting", "idle", "error"],
                  description: "Current agent execution state"
                },
                activity: {
                  type: "string",
                  description: "Description of current task or user prompt being executed"
                },
                currentTool: {
                  type: "string",
                  description: "Name of the tool being called (e.g. edit_file, run_command, git_commit)"
                },
                activeFile: {
                  type: "string",
                  description: "Active file or target path being modified"
                },
                diff: {
                  type: "string",
                  description: "Code diff or snippet of changes (+ added, - removed lines)"
                },
                name: {
                  type: "string",
                  description: "Name of the AI model / agent (e.g. Google Antigravity, Claude Code, Cursor)"
                },
                model: {
                  type: "string",
                  description: "Model identifier (e.g. Gemini 3.8 Flash, Claude 3.7 Sonnet)"
                }
              },
              required: ["status", "activity"]
            }
          },
          {
            name: "vibehub_checkpoint",
            description: "Record an architectural milestone or code checkpoint in the VibeHub room.",
            inputSchema: {
              type: "object",
              properties: {
                title: { type: "string", description: "Title of the checkpoint" },
                summary: { type: "string", description: "Engineering summary of changes" },
                files: {
                  type: "array",
                  items: { type: "string" },
                  description: "List of modified or affected files"
                }
              },
              required: ["title", "summary"]
            }
          },
          {
            name: "vibehub_get_status",
            description: "Get current cluster telemetry, connected devices and active room status.",
            inputSchema: {
              type: "object",
              properties: {}
            }
          }
        ]
      });
      return;
    }
    if (method === "tools/call") {
      const toolName = params?.name;
      const args = params?.arguments || {};
      try {
        const result = await this.executeTool(toolName, args);
        this.sendResponse(id, {
          content: [
            {
              type: "text",
              text: typeof result === "string" ? result : JSON.stringify(result, null, 2)
            }
          ]
        });
      } catch (err) {
        this.sendResponse(id, {
          isError: true,
          content: [
            {
              type: "text",
              text: `[!] ALERT :: Tool execution failed: ${err.message}`
            }
          ]
        });
      }
      return;
    }
    if (id !== void 0) {
      this.sendError(id, -32601, `Method not found: ${method}`);
    }
  }
  async executeTool(name, args) {
    const cleanBase = this.apiUrl.replace(/\/$/, "");
    if (name === "vibehub_push_status") {
      const { status, activity, currentTool, activeFile, diff, model } = args;
      const agentDisplayName = args.name || `${this.agentProvider.toUpperCase()} AI Agent`;
      try {
        await fetch(`${cleanBase}/agents/active`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomId: this.roomId,
            agents: [
              {
                id: `mcp_${this.agentProvider}_${this.deviceId}`,
                provider: this.agentProvider,
                name: agentDisplayName,
                model: model || "Autonomous AI",
                status: status || "working",
                activity: activity || "Wykonywanie zada\u0144 projektowych",
                currentTool: currentTool || "mcp_execution",
                activeFile: activeFile || "",
                fileStats: activeFile ? "+ modified" : void 0,
                diffSnippet: diff ? String(diff).split("\n").slice(0, 10).map((l, idx) => ({
                  line: idx + 1,
                  type: l.startsWith("+") ? "+" : l.startsWith("-") ? "-" : " ",
                  text: l.slice(0, 80)
                })) : void 0,
                machine: import_os5.default.hostname(),
                operatorName: import_os5.default.userInfo().username || "Operator",
                lastActiveAt: (/* @__PURE__ */ new Date()).toISOString()
              }
            ]
          })
        });
      } catch (err) {
        console.error("[!] ALERT :: MCP agent sync failed:", err.message);
      }
      const endpoint = `${cleanBase}/events/batch`;
      const eventPayload = {
        schemaVersion: 1,
        projectId: this.roomId,
        deviceId: this.deviceId,
        events: [
          {
            id: `evt_mcp_${Date.now()}`,
            schemaVersion: 1,
            deviceId: this.deviceId,
            projectId: this.roomId,
            occurredAt: (/* @__PURE__ */ new Date()).toISOString(),
            source: this.agentProvider,
            type: "agent.status_changed",
            data: {
              status,
              activity,
              currentTool,
              activeFile,
              source: "mcp"
            }
          }
        ]
      };
      try {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventPayload)
        });
      } catch (err) {
        console.error("[!] ALERT :: MCP event dispatch failed:", err.message);
      }
      return {
        success: true,
        message: `Status updated to '${status}': ${activity}`,
        agent: agentDisplayName,
        roomId: this.roomId,
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
    }
    if (name === "vibehub_checkpoint") {
      const { title, summary, files } = args;
      const endpoint = `${cleanBase}/events/batch`;
      const eventPayload = {
        schemaVersion: 1,
        projectId: this.roomId,
        deviceId: this.deviceId,
        events: [
          {
            id: `evt_cp_${Date.now()}`,
            schemaVersion: 1,
            deviceId: this.deviceId,
            projectId: this.roomId,
            occurredAt: (/* @__PURE__ */ new Date()).toISOString(),
            source: this.agentProvider,
            type: "agent.task_completed",
            data: {
              title,
              summary,
              files: files || [],
              source: "mcp"
            }
          }
        ]
      };
      try {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(eventPayload)
        });
      } catch (err) {
        console.error("[!] ALERT :: MCP checkpoint dispatch failed:", err.message);
      }
      return {
        success: true,
        checkpointId: `cp_${Date.now()}`,
        title,
        message: "Checkpoint persisted to VibeHub cluster."
      };
    }
    if (name === "vibehub_get_status") {
      const endpoint = `${cleanBase}/system/status`;
      try {
        const res = await fetch(endpoint);
        const data = await res.json();
        return data;
      } catch (err) {
        return {
          status: "online",
          roomId: this.roomId,
          deviceId: this.deviceId,
          warning: `Failed to fetch remote status: ${err.message}`
        };
      }
    }
    throw new Error(`Unknown tool: ${name}`);
  }
  sendResponse(id, result) {
    const response = {
      jsonrpc: "2.0",
      id,
      result
    };
    process.stdout.write(JSON.stringify(response) + "\n");
  }
  sendError(id, code, message) {
    const response = {
      jsonrpc: "2.0",
      id,
      error: { code, message }
    };
    process.stdout.write(JSON.stringify(response) + "\n");
  }
};

// apps/bridge/src/cli.ts
var DEFAULT_API_URL = process.env.VIBEHUB_API_URL || "https://viber-hub.vercel.app/api/v1";
var GLOBAL_CONFIG_DIR = import_path5.default.join(import_os6.default.homedir(), ".vibehub");
var GLOBAL_CONFIG_FILE = import_path5.default.join(GLOBAL_CONFIG_DIR, "bridge.json");
function loadConfig() {
  try {
    if (import_fs4.default.existsSync(GLOBAL_CONFIG_FILE)) {
      const raw = import_fs4.default.readFileSync(GLOBAL_CONFIG_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch {
  }
  return null;
}
function saveConfig(cfg) {
  try {
    if (!import_fs4.default.existsSync(GLOBAL_CONFIG_DIR)) {
      import_fs4.default.mkdirSync(GLOBAL_CONFIG_DIR, { recursive: true });
    }
    import_fs4.default.writeFileSync(GLOBAL_CONFIG_FILE, JSON.stringify(cfg, null, 2), "utf-8");
  } catch (err) {
    console.warn("[!] ALERT :: Could not save config to ~/.vibehub/bridge.json:", err);
  }
}
function ask(rl, questionText, defaultValue = "") {
  return new Promise((resolve) => {
    const promptText = defaultValue ? `${questionText} [${defaultValue}]: ` : `${questionText}: `;
    rl.question(promptText, (answer) => {
      resolve(answer.trim() || defaultValue);
    });
  });
}
function parseAiSelection(choice) {
  const c = choice.trim();
  if (c === "1") return ["antigravity"];
  if (c === "2") return ["claude-code"];
  if (c === "3") return ["cursor"];
  return ["antigravity", "claude-code", "cursor"];
}
function getSafeProjectRoot() {
  const cwd = process.cwd();
  const home = import_os6.default.homedir();
  if (import_path5.default.resolve(cwd) === import_path5.default.resolve(home)) {
    const candidate = import_path5.default.join(home, "Desktop", "01_PROJEKTY", "ViberHub");
    if (import_fs4.default.existsSync(candidate)) {
      return candidate;
    }
    const projectsDir = import_path5.default.join(home, "Desktop");
    if (import_fs4.default.existsSync(projectsDir)) {
      return projectsDir;
    }
  }
  return cwd;
}
async function pairDeviceWithTelemetry(pairingCode, apiUrl, operatorName, operatorRole, activeAgents, projectRoot, telemetry) {
  const payload = {
    pairingCode: pairingCode.trim(),
    hostname: import_os6.default.hostname(),
    platform: process.platform === "win32" || process.platform === "darwin" || process.platform === "linux" ? process.platform : "linux",
    bridgeVersion: "0.1.4",
    operator: {
      name: operatorName,
      role: operatorRole
    },
    activeAgents,
    workspaceRoot: projectRoot,
    systemInfo: {
      cpu: `${telemetry.cpuModel} (${telemetry.cpuCores} cores)`,
      memory: telemetry.memoryUsageFormatted,
      os: `${telemetry.osType} ${telemetry.osRelease}`,
      ipAddresses: telemetry.ipAddresses,
      installedTools: telemetry.installedTools,
      gitBranch: telemetry.git.branch,
      lastCommit: telemetry.git.lastCommit
    }
  };
  const cleanBase = apiUrl.replace(/\/$/, "");
  const pairEndpoint = cleanBase.endsWith("/api/v1") ? `${cleanBase}/bridge/pair` : `${cleanBase}/api/v1/bridge/pair`;
  const response = await fetch(pairEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`B\u0142\u0105d parowania (HTTP ${response.status}): ${errorText}`);
  }
  const data = await response.json();
  if (!data.success) {
    throw new Error(`Serwer odrzuci\u0142 parowanie: ${data.error || "Nieznany b\u0142\u0105d"}`);
  }
  const saved = {
    deviceId: data.deviceId,
    deviceToken: data.deviceToken,
    apiUrl,
    roomId: "viberhub-8842f",
    pairedAt: data.pairedAt || (/* @__PURE__ */ new Date()).toISOString(),
    hostname: import_os6.default.hostname(),
    operatorName,
    operatorRole,
    activeAgents,
    projectRoot,
    hasCompletedInitialSetup: true,
    systemTelemetry: telemetry
  };
  saveConfig(saved);
  console.log("\n================================================================");
  console.log(`[+] SUCCESS :: Stacja pomy\u015Blnie powi\u0105zana z klastrem VibeHub!`);
  console.log(`[*] INFO :: Przypisany Device ID: ${saved.deviceId}`);
  console.log(`[*] INFO :: Aktywne agenty: ${activeAgents.join(", ")}`);
  console.log(`[*] INFO :: Monitorowany projekt: ${saved.projectRoot}`);
  console.log(`[*] INFO :: Po\u015Bwiadczenia zapisane w: ${GLOBAL_CONFIG_FILE}`);
  console.log("================================================================\n");
  return saved;
}
async function checkStatus(apiUrl = DEFAULT_API_URL) {
  console.log(`[*] INFO :: Sprawdzanie \u0142\u0105czno\u015Bci z mikroserwerem VibeHub (${apiUrl})...`);
  const cleanBase = apiUrl.replace(/\/$/, "");
  const healthEndpoint = cleanBase.endsWith("/api/v1") ? `${cleanBase}/health` : `${cleanBase}/api/v1/health`;
  try {
    const res = await fetch(healthEndpoint);
    if (res.ok) {
      const data = await res.json();
      console.log(`[+] SUCCESS :: Backend mikroserwera Vercel aktywny i dost\u0119pny.`);
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.error(`[!] ALERT :: Serwer zwr\xF3ci\u0142 status ${res.status}`);
    }
  } catch (err) {
    console.error(`[!] ALERT :: B\u0142\u0105d po\u0142\u0105czenia:`, err.message);
  }
}
function showHelp() {
  console.log(`
VibeHub Bridge CLI \u2014 Narz\u0119dzie obserwowalno\u015Bci i parowania agent\xF3w AI

U\u017BYCIE:
  vibehub pair [KOD]            Sparuj t\u0119 stacj\u0119 robocz\u0105 za pomoc\u0105 kodu (np. VH-9428-XK)
  vibehub start                 Uruchom demona telemetrycznego w tle
  vibehub status                Sprawd\u017A status po\u0142\u0105czenia z backendem
  vibehub mcp                   Uruchom serwer MCP (Model Context Protocol) na stdio
  vibehub setup-mcp             Zarejestruj serwer VibeHub MCP w konfiguracji Antigravity
  vibehub reset                 Zresetuj zapisane po\u015Bwiadczenia stacji
  vibehub --help                Wy\u015Bwietl pomoc

PRZYK\u0141ADY:
  vibehub pair VH-9428-XK
  vibehub start
  pnpm bridge pair VH-9428-XK
`);
}
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || "start";
  if (command === "--help" || command === "-h" || command === "help") {
    showHelp();
    process.exit(0);
  }
  if (command === "status") {
    await checkStatus();
    process.exit(0);
  }
  if (command === "mcp") {
    const savedConfig2 = loadConfig();
    const server = new VibeHubMcpServer({
      apiUrl: savedConfig2?.apiUrl || DEFAULT_API_URL,
      roomId: savedConfig2?.roomId || "viberhub-8842f",
      deviceId: savedConfig2?.deviceId
    });
    server.start();
    return;
  }
  if (command === "setup-mcp") {
    const home = import_os6.default.homedir();
    const serverDefinition = {
      command: "vibehub",
      args: ["mcp"],
      env: {
        VIBEHUB_ROOM_ID: "viberhub-8842f",
        VIBEHUB_API_URL: DEFAULT_API_URL
      }
    };
    const targetPaths = [
      import_path5.default.join(home, ".gemini", "antigravity", "mcp.json"),
      import_path5.default.join(home, ".cursor", "mcp.json"),
      import_path5.default.join(process.cwd(), ".mcp.json"),
      import_path5.default.join(home, "AppData", "Roaming", "Claude", "claude_desktop_config.json")
    ];
    let registeredCount = 0;
    for (const targetPath of targetPaths) {
      try {
        const dir = import_path5.default.dirname(targetPath);
        if (!import_fs4.default.existsSync(dir)) {
          import_fs4.default.mkdirSync(dir, { recursive: true });
        }
        let configObj = { mcpServers: {} };
        if (import_fs4.default.existsSync(targetPath)) {
          try {
            configObj = JSON.parse(import_fs4.default.readFileSync(targetPath, "utf-8"));
          } catch {
            configObj = { mcpServers: {} };
          }
        }
        if (!configObj.mcpServers) configObj.mcpServers = {};
        configObj.mcpServers["vibehub"] = serverDefinition;
        import_fs4.default.writeFileSync(targetPath, JSON.stringify(configObj, null, 2), "utf-8");
        console.log(`[+] SUCCESS :: Zarejestrowano VibeHub MCP Server w: ${targetPath}`);
        registeredCount++;
      } catch (err) {
      }
    }
    console.log(`[*] INFO :: Serwer MCP VibeHub aktywny w ${registeredCount} lokalizacjach!`);
    console.log(`[*] INFO :: Agenty AI (Antigravity, Cursor, Claude) maj\u0105 teraz natywny dost\u0119p do narz\u0119dzia 'vibehub_push_status'.`);
    process.exit(0);
  }
  if (command === "reset") {
    try {
      if (import_fs4.default.existsSync(GLOBAL_CONFIG_FILE)) {
        import_fs4.default.unlinkSync(GLOBAL_CONFIG_FILE);
      }
      console.log("[+] SUCCESS :: Zresetowano konfiguracj\u0119 stacji ~/.vibehub/bridge.json.");
    } catch (err) {
      console.error("[!] ALERT :: B\u0142\u0105d resetowania:", err);
    }
    process.exit(0);
  }
  const savedConfig = loadConfig();
  const isFirstTime = !savedConfig || !savedConfig.hasCompletedInitialSetup;
  const safeRoot = getSafeProjectRoot();
  const telemetry = scanSystemEnvironment(safeRoot);
  const rl = import_readline2.default.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let chosenAgents = ["antigravity", "claude-code", "cursor"];
  let operatorName = savedConfig?.operatorName || telemetry.username || "Jakub (Operator)";
  let operatorRole = savedConfig?.operatorRole || "Systems & Observability Architect";
  let projectRoot = savedConfig?.projectRoot || safeRoot;
  let deviceId = savedConfig?.deviceId;
  let apiUrl = savedConfig?.apiUrl || DEFAULT_API_URL;
  if (isFirstTime) {
    console.log("================================================================");
    console.log(`[*] INFO :: VibeHub Bridge CLI v0.1.5 \u2014 Inicjalizacja Stacji Roboczej`);
    console.log(`[*] INFO :: Maszyna: ${telemetry.hostname} (${telemetry.platform} ${telemetry.arch})`);
    console.log(`[*] INFO :: CPU: ${telemetry.cpuModel} (${telemetry.cpuCores} cores) | RAM: ${telemetry.memoryUsageFormatted}`);
    const toolsDetected = [];
    if (telemetry.installedTools.hasAntigravity) toolsDetected.push("Antigravity");
    if (telemetry.installedTools.hasClaudeCode) toolsDetected.push("Claude Code");
    if (telemetry.installedTools.hasCursor) toolsDetected.push("Cursor");
    if (telemetry.installedTools.hasGit) toolsDetected.push("Git");
    console.log(`[*] INFO :: Wykryte narz\u0119dzia w systemie: ${toolsDetected.join(", ") || "Brak"}`);
    console.log("================================================================\n");
    console.log("[?] Kt\xF3rego narz\u0119dzia Coding AI g\u0142\xF3wnie u\u017Cywasz?");
    console.log("  1) Google Antigravity CLI (agy)");
    console.log("  2) Claude Code (Anthropic)");
    console.log("  3) Cursor AI Agent");
    console.log("  4) Wszystkie aktywne / Auto-detect [Domy\u015Blnie - Wci\u015Bnij ENTER]");
    const aiChoice = await ask(rl, "Wyb\xF3r (1-4)", "4");
    chosenAgents = parseAiSelection(aiChoice);
    let pairingCode = args[1];
    if (!pairingCode) {
      pairingCode = await ask(rl, "[+] Wpisz kod parowania z aplikacji (np. VH-9428-XK)", "VH-9428-XK");
    }
    try {
      const paired = await pairDeviceWithTelemetry(
        pairingCode,
        apiUrl,
        operatorName,
        operatorRole,
        chosenAgents,
        projectRoot,
        telemetry
      );
      deviceId = paired.deviceId;
    } catch (err) {
      console.error(`[!] ALERT :: B\u0142\u0105d parowania:`, err.message);
      rl.close();
      process.exit(1);
    }
  } else {
    console.log("================================================================");
    console.log(`[*] INFO :: Witaj ponownie, ${operatorName}!`);
    console.log(`[*] INFO :: Stacja: ${savedConfig.hostname} (Device ID: ${savedConfig.deviceId})`);
    console.log(`[*] INFO :: Monitorowany projekt: ${projectRoot}`);
    console.log("================================================================\n");
    console.log("[?] Kt\xF3re narz\u0119dzie Coding AI aktywowa\u0107 w tej sesji?");
    console.log("  1) Google Antigravity CLI (agy)");
    console.log("  2) Claude Code");
    console.log("  3) Cursor AI Agent");
    console.log("  4) Wszystkie aktywne / Auto-detect [Domy\u015Blnie - Wci\u015Bnij ENTER]");
    const aiChoice = await ask(rl, "Wyb\xF3r (1-4)", "4");
    chosenAgents = parseAiSelection(aiChoice);
    savedConfig.activeAgents = chosenAgents;
    savedConfig.projectRoot = projectRoot;
    saveConfig(savedConfig);
  }
  rl.close();
  const daemon = new VibeHubBridgeDaemon({
    apiUrl,
    deviceId,
    projectId: "viberhub-8842f",
    projectRoot,
    activeAgents: chosenAgents,
    operatorName,
    operatorRole
  });
  await daemon.start();
  const handleShutdown = async () => {
    console.log("\n[*] INFO :: Zamykanie demona VibeHub Bridge...");
    await daemon.stop();
    process.exit(0);
  };
  process.on("SIGINT", handleShutdown);
  process.on("SIGTERM", handleShutdown);
}
main().catch((err) => {
  console.error("[!] ALERT :: Krytyczny b\u0142\u0105d CLI:", err);
  process.exit(1);
});
/*! Bundled license information:

normalize-path/index.js:
  (*!
   * normalize-path <https://github.com/jonschlinkert/normalize-path>
   *
   * Copyright (c) 2014-2018, Jon Schlinkert.
   * Released under the MIT License.
   *)

is-extglob/index.js:
  (*!
   * is-extglob <https://github.com/jonschlinkert/is-extglob>
   *
   * Copyright (c) 2014-2016, Jon Schlinkert.
   * Licensed under the MIT License.
   *)

is-glob/index.js:
  (*!
   * is-glob <https://github.com/jonschlinkert/is-glob>
   *
   * Copyright (c) 2014-2017, Jon Schlinkert.
   * Released under the MIT License.
   *)

is-number/index.js:
  (*!
   * is-number <https://github.com/jonschlinkert/is-number>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

to-regex-range/index.js:
  (*!
   * to-regex-range <https://github.com/micromatch/to-regex-range>
   *
   * Copyright (c) 2015-present, Jon Schlinkert.
   * Released under the MIT License.
   *)

fill-range/index.js:
  (*!
   * fill-range <https://github.com/jonschlinkert/fill-range>
   *
   * Copyright (c) 2014-present, Jon Schlinkert.
   * Licensed under the MIT License.
   *)
*/
