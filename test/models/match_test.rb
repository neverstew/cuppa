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

  test 'cannot create more than 4 matches per user' do
    one = Match.new(user_a_id: 1, user_b_id: 1, relationship: :matched)
    two = Match.new(user_a_id: 1, user_b_id: 2, relationship: :matched)
    three = Match.new(user_a_id: 1, user_b_id: 3, relationship: :matched)
    four = Match.new(user_a_id: 1, user_b_id: 4, relationship: :matched)
    five = Match.new(user_a_id: 1, user_b_id: 5, relationship: :matched)

    assert one.save
    assert two.save
    assert three.save
    assert four.save
    assert !five.save

    reverse_match = Match.new(user_a_id: 4, user_b_id: 1, relationship: :matched)
    assert !reverse_match.save
  end
end
