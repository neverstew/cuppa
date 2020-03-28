class StaticController < ApplicationController
  def index
    return redirect_to matches_path if user_signed_in?
    render :layout => 'hero_page'
  end
end