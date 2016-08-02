# == Schema Information
#
# Table name: entries
#
#  id         :integer          not null, primary key
#  name       :string
#  height     :integer          10ft max
#  weight     :integer          500lbs max
#  catLover   :boolean          true if CatPerson, false if DogPerson
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Entry < ActiveRecord::Base
  validates :height, :weight, presence: :true

  MAX_HEIGHT = 10
  MAX_WEIGHT = 500

  def self.eucladianDistanceGuess(height, weight)
    puts "here"
    # entries = Entry.all
    # entries.each do |entry|
    #   entry.height = height / MAX_HEIGHT
    #   entry.weight = weight / MAX_WEIGHT
    # end
    height.to_i > 5 ? true : false
  end

  # def sim_distance(prefs,person1,person2):
  #     # Get the list of shared_items
  #     si={}
  #     for item in prefs[person1]:
  #       if item in prefs[person2]:
  #           si[item]=1
  #     # if they have no ratings in common, return 0
  #     if len(si)==0: return 0
  #     # Add up the squares of all the differences
  #     sum_of_squares=sum([pow(prefs[person1][item]-prefs[person2][item],2)
  #                         for item in prefs[person1] if item in prefs[person2]])
  #     return 1/(1+sum_of_squares)
end
