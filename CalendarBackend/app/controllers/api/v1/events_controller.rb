module Api::V1
  class IdeasController < ApplicationController
    def index
      @events = Event.all
      render json: @events
    end
  end
end