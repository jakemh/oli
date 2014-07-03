class ActionEntry < UserEntry
  has_many :boxable_entries
  has_many :boxables, :through => :boxable_entries
  has_many :boxes, :through => :boxables
end