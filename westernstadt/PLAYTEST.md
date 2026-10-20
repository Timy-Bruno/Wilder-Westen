# Kapitel 1: geprüfter Stand

- Regeltests: Beiträge und Inventarverbrauch, Mindestvorräte, private Routenstimmen, Gleichstand, Zeitablauf, Pausen/Offline-Verhalten, serverseitige Schussreichweite und Abklingzeit, Reparaturkosten, automatische Medizin, Sieg, Niederlage und Wiederholung, Proviantverbrauch an Wegpunkten.
- Lokaler Test über echte Socket.IO-Verbindungen: Host und Handy beitreten; Saloon und Zimmerei aufsuchen; mit NPC-Aushilfe produzieren; tatsächliche Wartezeit abwarten; zur Kirche laufen; Vorräte spenden; unberechtigte Hostaktionen ablehnen; pausieren; abstimmen; während der Eskorte bewegen; mit demselben Spielerplatz wiederverbinden.
- Chromium: tatsächlicher Spielstart mit Bildschirm und Handy; Auftragsansicht und Abstimmung; deterministische Zustände für die Eskorte und das Ergebnis. Mobile Layouts bei 390×844, 844×390 und 320×568. Joystick und gehaltener Schuss bleiben bei eingehenden Zustandsänderungen aktiv. Keine JavaScript-Ausnahmen.
- Screenshots von Vorbereitung, Abstimmung, Eskorte und mobilen Steuerungen geprüft. Externe Schriften waren im Browser-Test gesperrt; Systemschriften wurden benutzt.

Nicht geprüft: echte iOS-/Android-Geräte, längere Mehrspieler-Balancetests mit acht Menschen, dauerhafte Speicherung. Weitere Kapitel sind nicht enthalten.

## Jagd: begehbarer Wald

- Vierzehn Regeltests für normalisierte Bewegung, Grenzen/Kollisionen, Schleichen, Sichtschutz, Zielauswahl, ruhige und überhastete Schüsse, Reichweite, Fluchtverhalten, Köder, Unterbrechung und getrennte Sitzungen. Zusammen mit den Kapiteltests und Fallenregeln 68 Tests.
- Browserprüfung: realer Einstieg über die Jagdhütte, Weg mit dem Joystick, Entdecken und Antippen des Tiers, Zielen, Schuss mit zwei gleichzeitigen Touchkontakten (Zielen halten + Schießen), Beutegutschrift, Pause und Neuladen.
- Portrait 390×844, Querformat 844×390 und kleines Handy 320×568: Steuerungspositionen geprüft, Screenshots erzeugt; Portrait und Querformat visuell geprüft.
- Für reproduzierbare Ziel-/Touchtests blieb das Tier in einer lokalen Testkonfiguration stehen; der normale Weg durch den Wald wurde separat mit dem Joystick geprüft. Die Browserprüfung läuft ohne den problematischen Chromium-Einprozessmodus. Echte Zwei-Daumen-Bedienung auf iOS/Android und längere Mehrspielerbalance sind noch nicht geprüft. Zusätzliche sichtbare Tierarten und weitere Waffen sind noch nicht enthalten.

### Offener Ausflug und Daumensteuerung

Zielen sitzt links über dem unveränderten Joystick; Schießen rechts. Regeltests prüfen Weiterlaufen und Köder nach einem Treffer sowie Erkunden mit leerer Waffe. Browserprüfung: zwei gleichzeitige Touchpunkte, anschließend Bewegung und Köder ohne erzwungene Rückkehr; Layouts bei 390×844, 844×390 und 320×568.

## Leihfalle und Rückkehr

- Sieben zusätzliche Regeltests: gültige Standorte und Besitzgrenze, Köderverbrauch/Entfernung, Ruhephase und Fangzeiten, einmaliger Fang, Wiederbetreten und einmaliges Bergen, erneutes Spannen/Umsetzen sowie getrennte Spielerdaten.
- Chromium mit echtem lokalem Server: aufstellen, Köder einlegen, Nahbereich verhindert Fortschritt, Wald verlassen, gemeinsame Pause stoppt die Falle, Fang in der Stadt mit Nachricht und Rucksackanzeige, Neuladen, Waldbesuch mit derselben Falle, bergen, doppelte Sammelanfrage ablehnen, erneut spannen, einpacken, neu aufstellen und korrekte Inventargutschrift nach Rückkehr.
- In dieser lokalen Browser-Testkonfiguration lag der Einstieg am Wildwechsel; nur der Fallenzeitgeber wurde beschleunigt. Die Regeltests prüfen die normalen Fangzeiten. Die Produktionsversion nutzt normale gemeinsame Spielzeit.
- Layouts 390×844, 844×390 und 320×568 einschließlich Fallenansicht und unverändertem Joystick geprüft; Screenshots erzeugt. Reale Handys und längere Balanceprüfungen stehen aus.

