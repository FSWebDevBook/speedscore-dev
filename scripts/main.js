/*************************************************************************
 * File: main.js
 * Desc: Contains the JavaScript functions to handle interaction with the
 * SpeedScore apps. The general philosophy is to abstract the UI 
 * interactions (e.g., "activate button" instead of "button click") to
 * accommodate both mouse-based (visual) interaction and keyboard-based
 * (acessible) interaction.
*************************************************************************/

/*************************************************************************
 * GLOBAL VARIABLES TO ASSIST WITH MAINTAINING INTERFACE STATE
*************************************************************************/

let mode = "feedMode"; //The app's current mode
let prevMode = ""; //We use this variable to save current mode before switching to a
                   //non-mode page like "settings" or "login"
let page = "main"; //The current mode page. Upon login in, the app is on feedMode's main page
let modes = ["loginMode","feedMode","roundsMode","coursesMode"];
let focusedModeIndex = 1; //The index (into modes) of the mode tab that has the focus
const mobileWidthThreshold = 768; //Assume a mobile device has a width of < 768 pixels  

/* modeMenuIndices provides the sequence of actual indices into the  "sidemenu-item" DOM element
 * (an unordered list) for each mode. Since the menu items dynamically change based on the mode, 
 * having these sequences makes it easy to determine the index of the first, last, 
 * previous, and next menu item when the user is using the keyboard to cycle through menu items.
 */
const modeMenuIndices = {
    "feedMode": [0,1,4,5,6], 
    "roundsMode": [2,4,5,6], 
    "coursesMode": [3,4,5,6]
};  

let focusedMenuItemIndex = 0; //the index of the current mode's menu item that has the focus. Index 0
                    //is the first item, 1 is the second item, and so forth. focusedMenuItemIndex 
                    //provides an index into the arrays in the modeMenuIndices object.
                    //Think of it as a "pointer to a pointer."


/*************************************************************************
 * HELPER AND UTILITY FUNCTIONS
*************************************************************************/

/*************************************************************************
 * @function isMobile
 * @description
 * Returns true if the current window viewport size suggests user is using
 * a mobile device, false otherwise.
 *************************************************************************/
function isMobile() {
    const width = window.innerWidth;
    return (window.innerWidth <= mobileWidthThreshold);
}