class Api::MessagesController < ApplicationController
  def index
    respond_to do |format| 
      format.html
      format.json { @new_messages = Message.where('id > ?', params[:message_id]) } 
      #グループが所有しているメッセージの中から、params[:id]よりも大きいidがないかMessageから検索して、@messagesに代入。
    end
  end
end