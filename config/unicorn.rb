root = "/home/oli/www/shared"
working_directory = "/home/oli/www/current"
pid "#{working_directory}/tmp/pids/unicorn.pid"
stderr_path "#{working_directory}/log/unicorn.log"
stdout_path "#{working_directory}/log/unicorn.log"

listen "/tmp/unicorn.projectname.sock"
worker_processes 2
timeout 30

# Force the bundler gemfile environment variable to
# reference the capistrano "current" symlink
before_exec do |_|
  ENV["BUNDLE_GEMFILE"] = File.join(root, 'Gemfile')

end

