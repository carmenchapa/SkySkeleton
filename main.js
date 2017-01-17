//Properties
var bannerSize = 'NxN';
var numberID = 1234564789;

//Items and main variables
var advert,
    preloader,
    queue,
    stage,
    data,
    animation;

//Containers
var frame1_container,
    frame2_container,
    frame3_container,
    frame4_container,
    frame5_container;

// Positions outsite Canvas
var canvasWidth,
    canvasWidth,
    middleCanvasWidth,
    middleCanvasHeight,
    outXLeftCanvas,
    outXRightCanvas,
    outYBottomCanvas,
    outYTopCanvas;

// Need it for frame time control
var ctx;

window.onload = function() {
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
    bgExitHandler();
}

function setElements() {
    advert = document.getElementById('advert');
    preloader = document.getElementById('preloader');
}

function bgExitHandler() {
    document.querySelector('.advert-border').onclick = function(e) {
        Enabler.exitOverride('exit', data.Click_Tag);
    };
}

function setDynamicProfile() {
    Enabler.setProfileId(numberID);

    var devDynamicContent = {};
    devDynamicContent.Application_NxN = [{}];
    devDynamicContent.Application_NxN[0]._id = 0;
    devDynamicContent.Application_NxN[0].Reporting_Label = "Reporting Label";
    devDynamicContent.Application_NxN[0].Image_assets = "https://s0.2mdn.net/ads/richmedia/studio/Folder_Num";
    // ReadMe: In order for this to work the feed needs to be published once.

    // ReadMe: TX component, first span line height as big as the logo height;
    devDynamicContent.Application_NxN[0].frame1_tx_small = '<span style="line-height: 18px;"></span><br><span>Show Title</span><br><span>Season</span><br><span>Avalability</span>';
    devDynamicContent.Application_NxN[0].Click_Tag = "https://www.sky.com";
    devDynamicContent.Application_NxN[0].Legal_button_copy = 'Legal bits';
    devDynamicContent.Application_NxN[0].Legal_copy = 'Write legals text here';
    /* This line is optional. It is use to add Hide legals button inted of the closing circle*/
    /*devDynamicContent.Application_NxN[0].Legal_copy_close = '';*/

    Enabler.setDevDynamicContent(devDynamicContent);

    data = dynamicContent.Application_NxN[0];

    createPreloader();
}

function createPreloader() {
    var path = window.location.host.search('localhost') != -1 ? 'img/' : data.content;
    queue = new createjs.LoadQueue('true', path);
    queue.addEventListener('complete', loadComplete);
    queue.loadManifest([
        // {id:'', src:''},
        { id: 'logo', src: 'logo.png' },
        { id: 'frame1_image', src: 'frame1_image.png' },
        { id: 'frame1_logo', src: 'frame1_logo.png' },
        { id: 'text', src: 'text.png' }
    ]);
}

function loadComplete() {
    createCanvasStage();
    setVariablesPositions();
    createContainers();
    removePreloader();
    createLegals();
    startAdvert();
}

function createCanvasStage() {
    stage = new createjs.Stage('stage');
    stage.enableMouseOver();
    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.setFPS(24);
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.MotionGuidePlugin.install();
    ctx = stage.canvas.getContext('2d');
}

function setVariablesPositions() {
    canvasWidth = stage.canvas.width;
    canvasHeight = stage.canvas.height;
    outXLeftCanvas = -canvasWidth;
    outXRightCanvas = canvasWidth * 2;
    outYTopCanvas = -canvasHeight;
    outYBottomCanvas = canvasHeight * 2;
    middleCanvasWidth = Math.floor(canvasWidth * 0.5);
    middleCanvasHeight = Math.floor(canvasHeight * 0.5);
}

function createContainers() {
    frame1_container = new createjs.Container();
    frame2_container = new createjs.Container();
    frame2_container.alpha = 0;
    frame3_container = new createjs.Container();
    frame3_container.alpha = 0;
    frame4_container = new createjs.Container();
    frame4_container.alpha = 0;
    frame5_container = new createjs.Container();
    frame5_container.alpha = 0;
    skyContainer = new createjs.Container();
    skyContainer.alpha = 0;

    stage.addChild(frame1_container, frame2_container, frame3_container, frame4_container, frame5_container, skyContainer);
}

function removePreloader() {
    advert.removeChild(preloader);
}

var timeFrame1 = 10000000;
var timeFrame2 = 4000;
var timeFrame3 = 5000;
var timeFrame4 = 4000;

