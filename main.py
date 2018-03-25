from flask import Flask, request, url_for, jsonify, send_from_directory
import requests, os, xmltodict, json, re, pickle
from collections import OrderedDict
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup
from random import randint
import urllib.request

############################################### CONFIG ###############################################

# app = Flask(__name__)
app = Flask(__name__, static_folder='app/build/')

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

############################################### ROUTES ###############################################

@app.route("/api/companies/<tech>")
def companies(tech):
	result = requests.get("https://stackshare.io/{}".format(tech))
	r = result.content
	soup = BeautifulSoup(r, "lxml")
	
	#finding the companies that use the tech
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
	return jsonify(companies)

'''
    learnxinyminutes
    devhints
    hackernews
    reddit
'''
# use learn-anything ID
@app.route("/api/resources/<id>")
def tech(id):
	result = requests.get("https://learn-anything.xyz/api/maps/{}".format(id))
	r = result.text
	data = json.loads(r)

	#get the wikipedia link from end of the wikiwand link
	nodeid = data["nodes"]["null"]["nodeID"]
	wiki = data["resources"][str(nodeid)][0]["url"].split("/")[-1]
	url = urllib.request.urlopen("https://wikipedia.org/wiki/{}".format(wiki))
	soup = BeautifulSoup(url)

	#get the first paragraph text
	div = soup.find("div", class_="mw-parser-output")
	firstp = div.find("p")
	firstsent = firstp.text.split(".")[0]
	if "[" in firstsent:
		firstsent = firstsent[:firstsent.find("[")-1]+firstsent[firstsent.find("[")+3:]
	return firstsent + "."