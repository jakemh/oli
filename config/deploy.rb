# config valid only for Capistrano 3.1
lock '3.2.1'

set :application, 'oli'
set :repo_url, 'git@github.com:jakemh/oli.git'

# Default branch is :master
# ask :branch, proc { `git rev-parse --abbrev-ref HEAD`.chomp }.call

# Default deploy_to directory is /var/www/my_app
set :deploy_to, '/home/oli/www/'
set :deploy_via, :remote_cache

set :unicorn_config_path, '/home/oli/www/current/config/unicorn.rb'
set :unicorn_rack_env, 'production'
set :unicorn_pid, '/home/oli/www/shared/tmp/pids/unicorn.pid'
# Default value for :scm is :git
# set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# set :linked_files, %w{config/database.yml}

# Default value for linked_dirs is []
# set :linked_dirs, %w{bin log tmp/pids tmp/cache tmp/sockets vendor/bundle public/system}

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
# set :keep_releases, 5

namespace :deploy do
  def root
    "/home/oli/www/shared"
  end

  def working_directory
    "/home/oli/www/current"
  end

  def unicorn_pid
    root + "/tmp/pids/unicorn.pid"
  end 

  def old_unicorn_pid
    '/home/oli/www/shared/tmp/pids/unicorn.pid.oldbin'
  end

 desc 'Start Unicorn'
  task :start do
    on roles(:web) do
      within current_path do
          execute :bundle, "exec unicorn -c #{working_directory}/config/unicorn.rb -D -E production"
        end
    end
  end

  desc 'kill Unicorn'
   task :kill do
     on roles(:web) do
       within current_path do
           execute  "kill `cat #{unicorn_pid}`"
         end
     end
   end

  task :restart_uni do
    on roles(:web) do
      within current_path do
          puts "RESTARTING UNICORN"
          execute "kill -s USR2 `cat #{unicorn_pid}`"
        end
    end
  end

  desc "Symlink application.yml to the release path"
  task :finalize do
    on roles(:web) do
      within current_path do
        puts "SYM LINKING"
        execute "ln -sf #{root}/application.yml #{working_directory}/config/application.yml"
        execute "ln -s #{root}/public/videos #{working_directory}/current/public/videos"

      end
    end

  end

  after :publishing, :restart_uni
  after :restart_uni, :finalize
  after :finalize, :kill_old do
    on roles(:web), in: :groups, limit: 1, wait: 10 do
      puts "KILLING OLD UNICORN"
      execute  "kill `cat #{old_unicorn_pid}`"
    end
  end

end