## Veraltete Handyoberfläche nach Veröffentlichung

- Zwei HTTP-Tests prüfen nicht speicherbare HTML-/Skriptantworten, versionierte lokale Ressourcen, unveränderte externe/dynamische URLs, neue Skriptadresse bei geänderter Datei und eine frische HTML-Antwort statt 304 für den alten Seitenstand.
- Chromium-Regression: alten unversionierten Jagdcode mit langem Cachezeitraum laden und dessen Cachetreffer nachweisen; neue Handyseite öffnen und linke Zieltaste/Fallenknopf trotz dieses alten Cacheeintrags prüfen. QR-/Manifestadressen müssen Version und richtigen Spielerplatz enthalten; ein gemeldeter Versionswechsel muss ohne Schleife neu laden und den Spielerplatz erhalten.

## Verschleiß und Reparaturwerkbank

- Zwei Verschleißtests: drei Fänge, letzter Fang bleibt bergbar, Defekt verhindert weiteres Spannen/Platzieren, Aufnehmen und neuer Besuch setzen Zustand nicht zurück; Reparaturbesitz verhindert eine zweite Falle.
- Acht Reparaturtests: Standort/Material/Toolbesitz, NPC-Auftrag und einmalige Kosten, Fertigmeldung und kontrollierte Abholung, Rollenberechtigung, serverseitige Temperatur/Abklingzeit/Gelenke/Abschrecken, Überhitzung und Unterbrechungen, Fortsetzen und Fremdzugriff sowie Eigenreparatur durch den Schmied.
- Browser NPC: Abgabe, doppelte Anfrage, Verbrauch, Pause, Gebäude verlassen, Fertigmeldung, Abholung außerhalb des Gebäudes ablehnen, Neuladen und einmalige Rückgabe.
- Browser mit zwei Spieler-Handys: Reparatur zuweisen, unberechtigte Arbeit ablehnen, Erhitzen/Hammer mit zwei Touchpunkten, Unterbrechen und Neuladen nach dem ersten Gelenk, restliche Gelenke, Abschrecken und Nachricht an zeitweise getrennten Besitzer; fremde Abholung ablehnen, richtige Abholung und Materialerhaltung.
- Lokale Browser-Fixtures starteten mit defekten eingepackten Fallen in der Schmiede. Nur die NPC-Zeit wurde zum Test beschleunigt; normale 40 Sekunden und Verschleiß werden separat durch Regeltests geprüft. Produktion verwendet normale gemeinsame Spielzeit.
- Werkbank bei 390×844, 844×390 und 320×568 geprüft und fotografiert; Erhitzen links und Hammer rechts in allen drei Ansichten kontrolliert; Portrait/Querformat sowie NPC-Abholung visuell geprüft. Keine Browser-Ausnahmen. Echte Geräte und langfristige Balance stehen noch aus.

## Ladenkatalog
- Sechs Regeltests: feste Preise, Gebäude- und Beschäftigungsprüfung, ungültige Transaktionen, Verkauf bis Bestandsende, einmalige Gewehrverbesserung und bleibende Jagdvorräte.
- Lokaler Browser mit echtem Server/Socket.IO: Patronen und Köder gekauft, Felle und Fleisch verkauft, Gewehr verbessert, gesperrte Kaufknöpfe sowie Zustand nach Neuladen geprüft. Startposition und vier Felle wurden ausschließlich durch eine lokale Testkonfiguration vorgegeben.
- Katalog in 390×844, 844×390 und 320×568 geprüft und fotografiert; keine JavaScript-Fehler.

