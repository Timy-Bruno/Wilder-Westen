# Figurenassets: Generierung

Erstellt mit integrierter Bildgenerierung, auf Grundlage des bestätigten illustrierten Jägers. Referenz für Schmied und Doc: Jäger-Atlas; übrige Berufe: einzelner bestätigter Jägerentwurf. Die technische Verpackung nutzt einen gemeinsamen Maßstab je Atlas und denselben Fußanker. Der Sprengmeister enthält eine gespiegelte Korrektur des fälschlich nach rechts gerichteten Bilds in Zeile 2/Spalte 4.

## Gemeinsamer Prompt

Use case: identity-preserve. Asset: 2D top-down Western RPG animation atlas. Reference image is a STYLE AND PROPORTIONS reference for the approved compact hunter: preserve that exact hand-painted chibi RPG style, crisp dark outlines, 2.5-head body proportions, light orthographic view from above and shading quality. Create a DIFFERENT ADULT character with the profession outfit specified below. Deliver EXACTLY 16 FULL-BODY sprites in a perfectly regular 4-COLUMN by 4-ROW grid on a transparent canvas, no scenery or text. Row1 facing DOWN toward viewer; row2 facing LEFT in profile; row3 facing RIGHT in profile; row4 facing UP showing the back. In EVERY row column1 IDLE neutral symmetrical stance, column2 WALK with left foot forward and right arm forward, column3 PASSING neutral stance, column4 WALK with RIGHT foot forward and LEFT arm forward. Column4 must show the OPPOSITE stride from column2, do NOT repeat the same stride. All 16 sprites same scale, same face, same clothes and proportions. Keep generous fully transparent gaps between rows and columns: nothing crosses a cell. Feet baselines align within each row. FULL BODY, complete hat top to boot soles, feather or accessories never clipped. Empty hands at sides, tools worn on belt only. Clear silhouette at 64px tall, restrained cel shading without blurry microtexture. No contact shadows, ground, labels, borders, logos, poster, scene, 3D rendering, realistic anatomy.

## Schmied (`apron-v1.webp`)

PROFESSION CHARACTER: Adult broad-shouldered blacksmith, short dark auburn hair, short moustache, warm face, brown wide-brim cowboy hat with iron buckle, desaturated light blue rolled-sleeve shirt, rich dark russet full leather apron with seams and pocket, broad brown belt with tucked hammer and tongs, work trousers, sturdy leather boots. Strong arms, weathered leather, elegant readable profession detail. Empty hands.

## Doc (`doctor-v1.webp`)

PROFESSION CHARACTER: Adult male frontier doctor, medium brown skin, wavy dark hair, neatly trimmed short goatee, gentle eyes, small round spectacles, brown felt wide-brim hat, ivory long doctor's coat open over desaturated light blue shirt and charcoal waistcoat, brass stethoscope around neck, small dark leather medical satchel on belt, dark trousers and brown boots. No modern uniform or red cross symbols. Empty hands.

## Sheriff (`sheriff-v1.webp`)

PROFESSION CHARACTER: Adult female frontier sheriff, light brown skin, dark chestnut hair in a long braid down the back visible from side and rear, confident face, dark brown wide-brim cowboy hat, cream shirt under dark ochre leather vest with prominent five-point brass sheriff star on chest, red neckerchief, leather gun belt with one HOLSTERED revolver, dark trousers, leather boots. No weapon in hands.

## Händler (`merchant-v1.webp`)

PROFESSION CHARACTER: Adult older male frontier merchant, warm face, swept gray hair, neatly trimmed gray moustache, round brass spectacles, tall dark green-brown TOP HAT with brass ribbon ornament, cream shirt with puff sleeves under emerald teal patterned waistcoat, antique watch chain, warm brown coat tails, leather belt with small ledger pouch, charcoal trousers and polished brown boots. No cane or objects in hands.

## Saloon-Wirt (`barkeep-v1.webp`)

PROFESSION CHARACTER: Adult male frontier barkeeper with dark brown skin, curly black hair and broad curled moustache, friendly welcoming face, tall chocolate-brown TOP HAT with gold ribbon, crisp cream shirt with rolled cuffs, luxurious BURGUNDY waistcoat with brass buttons, dark bowtie, gold watch chain, leather belt with folded white bar towel on side, charcoal trousers, polished brown boots. No bottles or objects in hands.

## Sprengmeister (`miner-v1.webp`)

PROFESSION CHARACTER: Adult older male frontier miner, tan weathered skin, thick gray beard, bushy gray eyebrows, mustard-brown short-brim miners felt hat with a BRASS LAMP fixed to front, desaturated blue work shirt, dark brown leather waistcoat and suspenders, brown utility belt with brass clips, small coiled fuse and little pouch on hip, charcoal work trousers, rugged brown boots. No explosives or tools in hands. Warm frontier costume, no modern hard hat.

