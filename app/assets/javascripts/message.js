$(document).on('turbolinks:load', function() {
  function buildHTML(message){
    var image = (message.image.url) ? image="${message.image.url}" : '';
    // if文を三項演算子で記述している。

    var html =`<div class="message" data-id=${message.id}>
                <div class="upper-message">
                <div class="upper-message__user-name">
                ${message.user_name}
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
                ${image}
                `
      return html;
  }
    $(".new_message").on("submit", function(e) {
      //フォームのsubmitが押されたら、以下の処理が動く。

      e.preventDefault();
      //フォーム送信の動きをキャンセルする。

      var formData = new FormData(this);
      //フォームのデータを取得。

      var url = $(this).attr('action')
      //ajaxで送るurl先を取得。フォームのアクション属性を取得。
      //thisは(".new_message")を指している。

      // if(window.location.href.match(/\/groups\/\d{1,4}\/messages/));
      

      $.ajax({
        // ajaxのリクエスト先を指定している。

        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      
      .done(function(data){
      //ajaxのリクエストが成功したら以下の処理が動く。
      //インスタンス変数を(data)という名前で受け取る。

        var html = buildHTML(data);
        //create.json.jbuilderで作られたキーが引数(data)の中に代入され、その引数が関数buildHTMLに適応する。
        //変数htmlに代入される。

        $('.messages').append(html);
        //('.messages')に(html)を追加している。

        $('.new_message')[0].reset();
        //フォームの('.new_message')に文字を打って送信すると自動で削除される
        
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
        //('.messages')を自動でスクロールしてくれる。

        return false;
      })
      .fail(function(){
      //ajaxのリクエストが失敗した時は以下の処理が動く。

        alert('error');
      //アラートで'error'と表示される。
      })
    });
    

    var reloadMessages = function() {


      if(window.location.href.match(/\/groups\/\d{1,4}\/messages/)){

      

      last_message_id = $(".message:last").data("message-id");
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得

      $.ajax({
        // ajaxのリクエスト先を指定している。

        url: `api/messages`,
        type: 'get',
        dataType: 'json',
        data: {message_id: last_message_id}
      })

      .done(function(messages) {
      //ajaxのリクエストが成功したら以下の処理が動く。

        var insertHTML = ''
        $(messages).each (function(i,message){
        //(messages)という、配列の中にある要素を一つ一つ取り出してmessageという変数に代入していく。
        
          var html = buildHTML(message);
          //index.json.jbuilderで作られたキーが引数(message)に代入され、その引数がbuildHTMLに適応される。
          // 変数htmlに代入される。

          $('.messages').append(html);
          //('.messages')に(html)を追加している。
    
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
          //('.messages')を自動でスクロールしてくれる。

          })

      })
      .fail(function() {
      //ajaxのリクエストが失敗した時は以下の処理が動く。

        alert("自動更新に失敗しました")
      //アラートで"自動更新に失敗しました"と表示される。
      });

    }
    };
    // if (document.URL.match("/messages")){
      //urlに("/messages")が含まれる時に

      // console.log(window.location.href)


      setInterval(reloadMessages, 5000);
        // reloadMessagesが５秒後に処理が実行される。
      
  });