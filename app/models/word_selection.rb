class WordSelection < Component
  belongs_to :activity
  has_many :words, :as => :wordable
  before_save :build_word_list

  def dup_items
    super.concat [:words]
  end

  def build_word_list
    
  end
  
end
