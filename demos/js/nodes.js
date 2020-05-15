// function isInsideBox(x, y, x1, x2, y1, y2) {
//     var a = getValueA(x1, x2, y1, y2);
//     var b = getValueB(x1, y1, a);
//     var auxY = (a * x) + b;
//     if (auxY <= y) {
//         return true;
//     } else {
//         return false;
//     }
// }
//
// function getValueA(x1, x2, y1, y2) {
//     return ((y1 - y2) / (x1 - x2));
// }
//
// function getValueB(x1, y1, a) {
//     return (y1 - (a * x1));
// }


class Node {
    constructor(x, y, id){
        this.x = x;
        this.y = y;
        this.id = id;
    }
    printNodeID(context, x, y) {
        context.fillText("Node's ID: "+this.id, x, y);
    }

}

class Diamond extends Node{
    constructor(x, y, id, height, width, text, color) {
        super(x, y, id);
        this.height = height;
        this.width = width;
        this.text = text;
        this.color = color;
    }

    ConnectFromPoints() {
        return {
            x: this.x+(this.width/2),
            y: this.y+this.height*1.2
        }
    }
    ConnectToPoints() {

        return {
            x: this.x+this.width/2,
            y: this.y-this.height*0.2
        }
    }

    draw(context, selected) {
        if (this.width < 50){
            this.width = 50;
        }
        if (this.height < 50){
            this.height = 50;
        }
        context.save();
        context.beginPath();
        context.fillStyle = this.color;
        //context.moveTo(this.x, this.y);
        // // move the rotation point to the center of the rect
        //
        //
        // // top left edge
        // context.lineTo(this.x - this.width / 2, this.y + this.height / 2);
        //
        // // bottom left edge
        // context.lineTo(this.x, this.y + this.height);
        //
        // // bottom right edge
        // context.lineTo(this.x + this.width / 2, this.y + this.height / 2);
        //innen rectangle
        context.fillStyle = this.color;



        context.translate( this.x+this.width/2, this.y+this.height/2 );
        // rotate the rect
        context.rotate(45*Math.PI/180);
        context.rect( -this.width/2, -this.height/2, this.width,this.height);

        context.fill();
        context.restore();

        context.fillStyle = "blue";
        context.fillText(this.text,this.x+this.width/2, this.y+this.height/2);
        if (selected){
            context.setLineDash([10, 10]);
            //context.stroke();
            context.strokeStyle = 'blue';
            context.lineWidth = 3;
            context.strokeRect(this.x-this.width/4, this.y-this.height/4, this.width*1.5,this.height*1.5);
            context.strokeStyle = 'black';
        }
        context.setLineDash([]);
        context.closePath();
        context.fillStyle = "black";
    }

    //TODO: ezt megírni normálisan, hogy csak a rombuszra kattintva lehessen azt mozgatni
    isMouseOnNode(x, y) {

        // let a = getValueA(this.x, this.x+this.width, this.y, this.y-this.height);
        // let b = getValueB(this.x, this.y, a);
        // let auxY = (a * x) + b;
        // return auxY <= y;
        return x >= this.x-this.width/4
            && x <= this.x +this.width*1.5
            && y >= this.y-this.height/4
            && y <= this.y + this.height*1.5;
    }

    widen(length){
        if(15 > this.width / length)
        {
            this.width += 14;
            this.height += 14;
        }
    }

    //width-re jól méretezi át, height-ra bugol
    resize(){
        this["height"] = parseInt(document.getElementById("size").value);
        this["width"] = parseInt(document.getElementById("size").value);
        document.getElementById("size").value = '';
    }

    showSelectedElement(){

        //todo: itt kapjon dash-ed valamit
        // context.setLineDash([6]); // ezzel kap dash-t

        let inputContainer = document.getElementById("resize-nodes");
        inputContainer.innerHTML = '';
        inputContainer.innerHTML = `
        <div>
        <label for="textInput" >Type text here: </label>
            <input type="text" onfocus="" name="textInput" value="${this.text}" onkeyup="editor.addTextToNode(this.value)">
        </div>
        <div>
            <label for="textInput" >Type size here: </label>
            <input type="number" value="${this["width"]}" name="size" id="size">
        </div>
        <div>
            <button  class="button" onclick="editor.resizeNode()">Resize</button>
        </div>`
    }
}

