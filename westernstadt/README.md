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

Pause und Fortsetzen erfolgen am Hauptbildschirm. Jagd und Reparaturwerkbank lassen sich gemeinsam pausieren; bei den ursprünglichen laufenden Minispielen ist Pause gesperrt. Ohne verbundene Handys ruht die Simulation ebenfalls. Das ursprüngliche Hauptbildschirm-Browserprofil merkt sich seinen Hostzugang; neu laden verbindet wieder. Gleicher Handy-Link übernimmt denselben Spielerplatz und trennt eine ältere Verbindung.

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

Die anderen Berufsminispiele bleiben vorläufig. Weitere Waffen und eigenständige Berufsaufgaben folgen später.

### Ladenkatalog und Gold
Im Laden öffnet jeder Spieler den vierseitigen Katalog (Jagdvorräte, Gewehr, Rohstoffe, Ankauf). Jeder startet mit 12 Gold. Sechs Jagdpatronen kosten 4 Gold, zwei Köder 3 Gold. Fleisch bringt 1 Gold, ein Fell 3 Gold; verkauft wird jeweils ein bereits im Rucksack befindliches Stück. Rohstoffe werden direkt in den Rucksack geliefert.

Die einmalige Gewehrverbesserung kostet 18 Gold: volle Zielruhe nach 1,6 statt 2,2 Sekunden, Reichweite 70 statt 60 Meter. Patronen und Köder bleiben zwischen Waldbesuchen erhalten und werden beim Auslegen beziehungsweise Schießen verbraucht. Neue Waldbesuche füllen sie nicht auf. Käufe und Verkäufe prüft der Server anhand fester Preise, Gebäude, Beschäftigung und tatsächlicher Bestände. Gold und Ausrüstung gelten für die laufende Partie im Serverprozess; eine Datenbank ist weiterhin nicht angebunden.

## Fallen

Über „Falle“ öffnet sich im Wald eine kleine Werkzeugansicht. Jeder Spieler erhält für den Prototyp eine wiederverwendbare Leihfalle. In der Nähe von Wildspuren kann sie am tatsächlichen Standort aufgestellt werden. Optional einen Köder einlegen, dann Abstand halten oder zur Stadt zurückkehren. In mindestens 26 Spielmetern Abstand beginnt die ruhige Wartezeit: mit Köder ungefähr eine Minute, ohne ungefähr zwei Minuten gemeinsamer Spielzeit. Pausen und das Fehlen aller verbundenen Handys halten die gemeinsame Simulation an.

Die Falle fängt Kleinwild unabhängig vom sichtbaren Reh. Bei Fang erscheint eine Nachricht im Spiel; im Rucksack steht der Zustand auch während eines Stadtaufenthalts. Der Kartenmarker zeigt den Fallenplatz. Wieder in der Nähe: „Fang bergen“ bringt einmalig 1 Fleisch und 1 Fell in die Jagdtasche. „Zur Stadt“ übernimmt diese Beute in das Inventar. Danach lässt sich die Falle erneut spannen oder aufnehmen und umsetzen. Ein noch nicht geborgener Fang kann nicht weggeräumt werden.

Fallenstandort und Fang gehören zum Spielerplatz und bleiben bei Rückkehr in die Stadt sowie beim Neuladen innerhalb derselben Partie erhalten. Es gibt weiterhin keine Speicherung über einen Serverneustart hinweg. Benachrichtigungen sind Spielnachrichten, keine Betriebssystem-Pushnachrichten.

## Updates auf Handy und Hauptbildschirm

HTML und Spielskripte werden mit `no-store` ausgeliefert. Lokale CSS-/JS-Dateien bekommen automatisch aus ihrem Inhalt abgeleitete Versionsadressen; ein Update lädt dadurch keine ältere Jagddatei aus dem Browsercache. QR-Codes und die Startadresse der Handy-App enthalten die aktuelle Spielversion. Eine bereits mit diesem Mechanismus geladene Seite erkennt bei erneuter Serververbindung einen Versionswechsel und lädt ihre aktuelle Adresse unter Beibehaltung des Spielerplatzes neu.

Falls eine ältere, vorher geöffnete Handyseite noch keine Update-Erkennung besitzt: Hauptbildschirm mit einer frischen Versionsadresse öffnen und dessen neuen QR-Code scannen. Es ist kein Löschen sämtlicher Browserdaten nötig.

## Verschleiß und Fallenreparatur

Die Leihfalle startet mit Zustand 3/3. Jeder Fang kostet einen Zustandspunkt. Auch der dritte Fang kann sicher geborgen werden; danach ist die Feder verschlissen und die Falle lässt sich nicht mehr spannen. Aufnehmen/Umsetzen und neue Waldbesuche setzen den Zustand nicht zurück. Eine Reparatur ist auch schon bei 2/3 oder 1/3 möglich.

