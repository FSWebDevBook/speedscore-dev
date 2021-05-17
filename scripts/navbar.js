/*************************************************************************
 * File: navbar.js
 * Desc: Contains the JavaScript functions to handle functionality of 
 * the items in the top navigation bar:
 * - menu button
 * - skip link
 * - search 
 * - profile settings

*************************************************************************/

/*************************************************************************
 * @function menuBtn click handler
 * @desc 
 * When the user clicks the menuBtn, open or close the side menu 
 * based on current menu state. Remapped to toggleSideMenu
 *************************************************************************/
 document.getElementById("menuBtn").addEventListener("click", function (e) {
    toggleSideMenu("first");
    e.stopPropagation();
});


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
 * @function skipLink click
 * @desc 
 * The "skip link" is an accessbility feature that allows the user to 
 * skip an app's navigation sections and go right to the main content.
 * This is usually done using an href. However, we use JavaScript 
 * to accommodate SpeedScore's multiple mode pages.
 * When the user clicks on the skip link, change the focus to the current
 * mode's page.
 *************************************************************************/
 document.getElementById("skipLink").addEventListener("click",function() {
     //TO DO: We will ultimately have to write a switch or if-then to 
     //shift the focus to the first page element of the current mode page
     //For now, we just shift the focus to the tab itself.
    document.getElementById(mode + "ActionBtn").focus();
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