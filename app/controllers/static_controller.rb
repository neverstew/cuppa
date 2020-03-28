class StaticController < ApplicationController
  def index
    return redirect_to user_path(current_user) if user_signed_in?
    render :layout => 'hero_page'
  end
end