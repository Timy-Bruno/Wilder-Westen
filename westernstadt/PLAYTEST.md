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

## Blackjack-Orientierung und Apotheke
100 Regeltests bestanden. Blackjack: getrennte Handflächen, verdeckter Bankwert, große Punktanzeigen, aktiver Spielbereich und Einsatz/Vorrat. Browserprüfung mit zwei Sitzungen weiterhin erfolgreich, beide Casinospiele bei 390×844 / 844×390 / 320×568 / 667×375 vollständig bedienbar und Blackjack bis zur Auszahlung gespielt.
Apotheke: Rezeptwahl ohne Fingerhut, tatsächliche Kreisbewegung im Mörser, sechs Löffelzüge und zwei einzelne Flaschen bis zum serverseitigen Abschluss gespielt. Pause/Fortsetzen und vier Handyabmessungen geprüft. Tests decken falsche Kräuter, doppelte Auswahl, ungültige Schritte/Winkel, Sprungbewegungen, Reihenfolge und eingefrorenen Fortschritt ab. Sichtprüfung nach Korrektur geerbter globaler main/nav-Gridflächen; keine JavaScript-Fehler. Lokale QA-Aufstellung bleibt außerhalb des veröffentlichten Servers.

## Stadtfassaden und gemeinsamer Sammelruf
102 Regeltests bestanden. Neue Regeln prüfen den Austritt am tatsächlichen Gebäudeeingang, gesperrte Bereitschaft außerhalb des Kreises, alle verbundenen Teilnehmer, Pause, verlorene Bereitschaft beim Weglaufen und Abbruch ohne Vorratsverlust. Browser mit Hauptbildschirm und zwei getrennten Handys: vom Saloon heraus zum Sammelruf, echte Joystick-Bewegung zum Kreis, beide Bereitschaften, Routenabstimmung mit Gleichstand, Eskorte, Pause/Fortsetzen, Abschluss und Rückkehr zur Stadt. Handysteuerung bei 390×844 / 844×390 / 320×568 / 667×375 sichtbar. Kein JavaScript-Fehler. Fassaden und Ereignishinweis visuell geprüft; Hinweis verdeckt keine Hausnamen, Saloon-Schrift frei. Der schnelle Missionsabschluss und Testvorräte werden nur im lokalen Fixture injiziert und nicht ausgeliefert.

## Aufrechte untere Häuser und auffindbare Treck-Abgabe
103 Regeltests bestanden. Türen unten prüfen Annäherung von unten, Rückrichtung und sicheren Austritt ohne Rücksprung. Browser: zwei echte Bretter im Rucksack, neuen Kirchenknopf öffnen, ein Brett ins Trecklager übertragen (Rucksack sinkt, Treckbestand steigt); ohne Essen ist Proviant gesperrt. Anschließend aus Fleisch im Saloon das Timing-Spiel abschließen, fertiges Essen ins Inventar übernehmen und eine Portion als Proviant einlagern; Aufbruch wird freigeschaltet. Nur Zutaten/Standorte und das Ende der Wartezeit stammen aus einem lokalen Fixture. Alle vier unteren Gebäude mit tatsächlichen Bewegungspaketen von unten betreten. Aufrechte Fassaden und Lageranzeige visuell geprüft; keine JavaScript-Fehler. Keine QA-Zugänge im ausgelieferten Code.

## Illustrierter Versorgungstreck
103 Regeltests bestehen weiterhin. Vollständiger bestehender Browserablauf mit Hauptbildschirm und zwei Handys nach der neuen Darstellung erfolgreich. Zusätzlich Höhenweg und Schlucht bei 1440×900, 1920×1080 und 844×390 mit bewegtem Wagen, Figuren und zwei Banditen geprüft; Pause/Fortsetzen und Schussaktion ohne JavaScript-Fehler. Sichtprüfung von Pferd/Geschirr, sitzendem Kutscher, Plane, Rädern, Landschaftsebenen und Tiefensortierung. Lokale Messung je Route: 121 requestAnimationFrame-Aufrufe in etwa zwei Sekunden, keine Frame-Abstände über 50 ms in dieser Testumgebung; keine Aussage über reale Endgeräte. Keine QA-Aufstellungen im ausgelieferten Code.

