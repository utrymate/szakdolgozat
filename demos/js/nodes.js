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

    draw(context) {
        /*
        context.save();
        context.beginPath();
        //context.fillStyle = this.color;
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


        // the top right edge

       // context.fill();
        //context.fillStyle = "blue";
        context.translate( this.x+this.width/2, this.y+this.height/2 );
        // rotate the rect
        context.rotate(45*Math.PI/180);
        context.rect( -this.width/2, -this.height/2, this.width,this.height);

        //context.fillRect(this.x, this.y, this.width, this.height);
        //context.rect( -this.width/2, -this.height/2, this.width,this.height);
        context.fillText(this.text,this.x, this.y+this.height/2);
        context.fill();
        context.stroke();
        context.restore();
        */

       context.beginPath();
       context.moveTo(this.x, this.y);
       context.lineTo(this.x - this.width / 2, this.y + this.height / 2);
       context.lineTo(this.x, this.y + this.height);
       context.lineTo(this.x + this.width / 2, this.y + this.height / 2);
       context.lineTo(this.x, this.y);
        
       context.lineWidth = 1;
       context.fillStyle = this.color;

       context.closePath();

       context.fill();
       context.stroke();
    }

    //TODO: ezt megírni normálisan, hogy csak a rombuszra kattintva lehessen azt mozgatni
    isMouseOnNode(x, y) {

        console.log("x: "+x+", y: "+y);
        return x >= this.x
            && x <= this.x +this.width
            && y >= this.y
            && y <= this.y + this.height;
    }

    widen(length){
        if(15 > this.width / length)
        {
            this.width += 14;
        }
    }

    resize(){
        this["height"] = document.getElementById("height").value;
        this["width"] = document.getElementById("width").value;
        document.getElementById("height").value = '';
        document.getElementById("width").value = '';
    }

    showSelectedElement(){

        //todo: itt kapjon dash-ed valamit
        // context.setLineDash([6]); // ezzel kap dash-t

        let inputContainer = document.getElementById("resize-nodes");
        inputContainer.innerHTML = '';
        inputContainer.innerHTML = `
        <div>
        <label for="textInput" >Type text here: </label>
            <input type="text" onfocus="this.value=''" name="textInput"  onkeyup="editor.addTextToNode(this.value)">
        </div>
        <div>
            <label for="textInput" >Type width here: </label>
            <input type="number" name="width" id="width">
        </div>
        <div>
            <label for="textInput" >Type height here: </label>
            <input type="number" name="height" id="height">
        </div>
       
        <div>
            <button onclick="editor.resizeNode()">Resize</button>
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

    draw(context) {
        context.beginPath();
        //context.fillStyle = "yellow";
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.stroke();
        context.fillStyle = "blue";
        //context.globalCompositeOperation='source-over';
        context.fillText(this.text,this.x+this.width/2, this.y+this.height/2);
        console.log();
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
            <input type="text" onfocus="this.value=''" name="textInput"  onkeyup="editor.addTextToNode(this.value)">
        </div>
        <div>
            <label for="textInput" >Type width here: </label>
            <input type="number" name="width" id="width">
        </div>
        <div>
            <label for="textInput" >Type height here: </label>
            <input type="number" name="height" id="height">
        </div>
        <div>
            <button onclick="editor.resizeNode()">Resize</button>
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

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = this.color;
        context.fill();
        context.fillStyle = "black";
        //context.globalCompositeOperation='source-over';
        context.fillText(this.text, this.x, this.y);
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
        this["radius"] = document.getElementById("radius").value;
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
            <input type="text" onfocus="this.value=''" name="textInput"  onkeyup="editor.addTextToNode(this.value)">
        </div>
        <div>
            <label for="textInput" >Type radius here: </label>
            <input type="number" name="radius" id="radius">
        </div>
        <div>
            <button onclick="editor.resizeNode()">Resize</button>
        </div>`
    }
}

class Start extends Circle{
    constructor(x, y, id, radius, text) {
        super(x, y, id, radius, text);
    }

    draw(context) {
        context.beginPath();
        context.lineWidth = 3;
        context.setLineDash([]);
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = "black";
        //context.globalCompositeOperation='source-over';
        context.fillText(this.text, this.x, this.y);
    }
    printNodeID(context, x, y) {
        context.fillText("Start node's ID: "+this.id, x, y);
    }

}

class End extends Circle{
    constructor(x, y, id, radius, text) {
        super(x, y, id, radius, text);
    }

    draw(context) {
        context.beginPath();
        context.lineWidth = 6;
        context.setLineDash([]);
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = "black";
        //context.globalCompositeOperation='source-over';
        context.fillText(this.text, this.x, this.y);
    }

    printNodeID(context, x, y) {
        context.fillText("End node's ID: "+this.id, x, y);
    }

}

function drawNodes(context, nodes) {
    for (let i = 0; i < nodes.length; ++i) {
        let node = nodes[i];

        node.draw(context);
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
