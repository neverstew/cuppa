class AddDescriptionPhoneToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :description, :text
    add_column :users, :telephone, :text
  end
end