Falle im Wald aufnehmen, zur Stadt zurückkehren und die Schmiede betreten. Unter „Fallenwerkstatt“ die Falle für 1 Erz und 1 Kohle abgeben. Material wird genau einmal bei Auftragserteilung verbraucht; die Falle bleibt bis zur Abholung in der Werkstatt. In dieser Zeit kann man andere Tätigkeiten ausüben. Aufträge-Tab und Rucksack zeigen den Status dauerhaft an.

Ist kein menschlicher Schmied zugeteilt, repariert ein NPC die Falle in 40 Sekunden gemeinsamer Spielzeit. Ein zugeteilter menschlicher Schmied übernimmt den Auftrag in der Schmiede – auch einen Auftrag für seine eigene Falle. Auf der Werkbank: ein Gelenk antippen, links „Erhitzen“ gedrückt halten bis Arbeitswärme erreicht ist, rechts mit „Gelenk richten“ bearbeiten. Drei Gelenke richten, dann abschrecken; nach drei weiteren Spielsekunden ist die Falle abholbereit. Überhitztes oder kaltes Metall lässt sich nicht richten. Arbeit kann unterbrochen und nach Neuladen fortgesetzt werden; gehaltene Hitze wird bei Unterbrechungen beendet.

Der Besitzer wird im Spiel benachrichtigt und holt die Falle in der Schmiede ab. Erst dann ist Zustand 3/3 wiederhergestellt. Fremde Spieler können weder seinen Auftrag manipulieren noch seine Falle abholen. Alle Schritte, Material, Temperatur, Gelenke und Abholung werden auf dem Server geprüft. Dauerhafte Speicherung über Serverneustarts ist weiterhin nicht enthalten.

### Nebenaufträge
Im Handy-Reiter „Aufträge“ liegt eine gemeinsame Auftragstafel. Jeder kann einen Nebenauftrag annehmen; reservierte Nebenaufträge gehören bis zum freiwilligen Freigeben oder Erfüllen dieser Person. Es gibt kein Zeitlimit. Für den Saloon werden 2 Fleisch (4 Gold, +6 Stadtnahrung), für den Laden 2 Felle (8 Gold, +4 Moral) und für die Jagdhütte 2 Fleisch + 1 Fell (7 Gold, +4 Stadtnahrung) gesucht. Abgabe nur im angegebenen Gebäude und mit vollständigen Waren im Rucksack. Im Gebäude erscheint eine direkte Abgabemöglichkeit.

Nach Erfüllung wird der Aushang nach 90 Sekunden aktiver Vorbereitungs-Spielzeit neu veröffentlicht. Pause, fehlende verbundene Handys und der Treck unterbrechen diese Zeit. Waren dürfen weiter verkauft oder verschenkt werden; der Nebenauftrag reserviert keine Waren und prüft den Bestand erst bei Abgabe. Annahme, Abbruch, Abgabe und Belohnung werden serverseitig geprüft.

### Erster begehbarer Innenraum: Laden
Der Laden ist als erster Raum in schräger 2D-Draufsicht begehbar. Eingang und Ausgang liegen unten, die Verkaufstheke oben. Regale, Fässer, Kisten und eine Wareninsel geben dem Raum eine eigene Einrichtung; Möbel besitzen serverseitige Kollisionen. Andere verbundene Spieler im Laden werden mit angezeigt.

Auf dem Hauptbildschirm mit dem Stadt-Joystick von vorne durch die Ladentür laufen: Beim Überschreiten der Schwelle wechselt das Handy automatisch in den Innenraum. Mit dem festen Joystick um die Wareninsel zur Theke gehen und „Theke benutzen“ wählen. Dort lassen sich der Katalog, Händleraufgaben und die Abgabe des Laden-Nebenauftrags öffnen. „Zurück“ schließt das Thekenmenü. Zur unteren Tür zurücklaufen und durch die Schwelle gehen: Der Ausgang führt automatisch vor den Laden. Ein Eintritts- oder Ausgangsknopf ist für den Laden nicht nötig. Rucksack und Aufträge bleiben über die beiden oberen Knöpfe erreichbar. Einkäufe, Verkäufe und Laden-Abgaben benötigen die geöffnete Theke und den passenden Standort. Neuladen stellt dieselbe Raumposition wieder her; Bewegung und Thekenmenü werden dabei zurückgesetzt.

Schmiede, Saloon und weitere Gebäude sollen später ebenfalls begehbare Innenräume erhalten, passend zu ihrem Beruf eingerichtet. Katalog, Werkbank und andere Aufgaben öffnen dann an ihrem passenden Arbeitsplatz. Für diese anderen Gebäude gelten vorerst die bisherigen Menüs.

