function Object3D( objColor, frame, axes3D ) {
	this.scene = axes3D;
	this.meshMaterial = new THREE.MeshBasicMaterial( {
		color: (objColor === undefined) ? "#000" : objColor,
		wireframe: (frame === undefined) ? true : frame
	} );
}

// creating and removing object

Object3D.prototype.createCube = function( length, x, y, z ) {
	this.createBox( length, length, length, x, y, z );
	//alert( "bakaerrroooooooo" );
}

Object3D.prototype.createBox = function( vx, vy, vz, x, y, z ) {
	if( this.box!=null )
		this.removeBox();
	this.box = new THREE.Mesh( new THREE.CubeGeometry( vx, vy, vz ), this.meshMaterial );
	this.box.position.set( x, y, z );
	this.scene.draw( this.box );
}

Object3D.prototype.createSphere = function( r, x, y, z ) {
	if( this.sphere!=null )
		this.removeSphere();
	this.sphere = new THREE.Mesh( new THREE.SphereGeometry( r ), this.meshMaterial );
	this.sphere.position.set( x, y, z );
	this.scene.draw( this.sphere );
}

Object3D.prototype.removeBox = function() {
	this.scene.remove( this.box );
}

Object3D.prototype.removeSphere = function() {
	this.scene.remove( this.sphere );
}

Object3D.prototype.clear = function() {
	this.scene.remove( this.box );
	this.scene.remove( this.sphere );
}


// object transformation

Object3D.prototype.rotate = function( degrees, axis ) {
	
}

Object3D.prototype.translateBox = function( x, y, z ) {
	this.box.translateX(x);
	this.box.translateY(y);
	this.box.translateZ(z);
}

Object3D.prototype.translateSphere = function( x, y, z ) {
	this.sphere.translateX(x);
	this.sphere.translateY(y);
	this.sphere.translateZ(z);
}