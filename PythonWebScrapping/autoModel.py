import json

jsonL = json.load(open('sample2model.json', 'r'))

def genModel(model):
    with open('model.json', 'w') as f:
        json.dump(model, f, indent=2)
model = {}
for key in jsonL:
    model[key] = {
        "type": "String",
        "required": False}
genModel(model)