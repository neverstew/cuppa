require 'test_helper'

class EditProfileTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test 'shows fields pre-populated' do
    alice = users(:alice)

    sign_in alice
    get edit_user_registration_path

    assert_select '#user_email' do
      assert_select "[value=?]", alice.email
    end

    assert_select '#user_role_seeker' do
      assert_select "[checked=?]", "checked"
    end

    alice.update_attributes(
      email: 'newemail@example.com',
      role: :helper
    )

    get edit_user_registration_path

    assert_select '#user_email' do
      assert_select "[value=?]", 'newemail@example.com'
    end

    assert_select '#user_role_seeker[checked]', 0
    assert_select '#user_role_helper' do
      assert_select "[checked=?]", "checked"
    end
  end
end
