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

/* modeMenuIndices provides the sequence of actual indices into the  "sidemenu-item" DOM element
 * (an unordered list) for each mode. Since the menu items dynamically change based on the mode, 
 * having these sequences makes it much easier to determine the index of the first, last, 
 * previous, and next menu item when the user is using the keyboard to cycle through menu items.
 */
let modeMenuIndices = {
    "feedMode": [0,1,4,5], 
    "roundsMode": [2,4,5], 
    "coursesMode": [3,4,5]
};

var modeToTitle = {"feedMode": "Activity Feed",
                   "roundsMode": "My Rounds",
                   "coursesMode": "Courses",
                   "loginMode": "Welcome to SpeedScore"};

let focusIndex = 0; //the index of the current mode's menu item that has the focus. Index 0
                    //is the first item, 1 is the second item, and so forth. focusIndex 
                    //provides an index into the arrys in the modeMenuIndices object.
                    //Think of it as a "pointer to a pointer."

/*************************************************************************
 * SIDE MENU INTERACTION
 * The following functions implement the functionality of the side menu
 * for both the visual and accessible keyboard interface.
 * We use the w3.org  "Navigation Button Example" as a 
 * specification for implementing the accessible keyboard interface:
 * https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html
*************************************************************************/     

/*************************************************************************
 * @function focusFirstMenuItem
 * @desc 
 * Shift the focus to the first menu item.
 *************************************************************************/
function focusFirstMenuItem() {
    focusIndex = 0;
    const sideMenuItems = document.getElementsByClassName("sidemenu-item");
    const mIndex = modeMenuIndices[mode][focusIndex];
    sideMenuItems[mIndex].firstElementChild.focus();
}

/*************************************************************************
 * @function focusLastMenuItem
 * @desc 
 * Shift the focus to the last menu item.
 *************************************************************************/
function focusLastMenuItem() {
    const sideMenuItems = document.getElementsByClassName("sidemenu-item");
    focusIndex = modeMenuIndices[mode].length - 1;
    sideMenuItems[modeMenuIndices[mode][focusIndex]].firstElementChild.focus();
}

/*************************************************************************
 * @function focusPrevMenuItem
 * @desc 
 * Shift the focus to the item before the currently focused menu item.
 * If the currently focused menu item is the first item, then the focus
 * should shift to the last menu item.
 *************************************************************************/                    
function focusPrevMenuItem() {
    const sideMenuItems = document.getElementsByClassName("sidemenu-item");
    focusIndex = (focusIndex == 0 ? modeMenuIndices[mode].length-1 : focusIndex - 1);
    sideMenuItems[modeMenuIndices[mode][focusIndex]].firstElementChild.focus();
}

/*************************************************************************
 * @function focusNextMenuItem
 * @desc 
 * Shift the focus to the item after the currently focused menu item.
 * If the currently focused menu item is the last item, then the focus
 * should shift to the first menu item.
 *************************************************************************/
function focusNextMenuItem() {
    const sideMenuItems = document.getElementsByClassName("sidemenu-item");
    focusIndex = (focusIndex ==  modeMenuIndices[mode].length-1 ? 0 : focusIndex + 1);
    sideMenuItems[modeMenuIndices[mode][focusIndex]].firstElementChild.focus();
}

/*************************************************************************
 * @function toggleSideMenu
 * @desc 
 * Open or close the side menu based on current menu state.
 * @param focusItem (optional)
 * Relevant only if we're opening the menu. Indicates which menu item should
 * get the focus ("first" or "last"). If no param is supplied,  
 * the focusItem param is ignored.
 *************************************************************************/
function toggleSideMenu(focusItem)  {
    const sideMenu = document.getElementById("sideMenuNav");
    const sideMenuIcon = document.getElementById("menuBtnIcon");
    const sideMenuBtn = document.getElementById("menuBtn");
    if (sideMenuIcon.classList.contains("fa-bars")) { //OPEN MENU
        //Change menu icon  
        sideMenuIcon.classList.remove("fa-bars");
        sideMenuIcon.classList.add("fa-times");
        //Open menu
        sideMenu.classList.remove("sidemenu-closed");
        sideMenu.classList.add("sidemenu-open");
        sideMenuBtn.setAttribute("aria-expanded","true");
        //Place focus on appropriate menu item
        if (focusItem == "last") { //set focus to last item
            focusLastMenuItem();
        } else if (focusItem == "first") { //set focus to first item
            focusFirstMenuItem();
        }
        //Otherwise, user clicked with mouse so we do need to set focus.
    } else { //CLOSE MENU
        //Change menu icon
        sideMenuIcon.classList.remove("fa-times");
        sideMenuIcon.classList.add("fa-bars");
        //Close menu
        sideMenu.classList.remove("sidemenu-open");
        sideMenu.classList.add("sidemenu-closed");
        sideMenuBtn.setAttribute("aria-expanded","false");
    }
}


/*************************************************************************
 * @function navbarBtn click handler
 * @desc 
 * When the user clicks the navbarBtn, open or close the side menu 
 * based on current menu state. Remapped to toggleSideMenu
 *************************************************************************/
 document.getElementById("menuBtn").addEventListener("click", toggleSideMenu);

