Rails.application.routes.draw do


  get 'boxes/list'

  get 'boxes/new'

  get 'mailer/send'

  class FormatTest
    attr_accessor :mime_type

    def initialize(format)
      @mime_type = Mime::Type.lookup_by_extension(format)
    end

    def matches?(request)
      request.format == mime_type
    end
  end
  root to: 'oli#landing'

  match "/me" => "users#show", via: :get, :as => :my_page

  devise_for :users
  match "/landing" => "oli#landing", via: :get
  match "/landing" => "oli#subscribe", via: :post

  get '/courses/*all', :to => 'ember#index', :constraints => FormatTest.new(:html)
  get '/topics', :to => 'topics#list'
  get '/sections', :to => 'sections#list'
  get '/activities', :to => 'activity#list'
  get '/topics/:id', :to => 'topics#list'
  get '/sections/:id', :to => 'sections#list'
  get '/activities/:id', :to => 'activity#list'
  get '/courses/:id', :to => 'courses#get'
  get '/components/', :to => 'components#list'
  get '/components/:id', :to => 'components#show'
  put '/components/:id', :to => 'components#update'
  get '/words/', :to => 'words#list'

  put '/words/:id', :to => 'words#update'
  post '/words/', :to => 'words#new'
  get '/words/', :to => 'words#new'
  get '/boxes/', :to => 'boxes#list'
  get '/boxes/:id', :to => 'boxes#show'

  get 'ratings', :to => 'ratings#list'
  post 'ratings', :to => 'ratings#new'

  delete '/words/:id', :to => 'words#destroy'

  put '/statuses/:id', :to => 'statuses#update'
  put '/activities/:id', :to => 'activities#update'
  post '/entries', :to => 'user_entries#create'
  get '/entries', :to => 'user_entries#list'
  post '/send_mail', :to => 'mailer#mail'

  resources :courses do
    resources :topics do
      resources :sections do
        resources :activities do
        end
      end
    end
  end
  
    



  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
