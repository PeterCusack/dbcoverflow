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
end
