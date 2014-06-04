class Component < ActiveRecord::Base
  belongs_to :activity
  belongs_to :user
  has_many :user_entries
  # validates :master_id, :presence => true
  validates :user_data, :inclusion => {:in => [true, false]}

  after_save :set_master

  def set_master
    if not user_data
      self.master_id = self.id
    end
  end

  def dup_items
    []
  end

  def self.build_dup_list(components_base, components, current_user)
    p "COMP BSE: ", components_base

    components_base.each do |comp|
      if Component.where(:user => current_user, :master_id => comp.id, :activity => comp.activity).length == 0
        user_comp = comp.dup :include => comp.dup_items
        user_comp.user = current_user
        user_comp.master_id = comp.id
        user_comp.user_data = true
        user_comp.save
      end
    end
  end

end
