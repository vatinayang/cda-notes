# CLAUDE.md — CDA 讀講義筆記

這份文件給協助維護本專案的 AI 閱讀。開始任何修改前，請完整讀完本文件，並打開 `lectures/lecture-04.html` 作為範例成品。

---

## 1. 專案目的

- **是什麼**：「類別資料分析（Categorical Data Analysis，115-1）」的個人學習網站，一講一頁，部署在 GitHub Pages。
- **給誰看**：作者本人（統計系大四）用來複習，次要讀者是修同一門課的同學。
- **核心體驗**：**像在老師的講義旁邊寫筆記。**每一頁由多個「見開き（spread）」組成：左邊是講義原頁，右邊是那幾頁的筆記。作者不需要同時打開講義 PDF 和網站。
- **頁面切分與順序跟著講義走**，不是跟著課本章節走。講義的每一頁都必須出現在某一個見開き裡，而且只出現一次。

## 2. 學習者的卡點 → 寫作規則

作者的卡點分三類。網站的每條規則都是為了解決其中一類：

| 卡點 | 對應規則 |
|---|---|
| 讀了還是不懂**為什麼要這樣做** | 每個概念卡必須有「為什麼要這樣做」區塊：先寫「不這樣做會出什麼問題」，再寫「這個方法怎麼解決」，並附一個生活類比 |
| 公式看得懂，但不知道**什麼時候該用** | 每個概念卡必須有「什麼時候用」區塊：列出適用情境、不適用情境、與替代方法的選擇 |
| **R 輸出看不懂** | 只要出現 R 輸出，就必須附「R 輸出怎麼讀」，在輸出上用編號標出關鍵數字並逐一解釋 |

作者的其他學習偏好：

- **先框架、後細節**：每講開頭先講「這講在解決什麼問題」與跟前後講的關係，再進入逐頁筆記。
- **類比優於死背**：類比要貼近日常（匯率、山坡、安檢），不要用另一個統計概念當類比。
- **明確點出爭議與學派**：方法之間有取捨時（如 Wald vs LR、AIC vs BIC），要寫成「學派與爭議」區塊，並說明課本或講義的立場。
- **每個重點都標頁碼**：同時標講義頁碼與課本頁碼。
- **講義上的空白要補**：講義常留空白讓學生上課填寫（如 L04 p.5 的 CI 推導），筆記要把那段補完整。

## 3. 內容來源與著作權（重要）

- 主要來源：老師的講義 `CDA_LectureNN_f2026.pdf`（© Vivian Chen）。
- 參考來源：Agresti (2019), *An Introduction to Categorical Data Analysis*, 3rd ed.（本學期範圍 Ch.1–5）。
- **講義原頁圖檔放在 `lecture-pages/`，預設列入 `.gitignore`，不上傳 GitHub。**所以：
  - 在本機打開網站時：見開き左邊會顯示講義原頁。
  - 在公開網站上：`assets/cda.js` 偵測到圖檔不存在，會自動改成一行頁碼提示，版面變成單欄筆記。
  - **只有在作者明確表示已取得老師同意後**，才能把 `lecture-pages/` 從 `.gitignore` 移除。AI 不可自行移除。
- 原始 PDF 放在 `source/`，同樣不上傳。
- 筆記欄**只能放用自己的話重寫的解釋**，不可把講義或課本的段落逐字搬進筆記。可以引用：公式、數值結果、R 程式碼（可精簡）、頁碼。
- 講義已在內文標了課本頁碼（如「(p.65)」「(Section 5.2)」），標註課本頁碼時以講義寫的為準。
- **講義與課本衝突時，以講義為準**，包括符號、用詞與例子。

## 4. 檔案結構

```
cda-notes/
├── CLAUDE.md                     本文件（規則的唯一來源）
├── AGENTS.md                     指向本文件
├── README.md                     給人看的專案說明
├── index.html                    首頁：目次 + 讀法
├── lectures/
│   └── lecture-NN.html           每講一頁
├── templates/
│   └── lecture-template.html     新講義頁的樣板
├── assets/
│   ├── style.css                 唯一的樣式檔
│   └── cda.js                    講義圖偵測 + 互動元件
├── tools/
│   └── render-pages.sh           把講義 PDF 轉成逐頁圖檔
├── lecture-pages/                （不上傳）講義原頁圖檔
│   └── LNN/pNN.jpg
└── source/                       （不上傳）講義與課本 PDF
```

