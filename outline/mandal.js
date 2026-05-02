const gridOrder = ["g32", "g31", "g21", "g11", "g12", "g13", "g23", "g33"];
let currentSubject = "";
let currentPartIdx = 0; // 0-7
let isZoomed = false;

// 觸控座標
let touchStartX = 0;
let touchEndX = 0;

function parseMd(text) {
  if (!text) return "<em>(尚無資料)</em>";
  return text
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^- (.*$)/gim, "<ul><li>$1</li></ul>")
    .replace(/\n/g, "<br>");
}

function updateContent() {
  if (!currentSubject) return;
  const data = window.MANDALA_DATA[currentSubject];
  const name = window.SUBJECT_MAP[currentSubject];

  document.getElementById("g22").innerText = name;

  gridOrder.forEach((gridId, index) => {
    const partNo = index + 1;
    const raw = data ? data[partNo] : "";
    const gridEl = document.getElementById(gridId);
    gridEl.querySelector(".content").innerHTML = parseMd(raw);
  });

  if (isZoomed) {
    const activeId = gridOrder[currentPartIdx];
    const content = document.querySelector(`#${activeId} .content`).innerHTML;
    document.getElementById("zoomBody").innerHTML =
      `<div class="content"><h1>Part ${currentPartIdx + 1}</h1><hr>${content}</div>`;
    document.getElementById("prevBtn").disabled = currentPartIdx === 0;
    document.getElementById("nextBtn").disabled = currentPartIdx === 7;
  }
}

function movePart(dir) {
  const newIdx = currentPartIdx + dir;
  if (newIdx >= 0 && newIdx <= 7) {
    currentPartIdx = newIdx;
    updateFocus();
    updateContent();
  }
}

function updateFocus() {
  document
    .querySelectorAll(".grid-item")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById(gridOrder[currentPartIdx]).classList.add("active");
}

function toggleZoom(force) {
  isZoomed = force !== undefined ? force : !isZoomed;
  document.getElementById("zoomView").style.display = isZoomed
    ? "flex"
    : "none";
  if (isZoomed) updateContent();
}

// 觸控滑動邏輯
function handleSwipe() {
  const threshold = 50;
  if (touchEndX - touchStartX > threshold) movePart(-1); // Swipe Right -> Next (依要求)
  if (touchStartX - touchEndX > threshold) movePart(1); // Swipe Left -> Prev (依要求)
}

// 初始化與事件
window.addEventListener("DOMContentLoaded", () => {
  // 桌面快捷鍵
  window.addEventListener("keydown", (e) => {
    if (e.shiftKey && (e.metaKey || e.ctrlKey) && e.key === "p") {
      e.preventDefault();
      document.getElementById("popup").style.display = "flex";
      document.getElementById("cmdInput").focus();
    }
    if (e.key === "z") toggleZoom();
    if (e.shiftKey && e.key === "ArrowRight") movePart(1);
    if (e.shiftKey && e.key === "ArrowLeft") movePart(-1);
    if (e.key === "Escape") {
      document.getElementById("popup").style.display = "none";
      toggleZoom(false);
    }
  });

  // 點擊 Grid 進入 Zoom
  gridOrder.forEach((id, idx) => {
    document.getElementById(id).onclick = () => {
      currentPartIdx = idx;
      toggleZoom(true);
    };
  });

  // 觸控事件
  document.addEventListener(
    "touchstart",
    (e) => (touchStartX = e.changedTouches[0].screenX),
  );
  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  // 指令輸入
  document.getElementById("cmdInput").onkeydown = (e) => {
    if (e.key === "Enter") {
      const val = e.target.value.toLowerCase();
      if (window.MANDALA_DATA[val]) {
        currentSubject = val;
        document.getElementById("popup").style.display = "none";
        updateContent();
      } else {
        alert("查無此代碼");
      }
    }
  };
});
