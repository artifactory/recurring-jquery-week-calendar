# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_weekcalendar_session',
  :secret      => '14406a576c46569a527dedbb06289c2e2f1188cb8c23154412a347a71098bc6a2d25f204924b1bdded77d64e92a4fcd55cdd3a46af10743b87e6bc425faa46fc'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
