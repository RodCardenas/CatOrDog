json.array!(@entries) do |entry|
  json.extract! entry, :id, :name, :weight, :height, :catLover
end
