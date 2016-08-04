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
    # x = weight-height ratio
    # y = pet preference 1 if catPerson, 0 if dogPerson
    # Conceptually, x grows as the entry has more weight per unit of height and y will be present if the entry is a catLover.
    # Therefore
    # -1 = entries with more weight per unit of height tend to like dogs
    # 0  = no relationship between weight-height and pet preference
    # 1  = entries with more weight per unit of height tend to like cats

    entries = Entry.all
    guess = Entry.new(height: height.to_i, weight: weight.to_i, catLover: true)

    catEntries = entries.select{|entry| entry.catLover == true}
    catEntries << guess

    guess.catLover = false
    dogEntries = entries.reject{|entry| entry.catLover == true}
    dogEntries << guess

    catR = Entry.pearsonMath(catEntries)
    dogR = Entry.pearsonMath(dogEntries)

    if catR == 0 && dogR == 0
      return nil
    elsif catR > dogR
      return true
    else
      return false
    end
  end

  def self.pearsonMath(entries)
    n = entries.count
    xy = []
    xx = []
    yy = []

    entries.each do |entry|
      xy << (entry.weight / entry.height)
      xx << ((entry.weight / entry.height) ** 2)
      yy << 1
    end

    sx = 0
    entries.each {|entry| sx += (entry.weight / entry.height)}
    sy = 0
    entries.each {|entry| sy += 1}
    sxy = xy.inject(:+)
    sxx = xx.inject(:+)
    syy = yy.inject(:+)

    r = (n * sxy - (sx * sy)) / Math.sqrt((n * sxx - (sx ** 2)) * (n * syy - (sy ** 2)))
  end

  def self.tanimotoScoreGuess(height, weight)
    height.to_i > 10 ? true : false
  end

end