### Katalogdarstellung nach Handy-Rückmeldung
- Querformat als Doppelseite: Zeichnung/Beschreibung links, Waren und Kauf rechts. Kompakte Kopf- und Fußzeile; beide Seitenspalten sind bei langen Listen separat scrollbar.
- Eigene SVG-Gewehrgravur ersetzt das Werkzeug-Emoji. Keine externen Bildabhängigkeiten.
- Lokale Browserprüfung aller vier Seiten in 390×844, 844×390, 320×568 und 667×375: keine horizontale Überbreite, mindestens 120 Pixel Inhaltshöhe, getrennte Spalten im Querformat, Fußleiste innerhalb des Bildschirms. Kauf-/Verkaufsablauf einschließlich Neuladen erneut geprüft.

## Nebenaufträge
- Acht Regeltests: konkurrierende Reservierungen, einen Nebenauftrag pro Person, korrekter Besitzer und Abgabeort, wirklicher Warenbestand, atomare Mehrwarenabgabe, einmalige Gold-/Stadtbelohnung, kostenloses Freigeben und neue IDs beim Wiederveröffentlichen.
- Lokaler Zwei-Handy-Browsertest mit echtem Server: Reservierung für andere sichtbar, Freigabe und Übernahme, Wiederaufnahme nach Neuladen, fremde/entfernte Abgabe abgewiesen, Abgabe und wiederholtes Paket ohne Doppelbelohnung, Bedienung während Pause gesperrt.
- Auftragstafel in 390×844, 844×390, 320×568 und 667×375 sowie direkte Saloon-Abgabe im Querformat fotografiert/geprüft; keine horizontale Überbreite, Abgabe und Gebäudeausgang erreichbar, keine JavaScript-Fehler. Teststart im Laden mit Beute und einmaliger Wechsel in den Saloon ausschließlich per lokaler Testkonfiguration; keine Testbefehle im Produkt.

## Begehbarer Laden und Nebenaufträge
- Bezeichnung im Spiel und in Nachrichten durchgängig „Nebenaufträge“; Beschreibung betont freiwilligen Zusatzverdienst.
- Fünf neue Regeltests für Spawn/Tür, normalisierte Bewegung, Raumgrenzen und Möbelkollisionen, Handel nur an geöffneter Theke, Bewegungsstopp im Menü und getrennte Spielersnapshots.
- Lokaler Browser mit zwei Handys: tatsächlicher Eintritt über die Stadttür, Mitspieler im Raum sichtbar, per Joystick um die Wareninsel zur Theke, fernes Handeln und Ausgang ohne Türnähe abgewiesen, Katalog geöffnet und Patronen gekauft, Menü geschlossen, Wiederverbinden an gleicher Position, Auftragsreiter besucht, Laden-Nebenauftrag angenommen und erst an geöffneter Theke abgegeben, Pause und Tür-Ausgang geprüft. Keine JavaScript-Fehler.
- In 390×844, 844×390, 320×568 und 667×375 fotografiert; Bedienelemente innerhalb des Bildschirms und Joystick fest an derselben Stelle. Stadtposition vor dem Laden und zwei Felle nur durch lokale Testkonfiguration vorgegeben, keine Testbefehle im Produkt.

## Grafiküberarbeitung des Ladens
- Neue eigenständige Canvas-Zeichnungen: Holzmaserung/versetzte Dielen, Glas und Blechwaren, Säcke, Beschläge, Katalog/Kasse, Fensterlicht, Laternen, Kontakt- und Umgebungsschatten. Statische Zeichnungen werden in Raumkoordinaten gepuffert.
- Figuren größer, detaillierter und nach Laufrichtung gezeichnet. Händler-Oberkörper separat über der Theke zusammengesetzt und seitlich versetzt, damit eine Kundschaft an der Theke ihn nicht vollständig verdeckt. Eingang und Thekenansicht visuell kontrolliert.
- Lokaler Zwei-Handy-Test erneut bestanden: Eintritt, Mitspieler, Bewegung, Thekenhandel, Nebenauftragsabgabe, Wiederverbinden, Pause und Verlassen. Ansichten in 390×844, 844×390, 320×568 und 667×375 fotografiert; keine JavaScript-Fehler. Grafikänderung betrifft den Laden; das Spiel besitzt weiterhin 68 Regeltests.

