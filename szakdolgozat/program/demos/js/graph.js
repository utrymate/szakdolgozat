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
            minimal: {
                rectangleColor: "yellow",
                circleColor: "green",
                diamondColor: "orange",
                startEndColor: "black"
            },
            fancy: {
                rectangleColor: {},
                circleColor: {},
                diamondColor: {},
                startEndColor: {}
            }
        };
        this.selectedtheme = "minimal";
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
            switch (this.nodes[i].constructor.name){
                case "Start":
                    start = true;
                    break;
                case "End":
                    end = true;
                    break;
            }
        }
        if (!start || !end){
            this.context.fillStyle = "yellow";
            this.context.font = "30px Arial";
            this.context.fillText("Missing Start or End node!", 350, 50);
            this.context.font = "20px Arial";
            this.context.fillStyle = "black";
        }
    }
}

function initialize(editor)
{
    editor.graph.canvas = document.getElementById("my-canvas");
    editor.graph.canvasPosition = editor.graph.canvas.getBoundingClientRect();
    editor.graph.canvas.addEventListener("mousedown", editor.mouseDown.bind(editor), false);
    editor.graph.canvas.addEventListener("mousemove", editor.mouseMove.bind(editor), true);
    editor.graph.canvas.addEventListener("mouseup", editor.mouseUp.bind(editor), false);
    editor.graph.context = editor.graph.canvas.getContext("2d");

    let fullosRectGrd = editor.graph.context.createLinearGradient(0, 0, 1280, 720);
    fullosRectGrd.addColorStop(0, "#b92b27");
    fullosRectGrd.addColorStop(0.5, "#1565C0");
    fullosRectGrd.addColorStop(1, "#b92b27");
    editor.graph.themes.fancy.rectangleColor = fullosRectGrd;

    let fullosCircleGrd = editor.graph.context.createLinearGradient(0, 0, 1280, 720);
    fullosCircleGrd.addColorStop(0, "#de6262");
    fullosCircleGrd.addColorStop(0.5, "#ffb88c");
    fullosCircleGrd.addColorStop(1, "#de6262");
    editor.graph.themes.fancy.circleColor = fullosCircleGrd;

    let fullosDiaGrd = editor.graph.context.createLinearGradient(0, 0, 1280, 720);
    fullosDiaGrd.addColorStop(0, "#c6ffdd");
    fullosDiaGrd.addColorStop(0.5, "#fbd786");
    fullosDiaGrd.addColorStop(1, "#c6ffdd");
    editor.graph.themes.fancy.diamondColor = fullosDiaGrd;

    let startend = editor.graph.context.createLinearGradient(0, 0, 1280, 720);
    startend.addColorStop(0, "#000000");
    startend.addColorStop(0.5, "#FF0000");
    startend.addColorStop(1, "#000000");
    editor.graph.themes.fancy.startEndColor = startend;
}
