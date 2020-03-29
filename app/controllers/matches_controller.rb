class MatchesController < ApplicationController
  before_action :authenticate_user!

  def index
    unless current_user.completed_onboarding_at? then
      redirect_to edit_user_registration_path and return
    end

    if current_user.seeker? then
      max_distance = ENV['MAX_DISTANCE'] ? ENV['MAX_DISTANCE'].to_i : 5000
      previous_matches = current_user.matches.pluck(:user_b_id)
      @matches = User
        .available
        .helper
        .where.not(id: previous_matches)
        .limit(100)
        .select{ |user| user.within(max_distance, current_user) }
    else
      @matches = []
    end
  end

  def create
    other_user = User.find(default_params[:id])
    render status: 403, error: "Invalid match." and return if other_user.nil?

    match = Match.new(user_a: current_user, user_b: other_user, relationship: default_params[:relationship])
    if match.save then
      head :created
    else
      render status: 403, error: "Invalid match."
    end
  end

  private
    def default_params
      params.require(:match).permit(:id, :relationship)
    end
end
