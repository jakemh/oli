class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :name, :template, :description, :section_id

  embed :ids
  has_many :components,  key: :components
end
