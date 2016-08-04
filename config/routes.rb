Rails.application.routes.draw do
  root to:"static_pages#root"
  get "guess/euclidian", to:"entries#euclidian", defaults: {format: :json}
  get "guess/pearson", to:"entries#pearson", defaults: {format: :json}
  get "guess/tanimoto", to:"entries#tanimoto", defaults: {format: :json}
  get "guess/all", to:"entries#allGuesses", defaults: {format: :json}
  resources :entries, except: [:new, :edit], defaults: {format: :json}
end
