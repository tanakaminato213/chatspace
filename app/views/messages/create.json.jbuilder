# （キー：値）のハッシュを作っているので、ファイル名にbuilderという単語が入っている。
json.data @message.created_at.strftime("%Y/%m/%d %H:%M")
json.content @message.content
json.image @message.image.url
json.(@message, :content, :image)
json.user_name @message.user.name
#idもデータとして渡す
json.id @message.id