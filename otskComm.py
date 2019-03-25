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
options.add_argument(r"user-data-dir=path/to/your/chrome/default")
options.add_argument('headless')

chrome = webdriver.Chrome("/usr/lib/chromium-browser/chromedriver", chrome_options=options)
chrome.implicitly_wait(10)
chrome.get("https://media.daum.net/ranking/kkomkkom/") # crawling site
chrome.implicitly_wait(3)

temp_dict = {}

for i in range(1, 11):
    title= chrome.find_element_by_xpath('//*[@id="mArticle"]/div[2]/ul[3]/li['+str(i)+']/div[2]/strong/a').text
    link= chrome.find_element_by_xpath('//*[@id="mArticle"]/div[2]/ul[3]/li['+str(i)+']/div[2]/strong/a').get_attribute('href')
    info_news= chrome.find_element_by_xpath('//*[@id="mArticle"]/div[2]/ul[3]/li['+str(i)+']/div[2]/strong/span').text
    temp_dict[i] = {'title': title, 'info_news':info_news, 'link':link}
    
toJson(temp_dict)

# session end
chrome.quit()