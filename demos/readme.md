## Rövid, átfogó jellegű leírás, használati útmutató a gráfszerkesztő jelenlegi állapotához

### Hozzáadás a Toolboxból:
Rákattintunk a hozzáadandó elemre, majd a kurzort a canvas-ra visszük, így az megjelenik rajta előre definiált helyen.
Ezután húzással tudjuk mozgatni az elemet (a kört egyelőre csak a jobb alsó negyedénél fogva)

### Összeköttetés hozzárendelése node-okhoz:
A Toolbox-ból az Add Edge gomb megnyomásával érhető el. Ekkor meg kell adni ID alapján, hogy melyik 2 elemet szeretnénk összekötni.
A node id-ját lekérdezni az adott node-ra való dupla kattintással lehet.
* Folyamatos (continuous) és szaggatott (dashed) vonal is hozzáadható a csomópontok összekötése esetén.
* A Start csomópont egyelőre nem mozgatható, azonban hozzá is húzható vonal. Az ID-ja 0.

### Node átméretezés, szöveg hozzáadása:
Az adott node-on dupla kattintással érhető el (a Toolbox alatt jelenik meg a felület, ahol ezek megadhatóak).
* A beírt szöveg azonnal megjelenik az adott node-on, azonban hogy ne tűnjön egybemosott szövegnek, a canvasra kell vinni a kurzort.
* A Resize (átméretezés) gomb megnyomása után szintén a canvasra kell irányítani a kurzort, hogy az adott node mérete megváltozzon.
