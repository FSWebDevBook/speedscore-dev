/*************************************************************************
 * File: settingsActions.js
 * Desc: Contains the JavaScript functions that implement the 
 * settings page actions: Either save settings or cancel
*************************************************************************/

/*************************************************************************
 * @function settingsSave
 * @desc 
 * When the user clicks the "Save Settings" button, we need to save the
 * values currently entered into the form.
 *************************************************************************/
function settingsSave() {
    //TO DO: Add code to save settings
    switchToModeMainPage();
}
/*************************************************************************
 * @function settingsSaveBtn click handler
 * @desc 
 * When the user clicks the "Save Settings" button, we call the 
 * settingsSave function.
 *************************************************************************/
 document.getElementById("settingsBtn").addEventListener("click",function() {
    settingsSave();
});

/*************************************************************************
 * @function settingsCancelBtn click handler
 * @desc 
 * When the user clicks the "Cancel" button to cancel settings, we 
 * close the "Settings" page and redisplay the main mode page.
 *************************************************************************/
 document.getElementById("settingsCancelBtn").addEventListener("click",function() {
    switchToModeMainPage();
});

/*************************************************************************
 * @function profileBtn click handler
 * @desc 
 * When the user clicks their picture icon, we open the "Settings page.
 *************************************************************************/
 document.getElementById("profileBtn").addEventListener("click",function() {
    switchToModePage("settings");
});

/*************************************************************************
 * @function menuSettings click handler
 * @desc 
 * When the user clicks the "Settings" menu item, we open the "Settings page.
 *************************************************************************/
 document.getElementById("menuSettings").addEventListener("click",function() {
    switchToModePage("settings");
});

