class UserMailer < ActionMailer::Base
  default from: "notification@getoli.com"
  # :reply_to => current_user.email

  def send_mail(opt = {})
    mail({
      :to => opt[:to], 
      :subject => opt[:subject], 
      :body => opt[:body]      
      })
  end

end
