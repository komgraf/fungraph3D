renderer = new THREE.WebGLRenderer( { antialias: true } );

axesHolder = document.getElementById( 'axes' );
renderer.setSize( axesHolder.offsetWidth, axesHolder.offsetHeight );
renderer.setClearColorHex( "#FFF", 1.0 );
axesHolder.appendChild( renderer.domElement );

scene = new THREE.Scene();

axes = buildAxes( 1000 );
scene.add( axes );

buildCamera();

animate();

function buildAxes( length ) {
	var axes = new THREE.Object3D();

	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
	axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z

	return axes;
}

function buildAxis( src, dst, colorHex, dashed ) {
	var geom = new THREE.Geometry(),
		mat;

	if(dashed) {
			mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
	} else {
			mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
	}

	geom.vertices.push( src.clone() );
	geom.vertices.push( dst.clone() );
	geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

	var axis = new THREE.Line( geom, mat, THREE.LinePieces );

	return axis;
}

function buildCamera() {
	camera = new THREE.PerspectiveCamera( 45, axesHolder.offsetWidth / axesHolder.offsetHeight, 1, 10000 );
	camera.position.set( 30, 50, 120 );
	camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

	controls = new THREE.TrackballControls( camera );
	
	controls.rotateSpeed = 1.2;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 1;
		
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
}

function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}


/*****************************
* creating and removing object
******************************/

var box, cube, sphere;
/*
var meshMaterial;

meshMaterial = new THREE.MeshBasicMaterial( {
	color: "rgb(51,153,255)",
	wireframe: false
} );*/

function createCube( length, r, g, b, x, y, z ) {
	if( cube!=null ) {
		removeCube();
	}
	cube = new THREE.Mesh( new THREE.CubeGeometry( length, length, length ), new THREE.MeshBasicMaterial( { color: "rgb("+ r +","+ g +","+ b +")", wireframe: false } ) );
	cube.position.set( x, y, z );
	scene.add( cube );
	/* buat cek rotasi bener apa gak, meh pake label males nyari -> sprite
	var entah = new THREE.Mesh( new THREE.CubeGeometry( length, length*2, length ), meshMaterial );
	entah.position.set( 0, length*2, 0 );
	cube.add( entah );*/
}

function createBox( ax, r, g, b, x, y, z ) {
	if( box!=null ) {
		removeBox();
	}
	box = new THREE.Mesh( new THREE.CubeGeometry( ax, ax, ax ), new THREE.MeshBasicMaterial( { color: "rgb("+ r +","+ g +","+ b +")", wireframe: false } ) );
	box.position.set( x, y, z );
	scene.add( box );
}

function createSphere( radius, r, g, b, x, y, z ) {
	if( sphere!=null ) {
		removeSphere();
	}
	sphere = new THREE.Mesh( new THREE.SphereGeometry( radius ), new THREE.MeshBasicMaterial( { color: "rgb("+ r +","+ g +","+ b +")", wireframe: false } ) );
	sphere.position.set( x, y, z );
	scene.add( sphere );
}

function removeCube() {
	scene.remove( cube );
}

function removeBox() {
	scene.remove( box );
}

function removeSphere() {
	scene.remove( sphere );
}

function clear() {
	removeCube();
	removeBox();
	removeSphere();
}


/*****************************
* object transformation
******************************/

function translateCube( x, y, z ) {
	if( cube!=null ) {
		ax = parseFloat( cube.position.x )+parseFloat( x );
		ay = parseFloat( cube.position.y )+parseFloat( y );
		az = parseFloat( cube.position.z )+parseFloat( z );
		cube.position.set( ax, ay, az );
		/* sama sahha
		cube.position.x = parseFloat( cube.position.x )+x;
		cube.position.y = parseFloat( cube.position.y )+y;
		cube.position.z = parseFloat( cube.position.z )+z;*/
		//alert( ax +" "+ ay +" "+ az );
	}
}

function translateBox( x, y, z ) {
	if( box!=null ) {
		ax = parseFloat( box.position.x )+parseFloat( x );
		ay = parseFloat( box.position.y )+parseFloat( y );
		az = parseFloat( box.position.z )+parseFloat( z );
		box.position.set( ax, ay, az );
	}
}

function translateSphere( x, y, z ) {
	if( sphere!=null ) {
		ax = parseFloat( sphere.position.x )+parseFloat( x );
		ay = parseFloat( sphere.position.y )+parseFloat( y );
		az = parseFloat( sphere.position.z )+parseFloat( z );
		sphere.position.set( ax, ay, az );
	}
}

/* nak meh disingkat
function translateObject( object, x, y, z ) {
	
}*/

//rotate pake satuan radian
function rotateCube( x, y, z ) {
	cube.rotation.x += x*Math.PI/180;
	cube.rotation.y += y*Math.PI/180;
	cube.rotation.z += z*Math.PI/180;
}

function rotateBox( x, y, z ) {
	box.rotation.x += x*Math.PI/180;
	box.rotation.y += y*Math.PI/180;
	box.rotation.z += z*Math.PI/180;
}

function rotateSphere( x, y, z ) {
	sphere.rotation.x += x*Math.PI/180;
	sphere.rotation.y += y*Math.PI/180;
	sphere.rotation.z += z*Math.PI/180;
}