require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'can be seeker' do
    user = User.new
    user.role = :seeker

    assert user.seeker?
  end

  test 'can be helper' do
    user = User.new
    user.role = :helper

    assert user.helper?
  end
end
