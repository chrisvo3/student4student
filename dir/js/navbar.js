function logOut() {
    $(".loginLink").css('display', 'flex');
    $(".loginMenu").css('display', 'none');
    setCookie('user', '', -100);
    LoadPage("dir/html/login.html");
}

