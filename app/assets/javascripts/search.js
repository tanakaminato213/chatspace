$(function() {

  function buildHTML(user){
    // console.log(user)
    var html= `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">${user.name}</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
            </div>`
    return html;
  }

  function buildMESSAGE(){
    // console.log(user)
    var html= `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
            </div>`
    return html;
  }

  function buildMEMBERLIST(name,id){
    // console.log(user)
    // var user =$('p');
    var html=`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
    <input name='group[user_ids][]' type='hidden' value=${id}>
    <p class='chat-group-user__name'>${name}</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  </div>`
    return html;
  }


  $('#user-search-field').on("input",function(e) {
    var input = $("#user-search-field").val();
    if (input== ""){
      $('#user-search-result').empty();
      return false;
    }
    //console.log("発火");
    //console.log(input);
    
    $.ajax({
      type:'GET',
      url: '/users/search',
      data: {keyword : input},
      dataType: 'json'
      
    })
    .done(function(users){
      // console.table(users);
      $('#user-search-result').empty();
      if (users.length== 0){
        var html = buildMESSAGE();
        $('#user-search-result').append(html)
      }
      $(users).each (function(i,user){
        // console.log(user)
      var html = buildHTML(user);
      // console.log(html);

      $('#user-search-result').append(html)
      //console.log(user);
      })
    })
    })


    $(document).on("click",".user-search-add.chat-group-user__btn.chat-group-user__btn--add",function(e){
      //フォームの追加が押されたら、以下の処理が動く
      console.log("発火");

      var user_name = $(this).data('user-name');
      var user_id = $(this).data('user-id');
      console.log(user_name);
      //console.log(this)
      console.log(user_name);
      $("#user-search-result").empty();
      //user-search-resultの情報を削除
      
      
      var html = buildMEMBERLIST(user_name,user_id);
      console.log(html);
      $('.chat-group-users').append(html)

    })

    $(document).on("click",".chat-group-user__btn--remove",function(e){
      //フォームの削除が押されたら、以下の処理が動く
      console.log("削除発火");
      console.log(this);
      $(this).parent().remove()
    })
  });