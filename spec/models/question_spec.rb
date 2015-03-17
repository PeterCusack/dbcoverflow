require 'rails_helper'

RSpec.describe Question, type: :model do
		it "has a valid factory" 
		it "is invalid without a firstname" 
		it "is invalid without a lastname" 
		it "returns a contact's full name as a string"
end

RSpec.describe Question, type: :routing do
  it 'routes /questions to show all questions' do
    expect(:get => "/questions").to be_routable
  end

  it 'routes /questions/show to show one question' do
    expect(:get => "/questions/show").to be_routable
  end
end
