class UserCalendarEntriesController < ApplicationController
  
  def list
    render :json => current_user.user_calendar_entries.where(:id => params[:ids]), :root => "userCalendarEntries"
    # render :json => UserCalendarEntry.where(:user => current_user, :id => params[:ids]), :root => "userCalendarEntries"
  end

  def update
  end

  def show
    render :json => current_user.user_calender_entries.where(:id => params[:id]), :root => "userCalendarEntries"
  end

  def create
    permit = params[:userCalendarEntry].permit(:entry, :component, :context, :date, :active, :added_to_calendar)
    UserCalendarEntry.create!(:user => current_user, :date => permit[:date], :component_id => permit[:component], :entry => permit[:entry], :context => permit[:context])
    render :json => nil
  end
end
