$(function() {
  var search_user = $(".chat-group-user");
  var preWord;

  function appendUser(user) {
    var html = `
    <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${ user.name }</p>
    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
    </div>
    `
    search_user.append(html);
  }

  function appendNoUser(user) {
    var html = `
    <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">一致するユーザはいません</p>
    </div>
    `
    search_user.append(html);
  }

  function editElement(element) {
    var result = "^" + element;
    return result;
  }

  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val();
    var inputs = input.split(" ");
    var newInputs = inputs.map(editElement);
    var word = newInputs.join("|");
    var reg = RegExp(word);

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(user_name){
      $("#user-search-field").empty();
      if ( user_name.length !== 0 ) {
        user_name.forEach(function(user_name) {
          appendUser(user_name);
        });
      } else {
        appendNoUser("一致するユーザはいません");
      }
    })

    .fail(function() {
      alert('ユーザの検索に失敗しました')
      console.log('シッパイシチャッタ')
    });
  });
});
