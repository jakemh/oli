root = "/home/oli/www/shared"
working_directory = "/home/oli/www/current"
pid "#{root}/tmp/pids/unicorn.pid"
stderr_path "#{working_directory}/log/unicorn.log"
stdout_path "#{working_directory}/log/unicorn.log"

listen "/tmp/unicorn.projectname.sock"
worker_processes 2
timeout 30

# Force the bundler gemfile environment variable to
# reference the capistrano "current" symlink
before_exec do |_|
  ENV["BUNDLE_GEMFILE"] = File.join(root, 'Gemfile')
  ENV["SECRET_KEY_BASE"] = '76015d74859449d720617ad69330b4b769d1b5d14f213c14c4c63b8ce2a8e26c659a16792bf81fb0f1e0e4a1a5289140165d5f040157659ece6ff288a5601d77'
end

