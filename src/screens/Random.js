
import React from 'react'
import { TouchableOpacity, View, FlatList, Text, Image } from 'react-native'

export default class Random extends React.PureComponent {
    static navigationOptions = {
        title: 'Random'
    }
    
    state = {
        data: []
    }
    
    async componentDidMount() {
        const response = await fetch('https://charts-pesadao.herokuapp.com/')
        const responseJson = await response.json()
        console.log(response)
        console.log(responseJson);
        this.setState({data: responseJson.random_chart})
        console.log(responseJson.random_chart)
    }

    _renderItem = ({item}) => {
        return  (
            <TouchableOpacity onPress={()=>this._onItemPress(item)} style={{flexDirection:'row', padding: 10, alignItems:'center'}}>
                <Text style={{marginLeft: 10}}>Chart - {item.id}</Text>
            </TouchableOpacity>
        )
    }

    _onItemPress = (item) => {
        this.props.navigation.navigate('Details', {chart: item.url})
    } 

    render() {
        return (
            <FlatList 
                data={this.state.data}
                renderItem={this._renderItem}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={()=>
                    <View style={{height:1, backgroundColor: '#f7f7f7'}} 
                />}
            />
        )
    }
}
