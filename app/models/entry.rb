class Entry < ActiveRecord::Base
  validates :height, :weight, presence: :true
end
