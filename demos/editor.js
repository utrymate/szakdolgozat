function getNode(id){
    //nodes.find(node => node.id === id);
    let node = nodes.filter((node) =>  node.id === parseInt(id));
    return node[0];
}

function getEdge(id){
    let edge = edges.filter((edge) =>  edge.id === parseInt(id));
    return edge[0];
}

function closeText() {
    document.getElementById("addTextRect").style.display = "none";
    document.getElementById("addTextCirc").style.display = "none";
}

function addTextToNode(value) {
    nodes[selectedIndex]["text"] = value; //.text is jó
    context.font = "20px Arial";
    context.textBaseline = 'middle';
    context.textAlign = "center";
    context.fillText(value, nodes[selectedIndex]["x"]+nodes[selectedIndex]["width"]/2, nodes[selectedIndex]["y"]+nodes[selectedIndex]["height"]/2);
    nodes[selectedIndex].widen(value.length);
    /* // TODO: height növelése + sor törés egy bizonyos hossz után
    if(nodes[selectedIndex]["width"] > 150)
    {
        nodes[selectedIndex]["height"] = 80;
    }*/
    clear();
    draw();
    //context.globalCompositeOperation='source-over';
}

function addNodeId() {
    let max = 0;
    if(nodes.length !==0){
        nodes.forEach(e => {
            if(e.id > max /*&& e.id !== 9999*/) { //Így nem az End node lesz a legnagyobb ID-jú
                max = e.id;
            }
        });
    }
    return max;
}

function addEdgeId() {
    let max = 0;
    if(edges.length !==0){
        edges.forEach(e => {
            if(e.id > max) {
                max = e.id;
            }
        });
    }
    return max;
}

// Classos megoldás alapján push-ol
function addRectangle() {
    var newid = addNodeId();
    nodes.push(new Rectangle(100, 100, newid+1, 50, 100, ""));
    // Fontos a sorrend, ezért ide leírom: x, y, id, height, width, text
    // KÉRDÉS: Típus vajon kell-e ide? Mert az eddigi logika alapján kellett, de most már gondolom nem, mert class
    draw();
}
// INFO: az itt megadott height, width értékeket nézi a text hozzáadós a node["width"]

//addCircles
function addCircle() {
    var newid = addNodeId();
    nodes.push(new Circle(200, 100, newid+1, 40, ""));
    // nodes.push( {"id": newid+1, "type": "circle", "x": 200, "y": 100, "text": "", "radius": 40, "width": 0, "height": 0})
    draw();
}

//addStart
function addStart() {
    var newid = addNodeId();
    nodes.push(new Start(60, 60, newid+1, 40, ""));
    // SORREND: x, y, id, radius, text
    //nodes.push( {"id": 0, "type": "start", "x": 60, "y": 60, "text": "", "radius": 40, "width": 0, "height": 0});
    draw();
/*  
    // Ez akkor van, ha csak 1 db lehet belőle, de lehessen több
    let csakegy = true;
    nodes.forEach((value => {
        if (value["type"] === Start()){
            console.log("nem fut le");
            csakegy = false;
        }
    }));
    if (csakegy){
        nodes.push(new Start(60, 60, 0, 40, ""));
        //nodes.push( {"id": 0, "type": "start", "x": 60, "y": 60, "text": "", "radius": 40, "width": 0, "height": 0});
        draw();
        console.log("csak 1 lehet");
    }
*/
}

function addEnd() {
    var newid = addNodeId();
    nodes.push(new End(1220, 660, newid+1, 40, ""));
    // SORREND: x, y, id, radius, text
    //nodes.push( {"id": 9999, "type": "end", "x": 1220, "y": 660, "text": "", "radius": 40, "width": 0, "height": 0});
    draw();
/*
    // Itt is ez a helyzet
    let csakegy = true;
    nodes.forEach((value => {
        if (value["type"] === "end"){
            csakegy = false;
        }
    }));
    if (csakegy){
        nodes.push( {"id": 9999, "type": "end", "x": 1220, "y": 660, "text": "", "radius": 40, "width": 0, "height": 0});
        // INFO: Ha nem írom bele, hogy "text": "", akkor a rajta lévő szöveg "undefined" lesz
        draw();
    }
*/
}

function addEdge(from, to) {
    //edges.push({"from": from, "to": to, "type": "dashed"});
    var newid = addEdgeId();
    edges.push(new Edge(from, to, newid+1));
    // edge1 = document.getElementById("edge1").value = '';
    // edge2 = document.getElementById("edge2").value = '';
}

/*
function folytonos(from, to) {
    let edge1 = document.getElementById("edge1").value;
    let edge2 = document.getElementById("edge2").value;
    edges.push({"from": edge1, "to": edge2, "type": "continuous"});
    edge1 = document.getElementById("edge1").value = '';
    edge2 = document.getElementById("edge2").value = '';
}
*/

