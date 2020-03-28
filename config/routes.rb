Rails.application.routes.draw do
  get 'matches/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'static#index'
  
  devise_for :users, path: 'users', path_names: { sign_in: 'login', sign_out: 'logout'}, controllers: {
    registrations: 'users/registrations'
  }
  resources :users, only: [:show, :edit]
end
