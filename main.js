(function () {

	'use strict'

	let canvas = document.getElementById('canvas');
	let ctx = canvas.getContext('2d');

	let canvasW = canvas.width = window.innerWidth;
	let canvasH = canvas.height = window.innerHeight;

	let show_fps = document.getElementById('show_fps');
	let fps = 0;
	let fpsLastCalledTime;

	let mouseX = null;
	let mouseY = null;

	const ROWS = 50;
	const COLS = 200;
	const THICKNESS = 1;
	const SPACING = 3;

	let particles = [];

	class Particle {
		// Constructor
		constructor(positionX, positionY) {
			this.positionX = positionX;
			this.positionY = positionY;
			this.initial_positionX = positionX;
			this.initial_positionY = positionY;
			this.radius = 1;
			this.velocity_X = 0;
			this.velocity_Y = 0;
		}
		// Prototype Methods
		draw() {
			drawCircleFull(this.positionX, this.positionY, this.radius, 'white');
		}
		update() {
			this.positionX += this.velocity_X;
			this.positionY += this.velocity_Y;
			let mouseRelativePositionX = Math.abs(mouseX - this.positionX);
			let mouseRelativePositionY = Math.abs(mouseY - this.positionY);
			let relative_initial_positionX = this.initial_positionX - this.positionX;
			let relative_initial_positionY = this.initial_positionY - this.positionY;
			if(mouseRelativePositionX < 10 && mouseRelativePositionY <10) {
				this.velocity_X = getRandomNegativeOrPositiveNumberBetween(1,2);
				this.velocity_Y = getRandomNegativeOrPositiveNumberBetween(1,2);
			} else {
				this.velocity_X *= relative_initial_positionX;
				this.velocity_Y *= relative_initial_positionY;
			}
		}
	}

	canvas.addEventListener('mousemove', updateMousePosition);

	init();

	(function renderFrame() {
		requestAnimationFrame(renderFrame);
		clearCanvas();
		drawRectangleFull(0, 0, canvasW, canvasH, 'black');
		update();
		drawMousePosition();
	}());

	function init() {
		for(let i = 0; i < ROWS; i++) {
			for(let k = 0; k < COLS; k++) {
				let particle = new Particle(k + SPACING*k, i + SPACING*i);
				particles.push(particle);
			}
		}
	}

	function update() {
		for(let i = 0; i < particles.length; i++) {
			particles[i].update();
			particles[i].draw();
		}
	}

	function updateMousePosition(event) {
		let rect = canvas.getBoundingClientRect();
		let root = document.documentElement;
		mouseX = event.clientX - rect.left - root.scrollLeft;
		mouseY = event.clientY - rect.top - root.scrollTop;
	}

	function drawMousePosition() {
		ctx.fillStyle = 'black';
		ctx.font = '18px Arial';
		ctx.fillText(`${mouseX}, ${mouseY}`, mouseX, mouseY);
	}

	function drawLine(startX, startY, endX, endY, color, thickness) {
		if(color) {
			ctx.strokeStyle = color;
		}
		if(thickness) {
			ctx.lineWidth = thickness;
		}
	    ctx.beginPath();
	    ctx.moveTo(startX, startY);
	    ctx.lineTo(endX, endY);
	    ctx.stroke();
	}

	function drawRectangleFull(positionX, positionY, width, height, color) {
		if(color) {
			ctx.fillStyle = color;
		}
		ctx.fillRect(positionX, positionY, width, height);
	}

	function drawRectangleEmpty(positionX, positionY, width, height, borderColor, borderThickness) {
		if(borderColor) {
			ctx.strokeStyle = borderColor;
		}
		if(borderThickness) {
			ctx.lineWidth = borderThickness;
		}
		ctx.beginPath();
		ctx.rect(positionX, positionY, width, height); 
		ctx.stroke();
	}

	function drawCircleFull(centerX, centerY, radius, color) {
		if(color) {
			ctx.fillStyle = color;
		}
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fill();
	}

	function drawCircleEmpty(centerX, centerY, radius, borderColor, borderThickness) {
		if(borderColor) {
			ctx.strokeStyle = borderColor;
		}
		if(borderThickness) {
			ctx.lineWidth = borderThickness;
		}
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
		ctx.stroke();
	}

	function drawTriangleFull(firstX, firstY, secondX, secondY, thirdX, thirdY, color) {
		if(color) {
			ctx.fillStyle = color;
		}
	    ctx.beginPath();
	    ctx.moveTo(firstX, firstY);
	    ctx.lineTo(secondX, secondY);
	    ctx.lineTo(thirdX, thirdY);
	    ctx.fill();
	}

	function drawTriangleEmpty(firstX, firstY, secondX, secondY, thirdX, thirdY, borderColor, borderThickness) {
		if(borderColor) {
			ctx.strokeStyle = borderColor;
		}
		if(borderThickness) {
			ctx.lineWidth = borderThickness;
		}
	    ctx.beginPath();
	    ctx.moveTo(firstX, firstY);
	    ctx.lineTo(secondX, secondY);
	    ctx.lineTo(thirdX, thirdY);
	    ctx.lineTo(firstX, firstY);
	    ctx.stroke();
	}

	function drawImage(imgSource, positionX, positionY, width, height) {
		let img = new Image();
		img.src = imgSource;
		window.onload = function() {
			if(width && height) {
				ctx.drawImage(img, positionX, positionY, width, height);
			} else {
				ctx.drawImage(img, positionX, positionY);
			}
		}
	}

	function clearCanvas() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	function getRandomNegativeOrPositiveNumberBetween(min, max) {
		// this will get a number between min and max;
		let num = Math.floor(Math.random() * max) + min;
		// this will add minus sign in 50% of cases
		num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
	}

})();