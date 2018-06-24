class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :title, null: false
      t.text :body
      t.time :start, null: false
      t.time :end, null:false

      t.timestamps
    end
  end
end
