$(document).on('turbolinks:load', function() {
  $(function() {
    function buildHTML(message) {
      var content = message.content ? `<p class="lower-message__content">${ message.content }</p>` : ''
      var imageUrl = message.image ? `<img src="${ message.image }", class="lower-message__image">` : ''
      var html = `
      <div class="message">
        <div class="upper-message" data-message-id="${ message.id }">
          <div class="upper-message__user-name">${ message.name }</div>
          <div class="upper-message__date">${ message.date }</div>
        </div>
        <div class="lower-message">
          ${ content }
          ${ imageUrl }
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

    $(function() {
      var interval = setInterval(update, 5000)
    });

    function update() {
      var MessageId = $('.upper-message').last().data('message-id');
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
        $.ajax({
          type: 'GET',
          url: location.href,
          dataType: 'json',
          data: {id: MessageId}
        })
        .done(function(data) {
          data.forEach(function(message) {
            $('.messages').append(buildHTML(message));
            $('.messages').animate( {'scrollTop': $('.messages')[0].scrollHeight}, 1000 );
          });
        })
        .fail(function(data) {
          console.log('なぜか通信できない')
        });
        clearInterval();
      };
    }
  });
});