## Zimmermann (`carpenter-v1.webp`)

PROFESSION CHARACTER: Adult male frontier carpenter, warm lighter skin, dark wavy hair, clean-shaven smiling face, broad sand-brown cowboy hat, desaturated blue rolled-sleeve shirt, tan leather SHORT apron over the waist with pockets and stitched details, brown belt holding small handsaw and carpenter's square, charcoal work trousers, brown boots. Clear wooden and brass tool details, no tools in hands.

Alle Bilder haben einen transparenten Hintergrund. Ziel: 4×4 vollständige Figuren, unten/links/rechts/oben, Ruhe- und Laufbilder. Technische Metadaten stehen in den zugehörigen JSON-Dateien; Exportwerkzeug: `tools/normalize-character-atlas.cjs`.

## Jäger: Ziel- und Schussposen (`hunter-action-v1.webp`)

Integrierte Bildgenerierung mit dem bestätigten einzelnen Jäger als Identitäts-/Stilreferenz. Verwendete Vorgaben: exakt dieselbe erwachsene kompakte Figur, olivgrüner Mantel, Weste/Bandolier, cremefarbenes Hemd, Federhut und Bart; 4×4 vollständige Bilder auf transparenter Fläche, keine Kulisse/Schrift/Schatten. Spalten unten/links/rechts/oben. Zeilen Revolverzielen, Revolverrückstoß, Gewehrzielen, Gewehrrückstoß. Revolver mit beiden Händen, Gewehr an der Schulter mit zweiter Hand am Vorderschaft; Füße in derselben Position, keine zusätzlichen Arme, keine schwebenden Waffen und kein eingebrannter Mündungsblitz. Die Bildgenerierung erzeugte den Pose-Atlas; das Exportwerkzeug normalisiert ihn über den gemeinsamen Maßstab und die Mitte der Sohlen. Längere Waffen dürfen über die ursprünglichen Viertelgrenzen hinausreichen: tatsächliche transparente Spaltengrenzen bestimmen deshalb die Quellfelder. Ausgabe 256-Pixel-Felder, Fußpunkt (128,252).

## Ziel- und Schussposen für alle Berufe (`*-action-v1.webp`)

Integrierte Bildgenerierung, sieben getrennte Bildsätze. Identitätsreferenz jeweils der bereits bestätigte Berufs-Laufatlas für Schmied, Doc, Sheriff, Händler, Wirt, Sprengmeister und Zimmermann. Der Jäger-Aktionsatlas dient ausschließlich als Pose-/Rasterreferenz. Gesicht, Geschlecht, Haare, Hut, Berufskleidung und ursprüngliche Farben der jeweiligen Figur bleiben erhalten. Das Spiel färbt die freigegebenen Kleidungsbereiche wie bisher um.

Gemeinsame Generierungsvorgabe: „Production Western RPG ACTION SPRITE ATLAS. Image1 is exact CHARACTER IDENTITY and outfit reference. Image2 is POSE AND GRID reference only, do NOT copy hunter clothing. Create exactly sixteen full-body sprites of image1's person, same face, gender, hair, hat, profession costume and colors. Clean outlined compact illustrated Pokemon-inspired 2.5-head chibi slight orthographic top-down art. Transparent background, regular FOUR columns FOUR rows, generous empty gutters, all hats/guns/feet fully inside their cell, identical body size and foot baseline. Columns ALWAYS down toward viewer, left profile, right profile, up back. Row1: supported two-hand revolver AIM at chest height. Row2: same revolver RECOIL with modest wrist/barrel rise. Row3: frontier RIFLE AIM at shoulder, cheek near stock, support hand under fore-end. Row4: same rifle RECOIL, stock remains against shoulder. Exactly same pose system as image2 while preserving image1 identity. No walking, no extra hands, no floating guns, no dangling idle arms, no muzzle flash, smoke, text, shadows or background. Only one active weapon. Empty revolver holster while revolver used; holstered revolver with rifle. Clear at70px. Keep body proportions from image1.“

Technischer Export wie beim Jäger: gemeinsame Skalierung auf 116 Pixel Körperhöhe, Fußanker (128,252), transparente 256-Pixel-Felder im 1024-Pixel-WebP-Atlas, tatsächliche leere Zeilen-/Spaltengrenzen. Individuelle Größen und Quellausschnitte in den jeweiligen JSON-Metadaten. Keine externen Bilddienste oder Abonnements verwendet.
