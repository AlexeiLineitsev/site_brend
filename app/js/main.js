
function myFunction() {
    document.querySelector(".dropdownMenu").classList.toggle("show");
}


window.onclick = function(e) {
    console.log(!e.target.matches('.dropdownMenu'));
    if (!e.target.matches('.header__BrowseBtn')) {
        var myDropdown = document.querySelector(".dropdownMenu");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
};