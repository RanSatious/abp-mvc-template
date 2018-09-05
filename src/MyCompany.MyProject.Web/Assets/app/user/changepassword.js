define(['main', 'app/user/changepasswordModal',], function (main ,changepasswordModal) {
    $('#btn-changepassword').click(function () {
        layer.msg("changepassword");
        changepasswordModal.create({});
    });
})