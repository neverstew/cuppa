require 'test_helper'

class MatchTest < ActiveSupport::TestCase
  test 'can get matches' do
    assert_equal [matches(:gina_evan_matched)], Match.matched
  end

  test 'can get dismissals' do
    assert_equal [matches(:gina_jared_dismissed)], Match.dismissed
  end

  test 'has belongs_to relationship' do
    assert_equal users(:gina), matches(:gina_jared_dismissed).user_a
    assert_equal users(:jared), matches(:gina_jared_dismissed).user_b
  end
end
