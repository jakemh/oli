require 'aweber'

class OliController < Devise::RegistrationsController
  
  CONSUMER_KEY = "AkB5AxUg1suXLOEDRs3XWILU" 
  CONSUMER_SECRET = "VD02JR26eEmvv0xfaLriafujPHaruAtHt4LXISM1" 
  ACCESS_TOKEN = "AgliSsKHr64scyPPJe0eIwvu"
  ACCESS_TOKEN_SECRET = "SsqIjkwe4KCCGFr4l0BvVrviZXfJdnXn33Qs1R45"
  AWEBER_LIST = "test-api"
  ALREADY_SUBSCRIBED = "You have already subscribed!"
  MISSING_INPUT = "Your input was blank!"
  MISSING_EMAIL = "Please enter a proper address!"
  ERROR_OTHER = "Please try again"

  def landing
    render "landing"
  end

  def success
    render "landing"
  end

  def create
    build_resource(sign_up_params)
    puts "PARAMS: ", sign_up_params
    resource_saved = resource.save
    yield resource if block_given?
    if resource_saved
      if resource.active_for_authentication?
        set_flash_message :notice, :signed_up if is_flashing_format?
        sign_up(resource_name, resource)
        sub
      else
        set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_flashing_format?
        expire_data_after_sign_in!
        sub
      end
    else
      clean_up_passwords resource
      @status = resource.errors.messages.first.join(" ")
      flash.now[:notice] = @status
      render 'error', :status => 404
    end
  end

  def sub 
    @status = "Thank you for registering!"
    error = false
    begin
      oauth = AWeber::OAuth.new(CONSUMER_KEY, CONSUMER_SECRET)
      oauth.authorize_with_access(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
      aweber = AWeber::Base.new(oauth)
      new_subscriber = {"email" => params[:user][:email], "name" => params[:user][:name]}
      aweber.account.lists.find_by_name(AWEBER_LIST).subscribers.create(new_subscriber)

    rescue AWeber::CreationError => message
      if message.to_s.include? "email: Subscriber already subscribed."
         @status = ALREADY_SUBSCRIBED
      elsif message.to_s.include? "email: Invalid email address."
         @status = MISSING_EMAIL
      elsif message.to_s.include? "email: Required input is missing."
         @status = MISSING_INPUT
      else @status = ERROR_OTHER
      end

      error = true
    end
    flash.now[:notice] = @status
    if error
      render 'error', :status => 404
    else
      render 'subscribe'
    end
  end

  def subscribe
    puts "SUBSCRIBE"
   

    respond_to do |format|
      format.html
      format.js do 
       
      end
    end
  end

end
