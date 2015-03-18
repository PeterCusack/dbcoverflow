describe Question, :js => true do
  # before(:each) do
  # end

  it "has a button to create an article" do
    visit root_path
    title = Faker::Lorem.sentence(2)
    fill_in 'Title', with: title
    fill_in 'Content', with: Faker::Lorem.paragraph(2)
    click_on ('Save Question')
    expect(page).to have_content(title)
  end

  it "has a button that leads to show page" do
    question = FactoryGirl.create(:question)
    visit root_path
    click_on(question.title)
    expect(page).to have_content(question.content)
  end


  it "edit link page has a form with the content preloaded" do
    @question = FactoryGirl.create(:question)
    visit root_path
    page.all(:link,"Edit")[0].click
    expect(page.has_field?('Title', :with => @question.title)).to be(true)
  end
end
