class AnswersController < ApplicationController
  def create
    sleep(10)
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
    params.require(:answer).permit(:title, :content)
  end
end
