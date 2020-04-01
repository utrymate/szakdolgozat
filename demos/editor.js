function getNode(id){
    //nodes.find(node => node.id === id);
    let node = nodes.filter((node) =>  node.id === parseInt(id));
    return node[0];
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
        nodes.push( {"id": 9999, "type": "end", "x": 1220, "y": 660, "text": "", "radius": 40, "width": 0, "height": 0});
        // INFO: Ha nem írom bele, hogy "text": "", akkor a rajta lévő szöveg "undefined" lesz
        draw();
    }
}

function addEdge(from, to) {
    edges.push({"from": from, "to": to, "type": "dashed"});
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
        if(node["type"] == "rectangle")
        {
            if (mouse["x"] >= node["x"]
                && mouse["x"] <= node["x"] + node["width"]
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