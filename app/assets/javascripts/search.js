$(document).on('turbolinks:load',function() {

  function buildHTML(user){
    var html= `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
            </div>`
    return html;
  }

  function buildMESSAGE(){
    var html= `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
            </div>`
    return html;
  }

  function buildMEMBERLIST(name,id){
    var html=`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
    <input name='group[user_ids][]' type='hidden' value=${id} class="member_list">
    <p class='chat-group-user__name'>${name}</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  </div>`
    return html;
  }


  $('#user-search-field').on("input",function(e) {


    var input = $("#user-search-field").val();
    //#user-search-fieldの値を取得
    var ids = [];
    
    $(".member_list").each(function(i,element){
      //.member_listの値ををelementに入れる
      var id = $(element).val()
      ids.push(id)
    })

    if (input == ""){
      //検索欄に文字がないとき
      $('#user-search-result').empty();
      // リストを空にする
      return false;
    }
    
    $.ajax({
    // ajaxのリクエスト先を指定している。

      type:'GET',
      url: '/users/search',
      data: {keyword : input, user_id:ids},
      dataType: 'json'
    })
    .done(function(users){
      //ajaxのリクエストが成功したら以下の処理が動く。
      //インスタンス変数を(users)という名前で受け取る。

      $('#user-search-result').empty();
      //'#user-search-result'の子要素を削除。
      if (users.length == 0){
        
        var html = buildMESSAGE();
        $('#user-search-result').append(html)
      }

      $(users).each (function(i,user){
        var html = buildHTML(user);
        $('#user-search-result').append(html)
      })
    })
    })


    $(document).on("click",".user-search-add.chat-group-user__btn.chat-group-user__btn--add",function(e){
      //フォームの追加が押されたら、以下の処理が動く


      var user_name = $(this).data('user-name');
      var user_id = $(this).data('user-id');

      $("#user-search-result").empty();
      //user-search-resultの情報を削除
      
      
      var html = buildMEMBERLIST(user_name,user_id);

      $('.chat-group-users').append(html)

    })

    $(document).on("click",".chat-group-user__btn--remove",function(e){
      //フォームの削除が押されたら、以下の処理が動く

      $(this).parent().remove()
    })
  });