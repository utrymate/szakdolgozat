var canvas = null;
var canvasPosition = null;
var context = null;
var drag = false;
var dragStart;
var dragEnd;
let mouseUpEvent = false;

var nodes = [];
var edges = [];

var selectedIndex = null;

function getNode(id){
    //nodes.find(node => node.id === id);
    let node = nodes.filter((node) =>  node.id === parseInt(id));
    return node[0];
}

function draw()
{
    for (var i = 0; i < nodes.length; ++i) {
        var node = nodes[i];
        if (node["type"] == "rectangle")
        {
            context.beginPath();
            //context.lineWidth = 6;
            context.fillStyle = "yellow";
            context.fillRect(node["x"], node["y"], node["width"], node["height"]); //ekkorát rajzol ki: 100 x 50
            context.stroke();
            context.fillStyle = "blue";
            context.globalCompositeOperation='source-over';
            context.fillText(node["text"],node["x"]+node["width"]/2, node["y"]+node["height"]/2);
        }

        if(node["type"] == "circle")
        {
            context.beginPath();
            context.arc(node["x"], node["y"], node["radius"], 0, 2 * Math.PI);
            context.fillStyle = "red";
            context.fill();
            context.fillStyle = "blue";
            context.globalCompositeOperation='source-over';
            context.fillText(node["text"],node["x"], node["y"]);
        }

        if(node["type"] == "start")
        {
            context.beginPath();
            context.lineWidth = 3;
            context.setLineDash([]);
            context.arc(node["x"], node["y"], node["radius"], 0, 2 * Math.PI);
            context.stroke();
            // context.fillStyle = "grey";
            // context.fill();
            context.fillStyle = "black";
            context.font = "20px Arial";
            context.textBaseline = 'middle';
            context.textAlign = "center";
            context.fillText(node["text"], node["x"], node["y"]);
        }

        if(node["type"] == "end")
        {
            context.beginPath();
            context.lineWidth = 6;
            context.setLineDash([]);
            context.arc(node["x"], node["y"], node["radius"], 0, 2 * Math.PI);
            context.stroke();
            context.fillStyle = "black";
            context.font = "20px Arial";
            context.textBaseline = 'middle';
            context.textAlign = "center";
            context.fillText(node["text"],node["x"], node["y"]);
        }
    }

    for (var i = 0; i < edges.length; ++i) {
        // TODO: a vonalak elég random mozognak, valami szabálykövetőbb mozgás kéne
        // TODO: a vonalak ne látszódjanak a node-okon
        var edge = edges[i];
        var sourceNodeIndex = edges[i]["from"];
        var targetNodeIndex = edges[i]["to"];
        // console.log(sourceNodeIndex);
        // console.log(targetNodeIndex);
        var sourceNode = getNode(sourceNodeIndex);//nodes[sourceNodeIndex];
        var targetNode = getNode(targetNodeIndex);//nodes[targetNodeIndex];
        // context.moveTo(edges[i]["moveto"]["x"]+50, edges[i]["moveto"]["y"]+50);
        // context.lineTo(edges[i]["lineto"]["x"]+50, edges[i]["lineto"]["y"]);
        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle = "black";
        context.globalCompositeOperation='destination-over'; //BAJUSZ
        //try {
        var dx = targetNode["x"] - sourceNode["x"];
        var dy = targetNode["y"] - sourceNode["y"];
        // INFO: x+50: node bal felső sarkától 50-nel jobbra. Ez van kicserélve sN["width"]/2 -re, ezért nem működik körnél
        context.moveTo(sourceNode["x"] + sourceNode["width"]/2, sourceNode["y"] + sourceNode["height"]/2);
        if(edge["type"] == "dashed")
        {
            context.setLineDash([6, 7]);
        }
        if(edge["type"] == "continuous")
        {
            context.setLineDash([]);
        }
        context.bezierCurveTo(sourceNode["x"] + dx * 0.33 + 50, sourceNode["y"] + sourceNode["width"]/2, sourceNode["x"] + dx * 0.67 +50, targetNode["y"], targetNode["x"] + targetNode["width"]/2, targetNode["y"] + targetNode["height"]/2);
        context.stroke();
        /* //ez a nyíl lesz majd valahogy
        context.beginPath();
        context.setLineDash([]);
        context.fillStyle = "black";
        context.moveTo(targetNode["x"] + 50, targetNode["y"]);
        context.lineTo(targetNode["x"] + 65, targetNode["y"] -15);
        context.moveTo(targetNode["x"] + 50, targetNode["y"]);
        context.lineTo(targetNode["x"] + 35, targetNode["y"] -15);
        context.stroke();
        //////////////////////
        // if TÉGLALAP
        //      if (mouse["x"] >= node["x"]
        //        && mouse["x"] <= node["x"] + node["width"] //+width hogy az egész node-ot húzni tudd
        //        && mouse["y"] >= node["y"]
        //        && mouse["y"] <= node["y"] + node["height"])
        // if KÖR
        // let shortestDistance = Math.abs(Math.sqrt(Math.pow(mouse["x"]-node["x"], 2) + Math.pow(mouse["y"]-node["y"], 2)));
        //////////////////////
        */
        /*} catch (err) {
            alert("Rossz ID. Innen már nincs visszaút");
        }*/

    }
}

