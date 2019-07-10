$(function() {
  function buildHTML(message){
    var image = (message.image.url) ? image="${message.image.url}" : '';
    var html =`<div class="message" data-id=${message.id}>
                <div class="upper-message">
                <div class="upper-message__user-name">
                ${message.user_name}
                </div>
                <div class="upper-message__date">
                ${message.created_at}
                </div>
                </div>
                <div class="lower-message">
                <p class="lower-message__content">
                ${message.content}
                </p>
                </div>
                </div>
                ${image}
                `
      return html;
  }
    $(".new_message").on("submit", function(e) {
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
      
      .done(function(data){
        var html = buildHTML(data);
        $('.messages').append(html);
        $('.new_message')[0].reset();
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
        return false;
      })
      .fail(function(){
        alert('error');
      })
    });

    var reloadMessages = function() {
      last_message_id = $(".message:last").data("message-id");
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      $.ajax({
        url: `api/messages`,
        type: 'get',
        dataType: 'json',
        data: {message_id: last_message_id}
      })
      .done(function(messages) {
        var insertHTML = ''
        $(messages).each (function(i,message){

          var html = buildHTML(message);
    
          $('.messages').append(html);
    
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
          })

      })
      .fail(function() {
        alert("自動更新に失敗しました")
      });
    };
    setInterval(reloadMessages, 5000);
  });