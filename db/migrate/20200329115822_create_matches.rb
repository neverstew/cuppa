class CreateMatches < ActiveRecord::Migration[5.2]
  def change
    create_table :matches do |t|
      t.references :user_a, foreign_key: { to_table: :users }, null: false
      t.references :user_b, foreign_key: { to_table: :users }, null: false
      t.integer :relationship

      t.timestamps

      t.index [:user_a_id, :user_b_id], name: :by_user_pair, unique: true
    end
  end
end
