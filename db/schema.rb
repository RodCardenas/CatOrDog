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

ActiveRecord::Schema.define(version: 20160725181344) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "entries", force: :cascade do |t|
    t.string   "name"
    t.integer  "height"
    t.integer  "weight"
    t.boolean  "catLover"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "entries", ["catLover"], name: "index_entries_on_catLover", using: :btree
  add_index "entries", ["height"], name: "index_entries_on_height", using: :btree
  add_index "entries", ["name"], name: "index_entries_on_name", using: :btree
  add_index "entries", ["weight"], name: "index_entries_on_weight", using: :btree

end
