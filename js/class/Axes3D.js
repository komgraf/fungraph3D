function Axes3D( WebGLRenderer ) {
	this.renderer = WebGLRenderer;
	this.init();
}

Axes3D.prototype.init = function() {
	//document.body.appendChild( this.renderer.domElement );
	this.axesHolder = document.getElementById('axes');
	this.renderer.setSize( this.axesHolder.offsetWidth, this.axesHolder.offsetHeight );
	this.renderer.setClearColorHex( "#FFF", 1.0 );
	this.axesHolder.appendChild( this.renderer.domElement );
	
	this.scene = new THREE.Scene();
	
	this.buildAxes( 1000 );
	this.scene.add( this.axes );
	
	this.camera = new THREE.PerspectiveCamera( 50, this.axesHolder.offsetWidth/this.axesHolder.offsetHeight, 1, 10000 );
	this.camera.position.set( 30, 50, 120 );
	this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
	
	//this.setControls();
	this.controls = new THREE.TrackballControls( this.camera, this.renderer.domElement );
	this.animate();
};

Axes3D.prototype.buildAxes = function( length ) {
	this.axes = new THREE.Object3D();
	
	this.axes.add( this.buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); //+X
	this.axes.add( this.buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true ) ); //-X
	this.axes.add( this.buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); //+Y
	this.axes.add( this.buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); //-Y
	this.axes.add( this.buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); //+Z
	this.axes.add( this.buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); //-Z
	
	//return axes;
};

Axes3D.prototype.buildAxis = function( src, dst, colorHex, dashed ) {
	var geom = new THREE.Geometry(),
		mat;
		
	if( dashed ) {
		mat = new THREE.LineDashedMaterial( {
			linewidth: 3,
			color: colorHex,
			dashSize: 3,
			gapSize: 3
		} );
	} else {
		mat = new THREE.LineBasicMaterial( {
			linewidth: 3,
			color: colorHex
		} );
	}
	
	geom.vertices.push( src.clone() );
	geom.vertices.push( dst.clone() );
	geom.computeLineDistances(); //they said this is SUPER important, otherwise dashed lines will appear as simple plain lines
	
	var axis = new THREE.Line( geom, mat, THREE.LinePieces );
	
	return axis;
};

//gagal
Axes3D.prototype.setControls = function() {
	this.controls = new THREE.TrackballControls( this.camera );
}

Axes3D.prototype.draw = function( object ) {
	this.scene.add( object );
	this.animate();
};

Axes3D.prototype.remove = function( object ) {
	this.scene.remove( object );
	this.animate();
};

/*
Axes3D.prototype.clear = function() {
	this.init();
};*/

Axes3D.prototype.animate = function() {
	requestAnimationFrame( this.animate );
	this.controls.update();
	this.renderer.render( this.scene, this.camera );
};