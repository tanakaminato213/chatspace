json.user_id @message.id
json.data @message.created_at.strftime("%Y/%m/%d %H:%M")
json.content @message.content
json.image @message.image.url