## Mobiler Abschluss, Charakter, Ausrüstung und Fort
110 Regeltests bestanden. Neue Prüfungen: Besitz/Ausrüsten von Waffen, Kauf genau einmal, gesperrte ungeeignete Kleiderwerte, unveränderbare Ansichten, Reichweitenunterschiede in Jagd/Eskorte, Schützenzuordnung, Skalierung bei 1/2/4/8 verbundenen Spielern, sichtbare Ankunft mit Pause sowie Rückkehr ins freie Stadtspiel ohne Wiederholung.
Browser mit TV und zwei Handys: Lobby am Handy starten, Outfit wechseln, Wiederladen und erhaltene Auswahl, Gewehr tatsächlich im Katalog kaufen und im Rucksack ausrüsten, identischer Outfitdatensatz im Innenraum und bei der Jagd, Jagd verlassen, Sammelruf am Handy, beide Bereitschaften/Routenwahl, Pause/Fortsetzen am Handy, Fort-Einfahrt, Wiederladen im Ergebniszustand, Ergebnisfenster am TV schließen und anschließend vom Handy zur Stadt zurück. Beide Handys kehren zurück, Missionsoberfläche verschwindet, Stadtbewegung funktioniert, Outfit und Waffe bleiben erhalten. Ergebnis-/Spielsteuerung in vier Handyabmessungen sichtbar. Zusätzlich bestehender Casino-Test mit zwei Handys und vier Größen nach Umstellung auf Charakterporträts erfolgreich; keine JavaScript-Fehler. Nur lokale Testfixtures setzen Standorte, Gold/Vorräte und kurz vor Missionsende; keine QA-Ereignisse werden ausgeliefert.

## Berufsfiguren, Vorteile und Poker-Erklärung
119 Regeltests bestanden: eigene Berufsarbeit vs. Aushilfe, Händlerpreis identisch in Anzeige und Abbuchung, drei Jäger-Kills vs. ein normaler Kill mit fortbestehender Bewegung, geringere Entdeckungsdistanz, individuelle Rollensilhouetten, konkrete beste Fünf-Karten-Teilmenge, Paar-/Zweipaar-/Drilling-/Vierling-Markierungen, Straße einschließlich Ass niedrig, Flush, Full House und Beikarten. Handdetails fremder Spieler bleiben bis zum öffentlichen Showdown verborgen; Passen öffnet sie nicht.
Browser mit TV und zwei Handys: Stadtbewohner als sechs verschiedene Figuren, Outfit-/Waffen-/Treckablauf weiterhin erfolgreich. Casino bei 390×844 / 844×390 / 320×568 / 667×375: für den Spiel-Knopf geometrisch keine Überschneidung mit anderen sichtbaren Casinotasten, reale Layoutposition in der Menüleiste. Kontrollierter lokaler Showdown mit Königspaar gegen Zehnerpaar prüft goldene Karten und auswählbare gegnerische Erklärung; Blackjack, Drawer, Chipdarstellung und Abschluss weiterhin ohne JavaScript-Fehler. Sichtprüfung der Berufs-Galerie, Bewohner, sichtbaren Poker-Sitzfiguren, freigeräumten Casino-Einrichtung und beider Formate. Nur lokale Fixtures setzen Testkarten/Standorte, keine Testzugänge im veröffentlichten Server.

## Erste illustrierte Jäger-Stilprobe

