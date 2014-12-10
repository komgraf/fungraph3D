window.onload = init;

function init() {
	//var axes3D = new Axes3D( new THREE.WebGLRenderer( {	antialias: true } ) );
	/*
	var object3D = new Object3D( "#A00", false, scene );
	var box, sphere;
	/*
	for( ;; )
		axes3D.animate();*/
	
	var gaweKotak = get('gaweKotak');
	gaweKotak.onclick = function() {
		createCube( get('length').value, get('r').value, get('g').value, get('b').value, get('x').value, get('y').value, get('z').value );
	}
	
	var gaweBal = get('gaweBal');
	gaweBal.onclick = function() {
		createSphere( get('length').value, get('r').value, get('g').value, get('b').value, get('x').value, get('y').value, get('z').value );
	}
	
	var rKotak = get('rKotak');
	rKotak.onclick = function() {
		rotateCube( get('rx').value, get('ry').value, get('rz').value );
	}
	
	var rBal = get('rBal');
	rBal.onclick = function() {
		rotateSphere( get('rx').value, get('ry').value, get('rz').value );
	}
	
	var tKotak = get('tKotak');
	tKotak.onclick = function() {
		translateCube( get('tx').value, get('ty').value, get('tz').value );
		//alert( get('tx').value +" "+ get('ty').value +" "+ get('tz').value );
		//translateCube( 0, 0, -20 );
	}
	
	var tBal = get('tBal');
	tBal.onclick = function() {
		translateSphere( get('tx').value, get('ty').value, get('tz').value );
	}
	
	var reset = get('reset');
	reset.onclick = function() {
		clear();
	}
}

function get(id) {
	return document.getElementById(id);
}