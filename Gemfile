source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.1.0'
# Use sqlite3 as the database for Active Record
gem 'pg',  group: :production
gem 'rails_12factor', group: :production
gem 'aweber'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 4.0.3'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .js.coffee assets and views
gem 'coffee-rails', '~> 4.0.0'
# See https://github.com/sstephenson/execjs#readme for more supported runtimes
# gem 'therubyracer',  platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0',          group: :doc

# Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
gem 'spring',        group: :development

gem 'newrelic_rpm'
gem 'devise'
gem "figaro"
gem 'capistrano3-nginx_unicorn', group: :development

# group :development do
#   gem 'capistrano3-unicorn', :require => false
#   gem 'sepastian-capistrano3-unicorn', :require => false

# end
# gem 'capistrano-rvm'
# gem 'capistrano-nginx-unicorn', group: :development

group :development, :test do
  gem 'rspec-rails'
  gem 'factory_girl_rails'
  gem 'sqlite3'

end
gem 'thin'

group :development do
  gem 'capistrano3-unicorn'
end

gem 'figaro'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use unicorn as the app server
gem 'unicorn'

# Use Capistrano for deployment
gem 'capistrano',  '~> 3.1'
gem 'capistrano-rails', '~> 1.1'
gem 'capistrano-rbenv', '~> 2.0'
gem 'capistrano-bundler', '~> 1.1.2'
gem 'capistrano-rvm'
# Use debugger
gem 'debugger', group: [:development, :test]

