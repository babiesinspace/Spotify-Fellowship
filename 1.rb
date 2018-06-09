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

def sortByStrings(str_to_sort, str) 
  sorted_start = 0
  for c in str_to_sort.split("")
    i = sorted_start
    while (i < str.length)
      if str[i] == c
        temp = str_to_sort[sorted_start]
        str_to_sort[sorted_start] = str[i]
        str[i] = temp 
        sorted_start += 1
      end 
    end
  end
  str 
end 


sortByStrings("good","odg") # "oodg"