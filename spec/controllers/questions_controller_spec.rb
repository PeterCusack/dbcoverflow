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
  it 'redirects with ajax' do
    post :create, question: {content: "test content"}
    expect(response).to_not be_redirect
  end
  it "redirects with ajax" do
    post :create, question: {title: "create test", content: "test content"}
    expect(response).to_not be_redirect
  end
end

describe "DELETE #destroy" do
  before (:each) do
    @question = FactoryGirl.create(:question)
  end

  it "should have a question in the database " do
      expect(Question.all.count).to eq(1)
  end

  it "deletes a question" do
    delete :destroy, {id: @question.id}
    expect(Question.all.count).to eq(0)
  end

  it "redirects to index page" do
    delete :destroy, {id: @question.id}
    expect(response).to be_redirect
  end
end

describe "PUT #update" do
  before (:each) do
    @question = FactoryGirl.create(:question)
  end

  it "redirects if edits are valid" do
    put :update, id: @question.id, question: {title: @question.title, content: @question.content}
    expect(response).to be_redirect
  end

  it "does not redirects if edits are valid" do
    put :update, id: @question.id, question: {title: @question.title, content: nil}
    expect(response).to_not be_redirect
  end

end


end
