/*************************************************************************
 * File: modeActions.js
 * Desc: Contains the JavaScript functions that implement the 
 * actions (functionalities) possible on mode pages:
 * feedMode:    displayFeed, displayPostToFeedForm, postToFeed, 
 *              displayFollowUserForm, followUser, unfollowUser
 * roundsMode:  displayRounds, displayLogRoundForm, logRound, 
 *              displayEditRoundForm, editRound
 * coursesMode: displayCourses, displayAddCourseForm, addCourse, 
 *              displayEditCourseForm, editCourse
*************************************************************************/

/*************************************************************************
 * FEED MODE ACTIONS AND EVENT HANDLERS
*************************************************************************/

/*************************************************************************
 * @function feedModeDisplayFeed
 * @desc 
 * This function should be called when the user switches to the main page
 * of feed mode. It displays the user's feed.
 *************************************************************************/
 function feedModeDisplayFeed() {
    //TO DO: Add code to display feed.
}

/*************************************************************************
 * @function feedModeDisplayPostToFeedForm
 * @desc 
 * This function should be called when the user chooses to create a new
 * feed post. It displays a form to create the post.  
 *************************************************************************/
 function feedModeDisplayPostFeedForm() {
    //TO DO: Add code to display "Post to Feed" form
}

/*************************************************************************
 * @function feedModePostToFeed
 * @desc 
 * This function should be called when the user clicks the "Post to Feed" 
 * button on the Post to Feed form. The currently-entered post is 
 * posted and the app switches back to the
 * Feed mode's main page.
 *************************************************************************/
function feedModePostToFeed() {
    //TO DO: Add code to post to the feed.
    switchToModeMainPage();
}

/*************************************************************************
 * @function feedModeDisplayFollowUsersForm
 * @desc 
 * This function should be called when the user chooses "Follow users"
 * from the side menu. It displays a form that shows the other 
 * users (speedgolfers) the user is following; allows the user to 
 * search for and select other users; and allows the user to follow and
 * unfollow the selected users.
 *************************************************************************/
function feedModeDisplayFollowUsersForm() {
  //TO DO: Add code to display "Follow Users" form
}

/*************************************************************************
 * @function feedModeFollowSelectedUsers
 * @desc 
 * This function should be called when the user has searched for users,
 * selected one or more to follow, and clicked the "Follow" button.
 * It adds the selected users to the list of users being followed, and
 * integrates the followed users' recent posts and rounds into the feed.
 * Since the user may want to add multiple users to their "followed" 
 * list, we stay in this mod after each operation.
 *************************************************************************/
function feedModeFollowUsers() {
    //TO DO: Add code to follow selected user(s);
} 

/*************************************************************************
 * @function feedModeUnFollowSelectedUsers
 * @desc 
 * This function should be called when the user has selected one or 
 * more users from their list of followed users and clicked the
 * "Unfollow" button. It removes the selected users form the 
 * "followed" list and does not include the selected users' 
 * subsequent feed activity in the user's feed.
 * Since the user may want to add multiple users to their "followed" 
 * list, we stay in this mod after each operation.
 *************************************************************************/
 function feedModeUnfollowUsers() {
    //TO DO: Add code to unfollow selected user(s);
} 

/*************************************************************************
 * @function feedModeMenuPost CLICK
 * @desc 
 * When the "Post to Feed" menu item is selected, we switch to "Post to
 * Feed" page to allow the user to make a new feed post. The only option
 * here is to make the post or cancel out of it; the user should not be
 * able to tab to other UI sections. Thus, we disable all
 * other UI components.
 *************************************************************************/
 document.getElementById("feedModeMenuPost").addEventListener("click",function() {
    switchToModePage("Post");
 });

/*************************************************************************
 * @function feedModePostBtn click handler
 * @desc 
 * When the user clicks the "Post to Feed" button, we call the 
 * feedModePostToFeed function.
 *************************************************************************/
