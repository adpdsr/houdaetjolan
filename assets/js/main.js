window.onload = function() {
    
    count = 1;

    lastSection = document.getElementById("section-10");
    
    /* HANDLE SWIPE */

    let touchstartX = 0;
    let touchendX = 0;
    
    // deine body as swipe zone
    const swipeZone = document.querySelector('body');
    
    // trigger swipe start and register screenX value
    swipeZone.addEventListener('touchstart', function(event) {
        touchstartX = event.changedTouches[0].screenX;
    }, false);
    
    // trigger swipe end and register screenX value
    swipeZone.addEventListener('touchend', function(event) {
        touchendX = event.changedTouches[0].screenX;
        handleGesture();
    }, false); 
 
    // compare screenX values and determine swap direction
    function handleGesture() {
        if ((touchstartX - touchendX) >= 125) {
            // go next section
            nextSlide();
        } else if ((touchstartX - touchendX) <= -125) {
            // go prev section
            prevSlide();
        }
    }

    // pagination events
    document.getElementById('nav-prev').addEventListener('click', prevSlide);
    document.getElementById('nav-next').addEventListener('click', nextSlide);

    // go next section
    function nextSlide() {
        if (count < 10) {
            toggleVisibility(
                document.getElementById("section-" + count),
                document.getElementById("section-" + (count + 1 ))
            );
            showNight();
            count++;
        } else {
            toggleVisibility(
                lastSection,
                document.getElementById("section-1")
            );
            showDay();
            count = 1;
        }

        collapseMenu();
    }

    // go prev slide
    function prevSlide() {
        if (count == 1) {
            toggleVisibility(
                document.getElementById("section-" + count),
                lastSection
            );
            showNight();
            count = 10;
        } else if (count == 2) {
            toggleVisibility(
                document.getElementById("section-" + count),
                document.getElementById("section-" + (count - 1 ))
            );
            showDay();
            count--;
        } else {
            toggleVisibility(
                document.getElementById("section-" + count),
                document.getElementById("section-" + (count - 1 ))
            );
            count--;
        }

        collapseMenu();
    }
    
    // HANDLE MENU CLICKS

    checkbox = document.getElementById("checkbox");

    checkbox.addEventListener('click', function() {
        if (document.getElementById("checkbox").checked != true) {
            // collapse menu
            document.getElementById("menu").style.transform = "translate(-150%)";
            checkbox.checked = false;
        } else {
            // expand menu
            document.getElementById("menu").style.transform = "translateX(0)";
            checkbox.checked = true;
        }
    })

    // register click event for every menu items
    menuItems = document.querySelectorAll(".menu-items a");

    for (let menuItem of menuItems) {
        menuItem.addEventListener('click', function (e) {
            // define which section has to be shown
            target = e.target.getAttribute("data-target").slice(8);
            
            if (target != 1 ) {
                showNight();
            } else {
                showDay();
            }

            // change section
            toggleVisibility(
                document.getElementById("section-" + count),
                document.getElementById("section-" + target)
            );

            // collapse menu after changing section
            collapseMenu();

            count = Number(target);

        });
    }

    function collapseMenu() {
        document.getElementById("menu").style.transform = "translate(-150%)";
        checkbox.checked = false;
    }

    function changeSlide() {
        if (document.getElementById("window").style.backgroundImage.slice(4, -1).replace(/"/g, "") != "assets/img/fenetre-nuit.svg") {
            // night window
            showNight();
        }

        if (count < 10) {
            toggleVisibility(
                document.getElementById("section-" + count),
                document.getElementById("section-" + (count + 1 ))
            );
            count++;
        } else {
            toggleVisibility(
                lastSection,
                document.getElementById("section-1")
            );
            count = 1;
            // day window
            showDay();
        }
    }

    function toggleVisibility(curr, next) {
        curr.style.display = "none";
        next.style.display = "block";
    }

    function showDay() {
        document.getElementById("window").style.backgroundImage = "url('assets/img/fenetre.svg')";
        document.getElementById("nav-prev").src = "assets/img/scroll-down-arrow.svg";
        document.getElementById("nav-next").src = "assets/img/scroll-down-arrow.svg";
    }

    function showNight() {
        if (document.getElementById("window").style.backgroundImage.slice(4, -1).replace(/"/g, "") != "assets/img/fenetre-nuit.svg") {
            document.getElementById("window").style.backgroundImage = "url('assets/img/fenetre-nuit.svg')";
            document.getElementById("nav-prev").src = "assets/img/scroll-down-arrow-white.svg";
            document.getElementById("nav-next").src = "assets/img/scroll-down-arrow-white.svg";
        }
    }

};