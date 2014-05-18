class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :configure_permitted_parameters, if: :devise_controller?
  # after_filter :store_location


  def store_location
    session[:previous_urls] ||= []
    # store unique urls only
    session[:previous_urls].prepend request.fullpath if session[:previous_urls].first != request.fullpath
    # For Rails < 3.2
    # session[:previous_urls].unshift request.fullpath if session[:previous_urls].first != request.fullpath 
    session[:previous_urls].pop if session[:previous_urls].count > 2
  end
  
  def after_inactive_sign_up_path_for(resource)
    my_page_path
  end
  def after_sign_up_path_for(resource)
    my_page_path
  end
  def after_sign_in_path_for(resource)
    my_page_path
  end
    protected

    def configure_permitted_parameters
      devise_parameter_sanitizer.for(:sign_up) << :name
      devise_parameter_sanitizer.for(:account_update) << :name
    end
   
end
