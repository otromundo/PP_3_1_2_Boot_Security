function updateUserPage() {
    fetch("/api/user").then(res => {
        res.json().then(user => {
            $("#user-id").html(user.id);
            $("#user-firstname").html(user.firstName);
            $("#user-lastname").html(user.lastName);
            $("#user-age").html(user.age);
            $("#user-email").html(user.email);
            user.authorities.forEach(role => {
                $("#user-authorities").append(`<span>${role}</span> `);
                $("#navbar-user-roles").append(`<span>${role}</span> `);
            });
            $("#navbar-user-email").text(user.email);

        });
    });
}

updateUserPage();