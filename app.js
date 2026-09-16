// KITA! LINE専用モード（静的版）— データはこの端末のブラウザ内だけに保存します。
(function () {
  "use strict";
  var KEY = "kita_line_names_v1";
  var SOUNDS = [
    { id: "alarm-1.mp3", name: "クラシック" },
    { id: "alarm-2.mp3", name: "こもれび" },
    { id: "alarm-3.mp3", name: "アニメ風" },
  ];

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch (e) { return []; }
  }
  function save(names) { localStorage.setItem(KEY, JSON.stringify(names)); }

  var listView = document.getElementById("listView");
  var standbyView = document.getElementById("standbyView");
  var namesEl = document.getElementById("names");
  var emptyEl = document.getElementById("empty");
  var msgEl = document.getElementById("msg");
  var nameInput = document.getElementById("nameInput");

  function render() {
    var names = load();
    emptyEl.style.display = names.length ? "none" : "block";
    namesEl.querySelectorAll(".wcard").forEach(function (n) { n.remove(); });
    names.forEach(function (n) {
      var card = document.createElement("div");
      card.className = "wcard";
      var b = document.createElement("b");
      b.textContent = n.name;
      var act = document.createElement("div");
      act.className = "actions";
      var go = document.createElement("a");
      go.className = "btn ghost";
      go.href = "app.html?w=" + encodeURIComponent(n.id);
      go.textContent = "待機画面へ";
      var del = document.createElement("button");
      del.className = "btn ghost";
      del.textContent = "削除";
      del.onclick = function () {
        if (!confirm("「" + n.name + "」を削除しますか？")) return;
        save(load().filter(function (x) { return x.id !== n.id; }));
        render();
      };
      act.appendChild(go); act.appendChild(del);
      card.appendChild(b); card.appendChild(act);
      namesEl.appendChild(card);
    });
  }

  function flash(m) {
    msgEl.textContent = m;
    setTimeout(function () { msgEl.textContent = ""; }, 2600);
  }

  document.getElementById("addForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var name = nameInput.value.trim();
    if (!name) return;
    var names = load();
    names.unshift({ id: "w" + Date.now(), name: name });
    save(names);
    nameInput.value = "";
    render();
    flash("登録しました。あとは待機画面を開いて眠るだけ。");
  });

  // ---- 待機ビュー ----
  var timerEl = document.getElementById("timer");
  var watchName = document.getElementById("watchName");
  var started = Date.now();

  function pad(n) { return String(n).padStart(2, "0"); }
  function fmt() {
    var t = Math.max(0, Math.floor((Date.now() - started) / 1000));
    return pad(Math.floor(t / 3600)) + ":" + pad(Math.floor((t % 3600) / 60)) + ":" + pad(t % 60);
  }
  setInterval(function () { if (!standbyView.classList.contains("hidden")) timerEl.textContent = fmt(); }, 1000);

  var currentId = new URLSearchParams(location.search).get("w");

  function showStandby(id) {
    var names = load();
    var n = names.filter(function (x) { return x.id === id; })[0];
    if (!n) { location.href = "app.html"; return; }
    watchName.textContent = "「" + n.name + "」を、まもってます";
    timerEl.textContent = fmt();
    listView.classList.add("hidden");
    standbyView.classList.remove("hidden");
  }

  if (currentId) { showStandby(currentId); } else { render(); }

  document.getElementById("backBtn").addEventListener("click", function () {
    location.href = "app.html";
  });

  document.getElementById("testBtn").addEventListener("click", function () {
    var audio = new Audio("sounds/" + SOUNDS[0].id);
    audio.volume = 0.9;
    audio.play().catch(function () {});
    setTimeout(function () { audio.pause(); }, 1600);
  });
})();