- Eigene `/character-preview.html` ohne Socket-Verbindung: echte Stadt- und Ladenzeichnungen, bisherige Größenfaktoren und Ladenkamera; alte/neue Figur vergleichbar, Nähe umschaltbar, vier Laufrichtungen und feste Touch-Steuerung.
- Chromium bei 390×844, 844×390, 320×568, 667×375 und 1440×900: Atlas geladen, alle Knöpfe/Joystick sichtbar und ohne gegenseitige Überlappung; Vergleich, Umgebung, Vergrößerung, vier Pfeilrichtungen, Laufprobe, echter Touch-Drag und Bewegungsstopp bei Loslassen/Fokusverlust bestanden. Keine Browserfehler oder fehlenden Ressourcen. Screenshots der Stadt und des Ladens in normaler und vergrößerter Darstellung erstellt und repräsentative Ansichten visuell geprüft.
- 119 vorhandene Regeltests bestanden. Keine Spielregeln verändert. Die Atlas-Animation ist eine erste Stilprobe mit teils ähnlichen generierten Laufposen; Kleidungsauswahl und andere Aktionen sind noch nicht mit diesen Bildern umgesetzt. Reale Handyprüfung steht aus.

## Illustrierte Figuren im gesamten Spiel

- Acht lokal ausgelieferte WebP-Atlanten im bestätigten Stil; gemeinsamer Bodenanker, vier Ansichten, erste Laufbilder, Farben, Waffen und aus demselben Bildsatz zusammengesetzte Sitzdarstellung. Stadt-/Raum-NPCs, Fahrer und Banditen ebenfalls umgestellt. Die serverseitige Kleidung und der Waffenbesitz bleiben maßgeblich.
- Grafische Chromium-Prüfung: alle acht Dateien geladen, keine fehlenden Bilder, alle acht Kostüme in Front/Seite/Rücken und sitzend/mit Waffe gezeichnet; Hemd- und Hutfarbänderungen getrennt für jeden Beruf nachgewiesen. Bildausfall gezielt simuliert: alte Canvas-Figur weiterhin verwendbar, keine unbehandelte Ausnahme. Ansichten fotografiert und visuell geprüft.
- Stilprobe in 390×844, 844×390, 320×568 und 667×375: Berufsauswahl, alte/neue Figur, Stadt/Laden; Knöpfe, Auswahl, Joystick und Hinweis sichtbar und ohne gegenseitige Überlappung. Große Galerie bei 1440 Pixel Breite geprüft.
- Zwei-Handy-/Hauptbildschirm-Regression mit echter lokaler Socket-Verbindung bestanden: Start vom Handy, Kleidung ändern und neu verbinden, bezahlter Gewehrkauf/Ausrüstung, dieselbe Kleidung in Räumen/Jagd/Stadt/Treck, Sammeln/Abstimmen, Pause/Fortsetzen, sichtbare Fortankunft, Neuladen am Ergebnis, per Handy zurück zur spielbaren Stadt. Keine Browserausnahmen.
- Poker/Blackjack mit zwei Handys in vier Handyformaten erneut bestanden: Chips/Aktionsmarkierungen, Showdown-Auswahl, goldene Kartenmarkierung, verdeckte Fremdkarten, Schubladen, Blackjack-Abschluss und erreichbare Tasten. Sitzporträts und Casino-Raum fotografiert/geprüft. 119 bestehende Regeltests bestanden.
- Die Grafiken sind eine erste integrierte Animationsfassung; vollständige individuelle Nachlade-/Arbeitsanimationen und reale iPhone-/Safari-Prüfung bleiben weitere Schritte. Bestehende Speicherbegrenzung auf die laufende Serverpartie unverändert.

## Casino-Klarheit und Jagdposen

