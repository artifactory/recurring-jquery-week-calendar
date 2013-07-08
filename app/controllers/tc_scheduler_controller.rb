class TcSchedulerController  < ApplicationController



  def index
    @user = User.find(1)  #demo user created in migration
    render :template => 'tc_scheduler/_tc_scheduler.html.erb', :user => (session[:user] = @user)
  end
end

