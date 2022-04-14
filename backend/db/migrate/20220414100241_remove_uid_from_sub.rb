class RemoveUidFromSub < ActiveRecord::Migration[6.1]
  def change
    remove_column :subs, :uid, :integer

    add_column :subs, :uid, :string
  end
end
