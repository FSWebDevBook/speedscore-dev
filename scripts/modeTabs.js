/*************************************************************************
 * File: modeTabs.js
 * Desc: Contains the JavaScript functions to handle interactions 
 * with the mode tabs ("Feed", "Rounds", "Courses"). \
 * We use the w3.org "Example of Tabs with Manual Activiation" as a 
 * specification for implementing the accessible keyboard interface:
 * https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html
*************************************************************************/

/*************************************************************************
 * @function switchMode 
 * @desc 
 * Switch from the current mode to a new mode. This entails unhighlighting
 * the mode tab corresponding to the current mode, highlighting 
 * the mode tab corresponding to the new mode, updating the global
 * mode variable, and changing the menu items to reflect the new mode.
 * @param newMode
 * The string corresponding to the new mode (feedMode, roundsMode, 
 * coursesMode, loginMode)
 *************************************************************************/
 function switchMode(newMode) {
    const prevModeBtn = document.getElementById(mode);
    const newModeBtn = document.getElementById(newMode);
    //Switch mode button that is highlighted
    prevModeBtn.classList.remove("modetab-selected");
    prevModeBtn.classList.add("modetab-unselected");
    prevModeBtn.setAttribute("aria-selected",false);
    newModeBtn.classList.remove("modetab-unselected");
    newModeBtn.classList.add("modetab-selected");
    newModeBtn.setAttribute("aria-selected",true);
    //Place "Main" <div> of new mode in natural tab sequence
    document.getElementById(mode + "Main").setAttribute("tabindex","-1");
    document.getElementById(newMode + "Main").setAttribute("tabindex","0");
    //Place focus on new mode button    
    newModeBtn.focus();
    //Change action button
    document.getElementById(mode + "ActionBtn").style.display = "none";
    document.getElementById(newMode + "ActionBtn").style.display = "block";
    //Swap out page content
    document.getElementById(mode + "Tab").style.display = "none";
    document.getElementById(newMode + "Tab").style.display = "block";
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
 * @function keyDownModeTabFocused 
 * @Desc 
 * Handles valid keydown events when the mode bar has the focus, per the
 * w3 spec: Left and Right Arrow change the focus to the previous and 
 * next tab; Home and End change the focus to the first and last tab; 
 * and Enter or Space selects the currently focused tab.
 * @param newMode
 * The string corresponding to the new mode (feedMode, roundsMode, 
 * coursesMode, loginMode)
 *************************************************************************/
function keyDownModeTabFocused(key) {
    let newFocusedTab; 
    if (key =="Enter" || key =="Space") {
      //Switch to mode corresponding to tab with current focus
      switchMode(modes[focusedModeIndex]); 
    } else if (key =="ArrowRight") {
        //shift focus to next mode tab
        document.getElementById(modes[focusedModeIndex]).setAttribute("tabindex","-1");
        focusedModeIndex = (focusedModeIndex == 3 ? 1 : focusedModeIndex+1);
        newFocusedTab = document.getElementById(modes[focusedModeIndex]);
        newFocusedTab.setAttribute("tabindex","0");
        newFocusedTab.focus();  
    }  else if (key == "ArrowLeft") {
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
const tabs = document.getElementsByClassName("modetab-btn");
for (let i = 0; i < tabs.length; ++i) {
    tabs[i].addEventListener("click",() => switchMode(tabs[i].id));
}