document.getElementById("feedModePostBtn").addEventListener("click",function() {
    feedModePostToFeed();
});

/*************************************************************************
 * @function feedModePostCancelBtn click handler
 * @desc 
 * When the user clicks the "Cancel" button to cancel a new feed post, we 
 * close the "Post to Feed" mode page and redisplay the main mode page.
 *************************************************************************/
 document.getElementById("feedModePostCancelBtn").addEventListener("click",function() {
    switchToModeMainPage();
});

/*************************************************************************
 * @function feedModeMenuFollow CLICK
 * @desc 
 * When the "Post to Feed" menu item is selected, we switch to "Post to
 * Feed" page to allow the user to make a new feed post. The only option
 * here is to make the post or cancel out of it; the user should not be
 * able to tab to other UI sections. Thus, we disable all
 * other UI components.
 *************************************************************************/
 document.getElementById("feedModeMenuFollow").addEventListener("click",function() {
    switchToModePage("Follow");
 });

/*************************************************************************
 * @function feedModeFollowBtn CLICK
 * @desc 
 * When the user selects one or more users and clicks the "Follow" button,
 * we call upon feedModeFollowSelectedUsers to add the selected users to
 * the user's "followed" list.
 *************************************************************************/
 document.getElementById("feedModeFollowBtn").addEventListener("click",function() {
    feedModeFollowUsers();
  });
  
/*************************************************************************
 * @function feedModeFollowCancelBtn CLICK
 * @desc 
 * When the user clicks the "Back to Feed" button, we switch back to the
 * main Feed page.
 *************************************************************************/
document.getElementById("feedModeFollowCancelBtn").addEventListener("click",function() {
    switchToModeMainPage();
});

/*************************************************************************
 * @function feedModeActionBtn CLICK
 * @desc 
 * When the floating action button in Feed Mode is clicked, 
 * we switch to "Post to Feed" page to allow the user to make a new feed post. 
 * This is the "default" action in Feed Mode
 *************************************************************************/
 document.getElementById("feedModeActionBtn").addEventListener("click",function() {
    switchToModePage("Post");
 });


/*************************************************************************
 * ROUNDS MODE ACTIONS AND EVENT HANDLERS
*************************************************************************/

/*************************************************************************
 * @function roundsModeDisplayRounds
 * @desc 
 * This function should be called when the user switches to the main page
 * of rounds mode. It displays a list of the user's rounds. 
 *************************************************************************/
function roundsModeDisplayRounds() {
    //TO DO: Add code to display the user's rounds
}

/*************************************************************************
 * @function roundsModeDisplayLogRoundForm
 * @desc 
 * This function should be called when the user chooses to log a round.
 * It displays a form to log the new round.
 *************************************************************************/
function roundsModeDisplayLogRoundForm() {
    //TO DO: Add code to display log round form
}

/*************************************************************************
 * @function roundsModeDisplayEditRoundForm
 * @desc 
 * This function should be called when the user selects a logged round
 * to edit. It displays a form populated with the round, so that it
 * can be edited. 
 *************************************************************************/
function roundsModeDisplayEditRoundForm() {
    //TO DO: Add code to display edit round form
}

/*************************************************************************
 * @function roundsModeLogRound
 * @desc 
 * This function should be called when the user clicks the "Log Round" 
 * button on the Log Round form. The round is 
 * logged and the app switches back to the Rounds mode's main page.
 *************************************************************************/
function roundsModeLogRound() {
    //TO DO: Add code to log round
    switchToModeMainPage();
}

 /*************************************************************************
 * @function roundsModeEditRound
 * @desc 
 * This function should be called when the user clicks the "Edit Round" 
 * button on the Edit Round form. The  round is 
 * updated and the app switches back to the Rounds mode's main page.
 *************************************************************************/
 function roundsModeEditRound() {
    //TO DO: Add code to edit round
    switchToModeMainPage();
}

