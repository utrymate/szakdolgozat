class Node {
    constructor(x, y, id, text, color){
        this.x = x;
        this.y = y;
        this.id = id;
        this.text = text;
        this.color = color;
    }
    
    printNodeID(context, x, y) {
        context.fillText("Node's ID: "+this.id, x, y);
    }
}

class Diamond extends Node{
    constructor(x, y, id, height, width, text, color) {
        super(x, y, id, text, color);
        this.height = height;
        this.width = width;
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

        context.translate( this.x+this.width/2, this.y+this.height/2 );
        context.rotate(45*Math.PI/180);
        context.rect( -this.width/2, -this.height/2, this.width,this.height);
        context.restore();
        context.fillStyle = this.color;
        context.fill();

        context.fillStyle = "blue";
        context.fillText(this.text,this.x+this.width/2, this.y+this.height/2);
        if (selected){
            context.setLineDash([10, 10]);
            context.strokeStyle = 'blue';
            context.lineWidth = 3;
            context.strokeRect(this.x-this.width/4, this.y-this.height/4, this.width*1.5,this.height*1.5);
            context.strokeStyle = 'black';
        }
        context.setLineDash([]);
        context.closePath();
        context.fillStyle = "black";
    }

    isMouseOnNode(x, y) {

        return x >= this.x-this.width/4
            && x <= this.x +this.width*1.25
            && y >= this.y-this.height/4
            && y <= this.y+this.height*1.25;
    }

    widen(length){
        if(15 > this.width / length)
        {
            this.width += 14;
            this.height += 14;
        }
    }

    resize(){
        this["height"] = parseInt(document.getElementById("size").value);
        this["width"] = parseInt(document.getElementById("size").value);
        document.getElementById("size").value = '';
    }

    showSelectedElement(){

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
        super(x, y, id, text, color);
        this.height = height;
        this.width = width;
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
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);

        context.stroke();
        context.fillStyle = "blue";
        context.fillText(this.text,this.x+this.width/2, this.y+this.height/2);
        if (selected){
            context.setLineDash([10, 10]);
            context.strokeStyle = 'blue';
            context.lineWidth = 3;
            context.strokeRect(this.x, this.y, this.width,this.height);
            context.strokeStyle = 'black';
        }
        context.closePath();
        context.fillStyle = "black";
        context.setLineDash([]);
    }

    isMouseOnNode(x, y) {

        return x >= this.x
            && x <= this.x +this.width
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
        super(x, y, id, text, color);
        this.radius = radius;
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
    constructor(x, y, id, radius, text, color) {
        super(x, y, id, radius, text, color);
    }

    ConnectToPoints() {
        return {}
    }

    draw(context, selected) {
        context.beginPath();
        context.setLineDash([]);
        context.lineWidth = 3;
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = "blue";
        context.fillText(this.text, this.x, this.y);
        if (selected){
            context.setLineDash([10, 10]);
            context.strokeStyle = 'blue';
            context.lineWidth = 3;
            context.stroke();
            context.strokeStyle = 'black';
        }
        context.closePath();
        context.strokeStyle = 'black';
        context.setLineDash([]);
    }
    printNodeID(context, x, y) {
        context.fillText("Start node's ID: "+this.id, x, y);
    }
}

class End extends Circle{
    constructor(x, y, id, radius, text, color) {
        super(x, y, id, radius, text, color);
    }

    ConnectFromPoints() {
        return {}
    }

    draw(context, selected) {
        context.beginPath();
        context.setLineDash([]);
        context.lineWidth = 6;
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = 'blue';
        context.fillText(this.text, this.x, this.y);

        context.stroke();
        if (selected){
            context.setLineDash([10, 10]);
            context.strokeStyle = 'blue';
            context.lineWidth = 3;
            context.stroke();
            context.strokeStyle = 'black';
        }
        context.closePath();
        context.strokeStyle = 'black';
        context.setLineDash([]);
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