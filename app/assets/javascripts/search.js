$(function() {
  var search_user = $("#user-search-result");

  // 検索結果が一致したときのHTML
  function appendUser(user) {
    var html =
    `<div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${ user.name }</p>
    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
    </div>`
    search_user.append(html);
  }

  // 検索結果が一致しないときのHTML
  function appendNoUser(user) {
    var html = `
    <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${ user }</p>
    </div>`
    search_user.append(html);
  }

  // ajax通信
  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { name: input },
      dataType: 'json'
    })

    // ajax通信が成功
    .done(function(users){
      $("#user-search-result").empty();
      if ( users.length !== 0 ) {
        users.forEach(function(user) {
          appendUser(user);
        });
      } else {
        appendNoUser("一致するユーザはいません");
      }
    })

    // ajax通信が失敗
    .fail(function() {
      alert('ユーザの検索に失敗しました')
    });
  });
});
