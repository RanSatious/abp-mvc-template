define(['abp/abp', 'lay!form'], function(abp) {
  var form = layui.form;
  form.on('submit', function(data) {
    abp
      .ajax({
        contentType: 'application/x-www-form-urlencoded',
        url: 'login',
        data: data.field
      })
      .done(function(result) {
        console.log(result);
      });
    return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
  });
});
