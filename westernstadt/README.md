# Wilder Westen – Kapitel 1

Kooperatives Browser-Spiel: Hauptbildschirm und bis zu acht Handys.

## Starten

Node.js ab Version 18. Im Ordner `westernstadt`:

```sh
npm ci
npm start
```

Hauptbildschirm: `http://localhost:3000/screen.html`. Spielerzahl wählen, QR-Codes auf den Handys öffnen und starten. Lokal müssen die Geräte im gleichen WLAN sein. Auf Render gelten die öffentlichen URLs.

## Kapitel spielen

1. Nahrung im Saloon und Bretter in der Zimmerei herstellen. Munition und Medizin sind optionale Vorbereitung. Unbesetzte Berufe können mit langsamer NPC-Aushilfe selbst ausgeübt werden.
2. An der Kirche auf dem Handy „Kapitel 1“ öffnen und Vorräte einlagern. Die normale Ablieferung für Stadtwerte ist davon getrennt.
3. Am Hauptbildschirm „Route wählen & aufbrechen“ anklicken. Mindestens ein Proviant und ein Brett nötig; laufende Minispiele zuerst abschließen.
4. Auf den Handys abstimmen: Höhenweg (90 Sekunden, seltenere Banditen) oder Schlucht (60 Sekunden, häufigere Banditen). Mehrheit der verbundenen Spieler entscheidet; Gleichstand oder keine Stimmen: Höhenweg.
5. Auf dem Hauptbildschirm den Wagen begleiten; auf den Handys Joystick, Schießen und Reparatur benutzen. Im Schutzkreis fährt der Wagen. In Reichweite trifft ein Schuss den nächsten Banditen. Ohne eingelagerte Munition sind zwei statt eines Treffers nötig. Reparatur verbraucht ein Brett, Medizin wird bei kritischem Schaden automatisch verwendet. Proviant wird abschnittsweise verbraucht und erhöht das Reisetempo.
6. Ankunft = Kapitel gewonnen. Wagen zerstört = erneuter Versuch möglich. Restinventare und übrige Vorräte bleiben erhalten. Weitere Kapitel sind noch nicht implementiert.

Pause und Fortsetzen erfolgen am Hauptbildschirm. Bei laufendem Minispiel ist Pause gesperrt. Ohne verbundene Handys ruht die Simulation ebenfalls. Das ursprüngliche Hauptbildschirm-Browserprofil merkt sich seinen Hostzugang; neu laden verbindet wieder. Gleicher Handy-Link übernimmt denselben Spielerplatz und trennt eine ältere Verbindung.

## Tests

```sh
npm test
```

Die Kapitelregeln liegen getrennt in `campaign.js`, die öffentlichen und privaten Ansichten in `public/campaign-screen.js` und `public/campaign-phone.js`. Der Server prüft Beiträge, Schüsse, Reparaturen, Stimmen und Hostaktionen. Die ursprünglichen Berufsspiele melden ihre Ergebnisse weiterhin vom Client; diese sind noch nicht gegen manipulierte Punktzahlen abgesichert.

## Aktuelle Grenzen

Eine gemeinsame Partie pro Serverprozess. Speicherung nur im Arbeitsspeicher; ein Neustart verliert die Partie. Neon ist nicht erforderlich und noch nicht angebunden. Spielerplätze haben weiterhin einfache Links ohne Konto/PIN. Stadtgrafik und ursprüngliche Berufsspiele bleiben vorläufig; das neue Kapitel ist ein spielbarer Prototyp. Auf Render wird `main` automatisch veröffentlicht; diesen Entwicklungszweig erst nach Prüfung zusammenführen.
