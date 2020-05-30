class Edge {
    constructor(from, to, id){
        this.from = from;
        this.to = to;
        this.id = id;
    }

    draw(context) {
        let head = 30;
        let dx = this.to.ConnectToPoints().x - this.from.ConnectFromPoints().x;
        let dy = this.to.ConnectToPoints().y - this.from.ConnectFromPoints().y;
        var angle = Math.atan2(dy, dx);
        context.beginPath();
        context.lineWidth = 3;
        context.strokeStyle = 'black';
        context.moveTo(this.from.ConnectFromPoints().x, this.from.ConnectFromPoints().y);
        context.lineTo(this.to.ConnectToPoints().x, this.to.ConnectToPoints().y);
        context.stroke();
        context.beginPath();
        context.fillStyle = 'black';
        context.moveTo(this.to.ConnectToPoints().x, this.to.ConnectToPoints().y);
        context.lineTo(this.to.ConnectToPoints().x - head * Math.cos(angle - Math.PI / 10), this.to.ConnectToPoints().y - head * Math.sin(angle - Math.PI / 10));
        context.lineTo(this.to.ConnectToPoints().x - head * Math.cos(angle + Math.PI / 10), this.to.ConnectToPoints().y - head * Math.sin(angle + Math.PI / 10));
        context.fill();
        context.closePath()
    }
}

function drawEdges(context, edges) {
    for (let i = 0; i < edges.length; ++i) {
        let edge = edges[i];
        edge.draw(context);
    }
}
