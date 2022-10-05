import json
from pymongo import MongoClient
import pymongo
from pymongo import MongoClient

def get_database():
    
    # Provide the mongodb atlas url to connect python to mongodb using pymongo
    CONNECTION_STRING = "mongodb+srv://danielSoto:313232590@cluster.vpjbkio.mongodb.net/?retryWrites=true&w=majority"

    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = MongoClient(CONNECTION_STRING)

    # Create the database for our example (we will use the same database throughout the tutorial
    return client['test']

    
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":    
    
    # Get the database
    dbname = get_database()
    collection_name = dbname["vessels"]
    jsonL = json.load(  open('dbVesselSorted.json', 'r'))
    names = open("names.txt","w")
    for item in jsonL["vessels"]:
        if "Lat" in jsonL["vessels"][item].keys():
            keys = list(jsonL["vessels"][item].keys()).copy()
            newItem = {}
            for key in keys:
                newItem[key.replace(' ',"_").replace('(',"").replace(')',"").replace('/',"")] = jsonL["vessels"][item][key]
            names.write( '"'+item+'",\n')
            print(newItem)
            collection_name.insert_one(newItem)
    names.close()