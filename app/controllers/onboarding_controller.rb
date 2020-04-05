class OnboardingController < ApplicationController
  before_action :authenticate_user!

  def show
    @id = current_user.id
  end

  def create
    begin
      current_user.update_attributes(
        name: default_params[:name],
        description: default_params[:description],
        completed_onboarding_at: Time.now
      )
      # current_user.avatar.attach(default_params[:avatar])
      return head :ok
    rescue
      return head :internal_server_error
    end
  end

  protected

  def default_params
    params.require(:user).permit(:name, :avatar, :description, :location)
  end
end
