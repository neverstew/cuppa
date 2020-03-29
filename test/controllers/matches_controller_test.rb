require 'test_helper'

class MatchesControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "should be protected" do
    get matches_path
    assert_response :redirect

    sign_in users(:jared)
    get matches_path
    assert_response :success
  end

  test "should redirect users who haven't completed onboarding to Edit their profile" do
    sign_in users(:alice)
    get matches_path
    assert_response :redirect
    follow_redirect!

    assert_select 'h2', 'Edit Profile'
  end

  test 'should not include previous matches' do
    sign_in users(:gina)
    get matches_path

    assert_equal [users(:stacey)], @controller.instance_variable_get('@matches')
  end

end
