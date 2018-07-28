json.messages @new_message.each do |message|
  json.user_name message.user.name
  json.date message.created_at.to_s
  json.content message.content
  json.image_url message.image.url
  json.id message.id
end
