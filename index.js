const mainCanvas = document.getElementById('main-canvas');

function adjustBounds() {
    const width = mainCanvas.clientWidth;
    const height = mainCanvas.clientHeight;
    mainCanvas.width = mainCanvas.clientWidth;
    mainCanvas.height = mainCanvas.clientHeight;
}

adjustBounds();
window.addEventListener('resize', adjustBounds);

function insertPoints(pointList) {
    for (let i = pointList.length - 1; i > 0; i--) {
        const diff = {
            x: pointList[i].x - pointList[i - 1].x,
            y: pointList[i].y - pointList[i - 1].y,
        };

        const rotated = {
            x: -diff.y,
            y:  diff.x,
        };

        const center = {
            x: 0.5 * (pointList[i].x + pointList[i - 1].x),
            y: 0.5 * (pointList[i].y + pointList[i - 1].y),
        };

        const k = 0.2 * (Math.random() - 0.5);
        pointList.splice(i, 0, {
            x: 0.5 * (pointList[i].x + pointList[i - 1].x) + k * rotated.x,
            y: 0.5 * (pointList[i].y + pointList[i - 1].y) + k * rotated.y,
        });
    }
}

function drawLightning(context, from, to) {
    const pointList = [from, to];
    for (let i = 0; i < 10; i++) {
        insertPoints(pointList);
    }

    context.beginPath();
    context.moveTo(Math.floor(pointList[0].x), Math.floor(pointList[0].y));
    for (let i = 1; i < pointList.length; i++) {
        context.lineTo(Math.floor(pointList[i].x), Math.floor(pointList[i].y));
    }
    context.stroke();
}

let previousTime = 0;

function onAnimationFrame(currentTime) {
    const width = mainCanvas.width;
    const height = mainCanvas.height;
    const context = mainCanvas.getContext('2d');

    context.strokeStyle = 'black';
    context.lineWidth = 5;

    // context.fillStyle = 'rgba(255, 255, 255, 0.1)';
    // context.fillRect(0, 0, width, height);

    // const period = 100;
    // if (Math.floor(currentTime / period) > Math.floor(previousTime / period)) {
    if (true) {
        context.fillStyle = 'rgba(255, 255, 255, 0.5)';
        context.fillRect(0, 0, width, height);
        for (let i = 0; i < 2; i++) {
            drawLightning(context, { x: 0, y: height / 2, }, { x: width, y: height / 2, });
        }
    }

    previousTime = currentTime;
    requestAnimationFrame(onAnimationFrame);
}

requestAnimationFrame(onAnimationFrame);
