$(function() {
  function buildHTML(message){
    var html =`<div class="message">
                <div class="upper-message">
                <div class="upper-message__user-name">
                ${message.user_id}
                </div>
                <div class="upper-message__date">
                ${message.data}
                </div>
                </div>
                <div class="lower-message">
                <p class="lower-message__content">
                ${message.content}
                </p>
                </div>
                </div>
                <img src="${message.image}">`
      return html;
  }
    $(".new_message").on("submit", function(e) {
      //フォームのsubmitが押されたら、以下の処理が動く

      e.preventDefault();
      //フォームの動きを処理する

      var formData = new FormData(this);
      //フォームデータを取得。大文字使う

      var url = $(this).attr('action')
      //ajaxで送るurl先を取得。フォームのアクション属性を取得
      //thisでnew_messageを取得している
      
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
  });