import React, { Component } from 'react';
import { ScrollView, View, Dimensions, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { PieChart, BarChart, Grid} from 'react-native-svg-charts'
import { Circle, G, Line, LinearGradient, Stop, Defs} from 'react-native-svg'


const SCREEN_WIDTH = Dimensions.get('screen').width

export default class Details extends React.PureComponent {

  static navigationOptions = {
    title: 'Details'
  }

  constructor (props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: []
    }
    this.routeParams = this.props.navigation.state.params;  
  }

    async componentWillMount() {
      const urlData = 'https://charts-pesadao.herokuapp.com'
      const path = urlData + this.routeParams.chart
      console.log(path)
      const result = await fetch(path)
        .then((response) => {
          return response.json(); 
        })
        .then((data) => {
          this.setState({
            isLoading: false,
            dataSource: data
          })
          console.log(data)
        })
        .catch((error) => {
          console.log('Request failed', error)
        });
    }

  render () {
    
    if (this.state.isLoading) {
      return (
        <View style={style.container}>
          <ActivityIndicator />
        </View>
      )
    } else {
      const chartConfig = {
        backgroundGradientFrom: '#1E2923',
        backgroundGradientTo: '#08130D',
        color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
        strokeWidth: 2 // optional, default 3
      }
      
      let item = this.state.dataSource

      if(item.chartType === 'doughnut'){
      const data = this.state.dataSource.chartData[0]
      
      
      console.log('isso e data ' + data)
      const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

      const pieData = data
          .filter(value => value > 0)
          .map((value, index) => ({
              value,
              svg: { fill: randomColor() },
              key: `pie-${index}`,
          }))

      const Labels = ({ slices }) => {
          return slices.map((slice, index) => {
              const { labelCentroid, pieCentroid, data } = slice;
              return (
                  <G key={ index }>
                      <Line
                          x1={ labelCentroid[ 0 ] }
                          y1={ labelCentroid[ 1 ] }
                          x2={ pieCentroid[ 0 ] }
                          y2={ pieCentroid[ 1 ] }
                          stroke={ data.svg.fill }
                      />
                      <Circle
                          cx={ labelCentroid[ 0 ] }
                          cy={ labelCentroid[ 1 ] }
                          r={ 15 }
                          fill={ data.svg.fill }
                      />
                  </G>
              )
          })
      }

      return (
          <PieChart
              style={ { height: 200 } }
              data={ pieData }
              innerRadius={ 20 }
              outerRadius={ 55 }
              labelRadius={ 80 }
          >
              <Labels/>
          </PieChart>
          
      )
        // donuts
      }else{
        const data = this.state.dataSource.chartData[0].data
      
        console.log('isso e data ' + data)
        const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

        const Gradient = () => (
          <Defs key={'gradient'}>
              <LinearGradient id={'gradient'} x1={'0%'} y={'0%'} x2={'0%'} y2={'100%'}>
                  <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
                  <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'}/>
              </LinearGradient>
          </Defs>
        )

        return (
          <BarChart
            style={ { height: 200 } }
            data={ data }
            contentInset={ { top: 20, bottom: 20 } }
            svg={ {
                strokeWidth: 2,
                fill: 'url(#gradient)',
            } }
          >
            <Grid/>
            <Gradient/>
          </BarChart>
        )
        
      }
    }
    
  }
}

class PieChartWithLabel extends React.PureComponent {

  render() {

      const data = [ 50, 10, 40, 95, -4, -24, 85, 91 ]

      const randomColor = () => ('#' + (Math.random() * 0xFFFFFF << 0).toString(16) + '000000').slice(0, 7)

      const pieData = data
          .filter(value => value > 0)
          .map((value, index) => ({
              value,
              svg: { fill: randomColor() },
              key: `pie-${index}`,
          }))

      const Labels = ({ slices }) => {
          return slices.map((slice, index) => {
              const { labelCentroid, pieCentroid, data } = slice;
              return (
                  <G key={ index }>
                      <Line
                          x1={ labelCentroid[ 0 ] }
                          y1={ labelCentroid[ 1 ] }
                          x2={ pieCentroid[ 0 ] }
                          y2={ pieCentroid[ 1 ] }
                          stroke={ data.svg.fill }
                      />
                      <Circle
                          cx={ labelCentroid[ 0 ] }
                          cy={ labelCentroid[ 1 ] }
                          r={ 15 }
                          fill={ data.svg.fill }
                      />
                  </G>
              )
          })
      }

      return (
          <PieChart
              style={ { height: 200 } }
              data={ pieData }
              innerRadius={ 20 }
              outerRadius={ 55 }
              labelRadius={ 80 }
          >
              <Labels/>
          </PieChart>
      )
  }

}



  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
      flex: 1,
      alignSelf: 'stretch',
    }
  })