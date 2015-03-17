FactoryGirl.define do
  factory :question do |f|
    f.title {Faker::Lorem.sentence(3)}
    f.content {Faker::Lorem.paragraph(2)}
  end
end
