# Verbindlicher Grafikstandard: 2D mit räumlicher Tiefe

Der vom Nutzer bestätigte Laden ist die Referenz für alle zukünftigen Gebäude und Innenräume. Der schräge 3D-Diorama-Versuch ist verworfen.

- Gerade Bildschirmachsen: keine isometrisch gedrehten Gebäude oder Räume. Leicht von oben sichtbare Oberseiten schaffen Tiefe.
- Innenraumkamera wie im Laden: sanftes Folgen der Figur, feste Ausrichtung, keine freie Drehung.
- Warme Holz- und Lederfarben, cremefarbene Schrift, matte Metalltöne und gedämpftes Blaugrün. Jedes Gebäude bekommt berufstypische Materialien und Ausstattung.
- Möbel zeigen helle Oberseiten, dunklere senkrechte Fronten, Kontakt- und Umgebungsschatten, Beschläge und Gebrauchsspuren. Waren stehen sichtbar auf ihren Trägerflächen.
- Figuren sind illustriert. Ihre Bodenposition bestimmt die Zeichenreihenfolge; Theken verdecken Personen dahinter korrekt.
- Fassaden haben sichtbare Dächer, erhöhte Vorbauten, Fenster und vertiefte Türöffnungen, passend zum serverseitigen Grundriss. Schrift wird innerhalb der Schildfläche eingepasst. Eingangshinweise stehen über der Tür.
- Laufwege und Arbeitsplätze bleiben auf kleinen Handys verständlich. Joystick bleibt fest; Meldungen sind wegwischbar. Hoch- und Querformat werden geprüft.
- Statische Zeichnungen werden zwischengespeichert. Canvas-Grafik bleibt unabhängig von serverseitigen Kollisionen, Waren und Aufgaben.

Alle acht Berufshäuser haben begehbare Canvas-Innenräume mit eigenen Arbeitsstationen. Die Schmiede besitzt Esse, Gusstisch, Fallenwerkbank und Reparaturannahme. Die übrigen Räume erhalten berufstypische Geräte auf derselben grafischen Grundlage und werden weiter individuell ausgestaltet. Stadtfassaden werden schrittweise angepasst; Laden und Schmiede sind die ersten beiden.


## Individuelle Raumgestaltung
Kein einheitliches Zwei-mal-zwei-Werkbankschema. Schmiede: Steinboden, Esse, Metallvorräte, Werkzeugwand und besetzte Annahmetheke. Arztpraxis: helle Fliesen, Betten, Waschplatz und Medizinschrank. Sheriff: Schreibtisch, Waffenständer und Zelle. Jagdhütte: Feuerstelle, Geweih-Trophäen, Felle, Bögen und Kräuterausrüstung. Mine: steiniger Boden, Schienen, Lore und Stolleneingang. Zimmerei: breite Sägebank, Baupläne, Holzstapel und Montagebank. Saloon: besetzte Bar, Flaschenregal, Sitzplätze, Klavier, Küche und Treppe zum Casino mit Filztischen. Beschriftungen sitzen auf der Möbelfront, nicht über dem Raum.


## Poker und Werkstatt
Gemeinsamer Pokertisch als runder Filztisch mit vier festen Plätzen; der eigene Platz liegt unten. Dealer/Blinds, Chips, aktueller Einsatz und letzte Aktion gehören sichtbar an die jeweilige Person. Aktiver Zug wird umrandet; Ereignisprotokoll erklärt die Setzrunde. Querformat stellt Tasten und Verlauf neben den Tisch, Hochformat darunter. Blackjack zeigt die Bank beim schrittweisen Ziehen. Die Treppe wird ohne Aktionsknopf durchlaufen.
Schmiedearbeit zeigt echte Werkstücke und Phasen: Erz, Kohle, Esse, Tiegel, Schlacke und Barrenform gegenüber Munitionsformen und Gussansätzen. Halten, Loslassen und gezielte Werkstückaktionen ersetzen die bisherigen Timing-/Merkspiele dieser zwei Rezepte.

Versorgungstreck: Originale Canvas-Illustrationen mit mehreren Landschaftsebenen, unterschiedlichen Routen, räumlichem Planwagen, Pferdegang und nach Bodenkontakt sortierten Figuren. Die sichtbare Begrenzung bleibt auf dem serverseitigen Radius von 190 Weltpunkten. Kleidung/Kaufkleidung ist für einen späteren Schritt vorgesehen; künftige Outfits sollen in Stadt, Innenräumen und Mission dieselbe Charakterdarstellung erhalten. Aktuell bleiben die nummerierten Spielerfarben maßgeblich.

Charakterstandard: public/character-art.js ist die gemeinsame Player-Darstellung aller Spielbereiche und der sitzenden Casino-Porträts. Nur NPCs behalten eigene Silhouetten. character.js prüft Outfits und Waffenbesitz serverseitig; kein eigener Jäger-/Treck-Skin mehr. Spielerwaffen werden nur während Benutzung gezeigt. Eine Garderobe mit vorhandener Grundkleidung bildet die Basis für spätere kaufbare Kleidungsstücke.
