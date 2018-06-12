def count(denominations, coins_to_use=(denominations.length - 1), amount) 
  #add to count if change is made
  return 1 if amount === 0
  #if there are no coin denominations left to check but we still have change, or if the amount is negative 
  return 0 if coins_to_use < 0 || amount < 0

  count(denominations, coins_to_use, (amount - denominations[coins_to_use])) + count(denominations, coins_to_use-1, amount)
  
end
