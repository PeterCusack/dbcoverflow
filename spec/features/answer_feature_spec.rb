require 'rails_helper'
describe Answer, :js => true do

  it "has a button to create an answer" do
    FactoryGirl.create(:question)
    visit questions_path + "/#{Question.first.id}"
    title = Faker::Lorem.sentence(2)
    fill_in 'Title', with: title
    fill_in 'Content', with: Faker::Lorem.paragraph(2)
    click_on ('Create Answer')
    expect(page).to have_content(title)
  end

  it "has an upvote button that increments vote by +1" do
    @question = FactoryGirl.create(:question)
    @question.answers << FactoryGirl.create(:answer)
    visit questions_path + "/#{Question.first.id}"
    before_vote_count = page.find(".total_votes").text.to_i
    click_on('Upvote')
    expect(page.find(".total_votes").text.to_i).to eq(before_vote_count + 1)
  end

  it "has an Downvote button that increments vote by -1" do
    @question = FactoryGirl.create(:question)
    @question.answers << FactoryGirl.create(:answer)
    visit questions_path + "/#{Question.first.id}"
    before_vote_count = page.find(".total_votes").text.to_i
    click_on('Downvote')
    expect(page.find(".total_votes").text.to_i).to eq(before_vote_count - 1)
  end
end
