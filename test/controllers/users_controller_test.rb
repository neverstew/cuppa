require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'is protected controller' do
    alice = users(:alice)

    get user_path(alice)
    assert_response :redirect

    sign_in :alice
    get user_path(alice)
    assert_response :redirect
    follow_redirect!
    assert_response :success
  end
end
