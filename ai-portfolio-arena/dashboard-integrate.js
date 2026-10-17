"use strict";

(() => {
  const localHosts = new Set(["127.0.0.1", "localhost", "[::1]"]);
  if (!localHosts.has(window.location.hostname)) return;

  const host = document.getElementById("arena-dashboard-host");
  const fallback = document.getElementById("arena-live-local-note");
  if (!host || !fallback) return;

  const dashboardOrigin = "http://127.0.0.1:8792";
  const setFallback = (message) => {
    const detail = fallback.querySelector("p:last-child");
    if (detail) detail.textContent = message;
  };

  async function loadDashboard() {
    try {
      const response = await fetch(`${dashboardOrigin}/`, { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const documentCopy = new DOMParser().parseFromString(await response.text(), "text/html");
      const sourceMain = documentCopy.querySelector("main");
      if (!sourceMain) throw new Error("看板页面结构不完整");

      const shadow = host.attachShadow({ mode: "open" });
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = `${dashboardOrigin}/style.css`;
      shadow.append(stylesheet, sourceMain.cloneNode(true));

      const script = document.createElement("script");
      script.src = `${dashboardOrigin}/app.js`;
      script.async = false;
      script.dataset.rootId = host.id;
      script.dataset.apiUrl = `${dashboardOrigin}/api/teams`;
      script.addEventListener("error", () => {
        const message = shadow.getElementById("message");
        if (message) message.textContent = "看板交互脚本加载失败，请确认只读看板服务正在运行。";
      });
      document.body.append(script);
      host.dataset.loaded = "true";
    } catch (error) {
      setFallback(`只读看板暂时无法连接（${error.message}）。请先启动本机的共享只读结果服务；公开页面不会连接本机账户数据。`);
    }
  }

  loadDashboard();
})();
