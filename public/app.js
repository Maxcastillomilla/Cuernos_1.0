import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import { GLTFLoader } from './jsm/loaders/GLTFLoader.js'

/* import html2canvas from 'html2canvas'; */

let entero = 'valor'

let jsonMadera 
let typematerial = document.getElementById('qualitymaterial')

async function obtenerDatos() {
    try {
      const response = await fetch('/obtener');
      const data = await response.json();
      console.log(data);
      console.log('lista de precios');
      jsonMadera = data;
      console.log(jsonMadera);
      loadcuernos()   
    } catch (error) {
      console.error(error);
      alert('No pudimos cargar la Lista de precios, intenta mas tarde')
    }
  }
  
  obtenerDatos();


//--------------------------------

/**
 * Base
 */
// Debug
/* const gui = new dat.GUI() */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/* scene.background = new THREE.Color( 0xffffff ); */
/* scene.background = new THREE.Color( 0x21232a ); */




/**
 * Models
 */


const gltfLoader = new GLTFLoader()


let mixer = null

let metroscuadrados = 0

const textureLoader = new THREE.TextureLoader()

const doorHeightTexture = []
doorHeightTexture[0] = textureLoader.load('https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble02/textures/tallo/1mapaaltura.jpg')
doorHeightTexture[1] = textureLoader.load('https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble02/textures/tallo/1mapaaltura2.jpg')
doorHeightTexture[2] = textureLoader.load('https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble02/textures/tallo/1mapaaltura3.jpg')

console.log(doorHeightTexture)



//changes

let altomm
let anchomm

const backgroundcolor = document.getElementById('color');
backgroundcolor.addEventListener("change", () =>{
    cambiocolor() 

    /* console.log(backgroundcolor.value) */
    
    
});




const textura = document.getElementById('quality');
textura.addEventListener("change", () =>{
    loadcuernos() 
    focus()
    changetexture()

    /* console.log(backgroundcolor.value) */
    
    
});

const imagenruta = ['https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble02/imagenes/SAMPLE.png','https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble02/imagenes/SAMPLE2.png','https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble02/imagenes/SAMPLE3.png']

const imagetexture = document.getElementById('materialimage');
const changetexture = ()=>{
    imagetexture.src = imagenruta[textura.value]
}







const AlturaSlider = document.getElementById('myRange');
AlturaSlider.addEventListener("change", () =>{
    loadcuernos() 
    focus()
    
});

const HorizontalSlider = document.getElementById('myRange2');
HorizontalSlider.addEventListener("change", () =>{
    loadcuernos() 
    focus()
 
});

let size = document.getElementById('size')
size.addEventListener("change", () =>{
    loadcuernos() 
    focus()
 
});

let objetos = document.getElementById('objetos')
objetos.addEventListener("change", () =>{
    loadcuernos() 
    focus()
 
});




typematerial.addEventListener("change", () =>{
    loadcuernos() 
    focus()
 
});

/* const Horizontaloffset = document.getElementById('myRange3');
Horizontaloffset.addEventListener("change", () =>{

    offsetH = Number(Horizontaloffset.value) 
    console.log(offsetH)
    loadcuernos() 
    focus()
 
}); */


/* const Verticaloffset = document.getElementById('myRange4');
Verticaloffset.addEventListener("change", () =>{

    offsetV = Number(Verticaloffset.value) 
    console.log(offsetV)
    loadcuernos() 
    focus()
 
}); */






//sprite