let drawEdge = { from:"", to: ""};

function clear()
{
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
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
        if(node["type"] == "rectangle")
        {
            if (mouse["x"] >= node["x"]
                && mouse["x"] <= node["x"] + node["width"] //+width hogy az egész node-ot húzni tudd
                && mouse["y"] >= node["y"]
                && mouse["y"] <= node["y"] + node["height"])
            {
                selectedIndex = i;
            }
        }

        // TODO: kör mozgatási terület kijelölés - megírni rendesen ezt is
        if (node["type"] == "circle" || "start" || "end")
        {

            let shortestDistance = Math.abs(Math.sqrt(Math.pow(mouse["x"]-node["x"], 2) + Math.pow(mouse["y"]-node["y"], 2)));
            if (shortestDistance <= node["radius"])
            {
                selectedIndex = i;
            }
        }
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
        }
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

        //téglalapra kattintás - nincs baj, mert m x n méretű, nem úgy, mint a kör
        if(node["type"] == "rectangle")
        {
            if (mouse["x"] >= node["x"]
                && mouse["x"] <= node["x"] + node["width"] //+width hogy az egész node-ot húzni tudd
                && mouse["y"] >= node["y"]
                && mouse["y"] <= node["y"] + node["height"])
            {
                selectedIndex = i;
                console.log(event);
                if (mouseUpEvent === true){
                    document.getElementById("addTextRect").style.display = "";
                    document.getElementById("addTextCirc").style.display = "none";
                    context.fillStyle = "orange";
                    context.font = "20px Arial";
                    context.textBaseline = 'middle';
                    context.textAlign = "center";
                    context.fillText("Node's ID: "+node["id"], canvas.width-100, 30);
                }
                if (event.shiftKey === true) {
                    drawEdge["from"] = node["id"];
                    console.log(node["id"]);
                }
                if (event.altKey === true) {
                    drawEdge["to"] = node["id"];
                    console.log(node["id"]);
                    addEdge(drawEdge["from"], drawEdge["to"]);
                    clear();
                    draw();
                }
                //console.log();
                if (event.ctrlKey === true) {
                    nodes.splice(selectedIndex, 1);
                    clear();
                    draw();
                }
            }
        }

        if(node["type"] == "circle" || "start" || "end")
        {
            let shortestDistance = Math.abs(Math.sqrt(Math.pow(mouse["x"]-node["x"], 2) + Math.pow(mouse["y"]-node["y"], 2)));
            if (shortestDistance <= node["radius"])
            {
                selectedIndex = i;
                console.log(event);
                if (mouseUpEvent === true){
                    document.getElementById("addTextCirc").style.display = "";
                    document.getElementById("addTextRect").style.display = "none";
                    context.fillStyle = "orange";
                    context.font = "20px Arial";
                    context.textBaseline = 'middle';
                    context.textAlign = "center";
                    if(node["type"] == "start")
                    {
                        context.fillText("Start node's ID: "+node["id"], canvas.width-100, 30);
                    }
                    else if(node["type"] == "end")
                    {
                        context.fillText("End node's ID: "+node["id"], canvas.width-100, 30);
                    }
                    else
                    {
                        context.fillText("Node's ID: "+node["id"], canvas.width-100, 30);
                    }
                }
                if (event.shiftKey === true) {
                    drawEdge["from"] = node["id"];
                    console.log(node["id"])
                }
                if (event.altKey === true) {
                    drawEdge["to"] = node["id"];
                    console.log(node["id"]);
                    addEdge(drawEdge["from"], drawEdge["to"]);
                    clear();
                    draw();
                }
                if (event.ctrlKey === true) {
                    nodes.splice(selectedIndex, 1);
                    clear();
                    draw();
                }
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

function initialize()
{
    canvas = document.getElementById("my-canvas");
    canvasPosition = canvas.getBoundingClientRect();
    window.addEventListener("keydown", keyDown, false);
    window.addEventListener("keyup", keyUp, false);
    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mousemove", mouseMove, false);
    canvas.addEventListener("mouseup", mouseUp, false);
    canvas.addEventListener("mousewheel", mouseWheel, false);
    context = canvas.getContext("2d");
}

function openEdge() {
    document.getElementById("addEdge").style.display = "block";
}

function closeEdge() {
    document.getElementById("addEdge").style.display = "none";
}

function closeText() {
    document.getElementById("addTextRect").style.display = "none";
    document.getElementById("addTextCirc").style.display = "none";
}

function addTextToNode(value) {
    context.globalCompositeOperation='source-over';
    nodes[selectedIndex]["text"] = value;
    context.font = "20px Arial";
    context.textBaseline = 'middle';
    context.textAlign = "center";
    context.fillText(value, nodes[selectedIndex]["x"]+nodes[selectedIndex]["width"]/2, nodes[selectedIndex]["y"]+nodes[selectedIndex]["height"]/2);       
    if(nodes[selectedIndex]["type"] == "rectangle")
    {
        if(15 > nodes[selectedIndex]["width"] / value.length)
        {
            nodes[selectedIndex]["width"] += 14;
        }
    }
    /* // TODO: height növelése + sor törés egy bizonyos hossz után
    if(nodes[selectedIndex]["width"] > 150)
    {
        nodes[selectedIndex]["height"] = 80;
    }*/
    if(nodes[selectedIndex]["type"] == "circle" || "start" || "end")
    {
        if(8 > nodes[selectedIndex]["radius"] / value.length)
        {
            nodes[selectedIndex]["radius"] += 7;
        }
    }
    clear();
    draw(); 
}

function addId() {
    let max = 0;
    if(nodes.length !==0){
        nodes.forEach(e => {
            if(e.id > max && e.id !== 9999) { //Így nem az End node lesz a legnagyobb ID-jú
                max = e.id;
            }
        });
    }
    return max;
}

function addRectangle() {
    var newid = addId();
    nodes.push( {"id": newid+1, "type": "rectangle", "x": 100, "y": 100, "text": "", "width": 100, "height": 50})
    draw();
    // INFO: az itt megadott height, width értékeket nézi a text hozzáadós a node["width"]
}

//addCircles
function addCircle() {
    var newid = addId();
    nodes.push( {"id": newid+1, "type": "circle", "x": 200, "y": 100, "text": "", "radius": 40, "width": 0, "height": 0})
    draw();
}

//addStart
function addStart() {
    let csakegy = true;
    nodes.forEach((value => {
        if (value["type"] === "start"){
            console.log("nem fut le");
            csakegy = false;
        }
    }));
    if (csakegy){
        nodes.push( {"id": 0, "type": "start", "x": 60, "y": 60, "text": "", "radius": 40, "width": 0, "height": 0});
        draw();
        console.log("csak 1 lehet");
    }
}

function addEnd() {
    let csakegy = true;
    nodes.forEach((value => {
        if (value["type"] === "end"){
            csakegy = false;
        }
    }));
    if (csakegy){
        nodes.push( {"id": 9999, "type": "end", "x": 740, "y": 540, "text": "", "radius": 40, "width": 0, "height": 0});
        // INFO: Ha nem írom bele, hogy "text": "", akkor a rajta lévő szöveg "undefined" lesz
        draw();
    }
}

function addEdge(from, to) {
    // TODO: Nem létező értéket ne lehessen hozzáadni
    edges.push({"from": from, "to": to, "type": "dashed"});
    // edge1 = document.getElementById("edge1").value = '';
    // edge2 = document.getElementById("edge2").value = '';
}

function folytonos(from, to) {
    let edge1 = document.getElementById("edge1").value;
    let edge2 = document.getElementById("edge2").value;
    edges.push({"from": edge1, "to": edge2, "type": "continuous"});
    edge1 = document.getElementById("edge1").value = '';
    edge2 = document.getElementById("edge2").value = '';
}

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