class Edge {
    constructor(from, to, id){
        this.from = from;
        this.to = to;
        this.id = id;
    }

    draw(context) {
        var head = 30;
        var dx = this.to.x - this.from.x;
        var dy = this.to.y - this.from.y;
        var angle = Math.atan2(dy, dx);
        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle = 'black';
        //context.strokeStyle = "black";
        //context.strokeStyle = 'rgb(128, 128, 128)';
        //context.globalCompositeOperation='destination-over'; //edge a node-k alatt
        //1: node 2: edge | destin: edge alul
        //1: node 2: edge | source: edge felul
        //1: edge 2: node | destin: edge felul
        //1: edge 2: node | source: edge alul
        context.moveTo(this.from.x, this.from.y); // + this.from.width/2, + this.from.height/2
        //context.bezierCurveTo(this.from.x + dx * 0.33 + 50, this.from.y + this.from.width/2, this.from.x + dx * 0.67 +50, this.to.y, this.to.x + this.to.width/2, this.to.y + this.to.height/2);
        context.lineTo(this.to.x, this.to.y); //+ this.to.width/2, + this.to.height/2
        context.stroke();
        //ez a nyíl lesz majd valahogy
        context.beginPath();
        //context.setLineDash([]);
        context.fillStyle = 'black';
        context.moveTo(this.to.x, this.to.y); //+ this.to.width/2, + this.to.height/2
        context.lineTo(this.to.x - head * Math.cos(angle - Math.PI / 10), this.to.y - head * Math.sin(angle - Math.PI / 10));
        //  Középre kötés:
        //  context.lineTo(this.to.x - head * Math.cos(angle - Math.PI / 10) + this.to.width/2, this.to.y - head * Math.sin(angle - Math.PI / 10) + this.to.height/2);
        //context.moveTo(tox, toy);
        context.lineTo(this.to.x - head * Math.cos(angle + Math.PI / 10), this.to.y - head * Math.sin(angle + Math.PI / 10));
        //  Középre kötés:
        //  context.lineTo(this.to.x - head * Math.cos(angle + Math.PI / 10) + this.to.width/2, this.to.y - head * Math.sin(angle + Math.PI / 10) + this.to.height/2);
        // context.moveTo(this.to.x+50, this.to.y);
        // //context.lineTo(this.to.x + 65, this.to.y -15);
        // //context.lineTo(this.to.x - 10 * Math.cos(angle - Math.PI / 6) +30, this.to.y - 10 * Math.sin(angle - Math.PI / 6)-20);
        // context.lineTo(this.to.x + 85 - dx/6, this.to.y -20 - dy/8);
        // context.moveTo(this.to.x+50, this.to.y);
        // //context.lineTo(this.to.x - 10 * Math.cos(angle + Math.PI / 6) +70, this.to.y - 10 * Math.sin(angle - Math.PI / 6)-20);
        // context.lineTo(this.to.x + 15 - dx/6, this.to.y -20 - dy/8);
        context.fill();
        context.closePath()
    }
}

function drawEdges(context, edges) {
    for (let i = 0; i < edges.length; ++i) {
        let edge = edges[i];
        var sourceNodeIndex = edges[i]["from"];
        var targetNodeIndex = edges[i]["to"];
        edge.draw(context);
        /*
        // EREDETI:
        function drawEdges(context) {
        for (var i = 0; i < edges.length; ++i) {
        var edge = edges[i];
        var sourceNodeIndex = edges[i]["from"];
        var targetNodeIndex = edges[i]["to"];
        var sourceNode = getNode(sourceNodeIndex);//nodes[sourceNodeIndex];
        var targetNode = getNode(targetNodeIndex);
        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle = "black";
        context.globalCompositeOperation='destination-over';
        var dx = targetNode["x"] - sourceNode["x"];
        var dy = targetNode["y"] - sourceNode["y"];
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
        */
    }
}
