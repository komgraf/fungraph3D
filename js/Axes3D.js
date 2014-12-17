// membuat renderer: penampil 3D dalam bidang 2D
renderer = new THREE.WebGLRenderer( { antialias: true } );

// mendapatkan DOM untuk menampung koordinat 3D seisinya
// mengatur ukuran dan warna renderer (sesuai ukuran axesHolder dan warna hitam-#000)
// dilanjutkan dengan append renderer ke dalam DOM penampungnya
axesHolder = document.getElementById( 'axes' );
renderer.setSize( axesHolder.offsetWidth, axesHolder.offsetHeight );
renderer.setClearColorHex( "#000", 1.0 );
axesHolder.appendChild( renderer.domElement );

// membuat scene, tempat koordinat 3D seisinya, yang dirender oleh renderer
scene = new THREE.Scene();

// membuat koordinat 3D dan menambahkannya ke dalam scene
axes = buildAxes( 1000 );
scene.add( axes );

// setting camera dan lighting
buildCamera();

// menganimasikan-mengaktifkan- semuamuamuanya, dipanggil setiap saat, sehingga jika ada perubahan selalu dijalankan
animate();

/** 
* bikin koordinat 3D, dari setiap garis axis
* @param length panjang setiap axis
* @return koordinat 3D (axes) yang telah dibuat sebagai gabungan masing-masing axis
*/
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

/** 
* bikin part koordinat 3D, titik 0,0,0 adalah tepat tengah dari 'scene'
* @param src vektor awal axis
* @param dst vektor akhir axis
* @param colorHex warna axis
* @param dashed true apabila axis garis putus-putus
* @return axis yang telah dibuat
*/
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

/**
* mengatur kamera
* cameranya dari PerspectiveCamera
* controls merupakan control camera, dari class TrackBallControls
* lighting menggunakan 2 jenis cahaya, ambient light dan point light
* ambient light memberikan warna tambahan pada SELURUH permukaan dalam scene, sebagai warna campuran
* point light sumber cahaya yang seperti lampu, berupa titik dengan arah pancaran ke segala arah
*/
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
	
	var ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
	scene.add( ambientLight );
	
	var pointLight1 = new THREE.PointLight( "#FFF", 1 );
	pointLight1.position.set( 50, 50, -50 );
	scene.add( pointLight1 );
	
	var pointLight2 = new THREE.PointLight( "#FFF", 1 );
	pointLight2.position.set( -90, 20, -50 );
	scene.add( pointLight2 );
}

/**
* melakukan 'animasi'
* request animation frame untuk merequest animasi, yo pokoke ngono
* update controls
* dan merender scene dengan cameranya
*/
function animate() {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render( scene, camera );
}


/*****************************
* creating and removing object
******************************/

// variabel penyimpan box, cube, dan sphere yang dibuat. box radigawe :V
var box, cube, sphere;
/*
var meshMaterial;

meshMaterial = new THREE.MeshBasicMaterial( {
	color: "rgb(51,153,255)",
	wireframe: false
} );*/

/**
* membuat kubus
* CubeGeometry elemen (objek) untuk membuat geometri kubus
* MeshPhongMaterial elemen (objek) untuk mengatur material kubus, berupa phong, dengan warna dan ke-kinclongan tertentu
* set posisi kubus berdasarkan pusatnya
* kubus yang dibuat ditambahkan dalam scene
* @param length panjang siis kubus
* @param r komponen warna RED sisi kubus
* @param g komponen warna GREEN sisi kubus
* @param b komponen warna BLUE sisi kubus
* @param x komponen x koordinat pusat kubus
* @param y komponen y koordinat pusat kubus
* @param z komponen z koordinat pusat kubus
*/
function createCube( length, r, g, b, x, y, z ) {
	if( cube!=null ) {
		removeCube();
	}
	cube = new THREE.Mesh( new THREE.CubeGeometry( length, length, length ), new THREE.MeshPhongMaterial( { color: "rgb("+ r +","+ g +","+ b +")", shininess: 20 } ) );
	cube.position.set( x, y, z );
	scene.add( cube );
	/* buat cek rotasi bener apa gak, meh pake label males nyari -> sprite
	var entah = new THREE.Mesh( new THREE.CubeGeometry( length, length*2, length ), meshMaterial );
	entah.position.set( 0, length*2, 0 );
	cube.add( entah );*/
}

