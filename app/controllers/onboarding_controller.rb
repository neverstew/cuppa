class OnboardingController < ApplicationController
  before_action :authenticate_user!

  def show
    @id = params[:id]
  end
end