- Poker: Namen/Chips, letzte Aktion, Karten und tatsächlich gesetzte Chips besitzen reservierten Platz im Raster. Gemeinschaftskarten liegen separat in der Mitte. Vier separate „Hand ansehen“-Schaltflächen durch antippbare aufgedeckte Karten ersetzt; Gewinner, Auszahlung und gewählte Kartenkombination bleiben getrennt erkennbar. Details/Beikarten stehen im aufklappbaren Verlauf. Blackjack: unabhängige Bank-/Spielerbereiche mit Summen, eigener Einsatz-/Status-/Vorratszeile. Aktionen im Hochformat unten, im Querformat rechts.
- Geometrische Chromium-Prüfung von 60 Ansichten bei 390×844, 844×390, 320×568, 667×375, 430×932 und 1024×768: Poker vor dem Flop, Flop, River, Showdown und Zuschauer; Blackjack Einstieg, Spielerzug, Bankzug, Ergebnis und viele Karten. Jede Karte, Identitäts-/Aktionszeile, Einsatz, Pot, Punkt-/Handbereich, Status und Bedienknopf sichtbar und ohne gegenseitige Überlappung. Lange Namen, größere Einsätze und mehrere Chipwerte berücksichtigt. Zehn zusätzliche Querformat-Ansichten mit simulierter 44-Pixel-Displayaussparung links und 21-Pixel-Home-Bereich unten bestanden. Verlauf, Escape, gesperrte verdeckte Aktionen und Fokus nach Datenaktualisierung geprüft.
- Zwei-Handy-Casino-Regression bestanden: gemeinsame Pokerhand, wirkliche Erhöhung und Chips, verdeckte Fremdkarten, kontrollierter Showdown, markierte Karten/Handvergleich, Schließen des Tisches, Blackjack und Rundenabschluss in vier Handyformaten. Keine Browserausnahmen.
- Jäger: eigener transparenter Action-Atlas mit 16 Ziel-/Rückstoßbildern (beide Waffen, vier Richtungen), Körpermaßstab am Fußpunkt ausgerichtet, Zuschnitt an den tatsächlichen Bildlücken statt durch lange Gewehrläufe. Palette gilt auch für die neuen Posen. Oberkörperwippen/wechselnde Kontaktbilder ergänzen den Lauf ohne schwebende Sohlen. Bildpuffer zusätzlich auf acht Megapixel begrenzt.
- Echter lokaler Jagdserver: Revolver/Gewehr in vier Handyformaten; simultanes linkes Zielen und rechtes Schießen über zwei echte Touchpunkte, serverseitig akzeptierter Schuss, Patronenverbrauch, Rückstoßbild, kurze Nachhaltung, erneutes Laufen, Pause/Fortsetzen mit eingefrorener Bildphase bestanden. 16 Posen als Galerie und Jagdansichten fotografiert und visuell geprüft. Testfigur und Tierposition nur in einer lokalen Fixture gesetzt; keine Testbefehle im Produkt. Mündungsblitz/Schusslinie verwenden die Waffenposition; reduzierte Bewegung unterdrückt Wippen.
- 119 bestehende Regeltests bestanden. Echte iPhone-/Safari-Prüfung steht aus; Nachlade-/Arbeitsanimationen sind spätere Schritte.

## Jagd- und Schussbewegung aller Berufe

- Acht eigene Aktionsatlanten (sieben ergänzt, Jäger weiterverwendet), insgesamt 128 Ziel-/Rückstoßbilder: Revolver/Gewehr und vier Blickrichtungen. Chromium-Galerie prüft bei jedem Bild den berufszugehörigen Atlas, die richtige Zeile und Richtung; anschließend visuell geprüft. Fußanker, Berufskostüme und Farbvarianten in der gemeinsamen Spielzeichnung erhalten. Bildpuffer bleibt begrenzt.
- Lokaler echter Jagdserver mit allen acht Berufen und beiden Waffen im Handy-Hochformat: je zwei gleichzeitige Touchpunkte für linkes Zielen/rechtes Schießen, tatsächlicher Patronenverbrauch, Rückstoß, kurze Waffenhaltung, erneutes Laufen sowie Pause/Fortsetzen mit eingefrorener Bildphase bestanden. Berufsidentität jeweils kontrolliert; keine Browserausnahmen. Vorherige responsive Casino-/Jagdprüfungen bleiben dokumentiert.
- Gemeinsamer Treckrenderer mit acht gleichzeitig schießenden Berufsfiguren: richtige Schusswaffe, Rückstoß, Erholung, Pause und Rückkehr zur Ruhe geprüft. Schusslinien/Mündungsblitze berücksichtigen Waffenposition und Rückstoßbild. Servertest prüft eingefrorene Schusszeit, unveränderliche Schusswaffe trotz späterem Ausrüstungswechsel und zeitgerechtes Ausblenden. 120 Regeltests bestanden.
- Diese Prüfung verwendet Chromium mit Touchsimulation; echte iPhone-/Safari-Prüfung bleibt offen. Eigene Nachlade-/Arbeitsanimationen sind noch nicht Bestandteil dieser Änderung.

