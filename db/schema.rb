# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141115081727) do

  create_table "achievements", force: true do |t|
    t.integer  "user_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "activities", force: true do |t|
    t.integer  "section_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "description"
    t.string   "template"
    t.boolean  "display"
    t.boolean  "completed"
    t.text     "tip"
  end

  create_table "activity_dependencies", force: true do |t|
    t.integer  "activity_id"
    t.integer  "dependent_activity_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "box_id"
  end

  create_table "boxable_entries", force: true do |t|
    t.integer  "boxable_id"
    t.integer  "action_entry_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "boxables", force: true do |t|
    t.string   "integer"
    t.integer  "box_id"
    t.integer  "word_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  create_table "boxes", force: true do |t|
    t.integer  "component_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "type"
  end

  create_table "bug_tickets", force: true do |t|
    t.text     "description"
    t.text     "error"
    t.integer  "user_id"
    t.string   "url"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "user_agent"
  end

  create_table "components", force: true do |t|
    t.integer  "activity_id"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "type"
    t.boolean  "is_completed"
    t.string   "context"
    t.string   "title"
    t.string   "file_name"
  end

  create_table "courses", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
  end

  create_table "excercises", force: true do |t|
    t.integer  "activity_id"
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "payments", force: true do |t|
    t.string   "token"
    t.string   "identifier"
    t.string   "payer_id"
    t.boolean  "recurring",  default: false
    t.boolean  "digital",    default: false
    t.boolean  "popup",      default: false
    t.boolean  "completed",  default: false
    t.boolean  "canceled",   default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.decimal  "amount"
  end

  create_table "permissions", force: true do |t|
    t.integer  "user_id"
    t.integer  "role_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ratings", force: true do |t|
    t.integer  "box_id"
    t.integer  "value"
    t.string   "context"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id"
  end

  create_table "roles", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sections", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.integer  "topic_id"
    t.integer  "parent_id"
  end

  create_table "selections", force: true do |t|
    t.integer  "word_id"
    t.integer  "user_id"
    t.boolean  "status"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sign_ups", force: true do |t|
    t.integer  "user_id"
    t.integer  "course_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "statuses", force: true do |t|
    t.integer  "activity_id"
    t.integer  "user_id"
    t.boolean  "completed"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sub_users", force: true do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "topics", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.integer  "course_id"
  end

  create_table "user_calendar_entries", force: true do |t|
    t.date     "date"
    t.text     "entry"
    t.boolean  "active"
    t.boolean  "added_to_calendar"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "context"
    t.integer  "component_id"
    t.integer  "user_id"
  end

  create_table "user_entries", force: true do |t|
    t.integer  "component_id"
    t.integer  "user_id"
    t.text     "post"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "context"
    t.boolean  "is_active"
    t.string   "type"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.string   "account_type"
    t.integer  "user_level"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

  create_table "videos", force: true do |t|
    t.integer  "section_id"
    t.string   "name"
    t.string   "video_url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "words", force: true do |t|
    t.string   "word"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "wordable_id"
    t.string   "wordable_type"
    t.boolean  "all_users"
    t.integer  "word_selection_id"
    t.integer  "box_id"
  end

end
