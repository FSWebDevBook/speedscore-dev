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

let mode = "FEED"; //The app's current mode

/* modeMenuIndices provides the sequence of actual indices into the  "sidemenu-item" DOM element
 * (an unordered list) for each mode. Since the menu items dynamically change based on the mode, 
 * having these sequences makes it much easier to determine the index of the first, last, 
 * previous, and next menu item when the user is using the keyboard to cycle through menu items.
 */
let modeMenuIndices = {
    "FEED": [0,1,4,5], 
    "ROUNDS": [2,4,5], 
    "COURSES": [3,4,5]
};

let focusIndex = 0; //the index of the current' modes menu item that has the focus. Index 0
                    //is the first item, 1 is the second item, and so forth. focusIndex 
                    //provides an index into the modeMenuIndices arrays

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
 * get the focus ("first" or "last"). If no param is supplied,  If the  button activation should close the menu, then
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
 * Handle keypress when the menuBtn has the focus. Keyboard semantics
 * taken from https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html
 *************************************************************************/
function keyDownMenuBtnFocused(e) {
    if (e.code === "ArrowDown" || e.code === "Space" || e.code === "Enter") {
        toggleSideMenu("first");
    } else if (e.code === "ArrowUp") { //open the menu and focus on last item
        toggleSideMenu("last");
    }
}



/*************************************************************************
 * @function keyDownMenuItemFocused
 * @desc 
 * Handle keypress when the menu is open and one of the menu items has the focus. Keyboard events
 * taken from https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html
 *************************************************************************/
function keyDownMenuItemFocused(e) {
    if (e.code == "Enter") { 
        //Choose menu item, close menu, and reset focus to menu btn
        toggleSideMenu();   
        document.getElementById("menuBtn").focus();
        alert("User chose menu item!")
    } else if (e.code == "Escape") {
        //Close menu without choosing item
        toggleSideMenu(); //Close menu
        document.getElementById("menuBtn").focus();
        alert("User chose to exit menu without selecting item.")
    } else if (e.code == "ArrowUp") {
        focusPrevMenuItem();
    } else if (e.code == "ArrowDown") {
        focusNextMenuItem();
    } else if (e.code == "Home") {
        focusFirstMenuItem();
    } else if (e.code == "End") {
        focusPrevMenuItem();
    } else {
        //Close menu without choosing item
        toggleSideMenu(); //Close menu
        document.getElementById("navbarBtn").focus();
    }
}

/*************************************************************************
 * document keydown -- When the user presses a keyboard button, we need
 * to check which item is currently focused and implement the correct
 * functinality. We are using the keyboard mappings specified in the w3c
 * navigatio menu sample:
 * https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-links.html
 *************************************************************************/
document.addEventListener("keydown", function(e) {  
    if (e.code == "Tab") { //We handle only non-tab events
        return;
    }
    const element = document.activeElement; //The item that currently has focus
    if (element.id === "menuBtn") { 
        //Keystroke happened when side menu button is focused
       keyDownMenuBtnFocused(e);
       e.preventDefault();
    } else if (element.getAttribute("role") == "menuitem") { 
        //Keystroke happened when side menu item is focused
        keyDownMenuItemFocused(e);
        e.preventDefault();
    }

});


  