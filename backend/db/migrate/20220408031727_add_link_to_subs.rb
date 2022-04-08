class AddLinkToSubs < ActiveRecord::Migration[6.1]
  def change
    add_column :subs, :link, :text
  end
end
