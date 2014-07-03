class BoxableEntry < ActiveRecord::Base
  belongs_to :boxable 
  belongs_to :action_entry
end
