class AnswersController < ApplicationController
  before_action :set_answer, only: [:index, :new, :update]
  def index
  end
  def new
  end

  def update
    p "hello"
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
      redirect_to questions_path + "/#{@question.id}"
    else
      @errors = errors.full_messages
      redirect_to questions_path
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
