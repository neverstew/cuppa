class MatchesController < ApplicationController
  before_action :authenticate_user!

  def index
    unless current_user.completed_onboarding_at? then
      redirect_to edit_user_registration_path and return
    end
  end
end