function resizeRectangle() {
    nodes[selectedIndex]["width"] = parseInt(document.getElementById("width").value);
    nodes[selectedIndex]["height"] = parseInt(document.getElementById("height").value);
    document.getElementById("width").value = '';
    document.getElementById("height").value = '';
    clear();
    draw();
}

function resizeCircle() {
    nodes[selectedIndex]["radius"] = parseInt(document.getElementById("radius").value);
    document.getElementById("radius").value = '';
    clear();
    draw();
}

function calcMouseEvent(event)
{
    draw();
    return {
        "x": event.clientX - canvasPosition.left,
        "y": event.clientY - canvasPosition.top,
        "button": event.button
    };
}

function mouseDown(event)
{
    //mouseDown = false;
    //mouseUp = false;
    clear();
    draw();
    const mouse = calcMouseEvent(event);
    selectedIndex = null;
    for (var i = 0; i < nodes.length; ++i) {
        var node = nodes[i];
        if (node.isMouseOnNode(mouse['x'], mouse['y'])){
            selectedIndex = i;
        }

        //todo: check if mouse is on node
    }
    dragStart = {
        x: event.clientX - canvasPosition.left,
        y: event.clientY - canvasPosition.top
    };
    drag = true;
}

function mouseMove(event)
{
    clear();
    draw();
    //mouseUpEvent = false;
    const mouse = calcMouseEvent(event);
    if (drag) {
        dragEnd = {
            x: event.clientX - canvasPosition.left,
            y: event.clientY - canvasPosition.top
        };
        if (selectedIndex != null) {
            var dx = dragEnd.x - dragStart.x;
            var dy = dragEnd.y - dragStart.y;
            nodes[selectedIndex]["x"] += dx;
            nodes[selectedIndex]["y"] += dy;
        }
        dragStart = dragEnd;
    }
}

function mouseUp(event)
{
    clear();
    draw();
    const mouse = calcMouseEvent(event);
    drag = false;
    mouseDown = false;

    selectedIndex = null;
    /*
    // TODO: edge törlése
    for (var i=0; i<edges.length; ++i)
    {
        var edge = edges[i];
        if (event.keyCode === 82) {
            edges.splice(selectedIndex, 1);
            clear();
            draw();
        }
    }
    */
    for (var i = 0; i < nodes.length; ++i) {
        var node = nodes[i];

        if (node.isMouseOnNode(mouse['x'], mouse['y']))
        {
            selectedIndex = i;
            //console.log(event);
            if (mouseUpEvent === true){
                document.getElementById("addTextRect").style.display = "";
                document.getElementById("addTextCirc").style.display = "none";
                context.fillStyle = "orange";
                context.font = "20px Arial";
                context.textBaseline = 'middle';
                context.textAlign = "center";
                node.printNodeID(context, canvas.width-100, 30);
                // eredeti: context.fillText("Node's ID: "+node["id"], canvas.width-100, 30);

            }
            //EREDETI:
            /*if (event.shiftKey === true) {
                drawEdge["from"] = node["id"];
                console.log(node["id"]);
            }
            if (event.altKey === true) {
                drawEdge["to"] = node["id"];
                console.log(node["id"]);
                addEdge(drawEdge["from"], drawEdge["to"], id);
                clear();
                draw();
            }*/
            //ÉS A MŰKÖDŐ:
            if (event.shiftKey === true) {
                //drawEdge["from"] = node["id"];
                drawEdge['from'] = nodes[selectedIndex];
            }
            if (event.altKey === true) {
                drawEdge["to"] = nodes[selectedIndex];//node["id"];
                addEdge(drawEdge["from"], drawEdge["to"]);
                clear();
                draw();
            }
            if (event.ctrlKey === true) {
                for (var j = 0; j < edges.length; ++j) {
                    if(nodes[selectedIndex] === edges[j].to || nodes[selectedIndex] === edges[j].from)
                    {
                        edges.splice(j, 1);
                        // Probléma 1: ez csak 1 vonalat töröl (többet kell, ha a node-hoz több van kötve)
                        // Probléma 2: annyi vonalat kell törölni, ahány a node-hoz van kötve
                    }
                }
                nodes.splice(selectedIndex, 1);
                clear();
                draw();
            }
        }
    }
    mouseUpEvent = true;
}

function mouseWheel(event)
{
    const mouse = calcMouseEvent(event);
    const delta = event.wheelDelta;
    event.preventDefault();
}

function keyUp(event)
{

}

function keyDown(event)
{
    var letter = event.key;
    if (event.keyCode === 27) { //ESC
        closeText();
        //popup-ok bezárása
    }
}