function makeTextSprite( message, parameters )
    {
        if ( parameters === undefined ) parameters = {};
        var fontface = parameters.hasOwnProperty("fontface") ? parameters["fontface"] : "Courier New";
        var fontsize = parameters.hasOwnProperty("fontsize") ? parameters["fontsize"] : 18;
        var borderThickness = parameters.hasOwnProperty("borderThickness") ? parameters["borderThickness"] : 4;
        var borderColor = parameters.hasOwnProperty("borderColor") ?parameters["borderColor"] : { r:0, g:0, b:0, a:1.0 };
        var backgroundColor = parameters.hasOwnProperty("backgroundColor") ?parameters["backgroundColor"] : { r:0, g:0, b:255, a:1.0 };
        var textColor = parameters.hasOwnProperty("textColor") ?parameters["textColor"] : { r:0, g:0, b:0, a:1.0 };

        var canvas = document.createElement('canvas');
        var context = canvas.getContext('2d');
        context.font = "Bold " + fontsize + "px " + fontface;
        var metrics = context.measureText( message );
        var textWidth = metrics.width;

        context.fillStyle   = "rgba(" + backgroundColor.r + "," + backgroundColor.g + "," + backgroundColor.b + "," + backgroundColor.a + ")";
        context.strokeStyle = "rgba(" + borderColor.r + "," + borderColor.g + "," + borderColor.b + "," + borderColor.a + ")";
        context.fillStyle = "rgba("+textColor.r+", "+textColor.g+", "+textColor.b+", 1.0)";
        context.fillText( message, borderThickness, fontsize + borderThickness);

        var texture = new THREE.Texture(canvas) 
        texture.needsUpdate = true;
        var spriteMaterial = new THREE.SpriteMaterial( { map: texture, useScreenCoordinates: false } );
        var sprite = new THREE.Sprite( spriteMaterial );
        sprite.scale.set(0.5 * fontsize, 0.25 * fontsize, 0.75 * fontsize);
        return sprite;  
    }
















const Mvertical = [null,null, 'p2.gltf', 'p3.gltf', 'p4.gltf', 'p5.gltf', 'p6.gltf']
const Mhorizontal = [null,null, 'h2.gltf', 'h3.gltf', 'h4.gltf', 'h5.gltf', 'h6.gltf']
const cablesa = [null,null, '2av.gltf', '3av.gltf','4av.gltf', '5av.gltf','6av.gltf']
const cablesb = [null,null, '2bv.gltf', '3bv.gltf','4bv.gltf', '5bv.gltf','6bv.gltf']


let palovertical = null
let palohorizontal = null
let thecable = null
let thecabledos = null

let typecable1 = []

let typecable2 = []


let distanciavertical = 4.9
/* let offsetH = Number(Horizontaloffset.value)  */

/* let offsetV = Number(Verticaloffset.value) */

function esPar(numero) 
{ 
  return (numero % 2) == 0; 
} 




 


let materialcolor = [null, '#c8ae9c','#6a3d23']



