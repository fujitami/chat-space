$(function() {
var search_list = $('.listview.user-index');

  function appendUser(user) {
    var html = `<li>
                  <div class="chat-group-user clearfix">
                    <p class="chat-group-user__name">${ user.name }</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${ user.id } data-user-name=${ user.name }>追加</a>
                  </div>
                </li>`
    search_list.append(html);
  }

  function appendNoUser(user) {
    var html = `<li>
                  <div class="chat-group-user clearfix">${ user }</div>
                </li>`
    search_list.append(html);
  }

  $('#user-search-field').on("keyup", function() {
    var input = $('#user-search-field').val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $('.listview.user-index').empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          appendUser(user);
        });
      }
      else {
        appendNoUser('一致するユーザが見つかりません。')
      }
    })
    .fail(function() {
      alert("ユーザ検索に失敗しました。");
    })
  });
});
