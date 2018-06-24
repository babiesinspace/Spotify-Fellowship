def decodeString(string)
	message = string.gsub(/(\w*)(\d)\[(\w*)\]/) { |match| scanString(match) }
 	scanString(message).empty? ? message : scanString(message)
end

def scanString(match)
    arr = match.scan(/(\w*)(\d)\[(\w*)\]/)
    arr.map do |array|
	    code = array.pop
	    count = array.pop.to_i
	    array.push(code * count)
	 end 
	 arr.flatten.join("")
end