import React, { Component } from 'react';

export default class AppMethods {
    static uniqueByKey(array, key) {
        return [...new Map(array.map((x) => [x[key], x])).values()];
    }

    static sortByProperty(property){  
        return function(a,b){  
           if(a[property] < b[property])  
              return 1;  
           else if(a[property] > b[property])  
              return -1;
           return 0;  
        }  
     }

}