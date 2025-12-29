(() => {
  const THEME_KEY = "bigrichtextbox:theme:v1";
  /** @type {HTMLButtonElement | null} */
  const themeToggleEl = document.getElementById("themeToggle");

  const DARK_ICON = "🌙";
  const LIGHT_ICON = "☀️";

  function getStoredTheme() {
    try {
      const v = localStorage.getItem(THEME_KEY);
      return v === "light" || v === "dark" ? v : "";
    } catch {
      return "";
    }
  }

  function setTheme(theme) {
    if (theme === "light" || theme === "dark") {
      document.documentElement.setAttribute("data-theme", theme);
      try {
        localStorage.setItem(THEME_KEY, theme);
      } catch {
      }
    } else {
      document.documentElement.removeAttribute("data-theme");
      try {
        localStorage.removeItem(THEME_KEY);
      } catch {
      }
    }

    if (themeToggleEl) {
      const current = document.documentElement.getAttribute("data-theme") || "system";
      themeToggleEl.textContent = current === "dark" ? DARK_ICON : LIGHT_ICON;
    }
  }

  if (themeToggleEl) {
    const initial = getStoredTheme();
    setTheme(initial || "dark");

    themeToggleEl.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  const STORAGE_KEY = "bigrichtextbox:quill-delta:v1";

  /** @type {HTMLElement | null} */
  const editorEl = document.getElementById("editor");
  /** @type {HTMLElement | null} */
  const toolbarEl = document.getElementById("toolbar");

  if (!editorEl || !toolbarEl) {
    return;
  }

  if (typeof window.Quill !== "function") {
    return;
  }

  const Quill = window.Quill;

  const Font = Quill.import("formats/font");
  Font.whitelist = ["inter", "serif", "monospace"];
  Quill.register(Font, true);

  function showToolbar() {
    toolbarEl.hidden = false;
  }

  function hideToolbar() {
    toolbarEl.hidden = true;
  }

  function isToolbarFocused() {
    const active = document.activeElement;
    return !!(active && toolbarEl.contains(active));
  }

  function isEventInsideEditorOrToolbar(target) {
    if (!(target instanceof Node)) {
      return false;
    }
    return editorEl.contains(target) || toolbarEl.contains(target);
  }

  function debounce(fn, delayMs) {
    /** @type {number | undefined} */
    let t;
    return () => {
      if (t) {
        window.clearTimeout(t);
      }
      t = window.setTimeout(fn, delayMs);
    };
  }

  const quill = new Quill(editorEl, {
    theme: "snow",
    modules: {
      toolbar: "#toolbar",
    },
    formats: [
      "header",
      "font",
      "bold",
      "italic",
      "underline",
      "list",
      "align",
    ],
  });

  function saveNow() {
    try {
      const delta = quill.getContents();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(delta));
    } catch {
    }
  }

  const saveDebounced = debounce(saveNow, 250);

  function restore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return;
      }
      const parsed = JSON.parse(raw);
      if (parsed) {
        quill.setContents(parsed);
      }
    } catch {
    }
  }

  restore();

  quill.on("text-change", () => {
    saveDebounced();
  });

  quill.on("selection-change", (range) => {
    if (range) {
      showToolbar();
    } else {
      if (isToolbarFocused()) {
        showToolbar();
      } else {
        hideToolbar();
      }
    }
  });

  toolbarEl.addEventListener("focusin", () => {
    showToolbar();
  });

  document.addEventListener("mousedown", (e) => {
    const target = e.target;
    if (isEventInsideEditorOrToolbar(target)) {
      showToolbar();
      return;
    }
    hideToolbar();
  });

  hideToolbar();
  quill.focus();
})();
