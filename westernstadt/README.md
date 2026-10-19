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
3. Am Hauptbildschirm unten „Kapitel 1 · Auftrag“ öffnen und „Route wählen & aufbrechen“ anklicken. Mindestens ein Proviant und ein Brett nötig; laufende Minispiele zuerst abschließen.
4. Auf den Handys abstimmen: Höhenweg (90 Sekunden, seltenere Banditen) oder Schlucht (60 Sekunden, häufigere Banditen). Mehrheit der verbundenen Spieler entscheidet; Gleichstand oder keine Stimmen: Höhenweg.
5. Auf dem Hauptbildschirm den Wagen begleiten; auf den Handys Joystick, Schießen und Reparatur benutzen. Im Schutzkreis fährt der Wagen. In Reichweite trifft ein Schuss den nächsten Banditen. Ohne eingelagerte Munition sind zwei statt eines Treffers nötig. Reparatur verbraucht ein Brett, Medizin wird bei kritischem Schaden automatisch verwendet. Proviant wird abschnittsweise verbraucht und erhöht das Reisetempo.
6. Ankunft = Kapitel gewonnen. Wagen zerstört = erneuter Versuch möglich. Restinventare und übrige Vorräte bleiben erhalten. Weitere Kapitel sind noch nicht implementiert.

Pause und Fortsetzen erfolgen am Hauptbildschirm. Die Jagd lässt sich gemeinsam pausieren; bei den übrigen laufenden Minispielen ist Pause gesperrt. Ohne verbundene Handys ruht die Simulation ebenfalls. Das ursprüngliche Hauptbildschirm-Browserprofil merkt sich seinen Hostzugang; neu laden verbindet wieder. Gleicher Handy-Link übernimmt denselben Spielerplatz und trennt eine ältere Verbindung.

## Tests

```sh
npm test
```

Die Kapitelregeln liegen getrennt in `campaign.js`, die öffentlichen und privaten Ansichten in `public/campaign-screen.js` und `public/campaign-phone.js`. Der Server prüft Beiträge, Schüsse, Reparaturen, Stimmen und Hostaktionen. Die ursprünglichen Berufsspiele melden ihre Ergebnisse weiterhin vom Client; diese sind noch nicht gegen manipulierte Punktzahlen abgesichert.

## Aktuelle Grenzen

Eine gemeinsame Partie pro Serverprozess. Speicherung nur im Arbeitsspeicher; ein Neustart verliert die Partie. Neon ist nicht erforderlich und noch nicht angebunden. Spielerplätze haben weiterhin einfache Links ohne Konto/PIN. Stadtgrafik und ursprüngliche Berufsspiele bleiben vorläufig; das neue Kapitel ist ein spielbarer Prototyp. Auf Render wird `main` automatisch veröffentlicht; diesen Entwicklungszweig erst nach Prüfung zusammenführen.

## Hauptbildschirm

Die Karte füllt den Browserbereich. Alle Gebäude bleiben sichtbar, Figuren behalten ihre Proportionen. Kapitelinfos öffnen sich unten über „Auftrag“ als schließbare Einblendung, ohne die Karte zu verkleinern. Pause und Browser-Vollbild sind separat erreichbar. Mit Escape lässt sich die Einblendung schließen.

## Jagd auf dem Handy

In der Jagdhütte „Im Wald jagen“ wählen. Der Ausflug öffnet einen begehbaren Wald schräg von oben mit eigener Kamera. Joystick links zum Bewegen, „Schleichen“ rechts schaltet langsame und leise Bewegung ein. Am Computer gehen auch Pfeiltasten/WASD; bei gehaltenem Zielen löst die Leertaste den Schuss aus. Wildspuren führen vom Start zur Lichtung; die kleine Karte zeigt den Pfad und den eigenen Standort, keine versteckten Tiere.

Ein sichtbares Tier antippen, „Zielen“ links über dem Joystick mit dem linken Daumen gedrückt halten und rechts „Schießen“ wählen. Beim Zielen bleibt die Figur stehen. Der helle Zielpunkt wird nach etwa zwei Sekunden ruhiger. Er muss beim Schuss auf dem Tier liegen; es gibt keinen zusätzlichen Zufallswurf. Entfernung und Bewegung erschweren das Zielen. Reichweite 60 Spielmeter; Baumstämme und Felsen blockieren Sicht und Schüsse. Laufen in der Nähe und zu dichtes Anschleichen schrecken Tiere auf. Ein Köder wird am tatsächlichen Standort ausgelegt und lockt ein Tier in der Nähe an.

Der erste Waldausflug enthält ein Tier, sechs Patronen und kein Zeitlimit. Nach einem Treffer oder mit leerer Waffe kann man weiterlaufen und den übrigen Köder auslegen; der Ausflug endet erst mit „Zur Stadt“. „Zur Stadt“ beendet ihn und legt vorhandene Beute genau einmal in den Rucksack. Treffer, Bewegung, Sicht, Munition und Beute prüft der Server. Versteckte Tiere werden nicht an das Handy übertragen. Neuladen desselben Handy-Links stellt Position, Munition und Beute wieder her, solange der Server läuft; gehaltene Eingaben werden bei Unterbrechungen zurückgesetzt.

Die anderen Berufsminispiele bleiben vorläufig. Waffenhandel und Reparaturaufträge folgen später.

## Fallen

Über „Falle“ öffnet sich im Wald eine kleine Werkzeugansicht. Jeder Spieler erhält für den Prototyp eine wiederverwendbare Leihfalle. In der Nähe von Wildspuren kann sie am tatsächlichen Standort aufgestellt werden. Optional einen Köder einlegen, dann Abstand halten oder zur Stadt zurückkehren. In mindestens 26 Spielmetern Abstand beginnt die ruhige Wartezeit: mit Köder ungefähr eine Minute, ohne ungefähr zwei Minuten gemeinsamer Spielzeit. Pausen und das Fehlen aller verbundenen Handys halten die gemeinsame Simulation an.

Die Falle fängt Kleinwild unabhängig vom sichtbaren Reh. Bei Fang erscheint eine Nachricht im Spiel; im Rucksack steht der Zustand auch während eines Stadtaufenthalts. Der Kartenmarker zeigt den Fallenplatz. Wieder in der Nähe: „Fang bergen“ bringt einmalig 1 Fleisch und 1 Fell in die Jagdtasche. „Zur Stadt“ übernimmt diese Beute in das Inventar. Danach lässt sich die Falle erneut spannen oder aufnehmen und umsetzen. Ein noch nicht geborgener Fang kann nicht weggeräumt werden.

Fallenstandort und Fang gehören zum Spielerplatz und bleiben bei Rückkehr in die Stadt sowie beim Neuladen innerhalb derselben Partie erhalten. Es gibt weiterhin keine Speicherung über einen Serverneustart hinweg. Benachrichtigungen sind Spielnachrichten, keine Betriebssystem-Pushnachrichten.
