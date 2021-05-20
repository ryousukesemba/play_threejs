const vertex = loadFile("./assets/shaders/vertex.glsl");
const fragment = loadFile("./assets/shaders/fragment.glsl");

class Sketch{
    constructor(){
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.querySelector("#container").appendChild( this.renderer.domElement );

        this.camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 3000 );
        this.camera.position.z = 1000;
        this.scene = new THREE.Scene();
        this.time = 0;
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.addMesh();
        this.render();
    };
    addMesh(){
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            uniforms: {
                //texture: { type: 't', value: ImageUtils.loadTexture("**.png")}
                progress: {type: "f", value: 0}
            },
            side: THREE.DoubleSide,
            wireframe: true,
        });
        //this.material = new THREE.MeshNormalMaterial({side: THREE.DoubleSide});

        let number = 512*512;
        //this.geometry = new THREE.PlaneBufferGeometry( 1000,1000 ,10,10);
        this.geometry = new THREE.BufferGeometry(  );
        this.positions = new THREE.BufferAttribute(new Float32Array(number * 3),3);

        let index = 0;
        for (let i = 0; i < 512; i++) {
            let posX = i - 256;
            for (let j = 0; j < 512; j++) {
                this.positions.setXYZ(index, posX*2, (j-256)*2, 0);
                index++;
            }
        }

        this.geometry.setAttribute("position",this.positions)

        this.mesh = new THREE.Points( this.geometry, this.material );
	    this.scene.add( this.mesh );
    }
    render(){  
        this.time++;
        // this.mesh.rotation.x += 0.01;
	    // this.mesh.rotation.y += 0.02;
        this.renderer.render( this.scene, this.camera );
        console.log(this.time);
        window.requestAnimationFrame(this.render.bind(this))
    }
}

new Sketch();




/////////////////////////////////////////////

function loadFile(url, data){
    var request = new XMLHttpRequest();
    request.open('GET', url, false);

    request.send(null);

    // リクエストが完了したとき
    if(request.readyState == 4){
        // Http status 200 (成功)
        if(request.status == 200){
            return request.responseText;
        }else{ // 失敗
            console.log("error");
            return null;
        }
    }
}