/**
* membuat box (balok)
* BoxGeometry elemen (objek) untuk membuat geometri balok
* MeshPhongMaterial elemen (objek) untuk mengatur material balok, berupa phong, dengan warna dan ke-kinclongan tertentu
* set posisi balok berdasarkan pusatnya
* balok yang dibuat ditambahkan dalam scene
* @param ax panjang balok, sebenere ada 2 lagi, ay dan az karena balok, ya, karena balok punya lebar dan tinggi (panjang-lebar-tinggi or width-height-depth)
* @param r komponen warna RED sisi balok
* @param g komponen warna GREEN sisi balok
* @param b komponen warna BLUE sisi balok
* @param x komponen x koordinat pusat balok
* @param y komponen y koordinat pusat balok
* @param z komponen z koordinat pusat balok
*/
function createBox( ax, r, g, b, x, y, z ) {
	if( box!=null ) {
		removeBox();
	}
	//box = new THREE.Mesh( new THREE.CubeGeometry( ax, ax, ax ), new THREE.MeshBasicMaterial( { color: "rgb("+ r +","+ g +","+ b +")", wireframe: false } ) );
	box = new THREE.Mesh( new THREE.CubeGeometry( ax, ax, ax ), new THREE.MeshPhongMaterial( { color: "rgb("+ r +","+ g +","+ b +")", shininess: 20 } ) );
	box.position.set( x, y, z );
	scene.add( box );
}

/**
* membuat bola
* SphereGeometry elemen (objek) untuk membuat geometri bola
* MeshPhongMaterial elemen (objek) untuk mengatur material bola, berupa phong, dengan warna dan ke-kinclongan tertentu
* set posisi bola berdasarkan pusatnya
* bola yang dibuat ditambahkan dalam scene
* @param radius panjang jari-jari (radius) bola
* @param r komponen warna RED sisi bola
* @param g komponen warna GREEN sisi bola
* @param b komponen warna BLUE sisi bola
* @param x komponen x koordinat pusat bola
* @param y komponen y koordinat pusat bola
* @param z komponen z koordinat pusat bola
*/
function createSphere( radius, r, g, b, x, y, z ) {
	if( sphere!=null ) {
		removeSphere();
	}
	//sphere = new THREE.Mesh( new THREE.SphereGeometry( radius ), new THREE.MeshBasicMaterial( { color: "rgb("+ r +","+ g +","+ b +")", wireframe: false } ) );
	sphere = new THREE.Mesh( new THREE.SphereGeometry( radius ), new THREE.MeshPhongMaterial( { color: "rgb("+ r +","+ g +","+ b +")", shininess: 20 } ) );
	sphere.position.set( x, y, z );
	scene.add( sphere );
}

/**
* menghilangkan objek (variabel) cube dari scene
*/
function removeCube() {
	scene.remove( cube );
}

/**
* menghilangkan objek (variabel) box dari scene
*/
function removeBox() {
	scene.remove( box );
}

/**
* menghilangkan objek (variabel) sphere dari scene
*/
function removeSphere() {
	scene.remove( sphere );
}

/**
* menghilangkan semua objek dalam scene 'secara paksa' (karena ada kemungkinan suatu objek tak ada dalam scene, contohnya box) dengan memanggil fungsi removeCube(), removeBox(), dan removeSphere()
*/
function clear() {
	removeCube();
	removeBox();
	removeSphere();
}


/*****************************
* object transformation
* blok kode transformasi objek 3D
******************************/

