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