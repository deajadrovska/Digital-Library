# FINKI Attendance App — Logo Digital Library

A digital library showcasing logo variants for the FINKI Employee Attendance Tracking Application.

---

## Project Structure

```
finki-attendance-library/
│
├── index.html        ← Open this in browser (via Live Server)
├── scan.js           ← Run this when you add new logos
│
├── css/
│   └── styles.css    ← All styling
│
├── js/
│   └── app.js        ← Reads index.json, renders the library
│
├── data/
│   └── index.json    ← Auto-generated list of logo filenames
│
└── images/
    ├── logo1.png
    ├── logo2.png
    └── ...           ← Drop new logos here as logo7.png, logo8.png etc.
```

---

## How to use

**First time setup:**
```bash
node scan.js
```
Then open `index.html` via WebStorm's Live Server.

**Adding a new logo:**
1. Save it as `logo7.png` (next number) into `images/`
2. Run `node scan.js`
3. Refresh the browser — done!

---

## Requirements
- Node.js (to run scan.js)
- WebStorm Live Server or VS Code Live Server (to open index.html)

## Team
Dea Jadrovska
Blerona Mulladauti
Engjell Vlashi
