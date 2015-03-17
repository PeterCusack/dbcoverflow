class QuestionsController < ApplicationController
  def index
    @questions = Question.all
  end

  def new
    @question = Question.new
  end

  def create
    question = Question.new(question_params)
    if question.save
      redirect_to root_path
    else
      @errors = errors.full_messages
      redirect_to root_path
    end
  end

  def show
    @question = Question.find(params[:id])
    @answers = @question.answers
  end
  private

  def question_params
    params.require(:question).permit(:title, :content)
  end
end
