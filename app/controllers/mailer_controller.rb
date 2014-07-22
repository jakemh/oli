class MailerController < ApplicationController

  def mail
    permit = params.permit(:to, :subject, :body)
    # UserMailer.delay.send_mail({
    #   :to => permit[:to],
    #   :subject => permit[:subject],
    #   :body => permit[:body], 
    #   :reply_to => current_user.email
    #   })
        Resque.enqueue(UserMailer, {:to => permit[:to],
      :subject => permit[:subject],
      :body => permit[:body], 
      :reply_to => current_user.email
      })

  end
end
