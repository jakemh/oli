class WordsController < ApplicationController
  def list
    render :json => Word.find(params[:ids])
  end

end
