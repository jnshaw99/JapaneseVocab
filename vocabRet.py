import json
from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from bs4 import BeautifulSoup

class main:
    def __init__(self):
        with open("vocablist.json", 'w') as outfile:
            self.compile_page_reads(outfile)
    def compile_page_reads(self,outfile):
        sites=['https://iknow.jp/courses/566921','https://iknow.jp/courses/566922','https://iknow.jp/courses/566924',
        'https://iknow.jp/courses/566925','https://iknow.jp/courses/566926','https://iknow.jp/courses/566927',
        'https://iknow.jp/courses/566928','https://iknow.jp/courses/566929','https://iknow.jp/courses/566930',
        'https://iknow.jp/courses/566932','https://iknow.jp/courses/594768','https://iknow.jp/courses/594770',
        'https://iknow.jp/courses/594771','https://iknow.jp/courses/594772','https://iknow.jp/courses/594773',
        'https://iknow.jp/courses/594774','https://iknow.jp/courses/594775','https://iknow.jp/courses/594777',
        'https://iknow.jp/courses/594778','https://iknow.jp/courses/594780',
        'https://iknow.jp/courses/615865','https://iknow.jp/courses/615866','https://iknow.jp/courses/615867',
        'https://iknow.jp/courses/615869','https://iknow.jp/courses/615871','https://iknow.jp/courses/615872',
        'https://iknow.jp/courses/615873','https://iknow.jp/courses/615874','https://iknow.jp/courses/615876',
        'https://iknow.jp/courses/615877','https://iknow.jp/courses/615947','https://iknow.jp/courses/615949',
        'https://iknow.jp/courses/615950','https://iknow.jp/courses/615951','https://iknow.jp/courses/615953',
        'https://iknow.jp/courses/615954','https://iknow.jp/courses/615955',
        'https://iknow.jp/courses/615957','https://iknow.jp/courses/615958','https://iknow.jp/courses/615959',
        'https://iknow.jp/courses/616077','https://iknow.jp/courses/616078','https://iknow.jp/courses/616079',
        'https://iknow.jp/courses/616080','https://iknow.jp/courses/616081','https://iknow.jp/courses/616082',
        'https://iknow.jp/courses/616083','https://iknow.jp/courses/616084','https://iknow.jp/courses/616085',
        'https://iknow.jp/courses/616086','https://iknow.jp/courses/598434','https://iknow.jp/courses/598432',
        'https://iknow.jp/courses/598431','https://iknow.jp/courses/598430','https://iknow.jp/courses/598427',
        'https://iknow.jp/courses/598426','https://iknow.jp/courses/598425','https://iknow.jp/courses/598424',
        'https://iknow.jp/courses/598423','https://iknow.jp/courses/598422']
        for x in range(0,60):
            json.dump(self.read_page(x,sites[x]), outfile,indent=8)
        return
    def read_page(self,x,site):
        words={}
        option=webdriver.ChromeOptions()
        option.add_argument('headless')
        driver=webdriver.Chrome(chrome_options=option)
        driver.get(site)
        elements=[]
        soup=BeautifulSoup(driver.page_source, 'html.parser')
        elements=soup.find_all(class_="cue-response")
        x*=100
        for element in elements:
            word=element.find(class_='cue').contents[0]
            try:
                trans=element.find(class_='transliteration').contents[4]
            except:
                trans=''
            definition=element.find(class_='response').contents[0]
            words[word] = { 'hiragana': trans, 'definition': definition }
            x+=1
        driver.quit()
        return words
        
a=main()