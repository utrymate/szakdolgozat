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

class Rectangle extends Node{
    constructor(x, y, id, height, width, text) {
        super(x, y, id);
        this.height = height;
        this.width = width;
        this.text = text;
    }

    draw(context) {
        context.beginPath();
        //context.fillStyle = "yellow";
        context.fillStyle = 'rgb(255, 223, 0)';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.stroke();
        context.fillStyle = "blue";
        //context.globalCompositeOperation='source-over';
        context.fillText(this.text,this.x+this.width/2, this.y+this.height/2);
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
        if(15 > this.width / length)
        {
            this.width += 14;
        }
    }

}

class Circle extends Node{
    constructor(x, y, id, radius, text) {
        super(x, y, id);
        this.radius = radius;
        this.text = text;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = "red";
        context.fill();
        context.fillStyle = "blue";
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
