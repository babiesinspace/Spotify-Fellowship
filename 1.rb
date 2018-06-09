# Question 1 -- sortByStrings(s,t): Sort the letters in the string s by the order they occur in the string t. You can assume t will not have repetitive characters. For s = "weather" and t = "therapyw", the output should be sortByString(s, t) = "theeraw". For s = "good" and t = "odg", the output should be sortByString(s, t) = "oodg".

# def sortByStrings(s, t)
#   str_to_sort = s.split("")
#   sort_by_str = t.split("")
#   answer = ""

#   sort_by_str.each do |letter|
#     str_to_sort.each do |character|
#       if letter == character
#         answer += letter
#       end 
#     end
#   end
#   answer
# end 


def sortByStrings(s, t)
  str_to_sort = s.split("")
  sort_by_str = t.split("")
  answer = ""
  repeated_chars = {}
  #build a hash of characters needed to sort, and their freq
  str_to_sort.each do |letter|
    if repeated_chars.has_key?(letter)
      repeated_chars[letter] += 1
    else 
      repeated_chars[letter] = 1
    end 
  end
  #add them to the answer string as they occur in the rule string, repeating by their freq
  sort_by_str.each do |letter|
    if repeated_chars.has_key?(letter)
      (repeated_chars[letter]).times do
        answer += letter
      end
    end 
  end
  answer
end 


sortByStrings("good","odg") # "oodg"