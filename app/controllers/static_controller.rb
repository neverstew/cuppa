class StaticController < ApplicationController
  def index
    render :layout => 'hero_page'
  end
end