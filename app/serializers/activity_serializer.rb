class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :name, :template, :description

  embed :ids
  has_many :components,  key: :components
end
