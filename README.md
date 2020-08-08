# ttt-topn
Assignment for TTT internship

# Libraries/Frameworks used

1. FrontEnd - ReactJS, Parcel(module loader)

2. BackEnd - ExpressJS, Redis(node_redis),isomorphic_fetch(to fetch data)


# Components

Frontend - 
./containers/App.jsx - The main container for the app

./components/InputForm.jsx - the form and table display

./components/Header.jsx  - the header component


Backend-

index.js - The entry file, with the route.

fetchtopn.js:-
The required file is fetched, and tokenised. Each URL/twitter handle is considered as a token.
The puncutations are duly removed to get the right words.

topN.js:-
The data is sorted according to their frequencies.
After processing the data it is **stored in Redis as a in memory list, so, from the next time, fetching and processing is not required**.

##### Reasons for not using heap - 
Although max heap would be a bit better while getting  the top n elements, as every time an element is extracted the total number of elements is decreased by one. But a fully sorted list helped to store data in Redis.

# Test Cases Screenshots
10
![alt text](https://raw.githubusercontent.com/ankushChatterjee/ttt-topn/master/screnshots/ten.png "10")
200
![alt text](https://raw.githubusercontent.com/ankushChatterjee/ttt-topn/master/screnshots/thundred.png "200")
10,000
![alt text](https://raw.githubusercontent.com/ankushChatterjee/ttt-topn/master/screnshots/tenthousand.png "10,000")
2
![alt text](https://github.com/ankushChatterjee/ttt-topn/blob/master/screnshots/two.png?raw=true "10,000")



