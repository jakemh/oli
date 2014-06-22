class Thread < Box
  has_many :ratings, dependent: :destroy
end