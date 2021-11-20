import React, { useState, useEffect } from "react";

function Tile() {

    const [ valueSet, setValueSet ] = useState([0]);
    const [inputedValue, setInputedValue] = useState();
    const [mean, setMean] = useState();
    const [median, setMedian] = useState();
    const [mode, setMode] = useState();
    const [stdDev, setStdDev] = useState();
    let valSet = [];
    const changeData = () => {
        const len = Math.floor((Math.random())*10)+1;
        const arr = [];
        for (let index = 0; index < len; index++) {
            const element = Math.floor(Math.random()*100);
            arr.push(element);
        }
        setValueSet(arr);
        valSet = arr;
        setMean(getMean());
        setMedian(getMedian());
        setStdDev(getStandardDeviation());
        setMode(getMode());
        console.log(arr);
    };

    useEffect(()=>{
        changeData();
    },[]);

    const getMean = ()=> {
        const len = valSet.length;
        let sum = 0;
        valSet.forEach((element) => {
            sum+=element;
        });

        const mean = sum/len;
        return mean;
    };

    const getMode = () => {
        const map1 = new Map();
        valSet.forEach((element) => {
            if(map1.has(element)){
                map1.set(element,map1.get(element)+1);
            }
            else{
                map1.set(element,1);
            }
        });
        let cnt=0,max=null;
        for (const [key, value] of map1){
            if(value>cnt){
                cnt = value;
                max = key;
            }
        }

        console.log("Mode:");
        console.log(max);
        return max;
    };

    const getMedian = ()=> {
        const arr = valSet;
        arr.sort();
        const len = arr.length;
        let avg;
        if((arr.length%2)!==0){
            avg = arr[Math.floor(len/2)];
            return avg;
        }
        avg = (arr[len/2-1]+arr[len/2])/2;
        return avg;
    };

    const getStandardDeviation = ()=> {
        const mean = getMean();
        let topSum = 0;
        valSet.forEach(element => {
            const diff = element-mean;
            topSum = topSum + diff*diff;
        });
        const variance = topSum/(valSet.length-1);
        const sd = Math.sqrt(variance);

        return sd;
    };

    const handleSubmit = (event) => {
        event.preventDefault();      // or directly
        let arr = valueSet;
        const val = event.target.fnumber.value;
        if(!isNaN(val)){
            arr.push(parseFloat(val));
            valSet = arr;
            setValueSet(arr);
        }
        setInputedValue(val);
        setMean(getMean());
        setMedian(getMedian());
        setStdDev(getStandardDeviation());
        setMode(getMode());
        console.log(arr);
    };

    return (
        <div className="blog-detail">
            <table border="1" className="create">
                <tbody>
                    <tr>
                        <td className="blog-preview">Array</td>
                        <td className="blog-preview">[{valueSet.toString()}]</td>
                    </tr>
                    <tr>
                        <td className="blog-preview">Mean</td>
                        <td className="blog-preview">{mean}</td>
                    </tr>
                    <tr>
                        <td className="blog-preview">Median</td>
                        <td className="blog-preview">{median}</td>
                    </tr>
                    <tr>
                        <td className="blog-preview">StdDev</td>
                        <td className="blog-preview">{stdDev}</td>
                    </tr>
                    <tr>
                        <td className="blog-preview">Mode</td>
                        <td className="blog-preview">{mode}</td>
                    </tr>
                </tbody>
            </table>
            <form className="create" onSubmit={handleSubmit}>
                    <p >Enter number to include in dataset:</p> <input type="text" name="fnumber" />
                    <input type="submit" value="Submit" />
            </form>
            <button className="content" onClick={changeData}>Click to load new dataset</button>
            <div className="create"><em>The inputed number :</em><p>{inputedValue}</p></div>
        </div>
    );
};

export default Tile;
