class Word < ActiveRecord::Base
  # has_many :component
  belongs_to :word_selection
  has_many :selections
  belongs_to :user
  belongs_to :box
  validates :word, :uniqueness => true

  def self.all_for_user(current_user)
    Word.where("user_id = ? OR all_users = ?", current_user.id, true)
  end

  def self.all_for_user_and_component(current_user, component)
    self.all_for_user(current_user).where(:word_selection => component)
  end

  def boxx
    self.box
  end

  def update_for_user(current_user, selected, options = {})

    box = options[:box]

    if box
      self.update_attributes(:box_id => box)
    end

    selection = self.selections.where(:user => current_user).first
    if selection
      selection.update_attributes(:status => selected)
    else 
      self.selections << Selection.new(:user => current_user, :status => selected)
    end
  end

  def self.create_for_user(attributes)
    w = Word.create!(:word => attributes[:word], :word_selection_id => attributes[:component_id], :user => attributes[:user])
    w.selections << Selection.new(:user => attributes[:user], :status => attributes[:status])
    puts "ID: ", w.id
    return w
  end

  def selected(current_user)
    self.selections.where(:user => current_user, :status => true).length > 0
  end

  def component
    self.word_selection.id
  end
end
