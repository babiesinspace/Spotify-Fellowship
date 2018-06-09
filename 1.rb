# Question 1 -- sortByStrings(s,t): Sort the letters in the string s by the order they occur in the string t. You can assume t will not have repetitive characters. For s = "weather" and t = "therapyw", the output should be sortByString(s, t) = "theeraw". For s = "good" and t = "odg", the output should be sortByString(s, t) = "oodg".

def sortByStrings(s, t)
  str_to_sort = s.split("")
  sort_by_str = t.split("")
  answer = ""

  sort_by_str.each do |letter|
    str_to_sort.each do |character|
      if letter == character
        answer += letter
      end 
    end
  end
  answer
end 