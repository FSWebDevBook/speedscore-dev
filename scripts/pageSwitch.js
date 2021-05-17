/*************************************************************************
 * File: pageSwitch.js
 * Desc: Contains the JavaScript functions to handle page switching in
 * the app. There are two main page switching functions: 
 *  -switchToModeMainPage
 *  -switchToModePage
*************************************************************************/

 /*************************************************************************
 * @function switchToModeMainPage
 * @desc 
 * Mode pages in the app act like modal dialog boxes: The user must
 * either complete the primary action (e.g., posting to feed) or cancel
 * the action. When the user does either, this function allows the app
 * to switch back to the mode's "main: page, which is NOT mode.
 * The mode page is hidden, and the main mode page, floating action 
 * button, mode tabs, and nav bar are redisplayed.  
 *************************************************************************/
function switchToModeMainPage() {
    const sideMenuIcon = document.getElementById("menuBtnIcon");
    const sideMenuBtn = document.getElementById("menuBtn");
    if (sideMenuIcon.classList.contains("fa-arrow-left")) {
        //Mobile mode -- restore menu button
        sideMenuIcon.classList.remove("fa-arrow-left");
        sideMenuIcon.classList.add("fa-bars");
        sideMenuBtn.setAttribute("aria-label","Actions")
        //Change button's aria attributes so that it knows it's a menu button
        sideMenuBtn.setAttribute("aria-controls","sideMenu");
        sideMenuBtn.setAttribute("aria-haspopup","true");
        sideMenuBtn.setAttribute("aria-expanded","false");
    } else { //desktop mode -- re-enable menu button
        sideMenuBtn.disabled = false;
        sideMenuBtn.classList.remove("disabled");
    }
    //Hide current page and show main mode page
    document.getElementById(mode + page).style.display = "none";
    document.getElementById((mode === "" ? prevMode : mode) + 
        "Tab").style.display = "block";                 
    document.getElementById((mode === "" ? prevMode : mode) + 
      "Main").style.display = "block";
    sideMenuBtn.focus();
    //Restore skip link
    document.getElementById("skipLink").style.display="block";
    //Restore search and profile buttons
    document.getElementById("searchBtn").classList.remove("disabled");
    document.getElementById("searchBtn").disabled = false;
    document.getElementById("profileBtn").classList.remove("disabled");
    document.getElementById("profileBtn").disabled = false;
    //Restore mode bar buttons
    document.getElementById("modeTabs").style.display = "flex";
    //Restore floating button
    document.getElementById((mode === "" ? prevMode : mode) + 
      "ActionBtn").style.display = "block";
    page = "main"; //Indicates we are on mode's main page. 
    if (mode === "") { //Restore previous mode
        mode = prevMode;
    }
}

/*************************************************************************
 * @function switchToModePage
 * @desc 
 * When a menu item is clicked, we switch to the corresponding
 * mode page. The user interface changes for such a switch are the
 * same for all menu items. The respnsive design accommodate two modes:
 * mobile and desktop. If mobile, we replace menu btn icon with back arrow.
 * Otherwise, we keep menu and show cancel button on page.
 * @param modePage indicates the name of the mode page to switch to. 
 *  We can obtain the id of the corresponding <div> element using string 
 * concatenation: mode + page
 *************************************************************************/
function switchToModePage(thePage) {
    const menuBtnIcon = document.getElementById("menuBtnIcon");
    const menuBtn = document.getElementById("menuBtn");
    if (menuBtnIcon.classList.contains("fa-times")) {
        //Menu is open; close it before switching to new page.
        toggleSideMenu();
    }
    page = thePage; 
    if (page === "login" || page === "settings") {
        //We are not switchting to a page associated with a particular mode
        //Save current mode and temporarily set mode to empty
        //This allows non-mode pages to be processed as through they are 
        //mode pages.
        prevMode = mode;
        mode = "";
    }
    if (isMobile()) {
        //Change menu icon to back arrow
        menuBtnIcon.classList.remove("fa-bars");
        menuBtnIcon.classList.add("fa-arrow-left");
        menuBtn.setAttribute("aria-label","Back");
        //Button no longer controls the menu. Remove aria properties...
        menuBtn.removeAttribute("aria-controls");
        menuBtn.removeAttribute("aria-haspopup");
        menuBtn.removeAttribute("aria-expanded");
        document.getElementById(mode + page + "CancelBtn").style.display = "none";
    } else { //temporarily disable menu button
        menuBtn.classList.add("disabled");
        menuBtn.disabled = true;
        //Show cancel button for current page
        document.getElementById(mode + page + "CancelBtn").style.display = "block";
    }
    //Hide mode tabs, floating action button
    document.getElementById("modeTabs").style.display = "none";
    document.getElementById((mode === "" ? prevMode : mode) +
      "ActionBtn").style.display = "none";
    //Disable Search and Settings buttons
    document.getElementById("searchBtn").classList.add("disabled");
    document.getElementById("searchBtn").disabled = true;       
    document.getElementById("profileBtn").classList.add("disabled");
    document.getElementById("profileBtn").disabled = true;
    //Hide skip link
    document.getElementById("skipLink").style.display="none";
    //Switch to new page
    document.getElementById((mode === "" ? prevMode : mode) + 
      "Main").style.display="none";
    if (mode === "") { //Need to hide mode tab completely
        document.getElementById(prevMode + "Tab").style.display = "none";
    }
    document.getElementById(mode + page).style.display = "block";
    document.getElementById(mode + page + "Btn").focus();      
}