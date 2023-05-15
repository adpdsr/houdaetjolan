window.onload = function() {
    count = 1;

    // trigger event on scroll down click
    document.getElementById('scroll-down').addEventListener('click', changeSlide);

    checkbox = document.getElementById("checkbox");

    checkbox.addEventListener('click', function() {
        if (document.getElementById("checkbox").checked != true) {
            // collapse menu
            document.getElementById("menu").style.transform = "translate(-150%)";
            checkbox.checked = false;
        } else {
            // expand menu
            document.getElementById("menu").style.transform = "translateX(0)";
            checkbox("checkbox").checked = true;
        }
    })

    menuItems = document.querySelectorAll(".menu-items a");

    // trigger event on menu item click
    for (let menuItem of menuItems) {
        menuItem.addEventListener('click', function (e) {
            target = e.target.getAttribute("data-target").slice(8);
            
            if (target != 1 ) {
                showNight();
            } else {
                showDay();
            }

            toggleVisibility(
                document.getElementById("section-" + count),
                document.getElementById("section-" + target)
            );

            // collapse menu
            document.getElementById("menu").style.transform = "translate(-150%)";
            document.getElementById("checkbox").checked = false;

            count = Number(target);

        });
    }

    function changeSlide() {
        if (document.getElementById("window").style.backgroundImage.slice(4, -1).replace(/"/g, "") != "assets/img/fenetre-nuit.svg") {
            // night window
            showNight();
        }

        if (count < 12) {
            toggleVisibility(
                document.getElementById("section-" + count),
                document.getElementById("section-" + (count + 1 ))
            );
            count++;
        } else {
            toggleVisibility(
                document.getElementById("section-12"),
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
        document.getElementById("scroll-down").src = "assets/img/scroll-down-arrow.svg";
    }

    function showNight() {
        document.getElementById("window").style.backgroundImage = "url('assets/img/fenetre-nuit.svg')";
        document.getElementById("scroll-down").src = "assets/img/scroll-down-arrow-white.svg";
    }

};