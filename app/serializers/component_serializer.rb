class ComponentSerializer < ActiveModel::Serializer
  attributes :id, :content, :activity_id, :user_data, :user_content

  embed :ids
  
end
