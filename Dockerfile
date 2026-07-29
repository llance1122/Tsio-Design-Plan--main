# ============================================================
#  設醮網站 —— 單一容器同時服務前端網站 + API + 上傳圖片
#  用 Node 24（內建 SQLite，免裝原生模組）
# ============================================================

# ---- 建置階段：安裝全部相依、打包前端 ----
FROM node:24-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- 執行階段：只裝正式相依，跑後端 ----
FROM node:24-alpine
WORKDIR /app
ENV NODE_ENV=production
# 資料（SQLite + 上傳圖片）放這個目錄，對應掛載的 volume
ENV DATA_DIR=/data

COPY package*.json ./
RUN npm ci --omit=dev

# 後端程式、打包後的前端、以及匯入用的原始文章資料
COPY server ./server
COPY --from=build /app/dist ./dist
COPY src/data ./src/data

EXPOSE 3001

# 啟動時先（在資料庫為空時）匯入 8 篇文章，再啟動伺服器
CMD ["sh", "-c", "node --disable-warning=ExperimentalWarning server/import-articles.js; node --disable-warning=ExperimentalWarning server/index.js"]
