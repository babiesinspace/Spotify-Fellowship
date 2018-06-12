def count(denominations, coins_to_use=(denominations.length - 1), amount) 
  #add to count if change is made
  return 1 if amount === 0
  #if there are no coin denominations left to check but we still have change, or if the amount is negative 
  return 0 if coins_to_use < 0 || amount < 0

  count(denominations, coins_to_use, (amount - denominations[coins_to_use])) + count(denominations, coins_to_use-1, amount)
  
end

def count(denominations, amount) 
	#create array of 0s, with as many spots as the amount number
	way_to_change = Array.new((amount+1), 0)
	way_to_change[0] = 1
	denominations.each do |coin|
		
	end
end