function loadcuernos(){

    let precio = document.getElementById('precio')

    /* precio.innerHTML = '$ ' + (100 * HorizontalSlider.value + 150 * AlturaSlider.value) */
    



    
    
    while(scene.getObjectByName('Scene')){
        scene.remove(scene.getObjectByName('Scene'))
    }
    while(scene.getObjectByName('Scene')){
        scene.remove(scene.getObjectByName('Scene'))
    }


    //lineas 

    if (document.getElementById('size').checked) {



        let from = new THREE.Vector3(0, 0, 0);
let to = new THREE.Vector3(0, 1, 0);

let largoline = (Number(AlturaSlider.value)/2)*5.85

let arrowHelper11 = new THREE.ArrowHelper(to.normalize(), from, largoline, 0xFFFFFF, 0.3, 0.3);
let arrowHelper22 = new THREE.ArrowHelper(to.negate(), from, largoline, 0xFFFFFF, 0.3, 0.3);
arrowHelper11.name = 'Scene'
arrowHelper22.name = 'Scene'
            
scene.add( arrowHelper11, arrowHelper22 );  


let positiony = 5.4*(Number(AlturaSlider.value)/2)

arrowHelper11.position.set(-3,positiony,0)
arrowHelper22.position.set(-3,positiony,0)





let from2 = new THREE.Vector3(0, 0, 0);
let to2 = new THREE.Vector3(1, 0, 0);

let largoline2 = (Number(HorizontalSlider.value)/2)*6.45

let arrowHelper33 = new THREE.ArrowHelper(to2.normalize(), from2, largoline2, 0xFFFFFF, 0.3, 0.3);
let arrowHelper44 = new THREE.ArrowHelper(to2.negate(), from2, largoline2, 0xFFFFFF, 0.3, 0.3);
arrowHelper33.name = 'Scene'
arrowHelper44.name = 'Scene'
            
scene.add( arrowHelper33, arrowHelper44 );  

let positionx = 6.35*(Number(HorizontalSlider.value)/2)

arrowHelper33.position.set(positionx,0,7.5)
arrowHelper44.position.set(positionx,0,7.5)
    

// alturas y ancho


switch (+HorizontalSlider.value) {
    case 2:
        anchomm = 1064
        console.log('caso 2')
      break;
    case 3:
        anchomm = 1432
        console.log('caso 3')
      break;
    case 4:
        anchomm = 1800
        console.log('caso 4')
      break;
    case 5:
        anchomm = 2167
        console.log('caso 5')
      break;
    case 6:
        anchomm = 2535
        console.log('caso 6')
        
      break;
    default:
      // código a ejecutar si valor no está entre 2 y 6
      break;
  }



altomm = (114) + (365*AlturaSlider.value)
let spritey = makeTextSprite( altomm + " mm ", 
		{ fontsize: 18, textColor: {r:255, g:255, b:255, a:1.0}} );
	spritey.position.set(-5,positiony,0);
    spritey.name = 'Scene'
	scene.add( spritey );







    //anchomm = (115*2) + (367*HorizontalSlider.value)
    let spritey2 = makeTextSprite( anchomm + " mm ", 
		{ fontsize: 18, textColor: {r:255, g:255, b:255, a:1.0}} );
	spritey2.position.set(positionx,-0.01,15);
    spritey2.name = 'Scene'
	scene.add( spritey2 );







} 




 



    //vertical
    gltfLoader.load(
        'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble02/models/patas/'+Mvertical[HorizontalSlider.value],
        (gltf) =>
        {
            gltf.scene.traverse( function ( node ) {

                if ( node.isMesh || node.isLight ){
                    node.castShadow = true;
                    node.material.color =  new THREE.Color(materialcolor[typematerial.value])
                } 
            } )
            gltf.scene.scale.set(0.015, 0.015, 0.015)
            palovertical = gltf.scene
            
            scene.add(palovertical)


        
        }
    )
    //horizontal

    gltfLoader.load(
        'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble02/models/horizontal/'+Mhorizontal[HorizontalSlider.value],
        (gltf) =>
        {
            
            gltf.scene.traverse( function ( node ) {

                if ( node.isMesh || node.isLight ){
                    node.castShadow = true;
                    /* node.material.displacementMap = doorHeightTexture */
                } 
                if ( node.isMesh ){
                    
                    console.log("displaaaaa")

                    node.material.displacementMap = doorHeightTexture[textura.value]
                    //idea
                    node.material.color =  new THREE.Color(materialcolor[typematerial.value])
                    console.log(node.material.displacementMap)

                    node.material.displacementMap.flipY = false
                    if(textura.value == 2){
                        node.material.displacementScale = 16
                    } else{
                        node.material.displacementScale = 16
                    }
                    
                    

                } 

                
                
            } )


            gltf.scene.scale.set(0.015, 0.015, 0.015)
            
            palohorizontal = gltf.scene
            palohorizontal.name = 'Scene'
            
            /* gltf.scene.position.x += 2.45 * HorizontalSlider.value */
            
            scene.add(palohorizontal)


            for (let i = 1; i < Number(AlturaSlider.value) + 1; i++) {
                let clone = palohorizontal.clone()
                let distance2 = 5.7 * i
                
                clone.position.y += 5.4 * i 
                /* clone.position.x += 2.45 * HorizontalSlider.value */
                scene.add(clone)

             }
        }
    )




//cables try

// parte 1


    gltfLoader.load(
        'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble02/models/ventana/'+cablesa[HorizontalSlider.value],
        (gltf) =>
        {
            console.log("leeeeeeeeeee")
            gltf.scene.traverse( function ( node ) {
    
                if ( node.isMesh || node.isLight ) {
                    node.castShadow = true;
                    node.material.opacity = 0.3;
                }
            } )
            gltf.scene.scale.set(0.015, 0.015, 0.015)
            thecable = gltf.scene
            thecable.name = 'Scene'
            /* gltf.scene.position.x += 2.385  */
            /* scene.add(thecable) */
    
            typecable1 = []
            typecable1.push(thecable)
            





            for (let i = 0; i < Number(AlturaSlider.value); i++) {
                if(esPar(i)){
                    typecable1.forEach(e =>{
                        console.log(e)
                        let clonefinal = e.clone()
                        clonefinal.position.y += 5.4 * (i)
                        scene.add(clonefinal)
            
                        console.log("xddddddddd")
                
                       }) 
                }
                else{
                    console.log("nada1")
                }      
            }     




















        }
    )
//parte 2


    gltfLoader.load(
        'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble02/models/ventana/'+cablesb[HorizontalSlider.value],
        (gltf) =>
        {
            gltf.scene.traverse( function ( node ) {
    
                if ( node.isMesh || node.isLight ){
                    node.castShadow = true;
                    node.material.opacity = 0.15;
                } 
            } )
            gltf.scene.scale.set(0.015, 0.015, 0.015)
            thecabledos = gltf.scene
            thecabledos.name = 'Scene'
            /* gltf.scene.position.x += 2.385  */
            /* scene.add(thecable) */
            typecable2 = []
            typecable2.push(thecabledos)





            for (let i = 0; i < Number(AlturaSlider.value); i++) {
                if(esPar(i)){
                    console.log("nada2")
                }
                else{
                    typecable2.forEach(e =>{
                        console.log(e)
                        let clonefinal = e.clone()
                        clonefinal.position.y += 5.4 * (i)
                        scene.add(clonefinal)
                        console.log("xddddddddd22")
                
                       }) 
                } 






        }
        
})



if (document.getElementById('objetos').checked) {

//figura

let figura = null


gltfLoader.load(
    'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble03/models/figura/scene.gltf',
    (gltf) =>
    {
        
        gltf.scene.traverse( function ( node ) {

            if ( node.isMesh || node.isLight ){
                node.castShadow = true;
                /* node.material.displacementMap = doorHeightTexture */
            }             
        } )


        gltf.scene.scale.set(0.22, 0.22, 0.22)
        gltf.scene.rotation.set( 0, 2 * Math.PI * (90 / 360), 0 )
        

        
        
        figura = gltf.scene
        figura.position.y += 6.9
        figura.position.x += 4.5
        figura.position.z += 2
        figura.name = 'Scene'

        
        
        /* gltf.scene.position.x += 2.45 * HorizontalSlider.value */
        
        scene.add(figura)
    }
)


//planta

let planta = null


gltfLoader.load(
    'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble03/models/plant/scene.gltf',
    (gltf) =>
    {
        
        gltf.scene.traverse( function ( node ) {

            if ( node.isMesh || node.isLight ){
                node.castShadow = true;
                /* node.material.displacementMap = doorHeightTexture */
            }             
        } )


        gltf.scene.scale.set(13, 13, 13)
        gltf.scene.rotation.set( 0, 2 * Math.PI * (90 / 360), 0 )
        

        
        
        planta = gltf.scene
        planta.position.y += 3.5
        planta.position.x += 10.6
        planta.position.z += 2
        planta.name = 'Scene'

        
        
        /* gltf.scene.position.x += 2.45 * HorizontalSlider.value */
        
        scene.add(planta)
    }
)
}

     
     


    
       

    typecable1 = []
    typecable2 = []



    let tablashorizontal = ((anchomm / 1000) * 0.31)*(parseFloat(AlturaSlider.value) + 1)
    /* let tablasvertical = (0.05 * (altomm / 1000)) * 2 * (parseFloat(HorizontalSlider.value)+1) */

    metroscuadrados = tablashorizontal // + tablasvertical
    
      
    console.log('jsonmadera = ' + jsonMadera)
    let materialmadera
    /* obtenerDatos(); */
    let preciomaderas = jsonMadera[typematerial.value].precio || 'ERROR';
    console.log('precio maderas= '+ preciomaderas )
    
    entero = Math.trunc(metroscuadrados *  preciomaderas) // [typematerial.value] 
    

    precio.innerHTML = '$ ' + entero.toLocaleString('es-MX')


     





}