function startAdvert() {
    createSkyIcons();
    createFrameOne();

    setTimeout(Frame1_Clean, timeFrame1);
    setTimeout(Frame2_Create, timeFrame1);
    setTimeout(Frame2_Clean, timeFrame1 + timeFrame2);
    setTimeout(Frame3_Create, timeFrame1 + timeFrame2);
    setTimeout(Frame3_Clean, timeFrame1 + timeFrame2 + timeFrame3);
    setTimeout(Frame4_Create, timeFrame1 + timeFrame2 + timeFrame3);
    setTimeout(Frame4_Clean, timeFrame1 + timeFrame2 + timeFrame3 + timeFrame4);
    setTimeout(Frame5_Create, timeFrame1 + timeFrame2 + timeFrame3 + timeFrame4);

}

function createSkyIcons() {
    logo = new createjs.Bitmap(queue.getResult('logo'));
    logo.setRegPoints('center', 'center');
    logo.setPositions(80, 200);

    skyContainer.addChild(logo);
}

function createFrameOne() {
    Frame1_CreateItems();
    Frame1_animation();
}

// Frames' set-up and animation.
function Frame1_CreateItems() {

    frame1_logo = new createjs.Bitmap(queue.getResult('frame1_logo'));
    frame1_image = new createjs.Bitmap(queue.getResult('frame1_image'));

    frame1_container.dynamicText(frame1_image, frame1_logo, data.frame1_tx_small);

    frame1_txt = new createjs.Bitmap(queue.getResult('text'));
    frame1_txt.setRegPoints('center', 'center');
    frame1_txt.setPositions(75, 75);
    frame1_txt.alpha = 1;

    frame1_container.addChild(frame1_txt);
}

function Frame1_animation() {
    createjs.Tween.get(skyContainer).to({ alpha: 1 });
    frame1_txt.sheen(500, 3000);
    frame1_txt.sheen2(4000, 1500);

    createjs.Tween.get(frame1_container).wait(timeFrame1).to({ alpha: 0 });
}

function Frame2_Create() {
    Frame2_CreateItems();
    Frame2_animation();
}

function Frame2_CreateItems() {
    frame2_container.addChild();
}

function Frame2_animation() {
    createjs.Tween.get(frame2_container).to({ alpha: 1 });

    createjs.Tween.get(frame2_container).wait(timeFrame2).to({ alpha: 0 });
}

function Frame3_Create() {
    Frame3_CreateItems();
    Frame3_animation();
}

function Frame3_CreateItems() {
    frame3_container.addChild();
}

function Frame3_animation() {
    createjs.Tween.get(frame3_container).to({ alpha: 1 });

    createjs.Tween.get(frame3_container).wait(timeFrame3).to({ alpha: 0 });
}

function Frame4_Create() {
    Frame4_CreateItems();
    Frame4_animation();
}

function Frame4_CreateItems() {
    frame4_container.addChild();
}

function Frame4_animation() {
    createjs.Tween.get(frame4_container).to({ alpha: 1 });

    createjs.Tween.get(frame4_container).wait(timeFrame3).to({ alpha: 0 });
}

function Frame5_Create() {
    Frame5_CreateItems();
    Frame5_animation();
}

function Frame5_CreateItems() {
    frame5_container.addChild();
}

function Frame5_animation() {
    createjs.Tween.get(frame5_container).to({ alpha: 1 });
}


/* CLEAN FUNCTIONS */
/* Don't change these functions. If you need to do a transition do
   it with alpha in the frame animation function.
   Last frame don't have clean function */

function Frame1_Clean() {
    frame1_container.opacity = 0;
}

function Frame2_Clean() {
    frame2_container.opacity = 0;
}

function Frame3_Clean() {
    frame3_container.opacity = 0;
}

function Frame4_Clean() {
    frame4_container.opacity = 0;
}


// Defining Additional Functionalities

createjs.Bitmap.prototype.setPositions = function(x, y) {
    if (x === 'Center' || x === 'center') {
        if (this.regX !== 0) {
            this.x = middleCanvasWidth;
        } else {
            this.x = Math.floor(middleCanvasWidth - this.image.width / 2);
        }
    } else {
        this.x = x;
    }

    if (y === 'Center' || y === 'center') {
        if (this.regY !== 0) {
            this.y = Math.floor(middleCanvasHeight);

        } else {
            this.y = Math.floor(middleCanvasHeight - this.image.height / 2);
        }
    } else {
        this.y = y;
    }
    return this;
};

