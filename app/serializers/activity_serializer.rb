class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :display, :name, :template, :description, :section_id, :completed, :dependencies, :tip, :box_dependencies

  def completed
    p "CURRENT: "
    stat = object.status(current_user).first
    if stat
      return stat.completed
    else return stat
    end
  end
 
  def display
    object.display
  end
  
  # def activity_dependencies
  #   stat = object.activity_dependencies.pluck(:dependent_activity_id)
  # end
  

  has_many :components, embed: :ids,  key: :components
  # has_many :activity_dependencies, embed: :ids, key: :dependencies

  # has_many :activity_dependencies, embed: :ids,  key: :dependencies
end
