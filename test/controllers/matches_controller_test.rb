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

  test 'should be able to update matches' do
    gina = users(:gina)
    evan = users(:evan)

    sign_in gina
    patch '/matches', xhr: true, as: :json, params: { match: { id: evan.id, relationship: 'dismissed' }}

    assert_response :ok
    assert Match.find_by(user_a: gina, user_b: evan).dismissed?
  end
end