/*************************************************************************
 * @function keyDownMenuBtnFocused
 * @desc 
 * Handle keypress when the menuBtn has the focus. Permissible keypresses
 * are the arrow keys, space, and enter. All other keys are ignored.
 * @param key
 * The description of the key that was pressed.
 *************************************************************************/
function keyDownMenuBtnFocused(key) {
    if (key === "ArrowDown" || key === "Space" || key === "Enter") {
        toggleSideMenu("first");
    } else if (key === "ArrowUp") { //open the menu and focus on last item
        toggleSideMenu("last");
    }
}


/*************************************************************************
 * @function keyDownMenuItemFocused
 * @desc 
 * Handle keypress when the menu is open and one of the menu items has 
 * focus. Permissible keypresses are Enter, Escape, Up Arrow, Down Arrow,
 * Home, and End.
 * @param key
 * The key that was pressed.
 * TO DO: The specification says that the user should be able to type 
 * the first character of a menu item to move to it and that other
 * keypresses are ignored. This functionality will be left as an
 * exercise.
 *************************************************************************/
function keyDownMenuItemFocused(key) {
    if (key == "Enter") { 
        //Choose menu item, close menu, and reset focus to menu btn
        toggleSideMenu();   
        document.getElementById("menuBtn").focus();
        alert("User chose menu item!")
    } else if (key == "Escape") {
        //Close menu without choosing item
        toggleSideMenu(); //Close menu
        document.getElementById("menuBtn").focus();
    } else if (key == "ArrowUp") {
        focusPrevMenuItem();
    } else if (key == "ArrowDown") {
        focusNextMenuItem();
    } else if (key == "Home") {
        focusFirstMenuItem();
    } else if (key == "End") {
        focusLastMenuItem();
    } else {
        //Close menu without choosing item
        toggleSideMenu(); //Close menu
        document.getElementById("navbarBtn").focus();
    }
}

/*************************************************************************
 * MODE BAR INTERACTION
 * The following functions implement the functionality of the bottom mode
 * bar for both the visual and accessible keyboard interface.
 * We use the w3.org  "Example of Tabs with Manual Activiation" as a 
 * specification for implementing the accessible keyboard interface:
 * https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
*************************************************************************/     

/*************************************************************************
 * @function switchMode 
 * @Desc 
 * Switch from the current mode to a new mode. This entails unhighlighting
 * the bottom bar btn corresponding to the current mode, highlighting 
 * the bottom bar btn corresponding to the new mode, updating the global
 * mode variable, and changing the menu items to reflect the new mode.
 * @param newMode
 * The string corresponding to the new mode (feedMode, roundsMode, 
 * coursesMode, loginMode)
 *************************************************************************/
function switchMode(newMode) {
    let prevModeBtn = document.getElementById(mode);
    let newModeBtn = document.getElementById(newMode);
    //Switch mode button that is highlighted
    prevModeBtn.classList.remove("modebar-selected");
    prevModeBtn.classList.add("modebar-unselected");
    newModeBtn.classList.remove("modebar-unselected");
    newModeBtn.classList.add("modebar-selected");
    //Change page title
    document.getElementById("appTitle").textContent = modeToTitle[newMode];
    //Swap out page content
    document.getElementById(mode + "Page").style.display = "none";
    document.getElementById(newMode + "Page").style.display = "block";
    //Change menu items
    let oldItems = document.getElementsByClassName(mode + "-item");
    let newItems = document.getElementsByClassName(newMode + "-item");
    for (let i = 0; i < oldItems.length; ++i) {
    oldItems[i].style.display = "none";
    }
    for (let i = 0; i < newItems.length; ++i) {
    newItems[i].style.display = "block";
    }
    mode = newMode; //Change mode
}

function keyDownModeBarFocused(key) {

}

//Bind "click" event listener for each mode button to switchMode, passing in the name of
//the new mode. Note: The following code is equivalent to this:
// document.getElementById("feedMode").addEventListener("click",() => switchMode("feedMode"));
// document.getElementById("roundsMode").addEventListener("click",() => switchMode("roundsMode"));
// document.getElementById("coursesMode").addEventListener("click",() => switchMode("coursesMode"));
const bottomBtns = document.getElementsByClassName("modebar-btn");
for (let i = 0; i < bottomBtns.length; ++i) {
    bottomBtns[i].addEventListener("click",() => switchMode(bottomBtns[i].id));
}


/*************************************************************************
 * @function Document Keydown Event Handler 
 * @desc 
 * When the user presses a keyboard button in the app, we interpret the
 * keypress based on which user interface element currently has focus. 
 *************************************************************************/
 document.addEventListener("keydown", function(e) {  
    if (e.code == "Tab") { //We allow tab events to pass through.
        return;
    }
    const element = document.activeElement; //The item that currently has focus
    if (element.id === "menuBtn") { 
        //Handle keypress when menu button has focus
       keyDownMenuBtnFocused(e.code);
      
    } else if (element.getAttribute("role") == "menuitem") { 
        //Handle key press when side menu item has focus
        keyDownMenuItemFocused(e.code);
        
    }
    //We are handling the interaction here, so prevent default routing.
    e.preventDefault(); 

});

  