## Poker-Handwechsel, Größenabgleich und neuer Wald

- 129 Regeltests bestanden. Neue Tests: Bestätigung direkt nach Handende, gemeinsame Bereitschaft mehrerer Menschen, sofortiger Solostart, automatischer Start nach fünf Sekunden, abwesende Gäste, veraltete/doppelte Eingaben und neu belegte Plätze ohne geerbte Bereitschaft sowie weiterhin lesbare Ergebnisse nach dem Aufstehen eines Gewinners. Bestehende Chip-/Nebenpot-/Privatsphäretests weiter bestanden.
- Echter lokaler Zwei-Handy-Pokertest: erster Gast bestätigt sofort und wartet bei 1/2, zweiter bestätigt und startet unmittelbar die nächste Hand. Ohne Eingabe erfolgte der automatische Handwechsel nach gemessenen 4.999 ms. Pause hält den Ergebniszustand, abgemeldete Gäste blockieren die gemeinsame Bereitschaft nicht. Bedienflächen einschließlich langer „Bereit · warte auf Mitspieler“-Beschriftung bei 390×844, 844×390, 320×568 und 667×375 ohne gegenseitige Überlappung oder Herausragen geprüft.
- Figuren: 64 echte Canvas-Vergleiche aller acht Berufe, vier Richtungen und beider Waffen. Körperhöhe bei normalem Stehen und Zielen wich beim vergrößerten Prüfmaßstab höchstens um einen Pixel ab. Breitenabgleich anhand der Hutbreite statt des ausgestreckten Gewehrs, unveränderter Fußanker und entsprechend korrigierte Mündungsposition. Visueller Vergleich der Jagd im Hoch-/Querformat erstellt. Die 128 Aktionsfelder und gemeinsame Treckdarstellung bleiben geprüft.
- Neuer Tieratlas und acht Waldobjekte im echten Jagdfrontend geladen; saubere Alpha-Ausgabe und Darstellung auf vier Handyformaten visuell geprüft. Hirsch, Hase, Wildschwein und Fuchs jeweils tatsächlich per Tier-Antippen, linkem gehaltenem Zielen und rechtem Schuss über zwei simulierte Touchpunkte erlegt: korrekte serverseitige Patronen-/Beuteänderung und erneute Bewegung nach dem Treffer, keine Browserausnahmen.
- Regelprüfung von 25 reproduzierbaren Besuchsverteilungen: alle vier Arten, gültige/abständige Standorte, ausreichend Abstand zum Eingang und wechselnde Startpositionen. 120 Sekunden simuliertes Streifen mit fortlaufender Kollisionsprüfung; mindestens fünf der acht Tiere entfernten sich über 180 Welteinheiten von ihrem Start. Lokale, auslaufende Fährten, begrenzte Datenmenge und private Bewegungsziele kontrolliert. Flucht am Waldrand bewegt die Tiere weiter, ohne gegen die Grenze zu laufen. Bestehende Köder-/Fallen-/Reparatur-/Tragkraftregeln bleiben geprüft.
- Browserprüfung mit Chromium und Touchsimulation. Eine echte Safari-/iPhone-Geräteprüfung ist damit nicht ersetzt.
