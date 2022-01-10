file="dynamodb.yml"
ruby -e 'require "yaml";require "json";y=YAML.load ARGF.read;puts JSON.pretty_generate y["Resources"]["Table"]["Properties"]' ../templates/$file /tmp/$file
aws dynamodb create-table --endpoint-url http://localhost:8000 --cli-input-json file:///tmp/$file