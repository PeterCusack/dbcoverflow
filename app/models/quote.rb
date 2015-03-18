require 'dotenv'
require 'httparty'
class Quote
  include HTTParty
  attr_reader :quote
  def initialize
  auth = {username: "rickypchen", password: ENV["TOKEN"]}
  response = HTTParty.get("https://api.github.com/zen", 'x-oauth-basic' => auth )
  @quote = response.parsed_response
  end
end