### Grafikreferenz
Der Laden setzt den ersten ausführlicheren Grafikstandard für weitere Innenräume. Materialien, Licht/Schatten, Figurenlesbarkeit, Interaktionspunkte und Handyprüfung sind in `DESIGN.md` festgehalten. `public/shop-art.js` zeichnet und puffert die statischen Raum- und Möbelzeichnungen; die Figuren bleiben getrennt animiert. Der Händler wird mit sichtbarem Gesicht und Oberkörper über der Theke dargestellt. Andere Spielbereiche werden schrittweise angepasst.

### Türen, Hinweise und Körperflächen
Der Laden erhält als erstes Gebäude eine Außenfassade mit Holzveranda, Fenstern und klar sichtbarer Tür. Der automatische Eintritt gilt nur an dieser Öffnung und beim Hineinlaufen; seitlicher Kontakt mit der Hauswand reicht nicht. Nach dem Ausgang steht die Figur mit gestoppter Bewegung vor der Tür. Die anderen Gebäude behalten vorerst ihre bisherigen Eingabeknöpfe.

Hinweise lassen sich in jede Richtung wegwischen, durch Antippen, über das Schließen-× oder mit Escape/Enter schließen. Sie verschwinden weiterhin nach 6,5 Sekunden von selbst. Neue Hinweise ersetzen den alten Inhalt; eine bereits begonnene Wischgeste darf keinen danach eintreffenden Hinweis schließen.

Theke, Wareninsel und Kiste zeigen getrennte Oberseiten, Fronten und dunklere Seiten; Regale besitzen sichtbare obere und seitliche Flächen. Die Raumansicht bleibt ein gezeichneter 2D-Raum.

### Räumlicher Laden als Stilversuch
Der Laden nutzt jetzt eine echte Three.js-Szene mit orthografischer Kamera: dreidimensionale Möbel, Boden, Rück-/Seitenwand, Fenster und Licht. Die gezeichneten Figuren bleiben erhalten. Der Händler steht tatsächlich hinter der Theke auf dem Boden; die Tiefenprüfung verdeckt seinen unteren Körper durch die Möbel. Die Außenansicht stammt ebenfalls aus einem 3D-Modell mit Dach, Seitenwänden und Veranda.

Die Kameraperspektive wird durch die Eingabeumrechnung berücksichtigt; der Joystick bewegt die Figur weiter in Bildschirmrichtung. Die Serverregeln einschließlich Türschwellen bleiben erhalten. Three.js 0.180.0 wird über den eigenen Server ausgeliefert, ohne Drittanbieter-CDN. WebGL-Verlust schaltet vorübergehend auf die vorhandene Canvas-Darstellung um; bei Wiederherstellung wird die 3D-Szene wieder aktiv. Das ist zunächst ein Stilversuch für den Laden, keine Umstellung aller Spielbereiche.


## Aktuelle Stilentscheidung: gerade 2D-Ansicht mit räumlichen Möbeln
Der schräge WebGL-Diorama-Versuch wird nicht weiter als aktive Darstellung verwendet. Stadt und Laden bleiben parallel zu den Bildschirmachsen. Die Canvas-Kamera im Laden folgt der Figur sanft wie zuvor. Möbel erhalten helle Oberseiten, dunklere senkrechte Fronten und Bodenschatten; der Händler wird an seinem Bodenstandpunkt hinter der Theke vor der Theke gezeichnet. Der Laden außen erhält ein sichtbares Dach und einen erhöhten Vorbau ohne gedrehten Grundriss. Die experimentellen WebGL-Module bleiben ungenutzt und werden nicht geladen.


## Begehbare Berufshäuser
Alle acht Berufshäuser verwenden nun `interior.js` und `room-definitions.js`. Türen der oberen und unteren Häuserreihe sind automatisch durchlaufbar. Arbeitsplätze haben gemeinsame Grafik-/Kollisionsdaten und eigene Rezeptlisten. Vor den Arbeitsplatz laufen, „Arbeitsplatz öffnen“ antippen; der Joystick stoppt während des Menüs. Ausgang unten im Raum zurück zur Stadt.
Schmiede: Esse → Eisen, Gusstisch → Munition, Fallenwerkbank → zugewiesene Reparaturen, Annahme → Falle abgeben/abholen. Die übrigen Gebäude haben passende bestehende Aktionen an eigenen Stationen. Bestehende Minispiele werden aus dem jeweiligen Arbeitsplatz gestartet. Kirche und Glockenturm bleiben Stadtaktionen.
