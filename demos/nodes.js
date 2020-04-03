class Node {
    constructor(x, y, id){
        this.x = x;
        this.y = y;
        this.id = id;
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
        context.fillStyle = "yellow";
        context.fillRect(this.x, this.y, this.width, this.height);
        context.stroke();
        context.fillStyle = "blue";
        context.globalCompositeOperation='source-over';
        context.fillText(this.text,this.x+this.width/2, this.y+this.height/2);
    }
}

class Circle extends Node{
    constructor(x, y, id, radius) {
        super(x, y, id);
        this.radius = radius;
    }

    draw(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fillStyle = "red";
        context.fill();
        context.fillStyle = "blue";
        context.globalCompositeOperation='source-over';
        context.fillText(this.text, this.x, this.y);
    }
}

class Start extends Circle{
    constructor(x, y, id, radius) {
        super(x, y, id, radius);
    }

    draw(context) {
        context.beginPath();
        context.lineWidth = 3;
        context.setLineDash([]);
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = "black";
        context.globalCompositeOperation='source-over';
        context.fillText(this.text, this.x, this.y);
    }
}

class End extends Circle{
    constructor(x, y, id, radius) {
        super(x, y, id, radius);
    }

    draw(context) {
        context.beginPath();
        context.lineWidth = 6;
        context.setLineDash([]);
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = "black";
        context.globalCompositeOperation='source-over';
        context.fillText(this.text, this.x, this.y);
    }
}

function drawNodes(context) {
 for (var i = 0; i < nodes.length; ++i) {
    var node = nodes[i];
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
