class UserMailer < ActionMailer::Base
  default from: "notification@getoli.com"
  # :reply_to => current_user.email

  def send_mail(opt)
    mail(
      opt[:to] =>  to, 
      opt[:subject] => subject, 
      opt[:body] => body, 
      opt[:reply_to] => reply_to 
      )
  end

end
