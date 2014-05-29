class WordSelection < Component
  belongs_to :activity
  has_many :words, :as => :wordable
end
