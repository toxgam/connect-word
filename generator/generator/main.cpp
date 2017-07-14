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

const int maxLength = 5;

vector<string> wordList;
int n;

void readWordList(vector<string> &wordList) {
    ifstream iFile("wordList.txt");
    
    string tmp;
    
    while (!iFile.eof()) {
        iFile >> tmp;
        transform(tmp.begin(), tmp.end(), tmp.begin(), ::toupper);
        
        wordList.push_back(tmp);
    }
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
    readWordList(wordList);
    n = (int)wordList.size();
    
    vector<bool> notAvailable(n);
    
    ofstream oFile("games.txt");
    
    oFile << "export const game = [";
    
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
            
            if (ans.size() >= 6) {
                oFile << "{\n";
                oFile << "  problem: \"" << shuffle << "\",\n";
                oFile << "  answers: [\n";
                
                for (int i : ans) {
                    notAvailable[i] = true;
                    oFile << "    \"" << wordList[i] << "\",\n";
                }
                
                oFile << "  ]}, ";
            }
        }
    }
    
    oFile << "]";
    
    return 0;
}
