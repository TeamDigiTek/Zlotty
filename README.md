# Zlotty - En smart gadget indenfor temperatur og fugtighed til dit hjem
## Dette var 3g Eksamensprojekt i teknikfaget Digital Design og IT

Zlotty er en mini prototype på en smart gadget der er lavet til dit hjem, der kan hjælpe med at regulerer temperatur og fugtighed.
Zlotty fungerer via en hjemmeside, der har en websocket forbindelse til en Arduino. Samspillet mellem Arduino og websocket fungerer via machinelearning v. Google Teachable Machine.
Zlotty kan tage basis kommandoer som "luk vinduet nord" på hjemmesiden, og handle derefter på arduinoen i den virkelige verden

Features som:

* Brugere kan få temperatur og fugtighedsmålinger fra Arduino v. sensorer
* Brugere kan se grafer for temp. og fugtighed på hjemmesiden (brugerfladen)
* Brugeren kan give kommandoer på hjemmesiden, til arduinoen der kan styre hjemmet.

## Mine mål

* [x] 📝 Diagram af Full Stack
* [x] 🔎 Hold Client og Server hver for sig
* [x] ⌨️ Få bruger input direkte på siden
* [x] ➡️ Send brugernes input til Arduino
* [x] 🗃 Opbevar dataen fra arduino i database
* [x] 🔍 Modtag dataen fra en database til serveren
* [x] ⬅️ Modtag dataen fra server til klientens side
* [x] 🚀 Deploy med heroku

## Idéer til videreudvikling??

* Bedre stemmestyring
* Reelle handlinger fremfor dioder v. stemmestyring
* Mobil kompatibel
* Mere lækkert frontend design
