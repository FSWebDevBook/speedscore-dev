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
let modes = ["loginMode","feedMode","roundsMode","coursesMode"];
let focusedModeIndex = 1; //The index (into modes) of the mode tab that has the focus

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

let focusedMenuItemIndex = 0; //the index of the current mode's menu item that has the focus. Index 0
                    //is the first item, 1 is the second item, and so forth. focusedMenuItemIndex 
                    //provides an index into the arrys in the modeMenuIndices object.
                    //Think of it as a "pointer to a pointer."

/*************************************************************************
 * SKIP LINK
 * The "skip link" is an accessbility feature that allows the user to 
 * skip an app's navigation sections and go right to the main content.
 * This is usually done using an href. However, we use JavaScript 
 * to accommodate SpeedScore's multiple mode pages.
*************************************************************************/    

/*************************************************************************
 * @function skipLink click
 * @desc 
 * When the user clicks on the click link, change the focus to the current
 * mode's content page.
 *************************************************************************/
document.getElementById("skipLink").addEventListener("click",function() {
    document.getElementById(mode + "Page").focus();
});

/*************************************************************************
 * @function keyDownSkipLinkFocused
 * @desc 
 * When the user presses either the Space or Enter key when the skip link
 * is focused, change the focus to the current mode's content page.
 *************************************************************************/
function keyDownSkipLinkFocused(key) {
    if (key === "Space" || key === "Enter") {
       document.getElementById("skipLink").click();
    }
 }


/*************************************************************************
 * SIDE MENU INTERACTION
 * The following functions implement the functionality of the side menu
 * for both the visual and accessible keyboard interface.
 * We use the w3.org  "Navigation Button Example" as a 
 * specification for implementing the accessible keyboard interface:
 * 
 * 
*************************************************************************/     

/*************************************************************************
 * @function focusFirstMenuItem
 * @desc 
 * Shift the focus to the first menu item.
 *************************************************************************/
function focusFirstMenuItem() {
    focusedMenuItemIndex = 0;
    const sideMenuItems = document.getElementsByClassName("sidemenu-item");
    sideMenuItems[modeMenuIndices[mode][focusedMenuItemIndex]].firstElementChild.focus();
}

/*************************************************************************
 * @function focusLastMenuItem
 * @desc 
 * Shift the focus to the last menu item.
 *************************************************************************/
