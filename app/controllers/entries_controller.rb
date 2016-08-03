class EntriesController < ApplicationController
  before_action :set_entry, only: [:show, :update, :destroy]

  # GET /entries.json
  def index
    @entries = Entry.all
  end

  # GET /entries/1.json
  def show
  end

  # POST /entries.json
  def create
    @entry = Entry.new(entry_params)

    if @entry.save
      render :show, status: :ok
    else
      @errors = @entry.errors.full_messages
      render "shared/errors", status: :unprocessable_entity
    end
  end

  # PATCH/PUT /entries/1.json
  def update
    if @entry.update_attributes(entry_params)
      render :show, status: :ok
    else
      @errors = @entry.errors.full_messages
      render "shared/errors", status: :unprocessable_entity
    end
  end

  # DELETE /entries/1.json
  def destroy
    @entry.destroy
    render json: @entry
  end

  def euclidian
    @result = Entry.euclidianDistanceGuess(
      params[:entry][:height],
      params[:entry][:weight]
    )
    render json: {catLover: @result}
  end

  def pearson
    @result = Entry.pearsonCorrelationScoreGuess(
      params[:entry][:height],
      params[:entry][:weight]
    )
    render json: {catLover: @result}
  end

  def allGuesses
    height = params[:entry][:height]
    weight = params[:entry][:weight]
    @results = {}

    @results["euclidian"] = Entry.euclidianDistanceGuess(height, weight)
    @results["pearson"] = Entry.pearsonCorrelationScoreGuess(height, weight)

    render json: @results
  end

  private
    def set_entry
      @entry = Entry.find(params[:id])
    end

    def entry_params
      params.require(:entry).permit(:name, :weight, :height, :catLover)
    end
end
