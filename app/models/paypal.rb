module Paypal

  def self.request
    request = Paypal::Express::Request.new(
      :username   => "ahalya_api1.ahalyakumaran.com",
      :password   => "HATPE42Q3VCAKHRB",
      :signature  => "AmCIzqmsRVN8FMHcN9-vpPRyucuOAJecYug530acgrDwZejZHQj5aP5v"
    )
    p "REQUEST: ", request
    payment_request = Paypal::Payment::Request.new(
      :currency_code => :JPY, # if nil, PayPal use USD as default
      :billing_type  => :RecurringPayments,
      :billing_agreement_description => "OLI_Membership"
    )
    response = request.setup(
      payment_request,
      paypal_success_path,
      paypal_cancel_path
    )
    response.redirect_uri
  end
end