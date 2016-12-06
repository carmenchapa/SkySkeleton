//Properties
var bannerSize = 'NxN';
var separationLegalTop = 40;
var numberID = 1234564789;

//Items and main variables
var advert,
    preloader,
    queue,
    stage,
    data,
    animation;

//Containers
var frame1Container,
    frame2Container,
    frame3Container,
    frame4Container,
    frame5Container;

// Positions outsite Canvas
var outXLeftCanvas,
    outXRightCanvas,
    outYBottomCanvas,
    outYTopCanvas;

// Need it for frame time control
var ctx;

window.onload = function(){
    if (Enabler.isInitialized()) {
        init();
    } else {
        Enabler.addEventListener(studio.events.StudioEvent.INIT, init);
    }
};

function init() {
    if (Enabler.isPageLoaded()) {
    	pageLoadedHandler();
    } else {
    	Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED, pageLoadedHandler);
    }
}

function pageLoadedHandler() {
    if (Enabler.isVisible()) {
    	adVisibilityHandler();
    } else {
    	Enabler.addEventListener(studio.events.StudioEvent.VISIBLE, adVisibilityHandler);
    }
}

function adVisibilityHandler() {
    setElements();
    setDynamicProfile();
    addClickHandler();
}

function setElements(){
    advert = document.getElementById('advert');
    preloader = document.getElementById('preloader');
}

function addClickHandler() {
    document.querySelector('.advert-border').onclick = function(e) {
        Enabler.exitOverride('exit', data.Click_Tag);
    };
}

function setDynamicProfile() {
	Enabler.setProfileId(numberID);
    var devDynamicContent = {};
    devDynamicContent.Application_NxN= [{}];
    devDynamicContent.Application_NxN[0]._id = 0;
    devDynamicContent.Application_NxN[0].Click_Tag = "https://www.sky.com";
    devDynamicContent.Application_NxN[0].Image_assets = 'https://s0.2mdn.net/ads/richmedia/studio/NumberForlder/';
    devDynamicContent.Application_NxN[0].Legal_button_copy = 'Legal bits';
    devDynamicContent.Application_NxN[0].Legal_copy = 'Write legals text here';
    /* This line is opctional. It is use to add Hide legals button inted of the closing circle*/
    /*devDynamicContent.Application_NxN[0].Legal_copy_close = '';*/

    Enabler.setDevDynamicContent(devDynamicContent);

    data = dynamicContent.Application_NxN[0];
    createPreloader();
}

function createPreloader() {
    var path = window.location.host.search('localhost') != -1 ? 'img/' : data.Image_assets;
    queue = new createjs.LoadQueue('true', path);
	queue.addEventListener('complete', loadComplete);
	queue.loadManifest([
        // {id:'', src:''},
        {id:'logo', src:'logo.png'}
	]);
}

function loadComplete() {
    createCanvasStage();
    setVariablesPositions();
    createContainers();
    removePreloader();
    //Legals.js ↓
    createLegals();
    startAdvert();
}

function createCanvasStage() {
    stage = new createjs.Stage('stage');
    stage.enableMouseOver();
    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.setFPS(20);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.MotionGuidePlugin.install();
    ctx = stage.canvas.getContext('2d');
}

function setVariablesPositions(){
    outXLeftCanvas = -stage.canvas.width;
    outXRightCanvas = stage.canvas.width *2;
    outYTopCanvas = -stage.canvas.width;
    outYBottomCanvas = stage.canvas.height * 2;
}

function createContainers() {
    frame1Container = new createjs.Container();
    frame2Container = new createjs.Container();
    frame2Container.opacity = 0;
    frame3Container = new createjs.Container();
    frame3Container.opacity = 0;
    frame4Container = new createjs.Container();
    frame4Container.opacity = 0;
    frame5Container = new createjs.Container();
    frame5Container.opacity = 0;
    skyContainer = new createjs.Container();
    stage.addChild(frame1Container, frame2Container, frame3Container, frame4Container, frame5Container, skyContainer);
}

function removePreloader() {
    advert.removeChild(preloader);
}

