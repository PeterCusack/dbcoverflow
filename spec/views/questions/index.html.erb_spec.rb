require 'rails_helper'

RSpec.describe "questions/index.html.erb", type: :view do
  context "question has a url that links to its show page" do
    it "has the url" do
      assign(:question, Question.create(title: "Testing Question", content: "Content for Question"))
      render
      expect(rendered).to have_link "Testing Question", href: question_path(@question)
      # Question.destroy_all
    end
  end
end
