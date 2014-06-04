class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :name, :template, :description, :section_id

  embed :ids

  def components
    user = current_user

    # ids = params[:ids]
    master_ids = Component.where(:user_data => false, :activity => object).pluck(:id)
    puts "*MASTER: ", master_ids 
    # components_base = Component.find(master_ids)
    components = Component.where(:master_id => master_ids, :user_id => current_user.id)
    
    #TODO maybe make this a service object?
    if master_ids.count > components.count
      # byebug
      components_base = Component.find(master_ids)
      p "COMP BASE IDS: ", master_ids

      p "COMP BASE 0: ", components_base
      Component.build_dup_list(components_base, components, current_user)
      components = Component.where(:master_id => master_ids, :user_id => current_user.id)
    end

    return components.sort
  end
  
  has_many :components,  key: :components
end
