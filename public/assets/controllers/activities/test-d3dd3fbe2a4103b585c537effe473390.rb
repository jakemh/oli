require 'set'

class AnagramSolver
    attr_accessor :dictionary, :dictionary_file
    
    def initialize(test)
      @dictionary = test
    end
end



t = AnagramSolver.new("TEST")

p t.dictionary