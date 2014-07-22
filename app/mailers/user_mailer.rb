class UserMailer < ActionMailer::Base
  include Sidekiq::Worker
  default from: "notification@getoli.com"
  sidekiq_options :retry => 3 # Only five retries and then to the Dead Job Queue

  def send_mail(opt = {})
    mail({
      :to => opt[:to], 
      :subject => opt[:subject], 
      :body => opt[:body]      
      })
  end

  def perform(opt = {})
    send_mail(opt)
  end

end
