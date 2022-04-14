class SubsController < ApplicationController
  before_action :set_sub, only: %i[show edit update destroy ]


  # GET /subs
  def index
    @subs = Sub.where(uid: params[:currentUid])
    render json: @subs
  end

  # POST /subs
  def create
    @sub = Sub.new(
      sub_name: params[:sub_name],
      fee: params[:fee],
      period: params[:period],
      link: params[:link],
      uid: params[:uid],
    )

    @sub.save
  end

  # PATCH /subs/:id
  def update
    @sub.update(sub_params)
  end

  # DELETE /subs/:id
  def destroy
    @sub.destroy
  end


  private

    def set_sub
      @sub = Sub.find(params[:id])
    end

    def sub_params
      params.require(:sub).permit(:sub_name, :fee, :link, :uid, :period, :session)
    end
  
end
