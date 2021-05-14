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
 * @function feedModeMenuPost CLICK
 * @desc 
 * When the "Post to Feed" menu item is selected, we switch to "Post to
 * Feed" page to allow the user to make a new feed post. The only option
 * here is to make the post or cancel out of it; the user should not be
 * able to tab to other UI sections. Thus, we disable all
 * other UI components.
 *************************************************************************/
 document.getElementById("feedModeMenuPost").addEventListener("click",function() {
    switchToModeSubPage("Post");
 });


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
 * close the "Post to Feed" mode subpage and redisplay the main mode page.
 *************************************************************************/
 document.getElementById("feedModePostCancelBtn").addEventListener("click",function() {
    switchToModeMainPage();
});

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
 function feedModeFollowUsers() {
    //TO DO: Add code to follow selected user(s);
} 

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
 * @function feedModeFollowBtn CLICK
 * @desc 
 * When the user selects one or more users and clicks the "Unfollow" button,
 * we call upon feedModeUnfollowSelectedUsers to remove the selected users
 * from the user's "followed" list.
 *************************************************************************/
document.getElementById("feedModeUnfollowBtn").addEventListener("click",function() {
    feedModeUnfollowUsers()
});

/*************************************************************************
 * @function feedModeBackBtn CLICK
 * @desc 
 * When the user clicks the "Back to Feed" button, we switch back to the
 * main Feed page.
 *************************************************************************/
document.getElementById("feedModeBackToFeed").addEventListener("click",function() {
    switchToModeMainPage();
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
 * @function roundsModeLogBtn click handler
 * @desc 
 * When the user clicks the "Log Round" button, we call the 
 * RoundsModeLogRound function.
 *************************************************************************/
document.getElementById("roundsModeLogBtn").addEventListener("click",function() {
    roundsModeLogRound();
});

/*************************************************************************
 * @function feedModePostBtn click handler
 * @desc 
 * When the user clicks the "Cancel" button next to the "Log Round" button,
 * we go back to the main Rounds Mode page.
 *************************************************************************/
document.getElementById("roundsModeLogCancelBtn").addEventListener("click",function() {
      switchToModeMainPage();
});

/*************************************************************************
 * @function feedModePostBtn click handler
 * @desc 
 * When the user clicks the "Cancel" button next to the "Edit Round" button,
 * we go back to the main Rounds Mode page.
 *************************************************************************/
 document.getElementById("roundsModeEditCancelBtn").addEventListener("click",function() {
    switchToModeMainPage();
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
 * @function coursesModeEditBtn click handler
 * @desc 
 * When the user clicks the "Edit Course" button, we call the 
 * coursesModeEdit function.
 *************************************************************************/
 document.getElementById("coursesModeEditBtn").addEventListener("click",function() {
    coursesModeEditCourse();
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
 * @function coursesModeEditCancelBtn click handler
 * @desc 
 * When the user clicks the "Cancel" button next to "Edit Course" 
 * we return to the Courses Mode main page.
 *************************************************************************/
   document.getElementById("coursesModeEditCancelBtn").addEventListener("click",function() {
    switchToModeMainPage();
});


/*************************************************************************
 * KEYBOARD HANDLERS FOR MODE ACTIONS
 * Per W3 guidelines, users must be able to cancel out of a modal dialog
 * box using the "escape" key at any point in the dialog box interaction.
 * The following functions implement both the "Enter" and the "Escape"
 * keyboard functionality for focused items on a mode subpage.
*************************************************************************/

/*************************************************************************
 * @function keyDownModePageActionBtnFocused
 * @desc 
 * When the user hits "Enter" when a mode page action button is focused,
 * we perform the action by calling the corresonding button click handler,
 * whose name can be built through cocatenating the current mode and
 * subPage.
 * When the user hits "Escape" when a mode page action button is focuses,
 * we cancel out of the modal dialog and return to the main mode page.
 *************************************************************************/
function keyDownModePageActionBtnFocused(key) {
    if (key === "Enter") {
        document.getElementById(mode + subPage + "Btn").click();
    } else if (key === "Escape") { //Cancel
        switchToModeMainPage();
    }
}

/*************************************************************************
 * @function keyDownModeCancelBtnFocused
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
 * the modal dialog associated with the current mode's subpage, we
 * cancel out of the modeal dialog box and return to the main page.
 *************************************************************************/
function keyDownModePageEltFocused(key) {
    if (key == "Escape") {
        switchToModeMainPage();
    }
}
