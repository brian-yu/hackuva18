from flask import Flask, request, jsonify
import requests, os, json, re, urllib.request
from requests import get
from requests.exceptions import RequestException
from bs4 import BeautifulSoup

'''
TODO:
    learnxinyminutes
    devhints
    hackernews
    reddit
'''

############################################### CONFIG ###############################################

# app = Flask(__name__)
app = Flask(__name__, static_folder='app/build/')

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

############################################### ROUTES ###############################################


# use learn-anything ID
@app.route("/api/topic/<id>")
def topic(id):
	"""
	given id of a topic, returns:
	1. wikipedia description: a wikipedia description of the topic
	2. companies: a list of dictionaries, each dictionary containing company image and name
	3. resources: a dictionary including related and resources.
		related contains a list of dictionaries with id and text of related sources
		resources contains a list of dictionaries with category, text, and url of resources
	"""
	result = requests.get("https://learn-anything.xyz/api/maps/{}".format(id))
	r = result.text
	data = json.loads(r)

	#get the wikipedia link from end of the wikiwand link
	nodeid = data["nodes"]["null"]["nodeID"]
	i = 0
	try:
		while(data["resources"][str(nodeid)][i]["url"].find("wiki") == -1):
			i += 1
		wiki = data["resources"][str(nodeid)][i]["url"].split("/")[-1]
		url = urllib.request.urlopen("https://wikipedia.org/wiki/{}".format(wiki))
		soup = BeautifulSoup(url)

		#get the first paragraph text
		div = soup.find("div", class_="mw-parser-output")
		firstp = div.find("p")
		firstsent = firstp.text.split(".")[0]
		if "[" in firstsent:
			firstsent = firstsent[:firstsent.find("[")-1]+firstsent[firstsent.find("[")+3:]
		firstsent += "."

		

	except:
		firstsent = "no summary"
	
	resources_and_related = resources(id, data)
	company_list = companies(data["key"].replace(" ", ""))
	all_data = {}
	all_data["name"] = data["key"]
	all_data["wiki"] = firstsent
	all_data["companies"] = company_list
	all_data["resources"] = resources_and_related
	# print(data)
	return jsonify(all_data)

def resources(id, data):
	"""
	given id of a topic, return the learning resources of the topic
	"""
	#setting up to parse
	nodeid = data["nodes"]["null"]["nodeID"]
	resources_json = data["resources"]
	titles = []
	links = []
	types = []
	related_titles = []
	related_id = []
	while(True):
		"""
		iterates through every resource and related topic,
		adding to the appropriate list
		"""
		try:
			resources_json[str(nodeid)]
		except:
			break
		for resource in resources_json[str(nodeid)]:
			url = resource["url"]
			if "http" not in url:
				#get the id from the api keyword search
				text = resource["text"].strip()
				hl = requests.get("https://learn-anything.xyz/api/maps?q={}".format(text))
				rjson = hl.text
				ref = json.loads(rjson)
				refid = ref[0]["id"]
				reftext = ref[0]["key"]
				#append into the two "related" lists
				related_id.append(refid)
				related_titles.append(reftext)
				continue
			links.append(url)
			titles.append(resource["text"])
			try:
				types.append(resource["category"])
			except:
				types.append("N/A")
		nodeid += 1

	#adding to a dictionary for JSON
	resources_full = {}
	resources = []
	for i in range(len(titles)):
		resource_dict = {}
		resource_dict["text"] = titles[i]
		resource_dict["url"] = links[i]
		resource_dict["category"] = types[i]
		resources.append(resource_dict)
	related = []
	for i in range(len(related_titles)):
		related_dict = {}
		related_dict["text"] = related_titles[i]
		related_dict["id"] = related_id[i]
		related.append(related_dict)
	resources_full["resources"] = resources
	resources_full["related"] = related
	return resources_full

@app.route("/api/companies/<tech>")
def companies(tech):
	"""
	Returns companies that use a technology in JSON format
	if the search term is not found, returns a blank string
	"""
	result = requests.get("https://stackshare.io/{}".format(tech))
	r = result.content
	soup = BeautifulSoup(r, "lxml")
	
	#finding the companies that use the tech
	if soup.find("header", class_="service") == None:
		return ""

	company_html = soup.find_all('a', attrs={"class": "hint--top"})
	company_titles = []
	for i in range(1,10):
		company = company_html[i].get('data-hint')
		if("News about" in company):
			continue
		company_titles.append(company)

	#finding the images of companies that use the tech
	a_s = []
	for a in company_html:
		img = a.find('img')
		if img != None:
			a_s.append(img)
	company_imgs = []
	for i in range(0,10):
		try:
			img = a_s[i].get('src')
			company_imgs.append(img)
		except:
			continue

	#creating json format
	companies = []
	for i in range(len(company_titles)):
		company_dict = {}
		company_dict["name"] = company_titles[i]
		company_dict["image"] = company_imgs[i]
		companies.append(company_dict)
	return companies

@app.route("/api/topic/name/<name>")
def findId(name):
	res = requests.get("https://learn-anything.xyz/api/maps?q={}".format(name))

	return app.response_class(
        response=res.text,
        status=200,
        mimetype='application/json'
    )