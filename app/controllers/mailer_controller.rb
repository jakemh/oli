 require 'sidekiq/api'

class MailerController < ApplicationController

  def mail
    permit = params.permit(:to, :subject, :body)
    # UserMailer.delay.send_mail({
    #   :to => permit[:to],
    #   :subject => permit[:subject],
    #   :body => permit[:body], 
    #   :reply_to => current_user.email
    #   })
    opts = {:to => permit[:to],
      :subject => permit[:subject],
      :body => permit[:body], 
      :reply_to => current_user.email
      }


    if not `ps aux | grep '[s]idekiq'`.blank?
      UserMailer.delay.send_mail(opts)
    else UserMailer.send_mail(opts).deliver
    # UserMailer.perform_async(opts)
    end
  end
end
