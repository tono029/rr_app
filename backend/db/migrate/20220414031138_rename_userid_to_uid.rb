class RenameUseridToUid < ActiveRecord::Migration[6.1]
  def change
    rename_column :subs, :user_id, :uid
  end
end