function focusLastMenuItem() {
    focusedMenuItemIndex = modeMenuIndices[mode].length - 1;
    const sideMenuItems = document.getElementsByClassName("sidemenu-item");
    sideMenuItems[modeMenuIndices[mode][focusedMenuItemIndex]].firstElementChild.focus();
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
    focusedMenuItemIndex = (focusedMenuItemIndex == 0 ? modeMenuIndices[mode].length-1 : focusedMenuItemIndex - 1);
    sideMenuItems[modeMenuIndices[mode][focusedMenuItemIndex]].firstElementChild.focus();
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
    focusedMenuItemIndex = (focusedMenuItemIndex ==  modeMenuIndices[mode].length-1 ? 0 : focusedMenuItemIndex + 1);
    sideMenuItems[modeMenuIndices[mode][focusedMenuItemIndex]].firstElementChild.focus();
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
    const sideMenu = document.getElementById("sideMenu");
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
 document.getElementById("menuBtn").addEventListener("click", (e) => toggleSideMenu("first"));



/*************************************************************************
 * @function keyDownMenuBtnFocused
 * @desc 
 * Handle keypress when the menuBtn has the focus. Permissible keypresses
 * are the arrow keys, space, and enter. All other keys are ignored.
 * @param key
 * The description of the key that was pressed.
 *************************************************************************/
function keyDownMenuBtnFocused(key) {
    if (key === "ArrowDown" || key === "ArrowRight" || key === "Space" || key === "Enter") {
        toggleSideMenu("first");
    } else if (key === "ArrowUp" || key === "ArrowLeft") { //open the menu and focus on last item
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
    if (key === "Enter") { 
        //Choose menu item, close menu, and reset focus to menu btn
        toggleSideMenu();   
        document.getElementById("menuBtn").focus();
        alert("User chose menu item!")
    } else if (key === "Escape") {
        //Close menu without choosing menu item. We use setTimeout()
        //to ensure that screen readers register the menu as closed.
        //I've found toggling aria-expanded to false isn't registered
        //unless we introduce a small delay.
        setTimeout(toggleSideMenu,100); //Close menu
        document.getElementById("menuBtn").focus();
    } else if (key === "ArrowUp" || key == "ArrowLeft") {
        focusPrevMenuItem();
    } else if (key === "ArrowDown" || key == "ArrowRight") {
        focusNextMenuItem();
    } else if (key === "Home") {
        focusFirstMenuItem();
    } else if (key === "End") {
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
    prevModeBtn.setAttribute("aria-selected",false);
    newModeBtn.classList.remove("modebar-unselected");
    newModeBtn.classList.add("modebar-selected");
    newModeBtn.setAttribute("aria-selected",true);
    newModeBtn.focus();
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
    modeIndex = (mode == "feedMode" ? 1 : (mode == "roundsMode" ? 2 : 3));
}

/*************************************************************************
 * @function keyDownModeBarFocused 
 * @Desc 
 * Handles valid keydown events when the mode bar has the focus, per the
 * w3 spec: Left and Right Arrow change the focus to the previous and 
 * next tab; Home and End change the focus to the first and last tab; 
 * and Enter or Space selects the currently focused tab.
 * @param newMode
 * The string corresponding to the new mode (feedMode, roundsMode, 
 * coursesMode, loginMode)
 *************************************************************************/
function keyDownModeBarFocused(key) {
    let newFocusedTab; 
    if (key =="Enter" || key =="Space") {
      //Switch to mode corresponding to tab with current focus
      switchMode(modes[focusedModeIndex]); 
    } else if (key =="ArrowRight" || key =="ArrowDown") {
        //shift focus to next mode tab
        document.getElementById(modes[focusedModeIndex]).setAttribute("tabindex","-1");
        focusedModeIndex = (focusedModeIndex == 3 ? 1 : focusedModeIndex+1);
        newFocusedTab = document.getElementById(modes[focusedModeIndex]);
        newFocusedTab.setAttribute("tabindex","0");
        newFocusedTab.focus();  
    }  else if (key == "ArrowLeft" || key == "ArrowUp") {
        //shift focus to prev mode tab
        document.getElementById(modes[focusedModeIndex]).setAttribute("tabindex","-1");
        focusedModeIndex = (focusedModeIndex == 1 ? 3 : focusedModeIndex-1);
        newFocusedTab = document.getElementById(modes[focusedModeIndex]);
        newFocusedTab.setAttribute("tabindex","0");
        newFocusedTab.focus(); 
    } else if (key =="Home") {
        //shift focus to prev mode tab
        document.getElementById(modes[focusedModeIndex]).setAttribute("tabindex","-1");
        focusedModeIndex = 1;
        let newFocusedTab = document.getElementById(modes[focusedModeIndex]);
        newFocusedTab.setAttribute("tabindex","0");
        newFocusedTab.focus(); 
    } else if (key =="End") {
        //shift focus to last mode tab
        document.getElementById(modes[focusedModeIndex]).setAttribute("tabindex","-1");
        focusedModeIndex = 3;
        let newFocusedTab = document.getElementById(modes[focusedModeIndex]);
        newFocusedTab.setAttribute("tabindex","0");
        newFocusedTab.focus(); 
    }

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
 * FLOATING ACTION BUTTON INTERACTION
 * The following functions implement the functionality of the floating
 * action button. This is just a button, so making the button 
 * accessible involves allowing the user to type Enter or Space when
 * the button is focused.
*************************************************************************/
document.getElementById("floatBtn").addEventListener("click",function() {
    alert("Floating action button clicked.");
});

function keyDownFloatingBtn(key) {
    if (key=="Enter" || key=="Space") {
        //Click the button
        document.getElementById("floatBtn").click(); 
      }
}

/*************************************************************************
 * @function Document Keydown Event Handler 
 * @desc 
 * When the user presses a keyboard button in the app, we interpret the
 * keypress based on which user interface element currently has focus. 
 *************************************************************************/
 document.addEventListener("keydown", function(e) { 
    const element =  document.activeElement; //The item that currently has focus
    if (e.code == "Tab") {
        if (element.classList.contains("modebar-btn")) {
            //We're exiting the mode bar; need to reset focused tab to the active tab
            document.getElementById(modes[focusedModeIndex]).setAttribute("tabindex","-1");
            focusedModeIndex = (mode=="feedMode" ? 1 : (mode=="roundsMode" ? 2: 3));
            document.getElementById(mode).setAttribute("tabindex","0");
        } else if (element.getAttribute("role") == "menuitem") {
            //Close menu as user tabs out of it
            toggleSideMenu();
        }
        return; //We let tab events pass through; default behavior is okay
    } 
    //If here, event was not a tab
    if (element.id === "menuBtn") { 
        //Handle keypress when menu button has focus
       keyDownMenuBtnFocused(e.code);
      
    } else if (element.getAttribute("role") == "menuitem") { 
        //Handle key press when side menu item has focus
        keyDownMenuItemFocused(e.code);
        
    } else if (element.classList.contains("modebar-btn")) {
        //Handle key press when button in bottom mode bar has focus
        keyDownModeBarFocused(e.code);
    } else if (element.id === "floatBtn") {
        keyDownFloatingBtn(e.code);
    } else if (element.id === "skipLink") {
        keyDownSkipLinkFocused(e.code);
    }
    //We are handling the interaction here, so prevent default routing.
    e.preventDefault(); 

});

  