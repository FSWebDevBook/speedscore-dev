/*************************************************************************
 * navBarBtn click event handler -- When the user clicks on the side menu
 * button, open the menu if it is closed, and close the menu if it is
 * open
 *************************************************************************/
document.getElementById("menuBtn").addEventListener("click", function() {
    const sideMenuIcon = document.getElementById("sideMenuIcon");
    const sideMenu = document.getElementById("sideMenu");
  if (sideMenuIcon.classList.contains("fa-bars")) { 
    //Menu is currently closed; open it
    //Toggle the icon to the "X" and open the menu
    sideMenuIcon.classList.remove("fa-bars");
    sideMenuIcon.classList.add("fa-times");
    sideMenu.classList.add("sidemenu-open");
    sideMenu.classList.remove("sidemenu-closed");
  } else {
    //Menu is currently open; close it
    //Toggle the menu icon to the hamburger
    sideMenuIcon.classList.remove("fa-times");
    sideMenuIcon.classList.add("fa-bars");
    sideMenu.classList.add("sidemenu-closed");
    sideMenu.classList.remove("sidemenu-open");
  }
});