/*************************************************************************
 * @function roundsModeDeleteRound
 * @desc 
 * This function should be called when the user clicks the "Delete" 
 * button available for each round in the user's list of rounds.
 * A  dialog is displayed asking the user to confirm the deletion. If 
 * it is confirmed, the round is deleted and the app switches back to 
 * the Rounds mode's main page.
 *************************************************************************/
function roundsModeDeleteRound() {
    //TO DO: Add code to delete round
    //Since the operation is permanent, we need a confirmation
    //dialog prior to the delete.
}

/*************************************************************************
 * @function roundsModeMenuLog CLICK
 * @desc 
 * When the "Log Round" menu item is selected, we switch to "Log Round" 
 * page to allow the user to make a new feed post. The only option
 * here is to log the round or cancel out of it; the user should not be
 * able to tab to other UI sections. Thus, we disable all
 * other UI components.
 *************************************************************************/
 document.getElementById("roundsModeMenuLog").addEventListener("click",function() {
    switchToModePage("Log");
 });

/*************************************************************************
 * @function roundsModeLogBtn click handler
 * @desc 
 * When the user clicks the "Log Round" button, we call the 
 * RoundsModeLogRound function.
 *************************************************************************/
document.getElementById("roundsModeLogBtn").addEventListener("click",function() {
    roundsModeLogRound();
});

/*************************************************************************
 * @function feedModeLogCancelBtn click handler
 * @desc 
 * When the user clicks the "Cancel" button next to the "Log Round" button,
 * we go back to the main Rounds Mode page.
 *************************************************************************/
document.getElementById("roundsModeLogCancelBtn").addEventListener("click",function() {
      switchToModeMainPage();
});

/*************************************************************************
 * @function roundsModeActionBtn CLICK
 * @desc 
 * When the floating action button in Rounds Mode is clicked, 
 * we switch to "Log Round" page to allow the user to log a round. 
 * This is the "default" action in Rounds Mode
 *************************************************************************/
 document.getElementById("roundsModeActionBtn").addEventListener("click",function() {
    switchToModePage("Log");
 });

/*************************************************************************
 * COURSES MODE ACTIONS AND EVENT HANDLERS
*************************************************************************/

/*************************************************************************
 * @function coursesModeDisplayCourses
 * @desc 
 * This function should be called when the user switches to the main page
 * of courses mode. It displays a list of speedgolf-friendly courses 
 *************************************************************************/
function coursesModeDisplayCourses() {
    //TO DO: Add code to display the list of speedgolf-friendly courses
}

/*************************************************************************
 * @function coursesModeDisplayAddCourseForm
 * @desc 
 * This function should be called when the user chooses to add a course.
 * It displays a form to add a new course.
 *************************************************************************/
function coursesModeDisplayAddCourseForm() {
    //TO DO: Add code to display form to add course
}

/*************************************************************************
 * @function coursesModeDisplayEditCourseForm
 * @desc 
 * This function should be called when the user selects a course
 * to edit. It displays a form populated with the course, so that it
 * can be edited. 
 *************************************************************************/
function coursesModeDisplayEditCourseForm() {
    //TO DO: Add code to display form to edit existing course
}

/*************************************************************************
 * @function coursesModeAddCourse
 * @desc 
 * This function should be called when the user clicks the "Add Course" 
 * button on the Add Course form. The course is 
 * added and the app switches back to the Courses mode's main page.
 *************************************************************************/
function coursesModeAddCourse() {
    //TO DO: Add code to add course
    switchToModeMainPage();
}

/*************************************************************************
 * @function coursesModeEditCourse
 * @desc 
 * This function should be called when the user clicks the "Edit Course" 
 * button on the Edit Course form. The course is 
 * updated and the app switches back to the Courses mode's main page.
 *************************************************************************/
function coursesModeEditCourse() {
    //TO DO: Add code to edit course
    switchToModeMainPage();
}

