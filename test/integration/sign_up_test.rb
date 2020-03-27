require 'test_helper'

class SignUpTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  
  test 'can create an account' do
    get '/'
    assert_response :success

    get new_user_registration_path
    assert_response :success

    post '/'
    assert_select '#error_explanation', 1

    post '/', params: { 
      user: {
        email: 'someemail@example.com',
        password: 'bigboiipass',
        password_confirmation: 'bigboiipass',
        role: 'helper'
        }
      }
    
    assert_response :redirect
    assert_equal User.count, 1
  end

  test 'gets redirected to users#show' do
    @user = User.create(email: 'ex@example.com', password: 'aksdhjfasdf', role: :helper)
    sign_in @user
    get '/'
    follow_redirect!

    assert_select 'h1', 'Users#show'
  end
end
