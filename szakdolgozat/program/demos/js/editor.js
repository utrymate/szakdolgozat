class Editor {
    constructor() {
        this.graph =  new Graph();
    }

    mouseUp(event, context)
    {
        this.graph.clear();
        this.graph.draw();
        const mouse = this.calcMouseEvent(event);
        this.graph.drag = false;
        let selectedIndex = null;
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
                        if (this.graph.drawEdge["from"] && this.graph.drawEdge["to"]){
                            let duplicates = this.graph.edges.map(edge =>{
                                return edge.from === this.graph.drawEdge["from"] && edge.to === this.graph.drawEdge["to"];
                            })
                            if (!duplicates.includes(true)){
                                this.addEdge(this.graph.drawEdge["from"], this.graph.drawEdge["to"]);
                            }
                        }
                        this.graph.clear();
                        this.graph.draw();
                    } else if (event.which === 3){
                        for (let j = 0; j < this.graph.edges.length; ++j) {
                            if(this.graph.nodes[selectedIndex] === this.graph.edges[j].to && this.graph.drawEdge["from"] == this.graph.edges[j].from)
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

    addTextToNode(value) {
        this.graph.nodes[this.graph.selectedIndex]["text"] = value;
        let length = parseInt(value.length);
        this.graph.context.font = "20px Arial";
        this.graph.context.textBaseline = 'middle';
        this.graph.context.textAlign = "center";
        this.graph.context.fillText(value, this.graph.nodes[this.graph.selectedIndex]["x"]+this.graph.nodes[this.graph.selectedIndex]["width"]/2, this.graph.nodes[this.graph.selectedIndex]["y"]+this.graph.nodes[this.graph.selectedIndex]["height"]/2);
        this.graph.nodes[this.graph.selectedIndex].widen(length);
        this.graph.clear();
        this.graph.draw();
    }

    addNodeId() {
        let max = 0;
        if(this.graph.nodes.length !==0){
            this.graph.nodes.forEach(e => {
                if(e.id > max) {
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
        let rectangle = new Rectangle(60, 525, newid+1, 50, 100, "", this.graph.themes[this.graph.selectedtheme].rectangleColor);
        this.graph.nodes.push(rectangle);
        this.graph.draw();
    }

    addDiamond(){
        var newid = this.addNodeId();
        let diamond = new Diamond(460, 100, newid+1, 100, 100, "", this.graph.themes[this.graph.selectedtheme].diamondColor);
        this.graph.nodes.push(diamond);
        this.graph.draw();
    }

    addCircle() {
        let newid = this.addNodeId();
        let circle = new Circle(310, 350, newid+1, 40, "", this.graph.themes[this.graph.selectedtheme].circleColor);
        this.graph.nodes.push(circle);
        this.graph.draw();
    }

    addStart() {
        let newid = this.addNodeId();
        let start = new Start(110, 150, newid+1, 40, "", this.graph.themes[this.graph.selectedtheme].startEndColor);
        this.graph.nodes.push(start);
        this.graph.clear();
        this.graph.draw();
    }

    addEnd() {
        let newid = this.addNodeId();
        let end = new End(510, 550, newid+1, 40, "", this.graph.themes[this.graph.selectedtheme].startEndColor);
        this.graph.nodes.push(end);
        this.graph.clear();
        this.graph.draw();
    }

    addEdge(from, to) {
        let newid = this.addEdgeId();
        let edge = new Edge(from, to, newid+1);
        this.graph.edges.push(edge);
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
        if (this.graph.drag) {
            this.graph.dragEnd = {
                x: event.clientX - this.graph.canvasPosition.left,
                y: event.clientY - this.graph.canvasPosition.top
            };
            if (this.graph.selectedIndex != null) {
                let dx = this.graph.dragEnd.x - this.graph.dragStart.x;
                let dy = this.graph.dragEnd.y - this.graph.dragStart.y;
                if ((this.graph.nodes[this.graph.selectedIndex]["x"]+dx>1 && this.graph.nodes[this.graph.selectedIndex]["x"]+dx < this.graph.canvas.width) &&
                    ( this.graph.nodes[this.graph.selectedIndex]["y"]+dy > 1 &&  this.graph.nodes[this.graph.selectedIndex]["y"]+dy < this.graph.canvas.height )) {
                    this.graph.nodes[this.graph.selectedIndex]["x"] += dx;
                    this.graph.nodes[this.graph.selectedIndex]["y"] += dy;
                }
            }
            this.graph.dragStart = this.graph.dragEnd;
        }
    }

    resize() {
        this.graph.canvas.width = window.innerWidth;
        this.graph.canvas.height = window.innerHeight;
        let oldWidth = this.graph.canvas.width;
        let oldHeight = this.graph.canvas.height;
        this.graph.clear();
        this.graph.draw();
        this.graph.canvasPosition = this.graph.canvas.getBoundingClientRect();
        let newWidth = this.graph.canvasPosition.width;
        let newHeight = this.graph.canvasPosition.height;
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
