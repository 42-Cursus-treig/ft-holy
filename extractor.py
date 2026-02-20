import json

with open("project_data.json", "r", encoding="utf-8") as f:
    data = json.load(f)

for project in data:
    print(f'"{project["name"]}",')