class Rectangle extends Node{
    constructor(x, y, id, height, width, text, color) {
        super(x, y, id);
        this.height = height;
        this.width = width;
        this.text = text;
        this.color = color;
    }

    ConnectFromPoints() {
        return {
            x: this.x+this.width/2,
            y: this.y+this.height
        }
    }
    ConnectToPoints() {
        return {
            x: this.x+this.width/2,
            y: this.y
        }
    }

    draw(context, selected) {
        if (this.width < 50){
            this.width = 50;
        }
        if (this.height < 50){
            this.height = 50;
        }
        context.beginPath();
        //context.fillStyle = "yellow";
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);

        context.stroke();
        context.fillStyle = "blue";
        //context.globalCompositeOperation='source-over';
        context.fillText(this.text,this.x+this.width/2, this.y+this.height/2);
        if (selected){
            context.setLineDash([10, 10]);
            //context.stroke();

            context.strokeStyle = 'blue';
            context.lineWidth = 3;
            context.strokeRect(this.x, this.y, this.width,this.height);
            context.strokeStyle = 'black';
        }
        context.closePath();
        context.fillStyle = "black";
        context.setLineDash([]);
    }
    // parameters: mouse[x] & mouse[y]
    // mouse["x"] -> x ; node["x"] -> this.x
    isMouseOnNode(x, y) {

        return x >= this.x
            && x <= this.x +this.width //+width hogy az egész node-ot húzni tudd
            && y >= this.y
            && y <= this.y + this.height;
    }

    widen(length){
        if(15 > (this.width/length))
        {
            this.width = parseInt(this.width) + 14;
        }
    }

    resize(){
        this["width"] = parseInt(document.getElementById("width").value);
        this["height"] =  parseInt(document.getElementById("height").value);
        document.getElementById("width").value = '';
        document.getElementById("height").value = '';
    }

    showSelectedElement(){
        //todo: itt kapjon dash-ed valamit
        // context.setLineDash([6]); // ezzel kap dash-t
        let inputContainer = document.getElementById("resize-nodes");
        inputContainer.innerHTML = '';
        inputContainer.innerHTML = `
        <div>
            <label for="textInput" >Type text here: </label>
            <input type="text" onfocus=""  value="${this.text}" name="textInput"  onkeyup="editor.addTextToNode(this.value)">
        </div>
        <div>
            <label for="textInput" >Type width here: </label>
            <input type="number" name="width" value="${this.width}" id="width">
        </div>
        <div>
            <label for="textInput" >Type height here: </label>
            <input type="number" name="height"  value="${this.height}" id="height">
        </div>
        <div>
            <button class="button" onclick="editor.resizeNode()">Resize</button>
        </div>`
    }
}

class Circle extends Node{
    constructor(x, y, id, radius, text, color) {
        super(x, y, id);
        this.radius = radius;
        this.text = text;
        this.color = color;
    }

    ConnectFromPoints() {
        return {
            x: this.x,
            y: this.y
        }
    }
    ConnectToPoints() {
        return {
            x: this.x,
            y: this.y
        }
    }

    draw(context, selected) {
        if (this.radius < 20){
            this.radius = 20;
        }

        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.fillStyle = "blue";
        //context.globalCompositeOperation='source-over';
        context.fillText(this.text, this.x, this.y);
        if (selected){
            context.setLineDash([10, 10]);
            context.strokeStyle = 'blue';
            context.lineWidth = 3;
            context.stroke();
            context.strokeStyle = 'black';
        }
        context.closePath();
        context.fillStyle = "black";
        context.setLineDash([]);
    }

    isMouseOnNode(x, y) {
        let shortestDistance = Math.abs(Math.sqrt(Math.pow(x-this.x, 2) + Math.pow(y-this.y, 2)));
        return shortestDistance <= this.radius
    }

    widen(length){
        if(8 > this.radius / length)
        {
            this.radius += 7;
        }
    }

    resize(){
        this["radius"] = parseInt(document.getElementById("radius").value);
        document.getElementById("radius").value = '';
    }

    showSelectedElement(){
        //todo: itt kapjon dash-ed valamit
        // context.setLineDash([6]); // ezzel kap dash-t
        let inputContainer = document.getElementById("resize-nodes");
        inputContainer.innerHTML = '';
        inputContainer.innerHTML = `
        <div>
        <label for="textInput" >Type text here: </label>
            <input type="text" value="${this.text}" name="textInput"  onkeyup="editor.addTextToNode(this.value)">
        </div>
        <div>
            <label for="textInput" >Type radius here: </label>
            <input type="number" name="radius"  value="${this.radius}" id="radius">
        </div>
        <div>
            <button class="button" onclick="editor.resizeNode()">Resize</button>
        </div>`
    }
}

