class AddDevisionToSubs < ActiveRecord::Migration[6.1]
  def change
    add_column :subs, :devision, :string
  end
end
