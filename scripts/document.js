/*************************************************************************
 * @function DOCUMENT click
 * @description
 * When the user clicks anywhere in the app and the menu is open, close
 * the menu.
 *************************************************************************/
 document.addEventListener("click",function(e) {
    if (document.getElementById("menuBtnIcon").classList.contains("fa-times")) {
       toggleSideMenu();
    }
});

/*************************************************************************
 * @function Document Keydown Event Handler 
 * @desc 
 * When the user presses a keyboard button in the app, we interpret the
 * keypress based on which user interface element currently has focus. 
 *************************************************************************/
 document.addEventListener("keydown", function(e) { 
    const element =  document.activeElement; //The item that currently has focus
    if (e.code == "Tab") {
        if (element.classList.contains("modetab-btn")) {
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
    //If here, event was not a tab. Process it accordingly
    if (element.id === "menuBtn") { 
        //Handle keypress when menu button has focus
       keyDownMenuBtnFocused(e.code);
    } else if (element.getAttribute("role") == "menuitem") { 
        //Handle key press when side menu item has focus
        keyDownMenuItemFocused(e.code);
    } else if (element.classList.contains("modetab-btn")) {
        //Handle key press when mode tab has focus
        keyDownModeTabFocused(e.code);
    } else if (element.id === mode + "ActionBtn") {
        //Handle key press when current mode's action button has focus
        keyDownActionBtnFocused(e.code);
    } else if (element.classList.contains("mode-page-focusable-elt")) {
        //Handle key press when focus is on an elet in current mode's
        //active subpage
        keyDownModePageEltFocused(e.code);
    } else if (element.id === "skipLink") {
        //Handle key press when focus is on skip link
        keyDownSkipLinkFocused(e.code);
    } else if (element.classList.contains("mode-page-action")) {
        //Handle key press when focus is on action button in current mode's subpage
        keyDownModePageActionBtnFocused(e.code);
    } else if (element.classList.contains("mode-page-cancel")) {
        //Handle key press when focus is on cancel button in current mode's subpage
        keyDownModePageCancelBtnFocused(e.code);
    }
    //We are handling the interaction here, so prevent default routing.
    e.preventDefault(); 

});

