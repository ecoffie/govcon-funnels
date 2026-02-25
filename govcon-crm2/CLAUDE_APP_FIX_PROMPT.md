# GovCon CRM v2 - Claude Fix Prompt

Use this prompt in Cursor Terminal with Claude to iterate on this app's design and UX.

## How to run

1. Open Cursor terminal in this folder:
   - `/Users/kkii/Documents/Cursor/govcon-funnels-main/govcon-crm2`
2. Start Claude in terminal.
3. Paste the prompt below.

## Prompt to paste into Claude

```text
You are helping me refine this Vite React app to match the internal dashboard style used in my repo.

Project path:
/Users/kkii/Documents/Cursor/govcon-funnels-main/govcon-crm2

Reference style source:
/Users/kkii/Documents/Cursor/govcon-funnels-main/dashboard/src

Goal:
Make this CRM app look and feel like the internal dashboard (layout rhythm, spacing, typography scale, card styling, top bar, sidebar, table polish, and visual hierarchy), while keeping all existing CRM functionality intact.

Constraints:
- Do not break app logic.
- Prioritize UI/UX consistency and readability.
- Keep dark theme.
- Use reusable classes over repeated inline styles where practical.
- Preserve existing data flow and components.

Tasks:
1) Audit and compare these files first:
   - govcon-crm2/src/App.jsx
   - govcon-crm2/src/index.css
   - govcon-crm2/src/components/Sidebar.jsx
   - govcon-crm2/src/components/TopBar.jsx
   - govcon-crm2/src/components/InsightsView.jsx
   - govcon-crm2/src/components/ClientsView.jsx
   - govcon-crm2/src/components/ClientRow.jsx
   - govcon-crm2/src/components/ClientCard.jsx
   - govcon-crm2/src/components/ErrorBanner.jsx
   - dashboard/src/App.jsx
   - dashboard/src/index.css

2) Apply a focused visual pass:
   - Match spacing scale (container, section gaps, paddings).
   - Match typography hierarchy (header, section titles, body, metadata).
   - Match panel/card style (background, border, radius, hover).
   - Match sidebar and topbar visual rhythm.
   - Improve table readability and alignment.
   - Ensure responsive behavior remains good on narrower widths.

3) Validate:
   - Run npm run build
   - Fix any lint/build issues you introduce.

4) Report back:
   - List changed files.
   - Explain what was changed and why.
   - Note any tradeoffs and what remains.

Important:
- Keep edits surgical and clean.
- Do not add unrelated dependencies.
- Do not remove existing features.
```

## Optional quick check commands

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 5174
npm run build
```

