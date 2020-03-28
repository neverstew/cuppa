require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'can be created' do
    user = User.create(
      id: 99,
      email: 'somemail@example.com',
      password: 'mygreatpassword',
      created_at: Time.now(),
      updated_at: Time.now(),
      role: 0
    )

    assert user.persisted?
  end

  test 'cannot be created without role' do
    user = User.create(
      id: 99,
      email: 'somemail@example.com',
      password: 'mygreatpassword',
      created_at: Time.now(),
      updated_at: Time.now(),
      # role: 0
    )

    assert !user.persisted?
  end

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
