Rails.application.routes.draw do
  root to:"static_pages#root"
  get "guess", to:"entries#euclidian", defaults: {format: :json}
  resources :entries, except: [:new, :edit], defaults: {format: :json}
end
