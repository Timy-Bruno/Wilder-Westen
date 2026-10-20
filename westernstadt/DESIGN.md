# Stilversuch: räumlicher Wilder Westen mit illustrierten Figuren

Der Laden dient als erster Stilversuch für eine echte 3D-Szene mit fester orthografischer Kamera und gezeichneten Figuren. Die Richtung wird anhand des spielbaren Raums beurteilt, bevor weitere Gebäude umgestellt werden. Die anderen Räume werden beim Ausbau an diesen Standard angepasst; die Stadt und übrigen Aktivitäten haben noch nicht durchgängig dieses Niveau.

- Schräger 2D-Blick mit lesbarer Raumaufteilung. Laufwege und Arbeitsplätze müssen auf kleinen Handys sofort erkennbar bleiben.
- Warme Holz- und Lederfarben, cremefarbene Schrift, matte Metalltöne. Gedämpftes Blaugrün als Kontrast für Waren und wichtige Figuren.
- Materialien brauchen Tiefe: Holzmaserung und versetzte Dielen, sichtbare Kanten, Beschläge, Nähte und kleine Gebrauchsspuren. Große gleichfarbige Rechtecke genügen nicht als fertige Einrichtung.
- Möbel stehen durch Kontakt- und weiche Umgebungsschatten im Raum. Fenster und Laternen setzen Lichtakzente, ohne dunkle Laufwege oder blendende Effekte.
- Waren haben unterscheidbare Formen: Glasflaschen, Dosen, Stoffpakete, Säcke, Fässer und Kisten. Kleine Details unterstützen die Lesbarkeit und müssen nicht einzeln bedient werden.
- Figuren brauchen eine erkennbare Silhouette, Gesicht/Haar, Kleidung und unterschiedliche Blickrichtungen. Der Händler zeigt Kopf, Gesicht und Oberkörper über der Theke; die Theke verdeckt seine untere Hälfte. Er darf nicht auf einen Hut reduziert werden.
- Interaktionspunkte sind visuell begründet: aufgeschlagener Katalog und Kasse an der Theke, Arbeitsgerät am jeweiligen Arbeitsplatz, klare Türschwelle als Ausgang.
- Steuerung und HUD halten die Spielfläche frei. Joystick bleibt fest, Hinweise bleiben kurz und Handlungsflächen mit dem Daumen erreichbar.
- Hoch- und Querformat sowie 320 Pixel breite Handys werden geprüft. Wichtige Figuren dürfen weder durch UI noch durch falsche Zeichenreihenfolge verschwinden.
- Statische Raumzeichnungen werden zwischengespeichert; Figuren und Bewegung separat dargestellt. Licht flackert nicht unruhig. Grafik entscheidet weder über Kollisionen noch über Treffer oder Warenbestände.

Gebäude, Boden und Möbel entstehen als räumliche Modelle in Three.js. Die vorhandenen Canvas-Figuren werden als gezeichnete Figuren in der Szene platziert. Die Tiefenprüfung der Szene übernimmt die Überdeckung; der Händler steht bei Höhe null hinter der Theke, ohne darübergelegten Oberkörper. Die bisherige Canvas-Szene bleibt ein Ersatz bei fehlender WebGL-Unterstützung. Referenzen dürfen die Richtung vorgeben; die Spielgrafiken werden eigenständig gezeichnet.

## Körper statt flacher Vorderansichten
Möbel zeigen eine breite, perspektivisch versetzte Oberseite, eine vertikale Front und eine dunklere Seitenfläche. Kanten, Eckpunkte, Licht und Schatten müssen zusammenpassen. Gegenstände liegen sichtbar auf ihrer Trägerfläche. Textur allein ersetzt keine räumliche Silhouette. Der Laden wird als erste Außenfassade mit passender, automatisch durchlaufbarer Tür umgesetzt. Hinweise dürfen Bedienelemente zeitweise überlagern, müssen aber jederzeit antippbar oder wegwischbar sein.

## Gemeinsame Raumkoordinaten
X/Z bilden den Spielboden ab, Y die Höhe. Die Kamera bleibt fest schräg; sie lässt sich nicht frei drehen. Jede Arbeitsfläche und jedes Regal besitzt ein räumliches Volumen. Die Joystickrichtung wird aus dem Kamerablick auf die Serverkoordinaten umgerechnet. Ein- und Ausgang, Warenbestände und Kollisionen bleiben serverseitig. Die Außenansicht des Ladens wird aus einem räumlichen Modell mit Dach und Veranda gezeichnet; die übrige Stadt behält vorerst ihre bisherige Ansicht.


## Aktuelle Stilentscheidung: gerade 2D-Ansicht mit räumlichen Möbeln
Der schräge WebGL-Diorama-Versuch wird nicht weiter als aktive Darstellung verwendet. Stadt und Laden bleiben parallel zu den Bildschirmachsen. Die Canvas-Kamera im Laden folgt der Figur sanft wie zuvor. Möbel erhalten helle Oberseiten, dunklere senkrechte Fronten und Bodenschatten; der Händler wird an seinem Bodenstandpunkt hinter der Theke vor der Theke gezeichnet. Der Laden außen erhält ein sichtbares Dach und einen erhöhten Vorbau ohne gedrehten Grundriss. Die experimentellen WebGL-Module bleiben ungenutzt und werden nicht geladen.
