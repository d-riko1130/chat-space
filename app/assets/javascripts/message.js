$(function() {
  function buildHTML(message) {
    var html = `<div class="message">
    <div class="upper-message">
    <div class="upper-message__user-name">
    ${ message.name }
    </div>
    <div class="upper-message__date">${ message.date }</div>
    </div>
    <div class="lower-message">`
    if ( message.content && message.image.url != null ) {
      html = $(html).append(`<p class="lower-message__content">${ message.content }</p><img src="${message.image.url}", class="lower-message__image"></div></div>`)
      return html
    } else if ( message.image.url != null ) {
      html = $(html).append(`<img src="${message.image.url}", class="lower-message__image"></div></div>`)
      return html
    } else if ( message.content != null ) {
      html = $(html).append(`<p class="lower-message__content">${ message.content }</p></div></div>`)
      return html
    }
  };

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = window.location.href
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data) {
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#message_image').val('');
      $('.form__message').val('');
      $('.form__submit').prop('disabled', false);
      $('.messages').animate( {'scrollTop': $('.messages')[0].scrollHeight}, 1000 );
    })
    .fail(function(message){
      $('.form__submit').prop('disabled', false);
      alert('メッセージの送信に失敗しました');
    });
  })
});
