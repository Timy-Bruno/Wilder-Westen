# Jäger: erste bewegliche Stilprobe

Der Nutzer hat die olivgrüne Westernkleidung und die kompaktere, Pokémon-inspirierte Gestaltung als Richtung bestätigt. Gerade Weltachsen, leicht erhöhte Kamera, klare Konturen und ein 2D-Spiel mit räumlich gezeichneten Möbeln bleiben der Maßstab.

## Ansehen

`/character-preview.html` zeigt den Jäger vor den tatsächlich ausgelieferten Stadtfassaden und der Ladeneinrichtung. Stadt und Laden verwenden ihre bisherigen Größenfaktoren (.72 bzw. 1.3) sowie die bisherige Ladenkamera. Joystick/Pfeiltasten bewegen die Figur, Laufprobe läuft einen kleinen Rundgang, Vorher vergleicht die alte Canvas-Figur. Näher ansehen vergrößert die Darstellung ausdrücklich für die Beurteilung der Details.

Es handelt sich um eine lokale visuelle Probe ohne Verbindung zum Spielzustand. Das Outfit ist ein fester Jägerentwurf. Dynamische Kleidungsfarben, andere Berufe, Waffenhaltung und Sitzbilder sind noch keine Bestandteile dieses neuen Bildsatzes. Vor einer Umstellung aller Spielfiguren müssen diese Varianten und die Laufbewegungen weiter abgestimmt werden. Die erste generierte Folge enthält teils ähnliche Laufposen; sie ist ein Stil- und Einbindungstest, kein fertiger Animationsstandard.

## Asset

- `public/assets/characters/hunter-v1.webp`: transparentes 512×512-Atlas, 4×4 Bilder à 128 Pixel, etwa 84 KiB.
- Zeilen: vorne, links, rechts, hinten. Spalten: Ruhe, Laufpose, Mittelpose, Laufpose.
- Gemeinsamer Maßstab für alle Bilder; Fußanker (64,124). Metadaten und Quellrahmen in `hunter-v1.json`.
- `public/hunter-sprite.js`: Zeichnen am gemeinsamen Fußanker; Schatten separat. Die Probe verwendet den vorhandenen Boden-/Möbel-Tiefensortierer.
- Erzeugt mit integrierter Bildgenerierung anhand des ausgewählten Jägerbildes; technisch über Alpha-Grenzen zugeschnitten, mit einem gemeinsamen Faktor skaliert und als WebP verpackt. Keine künstliche Skalierung pro Einzelbild.

## Verwendeter Generierungs-Prompt

> Use case: identity-preserve. Asset: production 2D top-down RPG hunter animation atlas based on the approved hunter reference. Convert the reference to a clean small-game sprite, same olive duster, green feathered cowboy hat, brown beard, cream shirt, brown vest, leather bandolier, holster and boots. Keep the charming compact Pokemon-inspired proportions, clear dark outlines, limited cel shading, readable silhouette, orthographic view slightly from above with parallel world axes. Deliver exactly SIXTEEN full body sprites in an evenly spaced 4 COLUMN by 4 ROW grid on a transparent canvas, no labels or scenery. Every cell identical size, feet baseline same relative position, same character scale throughout, entire bodies including hat feather inside cells with padding. ROW 1 faces DOWN toward viewer; ROW 2 faces LEFT in profile; ROW 3 faces RIGHT in profile; ROW 4 faces UP showing back of coat and hat. Each row COLUMN 1 neutral idle feet together, COLUMN 2 walk left foot forward right foot back with opposite arm swing, COLUMN 3 passing pose feet centered, COLUMN 4 walk right foot forward left foot back with opposite arm swing. Exactly 4 frames per direction, whole atlas at once. Preserve same face, outfit proportions and palette across all 16 cells. Empty hands, holstered revolver only, no rifle. No ground shadows, no background, no poster, no borders, no text. Crisp compact hand-painted cartoon RPG sprites, simplify tiny texture from reference so outfit reads at 64 pixels tall. Do not draw full size concept art portraits.
