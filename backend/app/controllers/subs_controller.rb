class SubsController < ApplicationController
  before_action :set_sub, only: %i[show edit update destroy ]



  def index
    @subs = Sub.all
    render json: @subs
  end

  def create
    @sub = Sub.new(
      sub_name: params[:sub_name],
      fee: params[:fee],
    )
    @sub.save
  end

  def update
    
  end

  def destroy
    @sub.destroy
  end


  private

    def set_sub
      @sub = Sub.find(params[:id])
    end
  
end
