/*************************************************************************
 * File: pageSwitch.js
 * Desc: Contains the JavaScript functions to handle page switching in
 * the app. There are two main page switching functions: 
 *  -switchToModeMainPage
 *  -switchToModeSubPage
*************************************************************************/

 /*************************************************************************
 * @function switchToModeMainPage
 * @desc 
 * Submode pages in the app act like modal dialog boxes: The user must
 * either complete the primary action (e.g., posting to feed) or cancel
 * the action. When the user does either, this function allows the app
 * to switch back to the mode's main page: The subpage is hidden, and the 
 * main app page, floating action button, mode tabs, and nav bar are 
 * redisplayed.  
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
    //Hide current mode page and show main mode page
    document.getElementById(mode + subPage).style.display = "none";
    document.getElementById(mode + "Main").style.display = "block";
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
    document.getElementById(mode + "ActionBtn").style.display = "block";
}

/*************************************************************************
 * @function switchToModeSubPage
 * @desc 
 * When a menu item is clicked, we switch to the corresponding
 * mode subpage. The user interface changes for such a switch are the
 * same for all menu items. The respnsive design accommodate two modes:
 * mobile and desktop. If mobile, we replace menu btn icon with back arrow.
 * Otherwise, we keep menu and show cancel button on page.
 * @param sPage indicates the name of the sub page. We can obtain the
 * id of the corresponding <div> element using string 
 * concatenation: mode + subPage
 *************************************************************************/
function switchToModeSubPage(sPage) {
    toggleSideMenu(); //close the menu
    subPage = sPage;
    if (isMobile()) {
        //Change menu icon to back arrow
        document.getElementById("menuBtnIcon").classList.remove("fa-bars");
        document.getElementById("menuBtnIcon").classList.add("fa-arrow-left");
        document.getElementById("menuBtn").setAttribute("aria-label","Back");
        //Button no longer controls the menu. Remove aria properties...
        document.getElementById("menuBtn").removeAttribute("aria-controls");
        document.getElementById("menuBtn").removeAttribute("aria-haspopup");
        document.getElementById("menuBtn").removeAttribute("aria-expanded");
        document.getElementById(mode + subPage + "CancelBtn").style.display = "none";
    } else { //temporarily disable menu button
        document.getElementById("menuBtn").classList.add("disabled");
        document.getElementById("menuBtn").disabled = true;
        //Show cancel button for current subPage
        document.getElementById(mode + subPage + "CancelBtn").style.display = "block";
    }
    //Hide mode tabs, floating action button
    document.getElementById("modeTabs").style.display = "none";
    document.getElementById(mode + "ActionBtn").style.display = "none";
    //Disable Search and Settings buttons
    document.getElementById("searchBtn").classList.add("disabled");
    document.getElementById("searchBtn").disabled = true;
    document.getElementById("profileBtn").classList.add("disabled");
    document.getElementById("profileBtn").disabled = true;
    //Hide skip link
    document.getElementById("skipLink").style.display="none";
    //Switch to new page
    document.getElementById(mode + "Main").style.display="none";
    document.getElementById(mode + subPage).style.display = "block";
    document.getElementById(mode + "Tab").focus();
}