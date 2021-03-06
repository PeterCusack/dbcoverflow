class QuestionsController < ApplicationController
    before_action :set_question, only: [:show, :edit, :update, :destroy, :upvote, :downvote]
  def index
    @quote = Quote.new
    @questions = Question.all
  end

  def new
    @question = Question.new
  end

  def edit
  end

  def upvote
    new_vote_count = params[:questions][:votes].to_i
    new_vote_count += 1
    @question.update(
      votes: new_vote_count
    )
    render json: @question
  end

  def downvote
    new_vote_count = params[:questions][:votes].to_i
    new_vote_count -= 1
    @question.update(
      votes: new_vote_count
    )
    render json: @question
  end

  def update
    if @question.update(question_params)
      redirect_to root_path
    else
      render 'edit'
    end
  end

  def create
    @question = Question.new(question_params)
    if @question.save
      render json: @question
    else
      @errors = @question.errors.full_messages
    end
  end

  def show
    @question = Question.find(params[:id])
    @answers = @question.answers
  end

  def destroy
    @question.destroy
    redirect_to root_path
  end
  private

  def set_question
    @question = Question.find(params[:id])
  end

  def question_params
    params.require(:question).permit(:title, :content, :votes)
  end
end
