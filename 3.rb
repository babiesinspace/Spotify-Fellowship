def count(denominations, coins_to_use=(denominations.length - 1), amount) 
  #add to count if change is made
  return 1 if amount === 0
  #if there are no coin denominations left to check but we still have change, or if the amount is negative 
  return 0 if coins_to_use < 0 || amount < 0

  count(denominations, coins_to_use, (amount - denominations[coins_to_use])) + count(denominations, coins_to_use-1, amount)
  
end

#bottom up memoization
def count(denominations, amount) 
	#create array of 0s, with as many spots as the amount number
	way_to_change = Array.new((amount+1), 0)
	way_to_change[0] = 1
	#create a sort of memoization table
	denominations.each do |coin|
		#for each coin we have available, including one the same as total
		(coin..amount).each do |i|
			#add the number of ways you can make change including that coin, plus the number of ways excluding that coin (stops repeat work)
			way_to_change[i] += way_to_change[i-coin]
		end
	end
	way_to_change[amount]
end