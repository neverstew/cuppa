class MatchesController < ApplicationController
  before_action :authenticate_user!

  def index
    unless current_user.completed_onboarding_at? then
      redirect_to edit_user_registration_path and return
    end

    if current_user.seeker? then
      max_distance = ENV['MAX_DISTANCE'] ? ENV['MAX_DISTANCE'].to_i : 5000
      @matches = User.helper.available.limit(100).select{ |user| user.within(max_distance, current_user) }
    else
      @matches = []
    end
  end
end
