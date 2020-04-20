class Graph {
    constructor(){
        this.canvas = null;
        this.canvasPosition = null;
        this.context = null;
        this.drag = false;
        this.dragStart = null;
        this.dragEnd = null;
        this.mouseUpEvent = false;
        this.nodes = [];
        this.edges = [];
        this.selectedIndex = null;
        this.drawEdge = { from:"", to: ""};
    }
    printNodeID(context, x, y) {
        context.fillText("Node's ID: "+this.id, x, y);
    }


    clear() {
        this.context.save();
        this.context.setTransform(1, 0, 0, 1, 0, 0);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.restore();
    }

    draw() {
        drawNodes(this.context, this.nodes);
        drawEdges(this.context, this.edges);
    }


}



var canvas = null;
var canvasPosition = null;
var context = null;
var drag = false;
var dragStart;
var dragEnd;
let mouseUpEvent = false;

var nodes = [];
var edges = [];

var selectedIndex = null;
let drawEdge = { from:"", to: ""};

// function draw()
// {
//     drawNodes(context);
//     drawEdges(context);
// }
//
//
// function clear()
// {
//     context.save();
//     context.setTransform(1, 0, 0, 1, 0, 0);
//     context.clearRect(0, 0, canvas.width, canvas.height);
//     context.restore();
// }

function initialize(editor)
{
    editor.graph.canvas = document.getElementById("my-canvas");
    editor.graph.canvasPosition = editor.graph.canvas.getBoundingClientRect();
    window.addEventListener("keydown", editor.keyDown, false);
    window.addEventListener("keyup", editor.keyUp, false);
    editor.graph.canvas.addEventListener("mousedown", editor.mouseDown.bind(editor), false);
    editor.graph.canvas.addEventListener("mousemove", editor.mouseMove.bind(editor), true);
    editor.graph.canvas.addEventListener("mouseup", editor.mouseUp.bind(editor), false);
    editor.graph.canvas.addEventListener("mousewheel", editor.mouseWheel.bind(editor), false);
    editor.graph.context = editor.graph.canvas.getContext("2d");
    //window.addEventListener("resize", editor.resize.bind(editor));
}
