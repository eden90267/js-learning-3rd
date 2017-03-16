/**
 * Created by eden90267 on 2017/3/16.
 */
$(function () {
    'use strict';
    console.log('main.js loaded');

    paper.install(window); // 全域範圍安裝Paper.js
    paper.setup(document.getElementById('mainCanvas')); // 將Paper.js指派給canvas，準備Paper.js來繪圖

    // ex. 1:
    // var c = Shape.Circle(200, 200, 50);
    // c.fillColor = 'green';

    // ex. 2:
    // var c;
    // for (var x = 25; x < 400; x+=50) {
    //     for (var y = 25; y < 400; y+=50) {
    //         c = Shape.Circle(x, y, 20);
    //         c.fillColor = 'green';
    //     }
    // }

    // ex. 3:
    // var tool = new Tool();
    // tool.onMouseDown = function(event) {
    //     // var c = Shape.Circle(event.point.x, event.point.y, 20);
    //     var c = Shape.Circle(event.point, 20);
    //     c.fillColor = 'green';
    // };

    // Hello World
    var c = Shape.Circle(200, 200, 80);
    c.fillColor = 'black';
    var text = new PointText(200, 200);
    text.justification = 'center';
    text.fillColor = 'white';
    text.fontSize = 20;
    text.content = 'hello world';

    paper.view.draw();
});