createjs.Bitmap.prototype.setRegPoints = function(regX, regY) {
    if (typeof regX === 'string' && (regX == 'Center' || regX === 'center')) {
        this.regX = Math.floor(this.image.width / 2);
    } else if (typeof regX == 'number') {
        this.regX = regX;
    } else {
        this.regX = 0;
    }
    if (typeof regY == 'string' && (regY === 'Center' || regY === 'center')) {
        this.regY = Math.floor(this.image.height / 2);
    } else if (typeof regY == 'number') {
        this.regY = regY;
    } else {
        this.regY = 0;
    }
    return this;
};

createjs.Container.prototype.setRegPoints = function(regX, regY) {
    if (typeof regX === 'string' && (regX == 'Center' || regX === 'center')) {
        this.regX = Math.floor(this.getBounds().width / 2);
    } else if (typeof regX == 'number') {
        this.regX = regX;
    } else {
        this.regX = 0;
    }
    if (typeof regY == 'string' && (regY === 'Center' || regY === 'center')) {
        this.regY = Math.floor(this.getBounds().height / 2);
    } else if (typeof regY == 'number') {
        this.regY = regY;
    } else {
        this.regY = 0;
    }
    return this;
};

createjs.Container.prototype.setPositions = createjs.Sprite.prototype.setPositions = createjs.Bitmap.prototype.setPositions;

createjs.Container.prototype.dynamicTxd = function(image, logo, text) {
    var TXTextContainer = new createjs.Container();
    TXTextContainer.setBounds(0, 0, image.image.width, image.image.height);

    var separationFromLogo = 4;

    var TXHtmlElment = document.createElement("p");
    TXHtmlElment.classList.add('txProperties');
    TXHtmlElment.innerHTML = text;
    document.getElementById("advert").appendChild(TXHtmlElment);

    // POSITION TX AND LOGO TX
    var separationX = 6;
    var separationY = 4;

    var TXTextdomElement = new createjs.DOMElement(TXHtmlElment);
    TXTextdomElement.setBounds(0, 0, TXHtmlElment.clientWidth, TXHtmlElment.clientHeight);
    logo.regX = logo.image.width;
    TXTextdomElement.regX = TXTextdomElement.getBounds().width;
    logo.y = TXTextdomElement.y = image.image.height - TXTextdomElement.getBounds().height - separationY;
    logo.x = TXTextdomElement.x = image.image.width - separationX;
    TXTextContainer.addChild(TXTextdomElement, logo);

    imageContainer = new createjs.Container();
    imageContainer.setBounds(0, 0, image.image.width, image.image.height);
    imageContainer.addChild(image, TXTextContainer);
    this.addChild(imageContainer);
};

createjs.Bitmap.prototype.sheen = function(delay, time) {
    if (!delay) { delay = 500; }
    if (!time) { time = 1000; }

    var imageClone = this.clone();
    imageClone.cache(0, 0, this.image.width, this.image.height);

    var sheenContainer = new createjs.Container();
    sheenContainer.setBounds(0, 0, this.image.width, this.image.height);
    sheenContainer.regX = this.regX;
    sheenContainer.regY = this.regY;
    sheenContainer.x = this.x;
    sheenContainer.y = this.y;
    sheenContainer.filters = [new createjs.AlphaMaskFilter(imageClone.cacheCanvas)];
    sheenContainer.cache(0, 0, sheenContainer.getBounds().width, sheenContainer.getBounds().height);

    var sheenLine = new createjs.Shape();
    sheenLine.graphics.beginLinearGradientFill(['transparent', 'rgba(255,255,255,0.5)', '#fff', 'rgba(255,255,255,0.5)', 'transparent'], [0.3, 0.4, 0.5, 0.6, 0.75], 0, 0, this.image.width * 2, this.image.height).drawRect(0, 0, this.image.width * 2, this.image.height);
    sheenLine.alpha = 1;
    sheenLine.x = -sheenContainer.getBounds().width * 2;
    sheenLine.cache(0, 0, this.image.width * 2, this.image.height);


    sheenContainer.addChild(sheenLine);

    sheenLine.addEventListener('tick', cacheContainer);

    function cacheContainer() {
        sheenContainer.cache(0, 0, sheenContainer.getBounds().width, sheenContainer.getBounds().height);
        sheenLine.cache(0, 0, sheenContainer.getBounds().width * 2, sheenContainer.getBounds().height);
    }

    createjs.Tween.get(sheenLine).wait(delay).to({ alpha: 1 }).to({ x: sheenContainer.x * 2 }, time, createjs.Ease.sineOut).call(function() {
        sheenContainer.removeEventListener('tick', cacheContainer, false);
        sheenContainer.parent.removeChild(sheenContainer);
    });

    this.parent.addChild(sheenContainer);
};
