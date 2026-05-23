// Minimal vm shim for browser builds to avoid eval-based polyfills
export function createContext(context = {}) {
  return { ...context };
}

export function isContext(ctx) {
  return typeof ctx === 'object' && ctx !== null;
}

export function Script(code) {
  this.code = code;
}

Script.prototype.runInThisContext = function () {
  throw new Error('vm.runInThisContext is not supported in the browser');
};

Script.prototype.runInNewContext = function (context) {
  throw new Error('vm.runInNewContext is not supported in the browser');
};

export function createScript(code) {
  return new Script(code);
}

export function runInNewContext(code, context) {
  throw new Error('vm.runInNewContext is not supported in the browser');
}

export default {
  createContext,
  isContext,
  createScript,
  runInNewContext,
};
