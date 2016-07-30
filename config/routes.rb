Rails.application.routes.draw do
  root to:"static_pages#root"
  resources :entries, except: [:new, :edit], defaults: {format: :json}
end
