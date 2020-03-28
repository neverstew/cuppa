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

    assert_select '#user_location' do
      assert_select "[value=?]", alice.location
    end

    assert_select '#user_description' do |description|
      assert_equal description.text.squish, alice.description
    end

    assert_select '#user_telephone' do
      assert_select "[value=?]", alice.telephone
    end

    alice.update_attributes(
      email: 'newemail@example.com',
      role: :helper,
      location: 'New location',
      description: 'New description',
      telephone: '0987654321'
    )

    get edit_user_registration_path

    assert_select '#user_email' do
      assert_select "[value=?]", 'newemail@example.com'
    end

    assert_select '#user_role_seeker[checked]', 0
    assert_select '#user_role_helper' do
      assert_select "[checked=?]", "checked"
    end

    assert_select '#user_location' do
      assert_select "[value=?]", "New location"
    end

    assert_select '#user_description' do |description|
      assert_equal description.text.squish, "New description"
    end

    assert_select '#user_telephone' do
      assert_select "[value=?]", "0987654321"
    end
  end
end
