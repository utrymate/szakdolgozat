class Editor {
    constructor() {
        this.fullosRectGrd = {};
        this.fullosCircleGrd =  {};
        this.fullosDiaGrd = {};
        this.fullosEdgeGrd = {};
        this.graph =  new Graph();
    }

    mouseUp(event, context)
    {
        this.graph.clear();
        this.graph.draw();
        const mouse = this.calcMouseEvent(event);
        this.graph.drag = false;
        mouseDown = false;
        selectedIndex = null;
        let takaras = false;
        for (let i = 0; i < this.graph.nodes.length; ++i) {
            let node = this.graph.nodes[i];
            for (let j = 0; j < this.graph.nodes.length; ++j){
                if (i !== j){
                    let nodeOther = this.graph.nodes[j];
                    if (node.isMouseOnNode(nodeOther.x, nodeOther.y) || nodeOther.isMouseOnNode(node.x, node.y)){
                        takaras = true;
                    }
                }
            }

            if (node.isMouseOnNode(mouse['x'], mouse['y']))
            {
                this.graph.selectedIndex = i;
                selectedIndex = i;
                if (this.graph.mouseUpEvent === true){
                    this.graph.nodes[this.graph.selectedIndex].showSelectedElement();
                    this.graph.context.fillStyle = "orange";
                    this.graph.context.font = "20px Arial";
                    this.graph.context.textBaseline = 'middle';
                    this.graph.context.textAlign = "center";
                    node.printNodeID(this.graph.context, 100, 50);
                    this.graph.context.fillStyle = "black";
                }
                if (event.shiftKey === true) {
                    this.graph.drawEdge['from'] = this.graph.nodes[selectedIndex];
                }
                if (event.altKey === true) {
                    this.graph.drawEdge["to"] = this.graph.nodes[selectedIndex];
                    if (event.which === 1 ){
                        //node["id"];
                        this.addEdge(this.graph.drawEdge["from"], this.graph.drawEdge["to"]);
                        this.graph.clear();
                        this.graph.draw();
                    } else if (event.which === 3){
                        for (let j = 0; j < this.graph.edges.length; ++j) {
                            if(this.graph.nodes[selectedIndex] === this.graph.edges[j].to)
                            {
                                this.graph.edges.splice(j, 1);
                                j = j-1;
                                this.graph.clear();
                                this.graph.draw();
                            }
                        }
                    }

                }
                if (event.ctrlKey === true) {
                    for (let j = 0; j < this.graph.edges.length; ++j) {
                        if(this.graph.nodes[selectedIndex] === this.graph.edges[j].to || this.graph.nodes[selectedIndex] === this.graph.edges[j].from)
                        {
                            this.graph.edges.splice(j, 1);
                            j = j-1;
                        }
                    }
                    this.graph.nodes.splice(selectedIndex, 1);
                    this.graph.clear();
                    this.graph.draw();
                    console.log(event)
                }

            }
        }
        if (takaras){
            this.graph.canvas.style.backgroundColor = "red";
        } else {
            this.graph.canvas.style.backgroundColor = "#808080";
        }
        this.graph.mouseUpEvent = true;
    }

    getNode(id){
        //nodes.find(node => node.id === id);
        let node =  this.graph.nodes.filter((node) =>  node.id === parseInt(id));
        return node[0];
    }

    getEdge(id){
        let edge = this.graph.edges.filter((edge) =>  edge.id === parseInt(id));
        return edge[0];
    }

    addTextToNode(value) {
        this.graph.nodes[this.graph.selectedIndex]["text"] = value; //.text is jó
        let length = parseInt(value.length);
        this.graph.context.font = "20px Arial";
        this.graph.context.textBaseline = 'middle';
        this.graph.context.textAlign = "center";
        this.graph.context.fillText(value, this.graph.nodes[this.graph.selectedIndex]["x"]+this.graph.nodes[this.graph.selectedIndex]["width"]/2, this.graph.nodes[this.graph.selectedIndex]["y"]+this.graph.nodes[this.graph.selectedIndex]["height"]/2);
        this.graph.nodes[this.graph.selectedIndex].widen(length);
        /* // TODO: height növelése + sor törés egy bizonyos hossz után
        if(nodes[selectedIndex]["width"] > 150)
        {
            nodes[selectedIndex]["height"] = 80;
        }*/
        //todo: majd az osszes ilyen clear() es draw() this.graph.clear .. stb lesz
        this.graph.clear();
        this.graph.draw();
        //context.globalCompositeOperation='source-over';
    }

    addNodeId() {
        let max = 0;
        if(this.graph.nodes.length !==0){
            this.graph.nodes.forEach(e => {
                if(e.id > max /*&& e.id !== 9999*/) { //Így nem az End node lesz a legnagyobb ID-jú
                    max = e.id;
                }
            });
        }
        return max;
    }

    addEdgeId() {
        let max = 0;
        if(this.graph.edges.length !==0){
            this.graph.edges.forEach(e => {
                if(e.id > max) {
                    max = e.id;
                }
            });
        }
        return max;
    }

    addRectangle() {
        var newid = this.addNodeId();
        let rectangle = new Rectangle(100, 100, newid+1, 50, 100, "", this.graph.themes[this.graph.selectedtheme].rectangleColor);
        this.graph.nodes.push(rectangle);
        // Fontos a sorrend, ezért ide leírom: x, y, id, height, width, text
        // KÉRDÉS: Típus vajon kell-e ide? Mert az eddigi logika alapján kellett, de most már gondolom nem, mert class
        this.graph.draw();
    }

    addDiamond(){
        var newid = this.addNodeId();
        let diamond = new Diamond(100, 100, newid+1, 100, 100, "", this.graph.themes[this.graph.selectedtheme].diamondColor);
        this.graph.nodes.push(diamond);
        //x, y, id, height, width, text
        this.graph.draw();
    }

    addCircle() {
        var newid = this.addNodeId();
        let circle = new Circle(200, 100, newid+1, 40, "", this.graph.themes[this.graph.selectedtheme].circleColor);
        this.graph.nodes.push(circle);
        // nodes.push( {"id": newid+1, "type": "circle", "x": 200, "y": 100, "text": "", "radius": 40, "width": 0, "height": 0})
        this.graph.draw();
    }

    addStart() {
        var newid = this.addNodeId();
        let start = new Start(60, 60, newid+1, 40, "");
        this.graph.nodes.push(start);
        // SORREND: x, y, id, radius, text
        //nodes.push( {"id": 0, "type": "start", "x": 60, "y": 60, "text": "", "radius": 40, "width": 0, "height": 0});
        this.graph.draw();

    }
    addEnd() {
        var newid = this.addNodeId();
        let end = new End(1220, 660, newid+1, 40, "");
        this.graph.nodes.push(end);
        // SORREND: x, y, id, radius, text
        //nodes.push( {"id": 9999, "type": "end", "x": 1220, "y": 660, "text": "", "radius": 40, "width": 0, "height": 0});
        this.graph.draw();
    }

    addEdge(from, to) {
        //edges.push({"from": from, "to": to, "type": "dashed"});
        var newid = this.addEdgeId();
        let edge = new Edge(from, to, newid+1);
        this.graph.edges.push(edge);
        // edge1 = document.getElementById("edge1").value = '';
        // edge2 = document.getElementById("edge2").value = '';
    }

    resizeRectangle() {
        this.graph.nodes[this.graph.selectedIndex]["width"] = parseInt(document.getElementById("width").value);
        this.graph.nodes[this.graph.selectedIndex]["height"] = parseInt(document.getElementById("height").value);
        document.getElementById("width").value = '';
        document.getElementById("height").value = '';
        this.graph.clear();
        this.graph.draw();
    }

    resizeCircle() {
        this.graph.nodes[this.graph.selectedIndex]["radius"] = parseInt(document.getElementById("radius").value);
        document.getElementById("radius").value = '';
        this.graph.clear();
        this.graph.draw();
    }

    calcMouseEvent(event)
    {
        this.graph.clear();
        this.graph.draw();
        return {
            "x": event.clientX - this.graph.canvasPosition.left,
            "y": event.clientY - this.graph.canvasPosition.top,
            "button": event.button
        };


    }

    mouseDown(event)
    {
        this.graph.clear();
        this.graph.draw();
        const mouse = this.calcMouseEvent(event);
        this.graph.selectedIndex = null;
        for (let i = 0; i < this.graph.nodes.length; ++i) {
            let node = this.graph.nodes[i];
            if (node.isMouseOnNode(mouse['x'], mouse['y'])){
                this.graph.selectedIndex = i;
            }
        }
        this.graph.dragStart = {
            x: event.clientX - this.graph.canvasPosition.left,
            y: event.clientY - this.graph.canvasPosition.top
        };
        this.graph.drag = true;
    }

    mouseMove(event)
    {
        //console.log(this.graph);
        this.graph.clear();
        this.graph.draw();

        //mouseUpEvent = false;
        let mouse = this.calcMouseEvent(event);
        if (this.graph.drag) {
            this.graph.dragEnd = {
                x: event.clientX - this.graph.canvasPosition.left,
                y: event.clientY - this.graph.canvasPosition.top
            };
            if (this.graph.selectedIndex != null) {
                var dx = this.graph.dragEnd.x - this.graph.dragStart.x;
                var dy = this.graph.dragEnd.y - this.graph.dragStart.y;
                if ((this.graph.nodes[this.graph.selectedIndex]["x"]+dx>1 && this.graph.nodes[this.graph.selectedIndex]["x"]+dx < this.graph.canvas.width) &&
                    ( this.graph.nodes[this.graph.selectedIndex]["y"]+dy > 1 &&  this.graph.nodes[this.graph.selectedIndex]["y"]+dy < this.graph.canvas.height )) {
                    this.graph.nodes[this.graph.selectedIndex]["x"] += dx;
                    this.graph.nodes[this.graph.selectedIndex]["y"] += dy;

                }
            }
            this.graph.dragStart = this.graph.dragEnd;
        }
    }




    mouseWheel(event) {
        const mouse = this.calcMouseEvent(event);
        const delta = event.wheelDelta;
        event.preventDefault();
    }

    keyUp(event) {

    }

    keyDown(event) {
        var letter = event.key;
        if (event.keyCode === 27) { //ESC
            this.closeText();
            //popup-ok bezárása
        }
    }

    // resize(){
    //     let oldWidth = this.graph.canvas.width;
    //     let oldHeight = this.graph.canvas.height;
    //     let newWidth = window.innerWidth * 0.6;  //grid-be 2:3 aranyba foglal helyet a toolbox es canvas
    //     let newHeight = newWidth * 9/16; //megtartja a 16:9-es keparanyt
    //     this.graph.canvas.height = newHeight;
    //     this.graph.canvas.width = newWidth;
    //     this.graph.context.scale(oldWidth/newWidth, oldHeight/newHeight);
    //     console.log('mukodik');
    //     this.graph.clear();
    //     this.graph.draw();
    //     this.graph.canvasPosition = this.graph.canvas.getBoundingClientRect();
    // }

    resize() {
        this.graph.canvas.width = window.innerWidth;
        this.graph.canvas.height = window.innerHeight;
        let oldWidth = this.graph.canvas.width;
        let oldHeight = this.graph.canvas.height;
        // let newWidth = window.innerWidth * 0.6;  //grid-be 2:3 aranyba foglal helyet a toolbox es canvas
        // let newHeight = newWidth * 9/16; //megtartja a 16:9-es keparanyt
        // this.graph.canvas.height = newHeight;
        // this.graph.canvas.width = newWidth;

        this.graph.clear();
        this.graph.draw();

        this.graph.canvasPosition = this.graph.canvas.getBoundingClientRect();
        let newWidth = this.graph.canvasPosition.width;  //grid-be 2:3 aranyba foglal helyet a toolbox es canvas
        let newHeight = this.graph.canvasPosition.height; //megtartja a 16:9-es keparanyt
        this.graph.canvas.height = newHeight;
        this.graph.canvas.width = newWidth;
        this.graph.context.translate(oldWidth/newWidth, oldHeight/newHeight);
        this.graph.context.scale(oldWidth/newWidth, oldHeight/newHeight);
        this.graph.context.textAlign = "center";
        this.graph.context.textBaseline = 'middle';
        this.graph.context.font = "20px Arial";
        this.graph.clear();
        this.graph.draw();
    }


    resizeNode(){
        this.graph.nodes[this.graph.selectedIndex].resize();
        this.graph.clear();
        this.graph.draw();
    }

    changeTheme(theme){
        this.graph.selectedtheme = theme;
    }

}
//****************************************************************************** ezalatt a regi
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
    this.graph.drag = false;
    //todo: ez nemtudom mit csinal. szerintem dead code: mouseDown = false; mouseUp ugyanez

    this.graph.selectedIndex = null;
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
    for (var i = 0; i < this.graph.nodes.length; ++i) {
        var node = this.graph.nodes[i];

        if (node.isMouseOnNode(mouse['x'], mouse['y']))
        {
            selectedIndex = i;
            //console.log(event);
            if (mouseUpEvent === true){
                document.getElementById("addTextRect").style.display = "";
                document.getElementById("addTextCirc").style.display = "none";
                this.context.fillStyle = "orange";
                this.context.font = "20px Arial";
                this.context.textBaseline = 'middle';
                this.context.textAlign = "center";
                node.printNodeID(this.context, this.graph.canvas.width-100, 30);
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
                drawEdge['from'] = nodes[this.graph.selectedIndex];
            }
            if (event.altKey === true) {
                drawEdge["to"] = nodes[this.graph.selectedIndex];//node["id"];
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
