# Purchasing Software — Projekt-Dokumentation für Claude

## 📋 Überblick

**Name:** Einkäufer-Bestellverwaltungssystem  
**Tech Stack:** Node.js, Express, React, Vite  
**Dokumentation:** Siehe `README.md` für Funktionsspezifikation  

## 🏗️ Projekt-Struktur

```
/src
  /backend          — Express-Server (REST API)
  /frontend         — React-App (UI)
    /components     — React-Komponenten
    /pages          — Seiten
/public             — Statische Dateien
package.json        — Dependencies & Scripts
vite.config.js      — Frontend Build-Config
eslint.config.js    — Code-Style
.prettierrc          — Code-Formatter
```

## 🚀 Häufige Befehle

```bash
npm run dev              # Frontend + Backend gleichzeitig starten
npm run dev:frontend    # Nur Frontend (http://localhost:5173)
npm run dev:backend     # Nur Backend (http://localhost:3001)
npm run build           # Frontend für Production bauen
npm run lint            # ESLint + Auto-Fix
npm run format          # Prettier Formatting
```

## 🛠️ Development Workflow

1. **Backend ändern?** → `npm run dev:backend` erkennt Änderungen automatisch (--watch)
2. **Frontend ändern?** → `npm run dev:frontend` Hot-Reload im Browser
3. **Beide starten?** → `npm run dev` startet beide parallel

## 📦 Dependencies

- **express** — Backend-Framework für REST API
- **react** — Frontend UI-Bibliothek
- **react-dom** — React Renderer für Browser
- **vite** — Frontend Build-Tool mit Hot-Reload
- **eslint** — Code-Qualität & Linting
- **prettier** — Code-Formatting
- **concurrently** — Mehrere npm-Scripts parallel starten

## 🔧 Konfiguration

- **Ports:** Backend (3001), Frontend (5173)
- **API Proxy:** Frontend → `/api/*` wird zu `http://localhost:3001/api/*`
- **Umgebungsvariablen:** `.env` (ignored), siehe `.env.example`

## 📝 Code-Style

- **ESLint:** Automatische Regel-Checks (`npm run lint`)
- **Prettier:** Code-Formatting (`npm run format`)
- **Git-Hook:** (optional) Lint vor Commits

## 🎯 Nächste Schritte

1. Backend erweitern (Datenbank, Auth, API-Endpoints)
2. Frontend aufbauen (Login, Dashboard, Admin-Panel)
3. Tests schreiben
4. Deployment vorbereiten

---

**Hinweis für Claude:** Diese Datei wird bei jeder Session gelesen. Aktuelle Änderungen hier dokumentieren!