function startAdvert() {
    var timeFrame1 = 6000;
    var timeFrame2 = 5000;
    var timeFrame3 = 5000;
    var timeFrame4 = 5000;

    createSkyIcons();
	createFrameOne();
    setTimeout(cleanFrameOne, timeFrame1);
    setTimeout(createFrameTwo, timeFrame1);
    setTimeout(cleanFrameTwo, timeFrame1 + timeFrame2);
    setTimeout(createFrameThree, timeFrame1 + timeFrame2);
    setTimeout(cleanFrameThree, timeFrame1 + timeFrame2 + timeFrame3);
    setTimeout(createFrameFour, timeFrame1 + timeFrame2 + timeFrame3);
    setTimeout(cleanFrameFour, timeFrame1 + timeFrame2 + timeFrame3 + timeFrame4);
    setTimeout(createFrameFive, timeFrame1 + timeFrame2 + timeFrame3 + timeFrame4);
}

function cleanFrameOne(){
    frame1Container.alpha = 0;
}

function cleanFrameTwo(){
    frame2Container.alpha = 0;
}

function cleanFrameThree(){
    frame3Container.alpha = 0;
}

function cleanFrameFour(){
    frame4Container.alpha = 0;
}

function createSkyIcons(){
    // logo = new createjs.Bitmap(queue.getResult('logo'));
    // logo.setCenterImage('center', 'center');
    // logo.setPositions('center',540);
}

function createFrameOne(){
    createiItemsFrameOne();
    animationFrameOne();
}


function createiItemsFrameOne(){
    frame1Container.addChild();
}

function animationFrameOne(){

}

function createFrameTwo(){

}

function createiItemsFrameTwo(){
    frame2Container.addChild();
}

function animationFrameTwo(){

}

function createFrameThree(){
    createiItemsFrameThree();
    animationFrameThree();
}

function createiItemsFrameThree(){
    frame3Container.addChild();
}

function animationFrameThree(){

 }

function createFrameFour(){
    createiItemsFrameFour();
    animationFrameFour();
}

function createiItemsFrameFour(){
    frame4Container.addChild();
}

function animationFrameFour(){

}

function createFrameFive(){
    createiItemsFrameFive();
    animationFrameFive();
}

function createiItemsFrameFive(){
    frame5Container.addChild();
}

function animationFrameFive(){

}

createjs.Bitmap.prototype.setPositions = function(x, y){
    if(x === 'Center' || x === 'center') {
        if(this.regX !== 0){
            this.x = Math.floor(stage.canvas.width/2);
        } else {
            this.x = Math.floor(stage.canvas.width/2 - this.image.width/2);
        }
    } else {
        this.x = x;
    }

    if(y === 'Center' || y === 'center') {
        if(this.regY !== 0){
            this.y = Math.floor(stage.canvas.height/2);

        } else {
            this.y = Math.floor(stage.canvas.height/2 - this.image.height/2);
        }
    } else {
        this.y = y;
    }
    return this;
};

createjs.Bitmap.prototype.setCenterImage = function(regX, regY){
    if(typeof regX === 'string' && (regX == 'Center' || regX ===  'center')){
        this.regX = Math.floor(this.image.width/2);
    } else if(typeof regX == 'number'){
        this.regX = regX;
    } else {
        this.regX = 0;
    }
    if(typeof regY == 'string' && (regY === 'Center' || regY ===  'center')){
        this.regY = Math.floor(this.image.height/2);
    } else if(typeof regY == 'number'){
        this.regY = regY;
    } else {
        this.regY = 0;
    }
    return this;
};

createjs.Container.prototype.setCenterContainer = function(regX, regY){
    if(typeof regX === 'string' && (regX == 'Center' || regX ===  'center')){
        this.regX = Math.floor(this.getBounds().width/2);
    } else if(typeof regX == 'number'){
        this.regX = regX;
    } else {
        this.regX = 0;
    }
    if(typeof regY == 'string' && (regY === 'Center' || regY ===  'center')){
        this.regY = Math.floor(this.getBounds().height/2);
    } else if(typeof regY == 'number'){
        this.regY = regY;
    } else {
        this.regY = 0;
    }
    return this;
};



createjs.Container.prototype.setPositions = createjs.Sprite.prototype.setPositions = createjs.Bitmap.prototype.setPositions;
