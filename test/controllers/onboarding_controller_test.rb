require 'test_helper'

class OnboardingControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  test "is a protected route" do
    gina = users(:gina)
    get onboarding_path

    assert_select "[data-react-class='Onboarding']", 0
  end

  test "show renders the Onboarding component" do
    gina = users(:gina)
    sign_in gina
    get onboarding_path

    assert_select "[data-react-class='Onboarding']", 1
  end
end
