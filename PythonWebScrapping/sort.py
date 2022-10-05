s = {'hola (m)': 5, 'Crude Oil (bbl)': '-', "Distance / Time": "-"}
keys = list(s.keys()).copy()
for key in keys:
    l = key.replace(' ',"_").replace('(',"").replace(')',"").replace('/',"")
    s[l] = s[key]
    del s[key]

print(s)