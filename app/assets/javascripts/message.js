$(function(){
  function buildHTML(message){
    var img = message.image_url ? `<img class="lower-message__image" src="${ message.image_url }">` : ``
    var html = `<div class="message">
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
    var scroll = $('.messages').animate({ scrollTop: $('.message:last').offset().top } );
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
      scroll;
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('投稿に失敗しました。');
    })
  });
});
