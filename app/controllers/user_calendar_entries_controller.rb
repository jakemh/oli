class UserCalendarEntriesController < ApplicationController
  
  def list
    render :json => UserCalendarEntry.find(params[:ids]), :root => "userCalendarEntries"
  end

  def update
  end

  def show
    render :json => UserCalendarEntry.find(params[:id]), :root => "userCalendarEntry"
  end

  def create
    permit = params[:userCalendarEntry].permit(:entry, :component, :context, :date, :active, :added_to_calendar)
    UserCalendarEntry.create!(:user => current_user, :date => permit[:date], :component_id => permit[:component], :entry => permit[:entry], :context => permit[:context])
    render :json => nil
  end
end
