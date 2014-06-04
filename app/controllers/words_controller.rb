class WordsController < ApplicationController
  def list
    render :json => Word.find(params[:ids])
  end

  def update
    Word.find(params[:id]).update_attributes(params[:word].permit(:word, :selected))
    render :json => nil
  end

  def new
    allowed_params = params[:word].permit(:word, :selected, :component)
    save_hash = {:word => allowed_params[:word], :selected => true}.merge({:wordable_type => "Component", :wordable_id => allowed_params[:component]})
    Word.create!(save_hash)
    render :json => nil
  end
end
