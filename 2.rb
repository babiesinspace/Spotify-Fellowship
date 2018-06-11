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
	return string if string.scan(/(\d)\[(.*)\]/).flatten.empty?
  message = string.scan(/(\d)\[(.*)\]/).flatten
  string = message.last * message.first.to_i
  decodeString(string)
end