- 純 HTML + CSS + 少量原生 JS，**不使用任何框架或建置工具**，不引入外部 JS 函式庫。唯一的外部資源是 Google Fonts。
- 不要新增其他 CSS 檔，也不要在 HTML 裡寫 `<style>` 或行內 `style=""`。

## 5. 命名規則

| 項目 | 規則 | 範例 |
|---|---|---|
| 講義頁檔名 | `lectures/lecture-` + 兩位數講次 + `.html` | `lecture-02.html` |
| 講義原頁圖 | `lecture-pages/L` + 兩位數講次 + `/p` + 兩位數頁碼 + `.jpg` | `lecture-pages/L02/p07.jpg` |
| 頁面 `<title>` | `L` + 講次 + 空格 + 講義英文標題 + `｜CDA 讀講義筆記` | `L04 Logistic Regression｜CDA 讀講義筆記` |
| 印章文字 | `第` + 國字講次 + `講` | `第二講`、`第十講` |
| 見開き id | `s` + 講次（不補零）+ `-` + 流水號 | `id="s4-3"` |
| 概念卡編號／id | 講次（不補零）-流水號；id 前加 `c` | `4-7`、`id="c4-7"` |

## 6. 每個講義頁的固定結構

區塊**順序不可更動**，標「必要」的不可省略。`<main>` 要加 `class="page wide"`；除了見開き以外的區塊都要加 `narrow` class。

1. **頁首**（必要）`header.lecture-head.narrow`：印章 `.hanko`、麵包屑、英文標題 + `<br>` + 中文標題、三個 `.ref`（講義頁數範圍、課本章節頁數、資料集）。
2. **這講在解決什麼問題**（必要）`section.big-picture.narrow`：
   - `.chain` 列出前一講 → **本講**（`.now`）→ 下一講，各一句話。
   - 第一段：上一講留下什麼做不到的事，本講的核心問題用粗體寫出。
   - 第二段：本講可以濃縮成哪 2–3 件事。
3. **概念地圖**（必要）`section#map.narrow`：欄位固定為 `# / 概念 / 它在解決什麼問題 / 講義 / 課本`，每列連到對應的概念卡。
4. **逐頁筆記**（必要）：`<h2 class="section-title narrow">逐頁筆記</h2>`，接著是依頁碼順序排列的見開き `section.spread`。
5. **自我檢查**（必要）`section#quiz.narrow`：3–5 題 `<details>`，優先考「為什麼」和「解讀錯在哪」。答案結尾註明「（見 X-Y）」。
6. **上下頁**（必要）`nav.pager.narrow`：頁面已存在用 `<a>`，尚未建立用 `<span class="off">…（尚未建立）</span>`。
7. **頁尾**（必要）`footer.site-foot.narrow`：照抄樣板，包含講義版權聲明。

### 6.1 見開き（spread）怎麼切

```
section.spread#sN-M
├── .spread-head    .pages（如 p.5–8）+ .section-name（講義的小節標題，用講義原文的英文）
├── .sheet          講義原頁 figure，每頁一個，依頁碼排序
└── .notes          這幾頁的概念卡（1–2 張）
```

切分原則：

- **一個見開き涵蓋 1–6 頁講義**，裡面放 1–2 張概念卡。
- 依講義的小節切，盡量讓「這幾頁在講的事」和「右邊的概念卡」一致。
- **全部頁碼都要出現、不可重複、不可跳號**。概念橫跨兩個見開き時，概念卡放在主要內容所在的見開き，`.refs` 照實標出完整頁碼範圍。
- R 程式碼很多的頁面（如 L04 p.9–11），可以獨立成一個見開き，放一張「R 輸出怎麼讀」概念卡。

每個講義原頁 figure 的寫法固定如下（`width`／`height` 用實際圖檔尺寸）：

```html
<figure><a href="../lecture-pages/L04/p07.jpg" target="_blank" rel="noopener"><img src="../lecture-pages/L04/p07.jpg" alt="講義 L04 第 7 頁" width="910" height="1287" decoding="async"></a><figcaption>講義 p.7</figcaption></figure>
```

不要加 `loading="lazy"`，否則公開網站的頁碼提示會延遲出現。

### 6.2 概念卡內部結構

```
article.concept#cN-M
├── .concept-head    .concept-id、h3 標題（問句或「X：Y」）、講義與課本 .ref
├── .block.why       必要：為什麼要這樣做（含 p.analogy 類比，至少一個）
├── .formula         可選：公式
├── .block.when      必要：什麼時候用
├── .r-block + .block.when(R 輸出怎麼讀)   有 R 輸出時兩者必須成對出現
├── .block.debate    可選：學派與爭議
└── .block.trap      可選但建議：常見陷阱
```

