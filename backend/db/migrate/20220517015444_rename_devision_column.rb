class RenameDevisionColumn < ActiveRecord::Migration[6.1]
  def change
    rename_column :subs, :devision, :division
  end
end
