class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :name, :template, :description, :section_id, :completed, :dependencies

  def completed
    stat = object.status(current_user).first
    if stat
      return stat.completed
    else return stat
    end
  end
  
  # def activity_dependencies
  #   stat = object.activity_dependencies.pluck(:dependent_activity_id)
  # end
  

  has_many :components, embed: :ids,  key: :components
  # has_many :activity_dependencies, embed: :ids,  key: :dependencies
end
