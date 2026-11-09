# CDA 讀講義筆記

115-1 類別資料分析（Categorical Data Analysis）的個人學習網站。跟著老師的講義走：每一講一頁，每一頁由多個「見開き」組成，左邊是講義原頁，右邊是那幾頁的筆記。

每個概念固定回答三個問題：

1. **為什麼要這樣做**：這個方法在解決什麼問題，附一個生活類比
2. **什麼時候用**：適用情境與替代方法的選擇
3. **R 輸出怎麼讀**：在輸出上標號，逐行解釋

## 進度

| 講次 | 主題 | 狀態 |
|---|---|---|
| L01 | Introduction | 準備中 |
| L02 | Analyzing Contingency Tables | 準備中 |
| L03 | Generalized Linear Models | 準備中 |
| L04 | Logistic Regression | 已完成 |
| L05 | Building and Applying Logistic Models | 準備中 |

## 專案規則

AI 協作規則寫在 [CLAUDE.md](CLAUDE.md)；新頁面請從 `templates/lecture-template.html` 開始。

## 講義原頁與著作權

講義原頁圖檔（`lecture-pages/`）與 PDF（`source/`）都列在 `.gitignore`，不會上傳。所以：

- **在自己電腦打開**：每個見開き左邊會顯示講義原頁。
- **公開網站**：只顯示頁碼提示與筆記，請對照紙本講義。

產生講義圖檔：`bash tools/render-pages.sh 04 source/CDA_Lecture04_f2026.pdf`（需要 poppler）。