## Türschwellen, wegwischbare Hinweise und Möbelkörper
- Sechs neue Regeltests: Richtungs-/Schwellenprüfung vor der Ladentür, diagonaler Kreuzungspunkt, Innenausgang, Bewegung nach Übergang gestoppt, kein sofortiger Rückwechsel und geschlossene untere Wand neben dem Durchgang. Insgesamt 68 Tests.
- Lokaler Zwei-Handy-Browsertest mit realem Touch-Swipe per CDP: Wegwischen, Antippen, × und Tastatur schließen Hinweise; ein neuer Hinweis während einer alten Geste bleibt erhalten.
- Automatischer Eintritt per Stadt-Joystick, Ausgang per Raum-Joystick, erneuter Eintritt und Ausgang, kein unbeabsichtigtes Zurückspringen, Handel, Nebenauftragsabgabe, Neuladen und Pause geprüft. Keine JavaScript-Fehler.
- Möbelkörper innen in vier Handyformaten und Fassade auf dem Hauptbildschirm fotografiert und visuell geprüft. Keine Änderungen an den anderen Gebäudezugängen.

## Stilversuch mit echter 3D-Szene
- Three.js 0.180.0, orthografische feste Kamera, räumliche Ladenmodelle und gezeichnete Figuren auf aufrechten Bildflächen. Außenansicht aus einem 3D-Modell mit Dach und Veranda. Händler auf Bodenhöhe hinter der Theke, Kunde davor; Sichtkontrolle für beide Überdeckungen.
- Browserprüfung verlangt tatsächlich `webgl` als aktiven Renderer; eine bloße Canvas-Ersatzansicht genügt dem Test nicht. Chromium mit Software-WebGL: 390×844, 844×390, 320×568 und 667×375 fotografiert. Prüfung im echten Safari/iPhone steht aus.
- Zwei-Handy-Ablauf mit echtem Server: automatisch eintreten, um die Möbel laufen, Katalog/Kauf, Nebenauftrag abgeben, pausieren, neu verbinden und mehrfach durch die Tür zurück. Kamerablick und Joystickrichtung werden gemeinsam umgerechnet. Keine JavaScript-Fehler.
- WebGL-Kontext gezielt verloren und wiederhergestellt: Canvas-Ersatzansicht und Rückkehr in den 3D-Modus geprüft. Beim Wechsel werden gehaltene Bewegungen gestoppt.
- Laufzeit lokal mit gzip/identity getestet: beide Varianten ergeben denselben Modulinhalt, gepinnte URLs sind cachebar. Minifizierte Three.js-Module werden vom eigenen Server geliefert.
- Zwei Projektionstests und ein Regressionstest für eine übersprungene Türschwelle ergänzen die bisherigen Prüfungen: insgesamt 71 bestandene Regeltests. Die Schwelle wird vor einer durch die Raumgrenze abgewiesenen Bewegung geprüft, damit die Figur nicht knapp davor hängen bleibt.


## Gerade 2D-Ansicht mit Möbelvolumen
Browserprüfung: automatischer Ein- und Austritt, zwei Spieler, Hindernisse, Katalogkauf, Wiederverbinden, Nebenaufträge und Pause erfolgreich. Vier Fenstergrößen 390×844, 844×390, 320×568 und 667×375; keine JavaScript-Fehler. Screenshots der geraden Canvas-Darstellung und der Dachfassade geprüft. 71 Regeltests bestanden. WebGL wird für diesen Stil nicht geladen.


## Begehbare Räume für acht Berufshäuser
76 Regeltests bestanden, darunter getrennte Raum-Snapshots, begehbare Startpunkte/Arbeitsplätze aller Grundrisse, Rezeptbindung, Tür der unteren Häuserreihe und Annahme/Werkbank-Bindung der Reparaturen. Browserprüfung: sieben neue Innenräume jeweils in 390×844 und 844×390; alle Arbeitsplatzmenüs enthalten ihre passenden Rezepte; Arbeit vor Öffnen des Arbeitsplatzes abgewiesen. Fallenabgabe und Übernahme an der Werkbank, Bewegung und Wiederladen in der Schmiede erfolgreich; keine JavaScript-Fehler. Bestehender Ladenablauf mit Kauf, Aufgaben, Türübergängen und vier Handyformaten ebenfalls erfolgreich geprüft. Testaufstellungen ausschließlich in einem lokalen, zur Laufzeit erweiterten Server; keine Testzugänge im veröffentlichten Server.


