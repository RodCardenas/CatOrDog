# == Schema Information
#
# Table name: entries
#
#  id         :integer          not null, primary key
#  name       :string
#  height     :integer
#  weight     :integer
#  catLover   :boolean
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

require 'test_helper'

class EntryTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
