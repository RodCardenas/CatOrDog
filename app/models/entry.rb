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

  def self.euclidianDistanceGuess(height, weight)
    entries = Entry.all
    max_similarity_distance = 0
    closest_match = nil

    entries.each do |entry|
      similarity_distance = 1/(1 + Math.sqrt((entry.height - height.to_i) ** 2 + (entry.weight - weight.to_i) ** 2))
      if similarity_distance > max_similarity_distance
        max_similarity_distance = similarity_distance
        closest_match = entry.catLover
      end
    end

    closest_match
  end

  def self.pearsonCorrelationScoreGuess(height, weight)
    height.to_i > 2 ? true : false
  end

end
