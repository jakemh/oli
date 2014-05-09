require 'aweber'

class OliController < ApplicationController

  CONSUMER_KEY = "AkB5AxUg1suXLOEDRs3XWILU" 
  CONSUMER_SECRET = "VD02JR26eEmvv0xfaLriafujPHaruAtHt4LXISM1" 
  ACCESS_TOKEN = "AgliSsKHr64scyPPJe0eIwvu"
  ACCESS_TOKEN_SECRET = "SsqIjkwe4KCCGFr4l0BvVrviZXfJdnXn33Qs1R45"

  def landing

  end

  def success
    render "landing"
  end


  def subscribe
    @status = "Thank you for registering!"
    error = false

    flash.now[:notice] = @status
    respond_to do |format|
      format.html
      format.js do 
        begin
          oauth = AWeber::OAuth.new(CONSUMER_KEY, CONSUMER_SECRET)
          oauth.authorize_with_access(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
          aweber = AWeber::Base.new(oauth)
          new_subscriber = {}
          new_subscriber["email"] = params[:email]
          new_subscriber["name"] = params[:name]
          aweber.account.lists.find_by_name("test-api").subscribers.create(new_subscriber)

        rescue AWeber::CreationError => message

          if message.to_s.include? "email: Subscriber already subscribed."
             @status = "You have already subscribed!"
          elsif message.to_s.include? "email: Invalid email address."
             @status = "Please enter a proper address!"
          elsif message.to_s.include? "email: Required input is missing."
             @status = "Your input was blank!"
          else @status = "Please try again!"
          end

          error = true
        end
        flash.now[:notice] = @status
        if error
          render "error"
        else
          render "subscribe"
        end
      end
    end
  end
end
