require 'rails_helper'

RSpec.describe Question, type: :model do
end

RSpec.describe Question, type: :routing do
  it 'routes /questions to show all questions' do
    expect(:get => "/questions").to be_routable
  end

  it 'routes /questions/show to show one question' do
    expect(:get => "/questions/show").to be_routable
  end
end
