from flask import Flask, request, url_for, jsonify, send_from_directory
import requests, os, xmltodict, json, re, pickle
from collections import OrderedDict
from requests import get
from requests.exceptions import RequestException
from contextlib import closing
from bs4 import BeautifulSoup
from random import randint

############################################### CONFIG ###############################################

# app = Flask(__name__)
app = Flask(__name__, static_folder='app/build/')

app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

############################################### ROUTES ###############################################

@app.route("/api/companies/<tech>")
def companies(tech):
    r = requests.get("https://stackshare.io/{}".format(tech))
    #print(r.text)
    return r.text


'''
    learnxinyminutes
    devhints
    hackernews
    reddit
'''
# use learn-anything ID
@app.route("/api/resources/<id>")
def tech(id):
    return id

