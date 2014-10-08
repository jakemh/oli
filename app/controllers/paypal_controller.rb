# require 'paypal-sdk-adaptivepayments'

require 'paypal'

class PaypalController < ApplicationController
  
  def create
    @payment = Payment.new(
      :amount => 7.99,
      :digital => true,
      :popup => false,
      :recurring => false
      )

    @payment.setup!(
     paypal_success_url,
     paypal_cancel_url
    )
    if @payment.popup?
      redirect_to @payment.popup_uri
    else
      @uri = @payment.redirect_uri.to_s
      # redirect_to @payment.redirect_uri

      respond_to do |format|
        format.html
        format.json
      end
      # redirect_to payment.redirect_uri
      # render :json => "TEST", :head => :no_content
    end
  end


  # def success
  #   redirect_to root_url
  # end

  def cancel

  end

  def success
    payment = Payment.find_by_token! params[:token]
    payment.complete!(params[:PayerID])
    flash[:notice] = 'Payment Transaction Completed'
    current_user.purchase_course(Course.first)
    redirect_to first_login_path
  end

  def cancel
    handle_callback do |payment|
      payment.cancel!
      flash[:warn] = 'Payment Request Canceled'
      root_url
    end
  end

  private

  def handle_callback
    payment = Payment.find_by_token! params[:token]
    @redirect_uri = yield payment
    if payment.popup?
      render :close_flow, layout: false
    else
      redirect_to root_url
    end
  end
  def make_payment2
  
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
      current_user.purchase_course(Course.first)
     

    else
      @response.error[0].message
      puts "ERROR: ",  @response.error[0].message

    end

    render :json => current_user


  end

end
