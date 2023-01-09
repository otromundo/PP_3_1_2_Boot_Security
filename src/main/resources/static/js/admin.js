const token = $("meta[name='_csrf']").attr("content");
const header = $("meta[name='_csrf_header']").attr("content");

let users;


function updateAdminPage() {
    fetch("/api/admin/users").then(res => {
        res.json().then(users => {
            this.users = users
            users.forEach((user, i) => {
                $.get("/html/row-users-table.html", (row) => {
                    row = $(row);
                    row.find(".user-id").html(user.id);
                    row.find(".user-firstname").html(user.firstName);
                    row.find(".user-lastname").html(user.lastName);
                    row.find(".user-age").html(user.age);
                    row.find(".user-email").html(user.email);
                    user.authorities.forEach(role => {
                        row.find(".user-authorities").append(`<span>${role}</span> `);
                    })
                    row.find("#edit-user-btn").attr("onClick", `userEditModal(${i})`);
                    row.find("#delete-user-btn").attr("onClick", `userDeleteModal(${i})`);
                    $("tbody").append(row);
                })
            });
        })
    })
}

function userEditModal(i) {
    $("#edit-user-id").val(this.users[i].id);
    $("#edit-user-firstname").val(this.users[i].firstName);
    $("#edit-user-lastname").val(this.users[i].lastName);
    $("#edit-user-age").val(this.users[i].age);
    $("#edit-user-email").val(this.users[i].email);
    $("#edit-user-authorities option").each((id, option) => {
        $(option).prop('selected', this.users[i].authorities.includes($(option).val()));
    })
    $("#edit-user-form-btn").attr('onClick', 'editUser()');
}

function userDeleteModal(i) {
    $("#delete-user-id").val(this.users[i].id);
    $("#delete-user-firstname").val(this.users[i].firstName);
    $("#delete-user-lastname").val(this.users[i].lastName);
    $("#delete-user-age").val(this.users[i].age);
    $("#delete-user-email").val(this.users[i].email);
    $("#delete-user-authorities option").each((id, option) => {
        $(option).prop('selected', this.users[i].authorities.includes($(option).val()));
    })
    $("#delete-user-form-btn").attr('onClick', `deleteUser(${this.users[i].id})`);
}

function resetInfoMessages() {
    $('.invalid-feedback').hide()
    $('#user-edit-success').hide()
    $('#user-create-success').hide()
    $('#user-delete-success').hide()
}

function editUser() {
    let user = {
        id: $("#edit-user-id").val(),
        firstName: $("#edit-user-firstname").val(),
        lastName: $("#edit-user-lastname").val(),
        age: $("#edit-user-age").val(),
        email: $("#edit-user-email").val(),
        password: $("#edit-user-password").val(),
        authorities: $("#edit-user-authorities").val()
    };

    fetch("/api/admin/users/", {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            [header]: token
        },
        body: JSON.stringify(user)
    }).then(res => {
        if (res.ok) {
            clearUsersTable();
            updateAdminPage();
            $('#user-edit-success').show();
        } else {
            res.json().then(errors => {
                Object.entries(errors).forEach(([field, msg]) => {
                    $(`.invalid-feedback.${field}`).html(msg).show();
                })
            })
        }
    })
}

function createUser() {
    resetInfoMessages();

    let user = {
        id: $("#-user-id").val(),
        firstName: $("#create-user-firstname").val(),
        lastName: $("#create-user-lastname").val(),
        age: $("#create-user-age").val(),
        email: $("#create-user-email").val(),
        password: $("#create-user-password").val(),
        authorities: $("#create-user-authorities").val()
    };

    fetch("/api/admin/users/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            [header]: token
        },
        body: JSON.stringify(user)
    }).then(res => {
        if (res.ok) {
            clearUsersTable();
            updateAdminPage();
            $('#user-create-success').show();
        } else {
            res.json().then(errors => {
                Object.entries(errors).forEach(([field, msg]) => {
                    $(`.invalid-feedback.${field}`).html(msg).show();
                })
            })
        }
    })
}

function deleteUser(id) {
    fetch(`/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
            [header]: token
        }
    }).then(res => {
        clearUsersTable();
        updateAdminPage();
        $("#delete-user-form-btn").off("click");
        $('#user-delete-success').show();
    })
}

function clearUsersTable() {
    $('tr').remove();
}

updateAdminPage();