/*************************************************************************
 * @function coursesModeMenuAdd CLICK
 * @desc 
 * When the "Add Course" menu item is selected, we switch to "Add Course" 
 * page to allow the user to create a new course. The only option
 * here is to create the course or cancel out of it; the user should not be
 * able to tab to other UI sections. Thus, we disable all
 * other UI components.
 *************************************************************************/
 document.getElementById("coursesModeMenuAdd").addEventListener("click",function() {
    switchToModePage("Add");
 });

/*************************************************************************
 * @function coursesModeAddBtn click handler
 * @desc 
 * When the user clicks the "Add Course" button, we call the 
 * RoundsModeLogRound function.
 *************************************************************************/
document.getElementById("coursesModeAddBtn").addEventListener("click",function() {
    coursesModeAddCourse();
    switchToModeMainPage();
});

/*************************************************************************
 * @function coursesModeAddCancelBtn click handler
 * @desc 
 * When the user clicks the "Cancel" button next to "Add Course",
 * we return to the Courses Mode main page.
 *************************************************************************/
  document.getElementById("coursesModeAddCancelBtn").addEventListener("click",function() {
      switchToModeMainPage();
  });

 /*************************************************************************
 * @function coursesModeActionBtn CLICK
 * @desc 
 * When the floating action button in Courses Mode is clicked, 
 * we switch to "Add Course " page to allow the user to add a course. 
 * This is the "default" action in Courses Mode
 *************************************************************************/
 document.getElementById("coursesModeActionBtn").addEventListener("click",function() {
    switchToModePage("Add");
 });

/*************************************************************************
 * KEYBOARD HANDLERS FOR MODE ACTIONS
 * Per W3 guidelines, users must be able to cancel out of a modal dialog
 * box using the "escape" key at any point in the dialog box interaction.
 * The following functions implement both the "Enter" and the "Escape"
 * keyboard functionality for focused items on a mode page.
*************************************************************************/
/*************************************************************************
 * @function keyDownModeActionBtnFocused
 * @desc 
 * When the user hits "Enter" when a mode's floating action button is 
 * focused, call the corresonding button's click handler,
 * whose name can be built through cocatenating the current mode and
 * page.
 * When the user hits "Escape" when a mode page action button is focuses,
 * we cancel out of the modal dialog and return to the main mode page.
 *************************************************************************/
 function keyDownModeActionBtnFocused(key) {
    if (key === "Enter") {
        document.getElementById(mode + "ActionBtn").click();
    }
}

/*************************************************************************
 * @function keyDownModePageActionBtnFocused
 * @desc 
 * When the user hits "Enter" when focused on the current mode page's
 * action button, we call the corresonding button's click handler,
 * whose name can be built through cocatenating the current mode and
 * page.
 * When the user hits "Escape" when a mode page action button is focuses,
 * we cancel out of the modal dialog and return to the main mode page.
 *************************************************************************/
function keyDownModePageActionBtnFocused(key) {
    if (key === "Enter") {
        document.getElementById(mode + page + "Btn").click();
    } else if (key === "Escape") { //Cancel
        switchToModeMainPage();
    }
}

/*************************************************************************
 * @function keyDownModePageCancelBtnFocused
 * @desc 
 * When the user hits "Enter" or "Escape" when a mode page cancel button 
 * is focused, we cancel out of the modal dialog box and return to the
 * main mode page.
 *************************************************************************/
 function keyDownModePageCancelBtnFocused(key) {
    if (key === "Enter" || key === "Escape") {
        switchToModeMainPage();
    }
}

/*************************************************************************
 * @function keyDownModePageEltFocused
 * @desc 
 * When the user hits "Escape" while interacting with elements in
 * the modal dialog associated with the current mode's page, we
 * cancel out of the modeal dialog box and return to the main page.
 *************************************************************************/
function keyDownModePageEltFocused(key) {
    if (key === "Escape" && page != "main") {
        switchToModeMainPage();
    }
}
