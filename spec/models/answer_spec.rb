require 'rails_helper'

RSpec.describe Answer, type: :model do
  it "have a valid factory" do
    FactoryGirl.create(:answer).should be_valid
  end

  context "Validations" do
      it {should validate_presence_of :title}
      it {should validate_presence_of :content}
  end
end
