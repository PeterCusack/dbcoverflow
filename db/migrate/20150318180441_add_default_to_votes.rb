class AddDefaultToVotes < ActiveRecord::Migration
  def change
    change_column :questions, :votes, :integer, :default => 0
    change_column :answers, :votes, :integer, :default => 0
  end
end
