require 'aweber'

class OliController < ApplicationController

  CONSUMER_KEY = "AkB5AxUg1suXLOEDRs3XWILU" 
  CONSUMER_SECRET = "VD02JR26eEmvv0xfaLriafujPHaruAtHt4LXISM1" 
  ACCESS_TOKEN = "AgliSsKHr64scyPPJe0eIwvu"
  ACCESS_TOKEN_SECRET = "SsqIjkwe4KCCGFr4l0BvVrviZXfJdnXn33Qs1R45"

  def landing
    
  end

  def subscribe
    begin
    oauth = AWeber::OAuth.new(CONSUMER_KEY, CONSUMER_SECRET)
    oauth.authorize_with_access(ACCESS_TOKEN, ACCESS_TOKEN_SECRET)
    aweber = AWeber::Base.new(oauth)
    new_subscriber = {}
    new_subscriber["email"] = params[:data]
    new_subscriber["name"] = "No name"
    aweber.account.lists.find_by_name("test-api").subscribers.create(new_subscriber)
    rescue AWeber::CreationError => message
      p message
      if message.to_s.include? "email: Subscriber already subscribed."
        puts "TEST1"
      elsif message.to_s.include? "email: Invalid email address."
        puts "TEST2"
      elsif message.to_s.include? "email: Required input is missing."
        puts "TEST3"
      else puts "TEST4"
      end
    end


    render :landing
  end
end