/* loadcuernos() */








/* const light = new THREE.AmbientLight( 0xffffff ); // soft white light
light.intensity = 10
scene.add( light ); */

let geometry = new THREE.BoxGeometry( 0.5, 3, 0.16 );
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
let cube = new THREE.Mesh( geometry, material );
/* scene.add( cube ); */










/**
 * Floor
 */
 const smaterial = new THREE.ShadowMaterial();
 smaterial.opacity = 0.35;
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(300, 300),
    smaterial
)
/* scene.fog = new THREE.Fog(0x21232a , 150, 200); */
floor.receiveShadow = true

floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 70
directionalLight.shadow.camera.left = - 70
directionalLight.shadow.camera.top = 70
directionalLight.shadow.camera.right = 70
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(- 10, 14, 15)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: document.getElementById('conter').offsetWidth,
    height: document.getElementById('conter').offsetHeight
}

window.addEventListener('resize', () =>
{
    setTimeout(()=>{
        // Update sizes
    sizes.width = document.getElementById('conter').offsetWidth 
    sizes.height = document.getElementById('conter').offsetHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setPixelRatio(2)
    renderer.antialias= true 
    }, 100)
    
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 200)
camera.position.set(-8, 20, 25)

scene.add(camera)



// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(2.5 * Number(HorizontalSlider.value), 2.6 * Number(AlturaSlider.value) , 0)
controls.enableDamping = true

//angulo
controls.maxPolarAngle = 2 * Math.PI * (90 / 360)
controls.maxDistance = 60
controls.minDistance = 14
controls.panSpeed = 0.5

controls.minAzimuthAngle = -2 * Math.PI * (115 / 360)
controls.maxAzimuthAngle = 2 * Math.PI * (115 / 360)



function focus(){
    controls.target.set( 2.5 * Number(HorizontalSlider.value), 2.6 * Number(AlturaSlider.value) , 0)
    let gradedistance = 0.5 + (Number(HorizontalSlider.value)*0.1) + (Number(AlturaSlider.value)*0.1)
    camera.position.set(-8*gradedistance, 20*gradedistance, 25*gradedistance)
    controls.update();
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
/* renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) */
//cambio
renderer.setPixelRatio(2)
renderer.alpha = true
renderer.setClearColor( 0xffffff, 0);



renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 2.5

scene.background = new THREE.Color( backgroundcolor.value )

function cambiocolor(){
    
    scene.background = new THREE.Color( backgroundcolor.value )

}


// ENVERIO 

const cubeTextureLoader = new THREE.CubeTextureLoader()

const environmentMap = cubeTextureLoader.load([
    'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble02/textures/environmentMaps/4/px.png',
    'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble02/textures/environmentMaps/4/nx.png',
    'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble02/textures/environmentMaps/4/py.png',
    'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble02/textures/environmentMaps/4/ny.png',
    'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble02/textures/environmentMaps/4/pz.png',
    'https://raw.githubusercontent.com/Maxcastillomilla/Mueblesasset/main/mueble02/textures/environmentMaps/4/nz.png'

])



scene.environment = environmentMap



/* gui
    .add(renderer, 'toneMapping', {
        No: THREE.NoToneMapping,
        Linear: THREE.LinearToneMapping,
        Reinhard: THREE.ReinhardToneMapping,
        Cineon: THREE.CineonToneMapping,
        ACESFilmic: THREE.ACESFilmicToneMapping
    })
    .onFinishChange(() =>
    {
        renderer.toneMapping = Number(renderer.toneMapping)
        updateAllMaterials()
    })
 */


/* gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001) */



//pay


let elementosdos = document.querySelectorAll('input')
      
     


     
// no se
      /* for (let i = 0; i < elementosdos.length; i++) {

         elementosdos[i].addEventListener("input", () =>{
            document.getElementById('myrangevalue7').innerHTML = parseFloat(profundidad.value * 0.25).toFixed(2);

    

             document.getElementById('myrangevalue7').innerHTML += "M"
             

             document.getElementById('myrangevalue2').innerHTML = parseFloat(HorizontalSlider.value * 0.7).toFixed(2);
    
         document.getElementById('myrangevalue2').innerHTML += "M"

         document.getElementById('myrangevalue').innerHTML = parseFloat(AlturaSlider.value * 0.7).toFixed(2);

            document.getElementById('myrangevalue').innerHTML += "M"

            document.getElementById('myrangevalue3').innerHTML = Number(Horizontaloffset.value) + 1

            document.getElementById('myrangevalue4').innerHTML = Number(Verticaloffset.value) + 1

         })
    } */








    const carrocompra = document.getElementById("carrocompra")
const recuadro = document.getElementById("recuadro")


let executed = true;

carrocompra.addEventListener("click", () =>{
  loadcuernos() 
  document.getElementById("preciomercado").value = metroscuadrados;
  document.getElementById("materialmercado").value = typematerial.value;
  console.log(document.getElementById("preciomercado").value )
   console.log('click carro')
   submitmercado()
   
    
})

const submitmercado = () =>{
  setTimeout(function(){
  let formulario = document.getElementById('formpago');
   formulario.submit();
   console.log('listo')
}, 300);
  
} 






/**
 * Animate
 */
let stop = false



const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    if(!stop){
        const elapsedTime = clock.getElapsedTime()
        const deltaTime = elapsedTime - previousTime
        previousTime = elapsedTime

        // Model animation
        if(mixer)
        {
            mixer.update(deltaTime)
        }

        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)

    }
    
}

tick()