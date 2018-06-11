def scanString(string)
	string.scan(/(\d)\[(.*)\]/).flatten
end 

def decodeString(string)
	message = scanString(string)
	decoded = ""
	until message.empty?
		decoded += message.last * message.first.to_i
		message = scanString(decoded)
	end 
	decoded
end

def decodeString(string)
	return if string.scan(/(\w*)(\d)\[(\w*)\]/).empty?
	message = string.scan(/(\w*)(\d)\[(\w*)\]/)
	message.map do |arr|
	code = arr.pop
	count = arr.pop.to_i
	arr.push(code * count)
	end 
	string = message.flatten.join("")
	puts string.scan(/(\w*)(\d)\[(\w*)\]/).empty?
	decodeString(string)
end