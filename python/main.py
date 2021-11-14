import requests
import json
import sys
import os
import time
from datetime import date, datetime

def parseHtmlElements(element, the_file):
	value = ""
	if (element["type"] == 'text'):
		value = element["properties"]["title"][0][0]
		value = f"<p>{value}</p>"
	elif element["type"] == 'header':
		value = element["properties"]["title"][0][0]
		value = f"<h1>{value}</h1>"		
	elif element["type"] == 'sub_header':
		value = element["properties"]["title"][0][0]
		value = f"<h2>{value}</h2>"
	elif element["type"] == 'sub_sub_header':
		value = element["properties"]["title"][0][0]
		value = f"<h3>{value}</h3>"
	elif element["type"] == 'bulleted_list':
		value = element["properties"]["title"][0][0]
		value = f"<ul><li>{value}</li></ul>"
	elif element["type"] == 'video':
		value = element["properties"]["source"][0][0]
		# change this to a url that allows embed
		video_id = value.split("=")[1].split("&")[0].strip()
		url = f"https://www.youtube.com/embed/{video_id}"
		value = f"<iframe src={url}></iframe>"
	elif element["type"] == 'embed':
		value = element["properties"]["source"][0][0]
		value = f"<iframe src={value}></iframe>"
	elif element["type"] == 'code': #http://intelsea.com/displaying-and-highlighting-code-in-html-page.html
		code = element["properties"]["title"][0][0]
		lang = element["properties"]["language"][0][0]
		value = f"<pre><code>{code}</code></pre>"
	elif element["type"] == 'image':
		value = element["properties"]["source"][0][0]
		value = f"<img class=\"img-fluid\" src={value} alt=\"can't load iamge\"/>"
	else:
		pass
	the_file.write(value + "\n")


#driver code
if len(sys.argv) < 4:
	print ("Make sure to have a notion page url")
	exit(1)

print (list(sys.argv))
page_url_load = list(sys.argv)[1]
page_synopsis = list(sys.argv)[2]
print (page_synopsis)
page_image = list(sys.argv)[3]

r = requests.get(page_url_load)
page_id_load = page_url_load[page_url_load.rfind('-')+1:]
page_id_load = page_id_load[:8] + "-" + page_id_load[8:]
page_id_load = page_id_load[:13] + "-" + page_id_load[13:]
page_id_load = page_id_load[:18] + "-" + page_id_load[18:]
page_id_load = page_id_load[:23] + "-" + page_id_load[23:]

PageUUID = page_id_load
data = {
	"blockId": PageUUID
}

headers = {
	"content-type": "application/json"
}

url ="https://www.notion.so/api/v3/getBacklinksForBlock"


r = requests.post(url, data=json.dumps(data), headers=headers)

# we can use this array to look up datatypes in a dictionary
#objectOrdering = json.loads(r.text)["recordMap"]["block"][PageUUID]["value"]["content"]

ObjectGrabURL = "https://www.notion.so/api/v3/loadCachedPageChunk"


objectData = {
	"chunkNumber": 0,
	"cursor": {
		"stack": []
	},
	"limit": 100,
	"pageId": PageUUID,
	"verticalColumns": True
}


r = requests.post(ObjectGrabURL, data=json.dumps(objectData), headers=headers)


jsonResp = json.loads(r.text)

totalBlocks = jsonResp["recordMap"]["block"]
pageTitle = totalBlocks[PageUUID]['value']['properties']['title'][0][0]
file_name = pageTitle
objectOrdering = totalBlocks[PageUUID]["value"]["content"]

#Before I create the HTML page let's create the config file
#I should also create a new directory for each html and config file

if not os.path.isdir('../server/notion_posts/%s' % file_name):
	print ("Making new directory called %s" % file_name)
	os.mkdir("../server/notion_posts/%s" % file_name)
else:
	print ("directory %s already exists!" % file_name)

next_index = 1
# Find the next index for the next blog post
for base, dirs, files in os.walk("../server/notion_posts"):
	print ("Snooping in ../server/notion_posts")
	for d in dirs:
		next_index+=1

print ("Computed the next index to be ", next_index)
config = {
	"title": file_name,
	"createDate": str(datetime.now().strftime("%d-%m-%Y %H:%M:%S")),
	"synopsis": str(page_synopsis),
	"image": page_image,
	"sortable": next_index
}

with open(f"../server/notion_posts/{file_name}/{file_name}.json", 'a') as config_file:
	config_file.seek(0)
	config_file.truncate()
	config_file.write(json.dumps(config))
	config_file.close()

shouldWriteHeader = True
for num, object in enumerate(objectOrdering):
	try:
		with open(f"../server/notion_posts/{file_name}/{file_name}.html", 'a') as the_file:
			if shouldWriteHeader == True:
				the_file.seek(0)
				the_file.truncate()
				headerText = f"<head><link rel=\"stylesheet\" href=\"main.css\"></head><h1>{pageTitle}</h1>"
				the_file.write(headerText + "\n")
				shouldWriteHeader = False
			someObject = totalBlocks[object]["value"]
			objectType = someObject["type"]
			properties = someObject["properties"]
			element = {"type": objectType, "properties": properties}
			parseHtmlElements(element, the_file)
		print ("done")
	except Exception as e:
		print (e)
		pass
