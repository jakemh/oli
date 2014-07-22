class UserMailer < ActionMailer::Base
  default from: "notification@getoli.com"
  # :reply_to => current_user.email
  @queue = :file_serve

  def send_mail(opt = {})
    mail({
      :to => opt[:to], 
      :subject => opt[:subject], 
      :body => opt[:body]      
      })
  end

  def self.perform(opt = {})
    self.send_mail(opt)
  end

end
