Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

describe Question, :js => true do
  it "has a button that leads to show page" do
    question = FactoryGirl.create(:question)
    visit root_path
    click_on(question.title)
    expect(page).to have_content(question.content)
  end
end
