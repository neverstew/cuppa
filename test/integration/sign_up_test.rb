require 'test_helper'

class SignUpTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'can create an account' do
    get '/'
    assert_response :success

    get new_user_registration_path
    assert_response :success

    post '/users'
    assert_select '#error_explanation', 1

    post '/users', params: { 
      user: {
        email: 'someemail@example.com',
        password: 'bigboiipass',
        password_confirmation: 'bigboiipass',
        role: 'helper'
        }
      }
    
    assert_response :redirect
    assert_equal User.last.email, 'someemail@example.com'
  end

  test 'gets redirected to Edit User page' do
    @user = User.create(email: 'ex@example.com', password: 'aksdhjfasdf', role: :helper)
    sign_in @user
    get '/'
    follow_redirect!
    follow_redirect!
    assert_select 'h2', 'Edit Profile'
  end

  test 'log in/out links show correctly' do
    get new_user_session_path
    assert_select 'a', 'Log in'

    sign_in users(:alice)
    get '/'
    follow_redirect!
    follow_redirect!

    assert_select 'a', 'Log out'
  end
end
