/*************************************************************************
 * File: sideMenu.js
 * These functions support interaction with the side menu
 * for both the visual and accessible keyboard interface.
 * We use the w3.org  "Navigation Button Example" as a 
 * specification for implementing the accessible keyboard interface:
 * https://www.w3.org/TR/wai-aria-practices/examples/menu-button/menu-button-actions.html
 * The functionality triggered by choosing side menu items is implemented
 * in the file modeActions.js 
 * /*************************************************************************

/*************************************************************************
 * @function focusFirstMenuItem
 * @desc 
 * Shift the focus to the first menu item.
 *************************************************************************/
 function focusFirstMenuItem() {
    focusedMenuItemIndex = 0;
    const sideMenuItems = document.getElementsByClassName("sidemenu-item");
    sideMenuItems[modeMenuIndices[mode][focusedMenuItemIndex]].focus();
}

/*************************************************************************
 * @function focusLastMenuItem
 * @desc 
 * Shift the focus to the last menu item.
 *************************************************************************/
function focusLastMenuItem() {
    focusedMenuItemIndex = modeMenuIndices[mode].length - 1;
    const sideMenuItems = document.getElementsByClassName("sidemenu-item");
    sideMenuItems[modeMenuIndices[mode][focusedMenuItemIndex]].focus();
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
    sideMenuItems[modeMenuIndices[mode][focusedMenuItemIndex]].focus();
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
    sideMenuItems[modeMenuIndices[mode][focusedMenuItemIndex]].focus();
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
    if (sideMenuIcon.classList.contains("fa-arrow-left")) { 
        switchToModeMainPage();
    } else if (sideMenuIcon.classList.contains("fa-bars")) { //OPEN MENU
        //Open menu
        //Toggle menu icon
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
        //Disable mode bar and buttons
        document.getElementById("modeTabs").classList.add("disabled");
        document.getElementById("feedMode").disabled = true;
        document.getElementById("roundsMode").disabled = true;
        document.getElementById("coursesMode").disabled = true;
        document.getElementById(mode + "ActionBtn").classList.add("disabled");
        document.getElementById(mode + "ActionBtn").disabled = true;
        document.getElementById("searchBtn").classList.add("disabled");
        document.getElementById("searchBtn").disabled = true;
        document.getElementById("profileBtn").classList.add("disabled");
        document.getElementById("profileBtn").disabled = true;
        //Otherwise, user clicked with mouse so we do need to set focus.
    } else { //CLOSE MENU
        //Change menu icon
        sideMenuIcon.classList.remove("fa-times");
        sideMenuIcon.classList.add("fa-bars");
        sideMenuIcon.setAttribute("aria-label","Actions")
        //Close menu
        sideMenu.classList.remove("sidemenu-open");
        sideMenu.classList.add("sidemenu-closed");
        sideMenuBtn.setAttribute("aria-expanded","false");
        //Re-enable mode bar and buttons
        document.getElementById("modeTabs").classList.remove("disabled");
        document.getElementById("feedMode").disabled = false;
        document.getElementById("roundsMode").disabled = false;
        document.getElementById("coursesMode").disabled = false;
        document.getElementById(mode + "ActionBtn").classList.remove("disabled");
        document.getElementById(mode + "ActionBtn").disabled = false;
        document.getElementById("searchBtn").classList.remove("disabled");
        document.getElementById("searchBtn").disabled = false;
        document.getElementById("profileBtn").classList.remove("disabled");
        document.getElementById("profileBtn").disabled = false;
        //Refocus on the menu button
        sideMenuBtn.focus();
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
        document.activeElement.click(); //Click the menu item  
    } else if (key === "Escape") {
        //Close menu without choosing menu item. We use setTimeout()
        //to ensure that screen readers register the menu as closed.
        //I've found toggling aria-expanded to false isn't registered
        //unless we introduce a small delay.
        //setTimeout(toggleSideMenu,100); //Close menu
        toggleSideMenu();
        document.getElementById("menuBtn").focus();
    } else if (key === "ArrowUp") {
        focusPrevMenuItem();
    } else if (key === "ArrowDown") {
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