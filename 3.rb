def count(denominations, num_of_coins, amount) 
  #add to count if change is made
  return 1 if amount === 0
  #if there are no coin denominations left to check but we still have change, or if the amount given is 0 or negative 
  return 0 if (num_of_coins < 0 && amount > 0) || amount <= 0


end