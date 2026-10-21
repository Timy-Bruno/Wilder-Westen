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

Versorgungstreck: Originale Canvas-Illustrationen mit mehreren Landschaftsebenen, unterschiedlichen Routen, räumlichem Planwagen, Pferdegang und nach Bodenkontakt sortierten Figuren. Die sichtbare Begrenzung bleibt auf dem serverseitigen Radius von 190 Weltpunkten. Die vorhandene Hemd-/Hutfarbwahl gilt durchgängig in Stadt, Innenräumen und Mission. Nummern ergänzen die individuellen Figuren; kaufbare Kleidungsformen sind für einen späteren Schritt vorgesehen.

Charakterstandard: public/character-art.js ist die gemeinsame Player-Darstellung aller Spielbereiche und der sitzenden Casino-Porträts. NPCs verwenden eigene stabile Varianten derselben Zeichnung. character.js prüft Outfits und Waffenbesitz serverseitig; kein eigener Jäger-/Treck-Skin mehr. Spielerwaffen werden nur während Benutzung gezeigt. Eine Garderobe mit vorhandener Grundkleidung bildet die Basis für spätere kaufbare Kleidungsstücke.

Berufs-Silhouetten: Lederschürze, Arztmantel, Sheriffstern, Weste/Zylinder, Jagdmantel mit Bandolier und Feder, Grubenlampe und Werkzeuggürtel. Zufallsrollen und Spielerindex bestimmen stabile individuelle Varianten. NPCs erhalten dieselbe gemeinsame Zeichnung mit eigener Variante statt Emoji-Symbolen. Spielsteuerung wird als normales Flex-Element in die jeweilige Leiste versetzt; sie darf keine schwebenden Bildschirmkoordinaten für Touch-Flächen mehr verwenden.

## Bestätigter Figurenstandard: illustrierte Western-RPG-Figuren

Acht kompakte, Pokémon-inspirierte Berufskostüme mit klaren Konturen und leichter Aufsicht. Gemeinsame Zeichnung über `character-sprites.js` und `character-art.js` in Stadt, Räumen, Jagd, Treck, Rucksack und Casino; Stadt-/Raum-NPCs, Fahrer und Banditen verwenden ebenfalls die Illustration. Durchgängiger Fußanker und Blickrichtung, Hemd-/Hutfarben sowie Haut-/Haarvarianten. Gewehr und Revolver während der Benutzung, dieselbe Figur in der zusammengesetzten Sitzdarstellung. Gepufferte Varianten mit Speichergrenzen, bisherige Canvas-Zeichnung als Ersatz bei fehlenden Bilddateien. Die Stilprobe erlaubt die Auswahl aller Berufe. Details und verbleibende Animationsarbeit: `ART-DIRECTION.md`.

## Casino: feste Bereiche statt schwebender Beschriftungen

Poker nutzt ein dreireihiges Raster: gegenüberliegender Platz oben, seitliche Plätze und Gemeinschaftskarten in der Mitte, eigener Platz unten. Jeder Platz reserviert Raum für Figur/Karten, Name/Chips, letzte Aktion und Einsatz beziehungsweise Auszahlung. Keine doppelten Chipvorräte als frei schwebende Stapel. Aufgedeckte Karten sind selbst die Vergleichstaste; die gewählte Hand wird gold markiert und mit „Markiert“ benannt. Handdetails, Beikarten und Verlauf sind hinter „Verlauf & Hände“ erreichbar. Bei Blackjack bilden Bank und eigene Hand zwei unabhängige Bereiche mit Figur, Aktion, Punktzahl und Karten; Einsatz/Status/Vorrat stehen dazwischen. Hochformat: Aktionen unten. Querformat: eigene rechte Bedienleiste. Sichere Displayränder werden berücksichtigt. Menüs sperren verdeckte Tischaktionen und behalten den Tastaturfokus bei Datenaktualisierungen.

Jäger: eigener Atlas für Revolver-/Gewehrzielen und Rückstoß in vier Ansichten, stabiler Fußpunkt, Gewehr an der Schulter und unterstützende zweite Hand. Mündungsblitz/Schusslinie beginnen an der passenden Waffenposition. Kurze sichtbare Schussnachhaltung, sofortiger Wechsel zum Laufen bei Bewegung; Pause friert die visuellen Jagdphasen ein. Leichtes Oberkörperwippen mit verankerten Sohlen und alternierenden Kontaktbildern für den gemeinsamen Lauf.

## Waffenanimation für alle Berufe

Alle acht Berufe verwenden ihre eigenen Ziel-/Rückstoßbilder für Revolver und Gewehr. Berufskleidung und gewählte Farben bleiben erhalten; der gemeinsame Figurenrenderer wählt den passenden Bildsatz automatisch. Jagd und Versorgungstreck teilen diese Darstellung. Treck-Schüsse übertragen Zeitpunkt, Schusswaffe und die gemeinsame Spielzeit: Rückstoß, kurze Nachhaltung und Pause stimmen so auf beiden Bildschirmen überein. Ein zwischenzeitlicher Waffenwechsel ändert nicht rückwirkend die abgefeuerte Waffe. Der Mündungsblitz ist kurz sichtbar, während die Haltung etwas länger ausläuft.

