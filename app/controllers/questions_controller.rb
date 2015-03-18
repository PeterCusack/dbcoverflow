class QuestionsController < ApplicationController
    before_action :set_question, only: [:show, :edit, :update, :destroy]
  def index
    @questions = Question.all
  end

  def new
    @question = Question.new
  end

  def create
    @question = Question.new(question_params)
    if @question.save
      redirect_to root_path
    else
      @errors = @question.errors.full_messages
      redirect_to root_path
    end
  end

  def show
    # @question = Question.find(params[:id])
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
    params.require(:question).permit(:title, :content)
  end
end
