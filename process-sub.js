name: Update LiangXin Subscription

on:
  schedule:
    - cron: '0 */6 * * *'     # Cập nhật mỗi 6 giờ
  workflow_dispatch:          # Cho phép chạy thủ công

jobs:
  update:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install axios

      - name: Fetch and Process Subscription
        env:
          SUB_URL: ${{ secrets.SUB_URL }}
        run: node process-sub.js

      - name: Commit & Push changes
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: '🔄 Update Subscription - {{ github.event.repository.updated_at }}'
          file_pattern: 'sub.txt'
