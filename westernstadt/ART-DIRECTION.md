# Figurenstandard: illustrierte Western-RPG-Figuren

Bestätigt wurde die kompakte, Pokémon-inspirierte 2D-Gestaltung des Jägers mit detaillierter Westernkleidung, klaren Konturen und leichter Aufsicht. Gerade Weltachsen und die vorhandene Kamera bleiben bestehen.

## Im Spiel

Alle acht Berufe besitzen jetzt eigene transparente Bildsätze: Schmied mit Lederschürze, Doc mit Mantel/Brille/Stethoskop, Sheriff mit Stern und geflochtenem Haar, Händler mit Zylinder und Weste, Saloon-Wirt mit burgunderroter Weste/Fliege, Jäger mit Mantel/Federhut, Sprengmeister mit Grubenlampe und Zimmermann mit kurzer Werkzeugschürze.

`public/character-sprites.js` zeichnet die Figuren über denselben Bodenpunkt. `public/character-art.js` bleibt die gemeinsame Schnittstelle in Stadt, Innenräumen, Jagd, Treck, Rucksack und Casino. Auch Stadt-/Raum-NPCs, Wagenfahrer und Banditen nutzen die neue Illustration. Fehlende Bilder fallen auf die bisherige Canvas-Figur zurück; nachgeladenes Bildmaterial aktualisiert auch Rucksack und Casino-Porträts.

Hemd- und Hutfarben bleiben serverseitig geprüft und im bestehenden Charakterzustand gespeichert. Haut-/Haarfarben und Berufskostüm sorgen für stabile Varianten; die Ansichten verwenden denselben Datensatz. Farbänderungen werden über begrenzte Farbbereiche mit erhaltener Schattierung angewendet. Bis zu 24 gepufferte Farb-Atlanten mit zusätzlicher Grenze von acht Megapixeln und 48 Casino-Porträts begrenzen den mobilen Speicherbedarf.

Laufrichtung und Laufbilder werden auch für Mitspieler in Räumen übertragen. Stadt und Treck merken die letzte Bewegungsrichtung. Gewehr und Revolver besitzen unterschiedliche Formen und folgen der benutzten Waffe und Zielrichtung. Die Sitzdarstellung verwendet Ober- und Unterkörper aus demselben Bildsatz mit Stuhl und verkürzter Beinstellung.

## Ausprobieren

`/character-preview.html` bietet alle acht Berufe, alte/neue Darstellung, Stadt/Laden, Vergrößerung, Laufprobe und Joystick/Pfeiltasten. Die Vorschau verändert keine Partie. Standardgrößen: Stadt .72 und Laden 1.3, wie im Spiel.

## Assets und Herkunft

Acht Berufs-WebP-Atlanten unter `public/assets/characters/`, jeweils 512×512, 4×4 Bilder à 128 Pixel. Zeilen: vorne, links, rechts, hinten. Spalten: Ruhe- und Laufbilder. Fußanker (64,124), gemeinsame Skalierung innerhalb eines Bildsatzes. Die Metadaten stehen in den jeweiligen JSON-Dateien. Zusätzlich enthält `hunter-action-v1.webp` 16 Ziel-/Rückstoßposen des Jägers in einem 1024×1024-Atlas mit 256-Pixel-Feldern. Zeilen: Revolver zielen/Rückstoß, Gewehr zielen/Rückstoß; Spalten: unten/links/rechts/oben. Fußanker (128,252), Körpermaßstab passend zur normalen Figur. Die zusätzliche Bilddatei ist etwa 104 KiB groß.

Erstellt mit integrierter Bildgenerierung auf Grundlage des bestätigten Jägers. Generierungsvorgaben für die sieben neuen Berufe: `public/assets/characters/GENERATION.md`. Technische Verpackung: `tools/normalize-character-atlas.cjs`; benötigt Playwright und optional `CHROMIUM_PATH` für ein vorhandenes Chromium. Keine generierten Entwürfe werden nur von einem temporären Pfad im Spiel referenziert.

Die Jäger-Vorgabe war: kompakter erwachsener Westernjäger, olivgrüner Mantel, Federhut, braune Weste und Bandolier, leere Hände, Revolver im Holster; vier Blickrichtungen mit Ruhe-/Laufbildern, klare Konturen, transparente Fläche, leichte orthografische Aufsicht, keine Kulisse oder Beschriftung.

## Nächste grafische Ausbaustufen

Die Laufbilder enthalten teils ähnliche Schrittstellungen. Ein leichtes Oberkörperwippen und abwechselnde Kontaktbilder verbessern den Lauf, während die Füße am Boden verankert bleiben. Reduzierte Bewegung unterdrückt das zusätzliche Wippen. Der Jäger besitzt eigene beidhändige Ziel-/Schussposen für beide Waffen; andere Berufe verwenden zunächst die vorhandene Waffenzeichnung. Rückstoß und die kurze anschließende Waffenhaltung folgen der gemeinsamen Jagdzeit und frieren beim Pausieren ein. Beim Loslaufen endet die stationäre Schussnachhaltung, damit die Figur nicht gleitet. Aufwendige eigenständige Nachlade-, Arbeits- und Sitzanimationen sowie frei auswählbare Gesichtsformen sind weitere Ausbaustufen. Aktuell bleiben die berufsspezifischen Gesichter und Proportionen innerhalb ihrer jeweiligen Figur stabil. Neue kaufbare Kleidungsformen benötigen passende Bild-/Maskenvarianten; die vorhandene Farbwahl funktioniert bereits in den Spielansichten.
