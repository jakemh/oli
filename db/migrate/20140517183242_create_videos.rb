class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.integer :section_id
      t.string :name
      t.string :video_url

      t.timestamps
    end
  end
end
