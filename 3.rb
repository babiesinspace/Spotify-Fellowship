def count(denominations, amount) 
  #add to count if change is made
  return 1 if amount == 0
  #if there are no coin denominations left to check but we still have change, or if the amount is negative 
  return 0 if amount < 0

  ways_to_make_change = 0
  denominations.each do |coin|
  	ways_to_make_change += count(denominations, (amount - coin))
  end 
  ways_to_make_change
end