require 'paypal-sdk-adaptivepayments'


class PaypalController < ApplicationController
  def make_payment
  
    @api = PayPal::SDK::AdaptivePayments.new

    # Build request object
    url_base = root_url
    @pay = @api.build_pay({
      :actionType => "PAY",
      :cancelUrl => url_base,
      :currencyCode => "USD",
      :feesPayer => "SENDER",
      :ipnNotificationUrl => url_base + "/payment_succes",
      :receiverList => {
        :receiver => [{
          :amount => 100.0,
          :email => "platfo_1255612361_per@gmail.com" }] },
      :returnUrl => url_base + "/payment_succes"
       })

    # Make API call & get response
    @response = @api.pay(@pay)

    # Access response
    if @response.success?
      @response.payKey
      @api.payment_url(@response) 
      current_user.purchase_course(Course.first, @response.payKey, 100)
     

    else
      @response.error[0].message
      puts "ERROR: ",  @response.error[0].message

    end

    render :json => current_user


  end

end
