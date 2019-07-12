import React, { Component } from 'react';
import { ScrollView, View, Dimensions, Text, ActivityIndicator, StyleSheet } from 'react-native';


const SCREEN_WIDTH = Dimensions.get('screen').width



export default class Details extends Component {

  static navigationOptions = {
    title: 'Details'
  }

  constructor (props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null

    }
  }

  render () {
    const { chart } = this.props.navigation.state.params

    console.log(chart)

    const urlData = 'https://charts-pesadao.herokuapp.com'
    const path = urlData + chart.url

    console.log(path)

    const result = fetch(path, {
      method: 'get',
    }).then((response) => {
      return response.json(); 
    }).then((data) => {
      this.setState({
        isLoading: false,
        dataSource: data
      })
    })
      .catch(function (error) {
        console.log('Request failed', error)
      })

    if (this.state.isLoading) {
      return (
        <View style={style.container}>
          <ActivityIndicator />
        </View>
      )
    } else {

      let charties = this.state.dataSource.map((val, key) => {
        return <View key={key} style={style.item}><Text>{val.chartLabels}</Text></View>
      })
      console.log(charties)
    }

      return (
        <ScrollView>

          <Text style={{ padding: 10 }}>Gráfico - {chart.id}</Text>
          <View style={style.container}>
            { charties }
          </View>

        </ScrollView>
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