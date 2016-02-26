/// <reference path="_reference.ts"/>
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var RingGeometry = THREE.RingGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
var CScreen = config.Screen;
var Clock = THREE.Clock;
var FirstPersonControls = THREE.FirstPersonControls;
//Custom Game Objects
var gameObject = objects.gameObject;
// setup an IIFE structure (Immediately Invoked Function Expression)
var game = (function () {
    var scene = new Scene();
    var renderer;
    var camera;
    var axes;
    var plane;
    var sphere;
    var sphereGeometry;
    var ringGeometry;
    //sun
    var sun;
    var sunMaterial;
    var sunGeometry;
    //planets
    var pdan;
    var pdanMaterial;
    var pdanGeometry;
    var pdanPivObj = new THREE.Object3D();
    var pryan;
    var pryanMaterial;
    var pryanGeometry;
    var pryanPivObj = new THREE.Object3D();
    var pamir;
    var pamirMaterial;
    var pamirGeometry;
    var pamirPivObj = new THREE.Object3D();
    var pger;
    var pgerMaterial;
    var pgerGeometry;
    var pgerPivObj = new THREE.Object3D();
    var pfran;
    var pfranMaterial;
    var pfranGeometry;
    var pfranPivObj = new THREE.Object3D();
    var pfranRings;
    var pfranRingsMaterial;
    var pfranRingsPivObj = new THREE.Object3D();
    var pken;
    var pkenMaterial;
    var pkenGeometry;
    var pkenPivObj = new THREE.Object3D();
    var sphereMaterial;
    var ambientLight;
    var spotLight;
    var control;
    var gui;
    var stats;
    var step = 0;
    var clock;
    var firstPersonControls;
    function init() {
        // Instantiate a new Scene object
        //scene = new Scene();
        // setup a THREE.JS Clock object
        clock = new Clock();
        setupRenderer(); // setup the default renderer
        setupCamera(); // setup the camera
        //Add a Plane to the Scene
        plane = new gameObject(new PlaneGeometry(20, 20, 1, 1), new LambertMaterial({ color: 0xf4a460 }), 0, 0, 0);
        plane.rotation.x = -0.5 * Math.PI;
        plane.name = "ground";
        //scene.add(plane);
        console.log("Added Plane Primitive to scene...");
        // Add a Sphere to the Scene
        sphereGeometry = new SphereGeometry(2.5, 32, 32);
        sphereMaterial = new LambertMaterial({ color: 0xff0000 });
        sphere = new gameObject(sphereGeometry, sphereMaterial, 4, 2.5, 0);
        sphere.name = "The Red Planet";
        //scene.add(sphere);
        console.log("Added Sphere Primitive to the scene");
        ///////////////////////////////////////////////////////////////
        //Add a Sun to the Scene
        sunGeometry = new SphereGeometry(2.5, 32, 32);
        sunMaterial = new LambertMaterial({ color: 0xff0000 });
        sun = new gameObject(sphereGeometry, sphereMaterial, 0, 0, 0);
        sun.name = "The Red Sun";
        sun.add(pkenPivObj);
        sun.add(pdanPivObj);
        sun.add(pryanPivObj);
        sun.add(pamirPivObj);
        sun.add(pfranPivObj);
        sun.add(pgerPivObj);
        scene.add(sun);
        console.log("Added Sun Primitive to the scene");
        //Add a Planet Dan to the Scene
        pdanGeometry = new SphereGeometry(1.5, 20, 20);
        pdanMaterial = new LambertMaterial({ color: 0x800080 });
        pdan = new gameObject(pdanGeometry, pdanMaterial, 0, 0, 5);
        pdan.name = "The Asian Planet";
        pdanPivObj.add(pdan);
        scene.add(pdanPivObj);
        console.log("Added Asian Planet Primitive to the scene");
        //Add a Planet Ryan to the Scene
        pryanGeometry = new SphereGeometry(1, 15, 20);
        pryanMaterial = new LambertMaterial({ color: 0x0000FF });
        pryan = new gameObject(pryanGeometry, pryanMaterial, 0, 0, 9);
        pryan.name = "The Blue Planet";
        pryanPivObj.add(pryan);
        scene.add(pryanPivObj);
        console.log("Added Blue Planet Primitive to the scene");
        //Add a Planet Kevin to the Scene
        pkenGeometry = new SphereGeometry(1.5, 20, 20);
        pkenMaterial = new LambertMaterial({ color: 0xffff00 });
        pken = new gameObject(pkenGeometry, pkenMaterial, 0, 0, 12);
        pken.name = "The Other Asian Planet";
        pkenPivObj.add(pken);
        scene.add(pkenPivObj);
        console.log("Added Other Asian Planet Primitive to the scene");
        //Add a Planet Amir to the Scene
        pamirGeometry = new SphereGeometry(3, 20, 20);
        pamirMaterial = new LambertMaterial({ color: 0xA52A2A });
        pamir = new gameObject(pamirGeometry, pamirMaterial, 0, 0, 20);
        pamir.name = "The Brown Planet";
        pamirPivObj.add(pamir);
        scene.add(pamirPivObj);
        console.log("Added Brown Planet Primitive to the scene");
        //Add a Planet Francis to the Scene
        pfranGeometry = new SphereGeometry(2.5, 20, 10);
        pfranMaterial = new LambertMaterial({ color: 0x0C090A });
        pfran = new gameObject(pfranGeometry, pfranMaterial, 0, 0, 30);
        pfran.name = "The Blacker Planet";
        pfranPivObj.add(pfranRingsPivObj);
        pfranPivObj.add(pfran);
        scene.add(pfranPivObj);
        console.log("Added Blacker Planet Primitive to the scene");
        //Rings addition to Planet Francis
        var rung = new THREE.RingGeometry(23, 35, 32);
        var bat = new MeshBasicMaterial({ color: 0xFFFFFF, side: THREE.DoubleSide });
        pfranRings = new THREE.Mesh(rung, bat);
        scene.add(pfranRings);
        pfran.add(pfranRings);
        console.log("The White Rings");
        //Add a Planet Geri to the Scene
        pgerGeometry = new SphereGeometry(1, 10, 50);
        pgerMaterial = new LambertMaterial({ color: 0xFFFFFF });
        pger = new gameObject(pgerGeometry, pgerMaterial, 0, 0, 15);
        pger.name = "The White Planet";
        pgerPivObj.add(pger);
        scene.add(pgerPivObj);
        console.log("Added White Planet Primitive to the scene");
        //////////////////////////////////////////////////////////////
        // setup first person controls
        firstPersonControls = new FirstPersonControls(sphere);
        firstPersonControls.lookSpeed = 0.4;
        firstPersonControls.movementSpeed = 10;
        firstPersonControls.lookVertical = true;
        firstPersonControls.constrainVertical = true;
        firstPersonControls.verticalMin = 0;
        firstPersonControls.verticalMax = 2.0;
        firstPersonControls.lon = -150;
        firstPersonControls.lat = 120;
        // add an axis helper to the scene
        axes = new AxisHelper(50);
        sun.add(axes);
        console.log("Added Axis Helper to scene...");
        // Add an AmbientLight to the scene
        ambientLight = new AmbientLight(0x090909);
        scene.add(ambientLight);
        console.log("Added an Ambient Light to Scene");
        // Add a SpotLight to the scene
        spotLight = new SpotLight(0xffffff);
        spotLight.position.set(5.6, 23.1, 5.4);
        spotLight.rotation.set(-0.8, 42.7, 19.5);
        spotLight.intensity = 2;
        spotLight.angle = 60 * (Math.PI / 180);
        spotLight.distance = 400;
        spotLight.decay = 0.1;
        spotLight.castShadow = true;
        spotLight.shadowCameraNear = 1;
        spotLight.shadowMapHeight = 2048;
        spotLight.shadowMapWidth = 2048;
        scene.add(spotLight);
        console.log("Added a SpotLight Light to Scene");
        // add controls
        gui = new GUI();
        control = new Control(0.05, 50);
        addControl(control);
        // Add framerate stats
        addStatsObject();
        console.log("Added Stats to scene...");
        document.body.appendChild(renderer.domElement);
        gameLoop(); // render the scene	
    }
    function addControl(controlObject) {
        gui.add(controlObject, 'rotationSpeed', -0.5, 0.5);
        gui.add(controlObject, 'zoom', 0, 100);
    }
    function addStatsObject() {
        stats = new Stats();
        stats.setMode(0);
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';
        document.body.appendChild(stats.domElement);
    }
    // Setup main game loop
    function gameLoop() {
        stats.update();
        var delta = clock.getDelta();
        sphere.rotation.y += control.rotationSpeed;
        pdanPivObj.rotation.y += control.rotationSpeed * 0.1;
        pryanPivObj.rotation.y += control.rotationSpeed * 0.05;
        pamirPivObj.rotation.y += control.rotationSpeed * 0.08;
        pfranPivObj.rotation.y += control.rotationSpeed * 0.04;
        pgerPivObj.rotation.y += control.rotationSpeed * 1.5;
        pkenPivObj.rotation.y += control.rotationSpeed * 0.09;
        pfranRingsPivObj.rotation.set(0, 32, 0);
        //zoom in diagonally
        camera.position.y = control.zoom;
        camera.position.z = -control.zoom;
        firstPersonControls.update(delta);
        // render using requestAnimationFrame
        requestAnimationFrame(gameLoop);
        // render the scene
        renderer.render(scene, camera);
    }
    // Setup default renderer
    function setupRenderer() {
        renderer = new Renderer();
        renderer.setClearColor(0x0c0c0c, 1.0);
        renderer.setSize(CScreen.WIDTH, CScreen.HEIGHT);
        //renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMap.enabled = true;
        console.log("Finished setting up Renderer...");
    }
    // Setup main camera for the scene
    function setupCamera() {
        camera = new PerspectiveCamera(45, config.Screen.RATIO, 0.1, 1000);
        //camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.x = 0.6;
        camera.position.y = 50;
        camera.position.z = -40.5;
        camera.lookAt(new Vector3(0, 0, 0));
        console.log("Finished setting up Camera...");
    }
    window.onload = init;
    return {
        scene: scene
    };
})();
//# sourceMappingURL=game.js.map