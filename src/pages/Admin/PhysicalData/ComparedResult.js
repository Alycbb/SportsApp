import React, {Component} from 'react';
import{ 
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';

import {connect} from "react-redux";


//display compare result
class ComparedResult extends Component<{}> {
    
    render() {

        //get data from reducer
        const {GetTwoComparedPD: {CoomparedPDs}} = this.props;
        const view = CoomparedPDs ? CoomparedPDs: [{dataDetails: {}}];

        console.log("ccccc");
        console.log(view);


        const keys1 = [];
        const values1 = [];
        const aaa = [];

        //compared data1
        Object.entries(view[0].dataDetails).map(([key, val]) =>{
            const Numval = parseInt(val);
            // keys1.push(key);
            // values1.push(Numval);
            aaa.push({a: key, b: Numval});

        })

        console.log(keys1);
        console.log(values1);


        const keys2 = [];
        const values2 = [];
        const bbb = [];

        //compared data2
        Object.entries(view[1].dataDetails).map(([key, val]) =>{
            const Numval = parseInt(val);
            // keys2.push(key);
            // values2.push(Numval);
            bbb.push({a: key, b: Numval});
        })


        console.log(aaa);
        console.log(typeof(aaa[0].a));
        console.log(keys2);
        console.log(values2);

        
        const data = [
            {
                data: aaa,
                svg: { stroke: '#8800cc' },
            },
            {
                data: bbb,
                svg: { stroke: 'green' },
            },
        ]

        const contentInset = { top: 20, bottom: 20}


        return (
            <View>
            <View style={{ display: "flex", flexDirection: 'row' }}>
                    <YAxis
                    data={aaa.map(item => item.b)}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    formatLabel={(value) => `${value}`}
                    // yAccessor={ ({ item }) => item.b }
                    style={{ flex: 0.1, marginBottom: 15 }}
                    />
                    {console.log(aaa)}
                    {console.log(bbb)}
                    {console.log(data)}



                {/* 
                    <YAxis
                    data={data}
                    yAccessor={({ item }) => item.b}
                    contentInset={contentInset}
                    svg={{
                        fill: 'grey',
                        fontSize: 10,
                    }}
                    formatLabel={value => value}

                    // formatLabel={(value) => `${value}`}

                    /> */}

                <View style = {{flex:0.9 }}>
                    {/* <LineChart
                        style={{flex:1}}
                        data={aaa.map(item => item.b)}
                        // yAccessor={ ({ item }) => item.b }
                        // xAccessor={ ({ item }) => item.a }
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={contentInset} >
                        <Grid />
                    </LineChart> */}

                    <LineChart
                        style={{ height: 200 }}
                        data={data}
                        yAccessor={ ({ item }) => item.b }
                        // xAccessor={ ({ item }) => item.a }
                        svg={{ stroke: 'rgb(134, 65, 244)' }}
                        contentInset={contentInset}
                        yMin={0}
                        >

                        <Grid />
                    </LineChart>

                    
                    {/* <XAxis
                        style={{}}
                        data={aaa.map(item => item.a)}
                        // formatLabel={(value) => `${value}`}
                        contentInset={{ left: 10, right: 10 }}
                        svg={{ fontSize: 10, fill: 'black' }}
                        xAccessor={({ item }) => item}
                    /> */}

                    <XAxis
                    data={aaa}
                    formatLabel={(_, index) => aaa[index].a}
                    contentInset={{ left: 20, right: 20}}
                    svg={{
                        fill: 'black',
                        fontSize: 10,
                    }}
                />
                </View>
                
                
            </View>

            {/* the small part in bottom left */}
            {/* display the different color for different users in graph */}
            <View style={{ display: "flex", flexDirection: 'column' }}>
                <View style={{ display: "flex", flexDirection: 'row' }}>
                    <View style={{backgroundColor: '#8800cc', height: 2,  width: 15, alignSelf: 'center'}} />
                    <Text style={{marginRight: 10}}>{view[0].date}</Text>
                    <Text>{view[0].userName}</Text>
                </View>

                <View style={{ display: "flex", flexDirection: 'row' }}>
                    <View style={{backgroundColor: 'green', height: 2,  width: 15, alignSelf: 'center'}} />
                    <Text style={{marginRight: 10}}>{view[1].date}</Text>
                    <Text>{view[1].userName}</Text>

                </View>
                

            </View>
        </View>
        )
    }
}

mapStateToProps = (state) => ({
    GetTwoComparedPD: state.physicalDataReducer.GetTwoComparedPD
})

mapDispatchToProps = (dispatch) => ({
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(ComparedResult);
