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
    # y = pet preference
    # Conceptually, we check to see which set of entries the passed parameters have a stronger correlation with.
    # Therefore
    # -1 = entries with more weight per unit of height tend to inversely like the set's pet
    # 0  = no relationship between weight-height and pet preference
    # 1  = entries with more weight per unit of height tend to like the set's pet

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
    # d(x,y) = x.y / ((|x|*|x|) + (|y|*|y|)- x.y)
    # x = weight-height ratio
    # y = pet preference 1 if catPerson, 0 if dogPerson
    # Therefore
    # 0  = no similarity is present
    # 1  = identical taste

    entries = Entry.all
    avg_wgt_hgt = Entry.sum(:weight) / Entry.sum(:height)
    avg_wgt = Entry.average(:weight)
    avg_hgt = Entry.average(:weight)
    vectors = []

    entries.each do |entry|
      wgt = entry.weight
      hgt = entry.height
      vector = []
      vector << (wgt <= avg_wgt ? 1 : 0)
      vector << (hgt <= avg_hgt ? 1 : 0)
      vector << (wgt / hgt <= avg_wgt ? 1 : 0)
      vector << entry.catLover
      vectors << vector
    end

    catGuess = Entry.new(height: height.to_i, weight: weight.to_i, catLover: true)
    catLoverScore = Entry.tanimotoMath(vectors, catGuess)

    dogGuess = Entry.new(height: height.to_i, weight: weight.to_i, catLover: false)
    dogLoverScore = Entry.tanimotoMath(vectors, dogGuess)

    catLoverScore > dogLoverScore ? catLoverScore : dogLoverScore
  end

  def self.tanimotoMath(vectors, guess)
    print vectors
    # d(x,y) = n(X ∩ Y) / [ n(X) + n(Y) - n(X ∩ Y) ]

    # a =
    1
  end

end
