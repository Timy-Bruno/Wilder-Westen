# Kapitel 1: geprüfter Stand

- Regeltests: Beiträge und Inventarverbrauch, Mindestvorräte, private Routenstimmen, Gleichstand, Zeitablauf, Pausen/Offline-Verhalten, serverseitige Schussreichweite und Abklingzeit, Reparaturkosten, automatische Medizin, Sieg, Niederlage und Wiederholung, Proviantverbrauch an Wegpunkten.
- Lokaler Test über echte Socket.IO-Verbindungen: Host und Handy beitreten; Saloon und Zimmerei aufsuchen; mit NPC-Aushilfe produzieren; tatsächliche Wartezeit abwarten; zur Kirche laufen; Vorräte spenden; unberechtigte Hostaktionen ablehnen; pausieren; abstimmen; während der Eskorte bewegen; mit demselben Spielerplatz wiederverbinden.
- Chromium: tatsächlicher Spielstart mit Bildschirm und Handy; Auftragsansicht und Abstimmung; deterministische Zustände für die Eskorte und das Ergebnis. Mobile Layouts bei 390×844, 844×390 und 320×568. Joystick und gehaltener Schuss bleiben bei eingehenden Zustandsänderungen aktiv. Keine JavaScript-Ausnahmen.
- Screenshots von Vorbereitung, Abstimmung, Eskorte und mobilen Steuerungen geprüft. Externe Schriften waren im Browser-Test gesperrt; Systemschriften wurden benutzt.

Nicht geprüft: echte iOS-/Android-Geräte, längere Mehrspieler-Balancetests mit acht Menschen, dauerhafte Speicherung. Weitere Kapitel sind nicht enthalten.

## Jagd: begehbarer Wald

- Vierzehn Regeltests für normalisierte Bewegung, Grenzen/Kollisionen, Schleichen, Sichtschutz, Zielauswahl, ruhige und überhastete Schüsse, Reichweite, Fluchtverhalten, Köder, Unterbrechung und getrennte Sitzungen. Zusammen mit den Kapiteltests 24 Tests.
- Browserprüfung: realer Einstieg über die Jagdhütte, Weg mit dem Joystick, Entdecken und Antippen des Tiers, Zielen, Schuss mit zwei gleichzeitigen Touchkontakten (Zielen halten + Schießen), Beutegutschrift, Pause und Neuladen.
- Portrait 390×844, Querformat 844×390 und kleines Handy 320×568: Steuerungspositionen geprüft, Screenshots erzeugt; Portrait und Querformat visuell geprüft.
- Für reproduzierbare Ziel-/Touchtests blieb das Tier in einer lokalen Testkonfiguration stehen; der normale Weg durch den Wald wurde separat mit dem Joystick geprüft. Die Browserprüfung läuft ohne den problematischen Chromium-Einprozessmodus. Echte Zwei-Daumen-Bedienung auf iOS/Android und längere Mehrspielerbalance sind noch nicht geprüft. Fallen, zusätzliche Tierarten und Waffenhandel sind noch nicht enthalten.

### Offener Ausflug und Daumensteuerung

Zielen sitzt links über dem unveränderten Joystick; Schießen rechts. Regeltests prüfen Weiterlaufen und Köder nach einem Treffer sowie Erkunden mit leerer Waffe. Browserprüfung: zwei gleichzeitige Touchpunkte, anschließend Bewegung und Köder ohne erzwungene Rückkehr; Layouts bei 390×844, 844×390 und 320×568.