/**
* fungsi translasi Kubus
* menambahkan perpindahan masing-masing komponen sumbu pada masing-masing komponen koordinat kubus
* kemudian mengatur posisi kubus, di mana tampilan otomatis berubah karena adanya fungsi animate()
* @param x jauh perpindahan pada sumbu x
* @param y jauh perpindahan pada sumbu y
* @param z jauh perpindahan pada sumbu z
*/
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

/**
* fungsi translasi balok
* menambahkan perpindahan masing-masing komponen sumbu pada masing-masing komponen koordinat balok
* kemudian mengatur posisi balok, di mana tampilan otomatis berubah karena adanya fungsi animate()
* @param x jauh perpindahan pada sumbu x
* @param y jauh perpindahan pada sumbu y
* @param z jauh perpindahan pada sumbu z
*/
function translateBox( x, y, z ) {
	if( box!=null ) {
		ax = parseFloat( box.position.x )+parseFloat( x );
		ay = parseFloat( box.position.y )+parseFloat( y );
		az = parseFloat( box.position.z )+parseFloat( z );
		box.position.set( ax, ay, az );
	}
}

/**
* fungsi translasi Bola
* menambahkan perpindahan masing-masing komponen sumbu pada masing-masing komponen koordinat bola
* kemudian mengatus posisi bola, di mana tampilan otomatis berubah karena adanya fungsi animate()
* @param x jauh perpindahan pada sumbu x
* @param y jauh perpindahan pada sumbu y
* @param z jauh perpindahan pada sumbu z
*/
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

/**
* melakukan rotasi pada kubus
* menambahkan nilai rotasi dalam radian ke dalam atribut rotation cube pada masing-masing sumbu
* @param x besar derajat rotasi pada sumbu x
* @param y besar derajat rotasi pada sumbu y
* @param z besar derajat rotasi pada sumbu z
*/
function rotateCube( x, y, z ) {
	cube.rotation.x += x*Math.PI/180;
	cube.rotation.y += y*Math.PI/180;
	cube.rotation.z += z*Math.PI/180;
}

/**
* melakukan rotasi pada balok
* menambahkan nilai rotasi dalam radian ke dalam atribut rotation box pada masing-masing sumbu
* @param x besar derajat rotasi pada sumbu x
* @param y besar derajat rotasi pada sumbu y
* @param z besar derajat rotasi pada sumbu z
*/
function rotateBox( x, y, z ) {
	box.rotation.x += x*Math.PI/180;
	box.rotation.y += y*Math.PI/180;
	box.rotation.z += z*Math.PI/180;
}

/**
* melakukan rotasi pada bola
* menambahkan nilai rotasi dalam radian ke dalam atribut rotation sphere pada masing-masing sumbu
* @param x besar derajat rotasi pada sumbu x
* @param y besar derajat rotasi pada sumbu y
* @param z besar derajat rotasi pada sumbu z
*/
function rotateSphere( x, y, z ) {
	sphere.rotation.x += x*Math.PI/180;
	sphere.rotation.y += y*Math.PI/180;
	sphere.rotation.z += z*Math.PI/180;
}

/**
* melakukan scaling pada kubus
* memasukkan nilai skala ke dalam atribut scale cube pada masing-masing komponen panjang
* @param scale skala perbesaran kubus
*/
function scaleCube( scale ) {
	cube.scale.x = parseFloat( scale );
	cube.scale.y = parseFloat( scale );
	cube.scale.z = parseFloat( scale );
}

/**
* melakukan scaling pada balok
* memasukkan nilai skala ke dalam atribut scale box pada masing-masing komponen panjang
* @param scale skala perbesaran balok
*/
function scaleBox( scale ) {
	box.scale.x = parseFloat( scale );
	box.scale.y = parseFloat( scale );
	box.scale.z = parseFloat( scale );
}

/**
* melakukan scaling pada bola
* memasukkan nilai skala ke dalam atribut scale sphere pada masing-masing komponen panjang
* @param scale skala perbesaran bola
*/
function scaleSphere( scale ) {
	sphere.scale.x = parseFloat( scale );
	sphere.scale.y = parseFloat( scale );
	sphere.scale.z = parseFloat( scale );
}