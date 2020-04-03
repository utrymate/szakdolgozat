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
        /* //ez a nyíl lesz majd valahogy
        context.beginPath();
        context.setLineDash([]);
        context.fillStyle = "black";
        context.moveTo(targetNode["x"] + 50, targetNode["y"]);
        context.lineTo(targetNode["x"] + 65, targetNode["y"] -15);
        context.moveTo(targetNode["x"] + 50, targetNode["y"]);
        context.lineTo(targetNode["x"] + 35, targetNode["y"] -15);
        context.stroke();
        */
    }
}
