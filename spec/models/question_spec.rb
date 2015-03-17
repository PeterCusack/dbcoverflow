require 'rails_helper'

RSpec.describe Question, type: :model do
		it "has a valid factory" do
      FactoryGirl.create(:question).should be_valid
    end
	   context "Validations" do
      it {should validate_presence_of :title}
      it {should validate_presence_of :content}
     end
end


RSpec.describe Question, type: :routing do
  it 'routes /questions to show all questions' do
    expect(:get => "/questions").to be_routable
  end

  it 'routes /questions/show to show one question' do
    expect(:get => "/questions/show").to be_routable
  end
end
