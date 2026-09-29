# Our Little Collection

Eine kleine digitale Sammelkarten-Sammlung für Emil.

## Startdatum

Die erste Karte ist ab **29. September 2026** verfügbar. Danach wird jeden Kalendertag eine weitere Karte freigeschaltet.

Wenn du das Startdatum ändern möchtest, öffne `script.js` und ändere:

```js
const START_DATE = "2026-09-29";
```

## GitHub Pages

1. Neues GitHub-Repository erstellen.
2. Den gesamten Inhalt dieses Ordners hochladen.
3. In GitHub unter **Settings → Pages** die Veröffentlichung über den Branch `main` aktivieren.
4. Die erzeugte GitHub-Pages-Adresse öffnen.

## Eigene Bilder

Die drei bereits eingebauten Bilder liegen in `images/`:

- `photo1.jpeg` → Karte 14
- `photo2.jpeg` → Karte 7
- `photo3.jpeg` → Karte 20

Das Liedcover für Karte 6 kannst du später ergänzen. Die aktuelle Karte verwendet dafür eine stilisierte Platzhalter-Grafik.

## Wichtig

Der Sammelstatus wird im Browser mit `localStorage` gespeichert. Die tägliche Freischaltung richtet sich unabhängig davon nach dem Datum.