## Themenräume und Casino
85 Regeltests bestanden. Dazu gehören 350 simulierte Hold’em-Hände mit erhaltenem Chipbestand, Pokerwertung (inklusive Wheel, Full House, Kicker, geteiltem Board), verdeckte Karten, einmalige Auszahlung, Blackjack mit Asswerten, Push, Bust und Double sowie unverändertes Stadtgold. Alle Arbeitsplätze besitzen per Wegsuche geprüfte Zugänge. Treppen stoppen die Bewegung und trennen Stockwerke.
Browser: Themenräume in Hoch-/Querformat, Annahme/Übernahme von Reparaturen, bestehender Ladenablauf und automatischer Türwechsel erfolgreich. Casino: tatsächlicher Weg über die Treppe und zu beiden Tischen, Blackjack und Hold’em bis Rundenende, verdeckte Gegnerkarten, Schließen/Wiederöffnen, Wiederladen, Pausenblockierung, 390×844 / 844×390 / 320×568 / 667×375 geprüft; keine JavaScript-Fehler. Sichtprüfung von Raumgrundrissen, NPC-Überdeckung, angebrachten Schildern, Treppe, Filztischen und Kartenoberflächen. Lokale Testaufstellungen sind nicht Teil des ausgelieferten Servers.


## Gemeinsamer Pokertisch, automatische Treppe, Schmiedeproduktion
96 Regeltests bestanden. Neue Tests prüfen vierhändige Setzrunden mit 200 simulierten Short-Stack-Händen, Nebenpot-Verteilung, Chip-Erhaltung, einmalige Auszahlung, private Karten, spätere Sitzplatzaufnahme, NPC-Ersatz zwischen Händen, verspätete Zugpakete, Zeitablauf und Bereinigung nach Aufstehen. Blackjack prüft die schrittweise Bankaktion. Treppentests prüfen Richtung, Übergang, Bewegungsstopp und keinen Rücksprung. Schmiedetests prüfen Materialaufnahme, stabile Arbeitswärme, Schlacke, jede einzelne Form, Abkühlen, Versäubern, Pause und Qualitätsverlust.
Browserprüfung mit zwei getrennten Handy-Sitzungen: automatisches Hinauf-/Hinabgehen, gleicher Tisch und Board, verdeckte fremde Karten, Beitritt während einer Hand, Teilnahme an der nächsten Hand, NPC-Aktionsverlauf, Aufstehen und Pause. Vier Abmessungen 390×844 / 844×390 / 320×568 / 667×375. Beide Schmiedeabläufe mit echten Touch-/Zeiger-Halteaktionen bis zum Ende gespielt; Wiederladen/Pause/Fortsetzen erfolgreich, manipuliertes altes Resultat abgelehnt und kein doppelter Abschluss. Blackjack-Bank aufdecken/ziehen/abschließen mit blockierten Spielertasten geprüft. Sichtprüfung ergab einen CSS-Konflikt mit dem globalen Header-Grid; lokale Grid-Zuweisungen korrigiert und erneut geprüft. Alle Browserläufe ohne JavaScript-Fehler. Nur lokale Testaufstellungen, keine Testzugänge im veröffentlichten Server.


## Vollbild, Chipstapel und sitzende Figuren
97 Regeltests bestanden, einschließlich erhaltener letzter Spieleraktion beim Wechsel zur nächsten Setzrunde. Browserprüfung mit zwei Handy-Sitzungen: tatsächliches Erhöhen aktualisiert den Betrag und startet die Chipbewegung; private Karten bleiben geschützt. Poker und Blackjack füllen 390×844, 844×390, 320×568 und 667×375 vollständig; alle Spieltasten liegen im sichtbaren Bereich. Aufklappbarer Verlauf und Schließen funktionieren, Blackjack wurde bis zur Auszahlung gespielt. Keine JavaScript-Fehler. Sichtprüfung: Sitzfiguren, Namens- und Aktionsanzeigen, Bestands-/Einsatzchips, Pot, Querformat und sitzende NPCs im Casinoraum. SVG-Bilddekodierung für Canvas nach XML-Namespace-Korrektur geprüft. Keine Testzugänge im veröffentlichten Server.
