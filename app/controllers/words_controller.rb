class WordsController < ApplicationController
  def list
    render :json => Word.find(params[:ids])
  end

  def update
    w = Word.find(params[:id])
    permit = params[:word].permit(:word, :selected)
    w.update_for_user(current_user, permit[:selected])
    # Word.find(params[:id]).update_attributes(params[:word].permit(:word, :selected))
    render :json => nil
  end

  def new
    permit = params[:word].permit(:word, :selected, :component)
    # save_hash = {:word => permit[:word], :word_selection_id => permit[:component]}
    # allowed_params = params[:word].permit(:word, :selected, :component)
    # save_hash = {:word => allowed_params[:word], :selected => allowed_params[:selected]}.merge({:wordable_type => "Component", :wordable_id => allowed_params[:component]})
    Word.create_for_user({:word => permit[:word], :user => current_user, :component_id => permit[:component], :status => permit[:selected]})

    render :json => nil
  end
end