class Start extends Circle{
    constructor(x, y, id, radius, text) {
        super(x, y, id, radius, text);
    }

    draw(context, selected) {
        context.beginPath();
        context.setLineDash([]);
        context.lineWidth = 3;
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = "black";
        //context.globalCompositeOperation='source-over';
        context.fillText(this.text, this.x, this.y);
        if (selected){
            context.setLineDash([10, 10]);
            context.strokeStyle = 'blue';
            context.lineWidth = 3;
            context.stroke();
            context.strokeStyle = 'black';
        }
        context.lineWidth = 3;
        context.setLineDash([]);
        context.strokeStyle = 'black';
        context.closePath()
    }
    printNodeID(context, x, y) {
        context.fillText("Start node's ID: "+this.id, x, y);
    }


}

class End extends Circle{
    constructor(x, y, id, radius, text) {
        super(x, y, id, radius, text);
    }

    draw(context, selected) {
        context.beginPath();
        context.setLineDash([]);
        context.lineWidth = 6;
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = "black";
        //context.globalCompositeOperation='source-over';
        context.fillText(this.text, this.x, this.y);


        context.stroke();
        if (selected){
            context.setLineDash([10, 10]);
            context.strokeStyle = 'blue';
            context.lineWidth = 3;
            context.stroke();
            context.strokeStyle = 'black';
        }
        context.setLineDash([]);
        context.lineWidth = 3;
        context.strokeStyle = 'black';
        context.closePath();
    }

    printNodeID(context, x, y) {
        context.fillText("End node's ID: "+this.id, x, y);
    }

}

function drawNodes(context, nodes, selectedIndex) {
    let takaras = false;
    let selected = false;
    for (let i = 0; i < nodes.length; ++i) {
        selected = i === selectedIndex;
        let node = nodes[i];
        for (let j = 0; j < nodes.length; ++j){
            if (i !== j){
                let nodeOther = nodes[j];
                if (node.isMouseOnNode(nodeOther.x, nodeOther.y) || nodeOther.isMouseOnNode(node.x, node.y)){
                    takaras = true;
                }
            }
        }
        node.draw(context, selected);
    }
    if (takaras){
        editor.graph.canvas.style.backgroundColor = "red";
    } else {
        editor.graph.canvas.style.backgroundColor = "#808080";
    }
}


        // if (node["type"] == "rectangle")
        // {
        //     context.beginPath();
        //     context.fillStyle = "yellow";
        //     context.fillRect(node["x"], node["y"], node["width"], node["height"]);
        //     context.stroke();
        //     context.fillStyle = "blue";
        //     context.globalCompositeOperation='source-over';
        //     context.fillText(node["text"],node["x"]+node["width"]/2, node["y"]+node["height"]/2);
        // }

        // if(node["type"] == "circle")
        // {
        //     context.beginPath();
        //     context.arc(node["x"], node["y"], node["radius"], 0, 2 * Math.PI);
        //     context.fillStyle = "red";
        //     context.fill();
        //     context.fillStyle = "blue";
        //     context.globalCompositeOperation='source-over';
        //     context.fillText(node["text"],node["x"], node["y"]);
        // }

        // if(node["type"] == "start")
        // {
        //     context.beginPath();
        //     context.lineWidth = 3;
        //     context.setLineDash([]);
        //     context.arc(node["x"], node["y"], node["radius"], 0, 2 * Math.PI);
        //     context.stroke();
        //     context.fillStyle = "black";
        //     context.globalCompositeOperation='source-over';
        //     context.fillText(node["text"], node["x"], node["y"]);
        // }

        // if(node["type"] == "end")
        // {
        //     context.beginPath();
        //     context.lineWidth = 6;
        //     context.setLineDash([]);
        //     context.arc(node["x"], node["y"], node["radius"], 0, 2 * Math.PI);
        //     context.stroke();
        //     context.fillStyle = "black";
        //     context.globalCompositeOperation='source-over';
        //     context.fillText(node["text"], node["x"], node["y"]);
        // }
