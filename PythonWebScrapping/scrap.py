import requests, json
from bs4 import BeautifulSoup

def getData(link:str):
    """Realiza el proceso de obtener los datos de cada barco individual

    Args:
        link (str): Link generado a un barco individual

    Returns:
        dict: Datos recolectados
    """
    pageData= {"Source":link}
    req = requests.get(link, headers=head)
    soup = BeautifulSoup(req.content, "html.parser")
    loc = str(soup.find(class_="column vfix-top npr mm"))
    if loc != "None":
        pageData["Lat"] = list(filter(lambda x:"Lat"in x, loc.split("\n")))[0].split("</div>")[1].split(">")[-1]
        pageData["Lon"] = list(filter(lambda x:"Lon"in x, loc.split("\n")))[0].split("</div>")[1].split(">")[-1]
        # pageData["°C"] = list(filter(lambda x:"°C"in x, loc.split("\n")))[0].split("</div>")[1].split(">")[-1]
        # pageData["°F"] = list(filter(lambda x:"°F"in x, loc.split("\n")))[0].split("</div>")[1].split(">")[-1]
        # pageData["kn"] = list(filter(lambda x:"kn"in x, loc.split("\n")))[0].split("</div>")[1].split(">")[-1]
        # pageData["m/s"] = list(filter(lambda x:"m/s"in x, loc.split("\n")))[0].split("</div>")[1].split(">")[-1]
        # pageData["WavesHeight"] = list(filter(lambda x:"m"in x, loc.split("\n")))[0].split("</div>")[1].split(">")[-1]
    datas = list(filter(lambda x:"n3"in x, str(soup.find("tbody")).split("\n")))
    try:
        for data in datas: pageData[data.split('n3">')[1].split("<")[0]] = data.split('v3">')[1].split("<")[0]
    except Exception as e:
        try:
            datas = list(filter(lambda x:"n3"in x, str(list(soup.find_all(class_="column ship-section"))[-1]).split("\n")))
            for data in datas: pageData[data.split('n3">')[1].split("<")[0]] = data.split('v3">')[1].split("<")[0]
        except Exception as ex:
            # print("\Tabla ",ex,datas,link)
            None
    try:
        pageData["Photo"] = str(soup.find("img", class_="main-photo")).split('src="')[1].split('"')[0]
    except Exception as ex:
        print("\nImagen ",ex,datas,link)
    return pageData
    
ww = "http://"; host = "www.vesselfinder.com"; loc = "/vessels"; head={"Host":host,"User-Agent":"PostmanRuntime/7.26.8"}; page = 30; lon = 0; finish=False; datos={}; pages=1
while True:
    
    req = requests.get(ww+host+loc, headers=head,
                    params={"flag":"MX","dir":2,"sort":5,"page":page})
    soup = BeautifulSoup(req.content, "html.parser")
    lClass = soup.find_all(class_="v1")
    if len(lClass)==0: break
    for i, clase in enumerate(lClass):
        if i>0:
            print("Paginas:",page," elemento:",i,end="         \r")
            element = str(clase).split('href="')[1].split('"')[0]
            datos[str(page)+","+str(i)] = getData(ww+host+element)
    if pages ==10:
        with open('dbVessel'+str(page)+'.json', 'w') as outfile: json.dump(datos, outfile)
        datos = {}
        pages = 1
    pages += 1
    page += 1
with open('dbVessel'+str(page)+'.json', 'w') as outfile: json.dump(datos, outfile)
print("\n"+"Terminado")