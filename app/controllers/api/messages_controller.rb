class Api::MessagesController < ApplicationController
  def index
    respond_to do |format| 
      format.html
      format.json { @new_messages = Message.where('id > ?', params[:message_id]) } 
    end
  end
end