例外：「R 輸出怎麼讀」型的概念卡（如 4-6）與「例子數字翻成人話」型的概念卡（如 4-5），可以用表格或 `.r-block` 取代 `.block.why`，但 `.block.when` 或 `.block.trap` 至少要有一個。

## 7. 視覺風格：日式簡約

作者希望網站是**日式簡約**風格，讓人有動力繼續讀下去。規則：

- **大量留白**：區塊之間用 `gap` 拉開，不要為了塞內容縮小間距。
- **細線分隔**：用 1px 的 `--sen` 線分隔區塊，不用陰影卡片或圓角方塊。唯一的例外是講義原頁圖，有極淡的紙張陰影。
- **配色克制**：和紙底（`--washi`）、墨色字（`--sumi`），主色只有藍（`--ai`）。**朱色（`--shu`）只能用在**：印章、頁碼 `.pages`、概念卡編號、`.big-picture` 的標籤、首頁「已完成」狀態、自我檢查的「答」字。不可用在其他地方。
- **字體**：標題用明朝體（`--font-display`，Noto Serif TC），內文用黑體（`--font-body`），數字與程式用等寬字（`--font-mono`）。
- **標題字距稍寬**（letter-spacing .06em 以上），內文行高約 1.95。
- 首頁講次寫成「第一講」，講義頁頁首用直書印章 `.hanko`。

所有顏色都定義在 `assets/style.css` 的 `:root`，並有深色模式版本。**不可在 HTML 或 CSS 其他地方寫死色碼。**

## 8. 元件與 class 速查

**只能使用以下 class**。需要新元件時，先在 `assets/style.css` 新增並更新本表，再使用。

| 元件 | 寫法 | 用途 |
|---|---|---|
| 印章 | `<span class="hanko">第四講</span>` | 只用在講義頁頁首 |
| 區段標題 | `<h2 class="section-title">概念地圖</h2>` | 右側自動延伸一條細線 |
| 頁碼標籤 | `<span class="ref"><b>講義</b> p.7</span>` | 所有頁碼標註 |
| 區塊 | `<div class="block why|when|debate|trap"><span class="label">標題</span>…</div>` | 四種語意區塊，顏色固定，不可挪作他用 |
| 類比 | `<p class="analogy">…</p>` | 只放在 `.block.why` 內，CSS 會自動加「類比」字樣 |
| 公式 | `<div class="formula">…<span class="note">說明</span></div>` | Unicode 與 `<sub>`／`<sup>`；分數用 `<span class="frac"><span>分子</span><span>分母</span></span>` |
| R 區塊 | `<div class="r-block"><div class="r-title">R · 說明</div><pre>…</pre></div>` | `<pre>` 內註解用 `<span class="c">`，關鍵數字用 `<mark data-n="1">` |
| R 解讀 | `<ul class="r-read"><li><b>1</b><span>…</span></li></ul>` | 編號對應 `mark` 的 `data-n` |
| 表格 | `<div class="table-wrap"><table>…</table></div>` | 數字欄加 `class="num"` |
| 小字說明 | `<p class="small">…</p>` | 圖下說明、補充 |
| 自我檢查 | `<details><summary>Q1. …</summary><div class="answer">…</div></details>` | 放在 `.quiz` 內 |
| 互動圖 | `<div class="widget" data-widget="名稱" data-…>` | 需在頁尾載入 `../assets/cda.js` |

### 互動元件（`assets/cda.js`）

| 名稱 | 參數 | 適合的講次 |
|---|---|---|
| `logit-curve` | `data-alpha`、`data-beta`、`data-xmin`、`data-xmax`、`data-xlabel` | L04、L05、L03（binary GLM） |

互動元件是加分項，不是必要項。只有在「拖動參數能讓人看懂一個卡點」時才加。`cda.js` 一定要載入，因為它也負責講義圖的偵測。

## 9. 寫作風格

- 語言：**繁體中文**，台灣用語。統計術語第一次出現時附英文，例如「勝算比（odds ratio）」，之後可直接用英文（odds、logit、deviance），跟講義習慣一致。
- 符號與講義一致：π(x)、α、β、β̂、π̂、L₀／L₁、Deviance₀／Deviance₁。
- 語氣：像學長姐在講解，直接、具體，不寫「值得注意的是」「總而言之」這類空話。
- 每個解釋都要接到**課堂的實際例子與數字**，並寫出「人話」版本，例如：「殼寬每多 1 公分，有跟班的 odds 變成 1.64 倍」。
- 提到講義某處時寫頁碼，例如「（p.7）」。因為講義就在左邊，讀者可以直接看過去。
- 跨講的連結要明寫出來，例如：「這跟 L02 的 ordinal 檢定是同一件事」。

