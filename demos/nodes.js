function drawNodes(context) {
 for (var i = 0; i < nodes.length; ++i) {
        var node = nodes[i];
        if (node["type"] == "rectangle")
        {
            context.beginPath();
            //context.lineWidth = 6;
            context.fillStyle = "yellow";
            context.fillRect(node["x"], node["y"], node["width"], node["height"]); //ekkorát rajzol ki: 100 x 50
            context.stroke();
            context.fillStyle = "blue";
            context.globalCompositeOperation='source-over';
            context.fillText(node["text"],node["x"]+node["width"]/2, node["y"]+node["height"]/2);
        }

        if(node["type"] == "circle")
        {
            context.beginPath();
            context.arc(node["x"], node["y"], node["radius"], 0, 2 * Math.PI);
            context.fillStyle = "red";
            context.fill();
            context.fillStyle = "blue";
            context.globalCompositeOperation='source-over';
            context.fillText(node["text"],node["x"], node["y"]);
        }

        if(node["type"] == "start")
        {
            context.beginPath();
            context.lineWidth = 3;
            context.setLineDash([]);
            context.arc(node["x"], node["y"], node["radius"], 0, 2 * Math.PI);
            context.stroke();
            context.fillStyle = "black";
            context.globalCompositeOperation='source-over';
            context.fillText(node["text"], node["x"], node["y"]);
        }

        if(node["type"] == "end")
        {
            context.beginPath();
            context.lineWidth = 6;
            context.setLineDash([]);
            context.arc(node["x"], node["y"], node["radius"], 0, 2 * Math.PI);
            context.stroke();
            context.fillStyle = "black";
            context.fillText(node["text"], node["x"], node["y"]);
        }
    }
}
