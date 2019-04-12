# This is python file for Daum News crawling in Raspberry pi 3
#
# Written by Sungje Kim

import json
from selenium import webdriver

def toJson(comm_dict):
    with open('community.json', 'w', encoding='utf-8') as file :
        json.dump(comm_dict, file, ensure_ascii=False, indent='\t')

# chrome is executed in background
options = webdriver.ChromeOptions()
options.add_argument(r"user-data-dir=/home/pi/.config/chromium/Default")
options.add_argument('headless')

chrome = webdriver.Chrome("/usr/lib/chromium-browser/chromedriver", chrome_options=options)
chrome.implicitly_wait(10)
chrome.get("https://your_site") # crawling site
chrome.implicitly_wait(3)

temp_dict = {}

#img
imgList = chrome.find_elements_by_class_name('MqU2J')
imgSrcList = []
for i in imgList:
        imgSrcList.append(i.get_attribute("src"))
#name
nameList = chrome.find_elements_by_class_name('sXku1c')

#contents
contentsList = chrome.find_elements_by_class_name('jVjeQd')


if len(contentsList) == len(nameList):
        for i in range(0, len(nameList)):
                temp_dict[i] = {'img': imgSrcList[i], 'writter':nameList[i].text, 'contents':contentsList[i].text}

for i in range(0, len(temp_dict)):
    temp_dict[i]['contents'] = temp_dict[i]['contents'].replace("\n", "<br>")
    

toJson(temp_dict)

# session end
chrome.quit()