  class Mailer
    include Resque::Mailer

    def self.perform(opt)
      UserMailer.subject_email(opt).deliver
    end

  end