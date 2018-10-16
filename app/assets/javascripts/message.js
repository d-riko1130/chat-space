$(function() {
  function buildHTML(message) {
    var content = message.content ? `<p class="lower-message__content">${ message.content }</p>` : ''
    var imageurl = message.image.url ? `<img src="${message.image.url}", class="lower-message__image">` : ''
    var html = `
    <div class="message">
      <div class="upper-message">
        <div class="upper-message__user-name">${ message.name }</div>
        <div class="upper-message__date">${ message.date }</div>
      </div>
      <div class="lower-message">
        ${ content }
        ${ imageurl }
      </div>
    </div>
    `
    return html
  };

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      $('#new_message')[0].reset();
      $('.messages').animate( {'scrollTop': $('.messages')[0].scrollHeight}, 1000 );
    })
    .fail(function(message) {
      alert('メッセージの送信に失敗しました');
    })
    .always(function() {
      $('.form__submit').prop('disabled', false);
    });
  })
});
