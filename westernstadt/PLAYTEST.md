# Kapitel 1: geprüfter Stand

- Regeltests: Beiträge und Inventarverbrauch, Mindestvorräte, private Routenstimmen, Gleichstand, Zeitablauf, Pausen/Offline-Verhalten, serverseitige Schussreichweite und Abklingzeit, Reparaturkosten, automatische Medizin, Sieg, Niederlage und Wiederholung, Proviantverbrauch an Wegpunkten.
- Lokaler Test über echte Socket.IO-Verbindungen: Host und Handy beitreten; Saloon und Zimmerei aufsuchen; mit NPC-Aushilfe produzieren; tatsächliche Wartezeit abwarten; zur Kirche laufen; Vorräte spenden; unberechtigte Hostaktionen ablehnen; pausieren; abstimmen; während der Eskorte bewegen; mit demselben Spielerplatz wiederverbinden.
- Chromium: tatsächlicher Spielstart mit Bildschirm und Handy; Auftragsansicht und Abstimmung; deterministische Zustände für die Eskorte und das Ergebnis. Mobile Layouts bei 390×844, 844×390 und 320×568. Joystick und gehaltener Schuss bleiben bei eingehenden Zustandsänderungen aktiv. Keine JavaScript-Ausnahmen.
- Screenshots von Vorbereitung, Abstimmung, Eskorte und mobilen Steuerungen geprüft. Externe Schriften waren im Browser-Test gesperrt; Systemschriften wurden benutzt.

Nicht geprüft: echte iOS-/Android-Geräte, längere Mehrspieler-Balancetests mit acht Menschen, dauerhafte Speicherung. Weitere Kapitel sind nicht enthalten.

## Jagd: begehbarer Wald

- Vierzehn Regeltests für normalisierte Bewegung, Grenzen/Kollisionen, Schleichen, Sichtschutz, Zielauswahl, ruhige und überhastete Schüsse, Reichweite, Fluchtverhalten, Köder, Unterbrechung und getrennte Sitzungen. Zusammen mit den Kapiteltests und Fallenregeln 49 Tests.
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
