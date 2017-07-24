#include <iostream>
#include <fstream>
#include <string>

using namespace std;

int main ()
{
  ifstream iFile("public/wordList.txt"); 

  string ret;

  ret += "export default const wordList = [";
  string tmp;

  while (!iFile.eof()) {
    iFile >> tmp;
    ret += "\"" + tmp + "\",";
  }

  ret += "]";

  ofstream oFile("public/wordList.js");

  oFile << ret;

  return 0;
}