## Schneller Handwechsel und lebendiges Jagdgebiet

Nach einer Pokerhand beginnt die nächste nach höchstens fünf Sekunden gemeinsamer Spielzeit. Jeder anwesende menschliche Gast kann sofort bestätigen; sobald alle bestätigt haben, startet die Hand unmittelbar. NPCs benötigen keine Bestätigung. Angezeigte Bereitschaft zählt getrennt vom Einsatz und zeigt im Mehrspielerbetrieb den Fortschritt. Bestätigungen gelten nur für die aktuelle beendete Hand; doppelte/veraltete Befehle und ein neuer Gast auf einem alten Platz können keine Bereitschaft erben. Abwesende Gäste halten den schnellen Handwechsel nicht auf; Pause friert den Ablauf ein.

Acht Wildtiere aus vier Arten verteilen sich bei jedem Waldbesuch neu über freie, voneinander getrennte Plätze mit Abstand zum Eingang. Sie wechseln zwischen Grasen/Schnüffeln, Aufmerken und längeren Streifwegen. Hindernisse werden bei der Wegwahl berücksichtigt; bei Flucht können sie an Bäumen und Rändern abdrehen. Arten unterscheiden sich in Bewegung, Wahrnehmung, Treffergröße und Beute: Hirsch 2 Fleisch/1 Fell, Hase 1/1, Wildschwein 3/1, Fuchs 1/2. Jägervorteile und bestehende Tragkraft bleiben erhalten. Tiere hinter Deckung und ihre Ziele werden nicht ans Handy übermittelt. Bewegung hinterlässt Fährten für maximal 90 Spielsekunden, sichtbar nur in der Nähe und mit freier Sicht. Die festen Wildwechsel dienen weiterhin als Fallenplätze und sind keine zugesicherten Tierstandorte.

## Erste gemeinsame Berufskette: verschlissene Fallen

Eine eingepackte Falle mit Zustand 0/3 wird am Annahmetresen der Schmiede abgegeben. Ein Brett, ein Erz und eine Kohle werden einmalig reserviert. Zuerst fertigt der Baumeister in der Zimmerei an der Sägebank einen Ersatzrahmen: Brettlänge am Bauplan vergleichen, sechs wechselnde Sägehübe entlang der Markierung, anschließend zwei Bohrungen halten. Die Lieferung schaltet den Schmiedeauftrag frei. Danach folgen Erhitzen, drei Gelenke richten und Abschrecken. Der Besitzer erhält eine Nachricht und holt seine Falle am Annahmetresen ab.

Menschliche Handwerker erhalten je zwei Gold für einen abgeschlossenen Arbeitsschritt an einer fremden Falle. Fortschritt bleibt bei Arbeitsunterbrechung erhalten. Nicht besetzte Berufe übernehmen NPCs (20 Sekunden Holzarbeit, danach 40 Sekunden Metallarbeit). Ist ein zugeteilter Mensch offline, kann der Besitzer am Annahmetresen für diesen Schritt einen NPC beauftragen. Leichterer Verschleiß bleibt eine direkte Metallreparatur ohne Brettbedarf. Dies ist die erste gemeinsame Produktionskette; weitere Berufe folgen einzeln.

## Saloonküche: Eintopf als eigene Tätigkeit

Eintopf verwendet die serverseitige Küche statt des allgemeinen Timing-Minispiels. Sechs Schnittlinien werden per durchgehender Wischbewegung geschnitten; anschließend werden Fleisch, Gemüse und Brühe in den Topf gezogen. Gemüse und Brühe sind Küchenvorräte, das bestehende Rezept verbraucht weiterhin ein Fleisch. Beim Garen steuert Feuerholz die Temperatur. Nur passende Hitze und regelmäßige kreisende Löffelbewegungen erhöhen den Garfortschritt. Überhitzung mindert die Qualität, ohne die Aufgabe dauerhaft zu sperren. Zum Abschluss werden drei Schalen portioniert. Berufs-/Qualitätsbonus, anschließende Fertigungszeit, Bestellungen und Abholung nutzen die bestehenden Regeln. Whiskey bleibt vorerst unverändert.

Das Küchenfenster belegt das Handy vollständig: Arbeitsfläche als Canvas, lesbare Schritte und Feuerbedienung als DOM. Im Querformat stehen die Bedienelemente rechts. Pause, Hintergrundwechsel und Verbindungsabbruch stoppen das Feuer; das Wiederverbinden setzt die vorhandene Küchenarbeit fort. Ein manuell gemeldetes Minispielergebnis kann diese Herstellung nicht abschließen.
