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

function draw()
{
    drawNodes(context);
    drawEdges(context);
}


function clear()
{
    context.save();
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
}

function initialize()
{
    canvas = document.getElementById("my-canvas");
    canvasPosition = canvas.getBoundingClientRect();
    window.addEventListener("keydown", keyDown, false);
    window.addEventListener("keyup", keyUp, false);
    canvas.addEventListener("mousedown", mouseDown, false);
    canvas.addEventListener("mousemove", mouseMove, false);
    canvas.addEventListener("mouseup", mouseUp, false);
    canvas.addEventListener("mousewheel", mouseWheel, false);
    context = canvas.getContext("2d");
}