## 10. 新增一講的步驟

1. 把講義 PDF 放到 `source/`，執行 `bash tools/render-pages.sh NN source/CDA_LectureNN_f2026.pdf`，產生 `lecture-pages/LNN/pNN.jpg`。用任一張圖確認實際寬高。
2. 讀講義全文，列出小節與頁碼；再讀課本對應章節，確認講義標的課本頁碼。
3. 規劃**見開き清單**（頁碼範圍、小節名稱、放哪幾張概念卡）。確認每一頁都恰好出現一次。**先把清單給作者確認，再開始寫。**
4. 複製 `templates/lecture-template.html` 到 `lectures/lecture-NN.html`，依第 6 節填入內容。
5. 更新 `index.html`：把該講那一列從 `<span class="disabled">` 改成 `<a href="lectures/lecture-NN.html">`，狀態改成 `<span class="status done">已完成</span>`。
6. 更新前後講的 `nav.pager`：前一講或下一講已存在時，把 `span.off` 改成 `<a>`。
7. 更新 README.md 與本文件第 13 節的進度表。
8. 跑完第 12 節的檢查清單。

## 11. 修改既有頁面的規則

- 只改被要求的部分，不要順手重寫其他概念卡。
- 不可更動區塊順序、見開き的頁碼切分與概念卡編號。新增概念時，接在最後一個編號之後，並同步更新概念地圖。
- 作者自己寫的註記不可刪改。
- 修改 `style.css` 的既有 token 或 class 前，必須先問作者，因為會影響所有頁面。

## 12. 完成前檢查清單

- [ ] 檔名、`<title>`、印章、見開き id、概念卡編號符合第 5 節
- [ ] 第 6 節的必要區塊都在，順序正確，非見開き區塊都有 `narrow`
- [ ] 講義每一頁都恰好出現在一個見開き裡（頁數加總 = 講義總頁數）
- [ ] 每張概念卡都有 `.block.why`（含類比）與 `.block.when`（例外見 6.2）
- [ ] 每個有輸出的 `.r-block` 都有對應的「R 輸出怎麼讀」，`data-n` 編號一一對應
- [ ] 每張概念卡都有講義頁碼與課本頁碼
- [ ] 概念地圖的列數、順序與概念卡一致，連結都能點
- [ ] 筆記沒有逐字搬運講義或課本段落
- [ ] `lecture-pages/` 仍在 `.gitignore` 裡（除非作者已取得老師同意）
- [ ] 把 `lecture-pages/` 暫時改名後重新整理頁面，確認公開版的頁碼提示與單欄版面正常
- [ ] 沒有 `<style>`、行內 style、寫死的色碼或新的 CSS 檔
- [ ] `index.html` 目次與前後講的 pager 已更新
- [ ] 在手機寬度（約 390px）下沒有橫向捲動
- [ ] 數值與講義一致（逐一對照講義頁碼）

## 13. 講義進度表

| 講次 | 講義標題 | 講義頁數 | 主要內容 | 課本 | 網站狀態 |
|---|---|---|---|---|---|
| L01 | Introduction | 17 | 類別資料、二項／多項分配、比例的推論（Wald、Score、LR）、離散資料推論 | Ch.1、Ch.12 | 準備中 |
| L02 | Analyzing Contingency Tables | 23 | 列聯表機率結構、RR 與 odds ratio、卡方獨立性檢定、ordinal 檢定、Fisher exact、三維表 | Ch.2 | 準備中 |
| L03 | Generalized Linear Models | 10 | GLM 三個組成、GLM 種類、推論與模型檢查、deviance | Ch.3 | 準備中 |
| L04 | Logistic Regression | 25 | logit 模型、β 的解讀、推論、類別型 X、交互作用、marginal effect、ROC | Ch.4 | **已完成**（範例頁，9 個見開き、12 張概念卡）|
| L05 | Building and Applying Logistic Models | 24 | 模型比較、GOF、殘差、影響診斷、變數選擇、共線性、稀疏資料 | Ch.5 | 準備中 |

新講義發下來時，在本表新增一列，再依第 10 節建立頁面。
