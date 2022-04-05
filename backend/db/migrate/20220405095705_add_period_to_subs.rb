class AddPeriodToSubs < ActiveRecord::Migration[6.1]
  def change
    add_column :subs, :period, :integer
  end
end
