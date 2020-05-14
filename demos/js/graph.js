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
        this.themes = {
            fapados: {
                rectangleColor: "yellow",
                circleColor: "green",
                diamondColor: "orange",
                edgeColor: "black"
            },
            fullos: {
                rectangleColor: {},
                circleColor: {},
                diamondColor: {},
                edgeColor: {}
            }
        };
        this.selectedtheme = "fapados";

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

        this.checkStartEnd();
        drawNodes(this.context, this.nodes, this.selectedIndex);
        drawEdges(this.context, this.edges);
    }

    checkStartEnd(){
        let start = false;
        let end = false;
        for (let i = 0; i < this.nodes.length; ++i) {
            let node = this.nodes[i];
            switch (this.nodes[i].constructor.name ){
                case "Start":
                    start = true;
                    break;
                case "End":
                    end = true;
                    break;
            }
        }
        if (!start || !end){
            this.context.font = "30px Arial";
            this.context.fillText("Nincs Start vagy End", this.canvasPosition.x-250, this.canvasPosition.y+100);
            this.context.font = "20px Arial";
        }
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

    let fullosRectGrd = editor.graph.context.createLinearGradient(0, 0, 1280, 720);
    fullosRectGrd.addColorStop(0, "#b92b27");
    fullosRectGrd.addColorStop(0.5, "#1565C0");
    fullosRectGrd.addColorStop(1, "#b92b27");
    editor.graph.themes.fullos.rectangleColor = fullosRectGrd;

    let fullosCircleGrd = editor.graph.context.createLinearGradient(0, 0, 1280, 720);
    fullosCircleGrd.addColorStop(0, "#de6262");
    fullosCircleGrd.addColorStop(0.5, "#ffb88c");
    fullosCircleGrd.addColorStop(1, "#de6262");
    editor.graph.themes.fullos.circleColor = fullosCircleGrd;

    let fullosDiaGrd = editor.graph.context.createLinearGradient(0, 0, 1280, 720);
    fullosDiaGrd.addColorStop(0, "#c6ffdd");
    fullosDiaGrd.addColorStop(0.5, "#fbd786");
    fullosDiaGrd.addColorStop(1, "#f7797d");
    editor.graph.themes.fullos.diamondColor = fullosDiaGrd;

    let fullosEdgeGrd = editor.graph.context.createLinearGradient(0, 0, 1280, 720);
    fullosEdgeGrd.addColorStop(0, "#2193b0");
    fullosEdgeGrd.addColorStop(0.5, "#6dd5ed");
    fullosEdgeGrd.addColorStop(1, "#2193b0");
    editor.graph.themes.fullos.edgeColor = fullosEdgeGrd;
}
