$(function(){
  function scroll(messages) {
    messages.animate({ scrollTop: $('.message:last').offset().top }, 'swing');
  }

  function buildHTML(message){
    var img = message.image_url ? `<img class="lower-message__image" src="${ message.image_url }">` : ``
    var html = `<div class="message" data-message-id="${ message.id }">
                  <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${ message.user_name }
                    </div>
                    <div class="upper-message__date">
                      ${ message.date }
                    </div>
                  </div>
                  <div class="lower-message">
                    <p class="lower-message__content">
                      ${ message.content }
                    </p>
                    ${ img }
                  </div>
                </div>
              </div>`
    return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.form__submit').prop('disabled', false);
      scroll($('.messages'));
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('投稿に失敗しました。');
    });
  });

  var autoUpdate = setInterval(function() {
    if (location.pathname.match(/\/groups\/\d+\/messages/)){
      $.ajax({
        url: location.pathname,
        type: 'GET',
        dataType: 'json'
      })
      .done(function(data) {
        var id = $('.message:last').data('messageId');
        var updateHTML = '';
        data.messages.forEach(function(message) {
          if (message.id > id) {
            updateHTML += buildHTML(message);
          }
        });
        $('.messages').append(updateHTML);
        scroll($('.messages'));
      })
      .fail(function(data) {
        alert('自動更新に失敗しました。');
      });
    } else {
      clearInterval(autoUpdate);
    }
  }, 5000);
});
