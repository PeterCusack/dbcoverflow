require 'rails_helper'

RSpec.describe QuestionsController, type: :controller do

describe "GET #index" do
  it "returns http success" do
    get :index
    expect(response).to have_http_status(:success)
  end
end

describe "POST #create" do
  it "creates a new question" do
    post :create, question: {title: "create test", content: "test content"}
    expect(assigns(:question)).to be_a(Question)
  end
  it "returns errors if question does not pass validations" do
    post :create, question: {content: "test content"}
    expect(assigns(:question)).to_not be_valid
  end
  it 'redirects if question does not pass validations' do
    post :create, question: {content: "test content"}
    expect(response).to be_redirect
  end
  it "redirects if question pass validations" do
    post :create, question: {title: "create test", content: "test content"}
    expect(response).to be_redirect
  end
end

describe "DELETE #destroy" do
  before (:each) do
    question = FactoryGirl.create(:question)
    delete :destroy, {id: question.id}
  end

  it "deletes a question" do
    expect(Question.all.count).to eq(0)
  end

  it "redirects to index page" do
    expect(response).to be_redirect
  end
end


end
