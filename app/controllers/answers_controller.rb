class AnswersController < ApplicationController
  before_action :set_answer, only: [:index, :new, :update, :upvote, :downvote]

  def index
  end

  def new
  end

  def upvote
    new_vote_count = params[:answers][:votes].to_i
    new_vote_count += 1
    @answer.update(
      votes: new_vote_count
    )
    render json: @answer
  end

  def downvote
    new_vote_count = params[:answers][:votes].to_i
    new_vote_count -= 1
    @answer.update(
      votes: new_vote_count
    )
    render json: @answer
  end

  def update
    if @answer.update(answer_params)
      redirect_to question_path(params[:question_id])
    else
      redirect_to question_path(params[:question_id])
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

  private
  def answer_params
    params.require(:answer).permit(:title, :content, :votes)
  end
  def set_answer
    @answer = Answer.find(params[:id])
  end
end
