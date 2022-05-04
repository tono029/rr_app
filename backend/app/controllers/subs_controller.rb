class SubsController < ApplicationController
  before_action :set_sub, only: %i[show edit update destroy ]
  before_action :set_subs

  # GET /subs
  def index
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

    if @sub.save
      render json: {status: 200, data: @subs}
    else
      render json: {status: 500, message: "登録に失敗しました"}
    end
  end

  # PATCH /subs/:id
  def update
    @sub.update(sub_params)
    render json: @subs
  end

  # DELETE /subs/:id
  def destroy
    @sub.destroy
    render json: {flash: "削除しました。"}
  end

  # ユーザー登録削除時に紐づいたリソース削除
  def destroy_all
    Sub.where(uid: params[:uid]).destroy_all
  end


  private

    def set_sub
      @sub = Sub.find(params[:id])
    end

    def sub_params
      params.require(:sub).permit(:sub_name, :fee, :link, :uid, :period, :session)
    end

    def set_subs
      @subs = Sub.where(uid: params[:current_uid])
    end
  
end
