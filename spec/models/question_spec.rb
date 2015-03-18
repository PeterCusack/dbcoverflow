require 'rails_helper'

describe Question, type: :model do
		it "has a valid factory" do
      FactoryGirl.create(:question).should be_valid
    end
	   context "Validations" do
      it {should validate_presence_of :title}
      it {should validate_presence_of :content}
     end
end

