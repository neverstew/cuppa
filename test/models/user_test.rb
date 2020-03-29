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

  test '.available' do
    for i in 1..4 do
      User.create(
        email: "user-#{i}-completed@example.com",
        name: i,
        password: "password-#{i}",
        role: :seeker,
        location: "somewhere",
        completed_onboarding_at: Time.now
      )
      User.create(
        email: "user-#{i}-partialcomplete@example.com",
        password: "password-#{i}",
        role: :seeker,
        completed_onboarding_at: Time.now
      )
      User.create(
        email: "user-#{i}-partiallocation@example.com",
        password: "password-#{i}",
        role: :seeker,
        location: 'somewhere'
      )
      User.create(
        email: "user-#{i}-new@example.com",
        password: "password-#{i}",
        role: :seeker
      )
    end

    assert_equal User.available.count, 4 + 4 #for fixture users
  end

  test 'within should return true if two points under the specified distance away' do
    alice = users(:alice)
    place = OpenStruct.new(latitude: alice.latitude + 0.001, longitude: alice.longitude + 0.001)
    
    assert alice.within?(1000, place)
  end

  test 'within should return false if two points over the specified distance away' do
    alice = users(:alice)
    place = OpenStruct.new(latitude: alice.latitude + 0.001, longitude: alice.longitude + 0.001)
    
    assert !alice.within?(100, place)
  end

  test 'has matches' do
    gina = users(:gina)

    assert_equal users(:jared), gina.matches.first.user_b
  end

  test 'can scope matches by relationship' do
    gina = users(:gina)
    matches = [matches(:gina_evan_matched)]

    assert_equal matches, gina.matches.matched
  end

  test 'has users that matched them' do
    evan = users(:evan)
    matched = [matches(:gina_evan_matched)]

    assert_equal matched, evan.matched
  end
end
