import json

s = {'hola (m)': 5, 'Crude Oil (bbl)': '-', "Distance / Time": "-"}
keys = list(s.keys()).copy()
for key in keys:
    l = key.replace(' ',"_").replace('(',"").replace(')',"").replace('/',"")
    s[l] = s[key]
    del s[key]

print(s) 

jsonL = json.load(open('dbVessel.json', 'r'))
#arreglo de llaves
def cleanKey(key:str):
    return key.replace(' ',"_").replace('(',"").replace(')',"").replace('/',"")

def itHave(key, json):
    photo = "https://static.vesselfinder.net/images/cool-ship2@2.png"
    if key=="Photo" and json["Photo"]==photo:
        return False
    elif key=="Photo":
        return True
    if key in json:
        return True
    else:
        return False

sortDB = {}
for vessel in jsonL:
    sortDB[vessel] = {}
    for key in jsonL[vessel]:
        temp = jsonL[vessel][key]
        sortDB[vessel][cleanKey(key)] = jsonL[vessel][key]
        sortDB[vessel]["coords"] = itHave("Lat", jsonL[vessel])
        sortDB[vessel]["photoReal"] = itHave("Photo", jsonL[vessel])

with open('new_file.json', 'w') as f:
    json.dump(sortDB, f, indent=2)
    print("New json file is created from data.json file")