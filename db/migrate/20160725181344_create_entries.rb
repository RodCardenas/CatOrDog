class CreateEntries < ActiveRecord::Migration
  def change
    create_table :entries do |t|
      t.string  :name
      t.integer :height
      t.integer :weight
      t.boolean :catLover
      t.timestamps null: false
    end
    add_index :entries, :name
    add_index :entries, :height
    add_index :entries, :weight
    add_index :entries, :catLover
  end
end
