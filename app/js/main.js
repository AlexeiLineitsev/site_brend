function dropdownMenuClick() {
    document.querySelector(".dropdownMenu").classList.toggle("show");
}

function switchManager(e) {

}


window.onclick = function (e) {
    let check = checkParent('.dropdownMenu', e.target);
    // drop down menu click
    if (!check) {
        if (!e.target.matches('.header__BrowseBtn') && !e.target.matches('.dropdownMenu__wrap')) {
            var myDropdown = document.querySelector(".dropdownMenu");
            if (myDropdown.classList.contains('show')) {
                myDropdown.classList.remove('show');
            }
        }
    }

    // switch manager in block subscribe
    if (e.target.classList.contains('subscribe__line')) {
        let allLine = document.querySelectorAll('.subscribe__line');
        const current = e.target;

        for (let i = 0; i <allLine.length; i++) {
            if (allLine[i].classList.contains('subscribe__line-active')) {
                allLine[i].classList.remove('subscribe__line-active');
                current.classList.add('subscribe__line-active');
            }
        }
    }
};


function checkParent(parent, child) {
    var elt = child.closest(parent);
    return !!elt;
}