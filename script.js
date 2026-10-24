// ===== Frosted Glass Calculator =====
// State model: previous operand, pending operator, current input string.
// No eval() — all math goes through the safe `calculate` function.

const previousEl = document.getElementById("previous");
const currentEl = document.getElementById("current");
const previewEl = document.getElementById("preview");
const opButtons = document.querySelectorAll(".btn.op");

const state = {
  previous: null,   // number | null
  operator: null,   // "+", "−", "×", "÷" | null
  current: "0",     // string being typed
  justEvaluated: false,
  error: false,
};

/**
 * Safely compute a op b. Returns a number, or throws on division by zero.
 */
function calculate(a, op, b) {
  switch (op) {
    case "+": return a + b;
    case "−": return a - b;
    case "×": return a * b;
    case "÷":
      if (b === 0) throw new Error("DIV_ZERO");
      return a / b;
    default: return b;
  }
}

/** Round away floating-point noise (e.g. 0.1 + 0.2) and format for display. */
function format(n) {
  if (!isFinite(n)) return "Error";
  const rounded = parseFloat(n.toPrecision(12));
  return Math.abs(rounded) >= 1e12 ? rounded.toExponential(6) : String(rounded);
}

// ----- Input handlers -----

function inputDigit(d) {
  if (state.error) clearAll();
  if (state.justEvaluated) { state.current = "0"; state.justEvaluated = false; }
  if (state.current.replace("-", "").length >= 15) return; // length cap
  state.current = state.current === "0" ? d : state.current + d;
}

function inputDecimal() {
  if (state.error) clearAll();
  if (state.justEvaluated) { state.current = "0"; state.justEvaluated = false; }
  if (state.current.includes(".")) return; // block multiple decimals
  state.current += ".";
}

function chooseOperator(op) {
  if (state.error) return;
  // Repeated operator: user hasn't typed a new number — just swap the operator
  if (state.operator && state.current === "") {
    state.operator = op;
    return;
  }
  const value = parseFloat(state.current);
  if (state.previous !== null && state.operator) {
    // Chain: 5 + 3 × → compute 8 first
    try { state.previous = calculate(state.previous, state.operator, value); }
    catch { return showError(); }
  } else {
    state.previous = value;
  }
  state.operator = op;
  state.current = "";
  state.justEvaluated = false;
}

function equals() {
  if (state.error || state.operator === null || state.current === "") return;
  const expr = `${format(state.previous)} ${state.operator} ${state.current} =`;
  try {
    const result = calculate(state.previous, state.operator, parseFloat(state.current));
    state.current = format(result);
    state.previous = null;
    state.operator = null;
    state.justEvaluated = true;
    previousEl.textContent = expr;
    render(true);
  } catch {
    showError();
  }
}

function percent() {
  if (state.error || state.current === "") return;
  state.current = format(parseFloat(state.current) / 100);
}

function deleteLast() {
  if (state.error || state.justEvaluated) return clearAll();
  state.current = state.current.length > 1 ? state.current.slice(0, -1) : (state.operator ? "" : "0");
  if (state.current === "-") state.current = "0";
}

function clearAll() {
  Object.assign(state, { previous: null, operator: null, current: "0", justEvaluated: false, error: false });
  previousEl.textContent = "";
}

function showError() {
  state.error = true;
  previousEl.textContent = "";
  currentEl.textContent = "Can't divide by zero 🙈";
  currentEl.className = "current error";
  previewEl.textContent = "Press C to start over";
  opButtons.forEach((b) => b.classList.remove("active"));
}

// ----- Rendering -----

function render(keepPrevious = false) {
  if (state.error) return;
  if (!keepPrevious) {
    previousEl.textContent =
      state.operator ? `${format(state.previous)} ${state.operator}` : (state.justEvaluated ? previousEl.textContent : "");
  }
  const shown = state.current === "" ? "0" : state.current;
  currentEl.textContent = shown;
  currentEl.className = "current" + (shown.length > 10 ? " small" : "");

  // Real-time preview of the result while typing
  previewEl.textContent = "";
  if (state.operator && state.current !== "" && state.current !== ".") {
    try {
      previewEl.textContent = "= " + format(calculate(state.previous, state.operator, parseFloat(state.current)));
    } catch {
      previewEl.textContent = "= ∞ ?";
    }
  }

  // Highlight the pending operator
  opButtons.forEach((b) => b.classList.toggle("active", b.dataset.op === state.operator && state.current === ""));
}

// ----- Dispatch from buttons -----

function handleButton(btn) {
  const { value, op, action } = btn.dataset;
  if (value === ".") inputDecimal();
  else if (value !== undefined) inputDigit(value);
  else if (op) chooseOperator(op);
  else if (action === "equals") return equals();
  else if (action === "clear") clearAll();
  else if (action === "delete") deleteLast();
  else if (action === "percent") percent();
  render();
}

document.querySelector(".keys").addEventListener("click", (e) => {
  const btn = e.target.closest(".btn");
  if (btn) handleButton(btn);
});

// ----- Keyboard support -----

const keyAliases = { "=": "Enter", Delete: "Backspace", c: "Escape", C: "Escape", ",": "." };

document.addEventListener("keydown", (e) => {
  const key = keyAliases[e.key] || e.key;
  const btn = document.querySelector(`.btn[data-key="${CSS.escape(key)}"]`);
  if (!btn) return;
  e.preventDefault();
  // Animate matching on-screen button
  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 140);
  handleButton(btn);
});

render();
window.focus(); // so keyboard input works right away
