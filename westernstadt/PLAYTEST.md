# Kapitel 1: geprüfter Stand

- Regeltests: Beiträge und Inventarverbrauch, Mindestvorräte, private Routenstimmen, Gleichstand, Zeitablauf, Pausen/Offline-Verhalten, serverseitige Schussreichweite und Abklingzeit, Reparaturkosten, automatische Medizin, Sieg, Niederlage und Wiederholung, Proviantverbrauch an Wegpunkten.
- Lokaler Test über echte Socket.IO-Verbindungen: Host und Handy beitreten; Saloon und Zimmerei aufsuchen; mit NPC-Aushilfe produzieren; tatsächliche Wartezeit abwarten; zur Kirche laufen; Vorräte spenden; unberechtigte Hostaktionen ablehnen; pausieren; abstimmen; während der Eskorte bewegen; mit demselben Spielerplatz wiederverbinden.
- Chromium: tatsächlicher Spielstart mit Bildschirm und Handy; Auftragsansicht und Abstimmung; deterministische Zustände für die Eskorte und das Ergebnis. Mobile Layouts bei 390×844, 844×390 und 320×568. Joystick und gehaltener Schuss bleiben bei eingehenden Zustandsänderungen aktiv. Keine JavaScript-Ausnahmen.
- Screenshots von Vorbereitung, Abstimmung, Eskorte und mobilen Steuerungen geprüft. Externe Schriften waren im Browser-Test gesperrt; Systemschriften wurden benutzt.

Nicht geprüft: echte iOS-/Android-Geräte, längere Mehrspieler-Balancetests mit acht Menschen, dauerhafte Speicherung. Weitere Kapitel sind nicht enthalten.

## Jagd

- Zehn Regeltests für Trefferzonen, Deckung, Munition/Abklingzeit, Köder, Aufschrecken, Pause und Zeitablauf. Zusammen mit den Kapiteltests 20 bestandene Tests.
- Chromium mit echtem Server: Einstieg über Jagdhütte, Zielen und Schießen, einmaliger Köder, Ablehnung manipulierter Ergebnisse, Pause, Wiederherstellung nach Neuladen und genau einmalige Beutegutschrift.
- Handy-Layouts 390×844, 844×390 und 320×568 geprüft; keine JavaScript-Ausnahmen. Portraitdarstellung visuell geprüft. Echte Geräte und Mehrspielerbalance stehen noch aus.
