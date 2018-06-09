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
  sort_by_str.each_index do |index|
  
      str_to_sort.each_index do |i|
        if str_to_sort[i] == sort_by_str[index]
          temp = sort_by_str[index]
          sort_by_str[index] = str_to_sort[i]
          str_to_sort[i] = temp
          break 
        end
        str_to_sort
      end 
    str_to_sort

  end 
  str_to_sort
end 


sortByStrings("good","odg") # "oodg"