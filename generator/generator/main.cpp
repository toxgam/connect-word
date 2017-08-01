//
//  main.cpp
//  generator
//
//  Created by Le Khac Huy on 13/7/17.
//  Copyright © 2017 Le Khac Huy. All rights reserved.
//

#include <iostream>
#include <fstream>
#include <vector>
#include <set>
#include <map>

using namespace std;

//const int maxLength = 2;
//const int minAns = 2;
//const string outputname = "gameLength2.js";
int maxLength;
int minAns;

vector<string> wordList;
int n;

void readWordList(vector<string> &wordList) {
    ifstream iFile("wordListHighSchool.txt");
    
    string tmp;
    
    while (!iFile.eof()) {
        iFile >> tmp;
        transform(tmp.begin(), tmp.end(), tmp.begin(), ::toupper);
        
        wordList.push_back(tmp);
    }
}

vector<string> clean(vector<string> wordList) {
    vector<string> result;
    
    result.push_back(wordList[0]);
    n = (int)wordList.size();
    for (int i = 1; i < n; i++) {
        if (wordList[i] != wordList[i - 1]) {
            result.push_back(wordList[i]);
        }
    }
    
    return result;
}

int getID(string s) {
    int l = 0;
    int r = n - 1;
    while (l <= r) {
        int p = (l + r) / 2;
        if (wordList[p] == s) {
            return p;
        } else if (wordList[p] < s) {
            l = p + 1;
        } else {
            r = p - 1;
        }
    }
    
    return -1;
}

void tries(string answer, int n, map<char, int> &count, vector<int> &ans) {
    if (maxLength - n >= 2) {
        int id = getID(answer);
        
        if (id != -1) {
            ans.push_back(id);
        }
    }
    
    if (n == 0) {
        return;
    }
    
    for (auto e: count) {
        if (e.second > 0) {
            count[e.first]--;
            answer.push_back(e.first);
            
            tries(answer, n - 1, count, ans);
            
            answer.pop_back();
            count[e.first]++;
        }
    }
}

int main(int argc, const char * argv[]) {
    //preprocessing
    readWordList(wordList);
    sort(wordList.begin(), wordList.end());
    wordList = clean(wordList);
    n = (int)wordList.size();
    
    //retrieve world
    vector<bool> notAvailable(n);
    
    ofstream oFile("gameHighSchool.js");
    
    oFile << "export const games = [";
    for (maxLength = 2; maxLength <= 6; maxLength++) {
        int c = 0;
        minAns = maxLength;
        
        oFile << "[";
        for (int i = 0; i < n; i++) {
            if (wordList[i].length() == maxLength && !notAvailable[i]) {
                vector<int> ans;
                map<char, int> count;
                
                string shuffle = wordList[i];
                random_shuffle(shuffle.begin(), shuffle.end());
                
                for (char e: wordList[i]) {
                    count[e]++;
                }
                
                tries("", maxLength, count, ans);
                
                if (ans.size() >= minAns) {
                    oFile << "{\n";
                    oFile << "  problem: \"" << shuffle << "\",\n";
                    oFile << "  answers: [\n";
                    
                    for (int i : ans) {
                        notAvailable[i] = true;
                        oFile << "    \"" << wordList[i] << "\",\n";
                    }
                    
                    oFile << "  ]}, ";
                    
                    c++;
                }
            }
        }
        
        oFile << "], ";
        cout << c << "\n";
    }
    
    oFile << "]";
    
//    ofstream oFile1("list.txt");
//    
//    for (int i = 0; i < n; i++) {
//        if (notAvailable[i]) {
//            oFile1 << wordList[i] << "\n";
//        }
//    }
    
    return 0;
}
