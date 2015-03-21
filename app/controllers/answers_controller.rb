class AnswersController < ApplicationController
  before_action :set_answer, only: [:index, :new, :update, :upvote, :downvote, :edit, :destroy]

  def index
  end

  def new
  end

  def edit
    @question = Question.find(params[:question_id])
  end

  def upvote
    add_vote = @answer.votes + 1
    @answer.update(votes: add_vote)
    render json: @answer
  end

  def downvote
    delete_vote = @answer.votes - 1
    @answer.update(votes: delete_vote)
    render json: @answer
  end

  def update
    if @answer.update(answer_params)
      redirect_to question_path(@answer.question_id)
    else
      redirect_to question_path(@answer.question_id)
    end
  end

  def create
    @question = Question.find(params[:question_id])
    @answer = Answer.new(answer_params)
    if @answer.save
      @question.answers << @answer
      render json: @answer
    else
      @errors = errors.full_messages
    end
  end

  def destroy
    @answer.destroy
    redirect_to question_path(@answer.question_id)
  end

  private
  def answer_params
    params.require(:answer).permit(:title, :content, :votes)
  end
  def set_answer
    @answer = Answer.find(params[:id])
  end
end
