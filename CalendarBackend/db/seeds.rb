# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

events = Event.create([
	{title: "Physical Therapy", start: DateTime.new(2018, 6, 24, 14, 0, 0, "+04:00"), end: Time.new(2018, 6, 24, 15, 0, 0, "+04:00"), body: "PT"},
	{title: "Vacay", start: DateTime.new(2018, 6, 30, 9, 0, 0, "+04:00"), end: Time.new(2018, 7, 5, 15, 0, 0, "+04:00"), body: "Woodstock baby"},
	{title: "Interview", start: DateTime.new(2018, 6, 18, 11, 0, 0, "+04:00"), end: Time.new(2018, 6, 24, 11, 30, 0, "+04:00"), body: "Phone"},
	{title: "Interview", start: DateTime.new(2018, 6, 26, 10, 0, 0, "+04:00"), end: Time.new(2018, 6, 26, 12, 0, 0, "+04:00"), body: "Whiteboard"},
	{title: "Plumber", start: DateTime.new(2018, 6, 30, 10, 0, 0, "+04:00"), end: Time.new(2018, 6, 30, 12, 0, 0, "+04:00"), body: "Confirm with Brian"},
	{title: "Spotify Challenge", start: DateTime.new(2018, 6, 24, 13, 0, 0, "+04:00"), end: Time.new(2018, 6, 25, 23, 0, 0, "+04:00"), body: "Fingers crossed!"},
])