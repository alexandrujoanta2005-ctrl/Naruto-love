CALEA NINJA – NARUTO FAN QUIZ PWA

CONȚINE
- PWA instalabilă
- Home cu profil, rang, XP, Ryo și serie
- Quiz cu exact 7000 de variante generate
- 100 întrebări-fapt de bază
- filtre după categorie și dificultate
- +10 XP pentru răspuns corect
- Misiuni
- Arhivă Jutsu
- Profil ninja: nume, sat, clan
- salvare locală
- offline după prima încărcare
- iconițe originale

IMPORTANT
Cele 7000 sunt variante generate din 100 de întrebări-fapt de bază.
Nu sunt 7000 de fapte canonice independente verificate manual.

GITHUB PAGES
1. Creezi repository.
2. Urcă toate fișierele din ZIP în rădăcină.
3. Settings -> Pages.
4. Deploy from a branch -> main / root.
5. Deschizi adresa GitHub Pages.

PWA
iPhone: Safari -> Partajare -> Adaugă pe ecranul principal.
Android/Chrome: Install app / Instalează aplicația.

Aplicația este fan-made și nu include imagini, logo-uri sau muzică oficială Naruto.


PERSONAJ HOME v2
- personaj ninja animat pe Home
- 6 variante de personaje
- alegerea se salvează
- buton Vorbește pentru replici/citate
- buton Spune cu voce folosește vocea telefonului/browserului (speechSynthesis)
- buton Animație pentru o mișcare scurtă
- fără imagini oficiale: personajul este desenat din CSS


VERSIUNEA v3 — HOME CA ÎN MOCKUP
- profil mare sus
- nivel + bară XP
- Ryo + chakra
- fundal sat ninja desenat din CSS
- personaj mare animat în centru
- streak și rang în stânga
- balon de replică în dreapta
- Vorbește / Spune cu voce / Animație
- 6 personaje: Naruto, Sasuke, Sakura, Kakashi, Itachi, Gaara
- selector orizontal de personaje
- Misiuni / Quiz / Jutsu / Inventar pe Home
- provocarea zilei
- inventory.html inclus
- PWA cache v3


VERSIUNEA v4 — MOD PERSONAJE PNG
- personajul mare de pe Home folosește acum imagini PNG
- selectorul folosește aceleași imagini
- animațiile, vorbirea și vocea rămân
- imaginile incluse sunt PLACEHOLDER originale, ca aplicația să funcționeze imediat

PENTRU PERSONAJE REALISTE EXACTE:
Înlocuiește fișierele din:
assets/characters/

Păstrează exact numele:
naruto.png
sasuke.png
sakura.png
kakashi.png
itachi.png
gaara.png

Recomandat:
- PNG sau WebP cu fundal transparent
- personaj full body
- raport aproximativ 700x1000
- fără fundal


VERSIUNEA v5 — NARUTO DIN POZA TA
- Naruto de pe Home folosește acum exact poza trimisă de tine
- fundalul alb a fost eliminat
- Naruto apare full-body
- selectorul de jos folosește aceeași imagine
- animația, Vorbește și Spune cu voce rămân
- Sasuke / Sakura / Kakashi / Itachi / Gaara sunt încă placeholder până trimiți imaginile lor

Ca să continui:
trimite imaginile celorlalte personaje și le pun exact la fel.


VERSIUNEA v6 — POZELE TALE
Au fost adăugate:
- Sasuke: poza trimisă de tine
- Itachi: poza trimisă de tine, cu fundal decupat automat
- Kakashi: poza trimisă de tine, cu fundal decupat automat

Naruto rămâne poza trimisă anterior.

Mai lipsesc doar:
- Sakura
- Gaara

Trimite pozele lor și le pun la fel.


VERSIUNEA v7 — TOATE CELE 6 PERSONAJE

Acum sunt puse:
- Naruto — poza ta
- Sasuke — poza ta
- Sakura — poza nouă trimisă de tine
- Kakashi — poza ta
- Itachi — înlocuit cu noua poză trimisă de tine
- Gaara — poza nouă trimisă de tine

IMPORTANT:
Nu există script.js.
Pe Home, logica schimbării personajelor este direct în index.html.
Mai există app.js pentru profil/PWA și quiz.js pentru quiz.

Toate personajele:
- se schimbă din selector
- apar mari pe Home
- au animație
- au replici proprii
- pot folosi „Spune cu voce”


VERSIUNEA v8 — QUIZ FĂRĂ REPETĂRI

- întrebările văzute sunt memorate în localStorage;
- aceeași întrebare cu același ID nu mai apare;
- istoricul rămâne și după ce închizi aplicația;
- poți filtra pe categorie și dificultate;
- aplicația caută doar întrebări nevăzute din filtrul ales;
- afișează câte întrebări ai văzut și câte au mai rămas;
- buton pentru resetarea istoricului;
- după epuizarea întrebărilor dintr-un filtru, aplicația te anunță.

IMPORTANT:
Un quiz local nu poate avea literalmente infinit de fapte unice.
Versiunea aceasta garantează lipsa repetării celor 7000 de variante din banca locală
până când utilizatorul resetează istoricul.


VERSIUNEA v9 — QUIZ 100000

- banca generează exact 100000 de variante de întrebări;
- fiecare variantă primește ID unic;
- modul fără repetare din v8 rămâne activ;
- istoricul întrebărilor văzute se salvează în localStorage;
- aceeași variantă nu reapare până la resetarea istoricului;
- filtrele pe categorie și dificultate rămân;
- scorul și XP-ul rămân.

IMPORTANT:
Cele 100000 sunt variante generate din baza de întrebări-fapt existente.
Nu sunt 100000 de fapte canonice Naruto diferite verificate manual.
