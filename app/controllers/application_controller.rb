class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:role])
    devise_parameter_sanitizer.permit(:account_update, keys: [
      :avatar, 
      :description, 
      :latitude,
      :location, 
      :longitude,
      :role,
      :telephone
    ])
  end
end
