# Sky Banner Skeleton

This is a base to create a banner from scratch. This template are using createJs and tweenMax. You can see the versions in the file names.

### Adapt banner size

To change the size of the banner you need to modify:

    * Index.html
    * Main.css
    * Main.js - Check num 1

### IMPORTANT!
* Num 1:
    * You just need to change variables names here. This is for Google double click behavior.



## Things to change in Main.js    
    * var bannerSize = 'NxN';
    * devDynamicContent.Application_NxN= [{}];


## Legals.js

The script is going to take the canvas size and it is going to adapt the legals to the canvas.

## Chose your closing button in the legals

You have 2 close button legals

    * Circle X button
    * Hide legals button

To chose one of them you just need to add in the dynamic Content in the main.js the following line:

    devDynamicContent.Application_NxN[0].Legal_copy_close = 'Your text here';
