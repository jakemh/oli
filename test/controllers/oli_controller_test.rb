require 'test_helper'

class OliControllerTest < ActionController::TestCase
  test "should get landing" do
    get :landing
    assert_response :success
  end

end
