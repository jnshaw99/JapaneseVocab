# -*- coding: utf-8 -*-
import json
class main:
    def __init__(self):
        with open("vocablist.json",'r') as reading:
            data=json.load(reading)
            print(self.findItemByDefinition(data))
    def findItemByTransliteration(self,data):    
        finding=input("Search by word: ")
        return (data[finding+' ']['hiragana'])
    def findItemByDefinition(self,data):
        finding=input("Search by word: ")
        return (data[finding+' ']['definition'])
a=main()