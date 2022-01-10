require "yaml"
require "json"

data = open("dynamodb.yml", "r") {
  |file|
  YAML.load(file)
}
data["Resources"].each do |key, value|
  tableData = value["Properties"]
  File.write("./tables/#{key}.json", JSON.pretty_generate(tableData)).then {
    `aws dynamodb create-table --cli-input-json file://tables/#{key}.json --endpoint-url http://localhost:8000`
  }
end
