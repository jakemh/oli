class WordsController < ApplicationController

  def list
    # render :json => Word.includes([:selections]).find(params[:ids])
    render :json => Word.find_for_user(params[:ids], current_user)
  end

  def update
    w = Word.find(params[:id])
    permit = params[:word].permit(:word, :selected, :box)
    w.update_for_user(current_user, permit[:selected], :box => permit[:box])
    # Word.find(params[:id]).update_attributes(params[:word].permit(:word, :selected))
    render :json => nil
  end

  def new
    permit = params[:word].permit(:word, :selected, :component)
    # save_hash = {:word => permit[:word], :word_selection_id => permit[:component]}
    # allowed_params = params[:word].permit(:word, :selected, :component)
    # save_hash = {:word => allowed_params[:word], :selected => allowed_params[:selected]}.merge({:wordable_type => "Component", :wordable_id => allowed_params[:component]})
    new_word = Word.create_for_user({:word => permit[:word].strip, :user => current_user, :component_id => permit[:component], :status => permit[:selected]})
    render :json => new_word 
  end

  def destroy
    delete_word = Word.find(params[:id])
    delete_word.destroy
    render :json => delete_word
  end

end
